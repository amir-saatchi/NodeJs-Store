const homeController = require("../../http/controllers/api/home.controller");
const router = require("express").Router();

router.get("/", homeController.indexPage);
module.exports = {
  HomeRoutes: router,
};

//swagger

/**
 * @swagger
 * tags:
 *    name: indexPage
 *    description: API to manage indexPage routes
 */

/**
 * @swagger
 *
 *    /:
 *      get:
 *        summary: index of routes
 *        tags: [indexPage]
 *        description: get all data for index routes
 *        responses:
 *          200:
 *              description: success
 *          404:
 *              description: not found
 */
