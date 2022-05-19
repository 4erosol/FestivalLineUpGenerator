import background1 from "./backgrounds/background-1.jpg";
import background2 from "./backgrounds/background-2.jpg";
import background3 from "./backgrounds/background-3.jpg";
import background4 from "./backgrounds/background-4.jpg";
import background5 from "./backgrounds/background-5.jpg";
import background6 from "./backgrounds/background-6.jpg";
import background7 from "./backgrounds/background-7.jpeg";
import background8 from "./backgrounds/background-8.jpeg";
import background9 from "./backgrounds/background-9.jpeg";
import background10 from "./backgrounds/background-10.jpeg";
import background11 from "./backgrounds/background-11.jpeg";
import background12 from "./backgrounds/background-12.jpeg";
import background13 from "./backgrounds/background-13.jpeg";
import background14 from "./backgrounds/background-14.jpeg";
import background15 from "./backgrounds/background-15.jpeg";
import background16 from "./backgrounds/background-16.jpeg";
import background17 from "./backgrounds/background-17.jpg";
import background18 from "./backgrounds/background-18.jpg";
import background19 from "./backgrounds/background-19.jpg";
import background20 from "./backgrounds/background-20.jpeg";

export default function choosePic() {
  const images = [
    background1,
    background2,
    background3,
    background4,
    background5,
    background6,
    background7,
    background8,
    background9,
    background10,
    background11,
    background12,
    background13,
    background14,
    background15,
    background16,
    background17,
    background18,
    background19,
    background20,
  ];

  let randomNum = Math.floor(Math.random() * images.length);
  return images[randomNum];
}
