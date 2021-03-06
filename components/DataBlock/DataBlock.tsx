import React, { Component } from "react";
import ContentBlock from "../ContentBlock/ContentBlock";
import DataBlockShort from "./DataBlockShort/DataBlockShort";

class DataBlock extends Component<{data: any, type: string}> {
  render() {
    return (
      <ContentBlock type={this.props.type}>
        <div className='data-block-title'>
          {this.props.data[Object.keys(this.props.data)[0]]}
        </div>
        <div className='data-block-subcontent-wrapper'>
          {
            Object.keys(this.props.data).map((key, index) => {
              return index > 1 ?
                <DataBlockShort
                  key={key + index}
                  type={key}
                  data={this.props.data[key]}
                />
                : null;
            })
          }
        </div>
      </ContentBlock>
    );
  }
}

export default DataBlock;
