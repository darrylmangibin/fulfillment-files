import { ApkList } from "@/components/apk-list";
import { useGetFusionApks } from "@/modules/fusion/hooks/use-get-fusion-apks";

export const FusionApkList = () => {
  const { data, isLoading } = useGetFusionApks();

  return <ApkList data={data ?? []} isLoading={isLoading} />;
};
