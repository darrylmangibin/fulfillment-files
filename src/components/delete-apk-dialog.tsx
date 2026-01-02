import { forwardRef } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Box,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export type DeleteApkDialogProps = {
  open: boolean;
  handleClose?: () => void;
  title: string;
  description: string;
  onSubmit?: () => Promise<void> | void;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DeleteApkDialog = ({
  open,
  handleClose,
  title,
  description,
  onSubmit,
}: DeleteApkDialogProps) => {
  return (
    <Dialog
      open={open}
      slots={{
        transition: Transition,
      }}
      onClose={handleClose}
      aria-describedby="alert-dialog-apk-delete-description"
      PaperProps={{
        sx: {
          bgcolor: "gradient(135deg, #1e1e2f 0%, #3b3b4d 100%)",
          backgroundImage: "none",
          borderRadius: 2,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          minWidth: 400,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          pb: 2,
          color: "grey.100",
          fontWeight: 600,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: "50%",
            bgcolor: "error.main",
            color: "white",
            opacity: 0.9,
          }}
        >
          <DeleteOutlineIcon sx={{ fontSize: 28 }} />
        </Box>
        <Box
          sx={{
            color: "white",
          }}
        >
          {title}
        </Box>
      </DialogTitle>
      <DialogContent sx={{ pb: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
            p: 2,
            borderRadius: 1,
            mb: 2,
            opacity: 0.6,
          }}
        >
          <WarningAmberIcon sx={{ color: "warning.light", mt: 0.2 }} />
          <DialogContentText
            id="alert-dialog-apk-delete-description"
            sx={{
              color: "white",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              flex: 1,
            }}
          >
            {description}
          </DialogContentText>
        </Box>
        <DialogContentText
          sx={{
            color: "grey.400",
            fontSize: "0.875rem",
            fontStyle: "italic",
          }}
        >
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          px: 3,
          pb: 2.5,
          gap: 1,
        }}
      >
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            color: "grey.300",
            borderColor: "grey.600",
            "&:hover": {
              borderColor: "grey.500",
              bgcolor: "grey.800",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          color="error"
          sx={{
            bgcolor: "error.main",
            "&:hover": {
              bgcolor: "error.dark",
            },
            fontWeight: 600,
            minWidth: 100,
          }}
        >
          Delete APK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
