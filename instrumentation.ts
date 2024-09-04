export async function register() {
  const runtime = process.env.NEXT_RUNTIME;

  if (runtime === 'nodejs') {
    await import('./sentry.server.config');
  } else if (runtime === 'edge') {
    await import('./sentry.edge.config');
  } else {
    // Default or error handling
    console.warn('NEXT_RUNTIME is not set or unknown runtime.');
  }
}
