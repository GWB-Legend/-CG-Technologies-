/* ============================================================
   CG Technologies — Corporate Identity System
   Supabase client + feedback logic
   ============================================================ */

// ---------- 1. CONFIG ----------
const SUPABASE_URL      = "https://kbvtyiokuqnbhuqnfepl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidnR5aW9rdXFuYmh1cW5mZXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2MzY4NTEsImV4cCI6MjEwNzIxMjg1MX0.KaAdP5ABy0DVWV4jWQu83ErujpshVvIUeDOS-lUFIKE";

// The SDK attaches `supabase` to window; we create a client.
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------- 2. DOM HELPERS ----------
const $ = (id) => document.getElementById(id);

function escapeHtml(s){
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

// ---------- 3. LOAD FEEDBACK ----------
async function loadFeedback(){
  const el = $("fbList");
  el.innerHTML = '<em class="empty">Loading…</em>';

  const { data, error } = await db
    .from("feedback")
    .select("reviewer, role, comment, rating, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error){
    el.innerHTML = `<em style="color:#c00;font-size:.85rem;">${escapeHtml(error.message)}</em>`;
    return;
  }

  if (!data || data.length === 0){
    el.innerHTML = '<em class="empty">No feedback yet — be the first.</em>';
    return;
  }

  el.innerHTML = data.map((f) => `
    <div class="fb-item">
      <div class="fb-meta">
        <strong>${escapeHtml(f.reviewer)}</strong>
        ${f.role ? " · " + escapeHtml(f.role) : ""}
        · ${"★".repeat(f.rating || 0)}
      </div>
      ${escapeHtml(f.comment)}
    </div>
  `).join("");
}

// ---------- 4. SUBMIT FEEDBACK ----------
async function submitFeedback(){
  const btn     = $("fbSubmit");
  const status  = $("fbStatus");

  const reviewer = $("fbName").value.trim();
  const role     = $("fbRole").value.trim();
  const comment  = $("fbComment").value.trim();
  const rating   = parseInt($("fbRating").value, 10);

  if (!reviewer || !comment){
    status.textContent = "⚠️ Name and comment are required.";
    status.style.color = "#c00";
    return;
  }

  btn.disabled = true;
  status.textContent = "Submitting…";
  status.style.color = "";

  // We attach all feedback to the single CG project row.
  const { data: proj, error: pErr } = await db
    .from("projects")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (pErr || !proj){
    status.textContent = "⚠️ Project row missing — run the SQL seed.";
    status.style.color = "#c00";
    btn.disabled = false;
    return;
  }

  const { error } = await db.from("feedback").insert({
    project_id: proj.id,
    reviewer,
    role: role || null,
    comment,
    rating
  });

  btn.disabled = false;

  if (error){
    status.textContent = "⚠️ " + error.message;
    status.style.color = "#c00";
    return;
  }

  status.textContent = "✅ Feedback submitted. Thank you!";
  status.style.color = "#0a7d3a";

  $("fbName").value    = "";
  $("fbRole").value    = "";
  $("fbComment").value = "";
  $("fbRating").value  = "5";

  loadFeedback();
}

// ---------- 5. WIRE UP ----------
document.addEventListener("DOMContentLoaded", () => {
  $("fbSubmit").addEventListener("click", submitFeedback);
  loadFeedback();
});