import React from "react";
import DayBlock from "../DayBlock/DayBlock";
import Loading from "../Loading/Loading";

import WrapWithApiData from "../../hoc/WrapWithApiData";
import { SnowLoader } from "../SnowLoader/SnowLoader";

const prettyTitle = function (titlestring: string) {
  const splitStr = titlestring.toLowerCase().split("-");
  return splitStr.map(function (i) { return i.charAt(0).toUpperCase() + i.substring(1); }).join(" ");
};


interface IProps {
  days?: any[] | null,
  name?: string,
  webcamUrl?: string,
  deleteCard: () => void,
  openPopup: (url: string) => void
}
// eslint-disable-next-line react/prop-types
const WeatherCard = ({ days = null, name, webcamUrl = "", deleteCard, openPopup }: IProps) => {
  return (
    <div className='weather-card'>
      {days ?
        <div>
          <div className='weather-card-header'>
            <div>
              <h2>
                {name ? prettyTitle(name) : null}
              </h2>
              {webcamUrl != "" &&
              (<h2 className='webcam-button' onClick={openPopup.bind(this, webcamUrl)}>
                📷
              </h2>)}
            </div>
            <i onClick={deleteCard}
              className='icon-cancel-circled2 delete-button'></i>
          </div>
          <div className='weather-card-inner'>
            {
              days ?
                days.map((dayData, index) => {
                  return dayData.time && index < 5 ?
                    <DayBlock key={dayData.name + index}
                      data={dayData}
                      type={"weather-card-day-" + index} /> :
                    null;
                })
                :
                <Loading />
            }
          </div>
        </div>
        :
        <div>
          <SnowLoader/>
        </div>
      }
    </div>
  );
};

export default WrapWithApiData<IProps>(WeatherCard);
