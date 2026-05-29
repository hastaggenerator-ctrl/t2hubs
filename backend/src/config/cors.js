const configuredOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const localDevOrigin = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/;

export const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (configuredOrigins.includes(origin)) return callback(null, true);
    if (process.env.NODE_ENV !== 'production' && localDevOrigin.test(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true
};

