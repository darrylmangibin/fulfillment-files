import { ApkList } from "@/components/apk-list";
import { useGetTrueTraceApks } from "@/modules/true-trace/hooks/use-get-true-trace-apks";

export const TrueTraceApkList = () => {
  const { data, isLoading } = useGetTrueTraceApks();

  return (
    <ApkList
      data={data ?? []}
      isLoading={isLoading}
      title="True Trace APK List"
      description="View and manage all True Trace APK files"
    />
  );
};
