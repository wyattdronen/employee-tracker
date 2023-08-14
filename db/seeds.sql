INSERT INTO department (name) 
VALUES 
('Production'), 
('Sales'), 
('Operations'), 
('Managment');

INSERT INTO roles (title, salary, department_id)
VALUES
('Production Lead', 80000, 1),
('Salesperson', 60000, 2),
('Operations Manager', 90000, 3),
('CEO', 250000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Gary', 'Almes', 1, NULL),
('Katy', 'Vincent', 2, 1),
('Austin', 'Slater', 3, NULL),
('Wyatt', 'Dronen', 4, NULL);

