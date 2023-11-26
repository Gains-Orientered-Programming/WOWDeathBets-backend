import {
  createBettingController,
  getBettingByIdController,
  deleteBettingByIdController,
} from '../controllers/betting-controller';
import { Express } from 'express';

function routes(app: Express) {
  /**
   * @openapi
   * /bettings/create-betting:
   *  post:
   *   summary: Create a new betting
   *   tags: [Betting]
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
   *      responses:
   *        200:
   *          description: The created betting.
   *          content:
   *            application/json:
   *        500:
   *         description: Internal Server Error
   */
  app.post('/create-betting', createBettingController);

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
   */
  app.get('/betting/:id', getBettingByIdController);

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
   */
  app.delete('/betting/:id', deleteBettingByIdController);
}

export default routes;
