export interface UptimeData {
    uptime: string | null;
    statusText: string;
    statusClass: "success" | "warning" | "danger";
}

let uptimePromise: Promise<UptimeData> | undefined;

async function loadUptime(): Promise<UptimeData> {
    let uptime: string | null = null;
    let statusText = "Status unavailable";
    let statusClass: UptimeData["statusClass"] = "warning";

    try {
        const response = await fetch(
            "https://stats.uptimerobot.com/api/getMonitorList/K4iCg2UIEi",
            {
                headers: {
                    Accept: "application/json",
                },
                signal: AbortSignal.timeout(5000),
            }
        );

        if (response.ok) {
            const json = await response.json();

            // Extract uptime from the correct path (30d ratio preferred for stability)
            const monitor = json.data?.[0];
            const ratio = Number(
                monitor?.ratio?.ratio ?? json.psp?.monitors?.[0]?.ratio?.ratio
            );
            if (Number.isFinite(ratio) && ratio >= 0 && ratio <= 100) {
                uptime = ratio.toFixed(1);
            }

            if (["success", "warning", "danger"].includes(monitor?.statusClass)) {
                statusClass = monitor.statusClass;
                statusText = {
                    success: "All systems normal",
                    warning: "Service warning",
                    danger: "Service disruption",
                }[statusClass];
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
