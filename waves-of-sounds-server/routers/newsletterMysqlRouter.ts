import { Router } from "express";
import { AppDataSource } from "../startup/data-source";
import { Newsletter } from "../entities/Newsletter";

interface Response {
    count: number;
    results: Newsletter[];
  }

const newsletterRouter = Router();
const newsletterRepository = AppDataSource.getRepository(Newsletter);

/**
 * @openapi
 * /newsletter:
 *   post:
 *     summary: Subscribe to newsletter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsletterInput'
 *           example:
 *             name: "Sophie"
 *             email: "sophie@example.com"
 *     responses:
 *       '201':
 *         description: Subscribed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Newsletter'
 *       '400':
 *         description: Validation error (missing email)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Server error
 */

// POST route to add a new newsletter subscription
newsletterRouter.post("/", async (req, res) => {
// name and email from req.body. When the user submits the form
  const { name, email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }

  // Create a new Newsletter with the data, without saving it to the database yet 
  const newSubscription = newsletterRepository.create({
    name,
    email,
    createdAt: new Date(),
  });

  // Save the data to the database if there are no errors
  try {
    const savedSubscription = await newsletterRepository.save(newSubscription);
    res.status(201).json(savedSubscription);
  } catch (error) {
    res.status(500).json({ message: "Failed to save subscription", error });
  }
});

/**
 * @openapi
 *   get:
 *     summary: Get all newsletter subscriptions
 *     responses:
 *       '200':
 *         description: List of subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Newsletter'
 */

// Get all newsletters
newsletterRouter.get("/", async (req, res) => {
    const newsletters = await newsletterRepository.find();
    const response: Response = {
      count: newsletters.length,
      results: newsletters,
    };
    res.send(response);
  });

export default newsletterRouter;
