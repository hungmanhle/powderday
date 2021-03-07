import React, { Component } from "react";
import ContentBlock from "../ContentBlock/ContentBlock";

import "./index.css";

class titleBlock extends Component {
  render() {
    return (
      <ContentBlock type={"title"}>
        {/* eslint-disable-next-line react/prop-types */}
        <h2>{this.props.children}</h2>
      </ContentBlock>
    );
  }
}

export default titleBlock;
