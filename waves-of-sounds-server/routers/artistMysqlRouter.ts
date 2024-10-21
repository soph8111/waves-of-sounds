import { Router } from "express";
import { Artist } from "../entities/Artist";
import { AppDataSource } from "../startup/data-source";
interface Response {
count: number;
results: Artist[];
}
const artistRouter = Router();
const artistRepository = AppDataSource.getRepository(Artist);

// Get all artists
artistRouter.get("/", async (req, res) => {
const artists = await artistRepository.find();
const response: Response = {
count: artists.length,
results: artists,
};
res.send(response);
});

export default artistRouter;
