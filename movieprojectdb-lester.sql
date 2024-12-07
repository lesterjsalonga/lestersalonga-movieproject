-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2024 at 03:43 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movieprojectdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `casts`
--

CREATE TABLE `casts` (
  `id` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `url` varchar(255) NOT NULL,
  `characterName` varchar(120) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `casts`
--

INSERT INTO `casts` (`id`, `movieId`, `userId`, `name`, `url`, `characterName`, `dateCreated`, `dateUpdated`) VALUES
(990, 44, 57, 'Sanaa Lathan', 'https://image.tmdb.org/t/p/original//wGMgl4eV0hcWpW0mpYmlzgCI7QX.jpg', 'Alexa Woods', '2024-12-05 18:00:02', '2024-12-05 18:00:02'),
(991, 44, 57, 'Lance Henriksen', 'https://image.tmdb.org/t/p/original//5F8cHWGlo2NIiswSn5ymL5ukgxG.jpg', 'Charles Bishop Weyland', '2024-12-05 18:00:02', '2024-12-05 18:00:02'),
(992, 44, 57, 'Raoul Bova', 'https://image.tmdb.org/t/p/original//hJQCTTCB6mCspjjhOkXQ5u0ekWj.jpg', 'Sebastian de Rosa', '2024-12-05 18:00:02', '2024-12-05 18:00:02'),
(993, 44, 57, 'Ewen Bremner', 'https://image.tmdb.org/t/p/original//u80rtfJRqCg4qKcdEPmYv8IkCvu.jpg', 'Graeme Miller', '2024-12-05 18:00:02', '2024-12-05 18:00:02'),
(994, 44, 57, 'Ian Whyte', 'https://image.tmdb.org/t/p/original//svlJyDgPbTHoGjbQKU4S2J6g5hi.jpg', 'Scar', '2024-12-05 18:00:02', '2024-12-05 18:00:02'),
(995, 44, 57, 'Colin Salmon', 'https://image.tmdb.org/t/p/original//mLlAU6Zl2MIL5znp5UHdX3sVTN7.jpg', 'Maxwell Stafford', '2024-12-05 18:00:02', '2024-12-05 18:00:02'),
(996, 44, 57, 'Tommy Flanagan', 'https://image.tmdb.org/t/p/original//5OnvT1KpEk3juZavqOCSAEYOtwl.jpg', 'Mark Verheiden', '2024-12-05 18:00:02', '2024-12-05 18:00:02'),
(997, 44, 57, 'Joseph Rye', 'https://image.tmdb.org/t/p/original//1bk4kfBetEEYSzcWrpy7ra5WDeK.jpg', 'Joe Connors', '2024-12-05 18:00:03', '2024-12-05 18:00:03'),
(998, 44, 57, 'Carsten Nørgaard', 'https://image.tmdb.org/t/p/original//ix5HCHlXxATIwVNhbsp6KwLcj8u.jpg', 'Rusten Quinn', '2024-12-05 18:00:03', '2024-12-05 18:00:03'),
(1025, 48, 57, 'Nobunaga Shimazaki', 'https://image.tmdb.org/t/p/original//qke5rZusHsjSlvB0NKlJ5dQF5D.jpg', 'Seishiro Nagi (voice)', '2024-12-06 13:44:53', '2024-12-06 13:44:53'),
(1026, 48, 57, 'Yuma Uchida', 'https://image.tmdb.org/t/p/original//2otstbLfQ7MXuFt1X8MFOb4OIgd.jpg', 'Reo Mikage (voice)', '2024-12-06 13:44:53', '2024-12-06 13:44:53'),
(1027, 48, 57, 'Kazuki Ura', 'https://image.tmdb.org/t/p/original//7eUgENWREmWSMnLPUFCQhvUSpdI.jpg', 'Yoichi Isagi (voice)', '2024-12-06 13:44:53', '2024-12-06 13:44:53'),
(1028, 48, 57, 'Kazuyuki Okitsu', 'https://image.tmdb.org/t/p/original//vgyaK5dAxhvzAi6LJM3ZyaJd4mJ.jpg', 'Zantetsu Tsurugi (voice)', '2024-12-06 13:44:53', '2024-12-06 13:44:53'),
(1029, 48, 57, 'Tasuku Kaito', 'https://image.tmdb.org/t/p/original//eDtru6RxBnCtuYtU2mIXidKekJv.jpg', 'Meguru Bachira (voice)', '2024-12-06 13:44:53', '2024-12-06 13:44:53'),
(1030, 48, 57, 'Yuki Ono', 'https://image.tmdb.org/t/p/original//oEx13CbNLsHzURdYafkFJYXDjfm.jpg', 'Rensuke Kunigami (voice)', '2024-12-06 13:44:53', '2024-12-06 13:44:53'),
(1031, 48, 57, 'Soma Saito', 'https://image.tmdb.org/t/p/original//8W8Y02Jmjivw0kk5PDih9dqiyd9.jpg', 'Hyoma Chigiri (voice)', '2024-12-06 13:44:53', '2024-12-06 13:44:53'),
(1032, 48, 57, 'Hiroshi Kamiya', 'https://image.tmdb.org/t/p/original//u2r0u8tOa0cyh7nawcEOPpcEZr1.jpg', 'Jinpachi Ego (voice)', '2024-12-06 13:44:54', '2024-12-06 13:44:54'),
(1033, 48, 57, 'Koki Uchiyama', 'https://image.tmdb.org/t/p/original//sllSm3iZZWVLTBrDZQRtWrZUfEj.jpg', 'Rin Itoshi (voice)', '2024-12-06 13:44:54', '2024-12-06 13:44:54'),
(1034, 49, 59, 'Tom Holland', 'https://image.tmdb.org/t/p/original//1d67to0U8bx5jhWTanVx37k6Nd0.jpg', 'eqw', '2024-12-07 00:56:23', '2024-12-07 00:56:23'),
(1035, 49, 59, 'Tao Tsuchiya', 'https://image.tmdb.org/t/p/original//n2665l3bguzDTm5CnyP99ipU9Z0.jpg', 'Maki / Satsuki Nagase', '2024-12-07 00:56:33', '2024-12-07 00:56:33'),
(1038, 49, 59, 'Goro Kishitani', 'https://image.tmdb.org/t/p/original//pYfDZz5RWLICLvf5p2MN0t8MJOf.jpg', 'Yutaka Hashi', '2024-12-07 00:56:33', '2024-12-07 00:56:33'),
(1039, 52, 63, 'Orlando Bloom', 'https://image.tmdb.org/t/p/original//lwQoA0qJTCZ6l2FH6PjmhRQjiaB.jpg', 'Dr. Martin Blake', '2024-12-07 02:40:01', '2024-12-07 02:40:01'),
(1040, 52, 63, 'Riley Keough', 'https://image.tmdb.org/t/p/original//wsodGduU4frFdMy1roqeDmj4kZ.jpg', 'Diane Nixon', '2024-12-07 02:40:02', '2024-12-07 02:40:02'),
(1041, 52, 63, 'Taraji P. Henson', 'https://image.tmdb.org/t/p/original//jUU2X9mDwJaAniEmJOfvImBS9qb.jpg', 'Nurse Theresa', '2024-12-07 02:40:02', '2024-12-07 02:40:02'),
(1042, 52, 63, 'Michael Peña', 'https://image.tmdb.org/t/p/original//ft9e3EX4JG9MwK9pXwgbJ8ZvFoV.jpg', 'Jimmy', '2024-12-07 02:40:02', '2024-12-07 02:40:02'),
(1043, 52, 63, 'Rob Morrow', 'https://image.tmdb.org/t/p/original//nxF4xVyEtQLMxDXlhJHnCoKM4MI.jpg', 'Dr. Waylans', '2024-12-07 02:40:02', '2024-12-07 02:40:02'),
(1044, 52, 63, 'Troy Garity', 'https://image.tmdb.org/t/p/original//eNK78vBECYQbug1h7jFVo8OeHr0.jpg', 'Dan', '2024-12-07 02:40:02', '2024-12-07 02:40:02'),
(1045, 52, 63, 'J.K. Simmons', 'https://image.tmdb.org/t/p/original//ScmKoJ9eiSUOthAt1PDNLi8Fkw.jpg', 'Detective Krauss', '2024-12-07 02:40:02', '2024-12-07 02:40:02'),
(1046, 52, 63, 'Wade Williams', 'https://image.tmdb.org/t/p/original//hXb5ZzrjLnu9dcYaW1kAy9i5Luw.jpg', 'Mr. Nixon', '2024-12-07 02:40:02', '2024-12-07 02:40:02'),
(1047, 52, 63, 'Molly Price', 'https://image.tmdb.org/t/p/original//dmauedGYnj2IWNLFmlTDCYvgBTk.jpg', 'Mrs. Nixon', '2024-12-07 02:40:02', '2024-12-07 02:40:02'),
(1048, 52, 63, 'David Clennon', 'https://image.tmdb.org/t/p/original//1N4KuiRXoX5fAJu9vHpiPOJRGLG.jpg', 'Dr. Harbison', '2024-12-07 02:40:02', '2024-12-07 02:40:02'),
(1049, 52, 63, 'Marin Hinkle', 'https://image.tmdb.org/t/p/original//uk58Dpo68zafLnePSEjgK09hM6X.jpg', 'Dr. Sayler', '2024-12-07 02:40:02', '2024-12-07 02:40:02'),
(1050, 52, 63, 'Monique Gabriela Curnen', 'https://image.tmdb.org/t/p/original//lJgLQs7cfM49m8VzVviwxIByz76.jpg', 'Nurse Maryanne', '2024-12-07 02:40:02', '2024-12-07 02:40:02'),
(1051, 52, 63, 'Sorel Carradine', 'https://image.tmdb.org/t/p/original//j5B1hJ4Rvmx2yeTqncZisn6TKRz.jpg', 'Valerie Nixon', '2024-12-07 02:40:02', '2024-12-07 02:40:02'),
(1052, 52, 63, 'Evan Peters', 'https://image.tmdb.org/t/p/original//m2Tf18YNU1BZkpBkiNupwcYch7x.jpg', 'Donny Nixon', '2024-12-07 02:40:02', '2024-12-07 02:40:02'),
(1053, 52, 63, 'Rick Irwin', 'https://image.tmdb.org/t/p/original//hIuMeQpkQnpteVaeks1dLxILC9N.jpg', 'Dr. Alex Schwartz', '2024-12-07 02:40:02', '2024-12-07 02:40:02'),
(1054, 52, 63, 'Gary Carlos Cervantes', 'https://image.tmdb.org/t/p/original//bdmnlMM9tgAevlO4ZkiQLGZW0XD.jpg', 'Mr. Sanchez', '2024-12-07 02:40:02', '2024-12-07 02:40:02'),
(1055, 52, 63, 'Courtney Ford', 'https://image.tmdb.org/t/p/original//bICbKfv0xHYgCBLD39IqwZjZxSS.jpg', 'Stephanie', '2024-12-07 02:40:02', '2024-12-07 02:40:02'),
(1056, 52, 63, 'Nathan Keyes', 'https://image.tmdb.org/t/p/original//dAsWY6IQfeL8KdTKqN2uCHyC61S.jpg', 'Rich', '2024-12-07 02:40:02', '2024-12-07 02:40:02'),
(1057, 52, 63, 'Sarah Lancaster', 'https://image.tmdb.org/t/p/original//hHSlXjohcTtjT8rjEhYMZQplZ08.jpg', 'Christine', '2024-12-07 02:40:02', '2024-12-07 02:40:02'),
(1058, 52, 63, 'Jean St. James', 'https://image.tmdb.org/t/p/original//8af0uTJHkkVVC4oFC6bNZsxLgfO.jpg', 'Nurse Carol', '2024-12-07 02:40:03', '2024-12-07 02:40:03'),
(1059, 52, 63, 'Randall Park', 'https://image.tmdb.org/t/p/original//5bDlNgwsSKAFjBdSWOwRzyMdJ0E.jpg', 'Clerk', '2024-12-07 02:40:03', '2024-12-07 02:40:03'),
(1060, 52, 63, 'Noel Thurman', 'https://image.tmdb.org/t/p/original//kui15ACSy0nYW2xUvNcly6nJOQE.jpg', 'Mandy Claypool', '2024-12-07 02:40:03', '2024-12-07 02:40:03'),
(1061, 52, 63, 'Freddie Highmore', 'https://image.tmdb.org/t/p/original//9larfGVg8ALIVFkr7cZzv4Emh1F.jpg', 'Dr Shaun Murphey', '2024-12-07 02:40:36', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `tmdbId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `overview` text NOT NULL,
  `popularity` float NOT NULL,
  `releaseDate` date NOT NULL,
  `voteAverage` float NOT NULL,
  `backdropPath` varchar(255) NOT NULL,
  `posterPath` varchar(255) NOT NULL,
  `isFeatured` tinyint(1) NOT NULL DEFAULT 0,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `userId`, `tmdbId`, `title`, `overview`, `popularity`, `releaseDate`, `voteAverage`, `backdropPath`, `posterPath`, `isFeatured`, `dateCreated`, `dateUpdated`) VALUES
(21, 1, 490132, 'Green Book', 'Tony Lip, a bouncer in 1962, is hired to drive pianist Don Shirley on a tour through the Deep South in the days when African Americans, forced to find alternate accommodations and services due to segregation laws below the Mason-Dixon Line, relied on a guide called The Negro Motorist Green Book.', 40.313, '2018-11-16', 8.24, 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//2Xe9lISpwXKhvKiHttbFfVRERQX.jpg', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//7BsvSuDQuoqhWmU2fL7W2GOcZHU.jpg', 0, '2024-11-26 13:47:06', '0000-00-00 00:00:00'),
(22, 1, 653346, 'Kingdom of the Planet of the Apes', 'Several generations following Caesar\'s reign, apes – now the dominant species – live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all he\'s known about the past and to make choices that will define a future for apes and humans alike.', 271.91, '2024-05-08', 7.113, 'https://image.tmdb.org/t/p/original//iHYh4cdO8ylA3W0dUxTDVdyJ5G9.jpg', 'https://image.tmdb.org/t/p/original//gKkl37BQuKTanygYQG1pyYgLVgf.jpg', 0, '2024-11-26 13:47:15', '0000-00-00 00:00:00'),
(26, 1, 568124, 'Encanto 1', 'The tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto. The magic of the Encanto has blessed every child in the family—every child except one, Mirabel. But when she discovers that the magic surrounding the Encanto is in danger, Mirabel decides that she, the only ordinary Madrigal, might just be her exceptional family\'s last hope.', 128.143, '2021-10-13', 7.6, 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//3G1Q5xF40HkUBJXxt2DQgQzKTp5.jpg', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg', 0, '2024-12-01 05:22:16', '0000-00-00 00:00:00'),
(32, 54, 810693, 'Jujutsu Kaisen 1', 'Yuta Okkotsu is a nervous high school student who is suffering from a serious problem—his childhood friend Rika has turned into a curse and won\'t leave him alone. Since Rika is no ordinary curse, his plight is noticed by Satoru Gojo, a teacher at Jujutsu High, a school where fledgling exorcists learn how to combat curses. Gojo convinces Yuta to enroll, but can he learn enough in time to confront the curse that haunts him?', 70.008, '2021-12-24', 8.168, 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//921vUyXdfIYpaXqu5Lnf3nVb4IJ.jpg', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//23oJaeBh0FDk2mQ2P240PU9Xxfh.jpg', 0, '2024-12-02 08:37:49', '0000-00-00 00:00:00'),
(35, 1, 76600, 'Avatar: The Way of Water', 'Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.', 180.705, '2022-12-14', 7.62, 'https://image.tmdb.org/t/p/original//8rpDcsfLJypbO6vREc0547VKqEv.jpg', 'https://image.tmdb.org/t/p/original//t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', 0, '2024-12-02 10:32:14', '0000-00-00 00:00:00'),
(38, 1, 878941, 'Resident', 'One night, a woman finds out that a stranger has been living in her attic for over a month.', 0.902, '2021-10-30', 10, 'https://image.tmdb.org/t/p/original//xuK1CgNlDMz2rKb5hFkcqri2H7Y.jpg', 'https://image.tmdb.org/t/p/original//xuK1CgNlDMz2rKb5hFkcqri2H7Y.jpg', 0, '2024-12-02 23:28:22', '0000-00-00 00:00:00'),
(39, 1, 1040531, 'The Tangalanga Method', 'Shy corporate employee Jorge Rizzi\'s life takes an uproarious turn when he participates in a hypnosis session that rips off his inhibitions and releases a hilarious alter ego.', 1.883, '2023-01-19', 6.4, 'https://image.tmdb.org/t/p/original//fptMBBQzjvqJpXU6cfO5GUM9zN9.jpg', 'https://image.tmdb.org/t/p/original//puKRI1o5DCF4qgoSo5f5J45WVKj.jpg', 1, '2024-12-03 05:31:30', '0000-00-00 00:00:00'),
(40, 1, 884605, 'No Hard Feelings Part 2', 'On the brink of losing her childhood home, Maddie discovers an intriguing job listing: wealthy helicopter parents looking for someone to “date” their introverted 19-year-old son, Percy, before he leaves for college. To her surprise, Maddie soon discovers the awkward Percy is no sure thing.', 55.068, '2023-06-15', 6.8, 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//rRcNmiH55Tz0ugUsDUGmj8Bsa4V.jpg', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//gD72DhJ7NbfxvtxGiAzLaa0xaoj.jpg', 0, '2024-12-03 11:45:24', '0000-00-00 00:00:00'),
(41, 1, 578, 'Jaws', 'When the seaside community of Amity finds itself under attack by a dangerous great white shark, the town\'s chief of police, a young marine biologist, and a grizzled hunter embark on a desperate quest to destroy the beast before it strikes again.', 50.23, '1975-06-20', 7.664, 'https://image.tmdb.org/t/p/original//Ugn7ekAwY8FtaBjRBlbkt0zom2.jpg', 'https://image.tmdb.org/t/p/original//lxM6kqilAdpdhqUl2biYp5frUxE.jpg', 0, '2024-12-04 02:18:39', '0000-00-00 00:00:00'),
(42, 1, 348, 'Alien 2', 'During its return to the earth, commercial spaceship Nostromo intercepts a distress signal from a distant planet. When a three-member team of the crew discovers a chamber containing thousands of eggs on the planet, a creature inside one of the eggs attacks an explorer. The entire crew is unaware of the impending nightmare set to descend upon them when the alien parasite planted inside its unfortunate host is birthed.', 105.19, '1979-05-25', 8.2, 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//hdHIjZxq3SWFqpAz4NFhdbud0iz.jpg', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg', 1, '2024-12-04 05:02:21', '0000-00-00 00:00:00'),
(47, 57, 39254, 'Real Steel', 'Charlie Kenton is a washed-up fighter who retired from the ring when robots took over the sport. After his robot is trashed, he reluctantly teams up with his estranged son to rebuild and train an unlikely contender.', 82.88, '2011-09-28', 7.033, 'https://image.tmdb.org/t/p/original//4f0Kj0QwPui5ydu1UavsnvP1m1o.jpg', 'https://image.tmdb.org/t/p/original//4GIeI5K5YdDUkR3mNQBoScpSFEf.jpg', 1, '2024-12-06 11:08:20', '0000-00-00 00:00:00'),
(48, 57, 1104844, 'RED LOCK THE MOVIE -EPISODE NAGI-', '\"That\'s a hassle.\" That was second-year high schooler Nagi Seishirou\'s favorite phrase as he lived his dull life. Until Mikage Reo, a classmate who dreamed of winning the World Cup, discovered Nagi\'s hidden skill, inspiring him to play soccer and share his outstanding talent. One day, Nagi Seishiro receives an invitation to the mysterious Blue Lock Project. What awaits him there is an encounter with the finest strikers assembled from across the country. Nagi\'s dream of becoming the best, alongside Mikage Reo, will take this prodigy to a world he\'s never known.', 200.071, '2024-04-19', 7.4, 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//7ks7A3mAO7twDOvBVE4cR8LaIM8.jpg', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//ae434jM5NG2kKX1rRkG5giMhpPI.jpg', 1, '2024-12-06 11:52:40', '0000-00-00 00:00:00'),
(52, 63, 65650, 'The Good Doctor', 'Dr. Martin Blake, who has spent his life looking for respect, meets an 18-year-old patient named Diane, suffering from a kidney infection, and gets a much-needed boost of self-esteem. However, when her health starts improving, Martin fears losing her, so he begins tampering with her treatment, keeping Diane sick and in the hospital right next to him.', 16.286, '2011-04-23', 6.168, 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//pRMZilt1YIsu6aNnlpf0lo5Brm4.jpg', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//fJSdqHzpMeCkXMrILYt1SdGN2sL.jpg', 1, '2024-12-07 02:39:50', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `userId`, `movieId`, `url`, `description`, `dateCreated`, `dateUpdated`) VALUES
(134, 57, 48, 'https://image.tmdb.org/t/p/original/7ks7A3mAO7twDOvBVE4cR8LaIM8.jpg', 'TMDB Image', '2024-12-06 13:47:20', '2024-12-06 13:47:20'),
(135, 57, 48, 'https://image.tmdb.org/t/p/original/y4iuM4rBEUsx7Q0lNMLmqPfU1RW.jpg', 'TMDB Image', '2024-12-06 13:47:20', '2024-12-06 13:47:20'),
(136, 57, 48, 'https://image.tmdb.org/t/p/original/kf2WKrAzJ57AAvAAwbWH5BRzPY.jpg', 'TMDB Image', '2024-12-06 13:47:20', '2024-12-06 13:47:20'),
(137, 57, 48, 'https://image.tmdb.org/t/p/original/ae434jM5NG2kKX1rRkG5giMhpPI.jpg', 'TMDB Image', '2024-12-06 13:47:20', '2024-12-06 13:47:20'),
(138, 57, 48, 'https://image.tmdb.org/t/p/original/z1Axpofbs05zyEYcQKEUoxILHUU.jpg', 'TMDB Image', '2024-12-06 13:47:20', '2024-12-06 13:47:20'),
(139, 57, 48, 'https://image.tmdb.org/t/p/original/pHMgWPaZvOlBy0ao8v4ZvTtR1gD.jpg', 'TMDB Image', '2024-12-06 13:47:20', '2024-12-06 13:47:20'),
(140, 57, 48, 'https://image.tmdb.org/t/p/original/jj6HZBU4kLow5LpVL3tfQpbIdtk.jpg', 'TMDB Image', '2024-12-06 13:47:20', '2024-12-06 13:47:20'),
(141, 57, 48, 'https://image.tmdb.org/t/p/original/yN773yRQjwG6KPjUGqBsmiLfKom.jpg', 'TMDB Image', '2024-12-06 13:47:20', '2024-12-06 13:47:20'),
(142, 57, 48, 'https://image.tmdb.org/t/p/original/tT7wk65X4czBIxDjoPRMNw5JhKD.jpg', 'TMDB Image', '2024-12-06 13:47:20', '2024-12-06 13:47:20'),
(147, 63, 52, 'https://image.tmdb.org/t/p/original/oLCzWY6rHZUPwjeKPXkGvzFirpc.jpg', 'TMDB Image', '2024-12-07 02:42:11', '2024-12-07 02:42:11'),
(148, 63, 52, 'https://image.tmdb.org/t/p/original/jPlyFmmh9rHQqIuRtEv0gCsOVPK.jpg', 'TMDB Image 1', '2024-12-07 02:42:11', '2024-12-07 02:42:21'),
(149, 63, 52, 'https://image.tmdb.org/t/p/original/xiyWUHnkOFAijT3m5QoC1VFTzFs.jpg', 'TMDB Image', '2024-12-07 02:42:11', '2024-12-07 02:42:11'),
(150, 63, 52, 'https://image.tmdb.org/t/p/original/NLIaoFXp7WaG4sC00GXYFvNnMH.jpg', 'TMDB Image', '2024-12-07 02:42:11', '2024-12-07 02:42:11'),
(151, 63, 52, 'https://image.tmdb.org/t/p/original/pRMZilt1YIsu6aNnlpf0lo5Brm4.jpg', 'TMDB Image', '2024-12-07 02:42:11', '2024-12-07 02:42:11'),
(152, 63, 52, 'https://image.tmdb.org/t/p/original/fJSdqHzpMeCkXMrILYt1SdGN2sL.jpg', 'TMDB Image', '2024-12-07 02:42:11', '2024-12-07 02:42:11'),
(153, 63, 52, 'https://image.tmdb.org/t/p/original/ot4JZt4iSJTolopkAnSQFcSowlh.jpg', 'TMDB Image', '2024-12-07 02:42:11', '2024-12-07 02:42:11'),
(154, 63, 52, 'https://image.tmdb.org/t/p/original/iXVMUSJaIhSmJxzlKJFwvXmHm8G.jpg', 'TMDB Image', '2024-12-07 02:42:11', '2024-12-07 02:42:11'),
(155, 63, 52, 'https://image.tmdb.org/t/p/original/cpwvgA8lp1mRzhQxY1dkDUqL3WI.jpg', 'TMDB Image', '2024-12-07 02:42:11', '2024-12-07 02:42:11'),
(156, 63, 52, 'https://image.tmdb.org/t/p/original/xrJKOcleRk4WxvqRioTP17nAhSM.jpg', 'TMDB Image', '2024-12-07 02:42:11', '2024-12-07 02:42:11');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(128) NOT NULL,
  `middleName` varchar(128) NOT NULL,
  `lastName` varchar(128) NOT NULL,
  `contactNo` varchar(15) NOT NULL,
  `role` enum('admin','user') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `middleName`, `lastName`, `contactNo`, `role`) VALUES
(1, 'test@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'string', 'string', 'string', 'string', 'user'),
(2, 'captain1@mail.com', 'bdfba4aa7740697eb66d7862cc1cf7e9', 'Steve', 'Jean', 'Rogers', '123456798', 'user'),
(3, 'romce555@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Romce', 'Edward', 'Canete', '0912365497', 'user'),
(4, 'hermoine1@mail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Hermoine', 'Jean', 'Granger', '09355623141', 'user'),
(5, 'try123@gmail.com', '25f9e794323b453885f5181f1b624d0b', 'Nazar', 'Poblete', 'Columpiano', '09632125987', 'user'),
(6, 'chet1@mail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Chet', 'Thomas', 'Holmgren', '09125687498', 'user'),
(7, 'sydd@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'Reynaldo', 'Licaycay', 'Blanco', '09231456879', 'user'),
(8, 'romz1@mail.com', 'e10adc3949ba59abbe56e057f20f883e', 'romzzzy', 'angelo', 'canete', '12345678954', 'user'),
(45, 'terry@mail.com', '202cb962ac59075b964b07152d234b70', 'terry', 'carl', 'rozier', '123331', 'user'),
(46, 'john1@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'john', 'val', 'john', '123321321', 'user'),
(47, 'karl@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'karl', 'lrak', 'karlito', '098862441', 'user'),
(48, 'test2@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'john', 'ef', 'kennedey', '23123123', 'admin'),
(49, 'test3@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'jean', 'gray', 'gl', '123131', 'admin'),
(51, 'test4@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'aklas', 'blkd', 'batas', '23123123', 'user'),
(52, 'test5@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'aklas', 'blkd', 'batas', '23123123', 'user'),
(53, 'test6@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'lester', 'jose', 'salonga', '09765240603', 'admin'),
(54, 'test7@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'lester', 'jose', 'salonga', '09765240603', 'admin'),
(55, 'test1@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'test', 'testy', 'tester', '09765240603', 'user'),
(56, 'romce11@gmail.com', '202cb962ac59075b964b07152d234b70', 'Romce', 'Angelo', 'Canete', '098475843234', 'user'),
(57, 'tezt@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'koby', 'michael', 'james', '123131', 'admin'),
(59, 'lester1@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'lester', 'user', 'user', '1231231', 'admin'),
(60, 'admin@mmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Kai', 'Carl', 'Tamayo', '123321', 'admin'),
(61, 'user@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'user', 'user', 'user', '123321', 'user'),
(62, 'hot@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'hot', 'hot', 'hot', '321123', 'user'),
(63, 'kai@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'kai', 'sotoo', 'johnson', '144123', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `site` text DEFAULT NULL,
  `videoKey` text DEFAULT NULL,
  `videoType` text DEFAULT NULL,
  `official` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `userId`, `movieId`, `url`, `description`, `dateCreated`, `dateUpdated`, `site`, `videoKey`, `videoType`, `official`) VALUES
(212, 1, 23, 'https://www.youtube.com/watch?v=_XkUdr0EDwk', 'AVENGERS 3: Infinity War All Bonus Features & Bloopers (2018)', '2024-12-05 05:42:21', '2024-12-05 05:42:21', 'YouTube', '_XkUdr0EDwk', 'Featurette', '0'),
(213, 1, 23, 'https://www.youtube.com/watch?v=LXPaDL_oILs', '\"Legacy\" TV Spot', '2024-12-05 05:42:21', '2024-12-05 05:42:21', 'YouTube', 'LXPaDL_oILs', 'Teaser', '1'),
(214, 1, 23, 'https://www.youtube.com/watch?v=jQoNILVFFvs', 'Avengers: Infinity War (2018) - \"Dangers Of Strangers\" | Movie Clip', '2024-12-05 05:42:21', '2024-12-05 05:42:21', 'YouTube', 'jQoNILVFFvs', 'Clip', '0'),
(215, 1, 23, 'https://www.youtube.com/watch?v=PARfU2Vi694', 'Avengers vs Ebony Maw & Cull Obsidian | Avengers Infinity War (2018) IMAX Movie Clip HD 4K', '2024-12-05 05:42:21', '2024-12-05 05:42:21', 'YouTube', 'PARfU2Vi694', 'Clip', '0'),
(216, 1, 23, 'https://www.youtube.com/watch?v=PbRmbhdHDDM', '\"Family\" Featurette', '2024-12-05 05:42:21', '2024-12-05 05:42:21', 'YouTube', 'PbRmbhdHDDM', 'Featurette', '1'),
(217, 1, 23, 'https://www.youtube.com/watch?v=49xWJJvpjzI', 'Thor Arrives In Wakanda Scene - Avengers Infinity War (2018) Movie CLIP 4K ULTRA HD', '2024-12-05 05:42:21', '2024-12-05 05:42:21', 'YouTube', '49xWJJvpjzI', 'Clip', '0'),
(218, 1, 23, 'https://www.youtube.com/watch?v=3VbHg5fqBYw', 'Fans reaction Trailer Tease', '2024-12-05 05:42:21', '2024-12-05 05:42:21', 'YouTube', '3VbHg5fqBYw', 'Teaser', '1'),
(219, 1, 23, 'https://www.youtube.com/watch?v=5iOhzJdDawE', 'Chant TV Spot', '2024-12-05 05:42:21', '2024-12-05 05:42:21', 'YouTube', '5iOhzJdDawE', 'Teaser', '1'),
(220, 1, 23, 'https://www.youtube.com/watch?v=sAOzrChqmd0', 'Action...Avengers: Infinity War', '2024-12-05 05:42:21', '2024-12-05 05:42:21', 'YouTube', 'sAOzrChqmd0', 'Behind the Scenes', '1'),
(221, 1, 23, 'https://www.youtube.com/watch?v=pVxOVlm_lE8', 'Big Game Spot', '2024-12-05 05:42:21', '2024-12-05 05:42:21', 'YouTube', 'pVxOVlm_lE8', 'Teaser', '1'),
(222, 1, 23, 'https://www.youtube.com/watch?v=QwievZ1Tx-8', 'Official Trailer #2', '2024-12-05 05:42:21', '2024-12-05 05:42:21', 'YouTube', 'QwievZ1Tx-8', 'Trailer', '1'),
(223, 1, 23, 'https://www.youtube.com/watch?v=6ZfuNTqbHE8', 'Official Trailer', '2024-12-05 05:42:21', '2024-12-05 05:42:21', 'YouTube', '6ZfuNTqbHE8', 'Trailer', '1'),
(224, 1, 21, 'https://www.youtube.com/watch?v=fZgyKVFMQP4', 'bluebook Book | Best Picture | Own it Now on 4K, Blu-ray, DVD & Digital', '2024-12-05 08:46:48', '0000-00-00 00:00:00', 'YouTube', 'fZgyKVFMQP4', 'Teaser', '1'),
(225, 1, 21, 'https://www.youtube.com/watch?v=fMJlovvXJOg', 'The Monumental Meeting', '2024-12-05 08:46:48', '2024-12-05 08:46:48', 'YouTube', 'fMJlovvXJOg', 'Clip', '1'),
(226, 1, 21, 'https://www.youtube.com/watch?v=W3gzPlgZ7aY', 'GREEN BOOK | Official \'Acclaim\' TV Spot [HD]', '2024-12-05 08:46:48', '2024-12-05 08:46:48', 'YouTube', 'W3gzPlgZ7aY', 'Teaser', '1'),
(227, 1, 21, 'https://www.youtube.com/watch?v=DVkL502rfc8', 'Last Night at the Copacabana Extended Preview', '2024-12-05 08:46:48', '2024-12-05 08:46:48', 'YouTube', 'DVkL502rfc8', 'Clip', '1'),
(228, 1, 21, 'https://www.youtube.com/watch?v=Dvetzh4fP3w', 'GREEN BOOK | Official \'Courage\' TV Spot [HD]', '2024-12-05 08:46:48', '2024-12-05 08:46:48', 'YouTube', 'Dvetzh4fP3w', 'Teaser', '1'),
(229, 1, 21, 'https://www.youtube.com/watch?v=nUvRG6F0104', 'GREEN BOOK | Official \'Chicken\' TV Spot [HD]', '2024-12-05 08:46:48', '2024-12-05 08:46:48', 'YouTube', 'nUvRG6F0104', 'Teaser', '1'),
(230, 1, 21, 'https://www.youtube.com/watch?v=OARuYCiVNHc', '\'Green Book\' Q&A | Mahershala Ali, Viggo Mortensen & Peter Farrelly', '2024-12-05 08:46:48', '2024-12-05 08:46:48', 'YouTube', 'OARuYCiVNHc', 'Featurette', '1'),
(231, 1, 21, 'https://www.youtube.com/watch?v=ep1i3zaOgYo', 'GREEN BOOK | Official \'Experience\' TV Spot [HD]', '2024-12-05 08:46:48', '2024-12-05 08:46:48', 'YouTube', 'ep1i3zaOgYo', 'Teaser', '1'),
(232, 1, 21, 'https://www.youtube.com/watch?v=iMHVbFzd1Cw', 'Green Book - In Select Theaters 11/16, Everywhere 11/21 (Aloe Blacc Featurette) [HD]', '2024-12-05 08:46:48', '2024-12-05 08:46:48', 'YouTube', 'iMHVbFzd1Cw', 'Featurette', '1'),
(233, 1, 21, 'https://www.youtube.com/watch?v=3W9LsQbUgYY', 'Green Book - Now Playing (An Unforgettable Friendship) [HD]', '2024-12-05 08:46:48', '2024-12-05 08:46:48', 'YouTube', '3W9LsQbUgYY', 'Behind the Scenes', '1'),
(234, 1, 21, 'https://www.youtube.com/watch?v=ZwWX2EOQcts', 'Academy Conversations: Green Book', '2024-12-05 08:46:48', '2024-12-05 08:46:48', 'YouTube', 'ZwWX2EOQcts', 'Featurette', '1'),
(235, 1, 21, 'https://www.youtube.com/watch?v=D1iiyUSjmaE', 'Green Book - In Theaters Thanksgiving (What Is The Green Book Featurette) [HD]', '2024-12-05 08:46:48', '2024-12-05 08:46:48', 'YouTube', 'D1iiyUSjmaE', 'Featurette', '1'),
(236, 1, 21, 'https://www.youtube.com/watch?v=vQiPPffA6Ik', 'TV Spot - Dignity', '2024-12-05 08:46:49', '2024-12-05 08:46:49', 'YouTube', 'vQiPPffA6Ik', 'Teaser', '1'),
(237, 1, 21, 'https://www.youtube.com/watch?v=QkZxoko_HC0', 'Official Trailer', '2024-12-05 08:46:49', '2024-12-05 08:46:49', 'YouTube', 'QkZxoko_HC0', 'Trailer', '1'),
(238, 57, 44, 'https://www.youtube.com/watch?v=_kF_sV4-nV8', 'AVP: Alien vs. Predator ≣ 2004 ≣ Trailer', '2024-12-05 17:42:25', '2024-12-05 17:42:25', 'YouTube', '_kF_sV4-nV8', 'Trailer', '0'),
(239, 57, 44, 'https://www.youtube.com/watch?v=fQE62sQBkqA', 'Alien vs. Predator (2004) ORIGINAL TRAILER [HD 1080p]', '2024-12-05 17:42:25', '2024-12-05 17:42:25', 'YouTube', 'fQE62sQBkqA', 'Trailer', '0'),
(240, 57, 48, 'https://www.youtube.com/watch?v=PcPQzks4m3A', 'Official Teaser Trailer 1 [Subtitled]', '2024-12-06 11:55:25', '2024-12-06 11:55:25', 'YouTube', 'PcPQzks4m3A', 'Teaser', '1'),
(242, 57, 48, 'https://www.youtube.com/watch?v=PcPQzks4m3A', 'Official Teaser Trailer 1 [Subtitled]', '2024-12-06 13:23:03', '2024-12-06 13:23:03', 'YouTube', 'PcPQzks4m3A', 'Teaser', '1'),
(243, 57, 48, 'https://www.youtube.com/watch?v=6NCsj0anAt8', 'Official Trailer [Subtitled]', '2024-12-06 13:23:03', '2024-12-06 13:23:03', 'YouTube', '6NCsj0anAt8', 'Trailer', '1'),
(245, 63, 52, 'https://www.youtube.com/watch?v=7NwPdz5iU6o', 'The Good Doctor Trailer', '2024-12-07 02:41:14', '0000-00-00 00:00:00', 'YouTube', '7NwPdz5iU6o', 'Trailer', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `casts`
--
ALTER TABLE `casts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `casts`
--
ALTER TABLE `casts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1062;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=246;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
