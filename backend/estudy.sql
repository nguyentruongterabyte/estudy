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
) ENGINE=InnoDB AUTO_INCREMENT=466 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Answers`
--

LOCK TABLES `Answers` WRITE;
/*!40000 ALTER TABLE `Answers` DISABLE KEYS */;
INSERT INTO `Answers` VALUES (49,14,'The man is using a screwdriver to screw a nail into the building frame.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(50,16,'They are looking at each other.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(51,15,'The woman is talking on the phone.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(52,17,'The woman is cooking some bacon.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(53,13,'The man is holding some seafood.','2024-11-17 19:17:14','2024-11-18 17:03:00'),(54,18,'There are some tables and chairs outdoors.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(55,14,'The man is hammering something into a building frame.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(56,15,'The woman is using her cell phone.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(57,16,'The woman is typing on her computer.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(58,17,'The woman is baking a cake.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(59,13,'The woman is baking a crab.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(60,18,'There are some people sitting at the tables.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(61,17,'The woman is preparing for dinner.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(62,14,'The man is making the frame with his hand.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(63,15,'The woman is typing on the laptop.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(64,16,'The man is using the calculator.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(65,13,'They are scared of the crab.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(66,18,'There are plastic umbrellas on the tables.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(67,17,'The woman is frying some fish.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(68,16,'The man is writing something onto the notepad.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(69,14,'The man is wearing protective glasses.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(70,15,'The woman is writing in her notebook.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(71,13,'The family is shopping for breakfast.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(72,18,'There are many flowers in the garden.','2024-11-17 19:17:14','2024-11-17 19:17:14'),(223,91,'The woman is drinking a cup of coffee','2024-11-18 16:00:22','2024-11-18 17:11:15'),(224,91,'The woman is listening to music.','2024-11-18 16:00:22','2024-11-18 17:03:12'),(225,91,'The woman is talking on her cell phone.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(226,92,'They are very close to the chairlift.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(227,91,'The woman is looking at the newspaper.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(228,92,'They are making snow.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(229,92,'The people are skiing down the mountain.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(230,92,'All of the skiers are wearing helmets.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(231,93,'The plane is docked at the airport.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(232,93,'There is luggage being put onto the plane.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(233,93,'There are many people boarding the plane.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(234,93,'There are maintenance workers fixing the plane.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(235,94,'She is fixing the wheel on her bike.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(236,94,'She is changing the tire on her car.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(237,94,'She is putting oil into her car.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(238,94,'She is standing behind the windmill.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(239,96,'The people are drinking glasses of juice.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(240,96,'She is giving a presentation about September’s sales figures.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(241,96,'All of the women are sitting down.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(242,96,'One of the women is giving a business presentation on a whiteboard.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(243,95,'The men are adjusting headsets.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(244,95,'The women are wearing headsets.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(245,95,'The men are using a mouse with the laptop.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(246,95,'The women are talking to each other.','2024-11-18 16:00:22','2024-11-18 16:00:22'),(367,127,'There are some tables and chairs outdoors.','2024-11-18 16:48:49','2024-11-18 17:12:53'),(368,127,'There are plastic umbrellas on the tables.','2024-11-18 16:48:49','2024-11-18 17:03:20'),(369,127,'There are some people sitting at the tables.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(370,128,'The woman is baking a crab.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(371,127,'There are many flowers in the garden.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(372,128,'The man is holding some seafood.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(373,128,'They are scared of the crab.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(374,128,'The family is shopping for breakfast.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(375,129,'They are looking at each other.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(376,129,'The woman is typing on her computer.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(377,129,'The man is using the calculator.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(378,129,'The man is writing something onto the notepad.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(379,130,'The woman is cooking some bacon.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(380,130,'The woman is baking a cake.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(381,130,'The woman is preparing for dinner.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(382,130,'The woman is frying some fish.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(383,132,'The man is using a screwdriver to screw a nail into the building frame.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(384,132,'The man is hammering something into a building frame.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(385,132,'The man is making the frame with his hand.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(386,132,'The man is wearing protective glasses.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(387,131,'The woman is talking on the phone.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(388,131,'The woman is using her cell phone.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(389,131,'The woman is typing on the laptop.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(390,131,'The woman is writing in her notebook.','2024-11-18 16:48:49','2024-11-18 16:48:49'),(391,133,'They’re not frequent flyers.','2024-11-18 17:30:51','2024-11-18 18:31:06'),(392,133,'It was the company’s 40th anniversary.','2024-11-18 17:30:51','2024-11-18 17:30:51'),(393,133,'The copier malfunctioned.','2024-11-18 17:30:51','2024-11-18 17:30:51'),(394,134,'The window faces toward the street.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(395,134,'Between Williams street and Keller Avenue.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(396,134,'It was very informative.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(397,138,'Please sit anywhere.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(398,138,'It’s a comfortable chair.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(399,138,'Keep that in mind.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(400,136,'I think it was less than 60 dollars.','2024-11-18 17:30:52','2024-11-18 19:54:02'),(401,136,'In a department store.','2024-11-18 17:30:52','2024-11-18 19:54:02'),(402,136,'It wasn’t difficult at all.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(403,135,'Is that really necessary?','2024-11-18 17:30:52','2024-11-18 17:30:52'),(404,135,'I returned the equipment.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(405,135,'I’m not a tenant.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(406,137,'A new reward system will be introduced soon.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(407,137,'No, I’ve been too busy today.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(408,137,'Nice to meet you.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(409,139,'Front row seats.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(410,139,'Mr. Gibson will close the door.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(411,139,'A famous novelist.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(412,140,'Yes, she looks attractive in this picture.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(413,140,'A digital camera.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(414,140,'Sure, let’s do it on the steps.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(415,141,'When it reaches 25 degrees.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(416,141,'I agree with you.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(417,141,'They’ll be on air in about an hour.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(418,144,'In April.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(419,144,'Refreshments will be provided.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(420,144,'At a park next to a lake.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(421,142,'It was delicious.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(422,142,'Yes, the service is rather slow tonight.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(423,142,'I’ll order the tomato pasta.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(424,143,'Actually, I prefer working alone.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(425,143,'Let’s gather the company’s data.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(426,143,'Before next Friday.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(427,145,'The house is for sale.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(428,145,'Yes, we’re doing that next.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(429,145,'His remarks caused offense.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(430,146,'Look at the attachment.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(431,146,'Actually, I’ll be on vacation.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(432,146,'We accept cash or check.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(433,148,'Ms. Watson will be leading the team.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(434,148,'I’m going to book a table for dinner.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(435,148,'No, I’ll get it from the library.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(436,149,'I’m going to order delivery.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(437,149,'Please bring the bill.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(438,149,'At a convenient time.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(439,147,'I forgot the singer’s name.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(440,147,'Where is the concert?','2024-11-18 17:30:52','2024-11-18 17:30:52'),(441,147,'Yes, he has a wonderful voice.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(442,150,'Make room on your desk.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(443,150,'That’s a difficult request.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(444,151,'No, they are distributed next week.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(445,150,'It’s Katie Miller.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(446,151,'Sure, I’ll send him an e-mail.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(447,151,'She wants to get the promotion.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(448,153,'I need a reference book.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(449,153,'Yes, 200 seats in total.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(450,153,'No, I couldn’t find the e-mail address.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(451,152,'Because it’s a holiday.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(452,152,'Let’s get off at the next station.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(453,152,'No, I won’t be running tomorrow.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(454,154,'He has extensive management experience.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(455,154,'There’s a paper jam in the copy machine.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(456,154,'That’s why the coffee tastes great.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(457,155,'She works on the third floor.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(458,155,'Yes, it is working again.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(459,155,'That’s not what I saw.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(460,156,'Hold the line, please.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(461,156,'Some empty boxes.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(462,156,'Try calling back later.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(463,157,'You need a transit card.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(464,157,'The bus stop is over there.','2024-11-18 17:30:52','2024-11-18 17:30:52'),(465,157,'It is headed downtown.','2024-11-18 17:30:52','2024-11-18 17:30:52');
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
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Audios`
--

LOCK TABLES `Audios` WRITE;
/*!40000 ALTER TABLE `Audios` DISABLE KEYS */;
INSERT INTO `Audios` VALUES (13,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731845831702-65823179.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=WRqOxTiuaeBFhHhFpONa7RTpTXz1Vv6CzqNw%2BrZLxTa21dnDu1Z2irCnzBxuqf3AlG4ZtFKBQ7gOYGDBfIcIUw6C7jGWdB%2B3Xr4rQ%2BiT4Plat2bsSiN%2FbPe0dkdwr3sJnnNpX2%2FJLJnDHRzLTuzzJwqDatVIFTbYbODIeh65uj47ivifj%2BnLpVd5npQZlEctjgVI4LNiUQ%2BDaNmpMjICdLpdDtmUpQJOzonMcoIyX8NqjY9S8ZUwQi66WEifMMBtQr4IFQuG%2FPQraEl1%2FeUPRYpEjK8HW1bWt6ZMq6W8UUOMT3FxxT6HuMkbRRJpgdjOectWO%2Fz4zr55Uqnssfm76A%3D%3D','2024-11-17 19:17:14','2024-11-17 19:17:14'),(14,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731845831211-65823179.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=BO1RuKseYV63d5R9OJ31i8bpOPWp81XkVHV04y7gTTUc3v7NRo7JAcleDQ8Ibiu9o1nlPR3xHk%2BQmUclCag8oM5H4A6WnXyBHT6dWxBDKPv1T6nVVX8abWtN%2Bk85nULb3K0Ws6mYMze%2Bsbqot8SI4J4EWLIoeVbGKqeEwDFlgMJ3ycEhtiuTz0gFoSCK%2Fh9mjY0r0wTpk6JZ51kvyl%2FhHeEHtvsBBRg4SFyq0Vih7sLs9Ul54l97DI463PSa3hCm4YuusnzZ%2F7%2Fog1OeFbZdxviDnoldFeQYd6cYpZ%2FsDPeBHW5o0S5DN5Dm1juBpZ4mxfXKd%2Bajx2zkLI0z8pzAbw%3D%3D','2024-11-17 19:17:14','2024-11-17 19:17:14'),(15,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731845831527-55914976.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=JivSerD7tq2wld6fWL0KnZ055wYsgcE4dKLfxkAknqQ5IPX9MUCTdpWs0twmlPhk7WkwPK%2BDHMdbiuTi10a3OnJJYRv5%2F6gowTK53OuDeLkZraGoKbXP%2FCcz7V1yUGAJekxV%2BrG2nJC9vE8pS%2BI1Kns5dj5Oz7mo5UE79NPM3Pn7%2F%2BCH3wgcMn2BQbuXk3c2bV7JZBlG%2FGIldck4Ryx9PZRrtKOt%2BvOIEDdUIH2obWPxoaAAELPC6IxHX2D2ua9Bf4TfdgklJCNT0aBguBfSzq5sHZGyOokjcnL1zXB3ndpGKm%2Btw4ng18Y%2B96zs4%2FdmcCzLc0XEJB3HJk897mUVWA%3D%3D','2024-11-17 19:17:14','2024-11-17 19:17:14'),(16,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731845831227-66607451.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=dlH6bv6xxzbgCmcwB8fhTfwohLNJ9UjiHg4devbdTLt1sXlPcREneqY%2BABUYLNoBULQh1Jw62%2FyFTJm%2BG7ARHan9VmncGr4pe1Qd9Nmkgf3E4oIgP8Wgk7V1oW1r9hPzJ32zdxSopJCCqeDAHuEQBOYiDbw0qb1eJhSrhTEhCLgzorMDaP3xBNowOHbi2%2FA25PVkYxHy7UqFrheknQZfRS%2Bhd82DMD%2Fe8sWTiqzao1boi%2BjzAuAvkcoYwaw%2BdbyAWbQY%2Bc%2FNCNEI%2Bnok7rY7XWv4Idm6%2FpJHK7qz7AopmYt0YvAWF0%2B4a0UwEj16s82AisXXpN1WZwJ5zFFm23bFtw%3D%3D','2024-11-17 19:17:14','2024-11-17 19:17:14'),(17,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731845831435-51412687.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=CTfmQr4V3%2FZfjePDGlMwNHEbl5pognOORD9V4PNzdGhFzdHpLCokhXhKynoBGLfzxBRG6gYvZltRYQfwSfbFJeAs6N6xIpzj1Fc9Ui4GhXFhHLKdn%2FmSO%2BHLMy%2BKaU3BfnbgDgJOvATbDShzmdwzMijTzEHAaOCxjg65weGKNm9DOJU5D8WQQ2jtl43wwKe8dYmHBvqE%2BCZPHLVEAq7YteQlR47gWLOMC80JJ3bojLiV9fsfEvW8hRrXpuSSz1VqVijrrFtDiyFrRvK605YwN2hBkj1yrzCRzziUGcxSRTVs6JpB%2BSoTSqAp6i1fk1ECMue2QeVaZcjm5TpMfkYf3w%3D%3D','2024-11-17 19:17:14','2024-11-17 19:17:14'),(18,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731845831173-94243671.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=s9%2F7elcGFxwLpYjpWkTmmC39SYAGVp6eJzl1cSDcAF4snT79jTpulYjHF1Mx3%2BOkRElSpoJTNdmJDJWmbbM6GyfLMakOOAY8zTvsEatSU19YjGsH1x9CJy4O0zuwarJCqfooHg2qiGGQW93pLNOglTqR4QBuLYphhS1cZLSBCSNdp7V%2BTN%2BOEiY1CAs0gUQFeCqnHHgiO848xttsqfPhAZawanpM6SF56%2BW9Ahgs7%2B2BSRDa149lFFGtlT2CynqeV2YzBNZS7oCoUaHn8zuQBvwbUbzYbpFdqXsMVmJJVQCNp4Dp7nYzC10EQlalVAJcCpE0xWPo8BU7qRZQQ61b3Q%3D%3D','2024-11-17 19:17:14','2024-11-17 19:17:14'),(19,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731920419749-81452777.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=qdD4%2Bbb27PSQk326VEYruMc7qZZUZxwRS0GwV8UXggjYeqSQ7rnqSPhwLL%2Fz0siqgWrG5MbXqg38DFGE4MsVsNXpqA1uNoXzkJlw6wYupvqUW0MP%2FWh%2FGu76GBTe9x6m%2Fj1RHJ38B0%2BJ6IkiBsKV8AUaVX%2FuhaD5kR6tLiuyhhVZqVqjpvOJwTWL6t36lkotkEQBV3xIwh65CqZ2T%2Fp0fyAWYq%2BTo4Ot8DtX32kPwFk%2FavFEemvPC%2BLXbEfOG9neMHw1R2K08%2FdMW75thQFIRc5ubbci6YsP8maygJzxFdgSIheWctItnietEL2HAog6%2FA6%2F0vmgsuwB0kuk2XGkig%3D%3D','2024-11-18 16:00:23','2024-11-18 16:00:23'),(20,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731920419638-21445087.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=RsBBYwwf%2BPIuVzHUcmn0mnbvuNNLGsv%2B%2F6PlmuvjYNAUYcocIpd4yW%2BwM6YPlnqRm8FPDU%2BWzk%2BPyKokPKtSunUgGPB%2FsviVj82P3sMpGqepptrz%2BxdUg2JM0%2BmpadjqxfZ6HyrB94Suq8tUK%2Fhf9ojcOFUW%2F4HzrDn9JjZ5Z3ejq%2FxmusMLfjIboBbMhU75mr2%2F3%2B2E0OM9z59bg3SUkbZ%2FBsP0RwaKCnq5w2ClHcGkYIRrK0LSOqjbsGmpDIfprfowFHoAPc8A8RsXUZdGZGji1kpd6KSkIVpBoHRJH3n50N6GUN%2Fw5N5aocg4ubYoU22MEvPiJoOAsiqVwbKPnw%3D%3D','2024-11-18 16:00:23','2024-11-18 16:00:23'),(21,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731920419755-87425510.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=pswDbPW0976lk%2B2vAFrOVPeCxVRJCrnUtGnb%2B8n%2BoxI7seBQLdHupe5LZ6aGEqc95%2BxSA13ijIfJZYU4ero2X0NcYVwy%2BWFy%2FXH7vL9%2FqauvsrP6rd%2Frl1JaQKkUs24sUnja9cDcM8z3AGdA6Gn25G7AU7vbI3qKFi2yzfHWU5YT5TfTKe95U3Wg8qb0w7KCrBQrmlxefe1MYEGWJ9SqId3dmeTn7CWXDC1%2BDUEhUBZZbAMRcwCS5CmMYRtTldS3ApB%2F8xE58nZvT5XR%2FEA9GRDew6fGpBI0gct71CPxzNeIvRuDKunbucb28CeKrI23rf3JK8tp9JFg4yfTLlCGDw%3D%3D','2024-11-18 16:00:23','2024-11-18 16:00:23'),(22,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731920419735-27158974.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=kjT%2FlfuvVgVSbC%2FhWYA3RqhRWF%2Fq4vbUKXoMDDLFZxloXvaWNV8qnaKgJ3X62Gq%2F1H6yioq3V0MMvux77bheIsAIms7awov2MVw7HUuVwF0EbL6AlM8FWnqFZivxnTi2ZRZb8Ai0k3opvmczxtBPuOFZVslAgf1ckxfuFSdqvYXczfSOzfvifs0QbwYFsNvHa4EYuGcPonIDXJDCueYdJPgnSx6EuDMBS6KZfr%2F63U4ThZi2jlVnlDuPiP7u%2BP15QGluFM8XkEuJHx3DhfpsYWMje9sAyUq%2FVp6LYSOEHRbFfoSBB9xqwDdL6a9TebSHdhXo1ETxTu%2B7Ftd%2B7TnYnQ%3D%3D','2024-11-18 16:00:23','2024-11-18 16:00:23'),(23,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731920419716-41293683.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=NiJhCRJecOAsUUAifTDmBaE8Pm54hY%2FqWHKFzrokIRlUrrMHkv6L6L1TxArFHr2ckMH2BTDMIj0O88KJz8QkhFuFgi%2B%2FexWsUk13MqOVeO7XwhMTy4%2FP%2FJci%2F%2BETW362z9PbyYFk62z9E8mU7E7sESpQ1vuDg59DX5WQ3yTq%2BY52R5emSS8lCdnqrLH9vN62SazajJL2G8tiyQadNbGjtqAcv1rJVz51%2BPfyF%2Bl3yhtT9kwwToadpw9c1a5wxI9lFiatLV0jtb3yESivCoetvTJhYpXSekMWiDQwU4c9t4IU%2FlSW4JZqRZaEsB4mEsHQnYjajVBT%2B8re8mhhmuk1Cw%3D%3D','2024-11-18 16:00:23','2024-11-18 16:00:23'),(24,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731920420222-48481214.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=miRj7VemHVdPoJuMo028wZ8TUlJBnJOti1qb8xKQ8RRCxXURXdCiUwssE0VW0nTo4s8S5rZYyN82XNqDzL%2FSs06xHeSmPRkk5MieGtskaNR%2BJd55aaU2rnwT4isUeA%2F3mVTpyDWvpXUbpVxBiU4zBZi0QesPsjSq7MstoyGHOiLuH9jn13TL1425iAO8xD%2BfkHfZ7Asd4awUDXHgqC3FqSi495tyshizms%2FXNcTk9Ug1oewiDqRq6Mdt4ODxfs6Y47bZrXcjVUgevKnpVsEWw%2FhUwgYxB%2Fb79WtnSVUL%2Bc8GFNr0T%2FK%2B%2FYFhgmF1jCLWD0fmYPIbPUdhA5zzHVrb2Q%3D%3D','2024-11-18 16:00:23','2024-11-18 16:00:23'),(43,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731923325933-65823179.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=cplavJUbSgXmPxXdicJ7BbrPBYqLnPkNum0ySui0NpPBapMFKMXemvHcEfxkOlkQDSXGaABAwh9JNo0iJKcv5USvHv%2FTlFhf1eWD2mbdhK7%2BLmmuvUxc3doduJr4sfG%2BEdV1lMT%2Byi6h123V3JclVpe8MyJaVTrMNuFN8j6oKTXqRovT%2BciKOIPuoHA3BUgTc6xzlN22GZjjOKLbWm9SYO8xwiIifI5NPicVwM4vhZ2GN5%2BU8XtcxhZwyJQA78aVr6R7LvU7Zr9kOolqQfQlLLXcEI7Adurwuv49NaaHrRoAie7ItiDYuUrgmViZCbcOAC1XG4DV2AI41J0JXjwsRw%3D%3D','2024-11-18 16:48:50','2024-11-18 16:48:50'),(44,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731923326484-66607451.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=PoeHItBG%2BBUj7UH%2BihepazEPdshbjzmFbgltPM9X6hYIIx50gl3pzAso1QfpkI8wfRUf6ZUALZ3di8VINW3ZJxYJck1yFl1fTkTuDtm1QJYBvVSFJHxQTX5a9ve20mQA9n5kGImQvbHq3a7N%2BLI7NyxpmrcOZ1%2B6jj9ucoU4Yu9bLldn9Vg3tb8IXsbJP8DA73oeBxRYOxUYHQmlMxct%2Fi%2Bm%2Bo5XjChgLYnN8B6QU8vuFOAyROH4YwI0%2FEDdOydF9Kn%2BjzvVUEIXQSPA%2FaxSGx%2Bf1y1UsmwlyJ%2Fmd%2F3mCNJabPbsAZbu3MFMzjidEuXuGT2jcEjJJegwSHXbMLzgWA%3D%3D','2024-11-18 16:48:50','2024-11-18 16:48:50'),(45,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731923327158-51412687.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=5np4zUhSLejTa3rm2ga3q9izZHGMZ%2Ffr0rcfJ47JoBzxhvGUsGKaw%2Fn6Z%2BkueB9hxL6E%2BhmNTXj0D1WCFJRrKTM%2FgsLLu6rIfLoM0peAeIpWApFTceZFpqCv9uKzQIS%2BKsi%2FUO8ZKM%2FjFYRoQ6rVqd4bDVSGd5Uaq0Sa11UmH%2FU8iZ0xw6wriW7jHFo%2F8nTaL%2BYkWbvlFRo0LVO%2Fu5%2F1egcDmynt4qlYhYVN%2BKjOtAsT8eAtedEiFp0yblIw7S3rfe8DrewwV8sikFSC%2BpksDCAm%2Bmm9leCx9yOXcRRlzrWEgK4WUWw15AYbOyu%2FnsKdR%2FxFW44LTtcOQFCf1AxEWw%3D%3D','2024-11-18 16:48:50','2024-11-18 16:48:50'),(46,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731923326047-55914976.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=KX8Ccez866RRxmse3GhAyT%2B4ptKjZPFw850N3xBzNfu7ex8m6hWthAiMzkhR%2FbIKfVsJxF2f33SoGTJ%2Bk4HgVmjFJT4ymNzSujDgc6d%2FGvraEBncoDrz74OWFF4LRxsO283mjk65fo4Rmexa2XyhEY3h8mL3NpEH6Z%2BQoa4p%2BDCz0qWr0Zhf7ZbpR4%2FuAhQS36AUFKBsNlBcZQDbnqaWsEI3LqN64Q4Hli2N2jIVBXd2lNFgN%2Boozxlu79TnjnyMQmYajGpw95PyWJJEaFtk1x8PrGcty%2BQfndvg9O%2B2CwOZK4Ruui3ZArsw7XbSfQyInEMhbN7%2FSbTdEFKgt10nQA%3D%3D','2024-11-18 16:48:50','2024-11-18 16:48:50'),(47,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731923326438-94243671.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=6Bnj3aMeoWSIHr%2BZ4YhyazTwmXgtzkTpMs85sOwUZ6n6tdyYAWhTnes7FSTa0lyCpXkpSOV00jsDv74laprP%2FOjSuEe%2FRjbEBFa%2B5btmFDq2lrHDcAhuhKy24iogPqb09ugpY8g0x3hHWCoS%2Fz6UuHomy%2B7O03EZTZczhta4bCfbS1kBa%2Bk4Xbpa1K8X03cfgKbHy48Fn16biOVD9cm9kxEByEXlcNuINi4%2FegVwBnu6SE46ZRLFUv6Di9012ZJvi7MUUx%2FO4ieHzIHmfUXcbgEoohziyzcr7tYBgDJ1AQYmHgDOx%2BWi0yPdojdk6XdgSgCOAeuFI4OgGvEwkP7nVg%3D%3D','2024-11-18 16:48:50','2024-11-18 16:48:50'),(48,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731923326239-65823179.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=HcaEELg3bpPjHKizazljek924%2BSDio2froUAi74eoFKXONyH6uzhyGvA0T4hqAdpKVO5jANAb2KZVFiBn02pfdqe59MNBTIa1SqJcU2YOGQ%2B80ljMFz5P3VEBrxDQEvCROMW3nQD0UBWVqbRr5MmtKHLd3lcBrYPA97yPimseDxVzHqxsadvuTLwnJSeavCMMT4mHu1ssYXfkTxXpo2d5XWNk%2Fp89N36l1sT6RHOM%2BGChFYc1bKLHi6VOIM2n1cA1y6HCy2PjueISQUP5Bk%2BvRaQpqyXq7xVjKm4QrdcuRZYvXtRhKvTuQpT1ls8%2FHHWS2%2FweIczhKOomB%2FZPzo8GA%3D%3D','2024-11-18 16:48:51','2024-11-18 16:48:51'),(49,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925844064-eco2018_Test01_0212.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=tIF1aU8urrIamsn9K9xKpoPRn9ENPLpuUviLgQhCY%2BOw6z9X1hshXlIO1P8RSv1W3XJHNFy%2F6at3Z7ytvp7FceFgely2yGfallszJMz%2BtaMeHMQXbGbcwPvqbzw8XtfnsKUouC9%2FQcykcFH1rzHu2Y5aweXn02%2F6WAFefXVw3BhxAvBWprBA8A72V%2Bj%2FVpDVNG8MAvPu6Htn2jiZ%2Bg15aQ2qTArEBxmzutAYJVzq0DHVOh1OzjzTpMHrWaJ1fdnTC1pujXtP12kK372Dw5R4R9wnM7JBRccAopAvGYCa4UaPlfPibol%2FyYkjBlqP5ouIQuSYq7Rx%2FCA8Mgm3xi5gDQ%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(50,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925846318-eco2018_Test01_0225.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=PiYCznsytEIqaLGioPbkig%2FYR1RhpYJpI9RZcdg50uMPgxu9x2PkVMRMDDVcyCcnUZ53pFDSq6G7zmG%2BgfD8CBgGfV1OeYdK%2BCIee8BdiKJ%2BWOE%2BtFo8RNosJUv85DgHIDNbxeHTdKltVCdND2rgr2tIFXT8YEOkkXzGbXevK4Y%2B04pPA1rkB8Y3FO3oXG4xKMXHRTBmDk2Ko17JRA%2F%2FPyPRPi1SWoXFyiotYHyqDlYI%2BOu7q2Dmb0GUgKMHDTldMO6uRfXskFa2co8dbW0ZeVK8nuYgIS3bEQwZVnWJ65N31JtpBdcV%2B4BZkpxPzX1ffhU5vOWf%2FQfwAS8NPonu0Q%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(51,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925844547-eco2018_Test01_0217.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=YLbm3FAOko%2FS0CgeKZc181DZXGoB8yvnM1PG8rUCQdSFHQN1FjEdFAbpztt3j58s6KKh%2F7%2FMKMGW%2FUwyjkhXeZIKD%2BwH%2Fze5cYwebgWOlwuRKeawqUCA1fQykf2rAAfIZRZ%2BmS%2FHszi9wbIyZa3tixPWd9yq1OPJlNihtKUnJFVxVrfWo638iATwEUYZk28UjMiXSYbVSW4ZXcyyYwSeAbmwrYZsHDSOTi3JwFZpbJs4YNotvlkSn7qujrSjaaiH93EJBjcTd88IqfbrJxbcvjI4OzK7DSsteJdCrBVLzaSPYRli2DvcgbCz40K%2FawkfJ0puPp8sAURXM4Z6nENPzA%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(52,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925847460-80079662.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=vXBlbu5F%2FlxRnsaPUhELk8x24LfKfwM9ZUtrAcqiA8YOqf6tuLN%2Bvp4VfXxfs3L88AwVFTRElitzxlwDct4AenZj%2BMcc%2BYpgqRRoHqLfQVY4PITNB2Or9Gk4PvyBQzuKiNfWpeJ1eRj9fPMVks5LfK1Im9q2vcn69uf9j%2BxrzF0jI0zkXztxKVu3vt1KWgGHyMDvTWfiDil2ZUQxiyArdfNWwTGy%2B7zO7WEzuNm6vXReMDxfHjVvqXZYcBsqPp94odLVOT%2F18RoLiTuICuBnaOFkDaX4aigiLb50%2BMRZnoIZtOOV5QK04wZqkVXTijoJCUd15uSTtgI6coDdcWGVoQ%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(53,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925846078-eco2018_Test01_0203.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=yz4R3ct9hMluL6qzwMqp%2F5CKm5NGPRXyQBOyi4t5HWCkfe3hZDXIv3DoyiAtHS%2B3OTaRWnB3KXRNMi8TowTVSb%2BeQXLY%2BlDuosqkFw3jBEXJIYdOqQr9%2FHSbz5f4viT%2F8umucLXazwQptxjpZA3n0ZXvuY0nGVl%2B5QiovFivmPAbHw5%2B6GMqgu4oMBh3Nb13fgYikVjgMWpdLCSB6nD%2Bi8gGV5sZmt1bhti6ePYz8LBfRf5XL3M2v9CHyAPXi4ibGiR0WPmZR9sREOuLF%2BCilzlM68j4JuyUE1vWE%2F66IQZU4N4f8%2Bki9S9OcTH7UCeUsoZ%2B5xANLA%2F8OdlFj%2BNpQg%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(54,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925846336-eco2018_Test01_0209.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=knoqTfgoaVluJOayKZVJs6mJyqOSriVIlPGv7Vhkyo5lZW6dvX3Ip7WxTNGmdWFlH2uhLLmfBKFaPV4oaJNP60MtmwkTu%2B3m%2BdADAARGcOf85nq5G0JB7ymyv%2B6KfQ8cKOA062ugFYLsDxg3JOcFyTHkjJPvNFZsFVGYLtRQjzCFBoauKbfvtfYAw%2BytwfD3bGtJcD89hfoh0XG2H12TDEt9R1mkinJqJnK11rgbeYUS3jsG3RbvVoQ0cAV%2FEHDsnsbkSma1Xs7MkfNoBxWj6JXPmSq71vRYx8YmztY%2Fwli10eKTgpJr99fOoGOtQOsECxqaru9ZOtF3ptcflort%2Bg%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(55,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925846154-eco2018_Test01_0211.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=3%2FHpr2yTMn7h9bvGFzCFUgAMnxoIyBt%2BiZOdvlSV7Wlifzzx%2BP78WMpVtPHGgJ8fV361RNV%2FevvVX0jSJdrEzJMlmIj8B9X6b508jdzr%2Br4UMVbpMoax88sWNs6JJKKD57CznBPO%2F7T9kifggXhFfGQ01YqYqMa%2F1%2BrJr5EVsYqSEE4c9ijMTQStApMTcx5ML19fAS3QF%2BDQUJ4ko%2FEutsqHcY7sKIt0%2BWuMwi5KQa8i6SJsGrZiyaKGfrZ4%2B0sxg7I0V56Ic34ldHc2c7GWA0Ib9KR69pCX36smnvKTaqN6U1dVR3mElKwb%2BD9S9oIELb3QPw%2FHvwC8dANv4ZH%2Fww%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(56,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925847147-eco2018_Test01_0208.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=0S%2FtF0%2F%2BWkfKuP%2FUH8i8Z4cJw46FRMHlvrcU084X4TVZh9R67yF0fQfmDT0BUcSk%2FSOy0RnlLKTnBO69HxdbOWjZ7lqEK1nA1TTcM1awJkAO%2BjmZk9SjGC8QePins98bb4rll2bltk65eWmY5bVIhI3TyRN8rcfBemeRXdfZmX6Yl%2F%2FHLu0TOgLyzWB5yu1mFPz%2B8RQ3MJ6GwW8%2Bribeh%2BnZff803dOV6b5MafBeH565oyYyoNQ9VuGrrWFZimTa%2FBowuNPZVaqwN7k5tY%2B44Ud8DAEZkOhalOrCFbhIkrtncgez2sg2fz7YSHHNAF33mJW%2FVnuRhUwMmwwmcHAjmQ%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(57,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925847656-eco2018_Test01_0224.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=7F6COFHxcoRJ%2Ble9Yxi4WnxYvK9UTBZDDHqpiLIwJ3EBXhuaWXh82dsvPGNdcQ7%2FWuYz2YqyTRu1IYf0EFWCuw6dZFQuHXWcECWyw7yeXCCflO%2FAGL8CNO%2F31EVJ4AurTV7ifcOsBv4U30gqMcLAxXJmAfbgwyyQ4XZfD%2BBeDR0SRPnK6lZiLoNN6obl4cuEuEthjEsfcLB5ewa4JPPmJRrrr9nYnVsfUbLJsYiiM2YloMXQjvCp5%2Bapu9WGKrxgr3eL8aJyXa4mlDkSKFg38MRGb1gf09itCjohA%2B4PQ6Q3qfgV7kMc1zEGFZ%2FiZlmDeMZjTsprfnKw%2BHdONkqEDA%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(58,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925847711-eco2018_Test01_0221.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=Ruy0CEiaEAjfFhUTNDMhpPXryXLrcsDe5BISAzX9MKO9jh8vLaC0AIRsjY6uz7aGdo3%2B9bEcT4RVaqdS%2B0K9ICKBKGradAhOKR43oiYgN60V1vtmSjAcLuo%2BZA4zgmdOLsXtfi%2F8xAwihtGPA3LFXhX2DGoSUs49MTSXG5FnjTfK7ArQnseuPKq4vYQCZ3TOdgdjJvX8ZkQ9hMxS2Imt9T6Ou9SBrdZ%2FQZpUIyr29OrBSN9AcN1FQxFT37JX9xpGIZdUmdsa7t0kYetw3tDLJ0XDhmBiMOL0QaktSrClIUcaGOQE1YRTe9H5op9QBdpFJJx3LeByPJ1IU7dmH%2BTdAA%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(59,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925849010-eco2018_Test01_0220.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=80RV8f01nIaAJTNhIs5H1d6aq71gHBJxvBiCDoIi%2FNtpjhzz1psqVfZIKl%2BafyALYR0uEvlG%2Fjun7CVYbUBXl0i%2Fbrc3%2FsbEUrUIIJiwvdGhWpqmdDgphXZ0v9giCKxvSH9y0fhVOTvRagVd8dcMvf6WrHjcPp8HwRHiC4Gw0tH8%2BWlzqPQl6KjwDLaBFLStvGLOimsPaNLL7rFanVLPwR7mhsKryKnwS4Kh8WK6tgWbQvZGM462Xu97DKKywipuo6UvBitlzb2TBtH8Yb74JRISFUUStznEgHfFhLlpEPmFwdyq2bAJp1Yr4nTUK167QnPcjc0v82QHKvl8ynECpA%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(60,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925848680-eco2018_Test01_0202.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=RDCM9RTfeHYObnGZY0s73bn2iXTArRbselRzCo2nlxFwJdmwRjNQ8MXkRSfQCwyvIePShKpx%2B3DXJXDz4EGdZYJyUyJcymt5dn0ikq9RR6jDkjR42%2FTswLI6unTx6ckwWnTQv5YKAjGZ7lgvlb3ERIkxZGUawMHCrOOdVDY9fWFzp1oi8CTZrxPWCM7qEkgKl4SDVf5V4GqJ%2F1IkbD%2FGs8pVx04CbAdd6cG1joFxqVFT0Znl9EwxWL0khxNkNKWDqhf4KlM6rxMyYkdf3DWi59smpGXSdN0odI2eQnxh510ifIHnkX7nTlQNppiuBT%2F7BHu%2BJ9NPiPTN4QBPuyKdBw%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(61,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925849511-eco2018_Test01_0222.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=Fvur9OMAZhOLlc0%2B3x4G3mtkxHlcePbTjFon7HoQyn5GbFi6drd8ZokK1As1vl%2BlkRbwEvww0bQtemdm7BVIB5yHScCnd77sHgH4rgVW6tHckSiF1Jkn6DBPCmn3Thrsi1AFfXZtPOI%2FjrMZaoNhWutBP%2Bi2YRAj8TLCB7fJ9pHpld1Ik9hytPJ22gsthlSAfsuEmRIP3hFX8Az5eQUySqH9sO%2FjyZlJEhyNUDKUUBMZ5FiKdAbxNyMv%2BX9iXxLZ14%2BJV8KDdOe16hWpvqs7c6urV%2BRLuqpxvBnrjEZjstW%2F3ZJAlz%2FIVURtK%2Fd2wMJ8Bkaaiktm2%2BWSgi8MYnml1Q%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(62,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925849059-eco2018_Test01_0210.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=frG8TeYtUdl5xODXGupXkqWdvsxKA2%2BMoXDn2CPM0QWYBQdzg1pTGatwdYryjZShx3g6hxWRNJRL90qUidrBGapkhk0x5ZG%2BTVI86fO%2FvIzFa%2BJ8oK2%2Bx2OEIgajESaqsxRN2HTJHP3SDMumy6cctXn0ggOFlJZIsWzwNHB95Dqb8IQC12AtZzMwfstjX7RPCnBZAH4bfdoaU30b6YSV0ag%2B0jzqo%2B2tmbdRUWOLOyvI1KGCJgL5wNnRB7MPUjeYaMtc4cyUj8OGqNdRvzUoazS6ywDwY%2FtGi5aSeQtew%2BFxKpzHhiEG4tCw4JkrGMVBS90mRF39WbrbQ9X8Jc4YRg%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(63,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925849204-eco2018_Test01_0223.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=gGQbC%2FA7AjWiKkGu5DPZNTmIIhS2OVWFKm2tHr4j4zvlS4OdrNxANsNyO0iByD87jvO4KExW%2FQTH2978MoNlmyrNWOcQheLYlGxbTRKPoq4WFp%2BUp%2Frbcx28wWyft5qkwp2hFYWT1Biz%2BE1coQsbwBxUJnBLqm6F3v91wFlOmZBvL%2F0n60VMcD%2B1VTDNneK%2FHK47IW6gT%2ByO3hXrcrZfWVt70YfHGqEKgYc9s6ZnrfPAPp5UhXQkcLyJxpq%2BpSehwuoNLWrp4TNb1i0%2FXGm77T%2B6v8rkurp1oGoWIdIX%2F1QoVwCYa%2F%2FqHvFpJoWFJHy%2FuOBoLEd8hmBnSeuq9B2x%2FA%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(64,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925850334-eco2018_Test01_0219.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=Vo6fkW9HQzTYQJRROTR1AYOFAIQtQoY5ERlAQ8%2FwjhbXXxMbHpER9Ub1DuIGm9PTMMg4Vb2DucfayH9c5kWdtTPoJcqBierjW4S41FbHbxlUV78WMgP7tx4iC7lTohku0MD2mnT%2BsI9a%2BFQZLJNzbPC%2FLs65FZptmz09IrMaAiV5zvgbaROCkjwSath1JWufqCG%2F6Tno0pPlntYM%2BEVHyLG8%2BM21pCwv5fIm0abzfZzjY9qmgpIU7XGdiXqoFCZ6GCjaR4Uuw5TAAQ%2B%2FIL%2BPX616N0R6DPSqa%2B1Sm5H3WFh%2BvGJKfnA2llOHX5Ip8bFs9RQsNWkKzGqQksJ2Gv5EjA%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(65,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925850142-eco2018_Test01_0206.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=VqPDFgN6N2bTctKSZU6RB5FbDYqSsBJslgWy5ckXM5KGK%2BLa7UIAvOuICH6d7Z9W0cWWVwibhPmWVV5xVnsPX2DVuM3iQd7l4WpIdtFEYo80Rxazem8JDY%2FLIL8pgA8xoSztCf2cG9YPM%2B50YXuu2i3uh9W7gDBbuMuRYJ4blW3ES1YL1eWirTGogwohuTWfCwZWQBD5lAVaumq6%2B%2BlOB6KMFAoZbVdD6g%2BhBFM17MuHC%2Bjdxu1Iqf2LD5%2FEM5rGNtaveu9G0rpq3CJNYqIGhoEciEr7eKfbMiLADrGKj1PV1ewyQVxDYgZ1E85vPmAliqm3MPO5oybM%2BfWUK5CLFQ%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(66,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925847832-eco2018_Test01_0207.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=uqU3hMnhQF7Y6CpCi5%2FbElZB2wTDtve4Zx9Ff%2FNbXe0B4ge4Q0fzBanstnHn35BaT2V5u%2FbAGydFY0kqfTDDdjzrfr%2FgV2iUX67dxdB1iQfdEfchlFxkelzzCqfnalkPxgzbQuGUemODe3cuUPucS%2B2Vyhfw4hfpy98Nmrm7rB%2F99Ku3U4W5WE2hUr08tzEyQo9nQFXm20H2vaf%2BGxkpf04lGvUpraU2QMfvq5phTkdXkkftWl4xlgEnf5OGBzER68xQqUNY4q6%2Fm0BXZALpJbXwgiYax7q1ZPx9bWeYiFUKO4LZrW%2BzzlALwLZ6SqunVOepR6%2B3cabyMqewUc1WDw%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(67,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925849238-eco2018_Test01_0216.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=0KBowAXoiFTGuVLoja4x3S3K2AQwdVJqjox%2BjWkveA2oo777LGnZ297Xvz8mvW1rhog4ghKEEWBzXD1aQ0lZneaQYUdIFF%2B0JSrm9P55RyvdW0w1xNp7YRPbWlO1%2FHBRPn%2BvU%2BjXEmMhWc5W9Dk3f4leyXa4pybyFs4ouweq0NdBq1HpE9KDA6j%2BSUR1CfE7CQ1jzBxVO6NI9eEkOH%2Bo5UnZBMJVnptf9s8ZOFofBs%2F8O%2BvdaM7n2a9GO4qZYrJop%2BYOVXFBY0gI6dltZNouo%2BNhPzCqISQJ3E%2BljHFjXOYaAyf07LRO6gk7HQbNyRvTEBek7sd9WAXuz2T182arwA%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(68,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925850379-eco2018_Test01_0205.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=2WMOpD5Shd331lpvSvKRPeokJGJouEI96%2FcBtm9pKns78RVcak027LOWG7QpJgYO6nMSKsfGVYN2F5AlqDZPWXlsiMAV28RYO%2FNMPRUydlsCba1N7rRmGLA62FigIiGR93ERoHI4SQduPPiL%2BzZrOZXvyXjjK9ku9dx%2Fa0OFOf5VFp0nYEBOT7aojaA%2BeQQskNMJPTFNguVdJmQT0uCgcC7LvhtXt04IOBmaR4S2ylMUQ3m8iDdC%2B%2FjgeK3wOv0YJ25bTiAlfs9xZivj4Y2IaYUIMfdxSD8eLeJCR0zhTVoQxYSyT6oUwVV9vebxAdj6YD5EmqNbE9ukfs5mbSDOWQ%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(69,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925844412-eco2018_Test01_0204.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=TujNvw5no4FfzKEj6zghwuw6bpksXpP3F7u601zHcqEKbFJrlf0tXmMo2TkfUF7L8uxLaif%2BObP%2FvBXdibEmZRb%2B1KPXa%2Blnkqgkn4%2BvXwxEfal%2F5sxoDXo0jvS8bFN6jOSvkIJ5ajQDJ7MDA9Lw0%2B%2B1i7ogqYMguVnKqcOff9ZBGFlJvbvogsdrbP8ppkrLT26CCWeTEWRS8cU6gVyrvgnTV84tFa6O0bAppxXDXOGdM7Wk1z1Du72X1CA5I%2FWuibhozykAJ3F6LobJXaKb12Bgqszk3a2m7NxqYeZ%2BfIWdQ9fnYvNXhKa4ArslODfgB6paURtZ29ybiDqxEaAyhQ%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(70,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925847652-eco2018_Test01_0215.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=cDeNQrT%2FXFK3f%2F4ZtT8wkJLJ2jNEC1yPsJdVVzTSNrgl6V%2BFXrNAm4rMHaxyG5x7X7MzWN6Z%2BQtBvnKy13AKZlUk8%2Fvdr4PsQgwHPvsCnW5ptIhgwPHK3V6Z%2FmWRJAQoouAREwG%2Fpe46I5d7gVWu6%2FgFV3Cp62QojIdYsrtO2O3OjJi6zX4K5A1aisouXH242A9a%2B9E2R6g3xd8vlSP3cYKXwILsMQg4zcrUO87s5ZFPEYjWJWR%2FIH2ssn8Fc%2F%2BYKlIAqI%2BnI2uipgKYZaQfcii5mz7bcOYQwJ%2FosYadecOQelfJWGICQw42A4xAQqKOX%2FW4ELUxO%2FclAUgtUz7g0A%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(71,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925844494-eco2018_Test01_0214.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=epiwznXHycmJc6MburLN7874wKSI4fEtSI2i9bHt7mcpPVNoyH8fTwwLQUM%2BGlc0RrAxYKOZNTCTT5VPNBV3DfpoExgVc5llODcsvPBHsIUGVY3b7RgFUVyp4cpEfZ4%2BoZvYTG5gHPlwij4EBp6agQ7whtABVnaBaiDCFlT4W4mW7t%2BZp88ielXoJ8x%2FTWvRUeB1taWYcOzBtAd1zKopoHF7U%2B6H1tM09enBF36NfB4SolIU9V2SXpzofQ0FH8%2FS%2FpiK4jvvvPilbE5eW0kKaQa0zT9n8zhezTBa8lfGfEUmR80jom4k%2BBiTJ3kCTasJXySj7R71hN4Yhq4aiSAHAQ%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(72,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925844385-eco2018_Test01_0213.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=chcx6r3ofH6tbEFx2ClQnZaNUY6U7nCuK11NCefwggTlRNy52%2B7%2BHQOWyxwdjHCeMvfmX7Yd%2F3TauCq3bIg1QrAAJuFX0dKUg9A9%2FxuXQa%2BTNymsmAmVRHBmMplY6lj0d5996gqysHWMSAh%2FFhH0cQ4cdyN5S%2BfX2nkaeQcVbIvR%2BeGVvwcaiF5%2BTriLZCp%2BHrggclWTLZKUtbCc%2F%2FvvOdnDt0q%2FSImVVHf%2BS%2FG%2BRjwLDzs9LEq6wVMkqCG2uJI9sbsDi2ADhv1QqcteYVko26OK%2FEmt1n7TFsujs2YA1SnIkHPjYunb0Hcej3Npccn8nN%2B54l%2FzeOhDZ%2FQcYzrKJw%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54'),(73,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731925844390-eco2018_Test01_0218.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=MxxI0pjJEP5JtBNYFgj4vJ3VWGq9yMfQ3BCJ3Lg0bfLUivHu7RB3QBTLAcRmgwsNTm%2BS1S%2BRlzkKq%2F88WhmvKyE8337AkF1LMKr4T2NESu6Jr%2Bkd3DxDxeoblbIglI6uTlD0V4PjL1KHydehB3xbhxxtkPHx8ZBscsyS%2B1Zh62MAy2n%2BCIkT%2FMBt15KNimvM7PGSUHUJDrLwbowFQPiWCQ00H6z4cKLcNKjsIZ5bFArXdqyKlcVGumrxRUe8LHv8jtCD0xEySHsUqdSkaQQNmAfxaCvm7OXKkEK6LHEVAgGvKemlvI%2BQkQ0ITARMvnKPRe2p0OkJqYCMsfEynm1qTA%3D%3D','2024-11-18 17:30:54','2024-11-18 17:30:54');
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
INSERT INTO `CorrectAnswers` VALUES (13,53,NULL,'2024-11-17 19:17:14','2024-11-17 19:17:14'),(14,55,NULL,'2024-11-17 19:17:14','2024-11-17 19:17:14'),(15,51,NULL,'2024-11-17 19:17:14','2024-11-17 19:17:14'),(16,68,NULL,'2024-11-17 19:17:14','2024-11-17 19:17:14'),(17,52,NULL,'2024-11-17 19:17:14','2024-11-17 19:17:14'),(18,54,NULL,'2024-11-17 19:17:14','2024-11-17 19:17:14'),(91,223,NULL,'2024-11-18 16:00:23','2024-11-18 16:00:23'),(92,229,NULL,'2024-11-18 16:00:23','2024-11-18 16:00:23'),(93,231,NULL,'2024-11-18 16:00:23','2024-11-18 16:00:23'),(94,236,NULL,'2024-11-18 16:00:23','2024-11-18 16:00:23'),(95,244,NULL,'2024-11-18 16:00:23','2024-11-18 16:00:23'),(96,242,NULL,'2024-11-18 16:00:23','2024-11-18 16:00:23'),(127,367,NULL,'2024-11-18 16:48:49','2024-11-18 16:48:49'),(128,372,NULL,'2024-11-18 16:48:49','2024-11-18 16:48:49'),(129,378,NULL,'2024-11-18 16:48:50','2024-11-18 16:48:50'),(130,379,NULL,'2024-11-18 16:48:50','2024-11-18 16:48:50'),(131,387,NULL,'2024-11-18 16:48:50','2024-11-18 16:48:50'),(132,384,NULL,'2024-11-18 16:48:50','2024-11-18 16:48:50'),(133,393,NULL,'2024-11-18 17:30:52','2024-11-18 17:30:52'),(134,396,NULL,'2024-11-18 17:30:52','2024-11-18 17:30:52'),(135,403,NULL,'2024-11-18 17:30:52','2024-11-18 17:30:52'),(136,400,NULL,'2024-11-18 17:30:52','2024-11-18 19:52:32'),(137,407,NULL,'2024-11-18 17:30:52','2024-11-18 17:30:52'),(138,397,NULL,'2024-11-18 17:30:52','2024-11-18 17:30:52'),(139,411,NULL,'2024-11-18 17:30:52','2024-11-18 17:30:52'),(140,414,NULL,'2024-11-18 17:30:52','2024-11-18 17:30:52'),(141,415,NULL,'2024-11-18 17:30:52','2024-11-18 17:30:52'),(142,422,NULL,'2024-11-18 17:30:52','2024-11-18 17:30:52'),(143,424,NULL,'2024-11-18 17:30:52','2024-11-18 17:30:52'),(144,420,NULL,'2024-11-18 17:30:52','2024-11-18 17:30:52'),(145,428,NULL,'2024-11-18 17:30:52','2024-11-18 17:30:52'),(146,431,NULL,'2024-11-18 17:30:52','2024-11-18 17:30:52'),(147,441,NULL,'2024-11-18 17:30:52','2024-11-18 17:30:52'),(148,435,NULL,'2024-11-18 17:30:52','2024-11-18 17:30:52'),(149,436,NULL,'2024-11-18 17:30:52','2024-11-18 17:30:52'),(150,445,NULL,'2024-11-18 17:30:52','2024-11-18 17:30:52'),(151,444,NULL,'2024-11-18 17:30:52','2024-11-18 17:30:52'),(152,451,NULL,'2024-11-18 17:30:53','2024-11-18 17:30:53'),(153,449,NULL,'2024-11-18 17:30:52','2024-11-18 17:30:52'),(154,456,NULL,'2024-11-18 17:30:53','2024-11-18 17:30:53'),(155,458,NULL,'2024-11-18 17:30:53','2024-11-18 17:30:53'),(156,462,NULL,'2024-11-18 17:30:53','2024-11-18 17:30:53'),(157,465,NULL,'2024-11-18 17:30:53','2024-11-18 17:30:53');
/*!40000 ALTER TABLE `CorrectAnswers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ExplanationTexts`
--

DROP TABLE IF EXISTS `ExplanationTexts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ExplanationTexts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `questionGroupId` int DEFAULT NULL,
  `text` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `questionGroupId` (`questionGroupId`),
  CONSTRAINT `ExplanationTexts_ibfk_1` FOREIGN KEY (`questionGroupId`) REFERENCES `QuestionGroups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ExplanationTexts`
--

LOCK TABLES `ExplanationTexts` WRITE;
/*!40000 ALTER TABLE `ExplanationTexts` DISABLE KEYS */;
/*!40000 ALTER TABLE `ExplanationTexts` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Photos`
--

LOCK TABLES `Photos` WRITE;
/*!40000 ALTER TABLE `Photos` DISABLE KEYS */;
INSERT INTO `Photos` VALUES (13,13,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731845829518-3555841_1562638435196.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=PeI3PQ9%2BbM177O5DfXD2JyK2lb4Mi%2FDqXeqvuGrUErHiAZu54KqHb8oOdW88PY8YdgJU1AK1U5kNZrvStD7sbGj07mhIjOU9vo6B55aADHwbBXdGvbQO6BEPcg6tn30V%2FPx%2B%2FoQwiOg9Ker0oAOV9icX%2FgFQtVCnyaug1Xd3CaHDRQ1lG9jCsEOAK4lPW1dzIUk2lzMyhUuWWPY8wU2rYtKnEmqqA8o4tzCj1VMJZDC588%2Bvsll4URn%2BggJUqcCIhTfnG%2BisFK0lslmhL2jgGF4kfGO7i3W9eShlO%2F4poFeSQb5QStxx3bpbNPl2MzsyhTvnwfz6vzhcyk%2Fz1qNsQw%3D%3D','2024-11-17 19:17:14','2024-11-17 19:17:14'),(14,14,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731845829660-5911589_1562638438001.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=VPJhuaSUYQW%2Fht7TA0x2IHdfY505Oy%2BnFfRfe9fRHqbv8JhBo5RKhtIH%2FgGVAY2JDlxxOp9NHMOliMabOkzGBnlEs3JdMc45TfFnk8cNffM1liqKNn7mF2FypOOtP2hL6v6iSF%2FxfFiByq7Xuh7bJeGKM29lZnME%2BXE2ipi5nTg1JBMl5KjLOONU%2Fuf7cao%2F6hNS4amv8nO%2Bj1x3E7hI5ITPg5Y7i3H4XuatM1hQgJ2Tp1LRkkmGZTS%2FMg5kNz5STceLbRj7CIO6LWL8GKeK7aS9T0%2BGh3SJe7sJ0sLW%2FLCzuwS33oOtpHARdjzQgST2coBiq%2B5HLvAYPSHFgbFOQg%3D%3D','2024-11-17 19:17:14','2024-11-17 19:17:14'),(15,15,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731845829837-5656089_1562638419203.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=1MkJeX8sly%2BlDRIhNmjG7fVfU%2F8vNmvrzVTWJpHf4Nwd5EJEspQo8NsDJgpfgJnWWwHIKf4gOyJvhIFRULEi5E9bS6NQGUaX9ft%2BLvQxWeEkzbzYz6j9%2B1jyTxlbDAflQbTbLOM3HcLmIRtCx4B6TR7jYSCVO2AGyoTxvHRtbeYIwzB966M5e4q1PnI6WFhhzOmQDUEf9xxJJuIwYvPExyxyTXd2Suy6tbPd0kLOl6NrClhgv5ZJ0%2FDpmMTdtMiizWlCuakQ1grVbAhEYoHOFgbtWSNKYPtj12jeCztUqdSTlbhmzYCsWNCQ5OmbLrLeNOJy%2FnTSVLPO3SxyuBH1ew%3D%3D','2024-11-17 19:17:14','2024-11-17 19:17:14'),(16,17,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731845830036-3672944_1562638433179.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=Huo%2BoWyyoroTYEM%2FkPw5yOgjZy9u%2FGbvPePiWxssUY9QlOhJG%2BTZSPVukCcfWRB9y9tV%2FC3esu%2BODgutBcBfcqnr6JHYfMmknPwLITM8dUsHp8mtd8ORJem%2BBxrAj9aNgCZGeJ6KuPJLTilQoNgneyY1PRwkfZBT8Y1YCydI9Dc%2BonygmAMAFWAONE1O42ynyCF6Q8iufqbiZkvSdCpELe4ybpZylEOJ%2Btrj%2Fh60eLmsdnuETtjVgNtONEKB3A28bgKUWpJq8%2BKbhk1KauvnxD823I3%2F3%2BzqvTT2i4Vjg01gpjW012lt1wL1MVsYAOqNrThOmYyhgQd645n31vV56A%3D%3D','2024-11-17 19:17:14','2024-11-17 19:17:14'),(17,16,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731845830040-6539040_1562638443130.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=Ixm9xz2iIuRuGV8AYlLJtJh%2Fy4KXrMe3XJ85GZ7%2Bdj14skeNGyN3%2FuctrOSNMYu0XQfHM7QkyakVV5vaYpdPbSVQeeMoQeHZ39lL%2FG76qOTNGjVvhPGB9OqqOm0%2FNsLcDvcoP5iG%2B1rvagfw29Rso%2Bke%2B20OILWSGzyM5beMOg9MBQsrUUGkj5Hv4iElJ9yEz%2FFVnJLBmJQ8ED1YfsdAt%2Bjr%2Fh6Oa6TRVc97GojxVNbD%2Bpwt%2F5Ez3t0Vdm3EYzLyjgKPsumc1SPw6Igt%2B6oINx5b6J5uhOLuqa4xUlLlvZiDGhcVJXOm%2Fpx4RCqeNSipgZflMOQikAEEnUtob8g5ZA%3D%3D','2024-11-17 19:17:14','2024-11-17 19:17:14'),(18,18,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731845830050-973355_1562638439675.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=ox4y%2F1rSK0uhw8%2FI9iaQVLM6eRV1M%2BhCpcr4wiXA4TKyvCUMzqfwQ3kew5Q1OxtRRDA4ViaDaYPpxcjV1evRbDC0HNZMJ2LLtK%2B3WqIH6f%2FVm777VdfOeomlHdFe%2BaPHiwVIAHZBFZHkDmstkUq%2FQn3XT78SsLrQajaf8l4RJADSpfsCvSaV0Nk7R7x8XEZ8%2BI7T9T5Gxnjy%2BISLun4DIFXdidSenxKVBfBbDQlX8GLaKJES6YdmBOJbXby5fVGv9RqwYxG0TlmvTTsEIs0qSgX3Mmjv5JdS8ti3ZW4ZCb5LeCO7QOENdHFz%2BLFi9N9jOZAEZy9yG2LlWp%2Fm5IZeVQ%3D%3D','2024-11-17 19:17:14','2024-11-17 19:17:14'),(19,92,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731920418052-999401_1562639751431.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=Y3zRJ8ILMlBET5%2BP32knpE%2BLc%2FPOqSXy4Vya%2FeSLqllXJ9EMvp3wo20qJYWrp6wFLTBMQVsBWuMVydv7L2f%2FpruLA2j9VNlIVf3K9PnAa0O2gyygYvO6z%2Bhjid994i4VajdMuDzhoE50vYlX7mELfloBggFBe5oSBYIh34Nqp4NuYBEe8FK2A0%2BSZ6AvS2QsNTx2rgQ6YfcSinu9OsHLaxle1GjunxNl%2BG%2Bz5S4vouq4OdnvN8%2FvQtNAtKsHosMRRzqjiyol6wRrOVK6EcbYujAxi7LCW%2FgmXAxHS2n4CBomzyAJYXIYAjykVLkdrc5zRWMRhIuQnUBf390gVcUlPA%3D%3D','2024-11-18 16:00:23','2024-11-18 16:00:23'),(20,91,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731920417431-419301_1562639748639.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=Q58pHv%2FvsAEFD5ALPnp8OLjiuL%2FOVQtyL3h2jxVT8i1Kf0tDLNvpA4O%2F%2BvIcFCAu4lYzYq5Z%2BcsYv3v%2BA8OTcLXgEnVHj8AFDgIeSWjb3k0Dz7689UwYsIhpmKGoRr3UjedPljZMRQyutcL2H9ZTBCSdUwa43WMjG6GQD3aCdkHqcIdUqT0Bewhrf8hLjUWa2H3qhNl6WLQOZeePmjUzEh2uB7vPOL2kuSc%2FHR%2F1uzz%2FoNTcUAhR%2BGcGPUBk5Ku8t2R%2BBYll2wGjkplbY2z2S01paXsPY1yXwzGFkEoNe6bRBcJV90qtsynPME2HJeeFk4eQKTae7xF17OmcaRX59A%3D%3D','2024-11-18 16:00:23','2024-11-18 16:00:23'),(21,93,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731920418233-634270_1562639747171.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=o0MhPE%2B%2BxIqFjn8wQsrFyAnNO6toPeUQz8QKLE5F4kzUPAWY%2BOvd%2FTAwZE9vSk2CWYQUwCE0BD2TLznIvNiItXakEbN0vhiCDi%2FY4xj8I5rvtfpLHNeT5poV%2FRf3SIiEDXl%2Bupjnvjqab7oK47Sc5uwDvB%2BNHwj1V%2BxncEwgbEQMwTl9A35MERDBRpfByXMseVKsgkeKnYqh3LzQqa%2BvWY3RXtyLbjWjc0x7TPUKoKGSzP5I1Gi1aRpuv5VMuvo1Px1ExFgG86hFpbR1v%2BysLXmRbIdO3J%2F4fAzlez0dUEus80VfCpYsb4IXpRMv2ayB1egEWgTcQigDuc2vlTJXHw%3D%3D','2024-11-18 16:00:23','2024-11-18 16:00:23'),(22,95,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731920418256-711038_1562639754172.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=pHMlX5exmCSqfZQO4F3rTG92zTlCiKlMf1aDlY3T8HlPCisEmwseQ6sHKNuLLuKp7I1Cc9PJnKsQQ51%2FincP6%2FcmA%2Bmeayy2qTenKUrI%2Fd%2BUHSd5CmrdbgLHqP2QzipEcGr4aSUxBsle%2FNxE3cpVQa6ze9Z1DTNyzE7HcvOfLdwUq7lmOnOoEdIdR0calUD2PHH0E6bYyMdpdfIZQj8OFaPrRWluPkFnH8%2FTTNeer%2FCP7RgTNnDK3kC99ikaqoqwOq%2FOR2YTaYP6MmZts30hB%2FmeJhNpQWLrdHs%2BlTeu%2Fq7Mq35fdi6RIr2D14Csc%2FhoDaEMC9i5p4%2FDl9jgLcXz7A%3D%3D','2024-11-18 16:00:23','2024-11-18 16:00:23'),(23,94,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731920418224-5270312_1562639750094.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=hzTrq8ZsFk2hiwYWT%2FvgaBCl8%2BR8JKjqYxSRRLLbTIax%2BlAbnXcHtzKtW%2FdwxbUYcMPO30%2ByGQGw9ldoQGYWJ%2FB8gzWCAEQzGZ7%2BiZjo26DkfUEK11moMswsDL7mQ5QMH%2BSWfvqwFIJ3lCpE6hWIWum8uizlvaI3TCesBLpUTSydSwfAUbD4uh3Yt%2BoipjF1e86SNNKHWgYWVcjggZVF7fqBLN6GXsdZOfqcgWJH87%2F%2BsMLUjzcklQpfOqYToh6uR%2BoPyVfosdkKGxzCGFHXbGwLZqddvQo5lvITp70swLpQi7Em3o7ipEHUiAezqic7GU6sn6R%2BbmiVBnhWxSWznA%3D%3D','2024-11-18 16:00:23','2024-11-18 16:00:23'),(24,96,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731920417968-2138816_1562639752778.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=5FPlb%2Bt%2FSoEV%2F5fBAOLaZYvmxDVp6ju8V6c2NaG23uldfgephjr1R%2BBDKuIhB2jKu%2BRy6aQP8tNRw4PiXOwxy8aA%2FAjseeRR69R6cxMLFc7koTa4mtP6%2BEKJlF1BVu0wqnPpQ8J4lsOD4McWis%2F94EmmL7JFJmPLJnzbgFOoxpEjt9CPGt00p%2BcGxYQUlNjMvA0dAl0fg5dhItDiMcVNS5XmKPHYXru839cZI213Gbet06lPeFTjazs4etxGzCWFH845bVM12zo%2FNe2lotbtYKfMCApO8M0jj5lTLmpvz8k%2BI7hzL2dTbu7jJjrt0NdciadivAsyoDFDFYmYlpI7Ow%3D%3D','2024-11-18 16:00:23','2024-11-18 16:00:23'),(43,130,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731923324465-3672944_1562638433179.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=lgXUbf5e8u9h3CNqx4YAgQ1047Q1z2pcXyqbvVmb2mkVBr9fjqtkOUq2IAtGwo3R3DxP3hu%2Bkc%2F0rF0ycqVUNDdFrSRsbc2DzXSiUnq5T9wLX%2FkwFWjOLcUMaFk%2B3wJelzLgHJTvqZhlOLh7pCI9%2F17HeaUqV5qGhZP3bKJ0LCLKFIfJx6U0pYXKKQ11vs3Tzl%2BJe2F7bPbUhEORbEZ7UArpcR5fBFyn2418uS%2F63Kqj97xslnHEU%2Fc%2BRa%2BboxZksQeOW2MFVU4YbQMSnO76vaRenP0SIfha0QgMzpj%2BJtglwAsA64i1m36e7NDXH1bn8Rsh7ZNjUIDpYHh1oAqlHg%3D%3D','2024-11-18 16:48:50','2024-11-18 16:48:50'),(44,129,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731923324341-6539040_1562638443130.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=%2BL0l22KUk1TrZFXAmZCvRYmLDUp7X%2FRtffz4UvlVyc7BxR9irlj%2FTvs0630nuLR7Bb9B7x8nQb50rDzVdYvqS2rwWxC%2BgSnviIb6DATXGamaV9rnVF6ppcSIgjpCeCuLWXqEYnwW4NBK0tMtJrxYK0JqqgpnWRj2Ss5gPuIog4VlslSL0B44GBAxo7%2BISFqej01kjTapoERR8xRQ5oqCtBESSr7SEYeBxqzb96vDMgvAYVHVKOPtlGePla4gD7Bsanx7KpAx3Q0DvbPVBG7nOE8IgDo2%2Fo40nhupJLU3fbH%2FVEHOFM4PgdmitFXe5LIRp6kus4kKGFvdT3ZGfTIQ4w%3D%3D','2024-11-18 16:48:50','2024-11-18 16:48:50'),(45,127,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731926675448-973355_1562638439675.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=GCdKh6KOZrhODKST7e%2BMr8xtC0CaXgkn8KUPcoakxPbDtlU8cYhn%2FJJGm0sgsMgKs018xRdGWGbj%2Bo0bhBb9R4SGKENBKWvnkrSdqS6o25sKWYFpjCMpVu4TCyI0U3kcr6st0UJTY0sVTKPKYxzgYz1wZFuOVkkTDuupIDnyYODZ56aK6RKmb%2Bux7DT7%2F4rt%2BecZqc%2BziApIYN4B3DEKQD0aHE8TaPciN2Xh5GZFi%2Fuvbs8m0PDresp1Brz0Ga4zNvPVzHRUj1pOvpEhIHLQRz571kWTHbF1qXzyBWFfCKcSWyZ5UB2rSP9NKPB4qo0a46baQ5lAGrBhNvmm7eSbKA%3D%3D','2024-11-18 16:48:50','2024-11-18 17:44:37'),(46,132,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731923324749-5911589_1562638438001.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=i1EigfQ4YttPVauXlGomRMv%2BLvhd1utLi4e%2Bq1XKpkVho6nxdHSpQZu5MeZXUxaGmku05jeFWWh5HMXb%2FZyCKL%2F6K5sLNXvFx6u%2FeswUqnSgZupVj6LhriHYBpk6%2BLuRbGtcbhdsEQY1Vq%2FeLCE4lznDDC058FPyamVmOvRi%2Brf%2BTxILa4yonHxJr01JBKZQ8sVFKAd9dVCH%2FL6UxtvVDk%2FlPYDwktlKNncCQes11paRVnkj6A97Nf%2FS%2FJfGQos6wHriQ4oBAVdCu8I42sWMQoqcYLnTuy%2FXfB06vvy6BsYMnPHwZo08vuL7HKU%2FzquwgCHdLfObizeDoIELgfH3uw%3D%3D','2024-11-18 16:48:50','2024-11-18 16:48:50'),(47,131,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731923324634-5656089_1562638419203.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=dYPZdQrk35Qdrsygyq0HIVCFXiZQrBB0I7i3lh%2BtDJGP96%2BBRaoqSYQAoQLFPM9mlaY6zULMqrQ3dKuIt6%2B%2F%2Bm9NhOFfuRr2q4VBQZbpajSSqwDmYp29Xce2yy%2FEVvGiWQsEZmLvhc36u0mUViH5QzZA5H7aIs%2FShZgTzJjbZVcqmXpAq1MJOTzKFxFlZu4vbWcGaBnH8kXN9uVTbhu6EUUInt24k9d9ceA9nkMdSae%2BO19jnlUBrqDhh3%2FML3R94xPdGP9%2F7fYHjJuyWtz%2BbYZUbWq6vrvfJ0H7NLx2HwlFTMa14TaAylswkLTduELrQp6DOHwXj40wb6MNCiHevw%3D%3D','2024-11-18 16:48:50','2024-11-18 16:48:50'),(48,128,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731923324870-3555841_1562638435196.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=rd%2BJGwHH7zH6tG8GyY6iFzm%2BNWfSC%2BQ2GqciHOw6SCfHYWWRxD4jc5YKImbkmkLZ1cHt1Vql5STHrp%2BOksAKoOja8zcGVCVtJ%2BfXa8KAwmbNLSuVymDCjH4DfSetEb9znQeh5Mqi2mnTpmTHw8S74QMpdxQHxaURl35MWKnBsZZS3xixpOpIcz6PplYucuU9ZJ8TsxH9smg0P7cAxb9RvgQZvWJHYnuRs00GJKr%2FwdQpLUJs0fFkw4vYCHZDIBKp877gW06noOlCRBNuDjO8x8J6evUH2%2BoHfE9xXKfMruBxLgMdfoCNg6krf7bbfsSkbgrnpExLAWMTNjGkBvRj8w%3D%3D','2024-11-18 16:48:50','2024-11-18 16:48:50');
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
INSERT INTO `QuestionAudios` VALUES (13,13,'2024-11-17 19:17:15','2024-11-17 19:17:15'),(14,16,'2024-11-17 19:17:15','2024-11-17 19:17:15'),(15,18,'2024-11-17 19:17:15','2024-11-17 19:17:15'),(16,15,'2024-11-17 19:17:15','2024-11-17 19:17:15'),(17,14,'2024-11-17 19:17:15','2024-11-17 19:17:15'),(18,17,'2024-11-17 19:17:15','2024-11-17 19:17:15'),(91,23,'2024-11-18 16:00:23','2024-11-18 16:00:23'),(92,19,'2024-11-18 16:00:23','2024-11-18 16:00:23'),(93,21,'2024-11-18 16:00:23','2024-11-18 16:00:23'),(94,20,'2024-11-18 16:00:23','2024-11-18 16:00:23'),(95,22,'2024-11-18 16:00:23','2024-11-18 16:00:23'),(96,24,'2024-11-18 16:00:23','2024-11-18 16:00:23'),(127,45,'2024-11-18 16:48:51','2024-11-18 16:48:51'),(128,48,'2024-11-18 16:48:51','2024-11-18 16:48:51'),(129,46,'2024-11-18 16:48:51','2024-11-18 16:48:51'),(130,43,'2024-11-18 16:48:51','2024-11-18 16:48:51'),(131,47,'2024-11-18 16:48:51','2024-11-18 16:48:51'),(132,44,'2024-11-18 16:48:51','2024-11-18 16:48:51'),(133,49,'2024-11-18 17:30:54','2024-11-18 17:30:54'),(134,55,'2024-11-18 17:30:54','2024-11-18 17:30:54'),(135,50,'2024-11-18 17:30:54','2024-11-18 17:30:54'),(136,66,'2024-11-18 17:30:54','2024-11-18 17:30:54'),(137,69,'2024-11-18 17:30:54','2024-11-18 17:30:54'),(138,70,'2024-11-18 17:30:54','2024-11-18 17:30:54'),(139,72,'2024-11-18 17:30:54','2024-11-18 17:30:54'),(140,73,'2024-11-18 17:30:54','2024-11-18 17:30:54'),(141,71,'2024-11-18 17:30:54','2024-11-18 17:30:54'),(142,51,'2024-11-18 17:30:54','2024-11-18 17:30:54'),(143,53,'2024-11-18 17:30:54','2024-11-18 17:30:54'),(144,52,'2024-11-18 17:30:55','2024-11-18 17:30:55'),(145,54,'2024-11-18 17:30:55','2024-11-18 17:30:55'),(146,56,'2024-11-18 17:30:55','2024-11-18 17:30:55'),(147,57,'2024-11-18 17:30:55','2024-11-18 17:30:55'),(148,58,'2024-11-18 17:30:55','2024-11-18 17:30:55'),(149,59,'2024-11-18 17:30:55','2024-11-18 17:30:55'),(150,60,'2024-11-18 17:30:55','2024-11-18 17:30:55'),(151,61,'2024-11-18 17:30:55','2024-11-18 17:30:55'),(152,62,'2024-11-18 17:30:55','2024-11-18 17:30:55'),(153,63,'2024-11-18 17:30:55','2024-11-18 17:30:55'),(154,64,'2024-11-18 17:30:55','2024-11-18 17:30:55'),(155,65,'2024-11-18 17:30:55','2024-11-18 17:30:55'),(156,67,'2024-11-18 17:30:55','2024-11-18 17:30:55'),(157,68,'2024-11-18 17:30:55','2024-11-18 17:30:55');
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QuestionGroups`
--

LOCK TABLES `QuestionGroups` WRITE;
/*!40000 ALTER TABLE `QuestionGroups` DISABLE KEYS */;
INSERT INTO `QuestionGroups` VALUES (3,1,'Test 1','2024-11-17 19:17:14','2024-11-17 19:24:22'),(34,1,'Test 2','2024-11-18 16:00:22','2024-11-18 16:00:22'),(40,1,'Test 3','2024-11-18 16:48:49','2024-11-18 16:48:49'),(41,2,'Test 2','2024-11-18 17:30:51','2024-11-18 19:43:19');
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
  `explanationTextId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `groupId` (`groupId`),
  KEY `Questions_explanationTextId_foreign_idx` (`explanationTextId`),
  CONSTRAINT `Questions_explanationTextId_foreign_idx` FOREIGN KEY (`explanationTextId`) REFERENCES `ExplanationTexts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Questions_ibfk_1` FOREIGN KEY (`groupId`) REFERENCES `QuestionGroups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Questions`
--

LOCK TABLES `Questions` WRITE;
/*!40000 ALTER TABLE `Questions` DISABLE KEYS */;
INSERT INTO `Questions` VALUES (13,3,'The man is holding some seafood.','2024-11-17 19:17:14','2024-11-17 19:17:14',NULL),(14,3,'The man is hammering something into a building frame.','2024-11-17 19:17:14','2024-11-17 19:17:14',NULL),(15,3,'The woman is talking on the phone.','2024-11-17 19:17:14','2024-11-17 19:17:14',NULL),(16,3,'The man is writing something onto the notepad.','2024-11-17 19:17:14','2024-11-17 19:17:14',NULL),(17,3,'The woman is cooking some bacon.','2024-11-17 19:17:14','2024-11-17 19:17:14',NULL),(18,3,'There are some tables and chairs outdoors.','2024-11-17 19:17:14','2024-11-17 19:17:14',NULL),(91,34,'','2024-11-18 16:00:22','2024-11-18 16:00:22',NULL),(92,34,'','2024-11-18 16:00:22','2024-11-18 16:00:22',NULL),(93,34,'','2024-11-18 16:00:22','2024-11-18 16:00:22',NULL),(94,34,'','2024-11-18 16:00:22','2024-11-18 16:00:22',NULL),(95,34,'','2024-11-18 16:00:22','2024-11-18 16:00:22',NULL),(96,34,'','2024-11-18 16:00:22','2024-11-18 16:00:22',NULL),(127,40,'','2024-11-18 16:48:49','2024-11-18 16:48:49',NULL),(128,40,'','2024-11-18 16:48:49','2024-11-18 16:48:49',NULL),(129,40,'','2024-11-18 16:48:49','2024-11-18 16:48:49',NULL),(130,40,'','2024-11-18 16:48:49','2024-11-18 16:48:49',NULL),(131,40,'','2024-11-18 16:48:49','2024-11-18 16:48:49',NULL),(132,40,'','2024-11-18 16:48:49','2024-11-18 16:48:49',NULL),(133,41,'Why weren’t the flyers ready in time for the event?','2024-11-18 17:30:51','2024-11-18 19:50:34',NULL),(134,41,'How was the museum tour?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(135,41,'How about renting a larger space for the party?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(136,41,'What was the cost of replacing the window?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(137,41,'Have you introduced yourself to the new employee?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(138,41,'Which seat is mine?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(139,41,'Who’s speaking at tonight’s opening ceremony?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(140,41,'Why don’t we take a group picture?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(141,41,'When should I turn on the air conditioner?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(142,41,'Shouldn’t our food have been served by now?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(143,41,'Would you like to work together or separately?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(144,41,'Where was the company picnic held?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(145,41,'Have you considered building a fence?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(146,41,'Will you be checking your e-mail tomorrow?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(147,41,'I was very impressed with Alex’s singing.','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(148,41,'Would you like to borrow this book when I finish reading it?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(149,41,'Are you going out for dinner or staying in?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(150,41,'Who’s working at the front desk today?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(151,41,'Didn’t you receive a paycheck?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(152,41,'Why did the subway stop running early tonight?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(153,41,'You set up chairs in the conference room, didn’t you?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(154,41,'This new coffee maker was very expensive.','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(155,41,'The elevator has been repaired, right?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(156,41,'I couldn’t get a hold of George.','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL),(157,41,'Where does this bus go to?','2024-11-18 17:30:51','2024-11-18 17:30:51',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RefreshTokens`
--

LOCK TABLES `RefreshTokens` WRITE;
/*!40000 ALTER TABLE `RefreshTokens` DISABLE KEYS */;
INSERT INTO `RefreshTokens` VALUES (5,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMxODYxMzc0LCJleHAiOjE3MzMwNzA5NzR9.aGPjkQ8u6rqgNGgpf0h6THZsRX60eDrrkeCzPzcRjBY','2024-11-17 23:36:14','2024-11-17 23:36:14');
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
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20241020124532-create-user.js'),('20241024023451-create-vocabulary.js'),('20241024115516-create-vocabulary-topics.js'),('20241024120239-add-vocabularyTopicId-to-vocabulary.js'),('20241024132323-create-vocabulary-practice-status.js'),('20241026125951-create-role.js'),('20241026130258-create-role-detail.js'),('20241103070617-create-refresh-token.js'),('20241107074105-create-part.js'),('20241107074245-create-audio.js'),('20241107074914-create-question-group.js'),('20241107075107-create-question.js'),('20241107075230-create-answer.js'),('20241107075501-create-correct-answer.js'),('20241107075635-create-user-answer.js'),('20241107080022-create-question-audio.js'),('20241107080639-create-photo.js'),('20241118131620-create-explanation-text.js'),('20241118131836-add-explanationTextId-to-questions.js');
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

-- Dump completed on 2024-11-18 21:48:50
