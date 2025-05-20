import chalk from 'chalk';

export const logger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const source = res.locals.source ? `[${res.locals.source}]` : '';
    console.log(
      `${chalk.green(req.method)} ${req.url} - ${res.statusCode} ${source} - ${duration}ms`
    );
  });
  next();
};