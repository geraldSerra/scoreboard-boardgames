import { Pause as PauseIcon } from "lucide-react";

const Pause = ({ color, width, height }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PauseIcon color={color} width={width} height={height} />
    </div>
  );
};

export default Pause;
