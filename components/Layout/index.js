import { Fragment, useEffect } from "react";

import Navbar from "@/components/Navbar";
import { animatePageIn } from "@/utils/animations";
import generateColor from "@/utils/generateColor";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/dist/TextPlugin";

gsap.registerPlugin(useGSAP, TextPlugin);

export default function Layout(props) {
  const color = generateColor();
  useEffect(() => {
    animatePageIn();
  });
  useGSAP(() => {
    gsap.to(`#loading`, {
      text: "loading...",
      duration: 1,
      repeat: -1,
      yoyo: true,
    });
  });
  return (
    <Fragment>
      <div
        style={{
          height: "100vh",
          width: "25vw",
          background: `${color.background}`,
          position: "fixed",
          zIndex: 10,
          left: 0,
          color: `${color.text}`,
        }}
        id="bannerOne"
      ></div>
      <div
        style={{
          height: "100vh",
          width: "25vw",
          background: `${color.background}`,
          position: "fixed",
          zIndex: 10,
          left: "25%",
          filter: "brightness(0.9)",
          color: `${color.text}`,
          fontSize: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        id="bannerTwo"
      >
        <div id="loading"></div>
      </div>
      <div
        style={{
          height: "100vh",
          width: "25vw",
          background: `${color.background}`,
          position: "fixed",
          zIndex: 10,
          left: "50%",
          filter: "brightness(0.8)",
          color: `${color.text}`,
        }}
        id="bannerThree"
      ></div>
      <div
        style={{
          height: "100vh",
          width: "25vw",
          background: `${color.background}`,
          position: "fixed",
          zIndex: 10,
          left: "75%",
          filter: "brightness(0.7)",
          color: `${color.text}`,
        }}
        id="bannerFour"
      ></div>
      <Navbar />
      <main>{props.children}</main>
    </Fragment>
  );
}
