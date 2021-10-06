-- DropIndex
DROP INDEX "Category_name_key";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "name" DROP NOT NULL;
