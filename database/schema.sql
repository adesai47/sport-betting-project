set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "Users" (
  "userId" serial PRIMARY KEY,
  "username" text UNIQUE NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT (now()),
  "updatedAt" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "Bets" (
  "betId" serial PRIMARY KEY,
  "userId" int NOT NULL,
  "gameId" int NOT NULL,
  "amount" int NOT NULL,
  "odds" int NOT NULL,
  "potentialWinnings" int NOT NULL,
  "status" text NOT NULL DEFAULT 'pending',
  "createdAt" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "Games" (
  "gameId" serial PRIMARY KEY,
  "homeTeamId" int NOT NULL,
  "awayTeamId" int NOT NULL,
  "startTime" timestamptz NOT NULL,
  "homeScore" int,
  "awayScore" int,
  "status" text NOT NULL DEFAULT 'scheduled'
);

CREATE TABLE "Teams" (
  "teamId" serial PRIMARY KEY,
  "name" text NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT (now())
);

ALTER TABLE "Bets" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("userId");

ALTER TABLE "Bets" ADD FOREIGN KEY ("gameId") REFERENCES "Games" ("gameId");

ALTER TABLE "Games" ADD FOREIGN KEY ("homeTeamId") REFERENCES "Teams" ("teamId");

ALTER TABLE "Games" ADD FOREIGN KEY ("awayTeamId") REFERENCES "Teams" ("teamId");
