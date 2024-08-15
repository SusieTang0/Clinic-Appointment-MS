USE `reactmedicalsystem`;
DROP TABLE IF EXISTS `authorities`;
DROP TABLE IF EXISTS `users`;

--
-- Table structure for table `users`
--
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `enabled` tinyint NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Inserting data for table `users`
--

INSERT INTO `users` 
VALUES 
('john@123.com','{bcrypt}$2a$10$naaUoJUanvIcnRmRhGbcM.hN6K82gOflvbARJC1Php/a.D5z.ezSS',1),
('mary@123.com','{bcrypt}$2a$10$naaUoJUanvIcnRmRhGbcM.hN6K82gOflvbARJC1Php/a.D5z.ezSS',1),
('nancy@123.com','{bcrypt}$2a$10$naaUoJUanvIcnRmRhGbcM.hN6K82gOflvbARJC1Php/a.D5z.ezSS',1),
('susan@123.com','{bcrypt}$2a$10$naaUoJUanvIcnRmRhGbcM.hN6K82gOflvbARJC1Php/a.D5z.ezSS',1),
('anna@123.com','{bcrypt}$2a$10$naaUoJUanvIcnRmRhGbcM.hN6K82gOflvbARJC1Php/a.D5z.ezSS',1),
('lily@123.com','{bcrypt}$2a$10$naaUoJUanvIcnRmRhGbcM.hN6K82gOflvbARJC1Php/a.D5z.ezSS',1);


--
-- Table structure for table `authorities`
--

CREATE TABLE `authorities` (
  `username` varchar(50) NOT NULL,
  `authority` varchar(50) NOT NULL,
  UNIQUE KEY `authorities_idx_1` (`username`,`authority`),
  CONSTRAINT `authorities_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Inserting data for table `authorities`
--

INSERT INTO `authorities` 
VALUES 
('john@123.com','ROLE_DOCTOR'),
('mary@123.com','ROLE_DOCTOR'),
('nancy@123.com','ROLE_DOCTOR'),
('susan@123.com','ROLE_PATIENT'),
('anna@123.com','ROLE_PATIENT'),
('lily@123.com','ROLE_PATIENT');


select * from authorities;
select * from users;