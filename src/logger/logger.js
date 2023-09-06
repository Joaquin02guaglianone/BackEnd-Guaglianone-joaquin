import dotenv from "dotenv"
import winston from "winston";

dotenv.config()

const logLevels = {
    debug: 5,
    http: 4,
    info: 3,
    warning: 2,
    error: 1,
    fatal: 0,
  };
  
  const logColors = {
    debug: "green",
    http: "cyan",
    info: "gray",
    warning: "blue",
    error: "red",
    fatal: "black",
  };


  winston.addColors(logColors);
  
  const devLog = winston.createLogger({
    levels: logLevels,
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.simple()
    ),
    transports: [new winston.transports.Console({ level: "debug" })]
  });
  
  const prodLog = winston.createLogger({
    levels: logLevels,
    format: winston.format.combine(
      winston.format.colorize({ all: true }), 
      winston.format.simple() 
    ),
    transports: [
      new winston.transports.Console({ level: "info" }),
      new winston.transports.File({ filename: "./error.log", level: "error" }),
    ],
  });
  
  export const addLogger = (req, res, next) => {
    switch (process.env.environment) {
      case 'developer':
        req.logger = devLog;
        break;
      case 'production':
        req.logger = prodLog;
        break;
      default:
        req.logger = devLog;
    }
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()} en ambiente ${process.env.environment}`)
    next()
  };
  
  export const loggerInfo = () => {
    switch (process.env.environment) {
      case 'developer':
        return devLog;
      case 'production':
        return prodLog
      default:
        return devLog
    }
  }
  

