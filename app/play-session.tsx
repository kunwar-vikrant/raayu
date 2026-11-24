"use client";

import { useState } from "react";
import type { Activity, AgeId } from "./activities";
import { playAdaptation, responseOptions, type BabyProfile, type BabyResponse } from "./personalization";

export default function PlaySession({ activity, profile, age, onResponse, onExit, storageError }: {
  activity: Activity; profile: BabyProfile; age: AgeId;
  onResponse: (response: BabyResponse) => void; onExit: () => void;
  storageError: string;
}) {
  const [step, setStep] = useState(0);
  const [response, setResponse] = useState<BabyResponse | null>(null);
  const adaptation = playAdaptation(activity, profile, age);
  const name = profile.nickname || "Baby";
  function respond(value: BabyResponse) { setResponse(value); onResponse(value); }
  const stop = response === "break" || response === "not-interested";
  return <main className="live-play">
    <header><button className="text-action" onClick={onExit}>← Finish play</button><span>FOR THE CAREGIVER · REAL-WORLD PLAY</span></header>
    {storageError && <p role="status" className="storage-notice">{storageError}</p>}
    <section aria-live="polite" className="live-play-card">
      <p className="overline">{response ? "FOLLOW THEIR LEAD" : ["GET COMFORTABLE", "OFFER ONE TURN", "PAUSE & NOTICE"][step]}</p>
      <h1>{stop ? "That’s enough for now." : response ? `${name} sets the pace.` : activity.title}</h1>
      {!response ? <>
        <div className="play-step-count">{step + 1} / 3 · no time target</div>
        <p className="live-instruction">{activity.steps[step]}</p>
        {step === 1 && <div className="play-personal-note">{adaptation.invitation}</div>}
        <p className="live-phone-note">Read, then look away from the phone. Stay with your baby. You can stop at any point.</p>
        {step < 2 ? <button className="pine-button" onClick={() => setStep(step + 1)}>{step === 0 ? "We’re comfortable →" : "We’ve tried a turn →"}</button> : <>
          <h2>What did you notice?</h2><p>Choose only what you observed. This does not assess a skill.</p>
          <div className="response-choices">{responseOptions.map((option) => <button key={option.id} onClick={() => respond(option.id)}>{option.label} →</button>)}</div>
        </>}
      </> : <>
        <p className="live-instruction">{stop ? "End the game and offer comfort or your usual care. There is no need to try a different game immediately." : response === "engaged" ? adaptation.engaged : adaptation.observing}</p>
        {!stop && <p className="play-personal-note">{adaptation.variation}</p>}
        <p className="live-phone-note">{stop ? "This activity will appear lower in suggestions for the next three days. That is a temporary preference, not a judgement about development." : "Saved as your observation. Future suggestions use this alongside age and interests."}</p>
        {!stop && <button className="pine-button" onClick={() => { setStep(1); setResponse(null); }}>One more gentle turn →</button>}
        <button className="outline-button" onClick={onExit}>Finish & return to today</button>
      </>}
      {!response && <button className="play-stop-button" onClick={() => respond("break")}>Baby needs a pause · stop now</button>}
      <details className="live-safety"><summary>Safety for this activity</summary><p>{activity.stop}</p><p>Keep the original setup and supervision. Never move baby’s body to obtain a response.</p></details>
    </section>
  </main>;
}
