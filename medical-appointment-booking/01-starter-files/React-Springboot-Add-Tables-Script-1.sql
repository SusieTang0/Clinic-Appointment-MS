CREATE DATABASE  IF NOT EXISTS `reactmedicalsystem` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `reactmedicalsystem`;
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


DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE patient (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(100),
  lastname VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(100),
  password VARCHAR(100)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO `patient` VALUES 
(1,'Susan','Hack','susan@123.com','111-222-3333',"test123"),
(2,'Anna','White','anna@123.com','444-555-6666',"test123"),
(3,'Lily','Winston','lily@123.com','777-888-9999',"test123");

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE doctor (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(100),
  lastname VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  specialty VARCHAR(100),
   password VARCHAR(100)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO `doctor` VALUES 
(1,'John','Smith','john@123.com','Dermatology',"test123"),
(2,'Mary','Wood','mary@123.com','Allergy and Immunology',"test123"),
(3,'Nancy','Tack','nancy@123.com','Gastroenterology',"test123");

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE appointment (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  patient_name VARCHAR(200),
  patient_id BIGINT NOT NULL,
  doctor_name VARCHAR(200) NOT NULL,
  doctor_id BIGINT NOT NULL,
  date date,
  time time,
  description TEXT,
  status BOOLEAN NOT NULL,
  FOREIGN KEY (patient_id) REFERENCES patient(id),
  FOREIGN KEY (doctor_id) REFERENCES doctor(id)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO `appointment` VALUES 
(1,'Anna White',2,'Mary Wood',2,'2024-7-3','13:00','Allergy and Immunology',true),
(2,'Anna White',2,'Nancy Tack',3,'2024-7-5','13:00','Gastroenterology',true),
(3,'Lily Winston',3,'John Smith',1,'2024-7-5','10:00','Dermatology',true),
(4,'Susan Hack',1,'Nancy Tack',3,'2024-7-16','11:00','Gastroenterology',false),
(5,'Anna White',2,'Mary Wood',2,'2024-7-14','16:00','Allergy and Immunology',false),
(6,'Lily Winston',3,'Mary Wood',2,'2024-7-24','9:00','Allergy and Immunology',false),
(7,'Anna White',2,'Nancy Tack',3,'2024-7-15','16:00','Gastroenterology',false);

select * from patient;
select * from doctor;
select * from appointment;

