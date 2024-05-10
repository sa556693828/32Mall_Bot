import winston from 'winston';

const { combine, timestamp, json, errors } = winston.format;

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  format: combine(
    errors({ stack: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    json(),
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
