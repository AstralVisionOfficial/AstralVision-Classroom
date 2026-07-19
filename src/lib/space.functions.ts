import { createServerFn } from "@tanstack/react-start";

// All server-only. Read secrets inside handlers.
const NASA_BASE = "https://api.nasa.gov";

async function nasaFetch(path: string, extraQs: Record<string, string> = {}) {
  const key = process.env.NASA_API_KEY || "DEMO_KEY";
  const qs = new URLSearchParams({ api_key: key, ...extraQs });
  const res = await fetch(`${NASA_BASE}${path}?${qs.toString()}`);
  if (!res.ok) throw new Error(`NASA ${path} failed: ${res.status}`);
  return res.json();
}

export const getISSPosition = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544", {
      headers: { "user-agent": "Astral Vision" },
    });
    if (!res.ok) throw new Error(String(res.status));
    const j = await res.json();
    return {
      latitude: j.latitude as number,
      longitude: j.longitude as number,
      altitudeKm: j.altitude as number,
      velocityKmh: j.velocity as number,
      visibility: j.visibility as string,
      timestamp: j.timestamp as number,
    };
  } catch {
    return null;
  }
});

export const getAPOD = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const j = await nasaFetch("/planetary/apod");
    return {
      title: j.title as string,
      date: j.date as string,
      explanation: j.explanation as string,
      url: (j.hdurl || j.url) as string,
      mediaType: j.media_type as string,
    };
  } catch {
    return null;
  }
});

export const getNextLaunch = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const res = await fetch(
      "https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit=1&mode=list",
      { headers: { "user-agent": "Astral Vision" } },
    );
    if (!res.ok) throw new Error(String(res.status));
    const j = await res.json();
    const r = j.results?.[0];
    if (!r) return null;
    return {
      name: r.name as string,
      net: r.net as string,
      provider: r.launch_service_provider?.name as string | undefined,
      pad: r.pad?.name as string | undefined,
      status: r.status?.name as string | undefined,
    };
  } catch {
    return null;
  }
});

export const getSpaceWeather = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const now = new Date();
    const start = new Date(now.getTime() - 3 * 24 * 3600 * 1000).toISOString().slice(0, 10);
    const j = await nasaFetch("/DONKI/notifications", { startDate: start, type: "all" });
    const items = Array.isArray(j) ? j.slice(0, 3) : [];
    return items.map((n: { messageType: string; messageIssueTime: string; messageID: string }) => ({
      type: n.messageType,
      issued: n.messageIssueTime,
      id: n.messageID,
    }));
  } catch {
    return [];
  }
});
