import Meeple3D from "../Meeple3D/Meeple3D";
import Player from "../../types/playerType";
import ScoreType from "../../types/scoreType";

const MEDALS = ["🥇", "🥈", "🥉"];

type PodiumProps = {
  players: Player[];
  score: ScoreType[];
};

const Podium = ({ players, score }: PodiumProps) => {
  const totals = players.map((p) => ({
    playerId: p.playerId,
    name: p.name,
    color: p.color,
    total: score
      .filter((s) => s.playersId.includes(p.playerId))
      .reduce((acc, s) => acc + +s.points, 0),
  }));

  totals.sort((a, b) => b.total - a.total);

  const leader = totals[0]?.total ?? 0;

  let rank = 0;
  let prev = Infinity;
  const ranked = totals.map((t, i) => {
    if (t.total < prev) {
      rank = i + 1;
      prev = t.total;
    }
    return { ...t, rank };
  });

  return (
    <div className="mx-[15px] flex flex-col gap-2">
      {ranked.map((p) => (
        <div
          key={p.playerId}
          className={`flex items-center gap-3 rounded-[12px] px-3 py-2 ${
            p.rank === 1
              ? "border-2 border-[#f7c566] bg-[#ffe4c4]"
              : "bg-lightgray"
          }`}
        >
          <div className="w-7 shrink-0 text-center text-lg font-bold">
            {p.rank <= 3 ? MEDALS[p.rank - 1] : p.rank}
          </div>
          <Meeple3D color={p.color} width="34px" height="34px" />
          <span className="min-w-0 flex-1 truncate font-bold">{p.name}</span>
          {p.rank !== 1 && leader - p.total > 0 && (
            <span className="text-xs font-semibold text-graysoft">
              -{leader - p.total}
            </span>
          )}
          <span className="w-8 text-right text-xl font-bold">{p.total}</span>
        </div>
      ))}
    </div>
  );
};

export default Podium;
