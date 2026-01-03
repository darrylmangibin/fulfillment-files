import { ApkList } from "@/components/apk-list";
import { AppLoader } from "@/components/app-loader";
import { DeleteApkDialog } from "@/components/delete-apk-dialog";
import { TRUE_TRACE_APKS_QUERY_KEY } from "@/modules/true-trace/constants/true-trace.constant";
import { useDeleteTrueTraceApk } from "@/modules/true-trace/hooks/use-delete-true-trace-apk";
import { useGetTrueTraceApks } from "@/modules/true-trace/hooks/use-get-true-trace-apks";
import { TrackChanges } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

export const TrueTraceApkList = () => {
  const { data, isLoading } = useGetTrueTraceApks();
  const [selectedApkId, setSelectedApkId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { mutate: deleteTrueTraceApk, isPending } = useDeleteTrueTraceApk({
    onError: (error) => {
      toast.error(
        `Failed to delete APK: ${error.response?.data?.error || error.message}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TRUE_TRACE_APKS_QUERY_KEY] });
      setSelectedApkId(null);
      toast.success("APK deleted successfully");
    },
  });

  return (
    <>
      <AppLoader open={isPending} message="Deleting TrueTrace APK..." />
      <ApkList
        data={data ?? []}
        isLoading={isLoading}
        title="True Trace APK List"
        description="View and manage all True Trace APK files"
        icon={<TrackChanges />}
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
            deleteTrueTraceApk(selectedApkId);
          }
        }}
        isLoading={isPending}
      />
    </>
  );
};
