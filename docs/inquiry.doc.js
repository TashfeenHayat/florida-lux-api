/**
 * @swagger
 * components:
 *   schemas:
 *     Inquiry:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: User's name
 *         lastName:
 *           type: string
 *           description: User's name
 *         phoneNumber:
 *           type: string
 *           description: User's phone number
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         propertyId:
 *           type: string
 *           description: Id of the property
 *         requestVisit:
 *           type: boolean
 *           description: If user want to request a visit
 *         message:
 *           type: string
 *           description: Message from the user
 * 
 * paths:
 *  /v1/inquiry:
 *    post:
 *      summary: Submit an Inquiry
 *      description: Submits an inquiry with user's name, email, and message
 *      tags: 
 *        - Inquiry
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Inquiry'
 *      responses:
 *        '201':
 *          description: Inquiry submitted successfully
 *        '400':
 *          description: Invalid request body
 *        '500':
 *          description: Internal server error
 *
 *    get:
 *      summary: Get All Inquiries
 *      description: Retrieves all inquiries
 *      tags: 
 *        - Inquiry
 *      responses:
 *        '200':
 *          description: List of inquiries
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Inquiry'
 *        '500':
 *          description: Internal server error
 * 
 *  /v1/inquiry/{id}:
 *    get:
 *      summary: Get Inquiry by ID
 *      description: Retrieve an inquiry by its ID.
 *      tags:
 *        - Inquiry
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID of the inquiry to retrieve
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Inquiry'
 *        '404':
 *          description: Inquiry not found
 *        '500':
 *          description: Internal server error
 * 
 */

