import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import X from "../../assets/Icons/X";

// type Anchor = "top" | "left" | "bottom" | "right";

const AnchorDrawer: React.FC<{
  open: boolean;
  handleClose: () => void;
  children: any;
}> = ({ open, handleClose, children }: any) => {
  return (
    <div>
      <Drawer
        anchor={"bottom"}
        open={open}
        ModalProps={{
          keepMounted: true,
        }}
        onClose={() => handleClose()}
        sx={{
          minHeight: "90vh",
          height: "100vh",
          maxWidth: "100vw",
          overflowX: "hidden",
          borderRadius: "20px 20px 20px 0 !important",
          backgroundColor: "transparent",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            pt: "10px",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              width: "40px",
              height: "40px",
              backgroundColor: "white",
              borderRadius: "40px",
            }}
            onClick={() => handleClose()}
          >
            <X width="20px" height="20px" color="black" />
          </Box>
          {children}
        </Box>
      </Drawer>
    </div>
  );
};

export default AnchorDrawer;
