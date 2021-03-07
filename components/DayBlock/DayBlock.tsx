import React, { Component, ReactElement } from "react";
import DataBlock from "../DataBlock/DataBlock";

class DayBlock extends Component<{data: unknown, type: string}> {
  render(): ReactElement {
    return (
      <DataBlock data={this.props.data} type={this.props.type}/>
    );
  }
}

export default DayBlock;
