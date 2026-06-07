import Expansion from "../types/expansionType";
import baseGameImg from "../assets/base-game.webp";
import innsCathedralsImg from "../assets/inns-cathedrals.webp";

export const DEFAULT_EXPANSIONS: Expansion[] = [
  {
    id: "base",
    name: "Juego base",
    image: baseGameImg,
    required: true,
    enabled: true,
    pieces: [
      {
        id: "abbot",
        name: "Abad",
        description: "Puntúa monasterios y jardines.",
        enabled: false,
      },
      {
        id: "farmer",
        name: "Campesino",
        description: "Puntúa los campos al final.",
        enabled: false,
      },
    ],
  },
  {
    id: "inns-cathedrals",
    name: "Posadas y Catedrales",
    image: innsCathedralsImg,
    required: false,
    enabled: false,
    pieces: [
      {
        id: "big-meeple",
        name: "Meeple gigante",
        description: "Cuenta como 2 seguidores.",
        enabled: false,
      },
    ],
  },
];

/** Returns a fresh deep copy so React state never mutates the defaults. */
export const cloneExpansions = (): Expansion[] =>
  DEFAULT_EXPANSIONS.map((expansion) => ({
    ...expansion,
    pieces: expansion.pieces.map((piece) => ({ ...piece })),
  }));
