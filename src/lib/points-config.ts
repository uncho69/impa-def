// Point weights configuration
// Admins can modify these values to change how points are calculated
export const POINT_WEIGHTS = {
  likes: 1,
  replies: 1,
  retweets: 1,
  quotes: 1,
} as const;

// Calculate points from engagement metrics
export function calculatePoints(
  likes: number = 0,
  replies: number = 0,
  retweets: number = 0,
  quotes: number = 0
): number {
  return (
    (likes || 0) * POINT_WEIGHTS.likes +
    (replies || 0) * POINT_WEIGHTS.replies +
    (retweets || 0) * POINT_WEIGHTS.retweets +
    (quotes || 0) * POINT_WEIGHTS.quotes
  );
}

