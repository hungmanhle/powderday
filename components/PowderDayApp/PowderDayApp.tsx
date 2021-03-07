import React, { Component } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import TutorialCard from "../TutorialCard/TutorialCard";
import WebcamModal from "../WebcamModal/WebcamModal";
import localforage from "localforage";
import { SnowLoader } from "../SnowLoader/SnowLoader";

const prettyTitle = function (titlestring: string) {
  const splitStr = titlestring.toLowerCase().split("-");
  return splitStr.map(function (i) { return i.charAt(0).toUpperCase() + i.substring(1); }).join(" ");
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {

}

interface IState {
  mountainList: string[],
  activeMountains: string []
  popup: string | null
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      mountainList: [
        "whistler-blackcomb",
        "apex",
        "big-white",
        "baker-mountain",
        "cypress-mountain",
        "fernie",
        "grouse-mountain",
        "kicking-horse",
        "manning-park-resort",
        "mount-washington",
        "silver-star",
        "sun-peaks",
        "revelstoke",
        "mount-seymour"
      ],
      activeMountains: [],
      popup: ""
    };
  }
  componentDidMount() {
    localforage.getItem<string[]>("activeMountains").then((value) => {
      console.log("cachedMountains", value);
      if (value) { this.setState({ activeMountains: value }); }
    }).catch(function (err) {
      console.log(err);
    });
  }
  addCard(num: number) {
    if (this.state.activeMountains.length === 0 ||
      this.state.activeMountains.findIndex(elem => elem === this.state.mountainList[num]) === -1) {
      localforage.setItem("activeMountains", this.state.activeMountains.concat(this.state.mountainList[num]))
        .then(function (value) {
          console.log("mountainsCached", value);
        }).catch(function (err) {
          console.log(err);
        });
      this.setState({ activeMountains: this.state.activeMountains.concat(this.state.mountainList[num]) });
    }
  }
  displayPopup(url: string) {
    this.setState({ popup: url });
  }
  closePopup(){
    this.setState({popup: null});
  }
  delCard(card: string) {
    const cardIndex = this.state.activeMountains.findIndex(mtn => mtn === card);
    const newState = this.state.activeMountains.slice();
    newState.splice(cardIndex, 1);
    this.setState({ activeMountains: newState },  () => {
      localforage.setItem("activeMountains", this.state.activeMountains)
        .then(function (value) {
          console.log("mountainsCached", value);
        }).catch(function (err) {
          console.log(err);
        });
    });
  }
  navClick = () => {
    console.log("clicked!");
    const navMenu = document.getElementsByClassName("menu")[0];
    const addButton = document.getElementsByClassName("add-button")[0];
    let isMouseDown = false;
    navMenu.classList.toggle("open");
    addButton.classList.toggle("tilt");
    navMenu.addEventListener("mousedown", function () {
      isMouseDown = true;
    });

    navMenu.addEventListener("mouseup", function () {
      isMouseDown = false;
    });

    navMenu.addEventListener("mouseleave", function () {
      isMouseDown = false;
    });

    navMenu.addEventListener("blur", function () {
      if (!isMouseDown) {
        navMenu.classList.remove("open");
        addButton.classList.remove("tilt");
      }
    }, true);

  }
  debounce = (e: any) => {
    if (e.target.classList.contains("add-button")) { return; }
    const navMenu = document.getElementsByClassName("menu")[0];
    const addButton = document.getElementsByClassName("add-button")[0];
    if (!!navMenu && navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
    }
    if (!!addButton && addButton.classList.contains("tilt")) {
      addButton.classList.remove("tilt");
    }
  }
  render() {
    return (
      <div className="App" onClick={this.debounce}>
        <header className="app-header">
          <i className='icon-plus-circled add-button' onClick={this.navClick}></i>
          <div>🏂 Powder Day</div>
        </header>
        <ul className='menu'>
          {this.state.mountainList.map((mtn, i) =>
            <li key={mtn + i} onClick={this.addCard.bind(this, i)}><div>{prettyTitle(mtn)}</div></li>
          )}
        </ul>
        <div className='content'>
          {this.state.activeMountains.length > 0 && this.state.activeMountains.map((mtn) =>
            <WeatherCard key={mtn} apiRoute={`mountain/${mtn}`} deleteCard={this.delCard.bind(this, mtn)} openPopup={this.displayPopup.bind(this)} />
          )}
          {
            this.state.activeMountains.length === 0 &&
            <TutorialCard />
          }
        </div>
        <a href='mailto:hungmle38@gmail.com' className='email-link'>💌</a>
        {this.state.popup && <WebcamModal imgUrls={this.state.popup} closeFunc={this.closePopup.bind(this)}/>}
      </div>
    );
  }
}

export default App;
