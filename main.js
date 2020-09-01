window.addEventListener("load", () => {
  init();
});

const allWords =
  "Untimely problem depicts due to a anyone inevitable shame for lot whereas a religious formula tragic manifestation religious due to a ergo. Depicts doom some lot phenomenal depicts to ergo manifestation. Next formula due to flaws defined depicts given shown prowess personal could because heroic nobody embodies demise portrayal! Given can in certainly could prophecy certainly anyone due to. Thus some could case prowess case portrayal due to untimely to. Hero traits given God ever hence nobody shown personal shame specifically traits depict. Presents in, life, personal to such moreover a such has heroic humanity. Copy portrayal depicts has been unknowingly ergo unknowingly, formula lot good. Personal his ergo copy God faces phenomenal case personal certainly problem. Portrays untimely case prophecy given personal faces manifestation in, our representing fact could shocking shame as anyone. Depicts, point an without, flaws God heroic religious a untimely religious an religious shown untimely shocking good ergo his. Next problem humanity manifestation flaws his for tragic point death due to ergo presents given formula shown presents given next. To a due to yet good yet phenomenal shown can because tragic, demise such doom time far heroic nobody ever tragic, ergo. Tragic depict given ergo to tragic certainly demise vivid.";
const words = allWords.split(" ");
words.sort(() => 0.5 - Math.random());
// const words = ["when", "first", "look", "which", "himself", "here", "away", "looked", "young", "thought", "where", "well", "your", "head", "down", "never", "many", "might", "being", "life", "long", "poor", "were", "another", "went", "take", "those", "hand", "eyes", "them", "think", "then", "back", "done", "could", "been", "about", "before", "said", "tell", "place", "should", "good", "what", "just", "took", "every", "upon", "only", "more", "over", "from", "know", "great", "seemed", "having", "with", "they", "make", "house", "came", "time", "always", "most", "last", "have", "ever", "come", "than", "mind", "like", "dear", "nothing", "these", "will", "miss", "into", "even", "face", "there", "though", "without", "much", "still", "quite", "this", "their", "shall", "some", "while", "little", "after", "better", "would", "must", "other", "very", "such", "made", "again"]

const amountToShow = 20;

let GAME = {
  correctWords: [],
  wordsEntered: [],
  currentIndex: 0,
  charsPerMin: 0,
  countCorrect: 0,
  timeLeft: 60,
  initialTime: 60,
  counting: false,
  gameBlocked: false,
  inputChars: "",
  lastChar: "",
  charIndex: 0,
  typingWord: "",
  errorCount: 0,
};

// INITILIAZE GAME
const init = () => {
  resetInput();
  colorInput();
  renderCompleted();
  renderCurrent();
  renderNextWords();
  updateStats();
};

//highlight (focus) the main input field // FOCUS INPUT
const colorInput = () => {
  const inputEl = document.querySelector("#word-input");
  inputEl.focus();
};

//  RESETS VALUE OF INPUT TO EMPTY
const resetInput = () => {
  const inputEl = document.querySelector("#word-input");
  inputEl.value = "";
};

// GET READY TO START GAME/TYPING
const gameReady = () => {
  console.log("ready to start");
  colorInput();
  resetInput();
};

// RESET GAME FOR RESET BUTTON // ...GAME GETS ALL CURRENT VALUES
const resetGame = () => {
  GAME = {
    ...GAME,
    inputChars: "",
    lastChar: "",
    charIndex: 0,
    typingWord: "",
    errorCount: 0,
  };
};

//SET GAME TO INDICATE THE TIMER IS RUNNING
const startCountDown = () => {
  let interval = setInterval(this.checkGameInterval, 100);
  // SET INTERVAL AT 60 // START COuNTING
  GAME = {
    ...GAME,
    interval: interval,
    counting: true,
  };
};

//every time the interval is reached, decrement time left, or stop if 0
checkGameInterval = () => {
  if (GAME.timeLeft <= 0) {
    let interval = GAME.interval;
    resetGame(interval);
    GAME = {
      ...GAME,
      gameBlocked: true,
      timeLeft: 0,
    };
    // call so that the next words will be strikethrough if time out
    renderNextWords();
  } else {
    GAME = {
      ...GAME,
      timeLeft: GAME.timeLeft - 0.1,
    };
  }
  updateCountDown();
};

//RESET GAME TO INITIAL GAME
const handleReset = () => {
  console.log("clearing the state");
  colorInput();
  // RESET TIMELEFT CLASSES
  // const timeLeft = document.querySelector(".timeLeft");
  // timeLeft.classList.remove("yellowTime");
  // timeLeft.classList.remove("yellowTime");
  // timeLeft.classList.add("whiteTime");
  resetGame(GAME.interval);
  GAME = {
    correctWords: [],
    wordsEntered: [],
    currentIndex: 0,
    charsPerMin: 0,
    countCorrect: 0,
    timeLeft: 60,
    initialTime: 60,
    counting: false,
    gameBlocked: false,
    inputChars: "",
    lastChar: "",
    charIndex: 0,
    typingWord: "",
    errorCount: 0,
  };
  // REINITIALIZE
  init();
  // RENDER TIME LEFT
  updateCountDown();
};

// GET NEXT WORDS FROM ARRAY // RENDER NEXT WORDS INTO HTML
const getNextWords = () => {
  // return GAME.words.slice(GAME.currentIndex + 1,GAME.words.length)
  return words.slice(GAME.currentIndex + 1, GAME.currentIndex + 20);
};

const checkBlocked = () => {
  return GAME.gameBlocked === true ? "gameBlocked" : " ";
};

const renderNextWords = () => {
  const nextEl = document.querySelector(".Next");
  nextEl.innerHTML = `
    ${getNextWords()
      .map(
        (word, index) =>
          `<span class=${checkBlocked()} key=${index}>${word + " "}</span>`
      )
      .join("")}`;
};

// IN-PROGRESS WORD - ADD CLASS CORRECT OR WRONG
const renderCurrent = () => {
  const el = document.querySelector(".Current");
  const doneTyped = document.querySelector(".done");
  const inprogressWord = document.querySelector(".in-progress");
  doneTyped.innerHTML = GAME.typingWord;
  const currentWord = words[GAME.currentIndex];
  inprogressWord.innerHTML =
    currentWord.slice(GAME.charIndex, currentWord.length) + " ";
  if (GAME.errorCount === 0) {
    el.classList.add("correct");
    el.classList.remove("wrong");
  } else {
    el.classList.add("wrong");
    el.classList.remove("correct");
  }
};

//when a word is typed and submitted, move on to the next word
const wordSubmit = (correctOrFalse, inputWord) => {
  console.log(GAME);
  GAME = {
    ...GAME,
    currentIndex: GAME.currentIndex + 1,
    correctWords: GAME.correctWords.concat(correctOrFalse),
    wordsEntered: GAME.wordsEntered.concat(inputWord),
    countCorrect: GAME.countCorrect + correctOrFalse,
    charsPerMin: GAME.charsPerMin + inputWord.length * correctOrFalse,
  };
  console.log(GAME);
};

// CHECK IF CURRENT LETTER IN THE WORD IS TRUE OR FALSE
const handleKeyDown = (e) => {
  console.log("handleKeyDown", e.key);
  if (GAME.gameBlocked) return;
  let currentWord = words[GAME.currentIndex];
  if (e.key === " ") {
    if (GAME.inputChars) {
      //non empty input
      if (GAME.typingWord === currentWord) {
        wordSubmit(1, GAME.typingWord);
      } else {
        wordSubmit(0, GAME.typingWord);
      }
      resetGame();
    }
    // DISABLE DELETE WHEN THERE IS NO WORDS
    console.log("enter was pressed");
  } else if (e.key === "Backspace") {
    if (GAME.errorCount > 0) {
      GAME = {
        ...GAME,
        typingWord: GAME.typingWord.slice(0, GAME.typingWord.length - 1),
        errorCount: GAME.errorCount - 1,
      };
    } else if (GAME.typingWord.length > 0) {
      GAME = {
        ...GAME,
        typingWord: GAME.typingWord.slice(0, GAME.typingWord.length - 1),
        charIndex: GAME.charIndex - 1,
      };
    }
  }

  init();
};

// HANDLE CURRENT VALUE OF LETTER IN WORD - HANDLE ERROR COUNT

const handleChange = (e) => {
  console.log("handleChange", e.target.value);
  // IF GAME is NOT PLAYING DONT RUN THIS FUNCTION

  if (GAME.gameBlocked) return;
  // GET LAST CHARACTER, WORD TO TYPE

  let lastChar = e.target.value[e.target.value.length - 1] || "";
  let typingWord = GAME.typingWord + lastChar;
  let currentWord = words[GAME.currentIndex];

  GAME = {
    ...GAME,
    typingWord: typingWord,
    inputChars: e.target.value,
    lastChar: lastChar,
  };

  //IF NO WRONG CHARACTERS TYPED
  if (GAME.errorCount === 0) {
    //no timers running
    if (GAME.counting === false) {
      startCountDown();
    }
    //GET CHAR ENTERED IF CORRECTLY GO TO NEXT CHAR
    if (lastChar === currentWord.charAt(GAME.charIndex)) {
      GAME = {
        ...GAME,
        charIndex: GAME.charIndex + 1,
      };
      //IF CHAR WAS A SPACE GO TO THE NEXT WORD
    } else if (e.target.value === "" || lastChar === " " || lastChar === "") {
      //reset
      GAME = {
        ...GAME,
        inputChars: "",
        lastChar: "",
        charIndex: 0,
        typingWord: "",
        errorCount: 0,
      };
    } else {
      // IF CHAR WAS WRONG ERROR INCREMENT ERROR COuNT
      GAME = {
        ...GAME,
        errorCount: GAME.errorCount + 1,
      };
      console.log(GAME.errorCount, "ERROR COUNT");
    }
  } else {
    //IF CHAR IS ALREADY WRONG STAY IN GAME ERROR
    GAME = {
      ...GAME,
      errorCount: GAME.errorCount + 1,
    };
  }

  init();
};

// GET COMPLETED INDEX OF WORDS - SEE IF WORD IS WRONG OR CORRECT

const getCompletedColor = (index) => {
  let checkedIndex;
  if (GAME.currentIndex < amountToShow) {
    checkedIndex = index;
  } else {
    checkedIndex = checkedIndex = index + GAME.currentIndex - amountToShow;
  }
  console.log("checkedIndex", checkedIndex);
  let correctWord = words[checkedIndex];
  let enteredWord = GAME.wordsEntered[checkedIndex];
  console.log("correct word:", correctWord);
  return correctWord === enteredWord ? "correct" : "wrong";
};

//SLICE AND MAP COMPLETED WORDS //ADD TO COMPLETED WORDS SPAN AS CORRECT WORD
const renderCompleted = () => {
  const completedEl = document.querySelector(".Completed");
  if (GAME.currentIndex < amountToShow) {
    completedEl.innerHTML = `
    ${GAME.wordsEntered
      .slice(0, GAME.currentIndex)
      .map(
        (word, index) =>
          `<span class=${getCompletedColor(index)} key=${index}>${
            word + " "
          }</span>`
      )
      .join("")}
  `;
  } else {
    // SLICE AND MAP COMPLETED WORD IF IT IS WRONG AND SPACE IS ENTERED ADD WORD TO COMPLETED WORDS IN RED
    completedEl.innerHTML = `
    ${GAME.wordsEntered
      .slice(GAME.currentIndex - amountToShow, GAME.currentIndex)
      .map(
        (word, index) =>
          `<span class=${getCompletedColor(index)} key=${index}>${
            word + " "
          }</span>`
      )
      .join("")}`;
  }
};

// STATS
//use words entered and correct words to find accuracy
const getAccuracy = () => {
  if (GAME.wordsEntered.length === 0) return 0;
  else
    return `${Math.floor(
      (100 * GAME.countCorrect) / GAME.wordsEntered.length
    )} % `;
};

//since set state is async, timer goes to negative time sometimes
const setTime = () => {
  if (GAME.timeLeft < 0) return 0;
  return `${Math.ceil(GAME.timeLeft)} s`;
};

const getTimeColor = () => {
  if (GAME.timeLeft > 0 && GAME.timeLeft < 30) {
    return "yellowTime";
  } else if (GAME.timeLeft > 30) {
    return "whiteTime";
  } else if (GAME.timeLeft <= 15) return "redTime";
};

// ... ANIMATIONS IF TIME IS LESS THAN 0
const getAnimations = () => {
  let animatedDots = ["....", "...", "..", "."];
  let index = Math.ceil(GAME.timeLeft * 2) % 4;
  if (GAME.timeLeft < 60) return animatedDots[index];
  return "...";
};

//RENDER UPDATED STATS
const updateStats = () => {
  const countCorrect = document.querySelector(".countCorrect");
  const charsPerMin = document.querySelector(".charsPerMin");
  const accuracy = document.querySelector(".accuracy");

  countCorrect.innerHTML = GAME.countCorrect;
  charsPerMin.innerHTML = GAME.charsPerMin;
  accuracy.innerHTML = getAccuracy();
};

// RENDER THE COUNTDOWN TIMER AND ANIMATIONS
const updateCountDown = () => {
  const timeLeft = document.querySelector(".timeLeft");
  const secondsLeft = document.querySelector(".secondsLeft");
  const animation = document.querySelector(".animation");

  timeLeft.classList.add(getTimeColor());
  secondsLeft.innerHTML = setTime();
  animation.innerHTML = getAnimations();
};
// // LISTENERS

// window.addEventListener("load", init);

// // GLOBALS

// const allWords =
//   "Untimely problem depicts due to a anyone inevitable shame for lot whereas a religious formula tragic manifestation religious due to a ergo. Depicts doom some lot phenomenal depicts to ergo manifestation. Next formula due to flaws defined depicts given shown prowess personal could because heroic nobody embodies demise portrayal! Given can in certainly could prophecy certainly anyone due to. Thus some could case prowess case portrayal due to untimely to. Hero traits given God ever hence nobody shown personal shame specifically traits depict. Presents in, life, personal to such moreover a such has heroic humanity. Copy portrayal depicts has been unknowingly ergo unknowingly, formula lot good. Personal his ergo copy God faces phenomenal case personal certainly problem. Portrays untimely case prophecy given personal faces manifestation in, our representing fact could shocking shame as anyone. Depicts, point an without, flaws God heroic religious a untimely religious an religious shown untimely shocking good ergo his. Next problem humanity manifestation flaws his for tragic point death due to ergo presents given formula shown presents given next. To a due to yet good yet phenomenal shown can because tragic, demise such doom time far heroic nobody ever tragic, ergo. Tragic depict given ergo to tragic certainly demise vivid.";

// let wordArray = allWords.split(" ");

// let shuffledArray = wordArray.sort(() => 0.5 - Math.random());

// const shuffledString = shuffledArray.slice(0, 120).join(" ");

// //WORD INPUT GLOBALS
// // let currentIndex = 0;
// let currentLetter = 0;
// let currentWrongLetter = 0;
// let expectedLetter = 0;
// let correctLetters = [];
// // let currentLetterIndex = allWords.slice(0, expectedLetter);

// // COUNTDOWN GLOBALS
// let time = 60;

// // GAME GLOBALS
// let isPlaying;

// // SELECTORS
// let timeDisplay = document.querySelector("#time");
// let WPMDisplay = document.querySelector("#words-per-minute");
// let CPMDisplay = document.querySelector("#chars-per-minute");
// // const gameMessage = document.querySelector("#game-message");

// // FUNCTIONS;

// function init() {
//   // ADDWORDS
//   createString();
//   // SET COUNTDOWN INTERVAL
//   setInterval(countdown, 1000);
//   // CHECK STATUS INTERVAL
//   setInterval(checkStatus, 50);
//   checkStatus();
// }
// // COUNTDOWN

// function countdown() {
//   // MAKE SURE TIME IS NOT RUN OUT

//   if (time > 0) {
//     // DECREASE TIME
//     time--;
//   } else if (time === 0) {
//     // SET TO FALSE IF PLAYER IS NOT PLAYING
//     isPlaying = false;
//     console.log(isPlaying, "IS PLAYING");
//   }
//   // SHOW TIME
//   timeDisplay.innerHTML = time;
// }

// // CHECK GAME STATUS
// function checkStatus() {
//   if (!isPlaying && time === 0) {
//     isPlaying = false;
//     // RESET TIME & CREATE NEW STRING
//     time = 60;
//     createString();
//   }
// }

// function createString() {
//   // CREATE RANDOM STRING
//   let shownLetters = (document.getElementById(
//     "words"
//   ).innerHTML = shuffledString.slice(currentLetter, currentLetter + 100));

//   document.getElementById("words").innerHTML = shownLetters;
// }

// function startMatch(letters) {
//   if (shuffledString === letters) {
//     console.log(shuffledString, "SHUFFLED STRING START MATCH");
//     console.log(expectedLetter, "EXPECTED LETTERS START MATCH");
//     isPlaying = true;
//     time = 60;
//     timeDisplay.innerHTML = time + " SEC";
//     console.log("Matched");
//     createString();
//   }
// }

// // function wordPerMinute() {

// //   if (!isPlaying && time === 0) {
// //   }
// // }

// function matchWords(event) {
//   console.log(event);
//   //EXPECTED LETTER
//   let expectedLetter = shuffledString.slice(0, currentLetter + 1);
//   console.log(expectedLetter, "EXPECTED LETTER");

//   //ADD WORDS WHEN CORRECT
//   let shownLetters = (document.getElementById(
//     "words"
//   ).innerHTML = shuffledString.slice(currentLetter, currentLetter + 100));

//   //CORRECT LETTER INPUT
//   const letterInput = document.getElementById("input").value;
//   console.log(letterInput, "LETTER INPUT");

//   // GET CORRECT LETTERS
//   let correctLetter = shuffledString.slice(currentLetter, currentLetter + 1);
//   console.log(correctLetter, "CORRECT LETTER");

//   // FIND WRONG LETTER INPUT
//   console.log(currentLetter);
//   console.log(currentWrongLetter);

//   const wrongLetterInput = document.getElementById("input").value;

//   // const wrongLetterInput = letterInput.slice(expectedLetter, currentLetter);
//   if (letterInput === expectedLetter) {
//     //ADD TO CURRENT LETTER COUNTER
//     currentLetter++;
//     console.log(currentLetter, "LETTER CORRECT");

//     correctLetters.push(correctLetter);
//     console.log(correctLetters, "CORRECT LETTERS");
//     //CREATE CORRECT LETTER SPAN

//     addCorrectLetter(correctLetter);

//     // PREVENT DELETE AFTER SPACEBAR

//     // if (event.inputType === "deleteContentBackward" && letterInput === expectedLetter) {
//     //     event.preventDefault(event);
//     //     console.log("PREVENT BACKSPACE");
//     //   }
//     // }

//     // WORDS PER MINUTE //

//     numberOfCorrectWords = correctLetters.join("").split(" ").length;
//     numberOfAllWords = shuffledString.split(" ").length;
//     console.log(numberOfCorrectWords, "NUMBER OF CORRECT WORDS");
//     console.log(numberOfAllWords, "NUMBER OF ALL WORDS");
//     wordsPerSecond = numberOfCorrectWords / time;
//     console.log(wordsPerSecond, "WORDS PER SECOND");
//     wordsPerMinute = Math.floor(wordsPerSecond * time) - 1;
//     console.log(wordsPerMinute, "WORDS PER MINUTE");
//     WPMDisplay.innerHTML = wordsPerMinute;

//     // CHARS PER MINUTE

//     numberOfCorrectChars = correctLetters.length;
//     numberOfAllChars = shuffledString.length;
//     console.log(numberOfCorrectChars, "NUMBER OF CORRECT WORDS");
//     console.log(numberOfAllChars, "NUMBER OF ALL WORDS");
//     charsPerSecond = numberOfCorrectChars / time;
//     console.log(charsPerSecond, "CHARS PER SECOND");
//     charsPerMinute = Math.floor(charsPerSecond * time);
//     console.log(charsPerMinute, "CHARS PER MINUTE");
//     CPMDisplay.innerHTML = charsPerMinute;

//     startMatch(letterInput);
//   } else if (wrongLetterInput !== expectedLetter) {
//     // SLICE WRONG LETTERS
//     console.log(letterInput, "WRONG LETTER - LETTER INPUT");
//     let allWrongLetters = letterInput.slice(currentLetter);
//     console.log(allWrongLetters, "ALL WRONG LETTERS");

//     addWrongLetter(allWrongLetters);
//   }
// }

// const addCorrectLetter = (correctLetter) => {
//   correctWord = document.createElement("SPAN");
//   correctWord.classList.add("correct-words");
//   correctWord.id = "correct-word";
//   const allCorrectWords = document.getElementById("correct-words");
//   const addCorrectWord = allCorrectWords.appendChild(correctWord);
//   addCorrectWord.innerHTML = correctLetter;
//   if (addCorrectWord.innerHTML === undefined) {
//   }
// };

// const addWrongLetter = (allWrongLetters) => {
//   //CREATE CORRECT LETTER SPAN
//   let lastLetter = allWrongLetters[allWrongLetters.length - 1];
//   // const lastLetter = charAt(allWrongLetters.length - 1);
//   console.log(lastLetter, "LAST LETTER");
//   if (lastLetter === undefined) {
//     lastLetter = "";
//   }

//   /* Create the wrong letter element */
//   let wrongLetterElem = document.createElement("SPAN");
//   wrongLetterElem.classList.add("wrong-words");
//   wrongLetterElem.id = "wrong-word";
//   wrongLetterElem.innerHTML = lastLetter;

//   /* Add wrong letter element to list of wrong letters */
//   let allWrongWords = document.getElementById("wrong-words");
//   let addWrongWord = allWrongWords.appendChild(wrongLetterElem);

//   if (event.inputType === "deleteContentBackward") {
//     console.log("DELETE PRESSED");
//     allWrongWords.removeChild(allWrongWords.lastChild);
//     allWrongWords.removeChild(allWrongWords.lastChild);
//     // var lastWrongLetter = document.getElementById("wrong-word");
//     // lastWrongLetter.parentNode.removeChild(allWrongWords.lastChild);
//     // lastWrongLetter.parentNode.removeChild(allWrongWords.lastChild);
//   }
// };

// THROWAWAY // THROWAWAY // THROWAWAY // THROWAWAY //

// let splitCorrectWords = correctLetter.split(" ");
// console.log(splitCorrectWords);
// let mappedCorrectWords = splitCorrectWords.map(letters, index);
// console.log(mappedCorrectWords);

// var words = document.getElementById("words").value;
// const expectedString = wordArray.slice(0, currentIndex + 1).join(" ");
// console.log(expectedString, "EXPECTED STRING");

// let expectedWord = wordArray.slice(currentIndex, currentIndex + 1);

// const wordInput = document.getElementById("input").value;

//FUNCTIONS

// window.onload = function createWords() {
//   document.getElementById("words").innerHTML = wordArray[currentIndex];
// };

// function matchWords(event) {
//   const wordInput = document.getElementById("input").value;
//   const letterInput = document.getElementbyId("input").value;
//   console.log(wordInput);

//   var words = document.getElementById("words").value;
//   const expectedString = wordArray.slice(0, currentIndex + 1).join(" ");
//   console.log(expectedString, "EXPECTED STRING");

//   // let expectedWord = wordArray.slice(currentIndex, currentIndex + 1);

//   let expectedLetter = allWords.slice(0, currentLetter + 1);
//   console.log(expectedLetter, "EXPECTED LETTER");

//   if ((wordInput == expectedString) & (letterInput == expectedLetter)) {
//     console.log("correct");
//     currentIndex++;
//     currentLetter++;
//     document.getElementById("words").innerHTML = wordArray
//       .slice(0, currentIndex + 1)
//       .join(" ");
//   } else if (
//     (wordInput !== expectedString) &
//     (letterInput !== expectedLetter)
//   ) {
//     console.log();
//   }
// }
