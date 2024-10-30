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


// import { Router } from "express";
// import { AppDataSource } from "../startup/data-source";
// import { Genre } from "../entities/Genre";
// import { Artist } from "../entities/Artist";
// import { Stage } from "../entities/Stage";

// interface ModifinedArtist {
//   id: number;
//   name: string;
//   background_image: string | null;
//   metacritic: number | null;
//   stageId: { stage: Stage }[];
//   genres: Genre[];
// }

// interface Response {
//   count: number;
//   results: ModifinedArtist[];
// }

// const artistRouter = Router();
// const artistRepository = AppDataSource.getRepository(Artist);

// // Get all games
// artistRouter.get("/", async (req, res) => {
//   let genreId = req.query.genres ? Number(req.query.genres) : undefined;
//   let stageId = req.query.stage
//     ? Number(req.query.stage)
//     : undefined;

//   const queryBuilder = artistRepository
//     .createQueryBuilder("artist")
//     .leftJoinAndSelect("artist.genres", "genre")
//     .leftJoinAndSelect("artist.stage", "stage")

//   if (genreId) {
//     queryBuilder.andWhere(
//       "game.id IN (SELECT artist_id FROM artist_has_genre WHERE genre_id = :genreId)",
//       { genreId }
//     );
//   }

//   if (stageId) {
//     queryBuilder.andWhere(
//       "artist.id IN (SELECT artist_id FROM artist_has_stage WHERE stage_id = :stageId)",
//       { stageId }
//     );
//   }

//   const artists = await queryBuilder.getMany();

//   console.log(artists);


// //   const modifinedArtists = artists.map((artist) => ({
// //     ...artist,
// //     stageId: artist.stageId?.map((stage) => ({
// //       stage: stage,
// //     })),
// //   }));

// //   const response: Response = {
// //     count: artists.length,
// //     results: modifinedArtists,
// //   };
// //   res.send(response);
// });

// export default artistRouter
