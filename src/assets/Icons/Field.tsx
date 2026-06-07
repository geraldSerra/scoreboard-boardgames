import { Wheat } from "lucide-react";

const Field = ({ color, width, height }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Wheat color={color} width={width} height={height} />
    </div>
  );
};

export default Field;
