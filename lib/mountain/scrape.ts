import { EnumMountain, getWebcamList } from "./mountains";
import cheerio from "cheerio";

export interface IDayForecast {
  name: string;
  time: string[] | null;
  snow: string[] | null;
  rain: string[] | null;
  temp: string[] | null;
}

export interface IMountainForecast {
  name: string;
  days: IDayForecast[];
  webcamUrl: string[];
}

export const performScrape = function (mountain: EnumMountain): Promise<IMountainForecast> {
  const webcamUrl = getWebcamList()[mountain];

  return new Promise(async function (resolve) {
    const url = `http://www.snow-forecast.com/resorts/${mountain}/6day/mid`;

    const res = await fetch(url);

    if (!res.ok) {
      throw res;
    }

    const html = await res.text();
    const $ = cheerio.load(html);
    const createWeatherData = function (dayNodes: Cheerio, timeNodes: Cheerio, snowNodes: Cheerio, rainNodes: Cheerio, tempNodes: Cheerio) {
      const resultObject = { name: `${mountain}`, days: [], webcamUrl: [] } as IMountainForecast;
      if (webcamUrl) {
        resultObject.webcamUrl = webcamUrl;
      }
      dayNodes.each(function (_i, day) {
        let dayText = $(day).text().split(/(\d+)/).join(" ");
        if (!dayText) { dayText = "Today"; }
        const dayForecast = { name: dayText, time: null, snow: null, rain: null, temp: null } as IDayForecast;
        resultObject.days.push(dayForecast);
      });

      addTimedNodes(timeNodes, resultObject, "time");
      addTimedNodes(snowNodes, resultObject, "snow");
      addTimedNodes(rainNodes, resultObject, "rain");
      addTimedNodes(tempNodes, resultObject, "temp");
      return resultObject;
    };

    const addTimedNodes = function (dataTable: Cheerio, resultObject: IMountainForecast, variableName: string) {
      let tempObj: string[] = [];
      dataTable.each(function (index, item) {
        const text = $(item).text();
        tempObj.push(text);
        // console.log(dataTable.length);
        // console.log(j.length);
        if (dataTable.length % 3 == 0 && (index + 1) % 3 == 0) {
          // normal flow...
          // @ts-ignore
          (resultObject.days[((index + 1) / 3) - 1])[variableName] = tempObj;
          tempObj = [];
        }
        else if (dataTable.length + 1 % 3 == 0 && (index + 2) % 3 == 0) {
          // missing AM
          // @ts-ignore
          (resultObject.days[((index + 2) / 3) - 1])[variableName] = tempObj;
          tempObj = [];
        }
        else if (dataTable.length + 2 % 3 == 0 && (index + 3) % 3 == 0) {
          // missing AM+PM
          // @ts-ignore
          (resultObject.days[((index + 3) / 3) - 1])[variableName] = tempObj;
          tempObj = [];
        }
      });
    };

    // @ts-ignore
    $(".forecast-table__content").filter(function () {
      // @ts-ignore
      const data = $(this);

      const daysTable = data.find(".forecast-table-days");
      // const daysTable = test.first();
      const timesTable = data.find(".forecast-table-time");
      // const timesTable = daysTable.next();
      const snowtable = data.find(".forecast-table-snow");
      // const snowtable = timesTable.nextUntil('.forecast-table__row').next('.forecast-table__row');
      const rainTable = data.find(".forecast-table-rain");
      // const rainTable = snowtable.next();
      const tempTable = data.find(".forecast-table-temp").first();
      // const tempTable = rainTable.next();

      const days = daysTable.find("td");
      const times = timesTable.find("td");
      const snows = snowtable.find("td");
      const rains = rainTable.find("td");
      const temps = tempTable.find("td");

      resolve(createWeatherData(days, times, snows, rains, temps));
    });
  });
};