
// const wwwRedirect = function (request, response, next) {
//   let protocol = "http" + (request.connection.encrypted ? "s" : "") + "://"
//     , host = request.headers.host
//     , href;

//   // no www. present, nothing to do here
//   if (!/^www\./i.test(host)) {
//     next();
//     return;
//   }

//   // remove www.
//   host = host.replace(/^www\./i, "");
//   href = protocol + host + request.url;
//   response.statusCode = 301;
//   response.setHeader("Location", href);
//   response.write("Redirecting to " + host + request.url + "");
//   response.end();
// };

// const whistlerStakeCam = function () {
//   let d = new Date();
//   d = [
//     "" + d.getUTCFullYear(),
//     "0" + (d.getUTCMonth() + 1),
//     "0" + d.getUTCDate(),
//     "0" + d.getUTCHours(),
//     "0" + (d.getUTCMinutes() - d.getUTCMinutes() % 10)
//   ].map((x, i) => { if (i > 0) return x.slice(-2); return x; });

//   const firstKey = d.filter((x, i) => i < 4).join("_");
//   d.push("00_00");
//   const secondKey = d.join("_");
//   return `http://timecam.tv/mediablock/timestreams/vailresort/whistler-blackcomb-snow-s~640/hour/${firstKey}/whistler-blackcomb-snow-s~640_${secondKey}.jpg`;
// };

// const timeEnum = {
//   am: "AM",
//   pm: "PM",
//   overnight: "night"
// };
// const webcamAssociations = {
//     'cypress-mountain': { image1: 'http://snowstakecam.cypressmountain.com/axis-cgi/jpg/image.cgi?resolution=1024x768' }
// }

//
// Let's Revisit proxying images some other time.
//
// app.get('/webcams/:mountain/:img', function(req, res) {
//     // var url = proxiedURL +"?" + querystring.stringify(req.query);
//     const mountain = req.params.mountain;
//     const img = req.params.img;
//     if (mountainList.find(function (elem) { return elem == mountain.toLowerCase(); }) == undefined) {
//         res.status(500).send('Cannot find Mountain');
//         return;
//     }
//     if (testList[mountain] === undefined) {
//         res.status(500).send('Cannot find camfeeds for Mountain');
//         return;
//     }
//     if(img === undefined | img === '') { 
//         res.status(500).send('Need image name');
//         return;
//     }
//     if (testList[mountain][img] === undefined || testList[mountain][img] === '') {
//         res.status(500).send('Cannot find image name');
//         return;
//     }
//     request.get(testList[mountain][img]).pipe(res);
// });
// const performScrape = function (mountain) {
//   const webcamUrl = publicWebCamUrls[mountain];

//   return new Promise(function (resolve, reject) {
//     const url = `http://www.snow-forecast.com/resorts/${mountain}/6day/mid`;
//     request(url, function (error, response, html) {
//       console.log("requesting :" + url);
//       if (error) {
//         console.log("error making Request to :" + url);
//         reject(error);
//       }

//       const $ = cheerio.load(html);
//       const createWeatherData = function (dayNodes, timeNodes, snowNodes, rainNodes, tempNodes) {
//         const resultObject = { name: `${mountain}`, days: [], webcamUrl: "" };
//         if (webcamUrl) {
//           resultObject.webcamUrl = webcamUrl;
//         }
//         dayNodes.each(function (i, day) {
//           let dayText = $(day).text().split(/(\d+)/).join(" ");
//           if (!dayText) { dayText = "Today"; }
//           resultObject.days.push({ name: dayText, time: null, snow: null, rain: null, temp: null });
//         });


//         addTimedNodes(timeNodes, resultObject, "time");
//         addTimedNodes(snowNodes, resultObject, "snow");
//         addTimedNodes(rainNodes, resultObject, "rain");
//         addTimedNodes(tempNodes, resultObject, "temp");
//         return resultObject;
//       };

//       const addTimedNodes = function (dataTable, resultObject, variableName) {
//         let tempObj = [];
//         dataTable.each(function (index, item) {
//           const text = $(item).text();
//           tempObj.push(text);
//           // console.log(dataTable.length);
//           // console.log(j.length);
//           if (dataTable.length % 3 == 0 && (index + 1) % 3 == 0) {
//             // normal flow...
//             (resultObject.days[((index + 1) / 3) - 1])[variableName] = tempObj;
//             tempObj = [];
//           }
//           else if (dataTable.length + 1 % 3 == 0 && (index + 2) % 3 == 0) {
//             // missing AM
//             (resultObject.days[((index + 2) / 3) - 1])[variableName] = tempObj;
//             tempObj = [];
//           }
//           else if (dataTable.length + 2 % 3 == 0 && (index + 3) % 3 == 0) {
//             // missing AM+PM
//             (resultObject.days[((index + 3) / 3) - 1])[variableName] = tempObj;
//             tempObj = [];
//           }
//         });
//       };
//       $(".forecast-table__content").filter(function () {
//         const data = $(this);

//         const daysTable = data.find(".forecast-table-days");
//         // const daysTable = test.first();
//         const timesTable = data.find(".forecast-table-time");
//         // const timesTable = daysTable.next();
//         const snowtable = data.find(".forecast-table-snow");
//         // const snowtable = timesTable.nextUntil('.forecast-table__row').next('.forecast-table__row');
//         const rainTable = data.find(".forecast-table-rain");
//         // const rainTable = snowtable.next();
//         const tempTable = data.find(".forecast-table-temp").first();
//         // const tempTable = rainTable.next();

//         const days = daysTable.find("td");
//         const times = timesTable.find("td");
//         const snows = snowtable.find("td");
//         const rains = rainTable.find("td");
//         const temps = tempTable.find("td");

//         resolve(createWeatherData(days, times, snows, rains, temps));
//       });

//     });
//   });
// };
// app.set("trust proxy", true);
// app.use(wwwRedirect);
// app.use(express.static(path.join(__dirname, "client")));
// app.use("/.well-known", express.static(".well-known"));
// app.get("/image/:mountain/:imagenumber", function (req, res) {
//   const mountain = req.params.mountain;
//   const imagenumber = req.params.imagenumber - 1;
//   if (imagenumber > webcamList[mountain].length) {
//     res.status(500).send("Cannot find image");
//   }
//   let url = webcamList[mountain][imagenumber];
//   url = (url.indexOf("?") >= 0) ? url + "&" : url + "?";
//   url = url + uuid();
//   if (mountain === "whistler-blackcomb" && imagenumber == 1) {
//     url = whistlerStakeCam();
//   }
//   console.log("/image going to url", url);
//   request.get(url).on("end", () => res.end()).pipe(res);
// });

