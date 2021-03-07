import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";
import { EnumMountain } from "../../../lib/mountain/mountains";
import { IMountainForecast, performScrape } from "../../../lib/mountain/scrape";

const myCache = new NodeCache({ stdTTL: 600, checkperiod: 620 });

myCache.on("set", function (key, value) {
  console.log("Cache-Add: " + key + ": " + value);
});
myCache.on("del", function (key, value) {
  console.log("Cache-Del: " + key + ": " + value);
});
myCache.on("expired", function (key, value) {
  console.log("Cache-Expired: " + key + ": " + value);
});

const handler = async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {

  const { mountain } = _req.query;
  const mountains = Object.values(EnumMountain) as string[];
  const mountainValue = mountain as string;

  if (!mountains.includes(mountainValue)) {
    res.status(404).send("Not Found");
    return;
  }

  const cachedMountain = myCache.get(mountainValue) as IMountainForecast;
  if (cachedMountain) {
    console.log(`------RETURNING CACHED MOUNTAIN: ${mountainValue}-----`);
    return res.json(cachedMountain);
  }
  const data = await performScrape(mountainValue as EnumMountain);
  myCache.set(mountainValue, data);
  console.log(`------RETURNING FRESH MOUNTAIN: ${mountainValue}-----`);
  return res.json(data);
};

export default handler;


// app.get("/api/:mountain", function (req, res) {
//   const mountain = req.params.mountain;
//   // if (mountainList.find(function (elem) { return elem == mountain.toLowerCase(); }) == undefined) {
//   //   res.status(500).send("Invalid Mountain");
//   //   return;
//   // }
//   const result = myCache.get(mountain);
//   if (result != undefined) {
//     console.log("-------------------CACHED----------------------");
//     res.json(result);
//   } else {
//     performScrape(mountain).then(function (data) {
//       console.log("-------------------FRESH----------------------");
//       myCache.set(mountain, data);
//       res.json(data);
//     });
//   }
// });