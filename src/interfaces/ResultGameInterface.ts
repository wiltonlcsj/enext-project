/**
 * Interface format to result body request of Game
 * @interface ResultBody
 */
interface ResultBody {
  total_kills: number;
  players: string[];
  kills: { [key: string]: number };
  kills_by_means: { [key: string]: number };
}

interface ResultGame {
  [key: string]: ResultBody;
}
