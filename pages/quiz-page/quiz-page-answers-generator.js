import { birdsDataEn } from "./quiz-page-en-data.js";
/////////////////////////////////////////////////////////////////

// Selectors
const answerHTML = document.querySelectorAll(".main__answer");
const audioHTML = document.querySelector(".main__bird-song");
const descriptionWrapperHTML = document.querySelector(
  ".main__with-description"
);
const withoutDescriptionHTML = document.querySelector(
  ".main__without-description"
);
const descriptionImgHTML = document.querySelector(".main__description-img");
const descriptionNameHTML = document.querySelector(
  ".main__description-name-en"
);
const descriptionSpeciesHTML = document.querySelector(
  ".main__description-species"
);
const descriptionSong = document.querySelector(".main__description-song");
const descriptionText = document.querySelector(".main__description-text");
const scoreHTML = document.querySelector(".header__score");
const headerBirdImgHTML = document.querySelector(".main__bird-photo");
const headerBirdNameHTML = document.querySelector(".main__bird-name");
const nextLevelButtonHMTL = document.querySelector(".main__button__next-level");
const headerBirdTypesHTML = document.querySelectorAll(".main__bird-type");
const linkToLastHTML = document.querySelector(".main__link-to-final");
const finalScore = document.querySelector(".player-score");
const headerHTML = document.querySelector(".header");
const mainHTML = document.querySelector(".main");
const finalMainHMTL = document.querySelector(".final-main");

//////////////////////////////////////////////////////////////////

// Variables

export let mainScore = 0;
let temporaryScore = 5,
  currentTypeOfBirds = 0,
  previousTypeOfBirds = 0;

//////////////////////////////////////////////////////////////////

// Functions
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let randomNumberFromZeroToFive = randomNumber(0, 5);
let birdsDataOneType = birdsDataEn[currentTypeOfBirds];

let correctAnswer = birdsDataOneType[randomNumberFromZeroToFive];

// generate random sounds
const randomSound = () => {
  audioHTML.setAttribute(
    "src",
    `${birdsDataOneType[randomNumberFromZeroToFive].audio}`
  );

  audioHTML.setAttribute(
    "id",
    `${birdsDataOneType[randomNumberFromZeroToFive].id}`
  );
};

// displays answer options
const answersGenerator = () => {
  answerHTML.forEach((element, index) => {
    element.innerHTML = `${birdsDataOneType[index].name}`;
    element.setAttribute("id", birdsDataOneType[index].id);
  });
};

// displays description every choosen bird
const descriptionUpdater = (element) => {
  const id = element.getAttribute("id");
  const { audio, description, image, name, species } = birdsDataOneType[id - 1];

  descriptionWrapperHTML.classList.remove("displayNone");
  withoutDescriptionHTML.classList.add("displayNone");

  descriptionImgHTML.src = `${image}`;
  descriptionNameHTML.innerHTML = `${name}`;
  descriptionSpeciesHTML.innerHTML = `${species}`;
  descriptionSong.setAttribute("src", `${audio}`);
  descriptionText.innerHTML = `${description}`;
};

// When correct answer is found, function change the name and image in header
const headerNameAndImgChanger = (tempScore) => {
  mainScore += tempScore;
  scoreHTML.innerHTML = `${mainScore}`;
  finalScore.innerHTML = `${mainScore}`;

  console.log(mainScore);

  headerBirdNameHTML.innerHTML = `${correctAnswer.name}`;
  headerBirdImgHTML.src = `${correctAnswer.image}`;
  nextLevelButtonHMTL.classList.add("active-bird-type");
  nextLevelButtonHMTL.setAttribute("active", "false");
};

const activeBirdType = () => {
  headerBirdTypesHTML.forEach((type, index, array) => {
    type.classList.remove("active-bird-type");
    if (type.getAttribute("id") == currentTypeOfBirds + 1) {
      type.classList.add("active-bird-type");
    }
  });
};

const removePrevBirdsData = () => {
  headerBirdNameHTML.innerHTML = "* * * * *";
  headerBirdImgHTML.src =
    "https://birds-quiz.netlify.app/static/media/bird.06a46938.jpg";
  descriptionWrapperHTML.classList.add("displayNone");
  withoutDescriptionHTML.classList.remove("displayNone");

  console.log(correctAnswer);
};

const answerChecker = () => {
  console.log(correctAnswer);
  answerHTML.forEach((element, index, array) => {
    element.addEventListener("click", (el) => {
      const clickedElementID = el.target.getAttribute("id");
      descriptionUpdater(element);
      if (correctAnswer.id == clickedElementID) {
        element.classList.add("main__right-answer");
        headerNameAndImgChanger(temporaryScore);
        nextLevelButtonHMTL.setAttribute("active", "true");
        nextLevelFunction();
      } else {
        element.classList.add("main__wrong-answer");
        if (temporaryScore == 0) {
          temporaryScore = 0;
        } else {
          temporaryScore--;
        }
      }
      console.log(temporaryScore, "temp score");
    });
  });
};

const resetingData = () => {
  console.log("reset run");
  randomNumberFromZeroToFive = randomNumber(0, 5);
  temporaryScore = 5;
  birdsDataOneType = birdsDataEn[currentTypeOfBirds];
  correctAnswer = birdsDataOneType[randomNumberFromZeroToFive];
  answersGenerator();
  removePrevBirdsData();
  randomSound();
  // answerChecker();

  answerHTML.forEach((element, index, array) => {
    element.classList.remove("main__right-answer");
    element.classList.remove("main__wrong-answer");
  });

  nextLevelButtonHMTL.classList.remove("active-bird-type");
};

const nextLevelListener = () => {
  if (
    currentTypeOfBirds !== 5 &&
    nextLevelButtonHMTL.getAttribute("active") == "true"
  ) {
    // mainScore += temporaryScore;
    // scoreHTML.innerHTML = `${mainScore}`;

    currentTypeOfBirds++;
    previousTypeOfBirds = currentTypeOfBirds - 1;

    nextLevelButtonHMTL.setAttribute("active", "false");

    activeBirdType();
    resetingData();
  } else if (currentTypeOfBirds == 5) {
    console.log("toptop");
    finalMainHMTL.classList.remove("displayNone");
    mainHTML.classList.add("displayNone");
    headerHTML.classList.add("displayNone");
    // linkToLastHTML.setAttribute("href", "../final-page/final-page.html");
  }
};

const nextLevelFunction = () => {
  nextLevelButtonHMTL.addEventListener("click", nextLevelListener);
};

// export default mainScore;
randomSound();
answersGenerator();
answerChecker();
