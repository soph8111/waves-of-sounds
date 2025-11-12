// import { Router } from "express";
// import { Artist } from "../entities/Artist";
// import { AppDataSource } from "../startup/data-source";
// import { Genre } from "../entities/Genre";
// import { Schedule } from "../entities/Schedule";

// interface ModifiedArtist {
//   id: number;
//   name: string;
//   bio: string;
//   spotify: string;
//   image: string;
//   genres: Genre[];
//   stage: number;
//   schedule: Schedule;
// }

// interface Response {
//   count: number;
//   results: ModifiedArtist[];
// }

// const artistRouter = Router();
// const artistRepository = AppDataSource.getRepository(Artist);

// artistRouter.get("/", async (req, res) => {
//   const genreId = req.query.genres ? Number(req.query.genres) : undefined;
//   const stageId = req.query.stage ? Number(req.query.stage) : undefined;
//   const scheduleId = req.query.schedule ? Number(req.query.schedule) : undefined;


//   const queryBuilder = artistRepository
//     .createQueryBuilder("artist")
//     .leftJoinAndSelect("artist.genres", "genre")
//     .innerJoinAndSelect("artist.schedule", "schedule");

//   if (genreId) {
//     queryBuilder.andWhere(
//       "artist.id IN (SELECT artist_id FROM artist_has_genre WHERE genre_id = :genreId)",
//       { genreId }
//     );
//   }

//   if (stageId) {
//     queryBuilder.andWhere("artist.stageId = :stageId", { stageId });
//   }

//   if (scheduleId) {
//     queryBuilder.andWhere("artist.scheduleId = :scheduleId", { scheduleId });
//   }

//   const artists = await queryBuilder.getMany();

//   const modifiedArtists: ModifiedArtist[] = artists.map((artist) => ({
//     id: artist.id ?? 0,  // Default to 0 if undefined
//     name: artist.name ?? "",  // Default to an empty string if undefined
//     bio: artist.bio ?? "",
//     spotify: artist.spotify ?? "",
//     image: artist.image ?? "",
//     genres: artist.genres || [],  // Default to empty array if no genres
//     stage: artist.stageId ?? 0,
//     schedule: artist.schedule ?? {},
//   }));

//   const response: Response = {
//     count: modifiedArtists.length,
//     results: modifiedArtists,
//   };

//   res.send(response);
// });


// export default artistRouter;

import { Router, RequestHandler } from "express";
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

// Get all artists (GET)
const getArtists: RequestHandler = async (req, res) => {
  try {
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
      id: artist.id ?? 0,
      name: artist.name ?? "",
      bio: artist.bio ?? "",
      spotify: artist.spotify ?? "",
      image: artist.image ?? "",
      genres: artist.genres ?? [],
      stage: artist.stageId ?? 0,
      // Hvis schedule ikke findes, cast til Schedule for at matche interfacet
      schedule: (artist.schedule ?? ({} as Schedule)) as Schedule,
    }));

    const response: Response = {
      count: modifiedArtists.length,
      results: modifiedArtists,
    };

    res.json(response);
  } catch (err) {
    console.error("Error fetching artists:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

artistRouter.get("/", getArtists);

const createArtist: RequestHandler = async (req, res) => {
  try {
    const { name, bio, spotify, image, stageId, scheduleId, genreIds } = req.body;

    if (!name || !stageId || !scheduleId) {
      res.status(400).json({ message: "name, stageId and scheduleId are required" });
      return;
    }

    const artistRepo = AppDataSource.getRepository(Artist);
    const genreRepo = AppDataSource.getRepository(Genre);

    // Build the artist entity — brug partial for at undgå fuld entity-objektkrav
    const newArtist = artistRepo.create({
      name,
      bio,
      spotify,
      image,
      stageId,     // hvis din entity har stageId kolonne
      schedule: { id: scheduleId } as any, // alternativt: scheduleId felt afhængig af entity
    } as Partial<Artist>);

    // Hvis du har genreIds (array af tal), hent genre-objekter og tilknyt dem
    if (Array.isArray(genreIds) && genreIds.length > 0) {
      const genres = await genreRepo.findByIds(genreIds);
      (newArtist as any).genres = genres;
    }

    const saved = await artistRepo.save(newArtist);
    // returner 201 ligesom createArticle
    res.status(201).json(saved);
  } catch (err) {
    console.error("Failed to create artist:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

artistRouter.post("/", createArtist);

// Delete artist (DELETE)
const deleteArtist: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();

    // 1) Slet many-to-many relationer først (tilpas tablenavnet hvis nødvendigt)
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from("artist_has_genre")
      .where("artist_id = :id", { id })
      .execute();

    // 2) Slet selve artisten
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(Artist)
      .where("id = :id", { id })
      .execute();

    await queryRunner.commitTransaction();

    // send respons (DON'T return the res)
    res.json({ ok: true, id });
  } catch (e) {
    await queryRunner.rollbackTransaction();
    console.error(e);
    res.status(500).json({ error: "Kunne ikke slette artist" });
  } finally {
    await queryRunner.release();
  }
};

artistRouter.delete("/:id", deleteArtist);

export default artistRouter;

