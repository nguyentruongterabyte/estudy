-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: estudy
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Answers`
--

DROP TABLE IF EXISTS `Answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `questionId` int DEFAULT NULL,
  `answer` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `questionId` (`questionId`),
  CONSTRAINT `Answers_ibfk_1` FOREIGN KEY (`questionId`) REFERENCES `Questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Answers`
--

LOCK TABLES `Answers` WRITE;
/*!40000 ALTER TABLE `Answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `Answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Audios`
--

DROP TABLE IF EXISTS `Audios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Audios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `audioLink` text,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Audios`
--

LOCK TABLES `Audios` WRITE;
/*!40000 ALTER TABLE `Audios` DISABLE KEYS */;
/*!40000 ALTER TABLE `Audios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CorrectAnswers`
--

DROP TABLE IF EXISTS `CorrectAnswers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CorrectAnswers` (
  `questionId` int NOT NULL,
  `answerId` int NOT NULL,
  `explain` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`questionId`,`answerId`),
  KEY `answerId` (`answerId`),
  CONSTRAINT `CorrectAnswers_ibfk_1` FOREIGN KEY (`questionId`) REFERENCES `Questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CorrectAnswers_ibfk_2` FOREIGN KEY (`answerId`) REFERENCES `Answers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CorrectAnswers`
--

LOCK TABLES `CorrectAnswers` WRITE;
/*!40000 ALTER TABLE `CorrectAnswers` DISABLE KEYS */;
/*!40000 ALTER TABLE `CorrectAnswers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GroupQuestions`
--

DROP TABLE IF EXISTS `GroupQuestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GroupQuestions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `partId` int DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `partId` (`partId`),
  CONSTRAINT `GroupQuestions_ibfk_1` FOREIGN KEY (`partId`) REFERENCES `Parts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GroupQuestions`
--

LOCK TABLES `GroupQuestions` WRITE;
/*!40000 ALTER TABLE `GroupQuestions` DISABLE KEYS */;
/*!40000 ALTER TABLE `GroupQuestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Parts`
--

DROP TABLE IF EXISTS `Parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Parts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Parts`
--

LOCK TABLES `Parts` WRITE;
/*!40000 ALTER TABLE `Parts` DISABLE KEYS */;
INSERT INTO `Parts` VALUES (1,'Mô tả tranh'),(2,'Hỏi - Đáp'),(3,'Đoạn hội thoại'),(4,'Bài nói ngắn'),(5,'Hoàn thành câu'),(6,'Hoàn thành đoạn văn'),(7,'Đọc hiểu');
/*!40000 ALTER TABLE `Parts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Photos`
--

DROP TABLE IF EXISTS `Photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Photos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `questionId` int DEFAULT NULL,
  `filePath` text,
  `caption` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `questionId` (`questionId`),
  CONSTRAINT `Photos_ibfk_1` FOREIGN KEY (`questionId`) REFERENCES `Questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Photos`
--

LOCK TABLES `Photos` WRITE;
/*!40000 ALTER TABLE `Photos` DISABLE KEYS */;
/*!40000 ALTER TABLE `Photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QuestionAudios`
--

DROP TABLE IF EXISTS `QuestionAudios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `QuestionAudios` (
  `questionId` int NOT NULL,
  `audioId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`questionId`,`audioId`),
  KEY `audioId` (`audioId`),
  CONSTRAINT `QuestionAudios_ibfk_1` FOREIGN KEY (`questionId`) REFERENCES `Questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `QuestionAudios_ibfk_2` FOREIGN KEY (`audioId`) REFERENCES `Audios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QuestionAudios`
--

LOCK TABLES `QuestionAudios` WRITE;
/*!40000 ALTER TABLE `QuestionAudios` DISABLE KEYS */;
/*!40000 ALTER TABLE `QuestionAudios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Questions`
--

DROP TABLE IF EXISTS `Questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `groupId` int DEFAULT NULL,
  `question` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `groupId` (`groupId`),
  CONSTRAINT `Questions_ibfk_1` FOREIGN KEY (`groupId`) REFERENCES `GroupQuestions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Questions`
--

LOCK TABLES `Questions` WRITE;
/*!40000 ALTER TABLE `Questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `Questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RefreshTokens`
--

DROP TABLE IF EXISTS `RefreshTokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RefreshTokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `refreshToken` varchar(256) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `RefreshTokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RefreshTokens`
--

LOCK TABLES `RefreshTokens` WRITE;
/*!40000 ALTER TABLE `RefreshTokens` DISABLE KEYS */;
INSERT INTO `RefreshTokens` VALUES (19,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMwOTk0OTI4LCJleHAiOjE3MzIyMDQ1Mjh9.FE1_ehAVX9b9tiIbGadILNRkDJQ9tYQYJZynhlB9lnY','2024-11-07 22:55:28','2024-11-07 22:55:28');
/*!40000 ALTER TABLE `RefreshTokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RoleDetails`
--

DROP TABLE IF EXISTS `RoleDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RoleDetails` (
  `userId` int NOT NULL,
  `roleId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`,`roleId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `RoleDetails_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `RoleDetails_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RoleDetails`
--

LOCK TABLES `RoleDetails` WRITE;
/*!40000 ALTER TABLE `RoleDetails` DISABLE KEYS */;
INSERT INTO `RoleDetails` VALUES (1,30001,'2024-11-07 17:22:47','2024-11-07 17:22:47'),(1,52456,'2024-11-07 17:22:47','2024-11-07 17:22:47'),(1,78643,'2024-11-07 17:22:47','2024-11-07 17:22:47');
/*!40000 ALTER TABLE `RoleDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `Roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Roles` (
  `id` int NOT NULL,
  `name` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Roles`
--

LOCK TABLES `Roles` WRITE;
/*!40000 ALTER TABLE `Roles` DISABLE KEYS */;
INSERT INTO `Roles` VALUES (30001,'USER'),(52456,'ADMIN'),(78643,'EDITOR');
/*!40000 ALTER TABLE `Roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20241020124532-create-user.js'),('20241024023451-create-vocabulary.js'),('20241024115516-create-vocabulary-topics.js'),('20241024120239-add-vocabularyTopicId-to-vocabulary.js'),('20241024132323-create-vocabulary-practice-status.js'),('20241026125951-create-role.js'),('20241026130258-create-role-detail.js'),('20241103070617-create-refresh-token.js'),('20241107074105-create-part.js'),('20241107074245-create-audio.js'),('20241107074914-create-group-question.js'),('20241107075107-create-question.js'),('20241107075230-create-answer.js'),('20241107075501-create-correct-answer.js'),('20241107075635-create-user-answer.js'),('20241107080022-create-question-audio.js'),('20241107080639-create-photo.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAnswers`
--

DROP TABLE IF EXISTS `UserAnswers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserAnswers` (
  `userId` int NOT NULL,
  `questionId` int NOT NULL,
  `answerId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`,`questionId`,`answerId`),
  KEY `questionId` (`questionId`),
  KEY `answerId` (`answerId`),
  CONSTRAINT `UserAnswers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserAnswers_ibfk_2` FOREIGN KEY (`questionId`) REFERENCES `Questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserAnswers_ibfk_3` FOREIGN KEY (`answerId`) REFERENCES `Answers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAnswers`
--

LOCK TABLES `UserAnswers` WRITE;
/*!40000 ALTER TABLE `UserAnswers` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserAnswers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(30) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `phoneNumber` varchar(12) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Truong','Nguyen','nguyenthaitruong1223@gmail.com','$2b$10$bfCAN3DDxO0Q83O8c9aEu.S.Ca0.EI9luMRF/FzNtfAc2V9CX6Wca','0948915051','2024-11-07 17:22:47','2024-11-07 17:22:47');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vocabularies`
--

DROP TABLE IF EXISTS `Vocabularies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Vocabularies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `word` varchar(50) DEFAULT NULL,
  `pronounciation` varchar(100) DEFAULT NULL,
  `definition` text,
  `example` text,
  `image` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `vocabularyTopicId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Vocabularies_vocabularyTopicId_foreign_idx` (`vocabularyTopicId`),
  CONSTRAINT `Vocabularies_vocabularyTopicId_foreign_idx` FOREIGN KEY (`vocabularyTopicId`) REFERENCES `VocabularyTopics` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vocabularies`
--

LOCK TABLES `Vocabularies` WRITE;
/*!40000 ALTER TABLE `Vocabularies` DISABLE KEYS */;
/*!40000 ALTER TABLE `Vocabularies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VocabularyPracticeStatuses`
--

DROP TABLE IF EXISTS `VocabularyPracticeStatuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VocabularyPracticeStatuses` (
  `userId` int NOT NULL,
  `vocabularyId` int NOT NULL,
  `status` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`,`vocabularyId`),
  KEY `vocabularyId` (`vocabularyId`),
  CONSTRAINT `VocabularyPracticeStatuses_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `VocabularyPracticeStatuses_ibfk_2` FOREIGN KEY (`vocabularyId`) REFERENCES `Vocabularies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VocabularyPracticeStatuses`
--

LOCK TABLES `VocabularyPracticeStatuses` WRITE;
/*!40000 ALTER TABLE `VocabularyPracticeStatuses` DISABLE KEYS */;
/*!40000 ALTER TABLE `VocabularyPracticeStatuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VocabularyTopics`
--

DROP TABLE IF EXISTS `VocabularyTopics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VocabularyTopics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VocabularyTopics`
--

LOCK TABLES `VocabularyTopics` WRITE;
/*!40000 ALTER TABLE `VocabularyTopics` DISABLE KEYS */;
/*!40000 ALTER TABLE `VocabularyTopics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'estudy'
--

--
-- Dumping routines for database 'estudy'
--
/*!50003 DROP PROCEDURE IF EXISTS `GetUserRoles` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `GetUserRoles`(IN userId INT)
BEGIN
	SELECT r.id
	FROM Roles r
	INNER JOIN RoleDetails rd ON r.id = rd.roleId
	WHERE rd.userId = userId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-08 11:21:46
