import { Building2 } from "lucide-react";

const City = ({ color, width, height }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Building2 color={color} width={width} height={height} />
    </div>
  );
};

export default City;
