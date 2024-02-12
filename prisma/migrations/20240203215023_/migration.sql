/*
  Warnings:

  - The primary key for the `assign` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Assign` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Enrollment_prof_fkey` ON `enrollment`;

-- AlterTable
ALTER TABLE `assign` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`course_id`, `year`, `sem`);

-- CreateIndex
CREATE UNIQUE INDEX `Assign_id_key` ON `Assign`(`id`);
