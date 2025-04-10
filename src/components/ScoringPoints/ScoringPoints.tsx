import "./ScoringPoints.css";

const ScoringPoints = ({ points, setScoringPoints }: any) => {

  console.log("scoring Points Component");

  return (
    <input
      className="input"
      type="number"
      placeholder="0"
      value={points}
      onChange={(e) => setScoringPoints(e.target.value)}
    ></input>
  );
};

export default ScoringPoints;
