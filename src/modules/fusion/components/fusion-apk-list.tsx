import { ApkList } from "@/components/apk-list";
import { AppLoader } from "@/components/app-loader";
import { DeleteApkDialog } from "@/components/delete-apk-dialog";
import { FUSION_APKS_QUERY_KEY } from "@/modules/fusion/constants/fusion.constant";
import { useDeleteFusionApk } from "@/modules/fusion/hooks/use-delete-fusion-apk";
import { useGetFusionApks } from "@/modules/fusion/hooks/use-get-fusion-apks";
import { Android } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

export const FusionApkList = () => {
  const { data, isLoading } = useGetFusionApks();
  const [selectedApkId, setSelectedApkId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { mutate: deleteFusionApk, isPending } = useDeleteFusionApk({
    onError: (error) => {
      toast.error(
        `Failed to delete APK: ${error.response?.data?.error || error.message}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FUSION_APKS_QUERY_KEY] });
      setSelectedApkId(null);
      toast.success("APK deleted successfully");
    },
  });

  return (
    <>
      <AppLoader open={isPending} message="Deleting Fusion APK..." />
      <ApkList
        data={data ?? []}
        isLoading={isLoading}
        title="Fusion APK List"
        description="View and manage all Fusion APK files"
        icon={<Android />}
        onDelete={(id) => {
          setSelectedApkId(id);
        }}
      />
      <DeleteApkDialog
        open={Boolean(selectedApkId)}
        title="Delete APK"
        description="Are you sure you want to delete this APK? This action cannot be undone."
        handleClose={() => setSelectedApkId(null)}
        onSubmit={() => {
          if (selectedApkId) {
            deleteFusionApk(selectedApkId);
          }
        }}
        isLoading={isPending}
      />
    </>
  );
};
