import { Route } from "lucide-react";

const Road = ({ color, width, height }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Route color={color} width={width} height={height} />
    </div>
  );
};

export default Road;
