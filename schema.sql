DROP DATABASE IF EXISTS  "task-group";
CREATE DATABASE "task-group";
\c "task-group"


CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  task_group TEXT NOT NULL,
  task TEXT NOT NULL,
  completedAt TEXT
);


CREATE TABLE dependency_ids (
  id SERIAL PRIMARY KEY, 
  task_id INTEGER REFERENCES tasks (id) ON DELETE CASCADE, 
  dependency_id INTEGER REFERENCES tasks (id) ON DELETE CASCADE
);


INSERT INTO tasks (task_group, task) VALUES('Purchases', 'Go to the bank');
INSERT INTO tasks (task_group, task) VALUES('Purchases', 'Buy hammer');
INSERT INTO tasks (task_group, task) VALUES('Purchases', 'Buy wood');
INSERT INTO tasks (task_group, task) VALUES('Purchases', 'Buy nails');
INSERT INTO tasks (task_group, task) VALUES('Purchases', 'Buy paint');
INSERT INTO tasks (task_group, task) VALUES('Build Airplane', 'Hammer nails into wood');
INSERT INTO tasks (task_group, task) VALUES('Build Airplane', 'Paint wings');
INSERT INTO tasks (task_group, task) VALUES('Build Airplane', 'Have a snack');



INSERT INTO dependency_ids
  (task_id, dependency_id)
VALUES(1, null);

INSERT INTO dependency_ids
  (task_id, dependency_id)
VALUES(2, 1);

INSERT INTO dependency_ids
  (task_id, dependency_id)
VALUES(3, 1);

INSERT INTO dependency_ids
  (task_id, dependency_id)
VALUES(4, 1);

INSERT INTO dependency_ids
  (task_id, dependency_id)
VALUES(5, 1);

INSERT INTO dependency_ids
  (task_id, dependency_id)
VALUES(6, 2);

INSERT INTO dependency_ids
  (task_id, dependency_id)
VALUES(6, 3);

INSERT INTO dependency_ids
  (task_id, dependency_id)
VALUES(6, 4);

INSERT INTO dependency_ids
  (task_id, dependency_id)
VALUES(7, 5);

INSERT INTO dependency_ids
  (task_id, dependency_id)
VALUES(7, 6);

INSERT INTO dependency_ids
  (task_id, dependency_id)
VALUES(8, null);


\q