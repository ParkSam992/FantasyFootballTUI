import axios from "axios";
const https = require("https");
import { FantasyFootballUrl } from ".";
import { Player } from "../types/player";
import { PlayerData } from "../types/playerData";

export async function getPlayerData(
  sleeperId: string,
  market: string
): Promise<PlayerData> {
  const route = `/${sleeperId}/${market}`;
  const url = FantasyFootballUrl + route;

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  try {
    const resp = await axios.get(url, { httpsAgent: agent });
    return resp.data;
  } catch (err) {
    console.error("Error fetching player data: ", err.message);
    throw err;
  }
}
