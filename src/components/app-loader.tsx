import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

export type AppLoaderProps = {
  open: boolean;
  message?: string;
};

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const AppLoader = ({ open, message }: AppLoaderProps) => {
  return (
    <Backdrop
      open={open}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.modal + 1,
        bgcolor: "rgba(0, 0, 0, 0.5)",
        animation: `${fadeIn} 0.2s ease-in`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          animation: `${pulseAnimation} 2s ease-in-out infinite`,
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
          }}
        >
          <CircularProgress
            size={70}
            thickness={3}
            sx={{
              color: "primary.main",
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "primary.main",
                opacity: 0.8,
              }}
            />
          </Box>
        </Box>

        {message && (
          <Typography
            variant="body1"
            sx={{
              color: "grey.100",
              fontWeight: 500,
              letterSpacing: 0.5,
              textAlign: "center",
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Backdrop>
  );
};
