import { ClipboardList } from "lucide-react";

const Score = ({ color, width, height }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ClipboardList color={color} width={width} height={height} />
    </div>
  );
};

export default Score;
