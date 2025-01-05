import axios from "axios";
const https = require("https");
import { FantasyFootballUrl } from ".";
import { User } from "../types/user";

export async function getLeagueRosterRankings(
  leagueId: string,
  market: string
): Promise<User[]> {
  const route = `/getLeagueRosterRankings/${leagueId}?market=${market}`;
  const url = FantasyFootballUrl + route;

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  try {
    const resp = await axios.get(url, { httpsAgent: agent });
    return resp.data;
  } catch (err) {
    console.error("Error fetching roster rankings: ", err.message);
    throw err;
  }
}
