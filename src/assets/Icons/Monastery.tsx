import { Church } from "lucide-react";

const Monastery = ({ color, width, height }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Church color={color} width={width} height={height} />
    </div>
  );
};

export default Monastery;
