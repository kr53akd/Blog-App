/*
  Warnings:

  - You are about to drop the column `userType` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `userType`,
    ADD COLUMN `userTypeId` INTEGER NOT NULL DEFAULT 2;

-- CreateTable
CREATE TABLE `usertypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userTypeName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserType_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `User_userTypeId_fkey` ON `user`(`userTypeId`);

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `User_userTypeId_fkey` FOREIGN KEY (`userTypeId`) REFERENCES `usertypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `user_email_key` TO `User_email_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `user_id_key` TO `User_id_key`;
