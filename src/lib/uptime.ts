export interface UptimeData {
    uptime: string;
    statusText: string;
    statusClass: string;
}

let uptimePromise: Promise<UptimeData> | undefined;

async function loadUptime(): Promise<UptimeData> {
    let uptime = "100.0"; // Fallback
    let statusText = "All systems normal";
    let statusClass = "success"; // success, warning, danger

    try {
        const response = await fetch(
            "https://stats.uptimerobot.com/api/getMonitorList/K4iCg2UIEi",
            {
                headers: {
                    Accept: "application/json",
                },
            }
        );

        if (response.ok) {
            const json = await response.json();

            // Extract uptime from the correct path (30d ratio preferred for stability)
            const monitor = json.data?.[0];
            if (monitor?.ratio?.ratio) {
                uptime = parseFloat(monitor.ratio.ratio).toFixed(1);
            } else if (json.psp?.monitors?.[0]?.ratio?.ratio) {
                uptime = parseFloat(json.psp.monitors[0].ratio.ratio).toFixed(1);
            }

            // Extract status
            if (json.statistics?.count_result) {
                statusText =
                    json.statistics.count_result === "All Clear"
                        ? "All systems normal"
                        : json.statistics.count_result;
            }

            // Check monitor status class
            if (monitor?.statusClass) {
                statusClass = monitor.statusClass; // success, warning, danger
            }
        }
    } catch (error) {
        console.warn(
            "Failed to fetch UptimeRobot status:",
            error instanceof Error ? error.message : error
        );
    }

    return { uptime, statusText, statusClass };
}

export function fetchUptime(): Promise<UptimeData> {
    uptimePromise ??= loadUptime();
    return uptimePromise;
}
