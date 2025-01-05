import { Player } from "./player";

export type User = {
  ownerId: string;
  displayName: string;
  teamName: string;
  roster: Player[];
};
