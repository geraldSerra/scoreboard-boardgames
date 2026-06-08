const getColor = (color: string) => {
  switch (color) {
    case "red":
      return "#C00707";

    case "blue":
      return "#0055DA";

    case "yellow":
      return "#D8D365";

    case "green":
      return "#16C47F";

    case "black":
      return "#2C3947";

    case "pink":
      return "#FF97D0";
  }
};

export default getColor;
