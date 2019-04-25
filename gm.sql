/*
Navicat MySQL Data Transfer

Source Server         : wsl
Source Server Version : 50725
Source Host           : 127.0.0.1:3306
Source Database       : gm

Target Server Type    : MYSQL
Target Server Version : 50725
File Encoding         : 65001

Date: 2019-04-25 11:41:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for anntpl
-- ----------------------------
DROP TABLE IF EXISTS `anntpl`;
CREATE TABLE `anntpl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='公告模板';

-- ----------------------------
-- Records of anntpl
-- ----------------------------
INSERT INTO `anntpl` VALUES ('1', '服务器将在x分x秒后重启');
INSERT INTO `anntpl` VALUES ('2', '服务器将在x秒后重启');
INSERT INTO `anntpl` VALUES ('3', '服务器将在x时x分x秒后维护');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '登陆密码',
  `token` varchar(255) DEFAULT NULL COMMENT '登录用token',
  `role` tinyint(4) DEFAULT NULL COMMENT '权限控制字段，1代表普通管理员，2代表运营管理员，3代表超级管理员',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'super', '$2b$10$PRNpPoeUJYWhUTTA0z0Xku58avBfU4LSYZEAmp/zI.2bZUgrdZN9.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1cGVyIiwiaWF0IjoxNTU2MTYzNDQ3LCJleHAiOjE1NTY3NjgyNDd9.Pd6TRbNV7LT5NjUJuG7gcfo8QKsysR0D0XUTR-fUu28', '3');
INSERT INTO `user` VALUES ('2', 'operation', '$2b$10$3C6RoXHLdhFy6ORa640M5edNHigTK0cDAKDX/LSiYVkDUXtIYieWS', null, null);
INSERT INTO `user` VALUES ('3', 'simple', '$2b$10$E0.gnFXWOS0A6Ut3sua.6evj.ug4RQQtNQLtJpDcVjNbpd6ZsAwhK', null, null);
