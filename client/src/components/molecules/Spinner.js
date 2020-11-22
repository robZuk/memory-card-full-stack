import React, { Fragment } from "react";
import spinner from "../../assets/images/spinner.gif";

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: "100px", margin: " 5% auto", display: "block" }}
      alt="Loading..."
    />
  </Fragment>
);
