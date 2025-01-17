import axios from "axios";
const https = require("https");
import { FantasyFootballUrl } from ".";
import { Draft } from "../types/draft";

export async function getDraftInfo(draftId: string): Promise<Draft> {
  const route = `/getDraftInfo/${draftId}`;
  const url = FantasyFootballUrl + route;

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  try {
    const resp = await axios.get(url, { httpsAgent: agent });
    return resp.data;
  } catch (err) {
    console.error("Error fetching drafted info: ", err.message);
    throw err;
  }
}
