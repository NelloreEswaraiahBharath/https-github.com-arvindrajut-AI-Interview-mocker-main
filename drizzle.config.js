/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:xXF4RGboDc7d@ep-winter-brook-a5292q1m.us-east-2.aws.neon.tech/neondb?sslmode=require',
    }
  };