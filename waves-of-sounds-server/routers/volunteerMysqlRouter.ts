import { Router } from "express";
import { AppDataSource } from "../startup/data-source";
import { Volunteer } from "../entities/Volunteer";

interface Response {
  count: number;
  results: Volunteer[];
}

const volunteerRouter = Router();
const volunteerRepository = AppDataSource.getRepository(Volunteer);

// POST route to add a new volunteer
volunteerRouter.post("/", async (req, res) => {
  const { name, email, departmentId } = req.body;

  // if (!name || !email || !departmentId) {
  //   return res.status(400).json({ message: "Name, email, and department are required" });
  // }

  try {
    // Create a new Volunteer instance
    const newVolunteer = volunteerRepository.create({
      name,
      email,
      createdAt: new Date(),
      departments: [{ id: departmentId }], // Assuming Many-to-Many relation
    });

    // Save the volunteer to the database
    const savedVolunteer = await volunteerRepository.save(newVolunteer);
    res.status(201).json(savedVolunteer);
  } catch (error) {
    res.status(500).json({ message: "Failed to save volunteer", error });
  }
});

// GET route to retrieve all volunteers
volunteerRouter.get("/", async (req, res) => {
  try {
    const volunteers = await volunteerRepository.find({
      relations: ["departments"], // Include related departments
    });

    const response: Response = {
      count: volunteers.length,
      results: volunteers,
    };

    res.send(response);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch volunteers", error });
  }
});

export default volunteerRouter;
