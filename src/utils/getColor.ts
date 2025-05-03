const getColor = (color: string) => {
  switch (color) {
    case "red":
      return "#FF2929";

    case "blue":
      return "#0014FF";

    case "yellow":
      return "#FFE31A";

    case "green":
      return "#16C47F";

    case "black":
      return "#030303";

    case "pink":
      return "#E53888";
  }
};

export default getColor;
