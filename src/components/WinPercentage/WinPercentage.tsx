const WinPercentage: React.FC<any> = ({ data }) => {
  const PercentageBar = () => {
    return <div></div>;
  };

  console.log("Hola",data)

  return (
    <div>
      <div>{data.scorable}</div>
    </div>
  );
};

export default WinPercentage;
