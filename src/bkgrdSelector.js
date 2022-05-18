import firstBackground from "./backgrounds/background-1.jpg";
import secondBackground from "./backgrounds/background-2.jpg";
import thirdBackground from "./backgrounds/background-3.jpg";
import fourthBackground from "./backgrounds/background-4.jpg";
import fifthBackground from "./backgrounds/background-5.jpg";
import sixthBackground from "./backgrounds/background-6.jpg";

export default function choosePic() {
  let myBackground = [
    firstBackground,
    secondBackground,
    thirdBackground,
    fourthBackground,
    fifthBackground,
    sixthBackground,
  ];

  let randomNum = Math.floor(Math.random() * myBackground.length);

  return myBackground[randomNum];
}
