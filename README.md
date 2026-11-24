# Raayu — here, baby

A mobile-first prototype that helps caregivers of babies through the first year choose one short,
age-aware, screen-light interaction based on the baby’s current state, the
caregiver’s capacity, and the moment they are already sharing.

The library currently covers six stages from birth to 12 months, with 10
contextual ideas per stage, three additional 6–8 month games, and comfort paths.
Each stage includes a concise safety lens and links to official age guidance.

## Everyday companion

- Today: rotating ideas for the selected age, with recently tried ideas moved down.
- Discover: search and category filters, favourites, and direct access to activities.
- Our journal: dated observations, memories, clinician questions, and a text export
  including activity history. Up to 200 notes and 100 activity sessions are retained.
- Care guide: personal environment reminders and links to CDC, NIH, and CPSC resources.

The selected age, favourites, journal, reminders, and activity history are stored
in this browser's local storage. There is no account, cloud sync, or automatic
backup. Export the journal to keep a copy before changing devices or clearing
browser data. Data controls are in the Care guide. Journals can contain personal
information; other people using the same browser can read them.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validate

```bash
npm run lint
npm run build
node --test tests/personalization.test.mjs
```

## Deploy to Vercel

This is a standard Next.js application with no required environment variables.
Import the GitHub repository into Vercel and accept the detected Next.js
defaults, or deploy it using the Vercel CLI.

## Important product boundary

The activity library is a research-informed prototype awaiting clinical review.
It is not medical advice or a developmental assessment.

## Personalised play

Optional nickname, interests, familiar phrase, and quiet preference stay in local
storage under `raayu-baby-profile-v1`. Age remains a manually selected band.
Recommendations use explicit interest tags, daily rotation, and caregiver-reported
baby reactions. A recent stop/disinterest response lowers a card for three days;
engagement supports later familiar repeats. Caregiver ease is not treated as proof
that baby enjoyed an activity. These editorial ranking rules are not validated.

The caregiver play guide presents setup, one turn, observation, and optional
repetition. It has no skill score, required response, or escalation of difficulty.
Every activity exposes source notes linking WHO guidance, AAP play examples, and
CDC resources. Those sources support principles, not the app or its exact scripts.
Evidence does not establish that Raayu improves IQ or accelerates milestones.
