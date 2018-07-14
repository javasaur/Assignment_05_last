CREATE DATABASE  IF NOT EXISTS `chat` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `chat`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: chat
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `msg_id` int(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `talk_id` varchar(40) NOT NULL,
  `date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`msg_id`),
  KEY `user_id` (`user_id`),
  KEY `talk_id` (`talk_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`talk_id`) REFERENCES `talks` (`talk_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'The world where Eredin couldn\'t find you, what was it like?',2,'1','2018-07-13 05:31:52'),(2,'You wouldn\'t believe me if I told you.',3,'1','2018-07-13 05:32:10'),(3,'Try me.',2,'1','2018-07-13 05:32:21'),(4,'People there had metal in their heads, waged war from a distance, using things similar to megascopes.',3,'1','2018-07-13 05:32:43'),(5,'And there were no horses, everyone had their own flying ship instead.',3,'1','2018-07-13 05:33:07'),(6,'Ciri, stop fooling around.\n',2,'1','2018-07-13 05:33:21'),(7,'Told you you wouldn\'t believe me.',3,'1','2018-07-13 05:33:39');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `talks`
--

DROP TABLE IF EXISTS `talks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `talks` (
  `talk_id` varchar(40) NOT NULL,
  `name` varchar(30) NOT NULL,
  `parent` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`talk_id`)
) ENGINE=InnoDB;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `talks`
--

LOCK TABLES `talks` WRITE;
/*!40000 ALTER TABLE `talks` DISABLE KEYS */;
INSERT INTO `talks` VALUES ('1','Cyberpunk 2077',NULL),('2','Friends',NULL),('3','Colleagues',NULL),('4','Coffee',NULL),('5','Army',NULL),('6','Americano','4');
/*!40000 ALTER TABLE `talks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `talks_users`
--

DROP TABLE IF EXISTS `talks_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `talks_users` (
  `talk_id` varchar(40) NOT NULL,
  `user_id` int(11) NOT NULL,
  KEY `talk_id` (`talk_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `talks_users_ibfk_1` FOREIGN KEY (`talk_id`) REFERENCES `talks` (`talk_id`),
  CONSTRAINT `talks_users_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `talks_users`
--

LOCK TABLES `talks_users` WRITE;
/*!40000 ALTER TABLE `talks_users` DISABLE KEYS */;
INSERT INTO `talks_users` VALUES ('1',2),('1',3);
/*!40000 ALTER TABLE `talks_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unread_messages_counter`
--

DROP TABLE IF EXISTS `unread_messages_counter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unread_messages_counter` (
  `talk_id` varchar(40) NOT NULL,
  `user_id` int(11) NOT NULL,
  `counter` int(10) DEFAULT '0',
  KEY `talk_id` (`talk_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `unread_messages_counter_ibfk_1` FOREIGN KEY (`talk_id`) REFERENCES `talks` (`talk_id`),
  CONSTRAINT `unread_messages_counter_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unread_messages_counter`
--

LOCK TABLES `unread_messages_counter` WRITE;
/*!40000 ALTER TABLE `unread_messages_counter` DISABLE KEYS */;
INSERT INTO `unread_messages_counter` VALUES ('1',2,1),('1',3,1);
/*!40000 ALTER TABLE `unread_messages_counter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `age` int(11) NOT NULL,
  `password` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `U_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=23;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Feo',25,'$2b$10$M684OmfKbu.o3LkcuQO6mei2iQgsjVqjrFGXsJLxEvlfWt1vCwMLK'),(2,'Geralt',106,'$2b$10$M684OmfKbu.o3LkcuQO6mei2iQgsjVqjrFGXsJLxEvlfWt1vCwMLK'),(3,'Ciri',23,'$2b$10$M684OmfKbu.o3LkcuQO6mei2iQgsjVqjrFGXsJLxEvlfWt1vCwMLK'),(4,'Udi',28,'$2b$10$M684OmfKbu.o3LkcuQO6mei2iQgsjVqjrFGXsJLxEvlfWt1vCwMLK'),(5,'Ori',25,'$2b$10$M684OmfKbu.o3LkcuQO6mei2iQgsjVqjrFGXsJLxEvlfWt1vCwMLK'),(17,'Roni',31,'$2b$10$M684OmfKbu.o3LkcuQO6mei2iQgsjVqjrFGXsJLxEvlfWt1vCwMLK'),(18,'test',25,'$2b$10$M684OmfKbu.o3LkcuQO6mei2iQgsjVqjrFGXsJLxEvlfWt1vCwMLK'),(19,'Itay',25,'$2b$10$M684OmfKbu.o3LkcuQO6mei2iQgsjVqjrFGXsJLxEvlfWt1vCwMLK'),(20,'Evgeniy',25,'$2b$10$M684OmfKbu.o3LkcuQO6mei2iQgsjVqjrFGXsJLxEvlfWt1vCwMLK');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-14  7:31:38
