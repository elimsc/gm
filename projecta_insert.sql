INSERT INTO `menu`(menu_sid, menu_name, urls) VALUES ('10', 'ProjectA公告管理', NULL);
INSERT INTO `menu`(menu_sid, menu_name, urls) VALUES ('10-1', '公告类型', 'GET /api/projecta/ann/list-type\nPOST /api/projecta/ann/create-type\nPOST /api/projecta/ann/delete-type\nPOST /api/projecta/ann/update-type');
INSERT INTO `menu`(menu_sid, menu_name, urls) VALUES ('10-2', '公告列表', 'GET /api/projecta/ann/list-ann\nPOST /api/projecta/ann/delete-ann\nPOST /api/projecta/ann/update-ann');
INSERT INTO `menu`(menu_sid, menu_name, urls) VALUES ('10-3', '添加公告', 'POST /api/projecta/ann/create-ann');
INSERT INTO `menu`(menu_sid, menu_name, urls) VALUES ('10-4', '公告子标题列表', 'GET /api/projecta/ann/list-subcontent\nPOST /api/projecta/ann/delete-subcontent\nPOST /api/projecta/ann/update-subcontent');
INSERT INTO `menu`(menu_sid, menu_name, urls) VALUES ('10-5', '添加公告子标题', 'POST /api/projecta/ann/create-subcontent');