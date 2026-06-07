import { Plus as PlusIcon } from "lucide-react";

const Plus = ({ color, width, height, onClick }: any) => {
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
      <PlusIcon color={color} width={width} height={height} />
    </div>
  );
};

export default Plus;
