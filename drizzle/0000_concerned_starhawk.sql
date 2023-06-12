-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Map` (
	`name` varchar(191) PRIMARY KEY NOT NULL);

CREATE TABLE `Nade` (
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`description` text,
	`map_id` varchar(191) NOT NULL,
	`status` enum('APPROVED','PENDING','DECLINED') NOT NULL DEFAULT 'PENDING',
	`author_id` varchar(191) NOT NULL,
	`video_url` varchar(191) NOT NULL,
	`title` text NOT NULL,
	`nadeTypeName` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP(3)),
	`serverId` varchar(191));

CREATE TABLE `NadeType` (
	`name` varchar(191) PRIMARY KEY NOT NULL);

CREATE TABLE `Server` (
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`name` varchar(191) NOT NULL);

CREATE TABLE `User` (
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`name` varchar(191) NOT NULL,
	`discord_tag` varchar(191) NOT NULL,
	`serverAdminId` varchar(191),
	`serverMemberId` varchar(191));

CREATE INDEX `Nade_author_id_idx` ON `Nade` (`author_id`);
CREATE INDEX `Nade_map_id_idx` ON `Nade` (`map_id`);
CREATE INDEX `Nade_nadeTypeName_idx` ON `Nade` (`nadeTypeName`);
CREATE INDEX `Nade_serverId_idx` ON `Nade` (`serverId`);
CREATE UNIQUE INDEX `Nade_video_url_key` ON `Nade` (`video_url`);
CREATE UNIQUE INDEX `User_discord_tag_key` ON `User` (`discord_tag`);
CREATE UNIQUE INDEX `User_name_key` ON `User` (`name`);
CREATE INDEX `User_serverAdminId_idx` ON `User` (`serverAdminId`);
CREATE INDEX `User_serverMemberId_idx` ON `User` (`serverMemberId`);
*/