import { Fragment } from "react";

import Navbar from "@/components/Navbar";

export default function Layout(props) {
  return (
    <Fragment>
      <Navbar />
      <main>{props.children}</main>
    </Fragment>
  );
}
