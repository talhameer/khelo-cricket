-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 18, 2021 at 02:43 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `khelo_cricket`
--

-- --------------------------------------------------------

--
-- Table structure for table `batting_scoreboard`
--

CREATE TABLE `batting_scoreboard` (
  `id` int(11) NOT NULL,
  `match_id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL,
  `runs` int(11) NOT NULL,
  `balls` int(11) DEFAULT NULL,
  `sixes` int(11) NOT NULL,
  `fours` int(11) NOT NULL,
  `singles` int(11) NOT NULL,
  `strike_rate` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `batting_scoreboard`
--

INSERT INTO `batting_scoreboard` (`id`, `match_id`, `player_id`, `runs`, `balls`, `sixes`, `fours`, `singles`, `strike_rate`) VALUES
(4, 1, 2, 37, 25, 2, 4, 9, 1.6),
(5, 1, 3, 57, 60, 12, 20, 25, 0),
(6, 2, 3, 41, 25, 2, 5, 9, 1.6);

-- --------------------------------------------------------

--
-- Table structure for table `bowling_scoreboard`
--

CREATE TABLE `bowling_scoreboard` (
  `id` int(11) NOT NULL,
  `match_id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL,
  `overs` int(11) NOT NULL,
  `median` int(11) NOT NULL,
  `runs` int(11) NOT NULL,
  `wickets` int(11) NOT NULL,
  `econ` float NOT NULL,
  `dots` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bowling_scoreboard`
--

INSERT INTO `bowling_scoreboard` (`id`, `match_id`, `player_id`, `overs`, `median`, `runs`, `wickets`, `econ`, `dots`) VALUES
(1, 1, 2, 4, 1, 27, 1, 1.6, 6),
(2, 1, 3, 4, 1, 27, 1, 1.6, 6);

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `id` int(11) NOT NULL,
  `match_type` int(11) DEFAULT 3,
  `team1` int(11) NOT NULL,
  `team2` int(11) NOT NULL,
  `tournament_id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `team1_runs` int(11) DEFAULT NULL,
  `team1_wickets` int(11) DEFAULT NULL,
  `team1_extras` int(11) DEFAULT NULL,
  `team2_runs` int(11) DEFAULT NULL,
  `team2_wickets` int(11) DEFAULT NULL,
  `team2_extras` int(11) DEFAULT NULL,
  `winner` int(11) DEFAULT NULL,
  `statement` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`id`, `match_type`, `team1`, `team2`, `tournament_id`, `date`, `time`, `team1_runs`, `team1_wickets`, `team2_runs`, `team2_wickets`, `team1_extras`, `team2_extras`, `winner`, `statement`) VALUES
(1, 3, 1, 2, 1, '2021-10-14', NULL, 300, NULL, 299, NULL, NULL, NULL, 1, NULL),
(2, 3, 1, 4, 1, '2021-10-12', '09:00:00', 100, 2, 99, 10, NULL, NULL, 1, 'Anything here'),
(3, 3, 1, 4, 1, '2021-10-10', '09:00:00', 100, 2, 99, 10, NULL, NULL, 4, 'Anything here'),
(4, 3, 2, 4, 2, '2022-10-12', '09:00:00', 100, 2, 99, 10, 2, 10, 4, 'Anything here');

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `dob` date NOT NULL,
  `height` varchar(20) NOT NULL,
  `role` varchar(20) NOT NULL,
  `batting_style` varchar(25) DEFAULT NULL,
  `bowling_style` varchar(25) DEFAULT NULL,
  `team` int(11) NOT NULL,
  `is_retired` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `name`, `dob`, `height`, `role`, `batting_style`, `bowling_style`, `team`, `is_retired`) VALUES
(2, 'Talha Meer', '0000-00-00', '', 'bowler', 'Right Hand', 'Left Hand', 1, 0),
(3, 'Talha Meer', '2021-04-05', '', 'batsman', 'left hand', 'right hand', 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `logo` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `coach` varchar(50) NOT NULL,
  `coach_experience` int(11) NOT NULL,
  `coach_expertise` varchar(25) NOT NULL,
  `coach_dob` date DEFAULT NULL,
  `sponsor` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `name`, `logo`, `is_active`, `coach`, `coach_experience`, `coach_expertise`, `coach_dob`, `sponsor`) VALUES
(1, 'Pakistan', '/logo/path', 1, 'Misbah', 0, '', NULL, 'Talha Meer'),
(2, 'Ireland', NULL, 1, 'XYZ', 0, '', NULL, 'ABC'),
(3, 'UK', NULL, 1, 'XYZ', 0, '', NULL, 'ABC'),
(4, 'Ireland', '/uploads/logo-1620487252545.png', 1, 'asdasd', 0, '', NULL, 'sasasdasd'),
(5, 'Australia', '/uploads/logo-1620487286357.png', 1, 'asdasd', 0, '', NULL, 'sasasdasd'),
(6, 'New Zealand', '/uploads/logo-1620499346124.png', 1, 'asdasd', 0, '', NULL, 'sasasdasd'),
(7, 'Afghanistan', '/uploads/logo-1620559223334.png', 1, 'asdasd', 5, 'batsman', '1111-11-11', 'sasasdasd');

-- --------------------------------------------------------

--
-- Table structure for table `tournaments`
--

CREATE TABLE `tournaments` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `venue` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `winner` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tournaments`
--

INSERT INTO `tournaments` (`id`, `name`, `venue`, `start_date`, `end_date`, `winner`) VALUES
(1, 'PSL Season 6', 'Karachi', '2021-04-01', '2021-04-07', 1),
(2, 'PSL season 5', 'Lahore', '2019-12-03', '2019-12-03', 2),
(4, 'PSL season 7', 'Lahore', '2022-11-03', '2022-12-03', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `batting_scoreboard`
--
ALTER TABLE `batting_scoreboard`
  ADD PRIMARY KEY (`id`),
  ADD KEY `match_id` (`match_id`),
  ADD KEY `player_id` (`player_id`);

--
-- Indexes for table `bowling_scoreboard`
--
ALTER TABLE `bowling_scoreboard`
  ADD PRIMARY KEY (`id`),
  ADD KEY `match` (`match_id`),
  ADD KEY `player` (`player_id`);

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tournament_id` (`tournament_id`),
  ADD KEY `team1_id` (`team1`),
  ADD KEY `team2_id` (`team2`),
  ADD KEY `winner_team` (`winner`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team_id` (`team`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `tournaments`
--
ALTER TABLE `tournaments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `winner_team_id` (`winner`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `batting_scoreboard`
--
ALTER TABLE `batting_scoreboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `bowling_scoreboard`
--
ALTER TABLE `bowling_scoreboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tournaments`
--
ALTER TABLE `tournaments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
  
--
-- Constraints for dumped tables
--

--
-- Constraints for table `batting_scoreboard`
--
ALTER TABLE `batting_scoreboard`
  ADD CONSTRAINT `match_id` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`),
  ADD CONSTRAINT `player_id` FOREIGN KEY (`player_id`) REFERENCES `players` (`id`);

--
-- Constraints for table `bowling_scoreboard`
--
ALTER TABLE `bowling_scoreboard`
  ADD CONSTRAINT `match` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`),
  ADD CONSTRAINT `player` FOREIGN KEY (`player_id`) REFERENCES `players` (`id`);

--
-- Constraints for table `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `team1_id` FOREIGN KEY (`team1`) REFERENCES `teams` (`id`),
  ADD CONSTRAINT `team2_id` FOREIGN KEY (`team2`) REFERENCES `teams` (`id`),
  ADD CONSTRAINT `tournament_id` FOREIGN KEY (`tournament_id`) REFERENCES `tournaments` (`id`),
  ADD CONSTRAINT `winner_team` FOREIGN KEY (`winner`) REFERENCES `teams` (`id`);

--
-- Constraints for table `players`
--
ALTER TABLE `players`
  ADD CONSTRAINT `team_id` FOREIGN KEY (`team`) REFERENCES `teams` (`id`);

--
-- Constraints for table `tournaments`
--
ALTER TABLE `tournaments`
  ADD CONSTRAINT `winner_team_id` FOREIGN KEY (`winner`) REFERENCES `teams` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
