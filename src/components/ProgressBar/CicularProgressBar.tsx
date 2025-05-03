const color = {
  red: "#E72929",
  yellow: "#FFD63A",
  green: "#4CAF50",
};

const CircularProgress = ({
  size = 270,
  progress = 75,
  strokeWidth = 10,
  children,
}: any) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  let strokeColor = "";

  if (progress <= 20) {
    strokeColor = color.red;
  } else if (progress <= 50 && progress > 20) {
    strokeColor = color.yellow;
  } else {
    strokeColor = color.green;
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        borderRadius: size,
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="transparent"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: "stroke-dashoffset 1s ease-in-out",
          }}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {children || `${progress}%`}
      </div>
    </div>
  );
};

export default CircularProgress;
