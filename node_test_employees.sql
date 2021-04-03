-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2021 at 07:25 AM
-- Server version: 10.5.9-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node_test_employees`
--

-- --------------------------------------------------------

--
-- Table structure for table `dept_tbl`
--

CREATE TABLE `dept_tbl` (
  `id_` int(11) NOT NULL,
  `title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dept_tbl`
--

INSERT INTO `dept_tbl` (`id_`, `title`) VALUES
(1, 'Development'),
(2, 'Marketing'),
(3, 'Accounting'),
(4, 'HR');

-- --------------------------------------------------------

--
-- Table structure for table `emp_tbl`
--

CREATE TABLE `emp_tbl` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(12) NOT NULL,
  `city` varchar(255) NOT NULL,
  `departmentId` int(2) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `hireDate` datetime NOT NULL,
  `isPermanent` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `emp_tbl`
--

INSERT INTO `emp_tbl` (`id`, `fullName`, `email`, `mobile`, `city`, `departmentId`, `gender`, `hireDate`, `isPermanent`) VALUES
(1, 'Jane Walter', 'janewalter@example.com', '08175696741', 'Kaduna', 3, 'female', '2021-02-17 22:16:00', 0),
(2, 'John Doe', 'johndoe@example.com', '08149819885', 'Lagos', 2, 'male', '2021-01-17 21:16:00', 1),
(4, 'Ruth Uga', 'ruthogbu07@gmail.com', '0814989198', 'Kano', 1, 'female', '2021-02-27 09:42:00', 1),
(6, 'Eniola Micheal', 'eni@gmail.com', '78459852145', 'Layin Boka', 2, 'male', '2021-02-01 19:00:00', 0),
(7, 'JJ', 'jj@example.com', '78945654985', 'India', 4, 'female', '2021-02-03 18:48:00', 1),
(8, 'James Foxx', 'jfoxx09@gmail.com', '08595542528', 'New York', 1, 'male', '2020-07-01 15:53:00', 0),
(9, 'Neutron Chan', 'chan@outlook.com', '08569657845', 'Hong Kong', 1, 'male', '2019-12-02 22:00:00', 1),
(10, 'Ejimi Kings', 'ejk@example.com', '08159665845', 'Zaria', 3, 'male', '1990-04-30 12:00:00', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dept_tbl`
--
ALTER TABLE `dept_tbl`
  ADD PRIMARY KEY (`id_`);

--
-- Indexes for table `emp_tbl`
--
ALTER TABLE `emp_tbl`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dept_tbl`
--
ALTER TABLE `dept_tbl`
  MODIFY `id_` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `emp_tbl`
--
ALTER TABLE `emp_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
