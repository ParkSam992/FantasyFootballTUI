const Table = require("cli-table3");
import chalk from "chalk";
import { Player } from "../../../types/player";
import { User } from "../../../types/user";

export const BuildTeamRankingPlayer = (
  teamRankings: User[],
  showOneQBRanking: boolean
): any => {
  const table = new Table({
    head: teamRankings.map((user) => user.teamName ?? user.displayName),
    style: {
      head: ["blue"],
      border: ["grey"],
    },
  });

  const maxRosterSize = Math.max(
    ...teamRankings.map((team) => team.roster.length)
  );

  for (let i = 0; i < maxRosterSize; i++) {
    const row = teamRankings.map((team) => {
      const player = team.roster[i];
      return player
        ? GetPlayerDisplayString(player, showOneQBRanking, teamRankings.length)
        : "";
    });
    table.push(row);
  }

  return table;
};

const GetPlayerDisplayString = (
  player: Player,
  showOneQBRanking: boolean,
  numberOfTeams: number
): string => {
  const playerString =
    player.firstName +
    " " +
    player.lastName[0] +
    ". | " +
    Number(
      showOneQBRanking ? player.oneQbRanking : player.twoQbRanking
    ).toFixed(1);

  if (
    parseInt(showOneQBRanking ? player.oneQbRanking : player.twoQbRanking) /
      numberOfTeams <
    5
  ) {
    return chalk.yellow(playerString);
  }

  return playerString;
};
