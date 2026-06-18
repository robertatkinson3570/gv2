// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
const isLocalEnvironment = !process.env.APP_ENV || process.env.APP_ENV === 'local';
const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

if (!isLocalEnvironment) {
  Sentry.init({
    // work around for common reCAPTCHA error https://github.com/getsentry/sentry-javascript/issues/2514
    beforeSend (event, hint) {
      if (hint.originalException === 'Timeout') return null;
      return event;
    },
    dsn: SENTRY_DSN,
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 0.1,
    // ...
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
  });
}
