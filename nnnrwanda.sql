-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2025 at 08:09 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nnnrwanda`
--

-- --------------------------------------------------------

--
-- Table structure for table `advertisements`
--

CREATE TABLE `advertisements` (
  `id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `advertisements`
--

INSERT INTO `advertisements` (`id`, `title`, `image`, `link`, `created_at`) VALUES
(1, 'flyers', '_KzPG22w.jpg', '', '2025-07-30 07:23:56'),
(2, 'bb', 'Ctntk166.jpg', '', '2025-07-30 07:47:29'),
(3, 'nn', 'IMG-20250602-WA0004.jpg', '', '2025-07-30 07:47:45'),
(4, 'fr', 'IMG-20250602-WA0002.jpg', '', '2025-07-30 07:47:58'),
(5, 'aa', '7Kjum8Am.jpg', '', '2025-07-30 08:16:22'),
(6, 'dr', '2EAVAMk8.jpg', '', '2025-07-30 08:16:40');

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `video` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `views` int(11) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `category_id` int(11) DEFAULT NULL,
  `comment_count` int(11) DEFAULT 0,
  `likes` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `body`, `video`, `image`, `author_id`, `status`, `views`, `created_at`, `updated_at`, `category_id`, `comment_count`, `likes`) VALUES
(12, 'nexus new network rwanda broadcasting', 'this website is live now ca vist us and we show you mare best', NULL, NULL, NULL, '', 0, '2025-07-25 08:57:17', '2025-07-25 08:57:17', 0, 0, 0),
(18, 'nexus new network rwanda broadcasting', 'nnnnnnnnnnnnnnnb', NULL, 'nnn.jpg', 0, '', 0, '2025-07-26 03:27:20', '2025-07-26 03:27:20', 1, 0, 0),
(21, 'nexus new network rwanda broadcasting', 'This is our webste visit us and enjoy your digital life', NULL, 'nnn.jpg', 0, 'approved', 0, '2025-07-26 03:28:35', '2025-07-26 03:28:35', 8, 0, 0),
(22, 'nexus new network rwanda broadcasting', 'nnnnnnnnnnnnnnnnnnnnnnnnnwebsite', NULL, 'nnn.jpg', 0, 'approved', 0, '2025-07-26 05:24:48', '2025-07-26 05:33:17', 8, 0, 0),
(23, 'nexus new network rwanda broadcasting', 'nexus news nwtwork website yasohotse aho uzajya wirebera inkuru zose ushaka kandi kugihe ushobora kutwandikira cyagwa ukadusura kuri nnnrwanda', NULL, 'nnn.jpg', 0, 'approved', 0, '2025-07-26 05:26:55', '2025-07-26 05:41:50', 8, 0, 0),
(27, 'nexus new network rwanda broadcasting', 'webste yacu yasohotse ngwino dushyigikirane', NULL, 'ig.jpg', 0, 'approved', 3, '2025-07-26 06:40:29', '2025-07-29 10:03:57', 8, 0, 1),
(28, 'nexus new network rwanda broadcasting', 'webste yacu yasohotse ngwino dushyigikirane', NULL, 'ig.jpg', 0, 'approved', 0, '2025-07-26 06:41:59', '2025-07-26 08:35:47', 8, 0, 0),
(29, 'amahoro yesu atanga ya glory of god', 'amahoro yesu atanga aduha kurenga ibibazo tukabibona nkibitariho tukagendera mubutsinzi', NULL, 'rwflag.jpeg', 0, 'approved', 2, '2025-07-27 06:16:44', '2025-07-27 06:52:39', 3, 0, 0),
(30, 'my  brother', 'my brother i love you u\'re awesame one in my life', NULL, 'alinee.jpg', 0, 'approved', 0, '2025-07-28 11:19:28', '2025-07-30 06:26:42', 10, 0, 0),
(31, 'jesus is king is my savior forever and ever', 'fwxadv ce8vetuygdhw.gdwauidiiawefugyeagfguuhrehiafn.xbnvgcfcgegaywfuiwehoihfiwhba', NULL, 'cc.jpg', 0, 'approved', 2, '2025-07-28 11:52:55', '2025-07-29 10:52:31', 8, 1, 3),
(32, 'abcdefghijklmnop', 'wwwwvvbcbdbbdcjbm,cnSMC<BBSBHEhywegf,FEHYEg', NULL, 'cj.jpg', 0, 'approved', 7, '2025-07-28 12:04:16', '2025-07-29 11:32:43', 4, 0, 0),
(33, 'imana ninziza ibihe byose', 'imana yacu niyo yo kwiringirwa ibihe nibihe haba kumanywa mumwijim wicuraburindi ni aimana itabara', NULL, 'cc.jpg', 0, 'approved', 0, '2025-07-29 11:22:37', '2025-07-29 11:37:51', 9, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`) VALUES
(1, 'Home', '2025-07-25 14:32:35'),
(2, 'Politics', '2025-07-25 14:32:35'),
(3, 'Business', '2025-07-25 14:32:35'),
(4, 'Culture', '2025-07-25 14:32:35'),
(5, 'Entertainment', '2025-07-25 14:32:35'),
(6, 'Life', '2025-07-25 14:32:35'),
(7, 'Sport', '2025-07-25 14:32:35'),
(8, 'Opinion', '2025-07-25 14:32:35'),
(9, 'TV', '2025-07-25 14:32:35'),
(10, 'Community', '2025-07-25 14:32:35');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `article_id` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `comment_text` text DEFAULT NULL,
  `likes` int(11) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `article_id`, `parent_id`, `username`, `comment_text`, `likes`, `created_at`) VALUES
(2, 31, NULL, 'chanceline', 'wooow nukuri komereza aho courage pee gusa ntafoto wasyizeho', 0, '2025-07-29 10:33:25'),
(3, 31, NULL, 'chanceline', 'wooow nukuri komereza aho courage pee gusa ntafoto wasyizeho', 0, '2025-07-29 10:47:25'),
(4, 31, NULL, 'vvvvvvvvvvvv', 'wooow nukuri komereza aho courage pee gusa ntafoto wasyizeho', 0, '2025-07-29 10:52:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('author','admin') DEFAULT 'author',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'umugwaneza aline', 'umugwanezaaline77@gmail.com', '$2y$10$usB3GHSGATtL.5J62K2m9O4HbenDAZZztidKNPprCDUO3qyYknA92', 'author', '2025-07-25 12:09:33'),
(2, 'rizzy', 'rizzy1@gmail.com', '$2y$10$J2vcyt5sHtYN91fYWOnOMOTA3rr.oT5yYrP.MEwnG0jlpiDoshDla', 'admin', '2025-07-25 13:14:48');

-- --------------------------------------------------------

--
-- Table structure for table `views`
--

CREATE TABLE `views` (
  `id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `viewer_ip` varchar(45) DEFAULT NULL,
  `viewed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advertisements`
--
ALTER TABLE `advertisements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `articles_ibfk_1` (`author_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `article_id` (`article_id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `views`
--
ALTER TABLE `views`
  ADD PRIMARY KEY (`id`),
  ADD KEY `article_id` (`article_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `advertisements`
--
ALTER TABLE `advertisements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `views`
--
ALTER TABLE `views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `views`
--
ALTER TABLE `views`
  ADD CONSTRAINT `views_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
