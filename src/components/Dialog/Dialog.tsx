import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ open, setOpen, setIsGameFinished }: any) {
  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to finish the game?"}
        </DialogTitle>
        <DialogActions style={{ justifyContent: "center", gap: "100px" }}>
          <div onClick={() => setOpen(false)}>No</div>
          <div
            onClick={() => {
              setIsGameFinished(true);
              setOpen(false);
            }}
            autoFocus
          >
            Yes
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
