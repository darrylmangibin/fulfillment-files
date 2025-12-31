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
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 6,
        background:
          "radial-gradient(1200px 400px at 10% 10%, rgba(11,18,32,0.6), transparent), linear-gradient(180deg,#01040a 0%, #03050a 100%)",
        color: "common.white",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 920, p: 2 }}>
        <Container maxWidth="sm">
          <Card
            sx={{
              borderRadius: 3,
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#02040a" : "background.paper",
              color: "text.primary",
              boxShadow: "0 12px 40px rgba(2,6,23,0.8)",
            }}
            elevation={9}
          >
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Avatar
                  sx={{
                    width: 52,
                    height: 52,
                    bgcolor: "transparent",
                    background: "linear-gradient(135deg,#7c3aed,#0891b2)",
                    boxShadow: "0 8px 24px rgba(12,32,64,0.5)",
                  }}
                >
                  <CloudUploadIcon sx={{ fontSize: 26, color: "#fff" }} />
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {title}
                </Typography>
              </Box>

              <form onSubmit={handleOnSubmit}>
                <Stack spacing={2}>
                  <TextField
                    label="APK Name"
                    placeholder="MyApp.apk"
                    fullWidth
                    variant="outlined"
                    size="medium"
                    sx={{
                      "& .MuiFilledInput-root": {
                        bgcolor: "rgba(255,255,255,0.02)",
                        borderRadius: 1,
                        color: "common.white",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.03)" },
                        "&::before, &::after": { borderBottom: "none" },
                      },
                      "& .MuiFormHelperText-root": {
                        color: "rgba(255,255,255,0.6)",
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
                      "& .MuiFilledInput-root": {
                        bgcolor: "rgba(255,255,255,0.02)",
                        borderRadius: 1,
                        color: "common.white",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.03)" },
                        "&::before, &::after": { borderBottom: "none" },
                      },
                      "& .MuiFormHelperText-root": {
                        color: "rgba(255,255,255,0.6)",
                      },
                    }}
                    {...register("version")}
                    error={!!formState.errors.version}
                    helperText={formState.errors.version?.message}
                  />
                </Stack>

                <Divider
                  sx={{ my: 3, borderColor: "rgba(255,255,255,0.06)" }}
                />

                <Box mt={3}>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    color="text.secondary"
                  >
                    APK File
                  </Typography>

                  <Stack direction="row" spacing={2} alignItems="start">
                    <Box
                      width="100%"
                      display="flex"
                      flexDirection="column"
                      gap={1}
                    >
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          bgcolor: "linear-gradient(90deg,#7c3aed,#0891b2)",
                          boxShadow: "0 8px 26px rgba(9,30,60,0.45)",
                          "&:hover": { opacity: 0.96 },
                        }}
                      >
                        Select .apk
                        <input
                          type="file"
                          accept=".apk"
                          hidden
                          {...register("file_path")}
                        />
                      </Button>

                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {watch("file_path")?.length > 0
                            ? watch("file_path")?.[0]?.name
                            : "No file selected"}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {watch("file_path")?.length > 0
                            ? `${(
                                (watch("file_path")?.[0]?.size ?? 0) /
                                1024 /
                                1024
                              ).toFixed(2)} MB`
                            : "Max 500MB"}
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      color="inherit"
                      onClick={() => setValue("file_path", undefined)}
                    >
                      Clear
                    </Button>
                  </Stack>

                  {formState.errors.file_path?.message && (
                    <Typography
                      variant="caption"
                      color="error"
                      mt={1}
                      display="block"
                    >
                      {formState.errors.file_path.message as string}
                    </Typography>
                  )}
                </Box>

                <Box pt={2}>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      borderRadius: 2,
                      boxShadow: "0 12px 34px rgba(6,18,36,0.7)",
                      "&:hover": { opacity: 0.98 },
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
