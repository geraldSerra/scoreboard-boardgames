import { Flower2 } from "lucide-react";

const Garden = ({ color, width, height }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Flower2 color={color} width={width} height={height} />
    </div>
  );
};

export default Garden;
