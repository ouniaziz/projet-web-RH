INSERT INTO public.handicap(
    id_hand, desc_h, name_h)
VALUES (1, 'Please enable your settings', 'Motor impairement');

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
VALUES (0,26,'Congé annuelle');