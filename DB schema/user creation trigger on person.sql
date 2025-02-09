CREATE OR REPLACE TRIGGER trigger_create_user
AFTER INSERT ON Person
FOR EACH ROW
BEGIN
    INSERT INTO User (cin, email, STATUS_PASSW)
    VALUES (:NEW.cin, :NEW.email, 0);
END;

