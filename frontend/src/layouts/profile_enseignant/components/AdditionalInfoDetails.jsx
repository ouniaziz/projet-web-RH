import PropTypes from "prop-types";
import styles from "../assests/addModalStyle.module.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {useStore} from "../../../service/store";
import {useEffect, useState} from "react";
import {myApi} from "../../../service/myApi";

AdditionalInfoDetails.propTypes={
    b64ToImage: PropTypes.func.isRequired,
    newEnseignant: PropTypes.object.isRequired,
    handleNewEnsChange: PropTypes.func.isRequired,
    setNewEnseignant: PropTypes.func.isRequired
}

export function AdditionalInfoDetails({b64ToImage, newEnseignant, handleNewEnsChange, setNewEnseignant}){
    const [ grades , setGrades] = useState([]);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewEnseignant((prev) => ({ ...prev, image: reader.result.split(',')[1] })); // stocke uniquement les données base64
            };
            reader.readAsDataURL(file);
        }
    };
    let departement;
    if(newEnseignant.depart.nomDep==="Informatique"){
        departement="INFO";
    }else if(newEnseignant.depart.nomDep==="Mathématiques"){
        departement="MATH";
    }else if(newEnseignant.depart.nomDep==="Physique"){
        departement="PHYS";
    }else if(newEnseignant.depart.nomDep==="Electronique"){
        departement="ELEC";
    }
    useEffect(() => {
        myApi.getGrades().then(grades=>{
            setGrades(grades.data);
        }).catch(err=>{
            console.error("Error while fetching records", err)
        })
    }, []);
    return(
        <>
            <div className={styles.additionalInfoRow}>
                <img
                    className={styles.imgContainer}
                    src={b64ToImage(newEnseignant.image)}
                    alt="Preview"
                    style={{
                        objectFit: "cover",
                        borderRadius: "10px",
                    }}
                />
                <div className={styles.flexContainer} style={{gap:"5px"}}>
                    <TextField
                        fullWidth
                        label="adresse"
                        name="adresse"
                        value={newEnseignant.adresse}
                        onChange={handleNewEnsChange}
                        variant="outlined"
                    />
                    <div className={styles.flexRow}>
                        <TextField
                            select={grades?.length>0}
                            className={styles.span2}
                            fullWidth
                            value={newEnseignant.gradList[0]?.grad?.id || ""}
                            onChange={handleNewEnsChange}
                            label="Grade"
                            name="gradId"
                            variant="outlined"
                            margin="normal"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& .MuiSelect-select': {
                                        height: 45,
                                        paddingTop: '18px',
                                        paddingBottom: '18px',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }
                                }
                            }}
                        >
                            {grades?.map((grade) => (
                                <MenuItem value={grade.id} key={grade.id}>
                                    {grade.nom}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            className={styles.flexItem}
                            select
                            fullWidth
                            label="Département"
                            name="departement"
                            value={departement}
                            onChange={handleNewEnsChange}
                            variant="outlined"
                            margin="normal"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& .MuiSelect-select': {
                                        height: 45,
                                        paddingTop: '18px',
                                        paddingBottom: '18px',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }
                                }
                            }}
                        >
                            <MenuItem value="INFO">Informatique</MenuItem>
                            <MenuItem value="MATH">Mathématiques</MenuItem>
                            <MenuItem value="PHYS">Physique</MenuItem>
                            <MenuItem value="ELEC">Electronique</MenuItem>
                        </TextField>
                    </div>

                    <div className={styles.flexRow}>
                        <TextField
                            className={styles.span2}
                            fullWidth
                            label="Téléphone"
                            name="telephone"
                            value={newEnseignant.telephone}
                            onChange={handleNewEnsChange}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            className={styles.flexItem}
                            fullWidth
                            type={"number"}
                            label="Ancienneté"
                            name="anciennete"
                            value={newEnseignant.anciennete}
                            onChange={handleNewEnsChange}
                            variant="outlined"
                            margin="normal"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& .MuiSelect-select': {
                                        height: 45,
                                        paddingTop: '18px',
                                        paddingBottom: '18px',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.flexItem}>
                <input
                    accept="image/*"
                    type="file"
                    id="upload-photo"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    required
                />
                <label htmlFor="upload-photo">
                    <Button
                        variant="contained"
                        component="span"
                        color="secondary"
                        sx={{ mt: 1 }}
                        style={{color: "white", width: "182px"}}
                    >
                        Upload Photo
                    </Button>
                </label>
            </div>
        </>
    )
}