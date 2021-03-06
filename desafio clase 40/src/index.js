const minimist = require('minimist');
const mainServer = require('./main');
const env = require("./utils/config/env.config");
const { errorLogger } = require("./utils/config/logger.config");

const args = minimist(process.argv.slice(2), {
  default: {
    PORT: env.PORT,
    mode: "fork",
    compression: true
  },
  alias: {
    p: "PORT",
    m: "mode",
    c: "compression"
  }
});
args.compression = args.compression === "false" ? false : args.compression === "true" ? true : args.compression;
if(env.MODE_CLUSTER) args.mode = "cluster";

let httpServer;

if(args.compression === true || args.compression === false) {
  if(args.mode == "cluster") { // el servidor se inicia en modo CLUSTER.
    const cluster = require("cluster");
    const os = require("os");
    if(cluster.isPrimary) {
      for (let i = 0; i < os.cpus().length; i++) { cluster.fork(); }
      cluster.on("exit", (worker, code) => cluster.fork());
    } else httpServer = mainServer();
  } else if(args.mode == "fork") httpServer = mainServer(); // el servidor se inicia en modo FORK.
  else {
    errorLogger.error(`The modality entered [${args.mode}] is not supported.`);
    throw new Error(`The modality entered [${args.mode}] is not supported.`);
  }
} else {
  errorLogger.error(`The modality entered [${args.compression}] is not supported.`);
  throw new Error(`The modality entered [${args.compression}] is not supported.`);
}

//--------------------------------------------
// inicio el servidor
const connectedServer = httpServer.listen(args.PORT, () => 
  console.log(`[${env.NODE_ENV.trim()}] Server is up and running on port => ${env.PORT}`));
connectedServer.on("error", error => {
  console.log('There was an unexpected error in the server');
  console.log(error);
});

module.exports = args;