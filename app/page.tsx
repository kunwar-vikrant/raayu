"use client";

import { useEffect, useMemo, useState } from "react";
import {
  activityCount,
  ageOptions,
  chooseActivity,
  findActivity,
  type AgeId,
} from "./activities";

type Choice = { id: string; label: string; hint: string; mark: string };

type TestEvent = {
  id: string;
  startedAt: string;
  activityId: string;
  age: AgeId;
  state: string;
  capacity: string;
  context: string;
  feedback: string | null;
  completedAt?: string;
};

const HISTORY_KEY = "here-baby-activity-history-v2";
const EVENTS_KEY = "here-baby-test-events-v2";
const TEXT_KEY = "here-baby-large-text";

const babyStates: Choice[] = [
  { id: "calm", label: "Calm & alert", hint: "Looking around, ready to connect", mark: "◉" },
  { id: "active", label: "Active & interested", hint: "Moving, kicking or making sounds", mark: "↗" },
  { id: "fussy", label: "Fussy", hint: "Needs comfort, not more stimulation", mark: "∿" },
  { id: "sleepy", label: "Getting sleepy", hint: "Yawning, slowing or looking away", mark: "◐" },
  { id: "unsure", label: "I’m not sure", hint: "Begin by simply noticing", mark: "?" },
];

const capacities: Choice[] = [
  { id: "tiny", label: "Just 30 seconds", hint: "One small moment is plenty", mark: "·" },
  { id: "three", label: "Around 3 minutes", hint: "A short, easy interaction", mark: "··" },
  { id: "open", label: "I have some energy", hint: "Room to follow baby’s lead", mark: "···" },
  { id: "empty", label: "I’m exhausted", hint: "Keep this gentle for both of you", mark: "—" },
];

const contexts: Choice[] = [
  { id: "holding", label: "Holding baby", hint: "Close, supported and face-to-face", mark: "⌒" },
  { id: "floor", label: "Floor time", hint: "Baby is awake in a safe clear space", mark: "＿" },
  { id: "care", label: "Diapering or dressing", hint: "Turn a routine into connection", mark: "+" },
  { id: "feeding", label: "Feeding", hint: "Stay present without adding a task", mark: "○" },
  { id: "walking", label: "Walking around", hint: "At home or outside together", mark: "→" },
  { id: "break", label: "I need a break", hint: "Care for the caregiver first", mark: "⌁" },
];

const choiceLabel = (choices: Choice[], id: string) => choices.find((item) => item.id === id)?.label ?? id;

function secondsFor(capacity: string) {
  if (capacity === "tiny" || capacity === "empty") return 30;
  if (capacity === "open") return 300;
  return 180;
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

export default function Home() {
  const [age, setAge] = useState<AgeId>("newborn");
  const [step, setStep] = useState(0);
  const [state, setState] = useState("");
  const [capacity, setCapacity] = useState("");
  const [context, setContext] = useState("");
  const [activityId, setActivityId] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [resting, setResting] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [events, setEvents] = useState<TestEvent[]>([]);
  const [notesOpen, setNotesOpen] = useState(false);
  const [boundaryOpen, setBoundaryOpen] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [speechAvailable, setSpeechAvailable] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  const ageProfile = ageOptions.find((item) => item.id === age) ?? ageOptions[0];
  const activity = useMemo(
    () => findActivity(activityId) ?? chooseActivity({ age, state, capacity, context: context || "holding", recent: history }),
    [activityId, age, state, capacity, context, history],
  );

  useEffect(() => {
    const hydrate = window.setTimeout(() => {
      setSpeechAvailable("speechSynthesis" in window && "SpeechSynthesisUtterance" in window);
      try {
        setHistory(JSON.parse(window.localStorage.getItem(HISTORY_KEY) ?? "[]"));
        setEvents(JSON.parse(window.localStorage.getItem(EVENTS_KEY) ?? "[]"));
        setLargeText(window.localStorage.getItem(TEXT_KEY) === "true");
      } catch {
        // Local storage may be unavailable in private browsing. The core flow still works.
      }
    }, 0);
    return () => window.clearTimeout(hydrate);
  }, []);

  useEffect(() => {
    if (!resting || finished || seconds <= 0) return;
    const timer = window.setTimeout(() => {
      setSeconds((value) => Math.max(0, value - 1));
      if (seconds <= 1) setFinished(true);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [resting, finished, seconds]);

  const questions = [
    { kicker: "First, notice", title: "How is baby right now?", choices: babyStates },
    { kicker: "Now, be honest", title: "How much do you have to give?", choices: capacities },
    { kicker: "One last thing", title: "Where are you together?", choices: contexts },
  ];

  const persistHistory = (next: string[]) => {
    setHistory(next);
    try { window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next)); } catch { /* optional */ }
  };

  const persistEvents = (next: TestEvent[]) => {
    setEvents(next);
    try { window.localStorage.setItem(EVENTS_KEY, JSON.stringify(next)); } catch { /* optional */ }
  };

  const choose = (id: string) => {
    if (step === 0) {
      setState(id);
      setStep(1);
    } else if (step === 1) {
      setCapacity(id);
      setStep(2);
    } else {
      setContext(id);
      const selected = chooseActivity({ age, state, capacity, context: id, recent: history });
      setActivityId(selected.id);
      setShowResult(true);
    }
  };

  const anotherIdea = () => {
    const selected = chooseActivity({ age, state, capacity, context, recent: [...history, activity.id] });
    setActivityId(selected.id);
  };

  const begin = (withVoice: boolean) => {
    const duration = secondsFor(capacity);
    const id = `${Date.now()}-${activity.id}`;
    setSeconds(duration);
    setFinished(false);
    setFeedback("");
    setSessionId(id);
    setResting(true);

    const nextHistory = [...history.filter((item) => item !== activity.id), activity.id].slice(-12);
    persistHistory(nextHistory);
    persistEvents([
      ...events,
      { id, startedAt: new Date().toISOString(), activityId: activity.id, age, state, capacity, context, feedback: null },
    ].slice(-100));

    if (withVoice && speechAvailable) {
      window.speechSynthesis.cancel();
      const words = [activity.title, activity.intro, ...activity.steps, activity.stop].join(" ");
      const utterance = new SpeechSynthesisUtterance(words);
      utterance.rate = 0.88;
      utterance.pitch = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const endMoment = () => {
    if (speechAvailable) window.speechSynthesis.cancel();
    setFinished(true);
  };

  const saveFeedback = (answer: string) => {
    setFeedback(answer);
    const next = events.map((item) => item.id === sessionId
      ? { ...item, feedback: answer, completedAt: new Date().toISOString() }
      : item);
    persistEvents(next);
  };

  const reset = () => {
    if (speechAvailable) window.speechSynthesis.cancel();
    setStep(0);
    setState("");
    setCapacity("");
    setContext("");
    setActivityId("");
    setShowResult(false);
    setResting(false);
    setFinished(false);
    setFeedback("");
    setSessionId("");
  };

  const changeAge = (value: AgeId) => {
    setAge(value);
    if (showResult) reset();
  };

  const toggleText = () => {
    const next = !largeText;
    setLargeText(next);
    try { window.localStorage.setItem(TEXT_KEY, String(next)); } catch { /* optional */ }
  };

  const copyTestSummary = async () => {
    const responses = events.filter((item) => item.feedback);
    const feedbackCounts = responses.reduce<Record<string, number>>((acc, item) => {
      const key = item.feedback ?? "No response";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});
    const summary = [
      "here, baby — local prototype notes",
      `Moments started: ${events.length}`,
      `Responses: ${responses.length}`,
      ...Object.entries(feedbackCounts).map(([key, value]) => `${key}: ${value}`),
    ].join("\n");
    try {
      await navigator.clipboard.writeText(summary);
      setCopyStatus("Copied");
      window.setTimeout(() => setCopyStatus(""), 1800);
    } catch {
      setCopyStatus("Copy unavailable");
    }
  };

  const clearTestNotes = () => {
    if (!window.confirm("Clear all testing notes stored on this device?")) return;
    persistEvents([]);
    persistHistory([]);
    setCopyStatus("Cleared");
  };

  const answerChips = [
    step > 0 ? { label: choiceLabel(babyStates, state), target: 0 } : null,
    step > 1 ? { label: choiceLabel(capacities, capacity), target: 1 } : null,
  ].filter(Boolean) as Array<{ label: string; target: number }>;

  if (resting) {
    return (
      <main className={`rest-screen ${largeText ? "large-text" : ""}`}>
        <div className="rest-orbit rest-orbit-one" />
        <div className="rest-orbit rest-orbit-two" />
        <section className="rest-card" aria-live="polite">
          <div className="rest-mark">h,b</div>
          {!finished ? (
            <>
              <p className="rest-eyebrow">Phone resting · you connecting</p>
              <h1>{activity.title}</h1>
              <p className="rest-time" aria-label={`${seconds} seconds remaining`}>{formatTime(seconds)}</p>
              <p className="rest-note">Look away from this screen. Follow baby’s pace.</p>
              <button className="rest-button" onClick={endMoment}>We’re done</button>
            </>
          ) : (
            <>
              <p className="rest-eyebrow">That was enough</p>
              <h1>How did that moment feel?</h1>
              <p className="feedback-privacy">Your answer stays on this device.</p>
              <div className="feedback-grid">
                {["Easy to try", "Baby needed a break", "Wording unclear", "Not for us"].map((option) => (
                  <button
                    key={option}
                    className={feedback === option ? "feedback active" : "feedback"}
                    onClick={() => saveFeedback(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {feedback && <p className="feedback-message">Noted without a score. Every baby and every day is different.</p>}
              <button className="rest-button" onClick={() => setResting(false)}>Back to the activity</button>
              <button className="quiet-link light" onClick={reset}>Start a new moment</button>
            </>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className={`app-shell ${largeText ? "large-text" : ""}`}>
      <header className="topbar">
        <button className="brand" onClick={reset} aria-label="Here, baby home">
          <span className="brand-mark">h,b</span>
          <span>here, baby</span>
        </button>
        <div className="header-tools">
          <button className="tool-button text-tool" onClick={toggleText} aria-pressed={largeText} aria-label="Toggle larger text">Aa</button>
          <button className="tool-button" onClick={() => setNotesOpen(true)}>Test notes <span>{events.length}</span></button>
          <label className="age-select">
            <span>Baby’s age</span>
            <select value={age} onChange={(event) => changeAge(event.target.value as AgeId)}>
              {ageOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
            </select>
          </label>
        </div>
      </header>

      <div className="page-grid">
        <aside className="story-panel">
          <p className="overline">One small moment</p>
          <h1>You don’t need to entertain your baby.</h1>
          <p className="story-copy">Notice what this moment needs. We’ll offer one simple way to connect, then get out of the way.</p>
          <div className="principles"><span>Baby-led</span><span>Screen-light</span><span>No scores</span></div>
          <div className="library-note">
            <strong>{activityCount} drafted moments</strong>
            <span>Now adapted across three early age bands.</span>
          </div>
          <blockquote>
            “Responsive, back-and-forth exchanges help build the foundations for learning and wellbeing.”
            <cite>Developmental principle: serve and return</cite>
          </blockquote>
        </aside>

        <section className="phone-stage" aria-live="polite">
          {!showResult ? (
            <div className="question-card">
              <div className="progress" aria-label={`Step ${step + 1} of 3`}>
                {[0, 1, 2].map((dot) => <span key={dot} className={dot <= step ? "on" : ""} />)}
              </div>
              {answerChips.length > 0 && (
                <div className="answer-chips">
                  {answerChips.map((answer) => <button key={answer.target} onClick={() => setStep(answer.target)}>{answer.label}</button>)}
                </div>
              )}
              <p className="card-kicker">{questions[step].kicker}</p>
              <h2>{questions[step].title}</h2>
              <p className="card-help">Choose what is true right now. There is no best answer.</p>
              <div className="choice-list">
                {questions[step].choices.map((choice) => (
                  <button className="choice" key={choice.id} onClick={() => choose(choice.id)}>
                    <span className="choice-mark" aria-hidden="true">{choice.mark}</span>
                    <span className="choice-copy"><strong>{choice.label}</strong><small>{choice.hint}</small></span>
                    <span className="choice-arrow" aria-hidden="true">→</span>
                  </button>
                ))}
              </div>
              {step > 0 && <button className="quiet-link" onClick={() => setStep(step - 1)}>← Back</button>}
              <button className="boundary-link" onClick={() => setBoundaryOpen(!boundaryOpen)} aria-expanded={boundaryOpen}>
                Born early or receiving specialist care? <span>{boundaryOpen ? "−" : "+"}</span>
              </button>
              {boundaryOpen && (
                <div className="boundary-note">
                  This prototype does not calculate corrected age or replace individualized guidance. Ask your baby’s clinician which age band and activities are appropriate, particularly after NICU care.
                </div>
              )}
            </div>
          ) : (
            <article className="activity-card">
              <div className="result-topline">
                <button className="quiet-link" onClick={() => setShowResult(false)}>← Change context</button>
                <span>{ageProfile.label} · age-aware</span>
              </div>
              <div className="draft-badge">Research-informed draft · clinical review pending</div>
              <p className="card-kicker coral">{activity.eyebrow}</p>
              <h2>{activity.title}</h2>
              <p className="activity-intro">{activity.intro}</p>
              <ol className="steps">
                {activity.steps.map((item, index) => (
                  <li key={item}><span>{index + 1}</span><p>{item}</p></li>
                ))}
              </ol>
              <div className="insight"><strong>Why this moment matters</strong><p>{activity.why}</p></div>
              <div className="stop-cue"><strong>When to pause</strong><p>{activity.stop}</p></div>
              <div className="result-options">
                <button className="quiet-link" onClick={anotherIdea}>Try another idea for this moment</button>
                <span>Recent activities are avoided on this device.</span>
              </div>
              <div className="action-stack">
                {speechAvailable ? (
                  <button className="primary-action" onClick={() => begin(true)}><span>Start & read aloud</span><small>The screen will rest</small></button>
                ) : (
                  <button className="primary-action" onClick={() => begin(false)}><span>Start screen rest</span><small>Spoken guidance unavailable here</small></button>
                )}
                <button className="secondary-action" onClick={() => begin(false)}>Start quietly</button>
              </div>
            </article>
          )}
        </section>
      </div>

      <footer>
        <p><strong>Prototype guidance only.</strong> Not medical advice or a developmental assessment.</p>
        <nav aria-label="Evidence and safety links">
          <a href="https://www.cdc.gov/act-early/milestones/2-months.html" target="_blank" rel="noreferrer">CDC early development</a>
          <a href="https://safetosleep.nichd.nih.gov/reduce-risk/tummy-time" target="_blank" rel="noreferrer">Safe tummy time</a>
          <a href="https://www.cpsc.gov/SafeSleep" target="_blank" rel="noreferrer">Safe sleep</a>
        </nav>
      </footer>

      {notesOpen && (
        <div className="notes-backdrop">
          <button className="notes-scrim" onClick={() => setNotesOpen(false)} aria-label="Close testing notes" />
          <aside className="notes-panel" role="dialog" aria-modal="true" aria-labelledby="notes-title">
            <button className="notes-close" onClick={() => setNotesOpen(false)} aria-label="Close testing notes">×</button>
            <p className="card-kicker">On-device testing</p>
            <h2 id="notes-title">Prototype notes</h2>
            <p className="notes-intro">These lightweight signals stay in this browser. No name, photo, audio or exact birth date is stored.</p>
            <div className="notes-stats">
              <div><strong>{events.length}</strong><span>moments started</span></div>
              <div><strong>{events.filter((item) => item.feedback).length}</strong><span>responses</span></div>
              <div><strong>{new Set(events.map((item) => item.activityId)).size}</strong><span>ideas tried</span></div>
            </div>
            <h3>Recent responses</h3>
            <div className="notes-list">
              {events.filter((item) => item.feedback).slice(-5).reverse().map((item) => (
                <div key={item.id}><strong>{findActivity(item.activityId)?.title ?? "Activity"}</strong><span>{item.feedback}</span></div>
              ))}
              {events.filter((item) => item.feedback).length === 0 && <p>No feedback yet. Try a complete moment first.</p>}
            </div>
            <div className="notes-actions">
              <button className="primary-action compact" onClick={copyTestSummary}>Copy aggregate summary</button>
              <button className="quiet-link danger" onClick={clearTestNotes}>Clear notes</button>
            </div>
            {copyStatus && <p className="copy-status" role="status">{copyStatus}</p>}
          </aside>
        </div>
      )}
    </main>
  );
}
