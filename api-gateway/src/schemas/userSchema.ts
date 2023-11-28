/**
 * @openapi
 * tags:
 *  name: User
 *  description: User endpoints
 * /users:
 *  get:
 *   summary: Get all users
 *   tags: [User]
 *   responses:
 *    200:
 *     description: The list of all users
 *    403:
 *     description: Forbidden
 *  post:
 *   summary: Create a new user
 *   tags: [User]
 *   responses:
 *    200:
 *     description: The created user.
 *    500:
 *     description: Internal Server Error
 *    400:
 *     description: Bad Request
 *    403:
 *     description: Forbidden
 *  requestBody:
 *   required: true
 *   content:
 *    application/json:
 *     schema:
 *      type: object
 *      required:
 *       - username
 *       - email
 *       - password
 *      properties:
 *       username:
 *        type: string
 *        default: test
 *       email:
 *        type: string
 *        default: test@test.com
 *       password:
 *        type: string
 *        default: test
 */
