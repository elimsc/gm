/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50727
 Source Host           : localhost:3306
 Source Schema         : gm

 Target Server Type    : MySQL
 Target Server Version : 50727
 File Encoding         : 65001

 Date: 17/04/2021 14:49:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) DEFAULT NULL,
  `channel_id` smallint(6) DEFAULT '-1',
  `menu_ids` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` VALUES (1, '普通管理员', -1, '25,30,31,32,33,34,35,36,37,38,39,40,41');
INSERT INTO `role` VALUES (2, '运营管理员', -1, '1,5,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57');
INSERT INTO `role` VALUES (3, '超级管理员', -1, '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57');
INSERT INTO `role` VALUES (4, '联运运营（天佑）', 3, '15,21,25,28,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,52,54,55,56,57');
INSERT INTO `role` VALUES (5, '联运客服（天佑）', 3, '21,25,28,30,31,32,33,34,35,36,37,38,39,40,41,52,54,55,56,57');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
