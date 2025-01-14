import axios from "axios";
const https = require("https");
import { FantasyFootballUrl } from ".";
import { Player } from "../types/player";
import chalk from "chalk";

export async function getDraftedPlayers(draftId: string): Promise<Player[]> {
  const route = `/getDraftedPlayers/${draftId}`;
  const url = FantasyFootballUrl + route;

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  try {
    const resp = await axios.get(url, { httpsAgent: agent });
    return resp.data;
  } catch (err) {
    console.error("Error fetching drafted players: ", err.message);
    throw err;
  }
}
