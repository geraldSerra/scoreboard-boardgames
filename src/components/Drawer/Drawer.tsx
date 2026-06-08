import * as React from "react";
import X from "../../assets/Icons/X";

const AnchorDrawer: React.FC<{
  open: boolean;
  handleClose: () => void;
  hideClose?: boolean;
  children: any;
}> = ({ open, handleClose, hideClose, children }: any) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-300 ${
        open ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      {children}

      {!hideClose && (
        <button
          type="button"
          onClick={() => handleClose()}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-lightgray shadow"
        >
          <X width="20px" height="20px" color="#333" />
        </button>
      )}
    </div>
  );
};

export default AnchorDrawer;
