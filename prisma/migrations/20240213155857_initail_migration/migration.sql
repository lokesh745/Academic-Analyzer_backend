-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rollNo` VARCHAR(191) NOT NULL DEFAULT 'ADMIN_ACC',
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phoneNo` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` LONGTEXT NOT NULL,
    `department_name` VARCHAR(191) NOT NULL,
    `joining_year` INTEGER NOT NULL DEFAULT 0,
    `passout_year` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `User_rollNo_key`(`rollNo`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Department_id_key`(`id`),
    UNIQUE INDEX `Department_name_key`(`name`),
    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` VARCHAR(191) NOT NULL,
    `course_name` VARCHAR(191) NOT NULL,
    `credits` INTEGER NOT NULL,
    `sem` INTEGER NOT NULL,
    `department_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enrollment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `course_id` VARCHAR(191) NOT NULL,
    `prof` INTEGER NOT NULL,
    `sem` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Assign` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `course_id` VARCHAR(191) NOT NULL,
    `sem` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,

    UNIQUE INDEX `Assign_id_key`(`id`),
    PRIMARY KEY (`course_id`, `year`, `sem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Result` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sem` INTEGER NOT NULL,
    `courseID` VARCHAR(191) NOT NULL,
    `departmentId` VARCHAR(191) NOT NULL,
    `rollNo` VARCHAR(191) NOT NULL,
    `mse` INTEGER NOT NULL,
    `ese` INTEGER NOT NULL,
    `isa` INTEGER NOT NULL,
    `creditEarned` INTEGER NOT NULL,
    `gradePoint` INTEGER NOT NULL,
    `gradeObtained` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_department_name_fkey` FOREIGN KEY (`department_name`) REFERENCES `Department`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_department_name_fkey` FOREIGN KEY (`department_name`) REFERENCES `Department`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assign` ADD CONSTRAINT `Assign_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assign` ADD CONSTRAINT `Assign_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_courseID_fkey` FOREIGN KEY (`courseID`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;
