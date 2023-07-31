create table member
(
    id                 bigint       not null auto_increment,
    nickname           varchar(255) not null,
    created_date       datetime(6)  not null,
    last_modified_date datetime(6)  not null,
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
    id                   bigint      not null auto_increment,
    pomodoro_progress_id bigint      not null,
    cycle                integer     not null,
    plan                 text        not null,
    retrospect           text        not null,
    created_date         datetime(6) not null,
    last_modified_date   datetime(6) not null,
    primary key (id)
);

create table pomodoro_progress
(
    id                 bigint      not null auto_increment,
    pomodoro_room_id   bigint      not null,
    member_id          bigint      not null,
    is_done            bit         not null,
    current_cycle      integer     not null,
    pomodoro_status    enum ('PLANNING','RETROSPECT','STUDYING') not null,
    created_date       datetime(6) not null,
    last_modified_date datetime(6) not null,
    primary key (id)
);

create table pomodoro_room
(
    id                  bigint       not null auto_increment,
    participant_code_id bigint       not null,
    name                varchar(255) not null,
    total_cycle         integer      not null,
    time_per_cycle      integer      not null,
    created_date        datetime(6)  not null,
    last_modified_date  datetime(6)  not null,
    primary key (id)
);
