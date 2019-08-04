// create a new express router
const express      = require('express'),
  router           = express.Router(),
  viewController   = require('./controllers/view.controller'),
  geocodeController= require('./controllers/geocode.controller');

// export router
module.exports = router;

// show swagger spec
router.get('/swagger.json', viewController.swagger);


/*
define api routes
--------------------------------------------------------
 */
// swagger defintions
/**
// get coordinates
/**
 * @swagger
 * /api/v1/getCoordinates:
 *   get:
 *     tags:
 *       - Coordinates
 *     description: Returns coordinates of an address
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: q
 *         description: provide adress
 *         in: "query"
 *         required: true
 *         type: string
 *         example: Platz der Republik 1, , Berlin 11011, DE
 *     responses:
 *       200:
 *         description: coordinates and other details about the adress
 */
router.get('/api/v1/getCoordinates', geocodeController.getCoordinates);
