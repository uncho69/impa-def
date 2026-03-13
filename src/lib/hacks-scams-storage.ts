import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { DEFAULT_HACKS_SCAMS_ALERTS, type HacksScamsAlert } from "@/lib/hacks-scams-alerts";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "hacks-scams-alerts.json");

function normalize(alerts: HacksScamsAlert[]): HacksScamsAlert[] {
  return [...alerts]
    .map((item, idx) => ({
      ...item,
      severity: item.severity || "warning",
      isActive: Boolean(item.isActive),
      order: Number.isFinite(item.order) ? item.order : idx + 1,
      link: item.link || null,
    }))
    .sort((a, b) => a.order - b.order || a.createdAt.localeCompare(b.createdAt));
}

export async function readHacksScamsAlerts(): Promise<HacksScamsAlert[]> {
  try {
    const raw = await readFile(FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as HacksScamsAlert[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return normalize(DEFAULT_HACKS_SCAMS_ALERTS);
    }
    return normalize(parsed);
  } catch {
    return normalize(DEFAULT_HACKS_SCAMS_ALERTS);
  }
}

export async function writeHacksScamsAlerts(alerts: HacksScamsAlert[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(FILE_PATH, JSON.stringify(normalize(alerts), null, 2), "utf-8");
}

