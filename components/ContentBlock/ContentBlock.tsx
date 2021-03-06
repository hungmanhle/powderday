import React, { Component } from "react";

class ContentBlock extends Component<{type: string}> {
    
  render(){
    return (
      <div className={"content-block " + this.props.type}>
        {this.props.children}
      </div>
    );
  }
}

export default ContentBlock;
