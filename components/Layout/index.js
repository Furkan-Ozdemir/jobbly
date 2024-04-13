import { Fragment, useEffect } from "react";

import Navbar from "@/components/Navbar";
import { animatePageIn } from "@/utils/animations";
import generateColor from "@/utils/generateColor";

export default function Layout(props) {
  const color = generateColor();
  useEffect(() => {
    animatePageIn();
  });
  return (
    <Fragment>
      <div
        style={{
          height: "100vh",
          width: "25vw",
          background: `${color}`,
          position: "fixed",
          zIndex: 10,
          left: 0,
        }}
        id="bannerOne"
      ></div>
      <div
        style={{
          height: "100vh",
          width: "25vw",
          background: `${color}`,
          position: "fixed",
          zIndex: 10,
          left: "25%",
          filter: "brightness(0.9)",
        }}
        id="bannerTwo"
      ></div>
      <div
        style={{
          height: "100vh",
          width: "25vw",
          background: `${color}`,
          position: "fixed",
          zIndex: 10,
          left: "50%",
          filter: "brightness(0.8)",
        }}
        id="bannerThree"
      ></div>
      <div
        style={{
          height: "100vh",
          width: "25vw",
          background: `${color}`,
          position: "fixed",
          zIndex: 10,
          left: "75%",
          filter: "brightness(0.7)",
        }}
        id="bannerFour"
      ></div>
      <Navbar />
      <main>{props.children}</main>
    </Fragment>
  );
}
