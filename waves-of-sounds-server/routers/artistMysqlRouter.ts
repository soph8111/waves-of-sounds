import { Router, RequestHandler } from "express";
import { Artist } from "../entities/Artist";
import { AppDataSource } from "../startup/data-source";
import { Genre } from "../entities/Genre";
import { Schedule } from "../entities/Schedule";
import { In } from "typeorm"; // TypeORM’s SQL "WHERE IN" search

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

const updateArtist: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const {
    name,
    bio,
    spotify,
    image,
    stageId,
    scheduleId,
    genreIds, // forventes number[] eller undefined
  } = req.body;

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();

    const artistRepo = queryRunner.manager.getRepository(Artist);
    const genreRepo = queryRunner.manager.getRepository(Genre);

    // Hent artist inkl. genres og schedule relation
    const artist = await artistRepo.findOne({
      where: { id },
      relations: ["genres", "schedule", "stage"],
    });

    if (!artist) {
      await queryRunner.rollbackTransaction();
      res.status(404).json({ error: "Artist not found" });
      return;
    }

    // Valider (valgfrit): hvis scheduleId medsendes og du ønsker at sikre unik schedule:
    if (typeof scheduleId === "number") {
      const other = await artistRepo.findOne({
        where: { scheduleId: scheduleId } as any,
      });
      if (other && other.id !== id) {
        await queryRunner.rollbackTransaction();
        res.status(409).json({ error: "Schedule already assigned to another artist" });
        return;
      }
    }

    // Opdater simple felter (kun hvis medsendt)
    if (typeof name === "string") artist.name = name;
    if (typeof bio === "string") artist.bio = bio;
    if (typeof spotify === "string") artist.spotify = spotify;
    if (typeof image === "string") artist.image = image;

    // Opdater stageId kolonne og relation (sikrer konsistens)
    if (typeof stageId === "number") {
      (artist as any).stageId = stageId;
      // sæt relation også (TypeORM forstår partial object med id)
      (artist as any).stage = { id: stageId } as any;
    }

    // Opdater scheduleId kolonne og relation
    if (typeof scheduleId === "number") {
      (artist as any).scheduleId = scheduleId;
      (artist as any).schedule = { id: scheduleId } as any;
    }

    // Hvis genreIds er givet, hent genre-objekter og sæt relationen
    if (Array.isArray(genreIds)) {
      const genres = await genreRepo.findBy({ id: In(genreIds) } as any);
      (artist as any).genres = genres;
    }

    // Gem ændringer
    const saved = await artistRepo.save(artist);

    await queryRunner.commitTransaction();
    res.json(saved);
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.error("Failed to update artist:", err);
    res.status(500).json({ error: "Kunne ikke opdatere artist" });
  } finally {
    await queryRunner.release();
  }
};

artistRouter.put("/:id", updateArtist);


export default artistRouter;

