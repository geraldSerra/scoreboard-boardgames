import * as React from "react";
import Drawer from "@mui/material/Drawer";

// type Anchor = "top" | "left" | "bottom" | "right";

const AnchorDrawer = ({ open, handleClose, children }: any) => {
  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={"bottom"}
          open={open}
          ModalProps={{
            keepMounted: true,
          }}
          onClose={handleClose(false)}
          sx={{
            minHeight: "90vh",
            height: "90vh",
            maxWidth: "100vw",
            overflowX: "hidden",
            borderRadius: "20px 20px 20px 0 !important",
            backgroundColor: "transparent",
          }}
        >
          {children}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default AnchorDrawer;
