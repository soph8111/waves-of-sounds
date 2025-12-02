import { Router, RequestHandler } from "express";
import { Artist } from "../entities/Artist";
import { AppDataSource } from "../startup/data-source";
import { Genre } from "../entities/Genre";
import { Schedule } from "../entities/Schedule";
import { In } from "typeorm"; // TypeORM’s SQL "WHERE IN" search
import { Stage } from "../entities/Stage";

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

/**
 * @openapi
 * /artists:
 *   get:
 *     summary: Get artists (filterable)
 *     description: Retrieve a list of artists. Supports filtering by genres (comma-separated ids), stage and schedule.
 *     parameters:
 *       - in: query
 *         name: genres
 *         schema:
 *           type: string
 *         description: Comma-separated genre ids, e.g. "1,2"
 *       - in: query
 *         name: stage
 *         schema:
 *           type: integer
 *         description: Stage id
 *       - in: query
 *         name: schedule
 *         schema:
 *           type: integer
 *         description: Schedule id
 *     responses:
 *       '200':
 *         description: List of artists
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
 *                     $ref: '#/components/schemas/Artist'
 */

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

/**
 * @openapi
 * /artists:
 *   post:
 *     summary: Create a new artist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArtistInput'
 *           example:
 *             name: "New Band"
 *             bio: "Short bio"
 *             spotify: "https://open.spotify.com/..."
 *             image: "/img/artists/example.jpg"
 *             stageId: 2
 *             scheduleId: 7
 *             genreIds: [1,2]
 *     responses:
 *       '201':
 *         description: Artist created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       '400':
 *         description: Validation error (missing required fields)
 *       '500':
 *         description: Server error
 */

const createArtist: RequestHandler = async (req, res) => {
  try {
    console.log("POST /artists payload:", req.body);

    const name = req.body.name;
    const bio = req.body.bio ?? null;
    const spotify = req.body.spotify ?? null;
    const image = req.body.image ?? null;
    const stageId = Number(req.body.stageId ?? req.body.stage);
    const scheduleId = Number(req.body.scheduleId ?? req.body.schedule);
    const genreIds = Array.isArray(req.body.genreIds) ? req.body.genreIds.map(Number) : [];

    if (!name || !Number.isInteger(stageId) || !Number.isInteger(scheduleId)) {
      return res.status(400).json({ message: "name, stageId and scheduleId are required (integers)" });
    }

    const artistRepo = AppDataSource.getRepository(Artist);
    const genreRepo = AppDataSource.getRepository(Genre);
    const scheduleRepo = AppDataSource.getRepository(Schedule);
    const stageRepo = AppDataSource.getRepository(Stage);

    // Valider relationer
    const schedule = await scheduleRepo.findOneBy({ id: scheduleId });
    if (!schedule) return res.status(400).json({ message: "Invalid scheduleId" });

    const stage = await stageRepo.findOneBy({ id: stageId });
    if (!stage) return res.status(400).json({ message: "Invalid stageId" });

    // Optional: check schedule unique
    const occupied = await artistRepo.findOne({ where: { scheduleId } as any });
    if (occupied) return res.status(409).json({ error: "Schedule already assigned" });

    // 1) Create artist WITHOUT genres first
    const partial = artistRepo.create({
      name,
      bio,
      spotify,
      image,
      stageId,
      scheduleId,
      stage,
      schedule,
      // do NOT include genres here
    } as Partial<Artist>);

    const savedArtist = await artistRepo.save(partial);

    // 2) If there are genres, hent dem og tilknyt—gem igen
    if (Array.isArray(genreIds) && genreIds.length > 0) {
      const numeric = genreIds.filter((n) => Number.isInteger(n));
      const genres = numeric.length > 0 ? await genreRepo.find({ where: { id: In(numeric) } as any }) : [];
      if (genres.length > 0) {
        (savedArtist as any).genres = genres;
        await artistRepo.save(savedArtist); // anden save: nu kender DB artist.id
      }
    }

    return res.status(201).json(savedArtist);
  } catch (err: any) {
    console.error("Failed to create artist - message:", err?.message);
    console.error("Failed to create artist - stack:", err?.stack);
    return res.status(500).json({ message: "Internal server error" });
  }
};

artistRouter.post("/", createArtist);

/**
 * @openapi
 * /artists/{id}:
 *   delete:
 *     summary: Delete an artist
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: No content (artist deleted)
 *       '400':
 *         description: Invalid id
 *       '500':
 *         description: Server error
 */

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

/**
 * @openapi
 * /artists/{id}:
 *   put:
 *     summary: Update an artist
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
 *             $ref: '#/components/schemas/ArtistInput'
 *     responses:
 *       '200':
 *         description: Updated artist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: Artist not found
 *       '409':
 *         description: Schedule conflict
 *       '500':
 *         description: Server error
 */

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
    res.status(500).json({ error: "Failed to update artist" });
  } finally {
    await queryRunner.release();
  }
};

artistRouter.put("/:id", updateArtist);


export default artistRouter;

