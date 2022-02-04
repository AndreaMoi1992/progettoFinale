-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Feb 04, 2022 alle 15:11
-- Versione del server: 10.4.22-MariaDB
-- Versione PHP: 8.0.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thenetfish`
--
CREATE DATABASE IF NOT EXISTS `thenetfish` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `thenetfish`;

-- --------------------------------------------------------

--
-- Struttura della tabella `filmapiindatabase`
--

CREATE TABLE IF NOT EXISTS `filmapiindatabase` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adult` bit(1) NOT NULL,
  `backdrop_path` varchar(128) NOT NULL,
  `idmovie` int(11) NOT NULL,
  `media_type` varchar(128) NOT NULL,
  `original_language` varchar(128) NOT NULL,
  `overview` varchar(128) NOT NULL,
  `popularity` int(11) NOT NULL,
  `release_date` varchar(200) NOT NULL,
  `title` varchar(200) NOT NULL,
  `video` bit(1) NOT NULL,
  `image_path` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_nb4h0p6txrmfc0xbrd1kglp9t` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(3, 'ROLE_ADMIN'),
(2, 'ROLE_PM'),
(1, 'ROLE_USER');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
