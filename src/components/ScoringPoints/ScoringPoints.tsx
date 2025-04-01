import "./ScoringPoints.css";

const ScoringPoints = ({ points, setScoringPoints, handleSummit }: any) => {
  return (
    <div className="scoring-points-container">
      <input
        className="input"
        type="number"
        placeholder="0"
        value={points}
        onChange={(e) => setScoringPoints(e.target.value)}
      ></input>
      <div className="submit" onClick={() => handleSummit()}>
        Add points
      </div>
    </div>
  );
};

export default ScoringPoints;
