CREATE TABLE `appointments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patientId` int NOT NULL,
	`npId` int,
	`title` varchar(255) NOT NULL,
	`description` text,
	`scheduledAt` timestamp NOT NULL,
	`duration` int NOT NULL DEFAULT 30,
	`status` enum('scheduled','completed','cancelled','no_show') NOT NULL DEFAULT 'scheduled',
	`meetingLink` varchar(512),
	`npNotes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `appointments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `clinical_notes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patientId` int NOT NULL,
	`npId` int NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `clinical_notes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `documents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patientId` int NOT NULL,
	`uploadedBy` int NOT NULL,
	`fileName` varchar(512) NOT NULL,
	`fileKey` varchar(512) NOT NULL,
	`fileUrl` varchar(1024) NOT NULL,
	`fileSize` int NOT NULL,
	`mimeType` varchar(128) NOT NULL,
	`category` enum('lab_results','medical_records','prescription','insurance','id_document','symptom_diary','other') NOT NULL DEFAULT 'other',
	`reviewed` boolean NOT NULL DEFAULT false,
	`reviewedBy` int,
	`reviewedAt` timestamp,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`senderId` int NOT NULL,
	`receiverId` int NOT NULL,
	`senderRole` enum('patient','np') NOT NULL,
	`content` text NOT NULL,
	`isRead` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `patient_assignments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patientId` int NOT NULL,
	`npId` int NOT NULL,
	`assignedAt` timestamp NOT NULL DEFAULT (now()),
	`isActive` boolean NOT NULL DEFAULT true,
	CONSTRAINT `patient_assignments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portal_users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`passwordHash` varchar(512) NOT NULL,
	`firstName` varchar(255) NOT NULL,
	`lastName` varchar(255) NOT NULL,
	`phone` varchar(32),
	`role` enum('patient','np') NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`lastLogin` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `portal_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `portal_users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `treatment_plans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patientId` int NOT NULL,
	`npId` int NOT NULL,
	`hormoneType` varchar(128) NOT NULL,
	`dosage` varchar(128) NOT NULL,
	`frequency` varchar(128) NOT NULL,
	`duration` varchar(128) NOT NULL,
	`instructions` text,
	`status` enum('active','completed','paused','cancelled') NOT NULL DEFAULT 'active',
	`startDate` timestamp NOT NULL,
	`endDate` timestamp,
	`followUpDate` timestamp,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `treatment_plans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `quiz_submissions` ADD `portalUserId` int;