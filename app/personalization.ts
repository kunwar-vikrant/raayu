import { ageOptions, type Activity, type AgeId } from "./activities";

export const interests = [
  { id: "sounds", label: "Sounds & songs" },
  { id: "faces", label: "Faces & expressions" },
  { id: "movement", label: "Moving & stretching" },
  { id: "objects", label: "Looking & exploring" },
] as const;
export type Interest = typeof interests[number]["id"];
export type BabyProfile = { nickname: string; interests: Interest[]; phrase: string; quiet: boolean };
export type BabyResponse = "engaged" | "observing" | "break" | "not-interested";
export type PlayHistory = { activityId: string; startedAt: string; age?: AgeId; babyResponse?: BabyResponse; feedback?: string | null };
export const defaultProfile: BabyProfile = { nickname: "", interests: [], phrase: "", quiet: false };
export const PROFILE_KEY = "raayu-baby-profile-v1";
export const responseOptions: Array<{ id: BabyResponse; label: string }> = [
  { id: "engaged", label: "Wanted another turn" },
  { id: "observing", label: "Quietly watching" },
  { id: "not-interested", label: "Not interested today" },
  { id: "break", label: "Needed to stop" },
];
export function parseProfile(raw: unknown): BabyProfile {
  if (!raw || typeof raw !== "object") return defaultProfile;
  const data = raw as Partial<BabyProfile>;
  return { nickname: typeof data.nickname === "string" ? data.nickname.slice(0, 30) : "", phrase: typeof data.phrase === "string" ? data.phrase.slice(0, 100) : "", quiet: data.quiet === true, interests: Array.isArray(data.interests) ? interests.filter((interest) => data.interests!.includes(interest.id)).map((interest) => interest.id) : [] };
}

// Explicit editorial tags, not developmental scores or inferred abilities.
const soundIds = new Set(["n-hold-voice", "n-feed-hum", "n-walk-sound", "e-hold-coo", "e-care-rhyme", "e-walk-stop", "s-hold-copy", "s-feed-voice", "s-walk-direction", "d-hold-chat", "d-feed-after", "d-walk-rhythm", "x-hold-babble", "c-hold-clap"]);
const faceIds = new Set(["n-hold-face", "e-hold-smile", "e-floor-face", "e-feed-after", "s-hold-name", "s-floor-tummy", "d-hold-chuckle", "x-hold-mirror", "x-hold-peekaboo", "x-feed-family", "c-hold-gesture", "c-walk-hello"]);
export function activityInterest(activity: Activity): Interest {
  if (soundIds.has(activity.id)) return "sounds";
  if (faceIds.has(activity.id)) return "faces";
  if (["n-floor-watch", "e-floor-kick", "s-floor-hands", "d-floor-roll", "d-care-toes"].includes(activity.id)) return "movement";
  return "objects";
}
export function rankActivities(candidates: Activity[], profile: BabyProfile, history: PlayHistory[], day: number, now = day * 86400000): Activity[] {
  const rotated = [...candidates.slice(day % (candidates.length || 1)), ...candidates.slice(0, day % (candidates.length || 1))];
  const score = (activity: Activity) => {
    const matching = history.filter((event) => event.activityId === activity.id && (!event.age || event.age === activity.age));
    const latest = matching.at(-1);
    const daysSince = latest ? Math.max(0, (now - Date.parse(latest.startedAt)) / 86400000) : Infinity;
    let value = profile.interests.includes(activityInterest(activity)) ? 4 : 0;
    // Lead the everyday play surface with play; routine-care cards remain available.
    if (["holding", "floor"].includes(activity.context)) value += 2;
    if (profile.quiet && activityInterest(activity) === "sounds") value -= 6;
    if (latest?.babyResponse === "engaged") value += 3;
    if (latest?.babyResponse === "not-interested" && daysSince < 3) value -= 12;
    if (latest?.babyResponse === "break" && daysSince < 3) value -= 16;
    if (daysSince < 1) value -= 9;
    return value;
  };
  return rotated.sort((a, b) => score(b) - score(a));
}
export function recommendationReason(activity: Activity, profile: BabyProfile, history: PlayHistory[]): string {
  const latest = history.filter((event) => event.activityId === activity.id && (!event.age || event.age === activity.age)).at(-1);
  if (latest?.babyResponse === "engaged") return "You reported wanting another turn last time. Familiar play can be worth repeating.";
  if (profile.interests.includes(activityInterest(activity))) return `Matches your selected interest: ${interests.find((interest) => interest.id === activityInterest(activity))?.label.toLowerCase()}.`;
  if (profile.quiet) return "Quiet mode is on. Keep sounds soft or use a silent expression instead.";
  return "An idea for this age. Add interests and a play reflection to make future suggestions more relevant.";
}
export function playAdaptation(activity: Activity, profile: BabyProfile, age: AgeId) {
  const name = profile.nickname || "your baby";
  const early = ["newborn", "emerging", "social"].includes(age);
  const interest = activityInterest(activity);
  const phrase = profile.phrase ? `Use your familiar phrase: “${profile.phrase}”.` : "Use a short, familiar word or phrase in your home language.";
  if (activity.context === "feeding") return { invitation: `Keep ${name}’s feed as the main event. ${phrase} Save playful exchanges for after feeding, if baby is comfortably alert.`, engaged: "Respond with one warm look or phrase, then return your attention to safe, responsive feeding.", observing: "Quiet company is enough. There is no need to add another prompt.", variation: "Repeat the same calm ending phrase after a future feed; skip it if baby is tired." };
  return {
    invitation: interest === "sounds" ? `${profile.quiet ? "Use a silent smile instead of a sound" : `Answer one sound from ${name}, or offer one soft sound`}. ${phrase} Then wait.` : interest === "faces" ? `Let ${name} notice your relaxed face. Offer one slow expression, then pause. ${phrase}` : interest === "movement" ? `Notice one movement ${name} makes independently. Describe it once, then wait; let baby choose whether to move again.` : `Follow one thing ${name} is already looking at within this activity. Name it once. Wait before adding more.`,
    engaged: early ? "Repeat the very same tiny exchange once. A look, movement or sound can be a turn; no smile is required." : "Repeat what baby responded to once, then leave space for their version. Copy their action or sound without making the game faster or louder.",
    observing: "Stay still and give baby more time. Try fewer words or one smaller expression. If interest does not return, finish comfortably.",
    variation: early ? "Next time, use the same words and a longer quiet pause. More stimulation is not a goal." : interest === "sounds" ? "Next time, copy baby’s rhythm rather than adding a new sound. Let baby lead the change." : interest === "faces" ? "Next time, keep the same expression and let baby choose when the next turn begins." : "Next time, follow a different safe detail baby notices in this same activity. Keep the setup and safety steps unchanged.",
  };
}
export function activityEvidence(activity: Activity) {
  return {
    principle: activity.context === "feeding" ? "Responsive everyday care" : "Responsive play and back-and-forth interaction",
    explanation: activity.context === "feeding" ? "WHO recommends responsive caregiving in the first three years. This card adds a relationship prompt; it does not prescribe feeding practices." : "WHO recommends responsive caregiving and early learning. CDC and AAP give examples such as copying sounds, following attention and exploring safely. This app’s wording and personalisation rules are adaptations, not tested interventions.",
    links: [
      { title: "WHO: early childhood development guideline", url: "https://www.who.int/publications/i/item/97892400020986/" },
      { title: "AAP: age-specific play ideas", url: "https://www.healthychildren.org/English/family-life/power-of-play/Pages/The-Power-of-Play-How-Fun-and-Games-Help-Children-Thrive.aspx" },
      { title: "CDC: development and activity guidance", url: ageOptions.find((option) => option.id === activity.age)?.developmentUrl ?? "https://www.cdc.gov/act-early/milestones/" },
    ],
  };
}
