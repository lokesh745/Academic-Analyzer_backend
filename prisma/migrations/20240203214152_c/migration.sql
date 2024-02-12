/*
  Warnings:

  - The primary key for the `assign` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `enrollment` DROP FOREIGN KEY `Enrollment_prof_fkey`;

-- AlterTable
ALTER TABLE `assign` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`id`, `year`, `sem`);
