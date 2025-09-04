export const notFound = (_req, res, _next) => res.status(404).json({ message: 'Route not found' });

export const errorHandler = (err, _req, res, _next) => {
  const status = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status).json({ message: err.message || 'Server error' });
};
