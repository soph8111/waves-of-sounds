import { Router } from "express";
import { AppDataSource } from "../startup/data-source";
import { Volunteer } from "../entities/Volunteer";

interface Response {
  count: number;
  results: Volunteer[];
}

const volunteerRouter = Router();
const volunteerRepository = AppDataSource.getRepository(Volunteer);

/**
 * @openapi
 * /volunteers/{id}/departments:
 *   post:
 *     summary: Attach volunteer to a department
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               departmentId:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Attached
 *       '400':
 *         description: Invalid input
 */

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

/**
 * @openapi
 * /volunteers:
 *   get:
 *     summary: Get all volunteers
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Volunteer'
 *   post:
 *     summary: Create a volunteer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VolunteerInput'
 *     responses:
 *       '201':
 *         description: Created
 */

/**
 * @openapi
 * /volunteers/{id}:
 *   get:
 *     summary: Get volunteer by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Volunteer object
 *       '404':
 *         description: Not found
 */

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
