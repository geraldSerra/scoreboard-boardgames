import Piece from "./pieceType";

type Expansion = {
  id: string;
  name: string;
  image: string;
  /** The base game is always part of the match and cannot be turned off. */
  required: boolean;
  enabled: boolean;
  pieces: Piece[];
};

export default Expansion;
