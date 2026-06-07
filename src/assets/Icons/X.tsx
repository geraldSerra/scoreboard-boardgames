import { X as XIcon } from "lucide-react";

const X = ({ color, width, height }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <XIcon color={color} width={width} height={height} />
    </div>
  );
};

export default X;
