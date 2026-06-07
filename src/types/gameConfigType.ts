import Expansion from "./expansionType";

type GameConfig = {
  expansions: Expansion[];
  /** When true, scoring uses the per-construction calculators instead of manual input. */
  advancedScoring?: boolean;
};

export default GameConfig;
