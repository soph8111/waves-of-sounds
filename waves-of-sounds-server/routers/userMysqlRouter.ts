// src/routers/userRouter.ts
import { Router, Request, Response } from "express";
import { AppDataSource } from "../startup/data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";

const userRouter = Router();
const userRepository = AppDataSource.getRepository(User);

// SECURE LOGIN — POST /user/login
userRouter.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email og password påkrævet." });
      return;
    }

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ error: "Forkert email eller password." });
      return;
    }

    const passwordCorrect = await bcrypt.compare(password, user.password_hash);
    if (!passwordCorrect) {
      res.status(401).json({ error: "Forkert email eller password." });
      return;
    }

    res.json({
      id: user.id,
      email: user.email,
      isAdmin: !!user.is_admin,
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /user (må gerne blive hvis du bruger den)
userRouter.get("/", async (req, res) => {
  const users = await userRepository.find();
  res.send({ count: users.length, results: users });
});

export default userRouter;
