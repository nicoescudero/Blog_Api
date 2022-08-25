const express = require('express');
const { verifyUser } = require('../middleware/auth');

const {
  get, post, put, destroy, all,
} = require('../controllers/posts');

const router = express.Router();

router.get('/all', all);
router.get('/:id', verifyUser, get);
router.post('/', verifyUser, post);
router.put('/:id', verifyUser, put);
router.delete('/:id', verifyUser, destroy);

module.exports = router;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      ApiKeyAuth:
 *        type: apiKey
 *        in: header
 *        name: authorization
 *   schemas:
 *      Posts:
 *        type: object
 *        properties:
 *          _id:
 *            type: number
 *            description: the auto-generated id of posts
 *          title:
 *            type: string
 *            description: post title
 *          image:
 *            type: string
 *            description: image of post
 *          body:
 *            type: string
 *            description: post body
 *          date:
 *            type: string
 *            description: date auto-generated
 *          required:
 *            - title
 *            - image
 *            - body
 *        example:
 *            id: 62ffb58fa39558560d1f5486
 *            title: My post
 *            image: https://images.com/post.png
 *            body: Something
 *      PostNotFound:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *            description: Message for not found post
 *          statusCode:
 *           type: number
 *           description: Http Status Code
 *        example:
 *          message: Post not found
 *          statusCode: 404
 *   parameters:
 *     postID:
 *       in: path
 *       name: id
 *       schema:
 *         type: number
 *       required: true
 *       description: post id number
 */

/**
 * @swagger
 * /posts/all:
 *   get:
 *     summary: Returns a Post list
 *     tags: [Posts]
 *     responses:
 *        200:
 *          description: Successful response - Posts retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                properties:
 *                  code:
 *                    type: number
 *                    format: number
 *                  status:
 *                    type: boolean
 *                    format: boolean
 *                  message:
 *                    type: string
 *                    format: string
 *                  body:
 *                    type: array
 *                    properties:
 *                      name:
 *                        type: string
 *                        format: string
 *                items:
 *                  $ref: '#/components/schemas/Posts'
 *        404:
 *          description: Error response - Posts not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PostNotFound'
 *        500:
 *          description: Error response - Internal server error
 */

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Return Post by ID
 *     tags: [Posts]
 *     security:
 *      - ApiKeyAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/postID'
 *     responses:
 *       200:
 *         description: Successful response - Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 code:
 *                   type: number
 *                   format: number
 *                 status:
 *                   type: boolean
 *                   format: boolean
 *                 message:
 *                   type: string
 *                   format: string
 *                 body:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       format: string
 *               items:
 *                 $ref: '#/components/schemas/Posts'
 *       404:
 *         description: Error response - Post not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostNotFound'
 *       500:
 *          description: Error response - Internal server error
*/

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create new Post
 *     tags: [Posts]
 *     security:
 *      - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                type: string
 *                description: title of post
 *                required: true
 *               image:
 *                type: string
 *                description: post image
 *                required: true
 *               body:
 *                type: string
 *                description: body of post
 *                required: true
 *     responses:
 *        200:
 *          description: Successful response - Post successfully created
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                properties:
 *                  code:
 *                    type: number
 *                    format: number
 *                  status:
 *                    type: boolean
 *                    format: boolean
 *                  message:
 *                    type: string
 *                    format: string
 *                  body:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                        format: string
 *                example:
 *                  id: 62ffb58fa39558560d1f5486
 *                  title: My post
 *                  image: https://images.com/post.png
 *                  body: # Hello World!
 *        401:
 *          description: Error response - Error creating Post
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Unauthorized'
 *        500:
 *          description: Error response - Internal server error
 */

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update Post by ID
 *     tags: [Posts]
 *     parameters:
 *       - $ref: '#/components/parameters/postID'
 *     security:
 *      - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: title of post
 *                 required: false
 *               image:
 *                 type: string
 *                 required: false
 *               body:
 *                 type: string
 *                 required: false
 *           example:
 *             title: insert
 *             image: insert
 *             body: insert
 *     responses:
 *       200:
 *         description: Successful response - Post successfully update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   format: number
 *                 status:
 *                   type: boolean
 *                   format: boolean
 *                 message:
 *                   type: string
 *                   format: string
 *                 body:
 *                   type: array
 *                   properties:
 *                     1
 *             example:
 *               code: 200
 *               status: true
 *               message: Post successfully updated
 *               body: [1]
 *       401:
 *          description: Error response - Error Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Unauthorized'
 *       404:
 *         description: Error response - Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostNotFound'
 *       500:
 *          description: Error response - Internal server error
*/

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete Post by ID
 *     tags: [Posts]
 *     security:
 *      - ApiKeyAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/postID'
 *     responses:
 *       200:
 *         description: Successful response - Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 code:
 *                   type: number
 *                   format: number
 *                 status:
 *                   type: boolean
 *                   format: boolean
 *                 message:
 *                   type: string
 *                   format: string
 *                 body:
 *                   type: array
 *                   properties:
 *                     1
 *               items:
 *                 $ref: '#/components/schemas/Posts'
 *             example:
 *               code: 200
 *               status: true
 *               message: Post deleted successfully
 *               body: 1
 *       401:
 *          description: Error response - Error Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Unauthorized'
 *       404:
 *         description: Error response - Post not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostNotFound'
 *       500:
 *          description: Error response - Internal server error
*/
