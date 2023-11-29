/**
 * @openapi
 * tags:
 *  - name: Betting
 *    description: operations for betting-service
 * /betting-service/bettings:
 *  get:
 *   summary: Get all bettings
 *   tags: [Betting]
 *   responses:
 *    200:
 *     description: The list of all bettings
 *    403:
 *     description: Forbidden
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
 *        - userId
 *        - characterName
 *        - region
 *        - realm
 *        - amount
 *       properties:
 *        userId:
 *         type: string
 *         default: 0
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
 * /betting-service/bettings/{id}:
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
