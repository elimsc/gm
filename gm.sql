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
INSERT INTO `user` VALUES ('1', 'super', '$2b$10$zqti5Z3PYoGkF4MTGlEiLuLMQALHIhkLpVNsc324hy4stMil0of7O', null, '3');
INSERT INTO `user` VALUES ('2', 'operation', '$2b$10$zqti5Z3PYoGkF4MTGlEiLuLMQALHIhkLpVNsc324hy4stMil0of7O', null, '2');
INSERT INTO `user` VALUES ('3', 'simple', '$2b$10$zqti5Z3PYoGkF4MTGlEiLuLMQALHIhkLpVNsc324hy4stMil0of7O', null, null);


DROP TABLE IF EXISTS `actlog`;
CREATE TABLE `actlog` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `subject` varchar(100) NOT NULL DEFAULT '' COMMENT '操作人',
  `object` varchar(100) DEFAULT '' COMMENT '操作对象',
  `action` varchar(255) NOT NULL DEFAULT '' COMMENT '动作名称',
  `part_id` int(11) DEFAULT NULL COMMENT '区服id',
  `data` text NOT NULL COMMENT '操作相关数据',
  `channel_id` smallint NOT NULL COMMENT '渠道id', 
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
