export interface LeaderboardProps  {
    format: String,
    userStandings:userDetails[],
    standings: formatStandings[],
}

interface userDetails {
    format: String,
    rating: number,
    rank: number,
}

interface player{
    name: String,
    rating: number,
    rank: number,
}

interface formatStandings {
    title: String,
    topPlayers: player[],
}

