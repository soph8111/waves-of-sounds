import { Router, Request, Response } from "express";
import { AppDataSource } from "../startup/data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
// JWT import for security
import jwt from "jsonwebtoken"


const userRouter = Router();
const userRepository = AppDataSource.getRepository(User);

/**
 * @openapi
 * /user/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user using email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "mypassword123"
 *     responses:
 *       '200':
 *         description: Login successful
 *       '400':
 *         description: Missing email or password
 *       '401':
 *         description: Invalid email or password
 *       '500':
 *         description: Server error
 */

// SECURE LOGIN — POST /user/login
userRouter.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Missing email or password." });
      return;
    }

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    const passwordCorrect = await bcrypt.compare(password, user.password_hash);
    if (!passwordCorrect) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    // BEFORE JWT
    // res.json({
    //   id: user.id,
    //   email: user.email,
    //   isAdmin: !!user.is_admin,
    // });
    
    // AFTER JWT
    const token = jwt.sign(
      { 
        // Payload -> what the backend say is true
        userId: user.id,
        isAdmin: !!user.is_admin,
      },
      // Secret -> Only the backend knows this (frontend can't manipulate this)
      process.env.JWT_SECRET as string,
      {
        // Option -> the token expires after 2h
        expiresIn: "2h",
      }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        isAdmin: !!user.is_admin,
      },
    });

    // jwt end

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /user 
userRouter.get("/", async (req, res) => {
  const users = await userRepository.find();
  res.send({ count: users.length, results: users });
});

export default userRouter;
