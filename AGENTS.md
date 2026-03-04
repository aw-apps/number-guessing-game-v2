# AGENTS.md

## Project Goal
Build a lightweight, polished browser number-guessing game MVP that runs as a static site with zero runtime dependencies and can be deployed on GitHub Pages.

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript (ES2020+)
- Browser localStorage API
- No build step, no framework, no backend

## Architecture Overview
- `index.html`: semantic structure and UI regions (status, controls, score)
- `styles.css`: responsive layout, visual states, accessibility-friendly styling
- `script.js`: core game state, input validation, scoring, rendering, restart logic
- Optional `assets/`: icons/images if needed

## Open-source References
Use these only as inspiration for UX/game mechanics, do not copy code:
- https://github.com/DevGoyalG/Number-Guessing-Game
- https://github.com/abidhassan01/NumberGuessingGame
- https://github.com/amulyalovescoding/guess-my-number

## Package Usage Principles
- Prefer zero dependencies
- If any dependency is proposed, justify necessity in PR description
- Keep project runnable by opening `index.html` directly

## Acceptance Criteria (Project-wide)
1. User can play a complete game from start to finish in browser.
2. Input validation is explicit and user-friendly.
3. Game provides deterministic UI state updates after each guess.
4. Best score persists via localStorage across page refresh.
5. UI is usable on mobile and desktop widths.
6. README explains run, test, and deploy steps.
7. GitHub Actions workflows (`implement.yml`, `review.yml`) remain functional.
