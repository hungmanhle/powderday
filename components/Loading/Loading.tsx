import React, { Component } from "react";
import Logo from "../Logo/Logo";

class Loading extends Component {
  render() {
    return (
      <div className='spinner-div'>
        <Logo/>
      </div>
    );
  }
}

export default Loading;
