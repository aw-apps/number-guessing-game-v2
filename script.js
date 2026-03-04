(function initializeGameShell() {
  const DEFAULT_MAX_ATTEMPTS = 10;
  const BEST_SCORE_KEY = 'number-guessing-best-score';
  const configuredMaxAttempts = Number.parseInt(document.body.dataset.maxAttempts || '', 10);
  const maxAttempts = Number.isInteger(configuredMaxAttempts) && configuredMaxAttempts > 0
    ? configuredMaxAttempts
    : DEFAULT_MAX_ATTEMPTS;

  const elements = {
    guessInput: document.getElementById('guess-input'),
    submitButton: document.getElementById('submit-guess'),
    feedbackText: document.getElementById('feedback-text'),
    attempts: document.getElementById('attempts'),
    bestScore: document.getElementById('best-score'),
    storageMessage: document.getElementById('storage-message'),
    remainingAttempts: document.getElementById('remaining-attempts'),
    restartButton: document.getElementById('restart-game')
  };

  if (
    !elements.guessInput ||
    !elements.submitButton ||
    !elements.feedbackText ||
    !elements.attempts ||
    !elements.bestScore ||
    !elements.storageMessage ||
    !elements.remainingAttempts ||
    !elements.restartButton
  ) {
    return;
  }

  const gameState = {
    target: 0,
    attempts: 0,
    remainingAttempts: maxAttempts,
    isRoundActive: true,
    bestScore: null
  };

  let storageAvailable = true;

  function setStorageMessage(message) {
    elements.storageMessage.textContent = message;
  }

  function getStoredBestScore() {
    try {
      const rawValue = localStorage.getItem(BEST_SCORE_KEY);
      if (rawValue === null) {
        return null;
      }

      const parsed = Number.parseInt(rawValue, 10);
      return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
    } catch {
      storageAvailable = false;
      setStorageMessage('Best score saving is unavailable in this browser mode.');
      return null;
    }
  }

  function persistBestScore(score) {
    if (!storageAvailable) {
      return;
    }

    try {
      localStorage.setItem(BEST_SCORE_KEY, String(score));
    } catch {
      storageAvailable = false;
      setStorageMessage('Best score saving is unavailable in this browser mode.');
    }
  }

  function saveBestScoreIfNeeded() {
    if (gameState.bestScore === null || gameState.attempts < gameState.bestScore) {
      gameState.bestScore = gameState.attempts;
      persistBestScore(gameState.bestScore);
    }
  }

  function render() {
    elements.attempts.textContent = String(gameState.attempts);
    elements.remainingAttempts.textContent = String(gameState.remainingAttempts);
    elements.bestScore.textContent = gameState.bestScore === null ? '-' : String(gameState.bestScore);
    elements.submitButton.disabled = !gameState.isRoundActive;
  }

  function startNewRound() {
    gameState.target = Math.floor(Math.random() * 100) + 1;
    gameState.attempts = 0;
    gameState.remainingAttempts = maxAttempts;
    gameState.isRoundActive = true;
    elements.feedbackText.textContent = 'Start by entering a number.';
    elements.guessInput.value = '';
    render();
  }

  function parseAndValidateGuess(rawValue) {
    if (!rawValue.trim()) {
      return { error: 'Please enter a number between 1 and 100.' };
    }

    const guess = Number(rawValue);
    if (!Number.isFinite(guess)) {
      return { error: 'Invalid input. Please enter a valid number.' };
    }

    if (!Number.isInteger(guess)) {
      return { error: 'Please enter a whole number between 1 and 100.' };
    }

    if (guess < 1 || guess > 100) {
      return { error: 'Out of range. Enter a number from 1 to 100.' };
    }

    return { guess };
  }

  function submitGuess() {
    if (!gameState.isRoundActive) {
      elements.feedbackText.textContent = 'Round over. Press Restart Game to play again.';
      return;
    }

    const result = parseAndValidateGuess(elements.guessInput.value);
    if (result.error) {
      elements.feedbackText.textContent = result.error;
      return;
    }

    const guess = result.guess;
    if (guess === gameState.target) {
      gameState.attempts += 1;
      saveBestScoreIfNeeded();
      gameState.isRoundActive = false;
      elements.feedbackText.textContent = `Correct! You guessed it in ${gameState.attempts} attempt${gameState.attempts === 1 ? '' : 's'}.`;
      render();
      return;
    }

    gameState.attempts += 1;
    gameState.remainingAttempts -= 1;

    if (gameState.remainingAttempts <= 0) {
      gameState.isRoundActive = false;
      elements.feedbackText.textContent = `No attempts left. The number was ${gameState.target}.`;
      render();
      return;
    }

    elements.feedbackText.textContent = guess < gameState.target ? 'Too low. Try a higher number.' : 'Too high. Try a lower number.';
    render();
  }

  elements.submitButton.addEventListener('click', submitGuess);

  elements.restartButton.addEventListener('click', () => {
    startNewRound();
  });

  elements.guessInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      submitGuess();
    }
  });

  gameState.bestScore = getStoredBestScore();
  startNewRound();
})();
