export const scenarios = [
  {
    id: "oneWay",
    name: "One Way Trip",
    grep: "One Way Trip",
    supports: () => true,
  },
  {
    id: "roundTrip",
    name: "Round Trip",
    grep: "Round Trip",
    supports: client => client.roundTrip,
  },
  {
    id: "connecting",
    name: "Connecting Reservation",
    grep: "Connecting Reservation",
    supports: client => client.connecting,
  },
];