export type ProjectLinkOverride = {
  label: string;
  href: string;
};

export type ProjectContentOverrides = {
  overviewText?: string;
  appUrl?: string;
  guideUrl?: string;
  usefulLinks?: ProjectLinkOverride[];
  featureCards?: { title: string; description: string; href?: string }[];
  howToSteps?: { title: string; description: string; href?: string }[];
  riskCards?: { title: string; description: string }[];
  contentItems?: {
    type: "video" | "article";
    title: string;
    href?: string;
    embedId?: string;
    source?: string;
    skillLevel?: string;
    tags?: string[];
  }[];
};

type MetadataEnvelope = {
  tags?: string[];
  contentOverrides?: ProjectContentOverrides;
};

export function parseProjectMetadataTags(raw: string | null | undefined): {
  tags: string[];
  contentOverrides: ProjectContentOverrides | null;
} {
  if (!raw) return { tags: [], contentOverrides: null };
  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const tags = parsed.filter((x): x is string => typeof x === "string");
      return { tags, contentOverrides: null };
    }
    if (parsed && typeof parsed === "object") {
      const obj = parsed as MetadataEnvelope;
      const tags = Array.isArray(obj.tags) ? obj.tags.filter((x): x is string => typeof x === "string") : [];
      const contentOverrides =
        obj.contentOverrides && typeof obj.contentOverrides === "object"
          ? sanitizeContentOverrides(obj.contentOverrides)
          : null;
      return { tags, contentOverrides };
    }
    return { tags: [], contentOverrides: null };
  } catch {
    return { tags: [], contentOverrides: null };
  }
}

export function stringifyProjectMetadataTags(params: {
  tags?: string[];
  contentOverrides?: ProjectContentOverrides | null;
}): string | null {
  const tags = Array.isArray(params.tags) ? params.tags.filter((x): x is string => typeof x === "string" && x.trim().length > 0) : [];
  const contentOverrides = params.contentOverrides ? sanitizeContentOverrides(params.contentOverrides) : null;
  if (!contentOverrides) {
    return tags.length > 0 ? JSON.stringify(tags) : null;
  }
  return JSON.stringify({
    tags,
    contentOverrides,
  });
}

function sanitizeContentOverrides(input: ProjectContentOverrides): ProjectContentOverrides | null {
  const out: ProjectContentOverrides = {};
  if (typeof input.overviewText === "string" && input.overviewText.trim()) {
    out.overviewText = input.overviewText.trim();
  }
  if (typeof input.appUrl === "string" && input.appUrl.trim()) {
    out.appUrl = input.appUrl.trim();
  }
  if (typeof input.guideUrl === "string" && input.guideUrl.trim()) {
    out.guideUrl = input.guideUrl.trim();
  }
  if (Array.isArray(input.usefulLinks)) {
    const normalized = input.usefulLinks
      .filter((x): x is ProjectLinkOverride => !!x && typeof x.label === "string" && typeof x.href === "string")
      .map((x) => ({ label: x.label.trim(), href: x.href.trim() }))
      .filter((x) => x.label.length > 0 && x.href.length > 0);
    if (normalized.length > 0) {
      out.usefulLinks = normalized;
    }
  }
  if (Array.isArray(input.featureCards)) {
    const normalized = input.featureCards
      .filter(
        (x): x is { title: string; description: string; href?: string } =>
          !!x && typeof x.title === "string" && typeof x.description === "string"
      )
      .map((x) => ({
        title: x.title.trim(),
        description: x.description.trim(),
        href: typeof x.href === "string" ? x.href.trim() : undefined,
      }))
      .filter((x) => x.title.length > 0 || x.description.length > 0);
    if (normalized.length > 0) out.featureCards = normalized;
  }
  if (Array.isArray(input.howToSteps)) {
    const normalized = input.howToSteps
      .filter(
        (x): x is { title: string; description: string; href?: string } =>
          !!x && typeof x.title === "string" && typeof x.description === "string"
      )
      .map((x) => ({
        title: x.title.trim(),
        description: x.description.trim(),
        href: typeof x.href === "string" ? x.href.trim() : undefined,
      }))
      .filter((x) => x.title.length > 0 || x.description.length > 0);
    if (normalized.length > 0) out.howToSteps = normalized;
  }
  if (Array.isArray(input.riskCards)) {
    const normalized = input.riskCards
      .filter(
        (x): x is { title: string; description: string } =>
          !!x && typeof x.title === "string" && typeof x.description === "string"
      )
      .map((x) => ({
        title: x.title.trim(),
        description: x.description.trim(),
      }))
      .filter((x) => x.title.length > 0 || x.description.length > 0);
    if (normalized.length > 0) out.riskCards = normalized;
  }
  if (Array.isArray(input.contentItems)) {
    const normalized = input.contentItems
      .filter(
        (
          x
        ): x is {
          type: "video" | "article";
          title: string;
          href?: string;
          embedId?: string;
          source?: string;
          skillLevel?: string;
          tags?: string[];
        } =>
          !!x &&
          (x.type === "video" || x.type === "article") &&
          typeof x.title === "string"
      )
      .map((x) => ({
        type: x.type,
        title: x.title.trim(),
        href: typeof x.href === "string" ? x.href.trim() : undefined,
        embedId: typeof x.embedId === "string" ? x.embedId.trim() : undefined,
        source: typeof x.source === "string" ? x.source.trim() : undefined,
        skillLevel: typeof x.skillLevel === "string" ? x.skillLevel.trim() : undefined,
        tags: Array.isArray(x.tags)
          ? x.tags.filter((t): t is string => typeof t === "string").map((t) => t.trim()).filter(Boolean)
          : undefined,
      }))
      .filter((x) => x.title.length > 0);
    if (normalized.length > 0) out.contentItems = normalized;
  }
  return Object.keys(out).length > 0 ? out : null;
}

