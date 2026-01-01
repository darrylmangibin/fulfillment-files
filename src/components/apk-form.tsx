"use client";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm } from "react-hook-form";
import { createApkSchema, CreateApkSchema } from "@/schema/apk.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export type ApkFormProps = {
  onSubmit?: (data: CreateApkSchema) => void;
  defaultValues?: Partial<CreateApkSchema>;
  isLoading?: boolean;
  title: string;
};

export const ApkForm = ({
  onSubmit,
  defaultValues,
  isLoading,
  title,
}: ApkFormProps) => {
  const { register, setValue, handleSubmit, formState, watch } =
    useForm<CreateApkSchema>({
      defaultValues: {
        apk_name: defaultValues?.apk_name || "",
        version: defaultValues?.version || "",
        file_path: defaultValues?.file_path || undefined,
      },
      resolver: zodResolver(createApkSchema),
    });

  const handleOnSubmit = handleSubmit((data) => {
    onSubmit?.({
      ...data,
      file_path:
        data.file_path instanceof FileList ? data.file_path[0] : data.file_path,
    });
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        color: "common.white",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 580 }}>
        <Container maxWidth="sm">
          <Card
            sx={{
              borderRadius: 4,
              bgcolor: "#02040a",
              color: "text.primary",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              border: "1px solid rgba(124,58,237,0.1)",
              position: "relative",
              overflow: "visible",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: (theme) =>
                  `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                borderRadius: "16px 16px 0 0",
              },
            }}
            elevation={0}
          >
            <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
              <Box display="flex" alignItems="center" gap={2.5} mb={4}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: (theme) => `${theme.palette.primary.main}15`,
                    border: (theme) =>
                      `2px solid ${theme.palette.primary.main}30`,
                    boxShadow: (theme) =>
                      `0 8px 32px ${theme.palette.primary.main}40`,
                  }}
                >
                  <CloudUploadIcon
                    sx={{
                      fontSize: 28,
                      color: "primary.main",
                    }}
                  />
                </Avatar>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      mb: 0.5,
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Upload and manage your APK files
                  </Typography>
                </Box>
              </Box>

              <form onSubmit={handleOnSubmit}>
                <Stack spacing={3}>
                  <TextField
                    label="APK Name"
                    placeholder="MyApp.apk"
                    fullWidth
                    variant="outlined"
                    size="medium"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "rgba(255,255,255,0.02)",
                        borderRadius: 2,
                        "& fieldset": {
                          borderColor: "rgba(255,255,255,0.08)",
                          borderWidth: 1.5,
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.12)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "primary.main",
                          borderWidth: 2,
                        },
                      },
                      "& .MuiInputLabel-root": {
                        "&.Mui-focused": {
                          color: "primary.main",
                        },
                      },
                    }}
                    {...register("apk_name")}
                    error={!!formState.errors.apk_name}
                    helperText={formState.errors.apk_name?.message}
                  />

                  <TextField
                    label="Version"
                    type="text"
                    placeholder="1.0.0"
                    fullWidth
                    variant="outlined"
                    size="medium"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "rgba(255,255,255,0.02)",
                        borderRadius: 2,
                        "& fieldset": {
                          borderColor: "rgba(255,255,255,0.08)",
                          borderWidth: 1.5,
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.12)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "primary.main",
                          borderWidth: 2,
                        },
                      },
                      "& .MuiInputLabel-root": {
                        "&.Mui-focused": {
                          color: "primary.main",
                        },
                      },
                    }}
                    {...register("version")}
                    error={!!formState.errors.version}
                    helperText={formState.errors.version?.message}
                  />
                </Stack>

                <Divider
                  sx={{
                    my: 4,
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                />

                <Box>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    APK File
                  </Typography>

                  <Box
                    sx={{
                      border: "2px dashed rgba(255,255,255,0.15)",
                      borderRadius: 3,
                      p: 3,
                      bgcolor: "rgba(255,255,255,0.02)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "rgba(255,255,255,0.25)",
                        bgcolor: "rgba(255,255,255,0.04)",
                      },
                    }}
                  >
                    <Stack spacing={2}>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        size="large"
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          py: 1.5,
                          fontSize: "1rem",
                          fontWeight: 600,
                          borderColor: "rgba(255,255,255,0.2)",
                          color: "text.primary",
                          borderWidth: 2,
                          "&:hover": {
                            borderColor: "rgba(255,255,255,0.4)",
                            bgcolor: "rgba(255,255,255,0.05)",
                          },
                        }}
                      >
                        Choose APK File
                        <input
                          type="file"
                          accept=".apk"
                          hidden
                          {...register("file_path")}
                        />
                      </Button>

                      <Box
                        sx={{
                          textAlign: "center",
                          py: 2,
                        }}
                      >
                        {watch("file_path")?.length > 0 ? (
                          <Box>
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 500,
                                color: "primary.main",
                                mb: 0.5,
                              }}
                            >
                              {watch("file_path")?.[0]?.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {`${(
                                (watch("file_path")?.[0]?.size ?? 0) /
                                1024 /
                                1024
                              ).toFixed(2)} MB`}
                            </Typography>
                            <Button
                              color="error"
                              size="small"
                              onClick={() => setValue("file_path", undefined)}
                              sx={{
                                mt: 1.5,
                                textTransform: "none",
                              }}
                            >
                              Remove File
                            </Button>
                          </Box>
                        ) : (
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              No file selected
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ opacity: 0.7 }}
                            >
                              Maximum file size: 500MB
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Stack>

                    {formState.errors.file_path?.message && (
                      <Typography
                        variant="body2"
                        color="error"
                        sx={{
                          mt: 2,
                          textAlign: "center",
                        }}
                      >
                        {formState.errors.file_path.message as string}
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Box pt={3}>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      borderRadius: 2,
                      py: 1.75,
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      textTransform: "none",
                      bgcolor: "primary.main",
                      boxShadow: (theme) =>
                        `0 12px 34px ${theme.palette.primary.main}50`,
                      "&:hover": {
                        bgcolor: "primary.dark",
                        boxShadow: (theme) =>
                          `0 16px 40px ${theme.palette.primary.main}60`,
                        transform: "translateY(-1px)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                      "&:disabled": {
                        bgcolor: "rgba(124,58,237,0.3)",
                        color: "rgba(255,255,255,0.5)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    {isLoading ? "Uploading..." : "Upload APK"}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};
