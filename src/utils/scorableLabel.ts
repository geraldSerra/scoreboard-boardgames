const SCORABLE_LABELS: Record<string, string> = {
  city: "Ciudad",
  road: "Camino",
  monastery: "Monasterio",
  garden: "Jardín",
  field: "Campo",
};

const scorableLabel = (scorable: string): string =>
  SCORABLE_LABELS[scorable] ?? scorable;

export default scorableLabel;
