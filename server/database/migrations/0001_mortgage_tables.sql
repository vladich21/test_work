-- Migration: add strict Users.id UUID + create mortgage tables with proper FKs

-- 1) Add internal UUID column to Users and make it a strict FK target
ALTER TABLE `Users`
  ADD COLUMN `id` char(36) NULL;

--> statement-breakpoint

UPDATE `Users`
SET `id` = UUID()
WHERE `id` IS NULL;

--> statement-breakpoint

ALTER TABLE `Users`
  MODIFY COLUMN `id` char(36) NOT NULL;

--> statement-breakpoint

ALTER TABLE `Users`
  ADD CONSTRAINT `Users_id_unique` UNIQUE (`id`);

--> statement-breakpoint

-- 1.1) Seed a deterministic user for local smoke testing (matches controller default X-User-Id)
INSERT INTO `Users` (`tgId`, `id`, `username`, `firstName`, `lastName`, `langCode`, `invitedBy`, `isActive`, `createdAt`, `updatedAt`)
SELECT
  'smoke-user',
  '00000000-0000-4000-8000-000000000001',
  NULL, NULL, NULL, NULL, NULL,
  true,
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1
  FROM `Users`
  WHERE `id` = '00000000-0000-4000-8000-000000000001'
);

--> statement-breakpoint

-- 2. Create MortgageProfiles table
CREATE TABLE `MortgageProfiles` (
  `id`                 int          NOT NULL AUTO_INCREMENT,
  `userId`             char(36)     NOT NULL,
  `propertyPrice`      decimal(15,2) NOT NULL,
  `propertyType`       varchar(50)  NOT NULL,
  `downPaymentAmount`  decimal(15,2) NOT NULL,
  `matCapitalAmount`   decimal(15,2),
  `matCapitalIncluded` boolean      NOT NULL DEFAULT false,
  `mortgageTermYears`  int          NOT NULL,
  `interestRate`       decimal(7,4) NOT NULL,
  `createdAt`          timestamp    NOT NULL DEFAULT (now()),
  `updatedAt`          timestamp    NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `MortgageProfiles_id` PRIMARY KEY(`id`),
  CONSTRAINT `MortgageProfiles_userId_fk`
    FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

--> statement-breakpoint

-- 3. Create MortgageCalculations table
CREATE TABLE `MortgageCalculations` (
  `id`                     int           NOT NULL AUTO_INCREMENT,
  `userId`                 char(36)      NOT NULL,
  `mortgageProfileId`      int           NOT NULL,
  `monthlyPayment`         decimal(15,2) NOT NULL,
  `totalPayment`           decimal(15,2) NOT NULL,
  `totalOverpaymentAmount` decimal(15,2) NOT NULL,
  `possibleTaxDeduction`   decimal(15,2) NOT NULL,
  `savingsDueMotherCapital` decimal(15,2) NOT NULL,
  `recommendedIncome`      decimal(15,2) NOT NULL,
  `paymentSchedule`        text,
  `createdAt`              timestamp     NOT NULL DEFAULT (now()),
  `updatedAt`              timestamp     NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `MortgageCalculations_id` PRIMARY KEY(`id`),
  CONSTRAINT `MortgageCalculations_userId_fk`
    FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `MortgageCalculations_mortgageProfileId_fk`
    FOREIGN KEY (`mortgageProfileId`) REFERENCES `MortgageProfiles`(`id`) ON DELETE CASCADE
);
