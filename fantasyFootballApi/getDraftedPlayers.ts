import axios from "axios";
const https = require("https");
import { FantasyFootballUrl } from ".";
import { DraftedPlayer } from "../types/draftedPlayer";
import chalk from "chalk";

export async function getDraftedPlayers(
  draftId: string,
  leagueId?: string
): Promise<DraftedPlayer[]> {
  const route = `/getDraftedPlayers/${draftId}${
    leagueId ? `?leagueId=${leagueId}` : ""
  }`;
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
