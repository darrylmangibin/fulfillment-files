import { ApkList } from "@/components/apk-list";
import { DeleteApkDialog } from "@/components/delete-apk-dialog";
import { useGetFusionApks } from "@/modules/fusion/hooks/use-get-fusion-apks";
import { Android } from "@mui/icons-material";
import { useState } from "react";

export const FusionApkList = () => {
  const { data, isLoading } = useGetFusionApks();
  const [selectedApkId, setSelectedApkId] = useState<string | null>(null);

  return (
    <>
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
      />
    </>
  );
};
