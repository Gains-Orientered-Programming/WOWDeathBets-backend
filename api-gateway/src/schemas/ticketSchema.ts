/**
 * @openapi
 * tags:
 *  - name: Ticket
 *    description: operations for ticket-service
 * /ticket-service/deposit-ticket:
 *  post:
 *   summary: Deposit ticket
 *   tags: [Ticket]
 *   responses:
 *    200:
 *     description: The created deposit ticket.
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
 *        - amount
 *       properties:
 *        userId:
 *         type: string
 *         default: 0
 *        characterName:
 *         type: string
 *         default: Pasha
 *        amount:
 *         type: number
 *         default: 0
 * 
 * /ticket-service/tickets:
 *  get:
 *   summary: Get all tickets
 *   tags: [Ticket]
 *   responses:
 *    200:
 *     description: The list of all tickets for the user
 *    403:
 *     description: No access allowed
 * 
 * /ticket-service/tickets/userId/{id}:
 *  get:
 *   tags: [Ticket]
 *   summary: Get all ticket by userId
 *   parameters:
 *    - in: path
 *      name: id
 *      description: The userId for the specific user
 *      required: true
 *   responses:
 *    200:
 *     description: The tickets by userId
 *    403:
 *     description: No access allowed
 */