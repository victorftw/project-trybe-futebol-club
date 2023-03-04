import IMatchExtra from '../api/interfaces/IMatchExtra';
import IMatch from '../api/interfaces/IMatch';

export type Data = {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance?: number;
  efficiency?: number;
};

export type Initial = {
  [key: number]: Data;
};

export const getWinnerAndPoints = (matches: IMatch[]): IMatchExtra[] =>
  matches.map((match) => {
    let homeTeamPoints = 0;
    let awayTeamPoints = 0;
    let winner = null;

    if (match.homeTeamGoals === match.awayTeamGoals) {
      homeTeamPoints = 1;
      awayTeamPoints = 1;
    } else if (match.homeTeamGoals > match.awayTeamGoals) {
      homeTeamPoints = 3;
      winner = match.homeTeamId;
    } else {
      awayTeamPoints = 3;
      winner = match.awayTeamId;
    }

    return { ...match, homeTeamPoints, awayTeamPoints, winner };
  });

const aggregateAwayTeam = (data: Data, match: IMatchExtra) => {
  const newData = data;
  newData.totalPoints += match.awayTeamPoints;
  newData.totalGames += 1;
  newData.totalVictories += match.winner === match.awayTeamId ? 1 : 0;
  newData.totalDraws += match.winner === null ? 1 : 0;
  newData.totalLosses += match.winner === match.homeTeamId ? 1 : 0;
  newData.goalsFavor += match.awayTeamGoals;
  newData.goalsOwn += match.homeTeamGoals;
};

const aggregateHomeTeam = (data: Data, match: IMatchExtra) => {
  const newData = data;
  newData.totalPoints += match.homeTeamPoints;
  newData.totalGames += 1;
  newData.totalVictories += match.winner === match.homeTeamId ? 1 : 0;
  newData.totalDraws += match.winner === null ? 1 : 0;
  newData.totalLosses += match.winner === match.awayTeamId ? 1 : 0;
  newData.goalsFavor += match.homeTeamGoals;
  newData.goalsOwn += match.awayTeamGoals;
};

export const doAggregations = (data: Initial, matches: IMatchExtra[], teamSide?: string) => {
  const newData = { ...data };

  matches.forEach((match) => {
    if (!teamSide) {
      aggregateAwayTeam(newData[match.awayTeamId], match);
      aggregateHomeTeam(newData[match.homeTeamId], match);
    }
    if (teamSide === 'away') {
      aggregateAwayTeam(newData[match.awayTeamId], match);
    }
    if (teamSide === 'home') {
      aggregateHomeTeam(newData[match.homeTeamId], match);
    }
  });

  return newData;
};

export const balanceAndEfficiency = (data: Initial) => {
  Object.keys(data).forEach((key) => {
    const obj = data[Number(key)];
    obj.goalsBalance = obj.goalsFavor - obj.goalsOwn;
    obj.efficiency = Number(((obj.totalPoints / (obj.totalGames * 3)) * 100).toFixed(2));
  });
};
