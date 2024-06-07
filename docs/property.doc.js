/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Property:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the property.
 *           example: "Beautiful Villa"
 *         code:
 *           type: string
 *           description: The code of the property.
 *           example: "PROP123"
 *         description:
 *           type: string
 *           description: The description of the property.
 *           example: "Spacious villa with stunning views"
 *         status:
 *           type: string
 *           enum: ["for_sale", "sold", "incoming", "for_rent"]
 *           description: The status of the property.
 *           example: "for_sale"
 *         media:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               smUrl:
 *                 type: string
 *                 description: The URL of the small-sized media.
 *               mdUrl:
 *                 type: string
 *                 description: The URL of the medium-sized media.
 *               xlUrl:
 *                 type: string
 *                 description: The URL of the extra-large-sized media.
 *         neighborhood:
 *           type: string
 *           description: The neighborhood of the property.
 *         addressLine1:
 *           type: string
 *           description: The address line 1 of the property.
 *         addressLine2:
 *           type: string
 *           description: The address line 2 of the property.
 *         state:
 *           type: string
 *           description: The state of the property.
 *         city:
 *           type: string
 *           description: The city of the property.
 *         country:
 *           type: string
 *           description: The country of the property.
 *         zipCode:
 *           type: string
 *           description: The zip code of the property.
 *         longitude:
 *           type: string
 *           description: The longitude of the property.
 *         latitude:
 *           type: string
 *           description: The latitude of the property.
 *         area:
 *           type: string
 *           description: The area of the property.
 *         areaUnit:
 *           type: string
 *           description: The unit of area measurement of the property.
 *         leasePeriod:
 *           type: string
 *           description: The lease period of the property.
 *         salePrice:
 *           type: string
 *           description: The sale price of the property.
 *         reducedPrice:
 *           type: string
 *           description: The reduced price of the property.
 *         currency:
 *           type: string
 *           description: The currency used for price.
 *         visitHours:
 *           type: string
 *           description: The visit hours of the property.
 *         bedroomCount:
 *           type: string
 *           description: The number of bedrooms in the property.
 *         bathCount:
 *           type: string
 *           description: The number of bathrooms in the property.
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: The tags associated with the property.
 *         reference:
 *           type: string
 *           description: The reference code of the property.
 *         mlsId:
 *           type: string
 *           description: The reference id of the MLS System.
 *         compensation:
 *           type: string
 *           description: If an y compensation.
 *         agentId:
 *           type: string
 *           description: The ID of the agent associated with the property.
 *         filters:
 *           type: array
 *           items:
 *             type: string
 *           description: The IDs of filters associated with the property.
 *         features:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the feature
 *               description:
 *                 type: string
 *                 description: Description of the feature
 *         geo:
 *           type: object
 *           properties:
 *             east:
 *               type: string
 *               description: Eastern coordinate
 *             west:
 *               type: string
 *               description: Western coordinate
 *             north:
 *               type: string
 *               description: Northern coordinate
 *             south:
 *               type: string
 *               description: Southern coordinate
 *
 * /v1/property:
 *   post:
 *     summary: Create a new property
 *     description: Create a new property listing.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Property
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       '201':
 *         description: Property created successfully
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 *
 *   get:
 *     summary: Get loggedin Property profile
 *     description: Retrieve the profile information of the authenticated Property.
 *     parameters:
 *       - in: query
 *         name: key
 *         schema:
 *           type: string
 *         description: Optional. The key to search for properties.
 *       - in: query
 *         name: limit
 *         description: The number of properties to return per page.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         description: The page number of results to return.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: agentId
 *         schema:
 *           type: string
 *         description: Optional. The agentId to search for properties.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: |
 *              - Optional. The status to search for properties. "for_sale", "sold", "incoming", "for_rent".
 *              - Use following in case of mlsOnly is set to "true".
 *              - Request listings by a specific status. This parameter defaults to active and you can specify multiple statuses in a single query.
 *              - Listing statuses depend on your RETS vendor's field availability. Below is a brief description of each status with possible synonyms which may map to your RETS vendor-specific statuses.
 *              - Active: Active Listing which is still on the market
 *              - ActiveUnderContract: An offer has been accepted but the listing is still on market. Synonyms: Accepting Backup Offers, Backup Offer, Active With Accepted. Synonyms: Offer, Backup, Contingent
 *              - Pending: An offer has been accepted and the listing is no longer on market. Synonyms: Offer Accepted, Under Contract
 *              - ComingSoon: This is a listing that has not yet been on market but will be on market soon.
 *              - Closed: The purchase agreement has been fulfilled or the lease agreement has been executed. Synonyms: Sold, Leased, Rented, Closed Sale
 *       - in: query
 *         name: filterId
 *         schema:
 *           type: string
 *         description: Optional. The filterId to search for properties.
 *       - in: query
 *         name: minBedCount
 *         schema:
 *           type: string
 *         description: Optional. The minBedCount to search for properties.
 *       - in: query
 *         name: maxBedCount
 *         schema:
 *           type: string
 *         description: Optional. The maxBedCount to search for properties.
 *       - in: query
 *         name: minBathCount
 *         schema:
 *           type: string
 *         description: Optional. The minBathCount to search for properties.
 *       - in: query
 *         name: maxBathCount
 *         schema:
 *           type: string
 *         description: Optional. The maxBathCount to search for properties.
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: string
 *         description: Optional. The minPrice to search for properties.
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: string
 *         description: Optional. The maxPrice to search for properties.
 *       - in: query
 *         name: minArea
 *         schema:
 *           type: string
 *         description: Optional. The minArea to search for properties.
 *       - in: query
 *         name: maxArea
 *         schema:
 *           type: string
 *         description: Optional. The maxArea to search for properties.
 *       - in: query
 *         name: maxprice
 *         schema:
 *           type: integer
 *         description: Filter listings by a maximum price.
 *       - in: query
 *         name: minarea
 *         schema:
 *           type: integer
 *         description: Filter listings by a minimum area size in Sq Ft.
 *       - in: query
 *         name: maxarea
 *         schema:
 *           type: integer
 *         description: Filter listings by a maximum area size in Sq Ft.
 *       - in: query
 *         name: minbaths
 *         schema:
 *           type: integer
 *         description: Filter listings by a minimum number of bathrooms.
 *       - in: query
 *         name: maxbaths
 *         schema:
 *           type: integer
 *         description: Filter listings by a maximum number of bathrooms.
 *       - in: query
 *         name: minbeds
 *         schema:
 *           type: integer
 *         description: Filter listings by a minimum number of bedrooms.
 *       - in: query
 *         name: maxbeds
 *         schema:
 *           type: integer
 *         description: Filter listings by a maximum number of bedrooms.
 *       - in: query
 *         name: type
 *         schema:
 *           type: array
 *         description: Filter listings by a type residential, rental, mobilehome, condominium, multifamily, commercial, land, farm.
 *       - in: query
 *         name: counties
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of counties codes to filter 
 *       - in: query
 *         name: state
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of states codes to filter 
 *       - in: query
 *         name: cities
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of cities codes to filter 
 *       - in: query
 *         name: mlsOnly
 *         schema:
 *           type: boolean
 *         description: Optional. Get properties only from MLS.
 *     tags:
 *       - Property
 *     responses:
 *       '200':
 *         description: Successfully registered.
 *       '400':
 *         description: Bad request.
 *       '500':
 *         description: Internal server error.
 *
 * /v1/property/idx:
 *   get:
 *     summary: Get loggedin Property profile
 *     description: Retrieve the profile information of the authenticated Property.
 *     parameters:
 *       - in: query
 *         name: key
 *         schema:
 *           type: string
 *         description: Optional. The key to search for properties.
 *       - in: query
 *         name: idx
 *         schema:
 *           type: string
 *         enum:
 *               - null
 *               - listing
 *               - address
 *               - ignore
 *         description: 
 *           -Specify the IDX display requirements for the listings in the response. The idx parameter checks if the internetAddressDisplay and internetEntireListingDisplay for each listing are true (or null) or false based on this setting.
 *            -idx=null (default), listing, address, ignore
 *       - in: query
 *         name: limit
 *         description: The number of properties to return per page.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         description: The page number of results to return.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: |
 *              - Optional. The status to search for properties. "for_sale", "sold", "incoming", "for_rent".
 *              - Use following in case of mlsOnly is set to "true".
 *              - Request listings by a specific status. This parameter defaults to active and you can specify multiple statuses in a single query.
 *              - Listing statuses depend on your RETS vendor's field availability. Below is a brief description of each status with possible synonyms which may map to your RETS vendor-specific statuses.
 *              - Active: Active Listing which is still on the market
 *              - ActiveUnderContract: An offer has been accepted but the listing is still on market. Synonyms: Accepting Backup Offers, Backup Offer, Active With Accepted. Synonyms: Offer, Backup, Contingent
 *              - Pending: An offer has been accepted and the listing is no longer on market. Synonyms: Offer Accepted, Under Contract
 *              - ComingSoon: This is a listing that has not yet been on market but will be on market soon.
 *              - Closed: The purchase agreement has been fulfilled or the lease agreement has been executed. Synonyms: Sold, Leased, Rented, Closed Sale
 *       - in: query
 *         name: minBedCount
 *         schema:
 *           type: string
 *         description: Optional. The minBedCount to search for properties.
 *       - in: query
 *         name: maxBedCount
 *         schema:
 *           type: string
 *         description: Optional. The maxBedCount to search for properties.
 *       - in: query
 *         name: minBathCount
 *         schema:
 *           type: string
 *         description: Optional. The minBathCount to search for properties.
 *       - in: query
 *         name: maxBathCount
 *         schema:
 *           type: string
 *         description: Optional. The maxBathCount to search for properties.
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: string
 *         description: Optional. The minPrice to search for properties.
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: string
 *         description: Optional. The maxPrice to search for properties.
 *       - in: query
 *         name: minArea
 *         schema:
 *           type: string
 *         description: Optional. The minArea to search for properties.
 *       - in: query
 *         name: maxArea
 *         schema:
 *           type: string
 *         description: Optional. The maxArea to search for properties.
 *       - in: query
 *         name: maxprice
 *         schema:
 *           type: integer
 *         description: Filter listings by a maximum price.
 *       - in: query
 *         name: minarea
 *         schema:
 *           type: integer
 *         description: Filter listings by a minimum area size in Sq Ft.
 *       - in: query
 *         name: maxarea
 *         schema:
 *           type: integer
 *         description: Filter listings by a maximum area size in Sq Ft.
 *       - in: query
 *         name: minbaths
 *         schema:
 *           type: integer
 *         description: Filter listings by a minimum number of bathrooms.
 *       - in: query
 *         name: maxbaths
 *         schema:
 *           type: integer
 *         description: Filter listings by a maximum number of bathrooms.
 *       - in: query
 *         name: minbeds
 *         schema:
 *           type: integer
 *         description: Filter listings by a minimum number of bedrooms.
 *       - in: query
 *         name: maxbeds
 *         schema:
 *           type: integer
 *         description: Filter listings by a maximum number of bedrooms.
 *       - in: query
 *         name: type
 *         schema:
 *           type: array
 *         description: Filter listings by a type residential, rental, mobilehome, condominium, multifamily, commercial, land, farm.
 *       - in: query
 *         name: counties
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of counties codes to filter 
 *       - in: query
 *         name: state
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of states codes to filter 
 *       - in: query
 *         name: cities
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of cities codes to filter 
 *     tags:
 *       - Property
 *     responses:
 *       '200':
 *         description: Successfully registered.
 *       '400':
 *         description: Bad request.
 *       '500':
 *         description: Internal server error.
 
 * /v1/property/{id}:
 *   get:
 *     summary: Get property by ID
 *     description: Retrieve an property by its ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Property
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the agent to retrieve
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: mlsOnly
 *         schema:
 *           type: boolean
 *         description: Optional. Get properties only from MLS.
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       '404':
 *         description: Property not found
 *       '500':
 *         description: Internal server error
 *
 *   patch:
 *     summary: Update a property
 *     description: Update a property.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Property
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
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       '201':
 *         description: Property created successfully
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete property by ID
 *     description: Delete an property by its ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Property
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the property to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Property deleted successfully
 *       '404':
 *         description: Property not found
 *       '500':
 *         description: Internal server error
 *
 *
 *
 */
