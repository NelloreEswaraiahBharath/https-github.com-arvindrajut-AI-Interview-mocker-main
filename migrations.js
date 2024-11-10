import { drizzle } from "drizzle-orm";
import { generateMigrations } from "drizzle-orm/cli";

// Run the migration generator
async function run() {
    await generateMigrations({
        out: "./migrations",
    });
}

run().catch((error) => {
    console.error("Error generating migrations:", error);
    process.exit(1);
});
