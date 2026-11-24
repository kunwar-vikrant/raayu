export type AgeId =
  | "newborn"
  | "emerging"
  | "social"
  | "discovering"
  | "exploring"
  | "communicating";

export type Activity = {
  id: string;
  age: AgeId | "all";
  context: string;
  eyebrow: string;
  title: string;
  intro: string;
  steps: string[];
  why: string;
  stop: string;
};

export const ageOptions: Array<{
  id: AgeId;
  label: string;
  note: string;
  safety: string;
  developmentUrl: string;
}> = [
  {
    id: "newborn", label: "0–4 weeks", note: "Very small, quiet exchanges",
    safety: "Support head and neck, keep interactions brief, and use a firm, flat, bare sleep space for every sleep.",
    developmentUrl: "https://www.cdc.gov/act-early/milestones/2-months.html",
  },
  {
    id: "emerging", label: "5–8 weeks", note: "More looking, movement and early sounds",
    safety: "Stay within reach during awake floor time and pause at early tired or overwhelmed signals.",
    developmentUrl: "https://www.cdc.gov/act-early/milestones/2-months.html",
  },
  {
    id: "social", label: "9–12 weeks", note: "Longer alert moments and social responses",
    safety: "Use only fully supervised, awake tummy time; always begin sleep on baby’s back.",
    developmentUrl: "https://www.cdc.gov/act-early/milestones/2-months.html",
  },
  {
    id: "discovering", label: "3–5 months", note: "Reaching, rolling attempts and playful sound turns",
    safety: "Rolling can appear suddenly. Use the floor for play and keep one hand on baby on raised surfaces.",
    developmentUrl: "https://www.cdc.gov/act-early/milestones/4-months.html",
  },
  {
    id: "exploring", label: "6–8 months", note: "Sitting, transferring objects and curious exploration",
    safety: "Expect mouthing and growing mobility. Remove small objects, batteries, magnets and unsafe cords from reach.",
    developmentUrl: "https://www.cdc.gov/act-early/milestones/6-months.html",
  },
  {
    id: "communicating", label: "9–12 months", note: "Gestures, imitation, shared attention and moving with purpose",
    safety: "Childproof before crawling or pulling up: anchor furniture, block stairs and keep choking hazards locked away.",
    developmentUrl: "https://www.cdc.gov/act-early/milestones/1-year.html",
  },
];

const sharedStop = "Pause if baby looks away repeatedly, yawns, stiffens, splays their fingers or becomes fussy.";

export const cards: Activity[] = [
  // 0–4 weeks: holding
  {
    id: "n-hold-face", age: "newborn", context: "holding", eyebrow: "Close and quiet", title: "Your face is enough",
    intro: "Newborns do not need a performance. A familiar face and voice are plenty.",
    steps: ["Hold baby securely in your usual supported position.", "Let your face rest where baby can comfortably notice it.", "Say one soft phrase, then wait without asking for a response."],
    why: "Warm, predictable presence helps a newborn begin learning the rhythm of interaction.", stop: sharedStop,
  },
  {
    id: "n-hold-voice", age: "newborn", context: "holding", eyebrow: "A familiar anchor", title: "One phrase, twice",
    intro: "Repetition can make a brand-new world feel a little more predictable.",
    steps: ["Choose a short phrase such as “I’ve got you.”", "Say it slowly once while baby is settled.", "Wait several seconds. If baby remains comfortable, say it once more."],
    why: "A repeated voice pattern offers connection without demanding attention.", stop: sharedStop,
  },
  // 0–4 weeks: floor
  {
    id: "n-floor-watch", age: "newborn", context: "floor", eyebrow: "Awake floor time", title: "Watch one movement",
    intro: "Observation counts. You do not need to make baby move in a particular way.",
    steps: ["Stay beside baby while they lie awake on their back in a clear, safe floor space.", "Notice one natural arm, leg or head movement.", "Name it softly: “Your hand moved.” Then pause."],
    why: "Following rather than directing helps the caregiver learn this individual baby’s signals.", stop: sharedStop,
  },
  {
    id: "n-floor-light", age: "newborn", context: "floor", eyebrow: "Gentle visual noticing", title: "Light and stillness",
    intro: "A newborn may spend only a few seconds looking. That is a complete moment.",
    steps: ["Stay close while baby is awake on their back in a safe floor space.", "Notice whether baby looks toward your face or a softly lit area of the room.", "Quietly name what they seem to notice, then let the scene stay still."],
    why: "Simple shared attention connects a word and a real experience without adding stimulation.", stop: "Move baby away from direct sun or harsh light. " + sharedStop,
  },
  // 0–4 weeks: care
  {
    id: "n-care-story", age: "newborn", context: "care", eyebrow: "Connection inside care", title: "Tell the tiny story",
    intro: "Diapering already contains your voice, face and reassuring touch.",
    steps: ["Keep one hand on baby and move at your normal safe pace.", "Name one thing happening: “Fresh diaper” or “Here is your sock.”", "Finish with the same phrase each time: “All done. I’ve got you.”"],
    why: "Predictable words can help routine care feel safe and social.", stop: "Focus fully on safe care whenever needed. Never leave baby unattended on a raised surface.",
  },
  {
    id: "n-care-pause", age: "newborn", context: "care", eyebrow: "A pause in the routine", title: "Hello, little foot",
    intro: "A body-care moment can also be a gentle introduction to language.",
    steps: ["During dressing, securely support baby and notice one hand or foot.", "Name it once: “That is your foot.”", "Pause before continuing, noticing any look or movement."],
    why: "Naming what is already happening adds language without creating another task.", stop: "Keep baby warm and safely supported. Stop the interaction if care needs your full attention.",
  },
  // 0–4 weeks: feeding
  {
    id: "n-feed-quiet", age: "newborn", context: "feeding", eyebrow: "No extra task", title: "Quiet company",
    intro: "Feeding is already a full sensory and relationship experience.",
    steps: ["Use the safe feeding position recommended for your baby.", "Let a stretch of the feed stay quiet.", "Notice baby’s pace without trying to teach or entertain."],
    why: "Calm attention is meaningful interaction by itself.", stop: "Follow your healthcare professional’s feeding guidance. This is not feeding advice.",
  },
  {
    id: "n-feed-hum", age: "newborn", context: "feeding", eyebrow: "Familiar sound", title: "A two-line hum",
    intro: "A short, steady sound can accompany feeding without taking it over.",
    steps: ["Settle into your usual safe feeding position.", "Hum one short line at a comfortable volume.", "Return to quiet and follow baby’s feeding signals."],
    why: "A familiar voice can add warmth while keeping feeding responsive.", stop: "Stop if sound distracts or unsettles baby. Follow your clinician’s feeding guidance.",
  },
  // 0–4 weeks: walking
  {
    id: "n-walk-room", age: "newborn", context: "walking", eyebrow: "A very small tour", title: "One room, one word",
    intro: "The home is already new enough. Choose only one thing to notice.",
    steps: ["Carry or move with baby using your usual safe, supported method.", "Pause at one calm place, such as a window or doorway.", "Name one thing in a soft voice, then continue your day."],
    why: "One real word in a shared setting is more appropriate than a stream of stimulation.", stop: "Avoid direct sun, strong temperature changes and loud areas. End if baby shows stress.",
  },
  {
    id: "n-walk-sound", age: "newborn", context: "walking", eyebrow: "A familiar sound", title: "Pause and listen",
    intro: "Ordinary household sounds can become a moment of shared attention.",
    steps: ["Move with baby safely supported.", "Pause when you hear one gentle sound, such as water or a fan.", "Say “I hear it too,” then wait for a quiet beat."],
    why: "You are pairing a calm adult response with a sound in baby’s environment.", stop: "Move away from sudden or loud sound. End if baby startles repeatedly or becomes unsettled.",
  },

  // 5–8 weeks: holding
  {
    id: "e-hold-coo", age: "emerging", context: "holding", eyebrow: "Early conversation", title: "Sound, then space",
    intro: "A coo, mouth movement or small expression can be baby’s turn.",
    steps: ["Hold baby securely where they can comfortably notice your face.", "Respond to one sound or expression with a gentle copy.", "Wait longer than feels necessary and see whether baby offers another turn."],
    why: "Back-and-forth timing is the heart of responsive interaction.", stop: sharedStop,
  },
  {
    id: "e-hold-smile", age: "emerging", context: "holding", eyebrow: "Face-to-face", title: "The slow smile",
    intro: "Give baby time to discover your expression rather than presenting it quickly.",
    steps: ["Begin with a relaxed face while holding baby securely.", "When baby looks toward you, slowly smile.", "Pause. If baby responds, describe it softly: “I see you.”"],
    why: "A contingent response helps baby connect their attention with your social reaction.", stop: sharedStop,
  },
  // 5–8 weeks: floor
  {
    id: "e-floor-face", age: "emerging", context: "floor", eyebrow: "Awake floor time", title: "Follow my face",
    intro: "Your face is a naturally interesting object—no flashing toy required.",
    steps: ["Stay beside baby while they lie awake on their back in a clear floor space.", "Bring your face into comfortable view and speak once.", "Move your face only a little to one side; stop and let baby decide whether to follow."],
    why: "Slow movement offers visual practice while preserving baby’s choice to engage.", stop: "Do not continue moving if baby loses interest. " + sharedStop,
  },
  {
    id: "e-floor-kick", age: "emerging", context: "floor", eyebrow: "Movement without directing", title: "Kick commentary",
    intro: "Baby supplies the movement. You supply one warm observation.",
    steps: ["Stay close while baby lies awake on their back in a clear, safe space.", "Wait for a natural kick or stretch.", "Say “Big kick” or “Long stretch,” then pause for another turn."],
    why: "Naming a self-initiated action joins language to baby’s own experience.", stop: sharedStop,
  },
  // 5–8 weeks: care
  {
    id: "e-care-hands", age: "emerging", context: "care", eyebrow: "Predictable care", title: "Two hands, two words",
    intro: "Keep the routine moving while adding one repeatable language pattern.",
    steps: ["During safe dressing, name “one hand” as a sleeve goes on.", "Name “two hands” when both are through.", "Smile or pause if baby looks toward you, then finish care."],
    why: "Short repeated language fits into care without turning it into a lesson.", stop: "Keep baby safely supported and warm. Safe care always comes before interaction.",
  },
  {
    id: "e-care-rhyme", age: "emerging", context: "care", eyebrow: "A familiar rhythm", title: "Your two-line care song",
    intro: "The best song is the one you can remember while tired.",
    steps: ["Choose a simple two-line tune using baby’s name.", "Sing it once during a routine change.", "Use the same tune another day rather than adding more verses."],
    why: "Familiar rhythm can make care feel predictable and connected.", stop: "Keep one hand on baby on raised surfaces and stop singing whenever care needs your full attention.",
  },
  // 5–8 weeks: feeding
  {
    id: "e-feed-pace", age: "emerging", context: "feeding", eyebrow: "Responsive presence", title: "Notice the pace",
    intro: "No chart is needed for this moment—just attention to the feed already happening.",
    steps: ["Use your baby’s recommended safe feeding position.", "Quietly notice when baby’s pace changes.", "Follow the feeding signals and guidance you have been given; no narration is required."],
    why: "Responsive attention during care is a relationship activity in itself.", stop: "This app does not assess feeding. Contact your healthcare professional with any concern.",
  },
  {
    id: "e-feed-after", age: "emerging", context: "feeding", eyebrow: "After the feed", title: "One settled hello",
    intro: "If baby is comfortably alert after feeding, share one quiet social moment.",
    steps: ["Complete feeding and burping according to your usual guidance.", "If baby remains comfortably alert, bring your face into view.", "Say one soft hello, then let quiet return."],
    why: "A brief face-and-voice exchange can fit naturally after care without extending wakefulness.", stop: "Skip this entirely if baby is sleepy, uncomfortable or needs feeding-related care.",
  },
  // 5–8 weeks: walking
  {
    id: "e-walk-stop", age: "emerging", context: "walking", eyebrow: "Shared noticing", title: "The sound stop",
    intro: "Pause once rather than narrating everything around you.",
    steps: ["Move with baby in your usual safe, supported way.", "At one gentle sound, stop and listen together.", "Name it in two words—“water running” or “birds outside”—then continue."],
    why: "Short language tied to a real event supports shared attention.", stop: "Move away from loud, bright, hot or cold environments. End if baby becomes unsettled.",
  },
  {
    id: "e-walk-window", age: "emerging", context: "walking", eyebrow: "A calm view", title: "Window weather",
    intro: "A window can offer movement and light without needing a special toy.",
    steps: ["Hold or move with baby safely supported, away from direct sun.", "Pause near a window and name the weather once.", "Wait for baby’s look or movement before adding one more phrase."],
    why: "Following baby’s response keeps the experience reciprocal rather than instructional.", stop: "Avoid glare, direct sun and temperature extremes. " + sharedStop,
  },

  // 9–12 weeks: holding
  {
    id: "s-hold-copy", age: "social", context: "holding", eyebrow: "A longer social turn", title: "Copy the pattern",
    intro: "Baby may now offer a little sequence: sound, movement, pause.",
    steps: ["Hold baby securely and wait for a sound or expression.", "Copy its rhythm once—not necessarily the exact sound.", "Pause and let baby decide whether the exchange continues."],
    why: "Reciprocal patterns support early communication without requiring words.", stop: sharedStop,
  },
  {
    id: "s-hold-name", age: "social", context: "holding", eyebrow: "Warm recognition", title: "Name and wait",
    intro: "A name can become the beginning of a familiar little exchange.",
    steps: ["While holding baby securely, say their name once in a warm voice.", "Wait for a look, movement or sound.", "Respond to whatever baby does: “There you are.” Then pause again."],
    why: "Waiting leaves room for baby to participate rather than only receive stimulation.", stop: sharedStop,
  },
  // 9–12 weeks: floor
  {
    id: "s-floor-hands", age: "social", context: "floor", eyebrow: "Body discovery", title: "Hands find hands",
    intro: "Let baby’s own hands be the interesting object.",
    steps: ["Stay beside baby while they lie awake on their back in a clear, safe floor space.", "Notice when their hands move near each other or toward their face.", "Name the action once and wait; do not force the hands together."],
    why: "Self-initiated movement supports exploration and gives you something real to talk about.", stop: sharedStop,
  },
  {
    id: "s-floor-tummy", age: "social", context: "floor", eyebrow: "Supervised awake movement", title: "Meet at eye level",
    intro: "If tummy time is already part of baby’s clinician-approved routine, your face can be the activity.",
    steps: ["Place baby on their tummy only while fully awake on a firm, clear floor surface and stay beside them.", "Bring your face down to their level and say one encouraging phrase.", "Keep it brief; return baby to their back when they tire or protest."],
    why: "Your presence can make supervised awake tummy time social without adding equipment.", stop: "Continuous supervision is required. End immediately if baby becomes sleepy, distressed or cannot comfortably reposition their head.",
  },
  // 9–12 weeks: care
  {
    id: "s-care-anticipate", age: "social", context: "care", eyebrow: "A predictable cue", title: "Ready, then change",
    intro: "A repeated phrase can gently signal what happens next.",
    steps: ["Before one familiar care step, say “Ready?” in the same calm tone.", "Pause for a moment, then continue the safe care step.", "Respond to any look or movement without expecting it."],
    why: "Consistent cues help routines feel understandable while leaving room for a response.", stop: "Keep baby safely supported. Do not delay care if baby is cold, upset or needs prompt attention.",
  },
  {
    id: "s-care-choice", age: "social", context: "care", eyebrow: "Follow the interest", title: "What did you notice?",
    intro: "During care, baby may fix on your face, a shadow or their own hand.",
    steps: ["Continue safe diapering or dressing at your normal pace.", "Notice what baby looks toward without redirecting them.", "Name that one thing, then finish care with your familiar ending phrase."],
    why: "Joining baby’s existing focus is responsive and requires no extra activity.", stop: "Never leave baby unattended on a raised surface. Safe care always comes first.",
  },
  // 9–12 weeks: feeding
  {
    id: "s-feed-signal", age: "social", context: "feeding", eyebrow: "Follow the signal", title: "Let baby set the tone",
    intro: "This is a noticing practice for the caregiver, not feeding instruction.",
    steps: ["Use the safe feeding position and approach recommended for your baby.", "Notice one signal you already recognize from your own baby.", "Respond according to your feeding guidance and allow the moment to stay quiet."],
    why: "Confidence grows through everyday observation combined with trusted clinical guidance.", stop: "The app cannot assess intake, swallowing or illness. Contact your healthcare professional with concerns.",
  },
  {
    id: "s-feed-voice", age: "social", context: "feeding", eyebrow: "A familiar ending", title: "Feed, finish, connect",
    intro: "A brief phrase can mark the end of care without trying to keep baby awake.",
    steps: ["Complete feeding according to your usual guidance.", "If baby is comfortably alert, say your familiar ending phrase once.", "If baby is sleepy, skip interaction and move into your safe sleep routine."],
    why: "Responsive endings respect both connection and the need for rest.", stop: "Do not prolong wakefulness. Follow your clinician’s feeding advice and safe sleep guidance.",
  },
  // 9–12 weeks: walking
  {
    id: "s-walk-two", age: "social", context: "walking", eyebrow: "A two-stop tour", title: "Look, pause, move",
    intro: "Two brief stops are enough for an entire little tour.",
    steps: ["Move with baby safely supported.", "Pause at one calm sight and name it; wait for baby’s response.", "Move on. Later, repeat with one different sight and finish."],
    why: "Brief changes followed by pauses support attention without flooding baby with input.", stop: "Avoid bright, loud or uncomfortable environments. End at the first tired or stressed signals.",
  },
  {
    id: "s-walk-direction", age: "social", context: "walking", eyebrow: "Sound in the world", title: "Where did that come from?",
    intro: "Let baby orient naturally; there is no correct direction to turn.",
    steps: ["Move with baby safely supported in a calm environment.", "When a gentle sound happens, pause instead of turning baby toward it.", "Say “I heard that,” and watch what baby chooses to do."],
    why: "Baby keeps control of their attention while you acknowledge the shared event.", stop: "Move away from sudden or loud sounds. Never test hearing with abrupt noise.",
  },

  // 3–5 months: holding
  {
    id: "d-hold-chat", age: "discovering", context: "holding", eyebrow: "A sound conversation", title: "Answer one sound",
    intro: "Baby may experiment with longer coos, squeals or mouth movements.",
    steps: ["Hold baby securely where they can comfortably see you.", "Answer one sound with a similar gentle sound.", "Wait quietly and let baby decide whether there is another turn."],
    why: "Back-and-forth sound play gives baby an active place in the exchange.", stop: sharedStop,
  },
  {
    id: "d-hold-chuckle", age: "discovering", context: "holding", eyebrow: "Play without pressure", title: "The almost-laugh pause",
    intro: "A smile, wiggle or almost-laugh can be enough; you do not need to chase a bigger reaction.",
    steps: ["Begin with a familiar smile or playful phrase.", "If baby responds, repeat it once.", "Then pause with a relaxed face and notice whether baby invites more."],
    why: "Repeating and pausing helps play stay responsive instead of overwhelming.", stop: sharedStop,
  },
  // 3–5 months: floor
  {
    id: "d-floor-reach", age: "discovering", context: "floor", eyebrow: "Baby chooses the movement", title: "One reach, no test",
    intro: "A reach can be exploration, not a skill to pass.",
    steps: ["Place baby awake on their back in a clear floor space and stay beside them.", "Offer one clean, intact, age-appropriate object within easy reach.", "Wait without moving baby’s arm; describe any look, swipe or touch."],
    why: "Space to initiate helps baby connect attention with their own movement.", stop: "Remove anything with loose parts, cords, batteries or magnets. End if baby tires or becomes frustrated.",
  },
  {
    id: "d-floor-roll", age: "discovering", context: "floor", eyebrow: "Room to move", title: "A view to one side",
    intro: "Some babies begin rolling now; others do not. This is simply an invitation to look and move.",
    steps: ["Keep baby awake on a firm, clear floor space while you stay within reach.", "Settle yourself slightly to one side and say baby’s name once.", "Let baby turn, reach or stay still without pulling an arm or leg."],
    why: "Following an interesting person can invite self-directed movement without positioning baby by force.", stop: "Never practise rolling on a bed, sofa or changing surface. Pause at any sign of strain or distress.",
  },
  // 3–5 months: care
  {
    id: "d-care-toes", age: "discovering", context: "care", eyebrow: "Language inside routine", title: "A tiny body map",
    intro: "Dressing already offers simple words linked to real sensations.",
    steps: ["Keep baby securely supported during dressing.", "Name one body part as clothing passes it: “Here is your foot.”", "Wait for one look or movement, then finish the routine."],
    why: "Words are easier to understand when they arrive with a familiar experience.", stop: "Keep one hand on baby on raised surfaces and let safe, warm care take priority.",
  },
  {
    id: "d-care-pause", age: "discovering", context: "care", eyebrow: "Predictable sequence", title: "Ready, sleeve, done",
    intro: "Three repeatable words can make a routine feel more understandable.",
    steps: ["Before a familiar dressing step, say “Ready.”", "Complete the step safely and say “Sleeve” or “Sock.”", "Finish with “Done,” then pause for baby’s response."],
    why: "A consistent word sequence helps connect language with what happens next.", stop: "Do not delay care if baby is cold or upset. Never leave baby unattended on a raised surface.",
  },
  // 3–5 months: feeding
  {
    id: "d-feed-notice", age: "discovering", context: "feeding", eyebrow: "Responsive presence", title: "Notice the pause",
    intro: "This is caregiver observation, not feeding instruction.",
    steps: ["Use the feeding approach and position recommended for your baby.", "Notice one natural pause or shift in attention.", "Respond according to baby’s feeding signals and your professional guidance; no extra play is needed."],
    why: "Calm observation supports responsive care without turning feeding into a lesson.", stop: "The app cannot assess intake, swallowing or readiness for solids. Contact your healthcare professional with concerns.",
  },
  {
    id: "d-feed-after", age: "discovering", context: "feeding", eyebrow: "Connection after care", title: "One sound after",
    intro: "If baby is comfortably alert after a feed, leave room for one conversational turn.",
    steps: ["Complete feeding and related care using your usual guidance.", "If baby remains settled and alert, answer one sound or expression.", "Pause, then end rather than extending wakefulness."],
    why: "A brief response follows baby’s readiness instead of demanding attention during feeding.", stop: "Skip this if baby is sleepy, uncomfortable or needs feeding-related care.",
  },
  // 3–5 months: walking
  {
    id: "d-walk-color", age: "discovering", context: "walking", eyebrow: "One thing outside", title: "Find one colour",
    intro: "A whole walk does not need a running commentary.",
    steps: ["Carry or move with baby using your usual secure method.", "Pause at one comfortable view and name a single colour you see.", "Wait for baby’s look or movement, then continue."],
    why: "A simple word tied to a shared view keeps language concrete and low-pressure.", stop: "Keep baby protected from direct sun, loud traffic and temperature extremes. End if baby becomes unsettled.",
  },
  {
    id: "d-walk-rhythm", age: "discovering", context: "walking", eyebrow: "Familiar rhythm", title: "Three steps, one pause",
    intro: "A short repeated rhythm can make movement feel social and predictable.",
    steps: ["Move with baby safely supported.", "Say the same quiet word across three ordinary steps.", "Pause your voice, not your secure support, and notice any sound or movement from baby."],
    why: "Repetition followed by silence creates space for baby to take a turn.", stop: "Keep full attention on safe movement and surroundings. Stop the game if it distracts you or baby.",
  },

  // 6–8 months: holding
  {
    id: "x-hold-babble", age: "exploring", context: "holding", eyebrow: "Babble has a turn", title: "Copy the rhythm",
    intro: "Baby’s repeated sounds can become a tiny conversation.",
    steps: ["Hold baby securely and listen for one sound pattern.", "Copy its rhythm once in your own comfortable voice.", "Wait long enough for baby to answer, change the pattern or finish."],
    why: "Taking turns with sounds supports the social rhythm that comes before words.", stop: "Lower your voice or finish if baby looks away, stiffens, fusses or needs to move.",
  },
  {
    id: "x-hold-mirror", age: "exploring", context: "holding", eyebrow: "Faces together", title: "Two faces in the mirror",
    intro: "A reflection can be interesting without asking baby to recognise who it is.",
    steps: ["Hold baby securely beside a fixed or baby-safe unbreakable mirror.", "Name your own face, then baby’s, using one short phrase each.", "Copy one expression baby makes and pause."],
    why: "Faces, expressions and simple labels create a natural social exchange.", stop: "Keep glass, sharp edges and unsecured mirrors out of reach. Turn away if baby seems overstimulated.",
  },
  // 6–8 months: floor
  {
    id: "x-floor-transfer", age: "exploring", context: "floor", eyebrow: "Hands exploring", title: "One object, two hands",
    intro: "Baby can investigate an object in their own way; there is no correct hand to use.",
    steps: ["Sit close to baby in a clear floor space with one clean, intact, age-appropriate object.", "Offer it within reach and let baby grasp, mouth or transfer it independently.", "Describe one action, then stay quiet while baby explores."],
    why: "Self-directed handling links vision, touch and movement while your words follow baby’s action.", stop: "Use nothing small enough to choke on and nothing with loose parts, cords, magnets or accessible batteries. Supervise continuously.",
  },
  {
    id: "x-floor-hide", age: "exploring", context: "floor", eyebrow: "A gentle surprise", title: "Partly hidden",
    intro: "A familiar object can briefly disappear without becoming a performance.",
    steps: ["Place one large, age-appropriate object on the floor while you stay beside baby.", "Partly cover the object with a small cloth, leaving much of it visible.", "Wait to see what baby does; uncover it after a moment if needed."],
    why: "A partly hidden object invites curiosity while keeping the challenge small and optional.", stop: "Keep cloth away from baby’s face and remove it immediately after the game. Never use this during sleep or leave baby unattended.",
  },
  // 6–8 months: care
  {
    id: "x-care-ready", age: "exploring", context: "care", eyebrow: "A cue before action", title: "Ready for the next bit?",
    intro: "A pause before a familiar care step can make room for baby’s response.",
    steps: ["Keep baby safely supported and say “Ready?” before one routine step.", "Pause for a look, sound or movement without requiring one.", "Complete the step and say “All done.”"],
    why: "Predictable cues support understanding and treat baby as a participant in care.", stop: "Never let the pause compromise warmth, hygiene or safety. Keep one hand on baby on raised surfaces.",
  },
  {
    id: "x-care-name", age: "exploring", context: "care", eyebrow: "Words that belong here", title: "Name what baby found",
    intro: "Baby may reach for a sock, wipe or your hand during care.",
    steps: ["Continue the routine safely while noticing what baby looks toward.", "Name the safe object once: “You found the sock.”", "If it is safe to touch, allow a brief look or touch, then finish care."],
    why: "Following baby’s attention makes language relevant to the moment.", stop: "Keep wipes, creams, fasteners, plastic packaging and other unsafe items out of reach and mouth.",
  },
  // 6–8 months: feeding
  {
    id: "x-feed-finished", age: "exploring", context: "feeding", eyebrow: "Respect the signal", title: "A calm all-done",
    intro: "This moment is about responsive connection, not deciding how much baby should eat.",
    steps: ["Use the feeding position and approach recommended for your baby.", "Notice a signal you already understand, such as turning away or reaching.", "Respond according to your feeding guidance and use one consistent phrase such as “All done.”"],
    why: "Predictable words can accompany responsive care without overriding baby’s signals.", stop: "Always supervise feeding with baby appropriately seated. The app does not assess readiness, texture, allergy, choking or intake.",
  },
  {
    id: "x-feed-family", age: "exploring", context: "feeding", eyebrow: "A social mealtime", title: "One face, one word",
    intro: "Mealtime connection can be very small while safe feeding remains the priority.",
    steps: ["Once baby is securely positioned for feeding, make brief eye contact if baby seeks it.", "Name one familiar person or object at the table.", "Return your attention to baby’s feeding signals and your usual guidance."],
    why: "Simple shared attention helps mealtime feel social without adding a separate task.", stop: "Keep baby upright and supervised according to professional guidance. Do not use this activity to introduce a food or texture.",
  },
  // 6–8 months: walking
  {
    id: "x-walk-shadow", age: "exploring", context: "walking", eyebrow: "Movement in the world", title: "Watch one shadow",
    intro: "A moving shadow can offer a calm, equipment-free moment of shared attention.",
    steps: ["Move with baby safely supported and find a comfortable patch of shade.", "Pause where one shadow moves and say “The shadow moved.”", "Wait for baby’s response before continuing."],
    why: "Naming a visible change connects language with something baby is already noticing.", stop: "Avoid direct sun, heat and glare. Keep full attention on safe footing and baby’s support.",
  },
  {
    id: "x-walk-again", age: "exploring", context: "walking", eyebrow: "A familiar landmark", title: "There it is again",
    intro: "Recognition grows through ordinary repetition, not constant novelty.",
    steps: ["Choose one familiar sight on your usual route, such as a door or tree.", "Pause and use the same two-word label you used before.", "Let baby look or move freely, then carry on."],
    why: "A repeated label in a familiar place helps words become predictable and meaningful.", stop: "Stay away from traffic, animals, plants and objects baby could grab or mouth. End if baby needs rest.",
  },

  // 9–12 months: holding
  {
    id: "c-hold-gesture", age: "communicating", context: "holding", eyebrow: "Gestures are conversation", title: "Wave, then wait",
    intro: "A gesture can carry meaning before a spoken word arrives.",
    steps: ["Hold baby securely and wave once toward a familiar person or object.", "Say one matching word such as “hello” or “bye.”", "Pause without moving baby’s hand; respond warmly to any look, sound or gesture."],
    why: "Pairing a simple gesture with a real event supports communication without requiring imitation.", stop: "Do not repeatedly prompt or move baby’s body for a response. Finish if baby turns away or wants down.",
  },
  {
    id: "c-hold-clap", age: "communicating", context: "holding", eyebrow: "A familiar social game", title: "Your one-line hand game",
    intro: "A tiny repeated game can become a shared routine.",
    steps: ["Choose one short line from a familiar hand game.", "Clap or tap your own hands once while baby is securely supported.", "Pause for baby’s version—watching, moving, sounding or doing nothing all count."],
    why: "Predictable social games bring together rhythm, anticipation and turn-taking.", stop: "Keep movements gentle and never force baby’s hands together. Stop at tired or overwhelmed signals.",
  },
  // 9–12 months: floor
  {
    id: "c-floor-container", age: "communicating", context: "floor", eyebrow: "Cause and effect", title: "In, out, or neither",
    intro: "A container and one large object can support many kinds of exploration.",
    steps: ["Sit beside baby with a stable open container and one large, age-appropriate object.", "Place the object in once, then take it out.", "Offer both and let baby repeat, change or ignore the action."],
    why: "Putting objects in and out supports experimentation while baby controls the play.", stop: "Use only intact items too large to choke on. Avoid lids, cords, sharp edges, magnets, batteries and breakable containers.",
  },
  {
    id: "c-floor-find", age: "communicating", context: "floor", eyebrow: "Remember and search", title: "Where did it go?",
    intro: "A quick hide-and-find can be playful without testing memory.",
    steps: ["Show baby one large, familiar, age-appropriate object on the clear floor.", "Hide it fully under a small cloth while baby watches.", "Ask once, then wait; reveal it cheerfully if baby does not search."],
    why: "Seeing an object disappear and return invites curiosity about things that are out of view.", stop: "Keep the cloth away from baby’s face and remove it when finished. Stay within reach throughout.",
  },
  // 9–12 months: care
  {
    id: "c-care-next", age: "communicating", context: "care", eyebrow: "What comes next", title: "The next-step word",
    intro: "Baby may begin to recognise words that reliably belong to a routine.",
    steps: ["Before one familiar care step, name it with a single word such as “sock.”", "Pause briefly for any look, reach or sound.", "Complete the step safely and say “done.”"],
    why: "A consistent word before an action supports anticipation and understanding.", stop: "Keep baby safely supported and do not let pauses delay necessary care.",
  },
  {
    id: "c-care-choice", age: "communicating", context: "care", eyebrow: "A small participation", title: "Which clean sock?",
    intro: "A choice can invite attention even when baby does not point or reach.",
    steps: ["Hold up two safe, clean clothing items while baby is securely positioned.", "Name each once, then pause.", "Use whichever baby looks toward—or choose one yourself—and continue care without making it a test."],
    why: "A simple, low-stakes choice makes room for baby’s attention and preferences.", stop: "Keep all fasteners, packaging, creams and wipes out of baby’s mouth and reach.",
  },
  // 9–12 months: feeding
  {
    id: "c-feed-words", age: "communicating", context: "feeding", eyebrow: "Language at the table", title: "One mealtime word",
    intro: "Baby does not need a vocabulary lesson while eating.",
    steps: ["Securely position and supervise baby according to your feeding guidance.", "Name one thing already present, such as “cup” or “spoon.”", "Pause and return attention to baby’s comfort and feeding signals."],
    why: "One relevant word is enough to make mealtime linguistic and social.", stop: "The app does not assess food safety, texture, allergy, chewing or swallowing. Follow your healthcare professional’s guidance.",
  },
  {
    id: "c-feed-turn", age: "communicating", context: "feeding", eyebrow: "Communication counts", title: "Notice the request",
    intro: "A look, reach, sound or turn-away can be part of a mealtime exchange.",
    steps: ["Use your baby’s recommended safe feeding setup and approach.", "Notice one communication signal without deciding what it must mean.", "Respond according to your knowledge of baby and your feeding guidance, using one calm phrase."],
    why: "Treating nonverbal signals as meaningful supports responsive communication.", stop: "Always supervise feeding. Seek professional advice for coughing, choking, pain, poor intake or any feeding concern.",
  },
  // 9–12 months: walking
  {
    id: "c-walk-point", age: "communicating", context: "walking", eyebrow: "Shared attention", title: "Follow the point—or the look",
    intro: "Baby may direct attention with a point, reach, sound or long look.",
    steps: ["Move with baby using your usual safe, secure method.", "Notice what baby seems to direct attention toward.", "Name that one thing and wait before adding any more words."],
    why: "Following baby’s attention turns their gesture or gaze into a meaningful conversational turn.", stop: "Keep unsafe objects, animals, traffic and plants out of reach. Baby’s safety matters more than following the look.",
  },
  {
    id: "c-walk-hello", age: "communicating", context: "walking", eyebrow: "A real-world gesture", title: "Hello, then goodbye",
    intro: "A doorway, familiar neighbour or favourite tree can anchor two useful social words.",
    steps: ["Choose one familiar, comfortable stop while baby is safely supported.", "Say “hello” when you arrive and pause.", "Say “goodbye” as you leave; wave once if it fits naturally."],
    why: "Words and gestures gain meaning when they repeatedly match a real beginning or ending.", stop: "Never require baby to interact with another person. Leave if baby seems wary, tired or uncomfortable.",
  },
];

const special: Record<string, Activity> = {
  fussy: {
    id: "special-fussy", age: "all", context: "all", eyebrow: "Connection, not stimulation", title: "Make the world smaller",
    intro: "A fussy baby may need less input. There is nothing to teach right now.",
    steps: ["Reduce noise, movement and bright light where you can.", "Hold baby safely or stay close. Use one steady phrase or a quiet hum.", "Give the same calm response a little time before trying something new."],
    why: "A predictable, responsive adult can help a baby feel safe while they settle.",
    stop: "If crying feels unusual, baby seems unwell or you are concerned, contact your healthcare professional.",
  },
  sleepy: {
    id: "special-sleepy", age: "all", context: "all", eyebrow: "A quiet ending", title: "Name the goodbye",
    intro: "Sleepy signals are a reason to end interaction, not squeeze in one more activity.",
    steps: ["Lower your voice and reduce playful movement.", "Say one familiar ending phrase: “You’re tired. Our little moment is done.”", "Follow your safe sleep routine."],
    why: "Respecting an ending is part of responsive caregiving too.",
    stop: "For sleep, place baby on their back in an approved, firm, flat and bare sleep space.",
  },
  unsure: {
    id: "special-unsure", age: "all", context: "all", eyebrow: "Observation is an activity", title: "Notice before doing",
    intro: "You do not need to decode every signal. Start with ten quiet seconds.",
    steps: ["Make sure baby is safe and supported, then simply watch.", "Notice their eyes, hands and movements without labelling them good or bad.", "If baby looks toward you or makes a sound, respond softly. If not, quiet company is enough."],
    why: "Observation helps caregivers learn an individual baby’s rhythms without forcing interaction.",
    stop: "If you are worried about baby’s behaviour or wellbeing, seek advice from your healthcare professional.",
  },
  empty: {
    id: "special-empty", age: "all", context: "all", eyebrow: "Care for both of you", title: "Enough for now",
    intro: "You do not owe the app—or your baby—an enrichment activity.",
    steps: ["Choose the simplest safe option: quiet holding, or place baby safely in their approved sleep space.", "Take three ordinary breaths. No special technique required.", "If someone trusted is available, ask for a small, specific handoff."],
    why: "A supported caregiver is part of a baby’s nurturing environment. Rest is not a missed milestone.",
    stop: "If you feel you might lose control, place baby safely on their back in an approved bare sleep space, step away briefly and contact someone you trust.",
  },
  break: {
    id: "special-break", age: "all", context: "all", eyebrow: "The caregiver comes first", title: "A safe pause",
    intro: "Taking a break can be a caring response.",
    steps: ["Place baby on their back in an approved, firm, flat and bare sleep space.", "Step into a nearby safe place for a few minutes. Drink water, breathe or message someone you trust.", "Return when you feel steadier. It is okay if baby cries during this brief safe pause."],
    why: "A short safe pause is better than pushing through when you are overwhelmed.",
    stop: "If you fear you may hurt yourself or the baby, contact local emergency help or a trusted person immediately.",
  },
};

export function chooseActivity(input: {
  age: AgeId;
  state: string;
  capacity: string;
  context: string;
  recent: string[];
}): Activity {
  if (input.context === "break") return special.break;
  if (input.capacity === "empty") return special.empty;
  if (input.state === "fussy") return special.fussy;
  if (input.state === "sleepy") return special.sleepy;
  if (input.state === "unsure") return special.unsure;

  const eligible = cards.filter((item) => item.age === input.age && item.context === input.context);
  const fresh = eligible.find((item) => !input.recent.slice(-6).includes(item.id));
  if (fresh) return fresh;
  return eligible[input.recent.length % eligible.length] ?? cards[0];
}

export function findActivity(id: string): Activity | undefined {
  return cards.find((item) => item.id === id) ?? Object.values(special).find((item) => item.id === id);
}

export const activityCount = cards.length + Object.keys(special).length;
