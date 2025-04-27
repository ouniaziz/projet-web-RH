import PropTypes from "prop-types";
import styles from "../assets/addModalStyle.module.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

AdditionalInfoDetails.propTypes={
    b64ToImage: PropTypes.func.isRequired,
    newEnseignant: PropTypes.object.isRequired,
    handleNewEnsChange: PropTypes.func.isRequired,
    setNewEnseignant: PropTypes.func.isRequired
}

export function AdditionalInfoDetails({b64ToImage, newEnseignant, handleNewEnsChange, setNewEnseignant}){
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
                            className={styles.span2}
                            fullWidth
                            label="Grade"
                            name="grad"
                            value={newEnseignant.grad}
                            onChange={handleNewEnsChange}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            className={styles.flexItem}
                            select
                            fullWidth
                            label="Département"
                            name="departement"
                            value={newEnseignant.departement}
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
                            <MenuItem value="Informatique">Informatique</MenuItem>
                            <MenuItem value="Mathématiques">Mathématiques</MenuItem>
                            <MenuItem value="Physique">Physique</MenuItem>
                            <MenuItem value="Electronique">Electronique</MenuItem>
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
                        >
                            <MenuItem value="Informatique">Informatique</MenuItem>
                            <MenuItem value="Mathématiques">Mathématiques</MenuItem>
                            <MenuItem value="Physique">Physique</MenuItem>
                            <MenuItem value="Electronique">Electronique</MenuItem>
                        </TextField>
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