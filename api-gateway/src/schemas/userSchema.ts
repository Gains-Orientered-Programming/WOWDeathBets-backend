/**
 * @openapi
 * tags:
 *  - name: User
 *    description: operations for user-service
 * /smoke-test:
 *  get:
 *   summary: Smoke test
 *   tags: [User]
 *   responses:
 *    200:
 *     description: User Service is up!
 * /users:
 *  get:
 *   summary: Get all users
 *   tags: [User]
 *   responses:
 *    200:
 *     description: List of all users
 *    500:
 *     description: Unable to get users.
 * /user/{id}:
 *  get:
 *   summary: Get a user by their ID
 *   tags: [User]
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: User details
 *    404:
 *     description: User not found
 *    500:
 *     description: Unable to get user.
 *  delete:
 *   summary: Delete a user by their ID
 *   tags: [User]
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: User deleted successfully
 *    500:
 *     description: Unable to delete user.
 * /email/{email}:
 *  get:
 *   summary: Get a user by their email
 *   tags: [User]
 *   parameters:
 *    - name: email
 *      in: path
 *      required: true
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: User details
 *    404:
 *     description: User not found
 *    500:
 *     description: Unable to get user.
 * /username/{username}:
 *  get:
 *   summary: Get a user by their username
 *   tags: [User]
 *   parameters:
 *    - name: username
 *      in: path
 *      required: true
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: User details
 *    404:
 *     description: User not found
 *    500:
 *     description: Unable to get user.
 * /create-user:
 *  post:
 *   summary: Create a new user
 *   tags: [User]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required:
 *        - username
 *        - email
 *        - password
 *       properties:
 *        username:
 *         type: string
 *        email:
 *         type: string
 *        password:
 *         type: string
 *   responses:
 *    201:
 *     description: User created successfully
 *    500:
 *     description: Unable to create user.
 */
