const ScoringPoints = ({ points, setScoringPoints }: any) => {
  return (
    <input
      className="h-[50px] w-full min-w-0 flex-1 rounded-[50px] border-2 border-lightgray pl-5 text-base font-bold text-black outline-none transition-all duration-100 focus:border-graysoft"
      type="number"
      placeholder="0"
      value={points}
      onChange={(e) => setScoringPoints(e.target.value)}
    ></input>
  );
};

export default ScoringPoints;
