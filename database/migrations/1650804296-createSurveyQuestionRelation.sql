CREATE TABLE IF NOT EXISTS "questions_surveys" (
	"id" SERIAL PRIMARY KEY,
  "survey_id" INTEGER NOT NULL,
  "question_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("survey_id") REFERENCES "surveys" ("id"),
  FOREIGN KEY ("question_id") REFERENCES "questions" ("id"),
  UNIQUE ("survey_id", "question_id")
);
