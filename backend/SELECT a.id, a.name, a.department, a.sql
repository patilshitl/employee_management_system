SELECT a.id, a.name, a.department, a.salary, b.name AS manager FROM 
shital_ems AS a LEFT JOIN shital_ems AS b 
ON a.manager_id = b.id;


SELECT s.id, s.name FROM norm_students 
AS a LEFT JOIN norm_department AS d
ON s.id = d.id 

SELECT * FROM 
norm_students s LEFT JOIN norm_student_result r
on s.id = r.student_id
 