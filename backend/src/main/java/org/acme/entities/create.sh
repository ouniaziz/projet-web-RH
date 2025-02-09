#!/bin/bash

# Directory where Java files will be created
OUTPUT_DIR="."
PACKAGE="org.acme.entities"

# Create directory if it doesn't exist
mkdir -p $OUTPUT_DIR

# Table to Java class mapping
declare -A TABLES=(
    ["Role_Person"]="id_r:Long,nom_r:String"
    ["grad_ens"]="id_g:Long,nom_g:String"
    ["Person"]="cin:String,nom:String,prenom:String,email:String,sexe:String,role_p:Long,status_p:Integer,grad:Long,date_n:LocalDate"
    ["conge"]="id_conge:Long,desc_conge:String,solde_init:Integer"
    ["Historique_Conge"]="id_hist:Long,id_conge:Long,cin:String,duree:Integer,created_at:LocalDate,status_c:String,cin_validator:String"
    ["solde_restant"]="cin:String,id_conge:Long,solde_restant:Integer"
    ["Handicap"]="id_hand:Long,name_h:String,desc_h:String"
    ["Handicap_Person"]="cin:String,id_hand:Long,severity:String,assistive_devices:String"
    ["Department"]="id_depart:Long,nom_dep:String,chef_dep:String"
    ["Matiere"]="id_mat:String,nom_mat:String,type_mat:String,presentiel:Boolean"
    ["Salle"]="id_salle:String"
    ["Group"]="id_niv:String,year:Integer,id_sp:String"
    ["Seance"]="id_seance:Long,id_ens:String,id_mat:String,id_salle:String,id_niv:String,year:Integer,id_sp:String,date_deb_s:LocalDate,date_deb_f:LocalDate"
    ["Presence_ENS"]="id_presence_ens:Long,id_seance:Long,present:String,date_presence:LocalDate"
    ["Tache"]="id_tache:Long,nom_tache:String,desc_tache:String,status_t:String,created_t:LocalDate,deadline_t:LocalDate,priority_t:String,id_p:String"
    ["Presence"]="id_emp:String,date_p:LocalDate,est_present:String"
)

# Loop through tables and generate Java classes
for table in "${!TABLES[@]}"; do
    CLASS_NAME="$(echo "$table" | sed -E 's/_(.)/\U\1/g' | sed 's/^./\U&/')"
    FILE_PATH="$OUTPUT_DIR/$CLASS_NAME.java"

    echo "Generating $CLASS_NAME.java..."

    # Start writing the Java file
    echo "package $PACKAGE;" > "$FILE_PATH"
    echo "" >> "$FILE_PATH"
    echo "import java.time.LocalDate;" >> "$FILE_PATH"
    echo "" >> "$FILE_PATH"
    echo "public class $CLASS_NAME {" >> "$FILE_PATH"

    # Add fields
    IFS=',' read -ra FIELDS <<< "${TABLES[$table]}"
    for field in "${FIELDS[@]}"; do
        FIELD_NAME="${field%%:*}"
        FIELD_TYPE="${field##*:}"
        echo "    private $FIELD_TYPE $FIELD_NAME;" >> "$FILE_PATH"
    done

    echo "" >> "$FILE_PATH"

    # Constructor
    echo "    public $CLASS_NAME() {}" >> "$FILE_PATH"
    echo "" >> "$FILE_PATH"

    # Getters and Setters
    for field in "${FIELDS[@]}"; do
        FIELD_NAME="${field%%:*}"
        FIELD_TYPE="${field##*:}"
        METHOD_NAME="$(echo "$FIELD_NAME" | sed 's/^./\U&/')"

        echo "    public $FIELD_TYPE get$METHOD_NAME() {" >> "$FILE_PATH"
        echo "        return $FIELD_NAME;" >> "$FILE_PATH"
        echo "    }" >> "$FILE_PATH"
        echo "" >> "$FILE_PATH"

        echo "    public void set$METHOD_NAME($FIELD_TYPE $FIELD_NAME) {" >> "$FILE_PATH"
        echo "        this.$FIELD_NAME = $FIELD_NAME;" >> "$FILE_PATH"
        echo "    }" >> "$FILE_PATH"
        echo "" >> "$FILE_PATH"
    done

    echo "}" >> "$FILE_PATH"
done

echo "Java entity classes have been generated in the '$OUTPUT_DIR' directory."
