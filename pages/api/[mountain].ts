import { NextApiRequest, NextApiResponse } from "next";
import * as https from "https";

const handler = (_req: NextApiRequest, res: NextApiResponse): void => {

  const {mountain} = _req.query;
  console.log(mountain);

  https.get(`https://powderday.ca/api/${mountain}`, (proxyRes) => {
    proxyRes.on("data", (data) => res.send(data));

    proxyRes.on("end", () => res.end());
  });
};

export default handler;
