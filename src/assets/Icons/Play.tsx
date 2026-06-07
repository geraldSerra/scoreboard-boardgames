import { Play as PlayIcon } from "lucide-react";

const Play = ({ color, width, height }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PlayIcon color={color} width={width} height={height} />
    </div>
  );
};

export default Play;
