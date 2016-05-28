drop table if exists entries;
create table datasets (
  id integer primary key autoincrement,
  name text not null,
  description text,
  source text
  date float not null,
  path text
);