

export function random(min: number, max: number, decimal: number) {
    return Number((Math.random() * (max - min + 1) + min).toFixed(decimal));
}

export interface players {
    id: number;
    name: string;
    point: any;
    multiplier: any;
    score: number;
}

export function generateRankingPlayers() {
    let playersGuess: any = [];

    for (let i = 0; i < 5; i++) {
      let data: players = {
        id: i,
        name: i === 0 ? "You" : `CPU ${i}`,
        point: "-",
        multiplier: "-",
        score: 0,
      };
      playersGuess.push(data);
    }
    return playersGuess
}

export function generateGuessPlayers(pointsValue,multiplierValue) {
    let players: any = [];
    const data: players = {
      id: 0,
      name: "You",
      point: pointsValue,
      multiplier: multiplierValue,
      score: Math.round(pointsValue * multiplierValue),
    };

    players.push(data);

    for (let i = 0; i < 4; i++) {
      let p: number = random(1, 700, 0),
        m: number = random(1, 4, 2);

      players.push({
        id: i + 1,
        name: `CPU ${i + 1}`,
        point: p,
        multiplier: m,
        score: Math.round(p * m),
      });
    }
    return players;
}