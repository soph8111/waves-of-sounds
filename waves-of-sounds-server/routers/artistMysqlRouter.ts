// import { Router } from "express";
// import { Artist } from "../entities/Artist";
// import { AppDataSource } from "../startup/data-source";
// interface Response {
// count: number;
// results: Artist[];
// }
// const artistRouter = Router();
// const artistRepository = AppDataSource.getRepository(Artist);

// // Get all artists
// artistRouter.get("/", async (req, res) => {
// const artists = await artistRepository.find();
// const response: Response = {
//     count: artists.length,
//     results: artists,
// };
// res.send(response);
// });

// export default artistRouter;


import { Router } from "express";
import { Artist } from "../entities/Artist";
import { AppDataSource } from "../startup/data-source";
import { Genre } from "../entities/Genre";
import { Stage } from "../entities/Stage";

interface ModifiedArtist {
  id: number;
  name: string;
  genres: Genre[];
  stage: number;
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

  const queryBuilder = artistRepository
    .createQueryBuilder("artist")
    .leftJoinAndSelect("artist.genres", "genre");

  if (genreId) {
    queryBuilder.andWhere(
      "artist.id IN (SELECT artist_id FROM artist_has_genre WHERE genre_id = :genreId)",
      { genreId }
    );
  }

  if (stageId) {
    queryBuilder.andWhere("artist.stageId = :stageId", { stageId });
  }

  const artists = await queryBuilder.getMany();

  const modifiedArtists: ModifiedArtist[] = artists.map((artist) => ({
    id: artist.id ?? 0,  // Default to 0 if undefined
    name: artist.name ?? "",  // Default to an empty string if undefined
    stage: artist.stageId ?? 0,
    genres: artist.genres || [],  // Default to empty array if no genres
  }));

  const response: Response = {
    count: modifiedArtists.length,
    results: modifiedArtists,
  };

  res.send(response);
});

export default artistRouter;
