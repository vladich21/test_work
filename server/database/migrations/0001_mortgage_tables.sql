-- Migration: Add id UUID to Users, create MortgageProfiles and MortgageCalculations

-- 1. Add internal UUID column to Users (FK target for mortgage domain)
--    Nullable initially so existing rows are handled; set via application logic.
ALTER TABLE `Users`
  ADD COLUMN `id` char(36) UNIQUE;

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
  CONSTRAINT `MortgageProfiles_id` PRIMARY KEY(`id`)
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
  CONSTRAINT `MortgageCalculations_mortgageProfileId_fk`
    FOREIGN KEY (`mortgageProfileId`) REFERENCES `MortgageProfiles`(`id`) ON DELETE CASCADE
);
