// src/swagger.ts  (CommonJS-venlig, copy/paste)
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import type { Express } from "express";

const projectRoot = process.cwd(); // rodmappen hvor du kører npm run
const routesPattern =
  process.env.NODE_ENV === "production"
    ? path.join(projectRoot, "dist", "routers", "*.js")
    : path.join(projectRoot, "routers", "*.ts");

// indsæt dette i src/swagger.ts - erstat options.definition eller hele options-blokken
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Waves of Sounds API",
      version: "1.0.0",
      description: "API-dokumentation for Waves of Sounds (dev)",
    },
    servers: [
      { url: "https://waves-of-sounds-server.onrender.com", description: "Render Prod" },
      { url: "http://localhost:4001", description: "Local dev" }],
    components: {
      securitySchemes: {
        cookieAuth: { type: "apiKey", in: "cookie", name: "token" },
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
      },
      schemas: {
        // Artist
        Artist: {
          type: "object",
          properties: {
            id: { type: "integer", example: 5 },
            name: { type: "string", example: "Band Name" },
            bio: { type: "string", example: "Kort beskrivelse" },
            spotify: { type: "string", example: "https://open.spotify.com/..." },
            image: { type: "string", example: "/img/artists/example.jpg" },
            stage_id: { type: "integer", example: 2 },
            schedule_id: { type: "integer", example: 7 },
            genres: { type: "array", items: { type: "object", properties: { id: { type: "integer" }, name: { type: "string" } } } }
          }
        },
        ArtistInput: {
          type: "object",
          required: ["name", "stage_id", "schedule_id"],
          properties: {
            name: { type: "string" },
            bio: { type: "string" },
            spotify: { type: "string" },
            image: { type: "string" },
            stage_id: { type: "integer" },
            schedule_id: { type: "integer" },
            genreIds: { type: "array", items: { type: "integer" } }
          }
        },

        // Article
        Article: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            article: { type: "string" },
            image: { type: "string" },
            date: { type: "string", format: "date-time" }
          }
        },
        ArticleInput: {
          type: "object",
          required: ["title", "article"],
          properties: {
            title: { type: "string" },
            article: { type: "string" },
            image: { type: "string" },
            date: { type: "string", format: "date-time" }
          }
        },

        // Department
        Department: {
          type: "object",
          properties: {
            id: { type: "integer" },
            department: { type: "string" }
          }
        },

        // Genre
        Genre: {
          type: "object",
          properties: { id: { type: "integer" }, name: { type: "string" } }
        },

        // Schedule / Dates
        Schedule: {
          type: "object",
          properties: {
            id: { type: "integer" },
            startDate: { type: "string" },
            startTime: { type: "string" },
            endDate: { type: "string" },
            endTime: { type: "string" },
            name: { type: "string" }
          }
        },

        // Stage
        Stage: { type: "object", properties: { id: { type: "integer" }, name: { type: "string" } } },

        // User (login/registration)
        User: {
          type: "object",
          properties: {
            id: { type: "integer" },
            email: { type: "string" },
            is_admin: { type: "boolean" }
          }
        },
        UserRegister: {
          type: "object",
          required: ["email", "password"],
          properties: { email: { type: "string" }, password: { type: "string" } }
        },

        // Newsletter
        Newsletter: { type: "object", properties: { id: { type: "integer" }, email: { type: "string" }, name: { type: "string" }, created_at: { type: "string" } } },

        // Volunteer
        Volunteer: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            email: { type: "string" },
            created_at: { type: "string" },
            departments: { type: "array", items: { $ref: "#/components/schemas/Department" } }
          }
        },
        VolunteerInput: {
          type: "object",
          required: ["name", "email"],
          properties: { name: { type: "string" }, email: { type: "string" }, departmentIds: { type: "array", items: { type: "integer" } } }
        },

        // Generic error format
        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "object",
              properties: { code: { type: "string" }, message: { type: "string" }, details: { type: "object" } }
            }
          }
        }
      }
    }
  },
  apis: [routesPattern],
};


const swaggerSpec = swaggerJSDoc(options);

// eksportér en funktion der tager app (Express)
export function setupSwagger(app: Express | any) {
  // Cast begge swaggerUi funktioner til any for at undgå TypeScript-overload issues
  const serve: any = (swaggerUi as any).serve;
  const setup: any = (swaggerUi as any).setup;

  // mount som middleware
  app.use("/docs", serve, setup(swaggerSpec));
  app.get("/openapi.json", (_req: any, res: any) => res.json(swaggerSpec));
}
