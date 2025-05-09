import axios from "axios";
const https = require("https");
import { FantasyFootballUrl } from ".";
import { League } from "../types/league";

export async function getUserLeagues(
  sleeperUsername: string,
  sport: string,
  year: string
): Promise<League[]> {
  const route = `/getUserLeagues/${sleeperUsername}/${sport}/${year}`;
  const url = FantasyFootballUrl + route;

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  try {
    const resp = await axios.get(url, { httpsAgent: agent });
    return resp.data;
  } catch (err) {
    console.error("Error fetching user leagues: ", err.message);
    throw err;
  }
}
