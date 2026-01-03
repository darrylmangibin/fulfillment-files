import { metricsTimespan, TimeFrame } from "@/lib/metrics-timespan";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const params = request.nextUrl.searchParams;

  const timeFrame = (params.get("timeFrame") as TimeFrame) || TimeFrame.WEEKLY;

  const timespan = metricsTimespan(timeFrame);

  try {
    const token = process.env.EXPO_TOKEN?.toString().trim();

    if (!token) {
      console.error("EXPO_TOKEN is not set in environment variables");
      return NextResponse.json(
        { error: "EXPO_TOKEN not configured" },
        { status: 500 }
      );
    }

    const FULL_NAME = "@digital-innoventures-group/logistics-capture-tool";

    const granularity = "DAY";

    const response = await axios.post(
      "https://api.expo.dev/graphql",
      {
        operationName: "AppEASBuildUsageMetrics",
        variables: { fullName: FULL_NAME, granularity, timespan },
        query: `
          query AppEASBuildUsageMetrics($fullName: String!, $granularity: UsageMetricsGranularity!, $timespan: UsageMetricsTimespan!) {
            app {
              byFullName(fullName: $fullName) {
                usageMetrics {
                  MEDIUM_ANDROID_BUILDS: metricsForServiceMetric(serviceMetric: BUILDS, granularity: $granularity, timespan: $timespan, filterParams: {platform:"android", billingResourceClass:["medium"], status:["finished","errored"]}) {
                    id
                    timestamp
                    value
                  }
                  LARGE_ANDROID_BUILDS: metricsForServiceMetric(serviceMetric: BUILDS, granularity: $granularity, timespan: $timespan, filterParams: {platform:"android", billingResourceClass:["large"], status:["finished","errored"]}) {
                    id
                    timestamp
                    value
                  }
                  MEDIUM_IOS_BUILDS: metricsForServiceMetric(serviceMetric: BUILDS, granularity: $granularity, timespan: $timespan, filterParams: {platform:"ios", billingResourceClass:["medium"], status:["finished","errored"]}) {
                    id
                    timestamp
                    value
                  }
                  LARGE_IOS_BUILDS: metricsForServiceMetric(serviceMetric: BUILDS, granularity: $granularity, timespan: $timespan, filterParams: {platform:"ios", billingResourceClass:["large"], status:["finished","errored"]}) {
                    id
                    timestamp
                    value
                  }
                  ANDROID_BUILDS_TOTAL: metricsForServiceMetric(serviceMetric: BUILDS, granularity: TOTAL, timespan: $timespan, filterParams:{platform:"android", status:["finished","errored"]}) {
                    id
                    value
                  }
                  IOS_BUILDS_TOTAL: metricsForServiceMetric(serviceMetric: BUILDS, granularity: TOTAL, timespan: $timespan, filterParams:{platform:"ios", status:["finished","errored"]}) {
                    id
                    value
                  }
                }
              }
            }
          }
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("Build Metrics API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch build metrics" },
      { status: 500 }
    );
  }
};
