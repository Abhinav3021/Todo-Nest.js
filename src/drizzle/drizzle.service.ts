import { Injectable } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';

const { Pool } = pg;

@Injectable()
export class DrizzleService {
  public db: NodePgDatabase<typeof schema>;

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    this.db = drizzle(pool);
  }
}
