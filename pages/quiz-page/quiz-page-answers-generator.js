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

//////////////////////////////////////////////////////////////////

// Variables

let mainScore = 0,
  temporaryScore = 5,
  currentTypeOfBirds = 0,
  previousTypeOfBirds = 0;

//////////////////////////////////////////////////////////////////

// Functions
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomNumberFromZeroToFive = randomNumber(0, 5);
const birdsDataOneType = birdsDataEn[currentTypeOfBirds];

const correctAnswer = birdsDataOneType[randomNumberFromZeroToFive];

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

const headerNameAndImgChanger = () => {
  mainScore = +temporaryScore;
  scoreHTML.innerHTML = `${mainScore}`;

  headerBirdNameHTML.innerHTML = `${correctAnswer.name}`;
  headerBirdImgHTML.src = `${correctAnswer.image}`;
  nextLevelButtonHMTL.classList.add("active-bird-type");
};
console.log(correctAnswer);

const activeBirdType = () => {
  headerBirdTypesHTML.forEach((type, index, array) => {
    type.classList.remove("active-bird-type");
    console.log(type);
    if (type.getAttribute("id") == currentTypeOfBirds + 1) {
      type.classList.add("active-bird-type");
    }
  });
};

const nextLevelListener = () => {
  if (currentTypeOfBirds !== 5) {
    console.log("click");
    currentTypeOfBirds++;
    previousTypeOfBirds = currentTypeOfBirds - 1;

    activeBirdType();
  }
};

const nextLevelFunction = () => {
  nextLevelButtonHMTL.addEventListener("click", nextLevelListener);
};

const answerChecker = () => {
  answerHTML.forEach((element, index, array) => {
    element.addEventListener("click", (el) => {
      const clickedElementID = el.target.getAttribute("id");
      descriptionUpdater(element);
      if (correctAnswer.id == clickedElementID) {
        element.classList.add("main__right-answer");
        headerNameAndImgChanger();
        nextLevelFunction();
      } else {
        element.classList.add("main__wrong-answer");
        if (temporaryScore == 0) temporaryScore = 0;
        else temporaryScore--;
      }
    });
  });
};

const resetingData = () => {};

randomSound();
answersGenerator();
answerChecker();
