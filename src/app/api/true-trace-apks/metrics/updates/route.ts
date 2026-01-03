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
        operationName: "AppEASUpdateUsageMetrics",
        variables: { fullName: FULL_NAME, granularity, timespan },
        query: `
          query AppEASUpdateUsageMetrics($fullName: String!, $granularity: UsageMetricsGranularity!, $timespan: UsageMetricsTimespan!) {
            app {
              byFullName(fullName: $fullName) {
                usageMetrics {
                  BANDWIDTH_USAGE: metricsForServiceMetric(serviceMetric: BANDWIDTH_USAGE, granularity: $granularity, timespan: $timespan) {
                    id
                    timestamp
                    value
                  }
                  UNIQUE_UPDATERS: metricsForServiceMetric(serviceMetric: UNIQUE_UPDATERS, granularity: $granularity, timespan: $timespan) {
                    id
                    timestamp
                    value
                  }
                  UNIQUE_UPDATERS_TOTAL: metricsForServiceMetric(serviceMetric: UNIQUE_UPDATERS, granularity: TOTAL, timespan: $timespan) {
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
