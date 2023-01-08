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

