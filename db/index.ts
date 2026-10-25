import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const postgre = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle({ client: postgre , schema });
