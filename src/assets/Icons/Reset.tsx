import { RotateCcw } from "lucide-react";

const Reset = ({ color, width, height }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RotateCcw color={color} width={width} height={height} />
    </div>
  );
};

export default Reset;
