export const POINT_WEIGHTS = {
  likes: 1,
  replies: 1,
  retweets: 1,
  quotes: 1,
} as const;

export function calculatePoints(
  likes: number | null | undefined = 0,
  replies: number | null | undefined = 0,
  retweets: number | null | undefined = 0,
  quotes: number | null | undefined = 0
): number {
  return (
    (likes || 0) * POINT_WEIGHTS.likes +
    (replies || 0) * POINT_WEIGHTS.replies +
    (retweets || 0) * POINT_WEIGHTS.retweets +
    (quotes || 0) * POINT_WEIGHTS.quotes
  );
}

