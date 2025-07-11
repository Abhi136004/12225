
export function logEvent(message, level = "info") {
  fetch("/api/log", {
    method: "POST",
    body: JSON.stringify({ message, level, timestamp: new Date().toISOString() }),
    headers: { 'Content-Type': 'application/json' }
  });
}
