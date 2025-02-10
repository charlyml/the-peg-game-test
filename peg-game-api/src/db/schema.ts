import { boolean, int, mysqlTable, timestamp } from "drizzle-orm/mysql-core";

export const games = mysqlTable("games", {
  id: int("id").autoincrement().primaryKey(),
  emptyHole: int("emptyHole").notNull(),
  win: boolean("win").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
