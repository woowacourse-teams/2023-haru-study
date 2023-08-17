alter table pomodoro_progress add column nickname varchar(255);
alter table pomodoro_progress modify nickname varchar (255) not null;
alter table member drop column nickname;
alter table member
    add column name varchar(255),
	add column email varchar(255),
	add column image_url varchar(255),
	add column login_type enum ('GUEST', 'GOOGLE');
alter table member modify name varchar (255) not null;
alter table member modify login_type enum ('GUEST', 'GOOGLE') not null;
alter table pomodoro_progress modify pomodoro_status enum ('PLANNING','RETROSPECT','STUDYING', 'DONE') not null;
alter table pomodoro_progress drop column is_done;

CREATE TABLE `refresh_token`
(
    `id`                 bigint      NOT NULL AUTO_INCREMENT,
    `member_id`          bigint DEFAULT NULL,
    `UUID`               binary(16)  NOT NULL,
    `expire_date_time`   datetime(6) NOT NULL,
    `created_date`       datetime(6) NOT NULL,
    `last_modified_date` datetime(6) NOT NULL,
    PRIMARY KEY (`id`)
);
