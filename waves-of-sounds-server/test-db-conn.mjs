// test-db-conn.mjs
import mysql from "mysql2/promise";
import { URL } from "url";

(async () => {
  try {
    const urlString = process.env.MYSQL_URL;
    if (!urlString) throw new Error("Ingen MYSQL_URL i env");

    // Parse URL
    const u = new URL(urlString);

    // Build connection config (mysql2 kræver ssl som objekt)
    const config = {
      host: u.hostname,
      port: Number(u.port) || 3306,
      user: u.username,
      password: decodeURIComponent(u.password),
      database: u.pathname.replace(/^\//, ""),
      // SSL: i dev/test kan du bruge rejectUnauthorized: false hvis cert-problemer opstår.
      // I produktion bør du helst validere certifikater (rejectUnauthorized: true).
      ssl: {
        // Sæt til false kun hvis du får cert-fejl. Bedre: true i produktion.
        rejectUnauthorized: false,
      },
    };

    const conn = await mysql.createConnection(config);
    const [rows] = await conn.query("SHOW TABLES;");
    console.log("Tables:", rows);
    await conn.end();
  } catch (err) {
    console.error("DB error:", err);
    process.exit(1);
  }
})();
