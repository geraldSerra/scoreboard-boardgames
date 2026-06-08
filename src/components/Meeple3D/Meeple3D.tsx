import red from "../../assets/meeples/colors/red.png";
import blue from "../../assets/meeples/colors/blue.png";
import yellow from "../../assets/meeples/colors/yellow.png";
import green from "../../assets/meeples/colors/green.png";
import black from "../../assets/meeples/colors/black.png";
import pink from "../../assets/meeples/colors/pink.png";

const IMAGES: Record<string, string> = {
  red,
  blue,
  yellow,
  green,
  black,
  pink,
};

type Props = {
  /** Player colour name (red, blue, yellow, green, black, pink) */
  color: string;
  width?: string;
  height?: string;
  className?: string;
};

const Meeple3D = ({ color, width = "32px", height, className = "" }: Props) => {
  const src = IMAGES[color];
  if (!src) return null;

  return (
    <img
      src={src}
      alt=""
      className={`object-contain ${className}`}
      style={{ width, height: height ?? width }}
    />
  );
};

export default Meeple3D;
