const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const { AllRoutes } = require("./router/router");
const morgan = require("morgan");
const createError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDOC = require("swagger-jsdoc");

class Application {
  #app = express();
  #PORT;
  #DB_URL;
  constructor(PORT, DB_URL) {
    this.#PORT = PORT;
    this.#DB_URL = DB_URL;
    this.configApplication();
    this.connectToMongoDB();
    this.createServer();
    this.createRoutes();
    this.errorHandling();
  }
  configApplication() {
    this.#app.use(morgan("dev"));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extends: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJSDOC({
          swaggerDefinition: {
            info: {
              title: "Store Application",
              version: "1.0.0",
              description: "one of the most popular store application",
              contact:{
                name:"4TH_Coder",
                url:"http://4TH-Coder.io",
                email:"info@gmail.com"
              }
            },
            servers: [
              {
                url: "http://localhost:5000",
              },
            ],
          },
          apis: ["./app/router/*/*.js"],
        })
      )
    );
  }
  createServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log(`run > http://localhost:${this.#PORT}`);
    });
  }
  async connectToMongoDB() {
    try {
      await mongoose.connect(this.#DB_URL);
      return console.log("connected to MongoDB DataBase");
    } catch (error) {
      return console.log(error.message);
    }
  }
  createRoutes() {
    this.#app.use(AllRoutes);
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound());
    });
    this.#app.use((error, req, res, next) => {
      const statusCode =
        error.status || createError.InternalServerError().status;
      const message =
        error.message || createError.InternalServerError().message;
      return res.status(statusCode).json({
        data: null,
        errors: { statusCode, message },
      });
    });
  }
}

module.exports = Application;
