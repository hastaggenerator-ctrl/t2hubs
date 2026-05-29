const configuredOrigins = (
  process.env.CLIENT_URL ||
  'https://t2hubs21.netlify.app'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const localDevOrigin = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/;

export const corsOptions = {
  origin(origin, callback) {
    console.log('CORS Origin:', origin);

    // Allow requests with no origin (Postman/mobile apps)
    if (!origin) {
      return callback(null, true);
    }

    // Allow configured frontend URLs
    if (configuredOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow localhost during development
    if (
      process.env.NODE_ENV !== 'production' &&
      localDevOrigin.test(origin)
    ) {
      return callback(null, true);
    }

    console.error(`CORS blocked origin: ${origin}`);
    return callback(new Error(`CORS blocked origin: ${origin}`));
  },

  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
