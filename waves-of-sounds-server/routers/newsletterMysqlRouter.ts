import { Router } from "express";
import { AppDataSource } from "../startup/data-source";
import { Newsletter } from "../entities/Newsletter";

interface Response {
    count: number;
    results: Newsletter[];
  }

const newsletterRouter = Router();
const newsletterRepository = AppDataSource.getRepository(Newsletter);

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
