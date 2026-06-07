import * as React from "react";
import X from "../../assets/Icons/X";

const AnchorDrawer: React.FC<{
  open: boolean;
  handleClose: () => void;
  hideClose?: boolean;
  children: any;
}> = ({ open, handleClose, hideClose, children }: any) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => !hideClose && handleClose()}
      />
      {/* Bottom sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 flex h-screen max-w-full flex-col items-center gap-[10px] overflow-hidden pt-[10px] transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {!hideClose && (
          <div
            className="flex h-10 w-[35px] justify-center rounded-[40px] bg-white"
            onClick={() => handleClose()}
          >
            <X width="20px" height="20px" color="black" />
          </div>
        )}
        {children}
      </div>
    </>
  );
};

export default AnchorDrawer;
