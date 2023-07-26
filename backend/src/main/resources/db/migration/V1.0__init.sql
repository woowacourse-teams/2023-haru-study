create table member
(
    id                 bigint       not null auto_increment,
    created_date       datetime(6)  not null,
    last_modified_date datetime(6)  not null,
    nickname           varchar(255) not null,
    primary key (id)
);

create table member_content
(
    id                 bigint       not null auto_increment,
    created_date       datetime(6)  not null,
    last_modified_date datetime(6)  not null,
    member_progress_id bigint       not null,
    content_type       varchar(255) not null,
    primary key (id)
);

create table member_progress
(
    id                 bigint       not null auto_increment,
    is_done            bit          not null,
    created_date       datetime(6)  not null,
    last_modified_date datetime(6)  not null,
    member_id          bigint       not null,
    room_id            bigint       not null,
    progress_type      varchar(255) not null,
    primary key (id)
);

create table participant_code
(
    id                 bigint       not null auto_increment,
    code               varchar(255) not null,
    created_date       datetime(6)  not null,
    last_modified_date datetime(6)  not null,
    primary key (id)
);

create table pomodoro_content
(
    id               bigint  not null,
    cycle            integer not null,
    plan             text,
    retrospect       text,
    template_version enum ('V1','V2') not null,
    primary key (id)
);

create table pomodoro_progress
(
    id              bigint  not null,
    current_cycle   integer not null,
    pomodoro_status enum ('PLANNING','RETROSPECT','STUDYING'),
    primary key (id)
);

create table pomodoro_room
(
    id             bigint  not null,
    time_per_cycle integer not null,
    total_cycle    integer not null,
    primary key (id)
);

create table room
(
    id                  bigint       not null auto_increment,
    created_date        datetime(6)  not null,
    last_modified_date  datetime(6)  not null,
    participant_code_id bigint       not null,
    name                varchar(255) not null,
    room_type           varchar(255) not null,
    primary key (id)
);

alter table participant_code
    add constraint UK_participant_code_code unique (code);
