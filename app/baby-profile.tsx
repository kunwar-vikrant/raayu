"use client";

import { useState } from "react";
import { interests, defaultProfile, type BabyProfile } from "./personalization";

export default function BabyProfileEditor({ profile, onChange }: { profile: BabyProfile; onChange: (value: BabyProfile) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);
  return <section className="baby-profile">
    <div className="profile-summary"><div><p className="overline">MADE MORE PERSONAL</p><h2>{profile.nickname ? `Getting to know ${profile.nickname}` : "What lights your baby up?"}</h2><p>{profile.interests.length ? profile.interests.map((id) => interests.find((interest) => interest.id === id)?.label).join(" · ") : "Add interests and a familiar phrase. You can change them as baby changes."}{profile.quiet ? " · Quiet mode" : ""}</p></div><button className="outline-button" aria-expanded={editing} onClick={() => { setDraft(profile); setEditing(!editing); setSaved(false); }}>{editing ? "Close" : "Edit baby’s preferences"}</button></div>
    {editing && <form className="profile-form" onSubmit={(event) => { event.preventDefault(); onChange(draft); setEditing(false); setSaved(true); }}>
      <label>Nickname (optional)<input maxLength={30} value={draft.nickname} onChange={(event) => setDraft({ ...draft, nickname: event.target.value })} placeholder="What you call baby" /></label>
      <fieldset><legend>What seems interesting lately?</legend><p>Select what you have noticed. These are interests, not developmental milestones.</p><div className="profile-interests">{interests.map((interest) => <label key={interest.id}><input type="checkbox" checked={draft.interests.includes(interest.id)} onChange={() => setDraft({ ...draft, interests: draft.interests.includes(interest.id) ? draft.interests.filter((id) => id !== interest.id) : [...draft.interests, interest.id] })} />{interest.label}</label>)}</div></fieldset>
      <label>Your familiar phrase or song line (optional)<input maxLength={100} value={draft.phrase} onChange={(event) => setDraft({ ...draft, phrase: event.target.value })} placeholder="A few words you use in your home language" /></label>
      <label className="profile-quiet"><input type="checkbox" checked={draft.quiet} onChange={(event) => setDraft({ ...draft, quiet: event.target.checked })} />Prefer quiet play today</label>
      <p className="subtle-copy">Stored in this browser only. Preferences adjust suggestions and play prompts; they don’t infer abilities or medical needs. Follow your clinician’s advice for individual adaptations.</p>
      <div className="profile-actions"><button className="pine-button" type="submit">Save preferences</button><button className="text-action" type="button" onClick={() => { onChange(defaultProfile); setDraft(defaultProfile); setEditing(false); }}>Clear baby preferences</button></div>
    </form>}
    {saved && <p role="status" className="subtle-copy">Preferences saved. Today’s suggestions have been updated.</p>}
  </section>;
}
