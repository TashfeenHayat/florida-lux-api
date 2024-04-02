/**
 * @swagger
 * securityDefinitions:
 *   AccessToken:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *     description: |
 *       Enter your access token in the format "Bearer <your_access_token>".
 */


/**
 * @swagger 
 * components:
 *   schemas:
 *     Agent:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the item.
 *         code:
 *           type: string
 *           description: The code of the item.
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the item.
 *         address:
 *           type: object
 *           description: The address of the item.
 *           properties:
 *             addressLine1:
 *               type: string
 *               description: The first line of the address.
 *             addressLine2:
 *               type: string
 *               description: The second line of the address.
 *             state:
 *               type: string
 *               description: The state of the address.
 *             city:
 *               type: string
 *               description: The city of the address.
 *             country:
 *               type: string
 *               description: The country of the address.
 *             zipCode:
 *               type: string
 *               description: The ZIP code of the address.
 *         description:
 *           type: string
 *           description: The description of the item.
 *         reference:
 *           type: string
 *           description: The reference of the item.
 *         photo:
 *           type: string
 *           description: The photo URL of the item.
 * 
 * 
 * /v1/agent:
 *   post:
 *     summary: Create a new agent
 *     description: Create a new agent.
 *     security: 
 *       - bearerAuth: []
 *     tags:
 *       - Agents
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agent'
 *     responses:
 *       '201':
 *         description: Agent created successfully
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 * 
 *   get:
 *     summary: Retrieve agents based on a provided key or return all agents if no key is given.
 *     parameters:
 *       - in: query
 *         name: key
 *         schema:
 *           type: string
 *         description: Optional. The key to search for agents.
 *     tags:
 *       - Agents
 *     responses:
 *       '200':
 *         description: A list of agents matching the provided key or all agents if no key is given.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agent'
 *       '500':
 *         description: Internal server error.
 *
 * /v1/agent/{id}:
 *   get:
 *     summary: Get agent by ID
 *     description: Retrieve an agent by its ID.
 *     security: 
 *       - bearerAuth: []
 *     tags:
 *       - Agents
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the agent to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agent'
 *       '404':
 *         description: Agent not found
 *       '500':
 *         description: Internal server error
 * 
 *   patch:
 *     summary: Update an agent
 *     description: Update an agentt.
 *     security: 
 *       - bearerAuth: []
 *     tags:
 *       - Agents
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the filter to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agent'
 *     responses:
 *       '201':
 *         description: Agent created successfully
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 * 
 *   delete:
 *     summary: Delete agent by ID
 *     description: Delete an agent by its ID.
 *     security: 
 *       - bearerAuth: []
 *     tags:
 *       - Agents
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the agent to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Agent deleted successfully
 *       '404':
 *         description: Agent not found
 *       '500':
 *         description: Internal server error

 * 
 */
