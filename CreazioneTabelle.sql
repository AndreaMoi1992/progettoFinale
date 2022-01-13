-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 29, 2020 at 04:47 PM
-- Server version: 5.7.24
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thenetfish`
--

-- --------------------------------------------------------

--
-- Table structure for table `filmapiindatabase`
--

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
-- Indexes for dumped tables
--

--
-- Indexes for table `filmapiindatabase`
--
ALTER TABLE `filmapiindatabase`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `filmapiindatabase`
--
ALTER TABLE `filmapiindatabase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
