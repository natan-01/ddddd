import { toast } from "sonner";

const recentErrorTimestamps = new Map<string, number>();
const ERROR_SUPPRESS_WINDOW = 1500;

export function showThrottledErrorToast(url: string, message: string) {
  const key = `${url}|${message}`;
  const now = Date.now();
  const lastShown = recentErrorTimestamps.get(key) || 0;

  if (now - lastShown < ERROR_SUPPRESS_WINDOW) return;

  recentErrorTimestamps.set(key, now);

  toast.error(message, {
    description: "Something went wrong. Please try again.",
    duration: 5000,
    richColors: true,
  });
}
