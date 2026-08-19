CREATE TABLE IF NOT EXISTS "categories" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "icon" TEXT NOT NULL DEFAULT 'Tag',
  "color" TEXT NOT NULL DEFAULT '#4f46e5',
  "status" TEXT NOT NULL DEFAULT 'Active',
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "categories_name_key" ON "categories"("name");
