import { Minus as MinusIcon } from "lucide-react";

const Minus = ({ color, width, height, onClick }: any) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: onClick ? "pointer" : undefined,
      }}
    >
      <MinusIcon color={color} width={width} height={height} />
    </div>
  );
};

export default Minus;
