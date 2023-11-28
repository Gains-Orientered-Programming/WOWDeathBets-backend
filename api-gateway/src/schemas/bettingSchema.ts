/**
 * @openapi
 * /bettings/create-betting:
 *  post:
 *   summary: Create a new betting
 *   tags: [Betting]
 *   responses:
 *    200:
 *     description: The created betting.
 *    500:
 *     description: Internal Server Error
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required:
 *        - characterName
 *        - region
 *        - realm
 *        - amount
 *       properties:
 *        characterName:
 *         type: string
 *         default: petrice
 *        region:
 *         type: string
 *         default: eu
 *        realm:
 *         type: string
 *         default: nekrosh
 *        amount:
 *         type: number
 *         default: 0
 */

/**
 * @openapi
 * /bettings/{id}:
 *  get:
 *   tags: [Betting]
 *   summary: Get a betting by id
 *   parameters:
 *    - in: path
 *      name: id
 *      description: The id of the betting
 *      required: true
 *   responses:
 *    200:
 *      description: The betting by id
 *    403:
 *      description: Forbidden
 */

/**
 * @openapi
 * /bettings/{id}:
 *  delete:
 *   tags: [Betting]
 *   summary: Delete a betting by id
 *   parameters:
 *    - in: path
 *      name: id
 *      description: The id of the betting
 *      required: true
 *   responses:
 *    200:
 *     description: The betting deleted
 *    403:
 *     description: Forbidden
 */
