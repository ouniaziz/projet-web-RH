INSERT INTO public.handicap(
    id_hand, desc_h, name_h)
VALUES (1, 'Please enable your settings', 'Motor impairement'),
       (2, 'You can not talk, can you?', 'Speech impairement'),
       (3, 'high five...WAIT!!', 'Missing Hand');

INSERT INTO public.role_person(
    id_r, nom_r)
VALUES
    (0, 'Administrateur'),
    (1, 'Personnel RH'),
    (2, 'Enseignant'),
    (3, 'Employé');

INSERT INTO public.exercice(annee) VALUES(2025), (2024), (2023);

INSERT INTO public.grad(
    grad_id, nom_g)
VALUES
    (1,'Maître de Conférences'),
    (2,'Professeur des Universités'),
    (3,'Professeur Classe Exceptionnelle'),
    (4,'Distinguished Professor'),
    (5,'Professor Emeritus');

INSERT INTO public.type_conge(
    id, solde_initial, nom)
VALUES (0,26,'Congé annuelle'),
       (1,6,'Congé Compensatoire');

INSERT INTO public.department (id_dep, nom_dep)
VALUES
    ('INFO', 'Informatique'),
    ('MATH', 'Mathématiques'),
    ('PHYS', 'Physique'),
    ('ELEC', 'Electronique'),


INSERT INTO JOURS_FERIES (day, month, year) VALUES
-- Fixed holidays (recurring every year)
    (1, 1, '--'),       -- Nouvel An
    (20, 3, '--'),      -- Fête de l'Indépendance
    (9, 4, '--'),       -- Journée des Martyrs
    (1, 5, '--'),       -- Fête du Travail
    (25, 7, '--'),      -- Fête de la République
    (13, 8, '--'),      -- Fête de la Femme
    (15, 10, '--'),     -- Fête de l'Évacuation
    (17, 12, '--'),     -- Fête de la Révolution

-- Islamic holidays (specific dates for 2025)
    (30, 3, 2025),      -- Aïd al-Fitr (2/3 jours, dépend du secteur d’activité)
    (6, 6, 2025),       -- Aïd al-Adha (2 jours)
    (26, 6, 2025),      -- Jour de l’An Hégire (Ras El Am El Hijri)
    (4, 9, 2025);       -- Al-Mawlid Al-Nabawi (Mouled)