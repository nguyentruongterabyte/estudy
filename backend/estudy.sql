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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Answers`
--

LOCK TABLES `Answers` WRITE;
/*!40000 ALTER TABLE `Answers` DISABLE KEYS */;
INSERT INTO `Answers` VALUES (1,1,'The man is holding some seafood.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(2,1,'The woman is baking a crab.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(3,1,'They are scared of the crab.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(4,1,'The family is shopping for breakfast.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(5,2,'The woman is talking on the phone.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(6,2,'The woman is using her cell phone.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(7,2,'The woman is typing on the laptop.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(8,2,'The woman is writing in her notebook.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(9,3,'The man is using a screwdriver to screw a nail into the building frame.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(10,3,'The man is hammering something into a building frame.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(11,3,'The man is making the frame with his hand.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(12,3,'The man is wearing protective glasses.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(13,4,'The woman is cooking some bacon.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(14,4,'The woman is baking a cake.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(15,4,'The woman is preparing for dinner.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(16,4,'The woman is frying some fish.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(17,5,'They are looking at each other.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(18,5,'The woman is typing on her computer.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(19,5,'The man is using the calculator.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(20,5,'The man is writing something onto the notepad.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(21,6,'There are some tables and chairs outdoors.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(22,6,'There are some people sitting at the tables.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(23,6,'There are plastic umbrellas on the tables.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(24,6,'There are many flowers in the garden.','2024-11-16 22:03:14','2024-11-16 22:03:14'),(25,10,'The plane is docked at the airport.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(26,9,'She is fixing the wheel on her bike.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(27,8,'They are very close to the chairlift.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(28,11,'The men are adjusting headsets.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(29,7,'The woman is drinking a cup of coffee.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(30,12,'The people are drinking glasses of juice.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(31,10,'There is luggage being put onto the plane.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(32,8,'They are making snow.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(33,9,'She is changing the tire on her car.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(34,7,'The woman is listening to music.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(35,11,'The women are wearing headsets.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(36,12,'She is giving a presentation about September’s sales figures.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(37,7,'The woman is talking on her cell phone.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(38,8,'The people are skiing down the mountain.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(39,9,'She is putting oil into her car.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(40,10,'There are many people boarding the plane.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(41,11,'The men are using a mouse with the laptop.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(42,12,'All of the women are sitting down.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(43,10,'There are maintenance workers fixing the plane.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(44,7,'The woman is looking at the newspaper.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(45,9,'She is standing behind the windmill.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(46,8,'All of the skiers are wearing helmets.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(47,11,'The women are talking to each other.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(48,12,'One of the women is giving a business presentation on a whiteboard.','2024-11-16 22:10:55','2024-11-16 22:10:55');
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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Audios`
--

LOCK TABLES `Audios` WRITE;
/*!40000 ALTER TABLE `Audios` DISABLE KEYS */;
INSERT INTO `Audios` VALUES (1,'https://storage.googleapis.com/estudyme/toeic/2024/10/08/51412687.mp3','2024-11-16 22:03:14','2024-11-16 22:03:14'),(2,'https://storage.googleapis.com/estudyme/toeic/2024/10/08/94243671.mp3','2024-11-16 22:03:14','2024-11-16 22:03:14'),(3,'https://storage.googleapis.com/estudyme/toeic/2024/10/08/66607451.mp3','2024-11-16 22:03:14','2024-11-16 22:03:14'),(4,'https://storage.googleapis.com/estudyme/toeic/2024/10/08/65823179.mp3','2024-11-16 22:03:14','2024-11-16 22:03:14'),(5,'https://storage.googleapis.com/estudyme/toeic/2024/10/08/55914976.mp3','2024-11-16 22:03:14','2024-11-16 22:03:14'),(6,'https://storage.googleapis.com/estudyme/toeic/2024/10/08/51412687.mp3','2024-11-16 22:03:14','2024-11-16 22:03:14'),(7,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731769852512-81452777.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=lWLujDl7gipOU7vlvGE%2BZPmV4%2BoB09wXLH7CQlatu9AU7g8vIxZQ2Gl2PvQizTY%2FOT8vDlPAB3O13YDlQIWMbod4lAv3AmpFtS%2BhKr9uijXxs61DIij8%2FIpB5GzfWPLPWK1zOVX%2FVwurOlkE2Ev1gV6MbtPN91vP0psDH%2BP9iGODoDy0%2FfNTeR4uI9Y777zAgJRNmqt6SE392GUZgd738S0mi%2BHNMedqwFKfrWoGV1EuixKnOg0faonq8Eep0VPlfjWrovD%2BKc3b7R1WtT44%2B%2BJWWnoPZbZD5qzrEqD9EBIzqOE9KPtrC%2Flto6WV3DniHMwEineedLu0rNkrXfBa4w%3D%3D','2024-11-16 22:10:55','2024-11-16 22:10:55'),(8,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731769852249-41293683.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=Zq%2FvyvNYus6Gb%2FMYj7zJwPDBHusGQFRWZtM2tH%2BNUtGK94WA4HFiv%2FACiKK%2FMfD2uEJkU9KkmXJ5ZWgIKavE9GxoAxMsNcMGCv%2B0ztCKy8wvDIV3XZNLojrNUZw2uSQllyxli7goaL%2F4L0KNmehuyaQ6bNT06C5LoOb4KfS8vBds4PPeCTwF6FuW0fGfvgTXBk2qwdQZpr5QU5%2ByI2ebm2Hl4ZRwPD8GtCShWDouLkn%2FNNzhNVsNlskNCbV1oNBYihOIFQFZQkp%2BMq1B1BaTGQMgyanvol6aGW6wnZLsKWH%2Fhd5W0Cfjg%2BfFuuNW4FWLWX14kjfXNJRbpehAZT3%2FLQ%3D%3D','2024-11-16 22:10:55','2024-11-16 22:10:55'),(9,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731769852451-87425510.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=RE%2Fsxl00hjONNT44lXG%2FgTU0ITKkvK2VJn4N6vpQtjiPJMhSTmTifP6t3r9dECrQT58KsRwEUMN8PL83IjHrD37BFZBk%2FJMxsEhqLjQrzCrPwAN99K95Kq0l%2BSDdPRzYRh2SY3CAcSwDzdSqHadvEaFaJaewh7jATKhOQXqcUpvtIFaUysXGUiStmz%2B77IL9PXLG6uUS3S%2Fgo263EtD5YE44gPHayp25b7JvmEjyWLgx5cDkFPd7c7CPl5JJ%2FaXNEdBZjib6kFX5TvEEvOl6L6aU2VO3U88nJaxDOGneAn%2Bm7rhPTfrT%2F8qxER88GFn2unGYkBNIWja4wsek4gbp0g%3D%3D','2024-11-16 22:10:55','2024-11-16 22:10:55'),(10,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731769852071-21445087.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=QKc00M11mfLm4I4CGWqcENrAe902iVsuyPvuEXfci8DKJNvSe%2Bom9geuq2apErAYKeNFR3RE9SH7X1mVyvUgzD48CycQm5HLt2R6eeVV8FHLUAUzjVEmx%2F4WUF22Y4Y9jzAXZEsRA%2BEE%2BMSX0%2BnN58ZXcrPWQ1sdPh%2BHfxTKw02Muo%2FPJ8ViO%2BcAWrqMSI%2FXlYk7KFXaugXli%2FW48BoFQdYXA0Shq4h57eGE1qECDUFzLQ6otmU7jGaWOsOz26KWM20wZ1O1w9Se%2Ff5FSETq%2BbI28am3Z%2BlN6s98%2BC3wpQNCT1NqvdW%2BHJaeNEpaCE5X5DemI0rncdnEQJ%2F73N5QCQ%3D%3D','2024-11-16 22:10:55','2024-11-16 22:10:55'),(11,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731769852652-48481214.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=wYMhEl7QcNe3L84Tqo4vf3kEl61SzAZWAlDK1lUtantlWoHjyf4jIRg1kpZ%2Boe76kLaIM3Z4QmnuUPVjpeTHk8wZBM5hPfs8oWN0k5SeUSgXLT6ypJwh%2Fz%2B4vaFwunF7AnIkOQsZ1jXLC0hpvb5S63pDyKFBHGdtKK2jM4UAEIAOw%2BCvQuACPdoccLpX%2FJhl%2FPVKyV294RJvHx%2B2wnFfJrqFM411qquoZiWxUZY9V4%2B4Il1BUtegMnKYafRyFbJ81Th3LjOk6IvkwrtMUHXuLg%2FwXm9dN4g%2FHCeKQ%2Fb3gAHI7z1QGsp65sNAo2rMW%2B0vucdyJGIvCOJRgPwv2WpXGw%3D%3D','2024-11-16 22:10:55','2024-11-16 22:10:55'),(12,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731769852366-27158974.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=sjuoKSpqsar1FNHrM%2BX8cNvhqnPHZeNLwx2Ys6ELrekG8dqH%2BMoXhDn614ohJYiW7Y%2BL%2FzEn5oH7VjziFP9tGwfmWKF%2FcLF5y85DX90vDxqX52e8wyps0TLHLGFFHIqurZYJfLOTP5OzQR75%2BVjqDnxwwLhJl9ovNzBOq4E2s3tS0sfgSMCqnY1boK4RaLZrdCZLVX5Bykm8osr3sJPjk%2BKlS2cTBCL3wExGQDGzytc3RdHNsM3eqH7qi5PFMWUOBUBNYbUVwN5X4QKVO0zquYBDqk1HCKNtHqkZLlwEp%2FqdLCUBmwoT7oI9z5AGtR83Odg9DLi%2BRsk8mA07iPgDrw%3D%3D','2024-11-16 22:10:55','2024-11-16 22:10:55');
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
INSERT INTO `CorrectAnswers` VALUES (1,1,'','2024-11-16 22:03:14','2024-11-16 22:03:14'),(2,5,'','2024-11-16 22:03:14','2024-11-16 22:03:14'),(3,10,'','2024-11-16 22:03:14','2024-11-16 22:03:14'),(4,13,'','2024-11-16 22:03:14','2024-11-16 22:03:14'),(5,20,'','2024-11-16 22:03:14','2024-11-16 22:03:14'),(6,21,'','2024-11-16 22:03:14','2024-11-16 22:03:14'),(7,29,NULL,'2024-11-16 22:10:55','2024-11-16 22:10:55'),(8,38,NULL,'2024-11-16 22:10:55','2024-11-16 22:10:55'),(9,33,NULL,'2024-11-16 22:10:55','2024-11-16 22:10:55'),(10,25,NULL,'2024-11-16 22:10:55','2024-11-16 22:10:55'),(11,35,NULL,'2024-11-16 22:10:55','2024-11-16 22:10:55'),(12,48,NULL,'2024-11-16 22:10:55','2024-11-16 22:10:55');
/*!40000 ALTER TABLE `CorrectAnswers` ENABLE KEYS */;
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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `questionId` (`questionId`),
  CONSTRAINT `Photos_ibfk_1` FOREIGN KEY (`questionId`) REFERENCES `Questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Photos`
--

LOCK TABLES `Photos` WRITE;
/*!40000 ALTER TABLE `Photos` DISABLE KEYS */;
INSERT INTO `Photos` VALUES (1,1,'https://estudyme.hoc102.com/legacy-data/kstoeic/images/3555841_1562638435196.png','2024-11-16 22:03:14','2024-11-16 22:03:14'),(2,2,'https://estudyme.hoc102.com/legacy-data/kstoeic/images/5656089_1562638419203.png','2024-11-16 22:03:14','2024-11-16 22:03:14'),(3,3,'https://estudyme.hoc102.com/legacy-data/kstoeic/images/5911589_1562638438001.png','2024-11-16 22:03:14','2024-11-16 22:03:14'),(4,4,'https://estudyme.hoc102.com/legacy-data/kstoeic/images/3672944_1562638433179.png','2024-11-16 22:03:14','2024-11-16 22:03:14'),(5,5,'https://estudyme.hoc102.com/legacy-data/kstoeic/images/6539040_1562638443130.png','2024-11-16 22:03:14','2024-11-16 22:03:14'),(6,6,'https://estudyme.hoc102.com/legacy-data/kstoeic/images/973355_1562638439675.png','2024-11-16 22:03:14','2024-11-16 22:03:14'),(7,8,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731769850069-999401_1562639751431.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=Maygp8ZTbXerI8LNljYSWs%2FtfRTWti6s5XhxuFpU%2F6zzb54xAWhy25Y01fH5HPvbZBzyC0Sfd6yrAn4PvHoRSmASJAr2LcNrinYwCb4CT%2Fy94LkFPCTRhPaTwA7ulHCzuDQl7dl8If1ZYlgVCBrUN1nEEcsoc2w93lbGEGTV3oiByqRhBuF6H86HbtoGCpphKq6IQH6iX1YdzPx%2BIW%2BcnYKConIUNh6AQQL1OKHTJiU40PEiv%2BfurA5sH0MEyoEda7nUktx8SaTFar2n1zwf4lMiSzqyaTCMP56pLkHmazWAu%2B0p8TQI4TJ%2BgwUtXHwmRXWG8ALHaluq7J05HSCHaw%3D%3D','2024-11-16 22:10:55','2024-11-16 22:10:55'),(8,7,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731769850048-419301_1562639748639.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=YAFIZXGsUgYo9%2B9pALxJFVm6J4zT8WEYNugB%2BKbRVV36hPZwS9s%2F3f3K5dM0tJT83xp%2BF4Bm91QJMwl%2BDEYGfDASgnHV8R8Bs66wkXTEeEh2CUnYFycLY2yFvlcdgPfXHpibZYbfJulTYCDzcio29viSlaimK2woaak8R%2FS8aT8ynyGpzPJ6wnTbbCO1WMJqzSsWbU2%2FszxaqUrxFRTnTSG2Y40UHI9GwJw15scfbsvRtaZvwTuzh1Pptf%2FSMwH2Luqn0d1cj7TeG%2FNlVd1zL5BrOG1knjilij7ZR1oxcyJXpf5G6m91vJhJ145BRWnpF%2BaDbvvawFmBdejLjE6%2FWw%3D%3D','2024-11-16 22:10:55','2024-11-16 22:10:55'),(9,10,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731769850071-634270_1562639747171.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=1ymgXXNqHKZY%2B1aHQlCskViy6yXg3%2BqbjhxW3Kg%2F6CiT%2B0Q75hm%2Fl71ugj1Soc8PeVklPkYpEniuE6lFV0EhXSyfIYJEmoEmqvOE8HJb0DxfWPs0LLUBp6a4UQrLRk10cJXoYW1SyXGgS5RePZg8B1cMNKMiEqLwWZPQMGjOBiqWttI%2BCQUvvF1x3EkJF1a9%2Bp3LgZPJNFHFtkME8rKFmKfZzTQZQGIrIIAt1j2TeJaP2HVrdPfu4BZMFoWgp%2BQTJLV%2FtSXexEfRa0sCbGrmLSu8fmJ5G9PIMTNpNuQLNkv2ujxlnatqIGh8MRSplspphEBMkInVghF65gukqR0t%2FA%3D%3D','2024-11-16 22:10:55','2024-11-16 22:10:55'),(10,11,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731769850084-711038_1562639754172.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=6vdbs9HzZxbxmfUglS6rk%2BypCaKnmHBh0i2DNuyItwwOOzfIwzMFJoEyq6GC5QzixUWRzniBLeI5ZWxRZTJ%2Be4TPUJjg3XkbUpsRLjmh%2Bsg1YxsVjEzAlmhKqWaUg2GUT6FCsK71UB7cbRY69rFs6xwgJPqxlkuQY28WpU6vPGkakVwIqHP0MyRENQ7ZpMCyPZomQK5vWH%2BOYwSprBAgluCVMG4spVBZFl8GF1t1W8qQbh9K3Chd9Osbk1xvxAsJm%2B5aqsZCTh5Nq2BdH2OwqJ1W1plcHcLizmBLSo%2FQV3DqFLBXwWP2v2acd0Kxt4REeCSh8fW%2Bb5pkzmu8WwIF5Q%3D%3D','2024-11-16 22:10:55','2024-11-16 22:10:55'),(11,9,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731769850081-5270312_1562639750094.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=Ey5XAb2jLBZgt8jGYI4LIphtxyNNDcTvPVZdXcpomE46ztjc7BCj8%2BCfg1tdvXPHXqE7PfT7lQ3DWStXfyMHu0PCC6pEOratW%2FJ8Sh8MMhrIJipyx8z0ui07ZklFVfn9kH6KcPwUq8kJTfaGQenTAoGPN7tirS8Q6fwrGugwMlwo3155o9UtC0SIrrV4TISexQ0mub3quFVV8CelCTW0dZu%2FEy5OXY0xmyn1GbHKq5FB2wHHl%2FnGJn7jaEI6CnThxjR%2BSTQT2Vm4mSDbFZ1LxX55QQAtUGagL6%2FKmXt3VZb2Cs%2FTZYlnxcJVfI6ii9a9i7vWtT4FboH9h1%2FrWRJZWw%3D%3D','2024-11-16 22:10:55','2024-11-16 22:10:55'),(12,12,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731769850086-2138816_1562639752778.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=SieV3VyNZcQw4qBKo6SmTgEfJNnXVyxujgNfz8crGIlJ3BfYBduVTsF7DRsx%2FoWXQHvaSZZ8R5p0TS8bXaF2ln4v4%2BJVH0XKAQ%2FdfHRIyeCB41A3wRIJXBzzbmbDCGz6RjtME0nwsr9E9ZonB40Wh6JJrCho6sHnIr%2BE0ouLZUKEYjBPpowAH3YWT5mTcGWhJZesdg7%2B8nSPHkQoQGU74zwhsSiUSLBoFARN8x%2BM3LeR6zUqh8cKQ2SwIgHSN9eXNXHlVk5gpfAgPl0TbjEu9FcF%2BYgCQNmKo1O%2FucJO6VU7GJgfJK3oOdyJtIryaWkuFQ5lCxw%2BoMH4KHxHxwOGWg%3D%3D','2024-11-16 22:10:55','2024-11-16 22:10:55');
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
INSERT INTO `QuestionAudios` VALUES (1,1,'2024-11-16 22:03:14','2024-11-16 22:03:14'),(2,2,'2024-11-16 22:03:14','2024-11-16 22:03:14'),(3,3,'2024-11-16 22:03:14','2024-11-16 22:03:14'),(4,4,'2024-11-16 22:03:14','2024-11-16 22:03:14'),(5,5,'2024-11-16 22:03:14','2024-11-16 22:03:14'),(6,6,'2024-11-16 22:03:14','2024-11-16 22:03:14'),(7,8,'2024-11-16 22:10:55','2024-11-16 22:10:55'),(8,7,'2024-11-16 22:10:55','2024-11-16 22:10:55'),(9,10,'2024-11-16 22:10:55','2024-11-16 22:10:55'),(10,9,'2024-11-16 22:10:55','2024-11-16 22:10:55'),(11,12,'2024-11-16 22:10:55','2024-11-16 22:10:55'),(12,11,'2024-11-16 22:10:55','2024-11-16 22:10:55');
/*!40000 ALTER TABLE `QuestionAudios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QuestionGroups`
--

DROP TABLE IF EXISTS `QuestionGroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `QuestionGroups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `partId` int DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `partId` (`partId`),
  CONSTRAINT `QuestionGroups_ibfk_1` FOREIGN KEY (`partId`) REFERENCES `Parts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QuestionGroups`
--

LOCK TABLES `QuestionGroups` WRITE;
/*!40000 ALTER TABLE `QuestionGroups` DISABLE KEYS */;
INSERT INTO `QuestionGroups` VALUES (1,1,'Test 1','2024-11-16 22:03:13','2024-11-16 22:03:13'),(2,1,'Test 2','2024-11-16 22:10:55','2024-11-16 22:10:55');
/*!40000 ALTER TABLE `QuestionGroups` ENABLE KEYS */;
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
  CONSTRAINT `Questions_ibfk_1` FOREIGN KEY (`groupId`) REFERENCES `QuestionGroups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Questions`
--

LOCK TABLES `Questions` WRITE;
/*!40000 ALTER TABLE `Questions` DISABLE KEYS */;
INSERT INTO `Questions` VALUES (1,1,'The man is holding some seafood.','2024-11-16 22:03:13','2024-11-16 22:03:13'),(2,1,'The woman is talking on the phone','2024-11-16 22:03:13','2024-11-16 22:03:13'),(3,1,'The man is hammering something into a building frame.','2024-11-16 22:03:13','2024-11-16 22:03:13'),(4,1,'The woman is cooking some bacon.','2024-11-16 22:03:13','2024-11-16 22:03:13'),(5,1,'The man is writing something onto the notepad.','2024-11-16 22:03:13','2024-11-16 22:03:13'),(6,1,'There are some tables and chairs outdoors.','2024-11-16 22:03:13','2024-11-16 22:03:13'),(7,2,'The woman is drinking a cup of coffee.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(8,2,'The people are skiing down the mountain.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(9,2,'She is changing the tire on her car.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(10,2,'The plane is docked at the airport.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(11,2,'The women are wearing headsets.','2024-11-16 22:10:55','2024-11-16 22:10:55'),(12,2,'One of the women is giving a business presentation on a whiteboard.','2024-11-16 22:10:55','2024-11-16 22:10:55');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RefreshTokens`
--

LOCK TABLES `RefreshTokens` WRITE;
/*!40000 ALTER TABLE `RefreshTokens` DISABLE KEYS */;
INSERT INTO `RefreshTokens` VALUES (1,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMxNzY5NzM2LCJleHAiOjE3MzI5NzkzMzZ9.qT3MHd_xNp8iG4ZaiGYatcdkJ4PfraAS86RmVmBzTTI','2024-11-16 22:08:56','2024-11-16 22:08:56');
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
INSERT INTO `RoleDetails` VALUES (1,30001,'2024-11-16 22:03:13','2024-11-16 22:03:13'),(1,52456,'2024-11-16 22:03:13','2024-11-16 22:03:13'),(1,78643,'2024-11-16 22:03:13','2024-11-16 22:03:13');
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
INSERT INTO `SequelizeMeta` VALUES ('20241020124532-create-user.js'),('20241024023451-create-vocabulary.js'),('20241024115516-create-vocabulary-topics.js'),('20241024120239-add-vocabularyTopicId-to-vocabulary.js'),('20241024132323-create-vocabulary-practice-status.js'),('20241026125951-create-role.js'),('20241026130258-create-role-detail.js'),('20241103070617-create-refresh-token.js'),('20241107074105-create-part.js'),('20241107074245-create-audio.js'),('20241107074914-create-question-group.js'),('20241107075107-create-question.js'),('20241107075230-create-answer.js'),('20241107075501-create-correct-answer.js'),('20241107075635-create-user-answer.js'),('20241107080022-create-question-audio.js'),('20241107080639-create-photo.js');
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
INSERT INTO `Users` VALUES (1,'Truong','Nguyen','nguyenthaitruong1223@gmail.com','$2b$10$bfCAN3DDxO0Q83O8c9aEu.S.Ca0.EI9luMRF/FzNtfAc2V9CX6Wca','0948915051','2024-11-16 22:03:13','2024-11-16 22:03:13');
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

-- Dump completed on 2024-11-16 22:11:33
