export function defaultSocialImage(
  matches: readonly ({ id: string; data?: unknown } | undefined)[] = [],
): string {
  const rootData = matches.find((match) => match?.id === "root")?.data as
    | { siteOrigin?: string }
    | undefined;

  return new URL(
    "/og-image.jpg?v=redesign-2026",
    rootData?.siteOrigin || "https://rotaryzcwest.org",
  ).href;
}
