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

 Date: 17/04/2021 13:39:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_sid` varchar(20) DEFAULT NULL,
  `menu_name` varchar(255) DEFAULT NULL,
  `urls` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of menu
-- ----------------------------
BEGIN;
INSERT INTO `menu` VALUES (1, '1', '玩家操作', 'POST /api/player/list');
INSERT INTO `menu` VALUES (2, '2', '帮会操作', 'POST /api/gang/list\nPOST /api/gang/info\nPOST /api/gang/ban\nPOST /api/gang/notice\nPOST /api/gang/dismiss\nPOST /api/gang/gmins');
INSERT INTO `menu` VALUES (3, '3', '充值上报控制', NULL);
INSERT INTO `menu` VALUES (4, '4', '批量操作', NULL);
INSERT INTO `menu` VALUES (5, '5', '服务器广播', 'GET /api/broadcast/tpl/list\nPOST /api/broadcast/tpl/add\nPOST /api/broadcast/tpl/delete\nPOST /api/broadcast/add');
INSERT INTO `menu` VALUES (6, '6', '系统操作', NULL);
INSERT INTO `menu` VALUES (7, '7', 'GM管理', NULL);
INSERT INTO `menu` VALUES (8, '8', '权限管理', NULL);
INSERT INTO `menu` VALUES (9, '8-1', '角色列表', 'GET /api/authority/role/list\nGET /api/authority/role/one');
INSERT INTO `menu` VALUES (10, '8-2', '新增角色', 'POST /api/authority/role/create\nPOST /api/authority/role/update\nPOST /api/authority/role/delete\nGET /api/authority/menu/tree');
INSERT INTO `menu` VALUES (11, '8-3', '菜单列表', 'GET /api/authority/menu/list');
INSERT INTO `menu` VALUES (12, '8-4', '新增菜单', 'POST /api/authority/menu/create\nPOST /api/authority/menu/update\nPOST /api/authority/menu/delete');
INSERT INTO `menu` VALUES (13, '7-1', 'GM列表', 'GET /api/user/list');
INSERT INTO `menu` VALUES (14, '7-2', '添加GM', 'POST /api/user\nPOST /api/user/update\nPOST /api/user/delete\nGET /api/user/rolelist');
INSERT INTO `menu` VALUES (15, '7-3', '操作日志', 'GET /api/user/actlog/list');
INSERT INTO `menu` VALUES (16, '6-1', '活动与功能管理', 'POST /api/sysact/gmins');
INSERT INTO `menu` VALUES (17, '6-2', 'GM指令（通用）', 'POST /api/sysact/gmins');
INSERT INTO `menu` VALUES (18, '6-3', '现在支付黑白名单', 'POST /api/sysact/listpayblacklist\nPOST /api/sysact/updatepayblacklist');
INSERT INTO `menu` VALUES (19, '6-4', '角色快照导入', 'POST /api/sysact/snapshotimport');
INSERT INTO `menu` VALUES (20, '4-1', '批量操作', 'POST /api/batchact/award\nPOST /api/batchact/ban-account\nPOST /api/batchact/ban-talk');
INSERT INTO `menu` VALUES (21, '4-2', '导出聊天记录', 'POST /api/batchact/export-chatlog');
INSERT INTO `menu` VALUES (22, '4-3', '导出黑名单', 'POST /api/batchact/export-blacklist');
INSERT INTO `menu` VALUES (23, '3-1', '金额上报控制', 'POST /api/moneyreport/report');
INSERT INTO `menu` VALUES (24, '3-2', 'uid上报控制', 'POST /api/moneyreport/report');
INSERT INTO `menu` VALUES (25, '1-1', '玩家信息', NULL);
INSERT INTO `menu` VALUES (26, '1-2', 'GM操作', NULL);
INSERT INTO `menu` VALUES (27, '1-3', '清除数据', NULL);
INSERT INTO `menu` VALUES (28, '1-4', '封号/禁言', NULL);
INSERT INTO `menu` VALUES (29, '1-5', '批量导出', 'POST /api/player/list/batch');
INSERT INTO `menu` VALUES (30, '1-1-1', '玩家基本信息', 'POST /api/player/playerinfo/basic-info');
INSERT INTO `menu` VALUES (31, '1-1-2', '背包信息', 'POST /api/player/playerinfo/bag-info');
INSERT INTO `menu` VALUES (32, '1-1-3', '仓库信息', 'POST /api/player/playerinfo/warehouse-info');
INSERT INTO `menu` VALUES (33, '1-1-4', '装备信息', 'POST /api/player/playerinfo/equip-info');
INSERT INTO `menu` VALUES (34, '1-1-5', '饰品信息', 'POST /api/player/playerinfo/dec-info');
INSERT INTO `menu` VALUES (35, '1-1-6', '技能信息', 'POST /api/player/playerinfo/skill-info');
INSERT INTO `menu` VALUES (36, '1-1-7', '称号信息', 'POST /api/player/playerinfo/title-info');
INSERT INTO `menu` VALUES (37, '1-1-8', '宠物信息', 'POST /api/player/playerinfo/pet-info');
INSERT INTO `menu` VALUES (38, '1-1-9', '任务', 'POST /api/player/playerinfo/task-info');
INSERT INTO `menu` VALUES (39, '1-1-10', '家园', 'POST /api/player/playerinfo/home-info');
INSERT INTO `menu` VALUES (40, '1-1-11', '邮件', 'POST /api/player/playerinfo/email-info');
INSERT INTO `menu` VALUES (41, '1-1-12', '社交', 'POST /api/player/playerinfo/marriage-info');
INSERT INTO `menu` VALUES (42, '1-2-1', '物品发放（邮件）', 'POST /api/player/gmact/money\nPOST /api/player/gmact/prop');
INSERT INTO `menu` VALUES (43, '1-2-2', '物品发放（直接修改）', 'POST /api/player/gmact/award-d');
INSERT INTO `menu` VALUES (44, '1-2-3', '充值补发', 'POST /api/player/gmact/reissue');
INSERT INTO `menu` VALUES (45, '1-2-4', '修改宠物数据', 'POST /api/player/gmact/pet-level\nPOST /api/player/gmact/pet-lflevel\nPOST /api/player/gmact/pet-praclevel');
INSERT INTO `menu` VALUES (46, '1-2-5', '修改角色数据', 'POST /api/player/gmact/player-level\nPOST /api/player/gmact/add-title\nPOST /api/player/gmact/del-title');
INSERT INTO `menu` VALUES (47, '1-2-6', '踢玩家下线', 'POST /api/player/gmact/forcedown');
INSERT INTO `menu` VALUES (48, '1-2-7', '修改密码', 'POST /api/player/gmact/change-pass');
INSERT INTO `menu` VALUES (49, '1-2-8', '解除绑定手机', 'POST /api/player/gmact/untie-phone');
INSERT INTO `menu` VALUES (50, '1-2-9', '删除邮件', 'POST /api/player/gmact/del-mail');
INSERT INTO `menu` VALUES (51, '1-2-10', 'GM指令', NULL);
INSERT INTO `menu` VALUES (52, '1-3-1', '清除安全码', 'POST /api/player/clear/secure-code');
INSERT INTO `menu` VALUES (53, '1-3-2', '清除非正常任务', 'POST /api/player/clear/un-task');
INSERT INTO `menu` VALUES (54, '1-4-1', '封号/解封', 'POST /api/player/ban/account\nPOST /api/player/ban/account-r');
INSERT INTO `menu` VALUES (55, '1-4-2', '封号状态', 'POST /api/player/playerinfo/ban-account-info');
INSERT INTO `menu` VALUES (56, '1-4-3', '禁言/解禁', 'POST /api/player/ban/talk\nPOST /api/player/ban/talk-r');
INSERT INTO `menu` VALUES (57, '1-4-4', '禁言状态', 'POST /api/player/playerinfo/ban-talk-info');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
