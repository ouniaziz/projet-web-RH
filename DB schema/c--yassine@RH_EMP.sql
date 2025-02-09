CREATE TABLE Role_Person (
    id_r NUMBER PRIMARY KEY,
    nom_r VARCHAR2(50)
);

CREATE TABLE grad_ens (
    id_g NUMBER PRIMARY KEY,
    nom_g VARCHAR2(50)
);

CREATE TABLE Person (
    cin VARCHAR2(8) PRIMARY KEY,
    nom VARCHAR2(50),
    prenom VARCHAR2(50),
    email VARCHAR2(100) UNIQUE,
    sexe VARCHAR2(1) CHECK (sexe IN ('H', 'F')),
    role_p NUMBER,
    status_p NUMBER(1) DEFAULT 0 CHECK (status_p IN (0, 1)),
    grad NUMBER,
    date_n DATE
);

CREATE TABLE "user" (
    cin VARCHAR2(8) PRIMARY KEY,
    email VARCHAR2(100) UNIQUE,
    passw_hash VARCHAR2(100),
    device_id VARCHAR2(100),
    status_passw NUMBER(1) CHECK (status_passw IN (0, 1))
);

CREATE TABLE conge (
    id_conge NUMBER PRIMARY KEY,
    desc_conge VARCHAR2(255),
    solde_init NUMBER -- en jours
);

CREATE TABLE Historique_Conge (
    id_hist NUMBER PRIMARY KEY,
    id_conge NUMBER,
    cin VARCHAR2(8),
    duree NUMBER, -- en jours
    created_at DATE DEFAULT SYSDATE,
    status_c VARCHAR2(20) CHECK (status_c IN ('Pending', 'Refused', 'Accepted')),
    cin_validator VARCHAR2(8) DEFAULT '00000000'
);

CREATE TABLE solde_restant (
    cin VARCHAR2(8),
    id_conge NUMBER,
    solde_restant NUMBER,
    PRIMARY KEY (cin, id_conge)
);

CREATE TABLE Handicap (
    id_hand NUMBER PRIMARY KEY,
    name_h VARCHAR2(255),
    desc_h VARCHAR2(255)
);

CREATE TABLE Handicap_Person (
    cin VARCHAR2(8),
    id_hand NUMBER,
    severity VARCHAR2(10) CHECK (severity IN ('Mild', 'Moderate', 'Severe')),
    assistive_devices VARCHAR2(255),
    PRIMARY KEY (cin, id_hand)
);

CREATE TABLE Department (
    id_depart NUMBER PRIMARY KEY,
    nom_dep VARCHAR2(255),
    chef_dep VARCHAR2(8) UNIQUE
);

CREATE TABLE Matiere (
    id_mat VARCHAR2(10) PRIMARY KEY,
    nom_mat VARCHAR2(255),
    type_mat VARCHAR2(10) CHECK (type_mat IN ('TP', 'TD', 'Cours')),
    presentiel NUMBER(1) DEFAULT 1 CHECK (presentiel IN (0, 1))
);

CREATE TABLE Salle (
    id_salle VARCHAR2(10) PRIMARY KEY
);

CREATE TABLE "Group" (
    id_niv VARCHAR2(3),
    "year" NUMBER(1),
    id_sp VARCHAR2(5),
    PRIMARY KEY (id_niv, "year", id_sp)
);

CREATE TABLE Seance (
    id_seance NUMBER PRIMARY KEY,
    id_ens VARCHAR2(8) UNIQUE,
    id_mat VARCHAR2(10) UNIQUE,
    id_salle VARCHAR2(10),
    id_niv VARCHAR2(3),
    "year" NUMBER(1),
    id_sp VARCHAR2(5),
    date_deb_s DATE,
    date_deb_f DATE
);

CREATE TABLE Presence_ENS (
    id_presence_ens NUMBER PRIMARY KEY,
    id_seance NUMBER,
    present VARCHAR2(10) CHECK (present IN ('PRESENT', 'ABSENT')),
    date_presence DATE
);

CREATE TABLE Tache (
    id_tache NUMBER PRIMARY KEY,
    nom_tache VARCHAR2(100),
    desc_tache VARCHAR2(255),
    status_t VARCHAR2(20) CHECK (status_t IN ('Ongoing', 'Expired', 'Completed')),
    created_t DATE,
    deadline_t DATE,
    priority_t VARCHAR2(10) CHECK (priority_t IN ('Low', 'Medium', 'High')),
    id_p VARCHAR2(8)
);

CREATE TABLE Presence (
    id_emp VARCHAR2(8),
    date_p DATE,
    est_present VARCHAR2(1) CHECK (est_present IN ('V', 'F')),
    PRIMARY KEY (id_emp, date_p)
);

-- Foreign Key Constraints

ALTER TABLE Person ADD CONSTRAINT fk_person_role FOREIGN KEY (role_p) REFERENCES Role_Person(id_r);
ALTER TABLE Person ADD CONSTRAINT fk_person_grad FOREIGN KEY (grad) REFERENCES grad_ens(id_g);

ALTER TABLE "user" ADD CONSTRAINT fk_user_cin FOREIGN KEY (cin) REFERENCES Person(cin);
ALTER TABLE "user" ADD CONSTRAINT fk_user_email FOREIGN KEY (email) REFERENCES Person(email);

ALTER TABLE Historique_Conge ADD CONSTRAINT fk_hist_conge FOREIGN KEY (id_conge) REFERENCES conge(id_conge);
ALTER TABLE Historique_Conge ADD CONSTRAINT fk_hist_person FOREIGN KEY (cin) REFERENCES Person(cin);

ALTER TABLE solde_restant ADD CONSTRAINT fk_solde_cin FOREIGN KEY (cin) REFERENCES Person(cin);
ALTER TABLE solde_restant ADD CONSTRAINT fk_solde_conge FOREIGN KEY (id_conge) REFERENCES conge(id_conge);

ALTER TABLE Handicap_Person ADD CONSTRAINT fk_handicapped_person FOREIGN KEY (cin) REFERENCES Person(cin);
ALTER TABLE Handicap_Person ADD CONSTRAINT fk_handicap FOREIGN KEY (id_hand) REFERENCES Handicap(id_hand);

ALTER TABLE Department ADD CONSTRAINT fk_department_chef FOREIGN KEY (chef_dep) REFERENCES Person(cin);

ALTER TABLE Seance ADD CONSTRAINT fk_seance_ens FOREIGN KEY (id_ens) REFERENCES Person(cin);
ALTER TABLE Seance ADD CONSTRAINT fk_seance_mat FOREIGN KEY (id_mat) REFERENCES Matiere(id_mat);
ALTER TABLE Seance ADD CONSTRAINT fk_seance_salle FOREIGN KEY (id_salle) REFERENCES Salle(id_salle);
ALTER TABLE Seance ADD CONSTRAINT fk_seance_group FOREIGN KEY (id_niv, "year", id_sp) REFERENCES "Group"(id_niv, "year", id_sp);

ALTER TABLE Presence_ENS ADD CONSTRAINT fk_presence_seance FOREIGN KEY (id_seance) REFERENCES Seance(id_seance);

ALTER TABLE Tache ADD CONSTRAINT fk_tache_person FOREIGN KEY (id_p) REFERENCES Person(cin);

ALTER TABLE Presence ADD CONSTRAINT fk_presence_person FOREIGN KEY (id_emp) REFERENCES Person(cin);

commit;