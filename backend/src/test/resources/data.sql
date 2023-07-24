drop table if exists member cascade;
drop table if exists member_progress cascade;
drop table if exists member_record cascade;
drop table if exists participant_code cascade;
drop table if exists pomodoro cascade;
drop table if exists pomodoro_progress cascade;
drop table if exists pomodoro_record cascade;
drop table if exists study cascade;

create table member
(
    created_date       timestamp(6),
    id                 bigint generated by default as identity,
    last_modified_date timestamp(6),
    nickname           varchar(10) not null,
    primary key (id)
);

create table member_progress
(
    is_done            boolean     not null,
    created_date       timestamp(6),
    id                 bigint generated by default as identity,
    last_modified_date timestamp(6),
    member_id          bigint,
    study_id           bigint,
    progress_type      varchar(31) not null,
    primary key (id)
);

create table member_record
(
    created_date       timestamp(6),
    id                 bigint generated by default as identity,
    last_modified_date timestamp(6),
    member_progress_id bigint,
    record_type        varchar(31) not null,
    primary key (id)
);

create table participant_code
(
    code               varchar(6) unique,
    created_date       timestamp(6),
    id                 bigint generated by default as identity,
    last_modified_date timestamp(6),
    primary key (id)
);

create table pomodoro
(
    time_per_cycle integer not null,
    total_cycle    integer not null,
    id             bigint  not null,
    primary key (id)
);

create table pomodoro_progress
(
    current_cycle integer not null,
    id            bigint  not null,
    study_status  varchar(255) check (study_status in ('PLANNING', 'STUDYING', 'RETROSPECT')),
    primary key (id)
);

create table pomodoro_record
(
    cycle            integer      not null,
    id               bigint       not null,
    plan             longtext,
    template_version varchar(255) not null check (template_version in ('V1', 'V2')),
    retrospect       longtext,
    primary key (id)
);

create table study
(
    created_date        timestamp(6),
    id                  bigint generated by default as identity,
    last_modified_date  timestamp(6),
    name                varchar(10) not null,
    study_type          varchar(31) not null,
    participant_code_id bigint unique,
    primary key (id)
);

insert into participant_code (id, code)
values (1, 'ASDFGH');
insert into study (id, participant_code_id, name, study_type)
values (1, 1, 'Study 1', 'Pomodoro');
insert into pomodoro (id, total_cycle, time_per_cycle)
values (1, 4, 30);

insert into participant_code (id, code)
values (2, 'QWERTY');
insert into study (id, participant_code_id, name, study_type)
values (2, 2, 'Study 2', 'Pomodoro');
insert into pomodoro (id, total_cycle, time_per_cycle)
values (2, 6, 25);

-- member

insert into member (id, nickname)
values (1, 'member1');
insert into member (id, nickname)
values (2, 'member2');
insert into member (id, nickname)
values (3, 'member3');

-- member_progress

insert into member_progress (id, study_id, member_id, progress_type, is_done)
values (1, 1, 1, 'PomodoroProgress', false);
insert into pomodoro_progress (id, current_cycle, study_status)
values (1, 1, 'STUDYING');

insert into member_progress (id, study_id, member_id, progress_type, is_done)
values (2, 1, 2, 'PomodoroProgress', false);
insert into pomodoro_progress (id, current_cycle, study_status)
values (2, 1, 'PLANNING');

insert into member_progress (id, study_id, member_id, progress_type, is_done)
values (3, 2, 3, 'PomodoroProgress', false);
insert into pomodoro_progress (id, current_cycle, study_status)
values (3, 1, 'RETROSPECT');

-- member_record

insert into member_record (id, member_progress_id, record_type)
values (1, 1, 'PomodoroRecord');
insert into pomodoro_record (id, cycle, plan, retrospect, template_version)
values (1, 1,
        JSON_OBJECT(
                'toDo': '쿠키와 세션',
                'completionCondition': '완료조건',
                'expectedProbability': '80%',
                'expectedDifficulty': '예상되는 어려움',
                'whatCanYouDo': '가능성을 높이기 위해 무엇을 할 수 있을지?'
            ),
        JSON_OBJECT(
                'doneAsExpected': '예상했던 결과',
                'experiencedDifficulty':'겪었던 어려움',
                'lesson': '교훈'
            ),
        'V1');


insert into member_record (id, member_progress_id, record_type)
values (2, 2, 'PomodoroRecord');
insert into pomodoro_record (id, cycle, plan, retrospect, template_version)
values (2, 1,
        JSON_OBJECT(
                'toDo': '스트림',
                'completionCondition': '완료조건',
                'expectedProbability': '80%',
                'expectedDifficulty': '예상되는 어려움',
                'whatCanYouDo': '가능성을 높이기 위해 무엇을 할 수 있을지?'
            ),
        JSON_OBJECT(
                'doneAsExpected': '예상했던 결과',
                'experiencedDifficulty':'겪었던 어려움',
                'lesson': '교훈'
            ),
        'V1');

insert into member_record (id, member_progress_id, record_type)
values (3, 3, 'PomodoroRecord');
insert into pomodoro_record (id, cycle, plan, retrospect, template_version)
values (3, 1,
        JSON_OBJECT(
                'toDo': '병렬 스트림',
                'completionCondition': '완료조건',
                'expectedProbability': '80%',
                'expectedDifficulty': '예상되는 어려움',
                'whatCanYouDo': '가능성을 높이기 위해 무엇을 할 수 있을지?'
            ),
        JSON_OBJECT(
                'doneAsExpected': '예상했던 결과',
                'experiencedDifficulty':'겪었던 어려움',
                'lesson': '교훈'
            ),
        'V1');

--
