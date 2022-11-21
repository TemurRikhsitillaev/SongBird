console.log(
  "Большая просьба к вам, можете проверить мою работу в последний день так как я думал что пропустил это задание на прошлой неделе и недавно узнал что она до сих активна."
);
import { birdsDataEn } from "./quiz-page-en-data.js";

const birdImgHTML = document.querySelector(".main__bird-photo");
const answersGeneratorWrapperHTML = document.querySelector(
  ".main__answer-choices__wrapper"
);
const answerHTML = document.querySelectorAll("main__answer");
answerHTML.forEach((el) => console.log(el));

const answersGenerator = () => {
  const birdsDataOneType = birdsDataEn[0];

  console.log(birdsDataOneType);
};
answersGenerator();

// Audio player
