export const getDraftPrompt = (leagueName: string, draftId: string) => {
  return [
    {
      label: `${leagueName}: ${draftId}`,
      value: draftId,
    },
    {
      label: "Enter Different Draft",
      value: "DIFFERENT_DRAFT",
    },
    {
      label: "Back",
      value: "BACK",
    },
  ];
};

export const dynastyOrRedraft = [
  {
    label: "This is a Dynasty League",
    value: "DYN",
  },
  {
    label: "This is a Redraft League",
    value: "STD",
  },
  {
    label: "Back",
    value: "BACK",
  },
];

export const oneQbDraft = [
  {
    label: "This is a Single Quarterback draft",
    value: "true",
  },
  {
    label: "This is a Superflex draft",
    value: "false",
  },
];

export const midDraftOptions = [
  {
    label: "Refresh Drafted Players",
    value: "REFRESH_DRAFTED_PLAYERS",
  },
  {
    label: "Show Different Market Rankings",
    value: "DIFFERENT_MARKET",
  },
  {
    label: "Compare Market to Sleeper",
    value: "COMPARE_MARKET",
  },
  {
    label: "Draft Ended",
    value: "DRAFT_ENDED",
  },
];

export const compareMarketPrompt = [
  {
    label: "Refresh Drafted Players",
    value: "REFRESH_DRAFTED_PLAYERS",
  },
  {
    label: "Compare Different Market to Sleeper",
    value: "COMPARE_MARKET",
  },
  {
    label: "Back to Sleeper Rankings",
    value: "BACK",
  },
];

export const differentMarketPrompt = [
  {
    label: "Refresh Drafted Players",
    value: "REFRESH_DRAFTED_PLAYERS",
  },
  {
    label: "View Different Market Rankings",
    value: "DIFFERENT_MARKET",
  },
  {
    label: "Back to Sleeper Rankings",
    value: "BACK",
  },
];

export const positions = [
  {
    label: "Quarterbacks",
    value: "QB",
  },
  {
    label: "Wide Recievcers",
    value: "WR",
  },
  {
    label: "Running Backs",
    value: "RB",
  },
  {
    label: "Tight Ends",
    value: "TE",
  },
  {
    label: "All",
    value: "ALL",
  },
];
