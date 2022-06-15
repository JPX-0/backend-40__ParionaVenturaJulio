const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("./middlewares/passport.middleware");

const env = require("./utils/config/env.config");
const dbConfig = require("./utils/config/db.config");

const { Server: HttpServer } = require("http");
const { Server: Socket } = require("socket.io");

const routes = require("./routers/app.routes");
const readAllRoutes = require("./middlewares/readRoutes.middleware");
const routeExist = require("./middlewares/routeExist.middleware");

const addProductsHandlers = require("./ws/products");
const addMenssagesHandlers = require("./ws/messages");

const mainServer = () => {
  //--------------------------------------------
  // instancio servidor, socket y api
  const app = express();
  const httpServer = new HttpServer(app);
  const io = new Socket(httpServer);

  //--------------------------------------------
  // configuro el socket
  io.on("connection", async socket => {
    addProductsHandlers(socket, io.sockets);
    addMenssagesHandlers(socket, io.sockets);
  });

  //--------------------------------------------
  // configuro el servidor
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));

  app.use(session({
    name: env.SESSION_NAME,
    store: MongoStore.create({ 
      mongoUrl: dbConfig.mongodb.connectTo("sessions") 
    }),
    secret: [env.SESSION_SECRET],
    resave: false,
    saveUninitialized: false,
    // cookie: { maxAge: 600000 } // se cerrará la sesion en 10mints.
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  //--------------------------------------------
  // Template engines
  app.set("views", "./views");
  app.set("view engine", "ejs");

  //--------------------------------------------
  // Midlewares (lee rutas)
  app.use(readAllRoutes);

  //--------------------------------------------
  // rutas del servidor
  app.use("/", routes);

  //--------------------------------------------
  // Middlewares (verifica rutas)
  app.use('/*', routeExist);

  //--------------------------------------------
  // inicio el servidor
  return httpServer;
}

module.exports = mainServer;