const formatDuration = (ms) => {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
};

export const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: formatDuration(duration),
      ip: req.ip,
      userAgent: req.get('user-agent'),
      timestamp: new Date().toISOString()
    };

    if (res.statusCode >= 400) {
      console.error('Request Error:', log);
    } else if (process.env.NODE_ENV === 'development') {
      console.log('Request:', log);
    }
  });

  next();
};
