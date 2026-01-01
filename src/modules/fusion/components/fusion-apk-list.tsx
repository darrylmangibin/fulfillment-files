import { ApkList } from "@/components/apk-list";
import { useGetFusionApks } from "@/modules/fusion/hooks/use-get-fusion-apks";
import { Android } from "@mui/icons-material";

export const FusionApkList = () => {
  const { data, isLoading } = useGetFusionApks();

  return (
    <ApkList
      data={data ?? []}
      isLoading={isLoading}
      title="Fusion APK List"
      description="View and manage all Fusion APK files"
      icon={<Android />}
    />
  );
};
