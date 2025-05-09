const Score = ({ color, width, height }: any) => {
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
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 8V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V8M3 8V14M3 8H9M21 8V12M21 8H9M3 14V18C3 19.1046 3.89543 20 5 20H9M3 14H9M9 8V14M9 14H13C14.1046 14 15 13.1046 15 12V8M9 14V20M9 20H11"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
        <path
          d="M18 15V18M18 18V21M18 18H21M18 18H15"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
    </div>
  );
};

export default Score;
