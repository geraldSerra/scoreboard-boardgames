import { useState } from "react";
import City from "../../assets/Icons/City";
import Road from "../../assets/Icons/Road";
import Monastery from "../../assets/Icons/Monastery";
import Garden from "../../assets/Icons/Garden";
import Field from "../../assets/Icons/Field";
import X from "../../assets/Icons/X";

const RULES = [
  {
    icon: <Road color="black" width="26px" height="26px" />,
    name: "Camino",
    text: "1 punto por loseta. Con posada: 2/loseta si se completa, 0 si queda incompleto.",
  },
  {
    icon: <City color="black" width="26px" height="26px" />,
    name: "Ciudad",
    text: "Completa: 2/loseta + 2/escudo. Incompleta: 1/loseta + 1/escudo. Con catedral: 3/loseta si se completa, 0 si no.",
  },
  {
    icon: <Monastery color="black" width="26px" height="26px" />,
    name: "Monasterio",
    text: "Completo (8 losetas alrededor): 9. Incompleto: 1 + losetas adyacentes.",
  },
  {
    icon: <Garden color="black" width="26px" height="26px" />,
    name: "Jardín (Abad)",
    text: "Igual que el monasterio. Solo lo puntúa el abad.",
  },
  {
    icon: <Field color="black" width="26px" height="26px" />,
    name: "Campo",
    text: "Solo al final: 3 puntos por cada ciudad completa que toca el campo.",
  },
];

const RulesHelp = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Reglas de puntuación"
        className="fixed right-3 top-[calc(env(safe-area-inset-top,0px)+0.75rem)] z-30 flex h-11 w-11 items-center justify-center rounded-full border-2 border-secondary bg-primary text-lg font-bold text-accent"
      >
        ?
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[85vh] w-full max-w-[400px] overflow-y-auto rounded-[16px] bg-white p-5 text-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Puntuación</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-lightgray"
              >
                <X width="16px" height="16px" color="#333" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {RULES.map((r) => (
                <div key={r.name} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                    {r.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold">{r.name}</div>
                    <div className="text-sm text-graysoft">{r.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-[12px] bg-lightgray p-3 text-xs leading-relaxed text-black">
              <b>Mayorías:</b> quien tenga más seguidores en una construcción se
              lleva los puntos; en empate, todos los empatados cobran el total.
              El <b>meeple gigante</b> cuenta como 2 seguidores.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RulesHelp;
