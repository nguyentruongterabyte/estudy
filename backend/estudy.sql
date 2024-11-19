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
) ENGINE=InnoDB AUTO_INCREMENT=544 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Answers`
--

LOCK TABLES `Answers` WRITE;
/*!40000 ALTER TABLE `Answers` DISABLE KEYS */;
INSERT INTO `Answers` VALUES (445,115,'There are plastic umbrellas on the tables...','2024-11-19 11:02:36','2024-11-19 12:53:04'),(446,115,'There are some people sitting at the tables.s.','2024-11-19 11:02:36','2024-11-19 11:25:08'),(447,115,'There are plastic umbrellas on the table.','2024-11-19 11:02:36','2024-11-19 12:13:31'),(448,115,'There are many flowers in the garden.','2024-11-19 11:02:36','2024-11-19 12:13:31'),(449,117,'The woman is talking on the phone.','2024-11-19 11:02:36','2024-11-19 11:02:36'),(450,117,'The woman is using her cell phone.','2024-11-19 11:02:36','2024-11-19 11:02:36'),(451,117,'The woman is typing on the laptop.','2024-11-19 11:02:36','2024-11-19 11:02:36'),(452,117,'The woman is writing in her notebook.','2024-11-19 11:02:36','2024-11-19 11:02:36'),(453,116,'The man is using a screwdriver to screw a nail into the building frame.','2024-11-19 11:02:36','2024-11-19 11:02:36'),(454,116,'The man is hammering something into a building frame..','2024-11-19 11:02:36','2024-11-19 12:54:55'),(455,116,'The man is making the frame with his hand.','2024-11-19 11:02:36','2024-11-19 11:02:36'),(456,116,'The man is wearing protective glasses.','2024-11-19 11:02:36','2024-11-19 11:02:36'),(457,120,'There are some tables and chairs outdoors.','2024-11-19 11:02:36','2024-11-19 11:02:36'),(458,120,'There are some people sitting at the tables.','2024-11-19 11:02:36','2024-11-19 11:02:36'),(459,120,'There are plastic umbrellas on the tables.','2024-11-19 11:02:36','2024-11-19 11:02:36'),(460,120,'There are many flowers in the garden.','2024-11-19 11:02:36','2024-11-19 11:02:36'),(461,119,'They are looking at each other.','2024-11-19 11:02:36','2024-11-19 11:02:36'),(462,119,'The woman is typing on her computer.','2024-11-19 11:02:36','2024-11-19 11:02:36'),(463,119,'The man is using the calculator.','2024-11-19 11:02:36','2024-11-19 11:02:36'),(464,119,'The man is writing something onto the notepad.','2024-11-19 11:02:36','2024-11-19 11:02:36'),(465,118,'The woman is cooking some bacon.','2024-11-19 11:02:36','2024-11-19 11:02:36'),(466,118,'The woman is baking a cake.','2024-11-19 11:02:36','2024-11-19 11:02:36'),(467,118,'The woman is preparing for dinner.','2024-11-19 11:02:36','2024-11-19 11:02:36'),(468,118,'The woman is frying some fish.','2024-11-19 11:02:36','2024-11-19 11:02:36'),(469,121,'They’re not frequent flyers.','2024-11-19 13:57:42','2024-11-19 13:58:57'),(470,123,'The window faces toward the street.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(471,121,'The copier malfunctioned.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(472,121,'It was the company’s 40th anniversary.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(473,123,'Between Williams street and Keller Avenue.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(474,123,'It was very informative.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(475,122,'Is that really necessary?','2024-11-19 13:57:42','2024-11-19 13:57:42'),(476,122,'I returned the equipment.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(477,122,'I’m not a tenant.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(478,125,'It’s a comfortable chair.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(479,125,'Please sit anywhere.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(480,125,'Keep that in mind.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(481,126,'A new reward system will be introduced soon.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(482,126,'No, I’ve been too busy today.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(483,126,'Nice to meet you.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(484,124,'I think it was less than 60 dollars.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(485,124,'It wasn’t difficult at all.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(486,124,'In a department store.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(487,128,'Sure, let’s do it on the steps.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(488,128,'A digital camera.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(489,128,'Yes, she looks attractive in this picture.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(490,127,'Front row seats.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(491,127,'Mr. Gibson will close the door.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(492,129,'I agree with you.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(493,127,'A famous novelist.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(494,129,'When it reaches 25 degrees.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(495,129,'They’ll be on air in about an hour.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(496,130,'I’ll order the tomato pasta.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(497,130,'Yes, the service is rather slow tonight.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(498,131,'Actually, I prefer working alone.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(499,130,'It was delicious.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(500,131,'Let’s gather the company’s data.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(501,131,'Before next Friday.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(502,132,'In April.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(503,132,'Refreshments will be provided.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(504,132,'At a park next to a lake.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(505,133,'The house is for sale.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(506,133,'Yes, we’re doing that next.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(507,133,'His remarks caused offense.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(508,134,'Look at the attachment.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(509,134,'Actually, I’ll be on vacation.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(510,134,'We accept cash or check.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(511,135,'I forgot the singer’s name.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(512,135,'Where is the concert?','2024-11-19 13:57:42','2024-11-19 13:57:42'),(513,135,'Yes, he has a wonderful voice.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(514,136,'Ms. Watson will be leading the team.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(515,136,'I’m going to book a table for dinner.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(516,136,'No, I’ll get it from the library.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(517,138,'That’s a difficult request.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(518,138,'It’s Katie Miller.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(519,138,'Make room on your desk.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(520,137,'I’m going to order delivery.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(521,137,'Please bring the bill.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(522,137,'At a convenient time.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(523,139,'No, they are distributed next week.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(524,139,'Sure, I’ll send him an e-mail.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(525,139,'She wants to get the promotion.','2024-11-19 13:57:42','2024-11-19 13:57:42'),(526,141,'I need a reference book.','2024-11-19 13:57:43','2024-11-19 13:57:43'),(527,141,'Yes, 200 seats in total.','2024-11-19 13:57:43','2024-11-19 13:57:43'),(528,141,'No, I couldn’t find the e-mail address.','2024-11-19 13:57:43','2024-11-19 13:57:43'),(529,143,'Yes, it is working again.','2024-11-19 13:57:43','2024-11-19 13:57:43'),(530,143,'She works on the third floor.','2024-11-19 13:57:43','2024-11-19 13:57:43'),(531,143,'That’s not what I saw.','2024-11-19 13:57:43','2024-11-19 13:57:43'),(532,142,'He has extensive management experience.','2024-11-19 13:57:43','2024-11-19 13:57:43'),(533,142,'There’s a paper jam in the copy machine.','2024-11-19 13:57:43','2024-11-19 13:57:43'),(534,144,'Hold the line, please.','2024-11-19 13:57:43','2024-11-19 13:57:43'),(535,144,'Some empty boxes.','2024-11-19 13:57:43','2024-11-19 13:57:43'),(536,142,'That’s why the coffee tastes great.','2024-11-19 13:57:43','2024-11-19 13:57:43'),(537,144,'Try calling back later.','2024-11-19 13:57:43','2024-11-19 13:57:43'),(538,140,'Because it’s a holiday.','2024-11-19 13:57:43','2024-11-19 13:57:43'),(539,140,'Let’s get off at the next station.','2024-11-19 13:57:43','2024-11-19 13:57:43'),(540,140,'No, I won’t be running tomorrow.','2024-11-19 13:57:43','2024-11-19 13:57:43'),(541,145,'You need a transit card.','2024-11-19 13:57:43','2024-11-19 13:57:43'),(542,145,'The bus stop is over there.','2024-11-19 13:57:43','2024-11-19 13:57:43'),(543,145,'It is headed downtown.','2024-11-19 13:57:43','2024-11-19 13:57:43');
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
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Audios`
--

LOCK TABLES `Audios` WRITE;
/*!40000 ALTER TABLE `Audios` DISABLE KEYS */;
INSERT INTO `Audios` VALUES (56,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731988953618-66607451.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=44Vnl%2FUznREf%2FDfUvNHNdAObJuEugnjdDqoRLytwoaTpBlWOMvZWmSo4QTfVwIo1yKDCw1aSrrItpjQv8r2VDsH0zttQWIHDNU%2FZP25g1h0brRYp0ipYNEY9HE0cyk1sc%2FYlzaUV2acjy6q8bGn20gYY2t0zJGfqh2UtydXgP%2Bgu6AZ%2FkOJ3prz8zv%2B%2B51amjsEpccJjv2ojMwTVssvPhcGFnTKdpH7Y4Un0r5%2Btd%2B95FS2bZ0N4iIMzay%2BIONvV9ZYtt2vfPtcwxyPDGPXGBWud2%2FvbiFn2H2WJ3aN1%2Bq9cvSoh9HiutIWGL7Mkp%2BShKpEdRGsSqva6M3McSuoetg%3D%3D','2024-11-19 11:02:37','2024-11-19 11:02:37'),(57,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731988953092-65823179.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=u056y32%2FlYFOAfybhFQFiT2eB6J6TFw1DzclSG3gg%2BnPjk9kliq2kHNQn4lAKjb6VbHih27dA76J9MQigg4xRqjOUykgsk%2Bto4wOjK%2B1m6r2ad2YnFCkGGM7cfhJiyASf3jOwrXTFhvyEH6%2Bm%2BEVe6Oxxn%2BfI8j6RMjwNFEF%2B1hv85tWBTbcnET4f5hPj5xnC7TIIbYwb6yUmJpgq1HJKdIhkQHTJRdeTdtoFrOofB57ZppVHI7%2FxXnlEheWpIHqC%2FtVD0lBzI2oQP0R2AKrTZo4HqcsJDJHFXc%2BPxG5zCAD%2FPl%2BssO%2Brjm0%2F9lNFGbH%2BPmx%2BX9IVfCbOmmfhpCW%2FQ%3D%3D','2024-11-19 11:02:37','2024-11-19 11:02:37'),(58,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731989153732-67636425.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=r3lCOuzwDeXq7me4gsqxsWTKkpkky9B%2F6nLFOTSZGbqYFeuueqdL3MXJgnryk0%2FWySzCTZQbD3Tk0%2F%2F99elJqlWVxav1kmYAO75qF9%2BTQRn9u%2FdJrx7qrvYlqLFpLfqp506n%2BwpdGu4yrvwzo4MFRfUJg47RegGvx3PbY0%2FW%2FVRKCccyyw7GmS%2F8uWJxAJicziFpMnS6tS%2Boc1Abh52SD%2BF5sT%2FGg1YWPXKIYAeVZ%2B%2F6PeyKxhC%2BOVfboYLP1%2FEhfmiKzOX7Ugfe%2FCYwQW6uxrTI24wRgDMmyehGKyz3ap0ro0qAD%2FVZy1zC7q5Z3mvvllVDjCm2ZzRVIS46XyMgEA%3D%3D','2024-11-19 11:02:38','2024-11-19 11:05:56'),(59,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731988953361-94243671.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=Cx2cpBGlq9%2FYOwIUAtJeMgTKaEC5nhI0g8sxBGdzEaKnv2iQfCp5fS4EJA0fYrz7mLfucipBmovIw2IALWvnH39i3mOlvC5tyu6024DflnvABG5QlL%2B%2BVct6YSLafUflf544hC99g08zi56k9Xapzc73WV1fpzUalXATIG94kS0HJeE1P2Zj8gEHkD1ZEmIFVK3AP%2B9nx%2B8nJp%2FXDzmU3yAJRLC7vwc6pruwibeFPn3z3jadnj2%2F%2FTxNunQT4ssWdNA%2BQ50Kaultbh3vuVvZjHLHfPASGmeNhZYJkYysQ5LIGjXcye0MyJUOm4Chwg6rM0p4YKbfFMizlRULKS8czg%3D%3D','2024-11-19 11:02:38','2024-11-19 11:02:38'),(60,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731988953747-55914976.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=8uESBmjrLTZUqncoYhLbDc%2FdmNBWFkNke5AL4Oiq9JrGJWAQvpwcMqpD6bQrD3GQSwzYCXwF8xuqr0ILxcgytalcxj2KJo%2BfGDIdb9KCn6pFDqmo6Fb9BGfLoFYeveFSRGQEBOG4gprtiV1TrF0mqlVZoBIRib9Ii2H5Vuw0ekOIt1j0gzX%2FWYhXzdTLJDcbEzKeUe3vYX4Ap6TQ2eCFowBGOKs2XgOx3%2FADHsV29L3Wmv6JW%2Bd%2BsRqNNgyI%2FOV30JnZzpXMIa0wP%2BCpoQ3s31sU0KP7U%2FTeG6rUa6IimaViJLCaqYhT17cljOskOlgs9eoff0qDQEVZRM%2BtHJ3TzA%3D%3D','2024-11-19 11:02:38','2024-11-19 11:02:38'),(61,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731988953315-67636425.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=SKbwSdp5DXbjuIdjwXjS5Mkn6YWZvwihZKHj93XWA5SCmJRwEedGewycc8MaVA28mAMqYdv2VAfOtlKmR3wmLUisjrhzBcNCg2ZbHf0WoXmQdBzmmTBvW0CbxfwDBpW6IlOJGvJRrAqlzcBXpMHj%2FzFecvH%2F3CMIXVdck9tXZE%2BL%2F2dGGYqIPL4YcxUY%2BfMCA2kwOSbS46bPm6XZlFcQ7FumdD5ciMNdrckZQemn76fYU%2BGuL1Jw2tQFdHo7xmgCUqTYQOoZMzkFiWfcREUvLDuydU0wr2g1%2BzCqBAveQVfnthiQiLXa0oZ5p0HtwFhK6H4%2BNKLl%2F4JcNXAVpQYhUQ%3D%3D','2024-11-19 11:02:38','2024-11-19 11:02:38'),(62,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999458449-eco2018_Test01_0220.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=a%2Bbuwuz2EniulCayj8dY5ZKUSXoASDcdieko8oMt8ADoHpYAkXMHDWPsJktXwRKE1i2JOQUPnlaEaSZv6eZDZku4o4DRXApHFgUDmzYmw1te63p6v6MM26iPAeRwodtzdAeNtZtYmrX5NStwo1OPQVdKOw3AUblxHsM4hpez9SK%2FmW8LX%2BS9hvarj1TcVV58Dalh8qlOLTfOWOJ43f5%2BEYcOQBx7hK%2FhUI3M5Dbi4N4CHarYz5BC%2FY7jcm8CPADnfBQq7jPK8rgO4dsMIn8IuFxZitA4SoDBvHxVTK2GigHCVuc9HfG9vxEF32%2FbE5GETbQZB9pL7dAyD5jfBYM0kg%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(63,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999454672-eco2018_Test01_0225.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=vTmbzhGt%2FJUYfHMpz4kbo4yqBuq35kVr%2Bbcv%2BUilVMAMF2pk0OKbL%2FG5iAI0kr7Jqk0cBQJd6dixc2eFmQ4dOYDh%2BkT3HuAUc9qaGIkLlvBJlfso3qFFZNi8L4P8mmsmce9GRPD2lslookabzb%2BCTBu7mGwX2NJvN1Up%2BtNrR5HrTEgfRxZadKh3FzqMVWb9BD80iQoH51lrW1hLzYfoO%2BhDI3nmGaUFG2mP3Rhg3eNHNZcesKWpsi3E3JWu0FtuNuycjHHwAQSSmBhydNPy8hHQqeuTHM%2Fvcywv9geG2d3psUDmm5uu0cSai%2FyeICFPdncj3J3xRUZClp7gSc4F1A%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(64,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999454686-eco2018_Test01_0211.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=9sGoFYaULOVTIgrbU1Rf%2FL79zMbdb63s3%2FzRcs%2BTnP1KuVlfv8CvIgJwTU0O4A%2FQ%2FT6XKsjc0rxx%2FgS4rQPAPz%2F5cWmvv9EbPpQ%2B57PpkhQG3ZBPMnRQtiPYNajr5Sm%2BB6p2lYDO86f0R%2BuhI7%2FsVABdqSlaa0DhOpnRH6zYEoCW5ZjF%2FZuCfN%2FDn2XJr%2Ftdn6%2BFftjqZFPfWMWSrrUghd7xS7klNToBRG2S4WKO0FJQ3DrmBlxrtB655rGMSUebRXY2hZcF%2FgFHmZgShL9sbOOp2%2BdX791kCZNJotH3ERlI95u%2BF2L0cHl5PIerge%2FZEAUQ7%2BJJYQ6P1F3r8IBFRA%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(65,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999454690-eco2018_Test01_0212.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=k22K9IC%2BbmZUMd802S%2FwzIK62tB4ibx6qXwR%2BVXy8dOrF6ighJsiahAu8ub2zS9q7WjnbuYMHlAd%2FJ37bxx3Z5NSVeeBfCEugGUoE0V42shrzQ08fOpweQ9Umxsg%2FJuUNQ5Dtpji7mBJEVRC6i2WMP7dx7ybfZeRaBb%2FZhDZPZJKgP8zlc0cXZ4SnrfNMBROLXwwTC3L2cilDNw0%2B97UZT8fNZfhjh4%2FlYu8AQnCNko10COzwRdO0tGPwqSoKgB2TysV0%2B0oMrjUCC01YjOxca%2FmQY1RyfOl8CIaMmDaoEBN4WiQ3Y%2Bxl9UQwDRh4gvNdHbaN8TwIptQj1Uj3Iab%2Bg%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(66,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999456889-eco2018_Test01_0207.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=TMSlHpmc0aUo8rrjB6HFoo4W3NU7UBaK5JpXoPxaeYEEtSBZL3Td00TEwffPsvJOTL9KnRqmLeAwqWviSBbEyz5O7TXkygGf%2BYsIPZva%2FVOCtz5fS14HaVEE%2FCPlsB9XetWkY%2BpnbzQqE%2FtSXwRTE7RvNv1pHP8IQ50TrWbCsteuhBmMmrqHMPRXdUlpGhwfFHPMVXs8EHAlAe0xfRisVCEqFkwrWHURNbq5XQzts6jE4Nc6z8pVh009r2UqlOqgq7ormYj2LUJkfdRxSfqHIb%2BZb9EH71SG9yHTTDoah9yAsg0KePqlxcffrcAIhR493Z8AQ16mc60Ap7NVrSyuvQ%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(67,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999459954-eco2018_Test01_0219.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=EOSdNR3R3u6K0TKYWlKsJi2AXCb%2BTHdKgvSnQ1gk%2BSZ1kHKvl8f2%2FGrkXUbFG8VQBXP4NH%2BvQZB5rUhvI%2FaZYDXbnZEPmGUk1G4gS4Dg1LdWgpKvh8cSh4AXsYiXUZaZdqnuyVUd0JCqUasQ0BJ6YNn%2FkZdSp6oWhkkj8wLIHxf5oreBU%2BIrdXe3wY25Ra2JN0cqfgtt1YcUkkYoTsVtYyHI%2Fa%2FeRlzoGjEPM0a5pip0ZssjMefB9WWUak9yatl7h8IMnYMaU1qyAJyMTvpp2svxWIZLo2YRNdRTqYsr8f3tfztahY5AXzlfNsrOGiO26M1RDYlVLoKISlaw2i6VTA%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(68,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999459480-eco2018_Test01_0202.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=4YEVniAlm93Upp7Lfgr2PQlA%2FjcobTS7bjzjWUZcpXIt%2FmqWJ%2FddJ6240F24C5mlaJEs1Bb%2FJInVmr5H%2FZpHwj2NVBny7pcA%2Brdm8DnhYT4X1uwlAxODXnQbvSp66FRmr8Dq9g1owzHRinePceNllkI6wi3fvUQzN%2FYauEkWropwDGNwmNQBnaQd3Rh2SUqT%2BrFp%2BbdYe0QMRm3yVc09XUurmGgTy2shzjLisYFz0VoczcXVNAN647JhrxP65zjIqU6NkQPej3ap9zsPAGfFday%2F2TkcoiDu7YfiA5BmXvEJi78Gc%2B5U9W6ONdxmaY7okZVElqHvo%2FvW%2B%2BlGJpjmeA%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(69,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999459693-eco2018_Test01_0222.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=KgfiXP%2BweJbcY4K6iR%2F8ISfCiUUHblzs0Xa2Q0PasXjIpbbUHX%2B0G5hdSpAgQyB7qnHe3Flvp8E9tE6ke3Mh20cVBd0ftHN73URSFASLF4hUUWix6mVNoik%2BszP0LvMJs56yfQ2HO1Uww%2Bf7Guwd%2F0yPFIweQPfGLFXtgbEvlxauZ4dZM2rYPu%2Bj5Taivg2DfQJJ3xRBNzdxXN50KmeDt7xRXQGXc%2Fuy5IhQyRZ7tMevxZxzeyFk9%2BVq46y%2Bu3lIfLMgGHvS7%2Fv97y0KqfCAyGQJN2XbLPl7gaRT%2B1A1n%2FWlYZ4BlYfDfwBwLtPXgs4taPvzkBqqjYciXcg1OjHUcw%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(70,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999459813-eco2018_Test01_0210.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=2snlA4j1oPbTyjmwodZLT0CJduunH%2BBD096n0rT%2FF4rGYInL8qKAOM4ontj6th1ZHtIZ1jDK2Pc%2F3ga1p14ouV5xmYEROoD0y%2BvzC5XCehqQZqMz6gAMYOGZzzCLPF8NmK%2F7CM2XpNtQJ6Cu9uA2eGYcyvfaLKh8bEU%2F1%2BIkttoPOWwQpj4ZQ4KchwFfZnlybuIFFSthtM%2B9tNGm7o9E%2BWF15SXXHYO%2FCa2UstMLUw5jUfuH5YZJ%2FH4xRT%2B%2BcyiaSAj0XoT3%2Ftl11ochvr1xjCGMOK3sydHnsSizTf%2Fv6d9iuWyyHbrW7Kj4qQnKGpbM9IjRz8MrMQK%2ByY26TE7oFQ%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(71,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999459851-eco2018_Test01_0223.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=tn2wXxlyJmXbE%2FLGkvsyvKTW9732DXDj2Q4wEf5%2FqPRBABKMuRepX9Bf27Mz8qMPfCVDJCkpZ1ysQKHCNf2MKM2ELN10z7qibuoUJl2fZjnOUFRf3ZWCX1ZGkBTaHTzlMfCVCZomb%2BaJ58DSW0fHUTQdWwxhHqf5BNCRS2D3kaAqQQm8ziECwnJkix3MAiB%2BqFiFOSjTl71h0YUX5dc%2F4FQlV7biGz3q9UGEvcxdGHVC%2BuhUp4tq51qZ4jVS8j8DKe%2Fwl99h2A2wjp2IxQqsGS1tJR2%2FPasc17fwvjIxQfwdUESkZ8my1%2BkYK6Uu9NwvUyWPMp94V49BMkUEDqaeRg%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(72,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999460591-eco2018_Test01_0206.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=5lLH0%2F7ozEOMFDFrpXkxnMkzujgCHHlgDY7O14%2F8PEsYp%2FAHrkahGqTFlcR2FN%2BrdWbFyEnXfB2fF4U3FWXEOQk6VXWSaXU8Ng%2F2LIlR2eK6%2F1%2BWux7iPafEy1ljDU3JX65uU%2F4BMUlWO5LjCKwe%2BmZrquHdZXLoi3Mvq39uuCmbuAtyVkbwTUZjwUxLpAbq6UCT3H%2BMiDfc9FW90BGvW8m85EpRuy9J7XVsHtwVLmJ6ypxR5WBxwSgDZXnYWohOKij248HtXLtqpjVMSApn5nHWl5c8YAfWxwH3o9KBFvtObZ0VC3jpVKzpqfF1o%2B1KRhe7qSIAPU7Y1uWNqgOmww%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(73,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999456984-eco2018_Test01_0215.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=9Gqgz%2BSELdM4OlvRHufMzzw03Izv3dxErHR4n%2BU%2BYXRGsx%2Fkz5VUh9zHmGIrvXImMd75B3OyL1pcevMgo%2BWyc9OpPNohlYkCcEdLIQNgPsKsJ5o5Jxy0laFbiGZ3LzPYWpCIhV7oDanstpHvmM3rekXyDzlSayQuXp0WJ8zktRZ0l%2B09bTawZ4F5XeJz%2F0anSKUxRU7rOD9FUpphj5fCxpu%2FKS2bKmb5nbE%2Ft3kGZeHf0Se87tYwv9%2FHRTUiZc2bgGEA0Y0F15GbUZKRTuPIJYVrjiehvWwan1nnxAEPVegs8N9InuRROO5BpucRynWUWWxlOPsRIiT5xlXLPpyDJA%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(74,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999460842-eco2018_Test01_0216.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=VfFTwoe9fKewu%2BVPj6HCt0ihi27eorpd%2BSgwSamSJ7U4vYuv%2Bg62Hbv1iV1BLhlvwIS%2F7Ru9m0JDIHRU9jJqteJYV1Fmp3HXkEfrdRmiGwQKRmgbrApVfGsIRI7eoLnU2045koOb4MpP0ng3Cu3j27ooLjSIWq3ZF0GTIV26fMd5vQ4xbrkfpgpKxrrkaba2zEZCd6ZyamZyTOOTMzvmWfp9cYkqyz13qxtF4tGXl7oZ8JhF5Masi%2BUkK99800WK9MiH3A8HRI%2B7QfZo7UuRq9Z%2BBVzm0D2%2BhXKB6vQw%2F84epNRuzr0SqerI8q5o%2BViRVpoTN2oN8t0ab4c0Tfs0uA%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(75,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999461080-eco2018_Test01_0205.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=7i2xzbN3a3mh0Y40qJ9qXSuZ7BymueDIaFd8CLwch0ZUj4uLpaeUrj1e55%2BYbqKp6DU%2F9b5vjzrBxiw1ZqnZ8mST8r5J54ciOZLyT2CuqxThqfRHufRAGrXVdhBsrwH4n2gW8n6yGJ0KrnKEen%2F2UdNMvCApSavc1GkBWCqPcqFMuinay%2F%2FVG1XNa4jt7%2F%2B16f8FYKThqATAeMGgZ2%2BkCIQzZwOa4sux4la3QBmX87V1BwaAr3MR2r%2Fwf%2FvX2uPIzax9TU%2BGiq9hpgbubz6QZTNq11c8vmTICvp9m51PAJrwQFOXacvq9T1MaHapBOxGAih%2FsN1oZ3o9PHi7%2FJvVtA%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(76,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999454692-eco2018_Test01_0204.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=hx45K4AKt0Le3kQ8WTX2uvmTiRyFW0gaWHurjSouo6Q1am6N8o59FYjNboSBkW4XMUouTcp6dhd7v6HHS7lhczUDZd8ogkMjGCakhYS816FXEew6pn4glj8rteibmUI8ryTmJTJ3tA7NY3gs1naeXVXza5r35QXTBMiiUQCN2af4f8u0vUDlidTCfR8s4%2BBWwx1RRMyY7jnzKS4BOue1oovRey0IBgkpUXBVCz01wu2SSzgNgcpfXuUdZYOWuTqrKUPW8dWlG2THOdZrWj50Ps4XeIyu8%2Fsd6pIabfRKOLgowUP35VWXpkz05Af0oRpJ2Ddd%2BGdLZDhcBvvxZcNPUQ%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(77,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999454683-eco2018_Test01_0213.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=txRdlREz8fuXsjPIhGo5yWGF%2FXce%2B1k5RbzrnX9TKRlsg2ZY67y9DtYhlyKSKFdvkUssn51lGk3VmRXOREAqCQ%2FjTcVH0YMfgpwFvxpkeDUxbOp%2FKt4cJb8strNYipjA47i0cSDoiyjDEz976whHJM6NRRgc9%2BHgJdIzUzmHpn90tdNd6Xk0iq%2FimzHiFn40sKTVmPmTxYXIPufc%2FxdVsfvZohIR7R6nZrVLVhTF5iM95tmGLtyGy2Yr5cGSe8ThgNagg6A2e1qm%2B2hTzm%2F%2FAYCQEYMNgFVy%2FU6lKyl10zmjzDrvI%2Fdqn7boQC7JVsiscYhJ1Dby0yVHoO4b6JAUlw%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(78,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999456918-eco2018_Test01_0214.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=ADiQGxiBhpwFl3bFtkLodlh2dbPtauc9VbikJX9KczgV%2BqhR0tIoZ494ttzEWTxLfpPt0RChBUKlYVqq2rNVzJuQCLs1hKg1Gb3ea1QzTiTQOvezGFZsZZ%2BUHZi8bl%2BjlHL9I0ZgjK6aJsmrHHbKGnSvBzudVjLfUFX%2FsrhdH7Pm7eR0%2BMCqhwpzL28aGlmpJCMCH1IZi0ivnS5jdlj1SrTv0JccmB7NVyzJvZq2NHnUaks1llJSwW7JauhiP8lwmg256EqfO9Iuhxng1HutZ3tXhl7Wty1qmbSIs0thAB8aba6m75W64el85br85AH3FU6Ot9j3ZuaSbX1hHz1t5Q%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(79,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999454684-eco2018_Test01_0218.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=dwfqow%2B9ZbcC0%2FfMqfqjks8gpm54JloIi8mG3HNuoHbxy79pO6nizitXtW97y4qO4OkwkvKITo8hhCcUbjHX%2BfOI2bFtALrVIEKB%2F3Xt90ZEaX0JGS1TRPi2%2Fbf76niXHbRPhUmRJJ2kVcu4P1tNh4e82g6vOFa%2F3TKfK3x4cLIwNrF4QGBYyZYN71H2VTLpDO24QRXdOl1cP5h0aVf5j0jlAoTs66PEoWU0XyM%2B7tBvbv5Di8lZsOdHPgMC%2F4SgoOPw3cYdcD0gRWkBYeyhed2jbLoZKdSNyyPVP1%2F0puyO6BnnoKGkRHSaSpY%2BMAyPT8S08fF%2Fir7Akk8CaPj3jQ%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(80,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999456996-eco2018_Test01_0203.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=bb2ZE88Dul0MpDoA%2BfpXXfB6b%2BWxTnf2Em7VqXDnV6TmKRkV%2F%2BaqIq%2FiSeeRIipJDpnKC5X9lsR09gfaNdzy18wClydBOqe7djqKAUIiINFX8j4ejyEJQ2Ux6jNjCFD16W7sq8AQd%2BEuu%2BQ7t3X67YB3uOTPaAlzaV58m744k%2F2P7iHsbIuK0RwCASNOwSWJDHxPzjm1a0hQAV9I5InLQKdSz33IdqWA0A00V%2BmY9ivHDnh0Z9kTq%2FXq%2F%2BtpYRTrurbF18Cjk%2BNPBdOZRjSb0ww2Umb22wXH5plfCdlUzjUa5f8W7Zo%2BExY%2F3R4hFRADTSC3E8WcnWQXpDhK7jtDmQ%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(81,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999457007-eco2018_Test01_0217.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=1EZQCfNqjYUP9IM1j9SGeaXG%2F0o8dN45JOE5Ny15MYgw74wldkucskZ0tVbDm3XahCwEoRT8MLy7IOyq2IOU0DQrA8xGhWQ6tWHLZwcEu6Z%2FeCOLhVRJ3Txh3twIzjZ1wWmq%2Bz1IwYCJJbOiaEo2q199on6v0OSYOpmfNkPiMe7pj7Z5WuOWNs%2F4znujN%2B02ewsXh4WhYDmPqcUj2cScW%2BTICvp%2B6ymgye8EqfBKPXMr81BLA4rn5J1rmVDAqInXc0zo4fVKM2nDEK9Z2dyRKqoBroD69Lv0Uz7VVV1vAl7yd%2BMsr6Fk%2FYL%2BM5AuwNZaOQehFsbSWMnu5j3pPvS8rQ%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(82,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999457948-80079662.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=kmxUyIfIcqWBWxsZEtEOvAoyp807qvg8EKB5cDk35EBHsVORKy%2BA9NsN4aa0KxxvR1N1FeWekB%2B3PcScB%2FnGEnGiQn7Q%2Fdm9dz2ENa3b%2BWSHL9WfY%2FXPWSMc65HYzhlAdalNeHKobcpDetyfz6OS7hx6UYk2W1vMj8v%2FSOvDSpc0D7LKJJwiv740oyHNDaGu1pTrzTrqrjZiZPMwQ5i4aY%2FCTZqAEM7meo87D%2FbHv47bpkfhG5EzxAeeEQrFulqi9jrxrLGAOwcatwZaudL4qwSLG6wzESHlD0vNHE%2BKs92PNyKoa%2FTlGEfNofymIwitiAZDGSm4vKbV9%2B9io6H%2BoA%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(83,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999458312-eco2018_Test01_0208.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=E%2F98sSXq561hxWFuUABEltNPWO%2Fkic55a%2F%2F31XkR5O6kOJDCHY9HZUnGq4uhE3PKK93sVew3aU0qQdD5oFVbhKa563HNZyRJ7JOMDs3H%2FN%2BhPIL1YY7HN5MIS6LRtIXcoxilJc6ZN73KF96KGpeNMi%2B%2F4ca3%2F0mOnUL%2FEfiY48BNYkfnydsY2yor5guBDJaS0w%2BR%2F7wZbMDaeSj4Xc2iZpIIx14lj7T3HN1qLcmaGcAnHMfW5yYR42eGxm4OnqH1qbZUC1S%2FT48fhXZfxCqEw%2BTpT00XeCFa%2FDKllkbJ2jKAHRMiyMyNjkgmNRlVGLsKB%2B8nTLUdHme%2FRnds5QgJfg%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(84,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999458279-eco2018_Test01_0209.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=PTQB1H9s2N23N3iN3YqO2ltORTC8IJ%2BvhZs%2BnXaHUg5Fc4xr6TKhQzArDHVCERMKY2JkcB2wZVcTIMbS8DlDV7EoQTlT50A64Et0eFVvWGAyzPadqLr7UT1rWj74YiIxD36VHDtabjmnr4Df4mNbMrtpXYyMR128KVzcm9f%2BeNlf8EDwu5ICaPHyGQ7kuRGzGyJXN%2FeRcTxzi7v1B%2BLFj%2Fw9aPBjBjMOhlw6cCGnL4npGz%2FT%2FU5H8HudovbiLnJu%2FSOYsPYoZ8m9OKP%2FPgXM3woMl1zF97qbJjG2Peeq%2B1%2Fojqv8Waj1Fj8t%2BpfNPMkyezLCBzej3FAVUlSYRnovYw%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(85,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999458447-eco2018_Test01_0224.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=QAwbg%2BYE%2FFuTkDnm4mlvwWfeQru76acyao9KQFK9zHuKKpICmIBf%2FlVQwzE2cEEyILX5jjFlD9rTdgo8OMRQ%2BojeiFmHfJm5g4dJIFu%2FTl1ab0MPxvpslMoOmxBfPzfP8zihC8Ced3sqDufOTei5t6imycqextsG9FNEujUFkl%2FXD7DZ4V8gDmU0Ioqb0FuZZq%2BNBTqXp%2FUVnWFwnIfi62CRRWtuLrq13u4cyxdEwG90IgUEScPtNop2gtr3JTd45iNi4yrXCwTGjWBs4XCWHv135nel%2FGNkvDF26eLSboQyDPXy1RLC70wy4uLZBIOb5TPoSQ0pAlnHuAjrX1hGZA%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45'),(86,'https://storage.googleapis.com/hatshop-bc917.appspot.com/audios/1731999458359-eco2018_Test01_0221.mp3?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=Mqx0K3sYrPkDkDY1AbirMheAeaxQzP0xL0r%2FCkVIfuIBZmIJDYQolBSjsmCpPP%2F%2BT8xeCIhDQZJXHEvKIjRMbRirVIRWOlb%2FSbVOevD2njYYJBsVT1VzykpdegYd1HixL8%2Fn%2FHB%2Fl1QDhf6lLcB8XKK%2Bqv0latqq4dbX%2B4SRycI3W8hNkccRFIvbCTlYT%2FAkBb07zhV74eu7gnbsweRG55DIQCbWSX%2FBkfE7XgQ68Z0kvxTy4znX7aq0hU2tq0Vgw9If7GaspLduqXVKV82p%2BMOh%2BP1zUxxj5eHQm8BJA6mjRwpZjaneJodTZ8BigFxFhrPORg8IJTQR76XyQkfdAQ%3D%3D','2024-11-19 13:57:45','2024-11-19 13:57:45');
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
INSERT INTO `CorrectAnswers` VALUES (115,446,NULL,'2024-11-19 11:02:36','2024-11-19 11:30:55'),(116,454,NULL,'2024-11-19 11:02:36','2024-11-19 11:02:36'),(117,449,NULL,'2024-11-19 11:02:36','2024-11-19 11:02:36'),(118,465,NULL,'2024-11-19 11:02:36','2024-11-19 11:02:36'),(119,464,NULL,'2024-11-19 11:02:36','2024-11-19 11:02:36'),(120,457,NULL,'2024-11-19 11:02:36','2024-11-19 11:02:36'),(121,471,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(122,475,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(123,474,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(124,484,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(125,479,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(126,482,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(127,493,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(128,487,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(129,494,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(130,497,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(131,498,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(132,504,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(133,506,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(134,509,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(135,513,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(136,516,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(137,520,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(138,518,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(139,523,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(140,538,NULL,'2024-11-19 13:57:44','2024-11-19 13:57:44'),(141,527,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(142,536,NULL,'2024-11-19 13:57:44','2024-11-19 13:57:44'),(143,529,NULL,'2024-11-19 13:57:43','2024-11-19 13:57:43'),(144,537,NULL,'2024-11-19 13:57:44','2024-11-19 13:57:44'),(145,543,NULL,'2024-11-19 13:57:44','2024-11-19 13:57:44');
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
  `filePath` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Photos`
--

LOCK TABLES `Photos` WRITE;
/*!40000 ALTER TABLE `Photos` DISABLE KEYS */;
INSERT INTO `Photos` VALUES (58,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731988951880-5656089_1562638419203.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=cI7u%2B1l6gadtKYOsDQseXFW4dQc5dYFBSlcPgXgrJ4bo2etXAUBXwoZ4XjylAlNUuPiBDT2Oc4yoYnu6ra7WTyo1XloSEI988K8RUvt2b0LxdOLfZxqnuNdA1tLW6EBW7UgaXLarEliVgzCvFuUWf52iapMVM%2BbRCCwFRg6xzO7PKOfBHdjwJwEcWAyC4CKtK7ILe77G9gS6Domcf%2BLlS9Fyo9HG1%2Fw6Q3SFdkOV6jCVDD5qx0ZZ99GJeVlyajDLDRaDR5dDpupQSjJY2BmU6WzPeheW6gk16bui2SVF7455FK8HQ39v41DorTt5quDiiylAU1nJCMtkvIWNa3x0VA%3D%3D','2024-11-19 11:02:37','2024-11-19 11:02:37'),(59,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731990190861-973355_1562638439675.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=SYBw9Ypqr6EJe9%2Fmhqz1E3vGjNsAIA0MU3j6vNxXhhxJf7kT2zESE6asvrVPAAp%2BQd%2FryTMAzpZQuZzNfYTdN69PITQY2nk4qngMa8ti6mMeOPxumigZ1GAMusbeT4ZLilZlgrKpMtmjcKpMNAWdUBxCNVBTgDQGo%2FCp4cEoRTK4JvzWiP%2BMg5%2Fab8eKmni9oR0%2FGhX6jaroJKGWfgcgUC9ZGGnlMALbWQCZGA%2B3SEr3wO1M0Z9Ym6V1XvCFRD7qq6r8KnI4DRG4JN8Ri9eD6FSXrvcetxZr3tHZa%2Fw04VVoS7LTAiA4m38BoMi7xHdpk0DkpHNMvdE2ok2mGs0r%2FA%3D%3D','2024-11-19 11:02:37','2024-11-19 11:23:15'),(60,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731988951881-3672944_1562638433179.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=dsEwhaQPwrhSyQ2nqP%2BLOEtRQrJ5Gz7Q7EGEzc45jONfq9FA6XrY9Uc8C79%2BRtJEk9bukVjn%2FdYtWKfG0c2xhrcpibx%2F5CakoEdDx7l%2F%2BYqt4UEFHlVpEiwC8ow8LJ4f5vcAn8Kpn2T2%2BJ7Fbs6ioTEhbLPbfdd1FcIwODPjsKTAk0aaiaa0z2apJaas2eKktgRWcNn7DtOXTih2XHgxqJ%2BX4CB5Y4voD7GM3uEvnH8lrOycPFesSmsiW8HuBDPd2mQATvnUGbJ5TtTpsG5Yz6OumFBXHOZmGfB2NaeIRX4ilNVyEv69UDEZ9sDE3tp%2BZjSNxdfHD4cRDzaOy8DliA%3D%3D','2024-11-19 11:02:37','2024-11-19 11:02:37'),(61,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731988951880-5911589_1562638438001.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=T8tfQ%2BevDfmpcoqvJz4114aNKkMdOArlIjpWR7LAySEf1rAhNuSeI8Rpxtj0CQfU1ct%2BKX7YnI6214XbyTArZzhox1MwEnDnByfxKAdnDEl2WPRp6AJ%2F3r3Cr8BG2kOe049j%2BbuA6bNndOy6QVMTMNzVPaVWtFks%2BS3044sLyuuJlakB0sm%2F6lusB7jyoBfn8arn4bB8h3VQvTAQSEbeEokav24OefL20JTZ%2F7gLXzFFD2BGTbKaEvD%2Bc2bCjgA0u%2By8fU4RCt43Wtq6G3d79dwYPOjltiphZGJPjG8tS4rPa0cA4nnjwky1gvYYesuXsB8%2Bjzl4wex1Wlwq%2FDUucA%3D%3D','2024-11-19 11:02:37','2024-11-19 11:02:37'),(62,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731988951882-6539040_1562638443130.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=0py%2FNOHkyKI%2BZvJXZcMaJiB8TSecdxuY7ZFgU5I5hOBL3ca44sf8GOPFOINMWL%2Bv%2BRQGZ700ULoSqYtcXqzfcueDj6%2F%2FgvpMA7Yjjb92fDGLgnoT41r8OJWpP4CQ4jO74o72I4TmkzSnI8FPbWEhaoZPPppKBexZU%2B1lxVM7g1AKjnqsAHRYA9RHiytcHIsz%2F%2BwvJp1GYO9zYtlC9X2eNshKExXFLle9L1tA5lIgKp3oNh9OdaHcJs2Se%2FYm0tvL0oC4hCJS8bTzPfM1ulzXMNnTorJfoHUjTnJWhjw%2F7imfq3D8fUlcTHisirpsIJDrhniwmDyYb%2FQz6U3UVBW%2BFQ%3D%3D','2024-11-19 11:02:37','2024-11-19 11:02:37'),(63,'https://storage.googleapis.com/hatshop-bc917.appspot.com/photos/1731988951907-973355_1562638439675.png?GoogleAccessId=firebase-adminsdk-1dr9u%40hatshop-bc917.iam.gserviceaccount.com&Expires=16446992400&Signature=qhK1buR6DBWQSBUikF99601uggeF5%2Ff%2Fg7TIsei8P8h%2Bc7vphFWM2svR56q%2FYki0y27EdLdJ0F%2FZCdMhb80VzSNFWAIfZtRLC0fhc6k8khi7BMIYbEpAyhW1QpXGN9wHCZWEG8HL2TfMzcSCZ7ZPVloe8bRV56WK5%2BGXTmb9kC%2F8dKla4kXhJRNRdGLzL68K332bgFrhZAbBVty7j4tlMTMgHnx%2FeX5fneJ9kdfhnjihET8VbKuqN2nH6Ax9SJiY%2FqpJynK0FfyR3knocwLQDAp0aYbRYjMU4PSC820SIh9BBa%2Bnb4oDINwMXNFiseqWjLK6qYaxoMb1jeD8Zz3x1g%3D%3D','2024-11-19 11:02:37','2024-11-19 11:02:37');
/*!40000 ALTER TABLE `Photos` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QuestionGroups`
--

LOCK TABLES `QuestionGroups` WRITE;
/*!40000 ALTER TABLE `QuestionGroups` DISABLE KEYS */;
INSERT INTO `QuestionGroups` VALUES (20,1,'Test 1','2024-11-19 11:02:36','2024-11-19 11:02:36'),(21,2,'Test 1','2024-11-19 13:57:42','2024-11-19 13:57:42');
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
  `photoId` int DEFAULT NULL,
  `audioId` int DEFAULT NULL,
  `explanationTextId` int DEFAULT NULL,
  `question` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `groupId` (`groupId`),
  KEY `photoId` (`photoId`),
  KEY `audioId` (`audioId`),
  KEY `explanationTextId` (`explanationTextId`),
  CONSTRAINT `Questions_ibfk_1` FOREIGN KEY (`groupId`) REFERENCES `QuestionGroups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Questions_ibfk_2` FOREIGN KEY (`photoId`) REFERENCES `Photos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Questions_ibfk_3` FOREIGN KEY (`audioId`) REFERENCES `Audios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Questions_ibfk_4` FOREIGN KEY (`explanationTextId`) REFERENCES `ExplanationTexts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Questions`
--

LOCK TABLES `Questions` WRITE;
/*!40000 ALTER TABLE `Questions` DISABLE KEYS */;
INSERT INTO `Questions` VALUES (115,20,59,58,NULL,'','2024-11-19 11:02:36','2024-11-19 11:02:38'),(116,20,61,56,NULL,'','2024-11-19 11:02:36','2024-11-19 11:02:38'),(117,20,58,59,NULL,'','2024-11-19 11:02:36','2024-11-19 11:02:38'),(118,20,60,57,NULL,'','2024-11-19 11:02:36','2024-11-19 11:02:38'),(119,20,62,60,NULL,'','2024-11-19 11:02:36','2024-11-19 11:02:38'),(120,20,63,61,NULL,'','2024-11-19 11:02:36','2024-11-19 11:02:38'),(121,21,NULL,65,NULL,'Why weren’t the flyers ready in time for the event?','2024-11-19 13:57:42','2024-11-19 13:57:46'),(122,21,NULL,63,NULL,'How about renting a larger space for the party?','2024-11-19 13:57:42','2024-11-19 13:57:46'),(123,21,NULL,64,NULL,'How was the museum tour?','2024-11-19 13:57:42','2024-11-19 13:57:46'),(124,21,NULL,66,NULL,'What was the cost of replacing the window?','2024-11-19 13:57:42','2024-11-19 13:57:46'),(125,21,NULL,73,NULL,'It’s a comfortable chair.','2024-11-19 13:57:42','2024-11-19 13:57:46'),(126,21,NULL,76,NULL,'Have you introduced yourself to the new employee?','2024-11-19 13:57:42','2024-11-19 13:57:46'),(127,21,NULL,77,NULL,'Who’s speaking at tonight’s opening ceremony?','2024-11-19 13:57:42','2024-11-19 13:57:46'),(128,21,NULL,79,NULL,'Why don’t we take a group picture?','2024-11-19 13:57:42','2024-11-19 13:57:46'),(129,21,NULL,78,NULL,'When should I turn on the air conditioner?','2024-11-19 13:57:42','2024-11-19 13:57:46'),(130,21,NULL,81,NULL,'Shouldn’t our food have been served by now?','2024-11-19 13:57:42','2024-11-19 13:57:46'),(131,21,NULL,80,NULL,'Would you like to work together or separately?','2024-11-19 13:57:42','2024-11-19 13:57:46'),(132,21,NULL,82,NULL,'Where was the company picnic held?','2024-11-19 13:57:42','2024-11-19 13:57:46'),(133,21,NULL,84,NULL,'Have you considered building a fence?','2024-11-19 13:57:42','2024-11-19 13:57:46'),(134,21,NULL,83,NULL,'Will you be checking your e-mail tomorrow?','2024-11-19 13:57:42','2024-11-19 13:57:46'),(135,21,NULL,85,NULL,'I was very impressed with Alex’s singing.','2024-11-19 13:57:42','2024-11-19 13:57:46'),(136,21,NULL,86,NULL,'Would you like to borrow this book when I finish reading it?','2024-11-19 13:57:42','2024-11-19 13:57:46'),(137,21,NULL,62,NULL,'Are you going out for dinner or staying in?','2024-11-19 13:57:42','2024-11-19 13:57:46'),(138,21,NULL,68,NULL,'Who’s working at the front desk today?','2024-11-19 13:57:42','2024-11-19 13:57:46'),(139,21,NULL,69,NULL,'Didn’t you receive a paycheck?','2024-11-19 13:57:42','2024-11-19 13:57:46'),(140,21,NULL,70,NULL,'Why did the subway stop running early tonight?','2024-11-19 13:57:42','2024-11-19 13:57:47'),(141,21,NULL,71,NULL,'You set up chairs in the conference room, didn’t you?','2024-11-19 13:57:42','2024-11-19 13:57:47'),(142,21,NULL,67,NULL,'This new coffee maker was very expensive.','2024-11-19 13:57:42','2024-11-19 13:57:47'),(143,21,NULL,72,NULL,'The elevator has been repaired, right?','2024-11-19 13:57:42','2024-11-19 13:57:47'),(144,21,NULL,74,NULL,'I couldn’t get a hold of George.','2024-11-19 13:57:42','2024-11-19 13:57:47'),(145,21,NULL,75,NULL,'Where does this bus go to?','2024-11-19 13:57:42','2024-11-19 13:57:47');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RefreshTokens`
--

LOCK TABLES `RefreshTokens` WRITE;
/*!40000 ALTER TABLE `RefreshTokens` DISABLE KEYS */;
INSERT INTO `RefreshTokens` VALUES (2,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMxOTk1ODk5LCJleHAiOjE3MzMyMDU0OTl9.qYRF4vOkdku0_aMhKEbcgYKUxsIK0DnPba0lbCyyZqc','2024-11-19 12:58:19','2024-11-19 12:58:19');
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
INSERT INTO `RoleDetails` VALUES (1,30001,'2024-11-18 22:45:56','2024-11-18 22:45:56'),(1,52456,'2024-11-18 22:45:56','2024-11-18 22:45:56'),(1,78643,'2024-11-18 22:45:56','2024-11-18 22:45:56');
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
INSERT INTO `SequelizeMeta` VALUES ('2000-create-user.js'),('2001-create-vocabulary-topics.js'),('2002-create-vocabulary.js'),('2003-create-vocabulary-practice-status.js'),('2004-create-role.js'),('2005-create-role-detail.js'),('2006-create-refresh-token.js'),('2007-create-part.js'),('2008-create-question-group.js'),('2009-create-audio.js'),('2010-create-photo.js'),('2011-create-explanation-text.js'),('2012-create-question.js'),('2013-create-answer.js'),('2014-create-correct-answer.js'),('2015-create-user-answer.js');
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
INSERT INTO `Users` VALUES (1,'Truong','Nguyen','nguyenthaitruong1223@gmail.com','$2b$10$bfCAN3DDxO0Q83O8c9aEu.S.Ca0.EI9luMRF/FzNtfAc2V9CX6Wca','0948915051','2024-11-18 22:45:56','2024-11-18 22:45:56');
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
  `topicId` int DEFAULT NULL,
  `word` varchar(50) DEFAULT NULL,
  `pronounciation` varchar(100) DEFAULT NULL,
  `definition` text,
  `example` text,
  `image` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `topicId` (`topicId`),
  CONSTRAINT `Vocabularies_ibfk_1` FOREIGN KEY (`topicId`) REFERENCES `VocabularyTopics` (`id`)
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

-- Dump completed on 2024-11-19 14:08:07
