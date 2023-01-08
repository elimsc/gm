create table gm.projecta_ann
(
    id         int auto_increment
        primary key,
    pic        mediumtext   null,
    title      varchar(100) null,
    label      varchar(100) not null,
    content    mediumtext   null,
    type       varchar(100) not null,
    start_time bigint       not null,
    end_time   bigint       not null,
    `order`    int          not null
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

create index projecta_ann_type_index
    on gm.projecta_ann (type);

create table gm.projecta_ann_subcontent
(
    id         int auto_increment
        primary key,
    title      varchar(100) null,
    content    mediumtext   null,
    start_time bigint       not null,
    end_time   bigint       not null,
    ann_id     int          not null,
    `order`    int          not null
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

create index projecta_ann_id_index
    on gm.projecta_ann_subcontent (ann_id);


create table gm.projecta_ann_type
(
    id       int auto_increment
        primary key,
    identity varchar(100) not null,
    name     varchar(100) not null,
    constraint projecta_ann_type_uniq_identity
        unique (identity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `menu` VALUES (58, '9', 'ProjectA公告管理', NULL);
INSERT INTO `menu` VALUES (59, '9-1', '公告类型', 'GET /api/projecta/ann/list-type\nPOST /api/projecta/ann/create-type\nPOST /api/projecta/ann/delete-type\nPOST /api/projecta/ann/update-type');
INSERT INTO `menu` VALUES (53, '9-2', '公告列表', 'GET /api/projecta/ann/list-ann\nPOST /api/projecta/ann/delete-ann\nPOST /api/projecta/ann/update-ann');
INSERT INTO `menu` VALUES (54, '9-3', '添加公告', 'POST /api/projecta/ann/create-ann');
INSERT INTO `menu` VALUES (55, '9-4', '公告子标题列表', 'GET /api/projecta/ann/list-subcontent\nPOST /api/projecta/ann/delete-subcontent\nPOST /api/projecta/ann/update-subcontent');
INSERT INTO `menu` VALUES (56, '9-5', '添加公告子标题', 'POST /api/projecta/ann/create-subcontent');