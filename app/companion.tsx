"use client";

import { useEffect, useState } from "react";
import { ageOptions, cards, findActivity, type Activity, type AgeId } from "./activities";

type Entry = { id: string; text: string; createdAt: string; age: AgeId; kind: string };
type Moment = { id: string; startedAt: string; activityId: string; feedback: string | null };
type Tab = "today" | "library" | "journal" | "guide";
type Memory = { favorites: string[]; entries: Entry[]; checked: string[] };
const KEY = "raayu-companion-v1";
const contexts = [
  { id: "all", label: "All moments", mark: "✳" },
  { id: "holding", label: "Connection", mark: "♡" },
  { id: "floor", label: "Move & explore", mark: "◒" },
  { id: "care", label: "Everyday care", mark: "✦" },
  { id: "feeding", label: "Mealtime", mark: "◡" },
  { id: "walking", label: "Out & about", mark: "↗" },
];
const emptyMemory: Memory = { favorites: [], entries: [], checked: [] };

function Picture({ context, hero = false }: { context: string; hero?: boolean }) {
  return <svg className={hero ? "moment-art hero-art" : "moment-art"} viewBox="0 0 300 200" fill="none" aria-hidden="true">
    <circle cx="237" cy="45" r="25" fill="#F5CE7C" />
    <path d="M26 167C64 113 102 142 135 139C187 132 231 113 281 167" fill="#B7C7AD" />
    <path d="M10 187C82 139 164 185 290 153V200H10Z" fill="#8AA58B" />
    {context === "floor" ? <>
      <rect x="116" y="131" width="78" height="22" rx="11" fill="#E08E73" /><rect x="125" y="109" width="60" height="22" rx="11" fill="#F2CD85" /><rect x="136" y="87" width="39" height="22" rx="11" fill="#668F8B" /><circle cx="155" cy="73" r="14" fill="#E08E73" />
    </> : context === "walking" ? <>
      <path d="M144 160V74" stroke="#516D54" strokeWidth="7" strokeLinecap="round" /><ellipse cx="118" cy="85" rx="26" ry="42" transform="rotate(-38 118 85)" fill="#668B69" /><ellipse cx="165" cy="104" rx="24" ry="38" transform="rotate(38 165 104)" fill="#89A37C" /><ellipse cx="157" cy="57" rx="21" ry="32" transform="rotate(25 157 57)" fill="#A9BC8C" />
    </> : context === "care" ? <>
      <path d="M103 85L127 70Q150 84 173 70L197 85L183 116L171 110V159H129V110L117 116Z" fill="#E6AC88" /><path d="M144 115L151 122L164 105" stroke="#FFF9ED" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </> : context === "feeding" ? <>
      <path d="M103 112H197C193 150 173 163 150 163C127 163 107 150 103 112Z" fill="#E6A684" /><ellipse cx="150" cy="112" rx="47" ry="10" fill="#F6CF9E" /><path d="M204 67L181 123" stroke="#5F8274" strokeWidth="8" strokeLinecap="round" /><ellipse cx="206" cy="63" rx="9" ry="15" transform="rotate(20 206 63)" fill="#5F8274" />
    </> : <>
      <path d="M94 155V91Q123 78 150 92Q177 78 206 91V155Q179 142 150 157Q122 142 94 155Z" fill="#FFF3D9" /><path d="M150 94V154" stroke="#CBBE9C" strokeWidth="3" /><path d="M116 115C101 100 123 94 127 108C139 95 151 114 116 136Z" fill="#D98972" /><path d="M165 108H190M165 120H190M165 132H182" stroke="#A6B99D" strokeWidth="3" strokeLinecap="round" />
    </>}
    <path d="M46 62H88M67 41V83" stroke="#C9B98C" strokeWidth="2" strokeLinecap="round" /><circle cx="253" cy="110" r="4" fill="#E2A58B" />
  </svg>;
}

export default function Companion({ age, events, onCoach, onOpen, onBreak, onClearHistory }: {
  age: AgeId; events: Moment[]; onCoach: () => void; onOpen: (activity: Activity) => void; onBreak: () => void; onClearHistory: () => void;
}) {
  const [tab, changeTab] = useState<Tab>("today");
  const [memory, setMemory] = useState<Memory>(emptyMemory);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [savedOnly, setSavedOnly] = useState(false);
  const [draft, setDraft] = useState("");
  const [kind, setKind] = useState("Something I noticed");
  const [notice, setNotice] = useState("");
  const [day, setDay] = useState(0);
  const profile = ageOptions.find((option) => option.id === age)!;

  function setTab(next: Tab) {
    changeTab(next);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDay(Math.floor(Date.now() / 86400000));
      try {
        const raw: unknown = JSON.parse(localStorage.getItem(KEY) ?? "null");
        if (raw && typeof raw === "object") {
          const value = raw as Partial<Memory>;
          setMemory({
            favorites: Array.isArray(value.favorites) ? value.favorites.filter((id) => typeof id === "string" && findActivity(id)) : [],
            entries: Array.isArray(value.entries) ? value.entries.filter((entry) => entry && typeof entry.id === "string" && typeof entry.text === "string" && typeof entry.createdAt === "string" && typeof entry.kind === "string" && ageOptions.some((item) => item.id === entry.age)) : [],
            checked: Array.isArray(value.checked) ? value.checked.filter((id) => typeof id === "string") : [],
          });
        }
      } catch { setStorageError("Your browser could not restore saved data. You can still explore activities."); }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function save(next: Memory) {
    setMemory(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); setStorageError(""); }
    catch { setStorageError("Changes are available this session, but this browser could not save them. Export your journal before leaving."); }
  }
  function favorite(id: string) {
    save({ ...memory, favorites: memory.favorites.includes(id) ? memory.favorites.filter((item) => item !== id) : [...memory.favorites, id] });
  }
  const stageCards = cards.filter((item) => item.age === age);
  const completedIds = events.map((event) => event.activityId);
  const likedIds = events.filter((event) => event.feedback === "Easy to try").map((event) => event.activityId);
  const ordered = [...stageCards.slice(day % stageCards.length), ...stageCards.slice(0, day % stageCards.length)];
  const recommended = [...ordered].sort((a, b) => Number(completedIds.includes(a.id)) - Number(completedIds.includes(b.id)) || Number(likedIds.includes(b.id)) - Number(likedIds.includes(a.id)));
  const todayIdeas = recommended.filter((item, index, all) => all.findIndex((other) => other.context === item.context) === index).slice(0, 4);
  const featured = todayIdeas[0];
  const filtered = stageCards.filter((item) => (category === "all" || item.context === category) && (!savedOnly || memory.favorites.includes(item.id)) && `${item.title} ${item.intro} ${item.eyebrow} ${item.steps.join(" ")}`.toLowerCase().includes(query.toLowerCase()));
  const saved = cards.filter((item) => memory.favorites.includes(item.id));
  const recent = [...events].reverse().slice(0, 6);
  const checks = [
    { id: "sleep", title: "A space ready for sleep", text: "Begin every sleep on baby’s back in a firm, flat, level sleep space with only a fitted sheet.", url: "https://safetosleep.nichd.nih.gov/reduce-risk/reduce", source: "NIH Safe to Sleep" },
    { id: `space-${age}`, title: "A space ready for this stage", text: profile.safety, url: "https://www.cpsc.gov/safety-education/safety-guides/kids-and-babies/Childproofing-Your-Home", source: "CPSC home safety" },
    { id: "caregiver", title: "Someone you can call", text: "Choose a trusted person you can ask for a small, specific handoff when you need a break.", url: "", source: "" },
  ];

  function addEntry(event: React.FormEvent) {
    event.preventDefault();
    if (!draft.trim()) return;
    save({ ...memory, entries: [{ id: crypto.randomUUID(), text: draft.trim(), createdAt: new Date().toISOString(), age, kind }, ...memory.entries].slice(0, 200) });
    setDraft(""); setNotice("Added to your journal.");
  }
  function exportJournal() {
    const content = ["RAAYU · FAMILY JOURNAL", `Exported ${new Date().toLocaleDateString()}`, `Current stage: ${profile.label}`, "Personal observations, not a developmental assessment.", "", "NOTES & QUESTIONS", ...memory.entries.map((entry) => `${new Date(entry.createdAt).toLocaleDateString()} · ${ageOptions.find((option) => option.id === entry.age)?.label} · ${entry.kind}\n${entry.text}\n`), "MOMENTS TRIED", ...events.map((event) => `${new Date(event.startedAt).toLocaleDateString()} · ${findActivity(event.activityId)?.title ?? "Activity"} · ${event.feedback ?? "No feedback recorded"}`)].join("\n");
    const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "raayu-journal.txt"; anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Journal exported. Keep it somewhere private.");
  }
  function activityCard(item: Activity) {
    return <article className={`library-card tone-${item.context}`} key={item.id}>
      <button className="art-link" onClick={() => onOpen(item)} aria-label={`Open ${item.title}`}><Picture context={item.context} /></button>
      <button disabled={!ready} className={`save-heart ${memory.favorites.includes(item.id) ? "is-saved" : ""}`} aria-label={`${memory.favorites.includes(item.id) ? "Unsave" : "Save"} ${item.title}`} aria-pressed={memory.favorites.includes(item.id)} onClick={() => favorite(item.id)}>{memory.favorites.includes(item.id) ? "♥" : "♡"}</button>
      <div className="library-card-body"><span className="mini-label">{contexts.find((context) => context.id === item.context)?.label} <span>· a few minutes</span></span><button className="card-title" onClick={() => onOpen(item)}>{item.title} <span>↗</span></button><p>{item.intro}</p><span className="tried-label">{completedIds.includes(item.id) ? "Previously explored" : "Follow baby’s pace"}</span></div>
    </article>;
  }

  return <div className="companion">
    <nav className="companion-nav" aria-label="Main navigation">
      {([ ["today", "◒", "Today"], ["library", "✳", "Discover"], ["journal", "▤", "Our journal"], ["guide", "☼", "Care guide"] ] as const).map(([id, icon, label]) => <button key={id} aria-current={tab === id ? "page" : undefined} onClick={() => { setTab(id); setNotice(""); }}><span aria-hidden="true">{icon}</span>{label}</button>)}
      <span className="private-tag"><span /> Private by default</span>
    </nav>
    {storageError && <p className="storage-notice" role="status">{storageError}</p>}
    {tab === "today" && <>
      <div className="dashboard-heading"><div><p className="overline">YOUR FIRST YEAR, TOGETHER</p><h1>A little connection.<br />A lovely place to start.</h1><p>Small ideas for your baby. A little breathing room for you.</p></div><span className="stage-pill">✦ {profile.label}<small>{profile.note}</small></span></div>
      <div className="dashboard-grid">
        <section className="daily-feature"><div className="feature-copy"><p className="overline">A MOMENT TO TRY TODAY</p><span className="feature-tag">{contexts.find((item) => item.id === featured.context)?.label} · {profile.label}</span><h2>{featured.title}</h2><p>{featured.intro}</p><button className="pine-button" onClick={() => onOpen(featured)}>Let’s try it <span>↗</span></button><span className="gentle-note">A few minutes. Your pace is the right pace.</span></div><Picture context={featured.context} hero /></section>
        <section className="checkin-card"><span className="checkin-sun">✳</span><p className="overline">MEET THIS MOMENT</p><h2>How are you<br />both doing?</h2><p>A few simple questions. An idea that fits how today actually feels.</p><button className="outline-button" onClick={onCoach}>Find our moment <span>→</span></button><button className="break-link" onClick={onBreak}>Feeling overwhelmed? Take a pause ♡</button></section>
      </div>
      <div className="section-heading"><div><p className="overline">LESS PLANNING, MORE BEING TOGETHER</p><h2>Little possibilities</h2></div><button className="text-action" onClick={() => setTab("library")}>Explore all ideas →</button></div>
      <div className="activity-grid">{todayIdeas.slice(1).map(activityCard)}</div>
      <div className="bottom-grid"><section className="stage-note"><span className="note-icon">✦</span><div><p className="overline">GROWING AT {profile.label}</p><h2>Make room for discovery.</h2><p>{profile.note}. Follow what interests your baby and adapt to their comfort.</p><a href={profile.developmentUrl} target="_blank" rel="noreferrer">Read the CDC development guide ↗</a></div></section><section className="journal-nudge"><p className="overline">THE LITTLE THINGS ARE THE BIG THINGS</p><h2>What surprised you today?</h2><p>A new sound. A familiar smile. A question for the next appointment.</p><button className="text-action" onClick={() => setTab("journal")}>Keep a little note +</button></section></div>
    </>}
    {tab === "library" && <>
      <div className="dashboard-heading"><div><p className="overline">A LITTLE INSPIRATION</p><h1>Ordinary moments.<br />Wonderful possibilities.</h1><p>Explore ten ideas for {profile.label}. Change baby’s age above to explore another stage.</p></div></div>
      <div className="library-tools"><label className="search-field"><span aria-hidden="true">⌕</span><input type="search" placeholder="Try sounds, hands, quiet…" aria-label="Search activities" value={query} onChange={(event) => setQuery(event.target.value)} /></label><button className={`filter-saved ${savedOnly ? "active" : ""}`} onClick={() => setSavedOnly(!savedOnly)} aria-pressed={savedOnly}>♡ Saved for this age</button></div>
      <div className="category-filters" aria-label="Activity categories">{contexts.map((item) => <button key={item.id} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.mark} {item.label}</button>)}</div>
      <p className="results-count" role="status">{filtered.length} {filtered.length === 1 ? "idea" : "ideas"} for {profile.label}</p>
      <div className="activity-grid">{filtered.map(activityCard)}</div>
      {!filtered.length && <div className="empty-state"><span>✳</span><h2>A fresh start?</h2><p>No ideas match these filters. Try a different word or browse everything for this age.</p><button className="pine-button" onClick={() => { setQuery(""); setCategory("all"); setSavedOnly(false); }}>Clear filters</button></div>}
      {saved.length > 0 && <><div className="section-heading"><div><p className="overline">KEEP THE GOOD ONES CLOSE</p><h2>Saved across every age</h2></div></div><div className="saved-rows">{saved.map((item) => <div key={item.id}><span>♡</span><div><strong>{item.title}</strong><small>{ageOptions.find((option) => option.id === item.age)?.label}</small></div>{item.age === age ? <button onClick={() => onOpen(item)}>Open →</button> : <small>Choose this age above to open</small>}<button aria-label={`Unsave ${item.title}`} onClick={() => favorite(item.id)}>×</button></div>)}</div></>}
    </>}
    {tab === "journal" && <>
      <div className="dashboard-heading"><div><p className="overline">YOUR FAMILY’S LITTLE MEMORY BOOK</p><h1>Worth remembering.</h1><p>Notice patterns, hold onto small joys, and keep questions ready for your clinician.</p></div><button className="outline-button export-button" onClick={exportJournal}>Export journal ↓</button></div>
      <div className="journal-layout"><section className="journal-composer"><h2>What’s on your mind?</h2><form onSubmit={addEntry}><label>Kind of note<select value={kind} onChange={(event) => setKind(event.target.value)}><option>Something I noticed</option><option>A little memory</option><option>A question for our clinician</option></select></label><label>Your note<textarea maxLength={2000} value={draft} onChange={(event) => { setDraft(event.target.value); setNotice(""); }} placeholder="Today, I noticed…" required /></label><p className="gentle-note">Saved in this browser only. No account or cloud sync. Export to keep a backup.</p><button className="pine-button" disabled={!ready || !draft.trim()}>Save this moment +</button></form><p className="status-message" role="status">{notice}</p></section><section className="journal-feed"><h2>Your notes <span>{memory.entries.length}</span></h2>{!memory.entries.length && <div className="empty-state"><span>♡</span><h3>Every story starts small.</h3><p>Your first note belongs here. There’s no perfect way to write it.</p></div>}{memory.entries.map((entry) => <article key={entry.id}><div className="entry-meta"><span>{entry.kind}</span><button aria-label="Delete note" onClick={() => { if (window.confirm("Delete this journal note from this device?")) save({ ...memory, entries: memory.entries.filter((item) => item.id !== entry.id) }); }}>×</button></div><p>{entry.text}</p><small>{new Date(entry.createdAt).toLocaleDateString()} · {ageOptions.find((option) => option.id === entry.age)?.label}</small></article>)}</section></div>
      <div className="section-heading"><div><p className="overline">YOUR SHARED MOMENTS</p><h2>Recently explored</h2></div></div><div className="saved-rows">{recent.map((event) => <div key={event.id}><span>◒</span><div><strong>{findActivity(event.activityId)?.title ?? "A little moment"}</strong><small>{new Date(event.startedAt).toLocaleDateString()} · {event.feedback ?? "Started, no reflection yet"}</small></div></div>)}{!recent.length && <p className="subtle-copy">Start any activity and it will appear here. There are no streaks or daily targets.</p>}</div>
    </>}
    {tab === "guide" && <>
      <div className="dashboard-heading"><div><p className="overline">A LITTLE SUPPORT GOES A LONG WAY</p><h1>More confidence.<br />One day at a time.</h1><p>Practical reminders for {profile.label}, with trusted places to learn more.</p></div></div>
      <div className="care-grid"><section className="care-panel"><p className="overline">YOUR EVERYDAY ENVIRONMENT</p><h2>A few things to revisit.</h2><p>Use these as personal reminders. Recheck as your baby and surroundings change.</p>{checks.map((item) => <div className="care-check" key={item.id}><label><input disabled={!ready} type="checkbox" checked={memory.checked.includes(item.id)} onChange={() => save({ ...memory, checked: memory.checked.includes(item.id) ? memory.checked.filter((id) => id !== item.id) : [...memory.checked, item.id] })} /><span>{item.title}</span></label><p>{item.text}</p>{item.url && <a href={item.url} target="_blank" rel="noreferrer">{item.source} ↗</a>}</div>)}</section><div className="care-stack"><section className="care-panel sage-panel"><p className="overline">UNDERSTANDING YOUR BABY</p><h2>Start with what you notice.</h2><p>{profile.note}. Give baby space to participate in their own way.</p><p>These activity bands are broad suggestions. For age-specific milestones, use the official checklist with your clinician.</p><a href={profile.developmentUrl} target="_blank" rel="noreferrer">Open the CDC age guide ↗</a></section><section className="care-panel"><p className="overline">BRING YOUR QUESTIONS</p><h2>You know your baby.</h2><p>If you are concerned about development or notice a loss of skills, contact your child’s clinician and ask about developmental screening.</p><button className="text-action" onClick={() => { setKind("A question for our clinician"); setTab("journal"); }}>Write down a question +</button><a href="https://www.cdc.gov/act-early/families/concerned.html" target="_blank" rel="noreferrer">CDC: acting on a concern ↗</a></section></div></div>
      <details className="care-details"><summary>Born early or receiving specialist care?</summary><p>Ask your baby’s clinician which age band and activities fit their needs. Raayu does not calculate corrected age or replace guidance after NICU care.</p></details><details className="care-details"><summary>About the guidance and your privacy</summary><p>Activities are research-informed drafts awaiting clinical review. Raayu is not a developmental assessment or medical service. Activities follow CDC developmental resources; sleep and environment reminders link to NIH and CPSC guidance. These agencies have not reviewed or endorsed Raayu.</p><p>Your age selection, favourites, journal and history stay in this browser. Other people using the same browser can see them. Export your journal before changing devices or clearing browser data.</p><button className="text-action" onClick={() => { if (window.confirm("Delete all favourites, journal notes and reminder checks? This cannot be undone. Activity history is managed separately.")) { save(emptyMemory); setNotice("Journal, favourites and reminders cleared."); } }}>Clear journal, favourites & reminders</button><p role="status">{notice}</p></details>
    </>}
    {tab === "guide" && <button className="text-action" onClick={onClearHistory}>Clear activity history from this browser</button>}
    <div className="companion-signoff"><span>✳</span> A little more together, a little less on your own.</div>
  </div>;
}
