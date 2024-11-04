import { Router } from "express";
import { Artist } from "../entities/Artist";
import { AppDataSource } from "../startup/data-source";
import { Genre } from "../entities/Genre";
import { Schedule } from "../entities/Schedule";

interface ModifiedArtist {
  id: number;
  name: string;
  bio: string;
  spotify: string;
  image: string;
  genres: Genre[];
  stage: number;
  schedule: Schedule;
}

interface Response {
  count: number;
  results: ModifiedArtist[];
}

const artistRouter = Router();
const artistRepository = AppDataSource.getRepository(Artist);

artistRouter.get("/", async (req, res) => {
  const genreId = req.query.genres ? Number(req.query.genres) : undefined;
  const stageId = req.query.stage ? Number(req.query.stage) : undefined;
  const scheduleId = req.query.schedule ? Number(req.query.schedule) : undefined;


  const queryBuilder = artistRepository
    .createQueryBuilder("artist")
    .leftJoinAndSelect("artist.genres", "genre")
    .innerJoinAndSelect("artist.schedule", "schedule");

  if (genreId) {
    queryBuilder.andWhere(
      "artist.id IN (SELECT artist_id FROM artist_has_genre WHERE genre_id = :genreId)",
      { genreId }
    );
  }

  if (stageId) {
    queryBuilder.andWhere("artist.stageId = :stageId", { stageId });
  }

  if (scheduleId) {
    queryBuilder.andWhere("artist.scheduleId = :scheduleId", { scheduleId });
  }

  const artists = await queryBuilder.getMany();

  const modifiedArtists: ModifiedArtist[] = artists.map((artist) => ({
    id: artist.id ?? 0,  // Default to 0 if undefined
    name: artist.name ?? "",  // Default to an empty string if undefined
    bio: artist.bio ?? "",
    spotify: artist.spotify ?? "",
    image: artist.image ?? "",
    genres: artist.genres || [],  // Default to empty array if no genres
    stage: artist.stageId ?? 0,
    schedule: artist.schedule ?? {},
  }));

  const response: Response = {
    count: modifiedArtists.length,
    results: modifiedArtists,
  };

  res.send(response);
});

export default artistRouter;
