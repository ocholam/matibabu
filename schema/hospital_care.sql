--- 
-- TABLES
---

-- ADMINS --
DROP TABLE IF EXISTS admins  CASCADE;
CREATE TABLE admins (
    admin_name      varchar(15) PRIMARY KEY NOT NULL,
    password        text NOT NULL,
    telephone       varchar(15) NOT NULL UNIQUE,
    email           varchar(30) NOT NULL UNIQUE,
    added           timestamp DEFAULT CURRENT_TIMESTAMP,
    name            varchar(30) NOT NULL,
    access          smallint DEFAULT 1,
    active          boolean DEFAULT true     
);
INSERT INTO admins (admin_name,password,telephone,email,name,access) VALUES ( 'root',MD5('ianmin2'),'0725678447','ianmin2@live.com','Main Administrator',0);
INSERT INTO admins (admin_name,password,telephone,email,name,access) VALUES ( 'userAdmin',MD5('ianmin2'),'0700000000','useradmin@bixbyte.io','User Affairs Administrator',0);


--- TYPES
DROP TABLE IF EXISTS types CASCADE;
CREATE TABLE IF NOT EXISTS types (
    type_id      bigserial PRIMARY KEY,
    title        varchar(100) NOT NULL CONSTRAINT unique_type UNIQUE,
    active       boolean DEFAULT true
);
INSERT INTO types (title) VALUES ('Hospitals'),('Doctors'),('Labs'),('');

--- SUB_TYPES
DROP TABLE IF EXISTS sub_types CASCADE;
CREATE TABLE IF NOT EXISTS sub_types (
    sub_type_id      bigserial PRIMARY KEY,
    title            varchar(100) NOT NULL CONSTRAINT unique_sub_type UNIQUE,
    parent           bigint NOT NULL CONSTRAINT valid_parent_type REFERENCES types(type_id),
    active           boolean DEFAULT true
);
INSERT INTO sub_types(title,parent) VALUES ('Hospital',1),('Clinic',1),('General Practitioner',2),('Surgeon',2),('Dentist',2),('Paeditrician',2),('Laboratory',3),('Pharmacy',3);


-- USERS --
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    username        varchar(50) PRIMARY KEY NOT NULL,
    password        text NOT NULL,
    name            varchar(30) NOT NULL,
    email           varchar(30) NOT NULL UNIQUE,
    telephone       varchar(15),
    account_number  varchar(30),
    -- entity          bigint CONSTRAINT valid_entity REFERENCES entities(entity_id),
    active          boolean DEFAULT true
);
INSERT INTO users 
(username,password,name,email,telephone) 
VALUES 
('ianmin2',md5('ianmin2'),'Ian Innocent','ianmin2@live.com','0725678447');

--- ENITITIES
DROP TABLE IF EXISTS entities CASCADE;
CREATE TABLE IF NOT EXISTS entities (
    entity_id   bigserial PRIMARY KEY,
    owner       varchar(50) NOT NULL CONSTRAINT valid_user REFERENCES users(username),
    title       varchar(100) NOT NULL,
    type        bigint NOT NULL CONSTRAINT valid_type REFERENCES sub_types(sub_type_id),
    location    varchar(255),
    telephone   varchar(20) CONSTRAINT unique_telephone UNIQUE,
    office      varchar(20),
    landline    varchar(20),
    address     text,
    fax         varchar(100),
    email       varchar(50) CONSTRAINT unique_email UNIQUE,
    web         varchar(100),
    country     smallint DEFAULT '112',
    others      text,
    active      boolean DEFAULT true
);
INSERT INTO entities 
 (owner,title,type,location,telephone,office,landline,address,fax,email,web,others)
 VALUES
 ('ianmin2','Ian Innocent',3,'Chebarbar','0725678447','072345678','','Text Lane Off Limuru Road','','ianmin2@ianmin2.cf','http://ianmin2.cf',''),
 ('ianmin2','Jeremic Hospital',1,'Baraton, Kapsabet','0700100100','','','1 Jeremic Close University of Eastern Africa Baraton','','jeremic@ueab.ac.ke','http://jeremic.ueab.ac.ke',''),
 ('ianmin2','Chemundu Hospital',1,'Chemundu, Kapsabet','0700100101','','','1 Chemundu Drive; Chemundu','','chemundu@ueab.ac.ke','http://ueab.ac.ke/chemundu','');



---  ADMISSION_RIGHTS
DROP TABLE IF EXISTS admission_rights CASCADE;
CREATE TABLE IF NOT EXISTS admission_rights (
    admission_right_id  bigserial PRIMARY KEY,
    doctor              bigint NOT NULL CONSTRAINT valid_doctor REFERENCES entities(entity_id),
    hospital            bigint NOT NULL CONSTRAINT valid_hospital REFERENCES entities(entity_id),
    note                text,
    active              boolean DEFAULT true,
    CONSTRAINT admission_right_does_not_exist UNIQUE (doctor,hospital)
);
INSERT INTO admission_rights 
(doctor,hospital,note)
VALUES 
(1,2,'Ask to see Naani'),
(1,3,'');


--- APPOINTMENTS
DROP TABLE IF EXISTS appointments CASCADE;
CREATE TABLE IF NOT EXISTS appointments (
    appointment_id      bigserial PRIMARY KEY,
    entity              bigint NOT NULL CONSTRAINT valid_entity REFERENCES entities(entity_id),
    name                varchar(50) NOT NULL,
    email               varchar(50) NOT NULL,
    telephone           varchar(20) NOT NULL,
    message             text NOT NULL,
    added_on            timestamp DEFAULT CURRENT_TIMESTAMP,
    active              boolean DEFAULT true,
    confirmed           boolean,
    scheduled           date
);

--- SERVICES / PRODUCTS
DROP TABLE IF EXISTS services CASCADE;
CREATE TABLE IF NOT EXISTS services (
    service_id          bigserial PRIMARY KEY,
    title               varchar(50),
    description         text,
    type                varchar(1) NOT NULL DEFAULT 's',
    active              boolean DEFAULT true,
    rrp                 integer DEFAULT 0,
    added_on            timestamp DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO services ( title,description,type,active,rrp )
VALUES ( 'Tooth Extraction','Children and adult tooth extraction','s',true,'2500' );

--- SERVICE_OFFERINGS / PRODUCT_OFFERINGS
DROP TABLE IF EXISTS service_offerings CASCADE;
CREATE TABLE IF NOT EXISTS service_offerings (
    service_offering_id     bigserial PRIMARY KEY,
    entity                  bigint NOT NULL CONSTRAINT valid_entity REFERENCES entities(entity_id),
    description             text,
    service                 bigint NOT NULL CONSTRAINT valid_service REFERENCES services(service_id),
    purchase                integer DEFAULT 0,
    retail                  integer NOT NULL,
    active                  boolean DEFAULT true,
    added_on                timestamp DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO service_offerings (service_offering_id,entity,description,service,purchase,retail)
VALUES (1,1,'Simple and Painless',1,0,3500);


-- --
-- AUDIT TABLES
-- --

-- AUD_ADMINS --
DROP TABLE IF EXISTS aud_admins  CASCADE;
CREATE TABLE aud_admins (
    admin_name      varchar(15) NOT NULL,
    password        text NOT NULL,
    telephone       varchar(15) NOT NULL,
    email           varchar(30) NOT NULL,
    added           timestamp DEFAULT CURRENT_TIMESTAMP,
    name            varchar(30) NOT NULL,
    access          smallint DEFAULT 1,
    active          boolean DEFAULT true,
    func            varchar(15)
);

-- AUD_USERS --
DROP TABLE IF EXISTS aud_users CASCADE;
CREATE TABLE aud_users (
    username        varchar(15) NOT NULL,
    password        text NOT NULL,
    name            varchar(30) NOT NULL,
    email           varchar(30) NOT NULL,
    telephone       varchar(15),
    account_number  varchar(30),
    active          boolean DEFAULT true,
    func            varchar(15)
);




-- -- 
-- TRIGGER FUNCTIONS
-- --


--- ADMINS
CREATE OR REPLACE FUNCTION audit_admins()
    RETURNS trigger AS
$BODY$
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_admins (admin_name,password,telephone,email,added,name,access,active,func) 
        SELECT OLD.admin_name,OLD.password,OLD.telephone,OLD.email,OLD.added,OLD.name,OLD.access,OLD.active,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        INSERT INTO aud_admins (admin_name,password,telephone,email,added,name,access,active,func) 
        SELECT NEW.admin_name,NEW.password,NEW.telephone,NEW.email,NEW.added,NEW.name,NEW.access,NEW.active,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_admins (admin_name,password,telephone,email,added,name,access,active,func) 
        SELECT OLD.admin_name,OLD.password,OLD.telephone,OLD.email,OLD.added,OLD.name,OLD.access,OLD.active,TG_OP;
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;


--- USERS
CREATE OR REPLACE FUNCTION audit_users()
    RETURNS trigger AS
$BODY$
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_users (username,password,name,email,telephone,account_number,active,func) 
        SELECT OLD.username,OLD.password,OLD.name,OLD.email,OLD.telephone,OLD.account_number,OLD.active,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        -- INSERT INTO aud_users (username,password,name,email,telephone,account_number,active,func) 
        -- SELECT NEW.username,NEW.password,NEW.name,NEW.email,NEW.telephone,NEW.account_number,NEW.active,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_users (username,password,name,email,telephone,account_number,active,func) 
        SELECT OLD.username,OLD.password,OLD.name,OLD.email,OLD.telephone,OLD.account_number,OLD.active,TG_OP;
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;

--- USERS
CREATE OR REPLACE FUNCTION audit_users()
    RETURNS trigger AS
$BODY$
BEGIN 
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO aud_users (username,password,name,email,telephone,account_number,active,func) 
        SELECT OLD.username,OLD.password,OLD.name,OLD.email,OLD.telephone,OLD.account_number,OLD.active,TG_OP;
        RETURN OLD;
    END IF;
    IF (TG_OP = 'INSERT') THEN
        -- INSERT INTO aud_users (username,password,name,email,telephone,account_number,active,func) 
        -- SELECT NEW.username,NEW.password,NEW.name,NEW.email,NEW.telephone,NEW.account_number,NEW.active,TG_OP;
        RETURN NEW;
    END IF;
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO aud_users (username,password,name,email,telephone,account_number,active,func) 
        SELECT OLD.username,OLD.password,OLD.name,OLD.email,OLD.telephone,OLD.account_number,OLD.active,TG_OP;
        RETURN NEW;
    END IF;
END;
$BODY$
LANGUAGE plpgsql VOLATILE;


-- --
-- TRIGGERS
-- --

-- ADMINS
CREATE TRIGGER admins_audit BEFORE  UPDATE OR INSERT OR DELETE
   ON admins FOR EACH ROW
   EXECUTE PROCEDURE audit_admins();

-- USERS
CREATE TRIGGER users_audit BEFORE UPDATE OR INSERT OR DELETE
   ON users FOR EACH ROW
   EXECUTE PROCEDURE audit_users();


-- --
-- VIEWS --
-- --

-- VW_ADMINS --
DROP VIEW IF EXISTS vw_admins ;
CREATE OR REPLACE VIEW vw_admins AS 
SELECT admin_name,telephone,email,added,name,active,access
FROM admins;


--- VW_USERS ---
DROP VIEW IF EXISTS vw_users;
CREATE OR REPLACE VIEW vw_users AS 
SELECT username,users.name,users.email,users.telephone,account_number, users.active
FROM users;


--- VW_INVALID_USERS ---
DROP VIEW IF EXISTS vw_invalid_users;
CREATE OR REPLACE VIEW vw_invalid_users AS 
SELECT username,users.name,users.email,users.telephone,account_number
FROM users
WHERE users.active = false;

--     sub_type_id      bigserial PRIMARY KEY,
--     title            varchar(100) NOT NULL CONSTRAINT unique_sub_type UNIQUE,
--     parent           bigint NOT NULL CONSTRAINT valid_parent_type REFERENCES types(type_id),
--     active           boolean DEFAULT true

--- VW_TYPES ---
DROP VIEW IF EXISTS vw_types;
CREATE OR REPLACE VIEW vw_types AS 
SELECT type_id,title,active
FROM types;

--- VW_SUB_TYPES ---
DROP VIEW IF EXISTS vw_sub_types;
CREATE OR REPLACE VIEW vw_sub_types AS 
SELECT sub_type_id,sub_types.title,parent,types.title as parent_title,types.active as parent_active,sub_types.active
FROM sub_types
    JOIN types 
        ON sub_types.parent     = types.type_id
        WHERE types.active      = true;

-- VW_ENTITIES --
DROP VIEW IF EXISTS vw_entities CASCADE;
CREATE OR REPLACE VIEW vw_entities AS 
SELECT 
entity_id, entities.title as title,entities.type,owner,users.name as owner_name,entities.location,entities.telephone,entities.office,entities.landline,entities.address,entities.fax,entities.email,entities.web,entities.country,entities.others,entities.active,
sub_types.title as type_title,
type_id as super_type, types.title as super_type_title
FROM entities
    LEFT JOIN sub_types
        ON entities.type     = sub_types.sub_type_id
    JOIN types  
        ON sub_types.parent  = types.type_id
    JOIN users  
        ON entities.owner    = users.username;

-- VW_ADMISSION-RIGHTS -- 
DROP VIEW IF EXISTS vw_admission_rights CASCADE;
CREATE OR REPLACE VIEW vw_admission_rights AS 
SELECT 
admission_right_id,admission_rights.doctor,admission_rights.hospital,note,admission_rights.active,
entities.title as doctor_name,entities.owner
FROM admission_rights 
    INNER JOIN entities
        ON admission_rights.doctor = entities.entity_id;

-- VW_SERVICES
DROP VIEW IF EXISTS vw_services CASCADE;
CREATE OR REPLACE VIEW vw_services AS 
SELECT 
service_id,title,description,type,active,rrp,added_on 
FROM services;

-- VW_SERVICE_OFFERINGS
DROP VIEW IF EXISTS vw_service_offerings CASCADE;
CREATE OR REPLACE VIEW vw_service_offerings AS 
SELECT 
service_offerings.service_offering_id, service_offerings.service, service_offerings.entity, service_offerings.description, service_offerings.purchase, service_offerings.retail, service_offerings.active, 
entities.title as entity_title, entities.owner as owner, services.title as title, entities.telephone as owner_telephone, entities.location, services.type as type, services.rrp as rrp, entities.web as owner_web,
entities.address as owner_address, entities.location as owner_location
FROM service_offerings
    INNER JOIN entities 
        ON service_offerings.entity = entities.entity_id
    JOIN services
        ON service_offerings.service = services.service_id;

--- VW_APPOINTMENTS
DROP VIEW IF EXISTS vw_appointments CASCADE;
CREATE OR REPLACE VIEW vw_appointments AS 
SELECT appointment_id,appointments.name,appointments.email,appointments.telephone,appointments.message,
appointments.added_on,appointments.active,appointments.confirmed,appointments.scheduled,
appointments.entity,entities.title as entity_name,entities.owner,users.name as owner_name
FROM appointments
    INNER JOIN entities 
        ON appointments.entity = entities.entity_id
    JOIN users  
        ON entities.owner      = users.username;