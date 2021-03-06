import React, { Component } from "react";
import Image from "next/image";
// const ignore

class DataBlockShort extends Component<{type: string, data: any[]}> {
  findTotal(arrayOfValues) {
    return arrayOfValues.reduce((a, b) => {
      if (!!parseInt(a, 10) && !!parseInt(b, 10)) {
        return parseInt(a, 10) + parseInt(b, 10);
      }
      if (parseInt(a, 10)) { return a; }
      if (parseInt(b, 10)) { return b; }
      return "-";
    });
  }
  lolEmoji(lol) {
    switch (lol) {
    case "rain":
      return <Image src={"/images/rain.png"} alt='rain' width={32} height={32} />;
    case "temp":
      return <Image src={"/images/temp.png"} alt='rain' width={32} height={32} />;
    case "snow":
      return <Image src={"/images/snow.png"} alt='rain' width={32} height={32} />;
    default:
      return lol;
    }
  }

  render() {
    return (
      <div className='measurement-row'>
        <div key={this.props.type} className={"icon"}>
          {this.lolEmoji(this.props.type)}</div>
        <div>{this.props.type === "temp" ?
          this.props.data[1] :
          this.findTotal(this.props.data)
        }
        </div>
      </div>
    );
  }
}


export default DataBlockShort;
