-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Gen 12, 2022 alle 15:43
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

DROP TABLE IF EXISTS `filmapiindatabase`;
CREATE TABLE `filmapiindatabase` (
  `id` int(11) NOT NULL,
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
  `image_path` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `filmapiindatabase`
--
ALTER TABLE `filmapiindatabase`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `filmapiindatabase`
--
ALTER TABLE `filmapiindatabase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
