const X = ({ color, width, height }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
       width={width}
        height={height}
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          fill-rule="evenodd"
          points="8 9.414 3.707 13.707 2.293 12.293 6.586 8 2.293 3.707 3.707 2.293 8 6.586 12.293 2.293 13.707 3.707 9.414 8 13.707 12.293 12.293 13.707 8 9.414"
        />
      </svg>
    </div>
  );
};

export default X;
