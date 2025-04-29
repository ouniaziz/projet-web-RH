import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";

function AddModalDeprecated(){
    return(
        <Modal
            open={open1}
            onClose={handleClose1}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgba(142, 235, 248, 0.4)",
            }}
        >
            <MDBox
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                position="absolute"
                top="8%"
                left="27%"
                transform="translate(-50%, -50%)"
                width={800}
                boxShadow={24}
                p={4}
                borderRadius="2px"
                style={{ backgroundColor: "white" }}
            >
                <MDTypography id="modal-title" variant="h6" mb={3}>
                    Ajouter un enseignant
                </MDTypography>
                <MDBox
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleClose();
                    }}
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    transform="translate(-50%, -50%)"
                    boxShadow={10}
                    p={28}
                    borderRadius="2px"
                    style={{ backgroundColor: "white" }}
                >
                    <MDBox
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        position="absolute"
                        left="80px"
                        top="64px"
                        width={300}
                    >
                        <TextField
                            fullWidth
                            label="Nom"
                            name="nom"
                            value={newEnseignant.nom}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Prenom"
                            name="prenom"
                            value={newEnseignant.prenom}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                        />
                        <MDBox style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
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
                                    style={{ width: 210, height: "50px", color: "white" }}
                                >
                                    Upload Photo
                                </Button>
                            </label>
                            {newEnseignant.image && (
                                <img
                                    src={displayImgFromB64(newEnseignant.image)}
                                    alt="Preview"
                                    style={{
                                        marginTop: "10px",
                                        width: "80px",
                                        height: "50px",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                    }}
                                />
                            )}
                        </MDBox>
                        <TextField
                            fullWidth
                            label="CIN"
                            type="number"
                            name="cin"
                            value={newEnseignant.cin}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            name="email"
                            value={newEnseignant.email}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="adresse"
                            name="adresse"
                            value={newEnseignant.adresse}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Grade"
                            name="grad"
                            value={newEnseignant.grad}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                        />

                    </MDBox>
                    <MDBox
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        position="absolute"
                        right="80px"
                        top="64px"
                        width={300}
                    >
                        <TextField
                            fullWidth
                            label="date de naissance"
                            name="dateN"
                            value={newEnseignant.dateN}
                            onChange={handleChange}
                            type="date"
                            variant="outlined"
                            margin="normal"
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="male"
                            name="sexe"
                            value={newEnseignant.sexe}
                            onChange={handleChange}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                height: "30px",
                                margin: "14px",
                            }}
                        >
                            <FormControlLabel value="Homme" control={<Radio />} label="Homme" />
                            <FormControlLabel value="Femme" control={<Radio />} label="Femme" />
                        </RadioGroup>
                        <TextField
                            fullWidth
                            label="telephone"
                            name="telephone"
                            value={newEnseignant.telephone}
                            onChange={handleChange}
                            type="tel"
                            variant="outlined"
                            margin="normal"
                            required
                        />
                        <TextField
                            select
                            fullWidth
                            label="Département"
                            name="departement"
                            value={newEnseignant.departement}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
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
                        <TextField
                            fullWidth
                            label="ancienneté"
                            name="anciennete"
                            value={newEnseignant.anciennete}
                            onChange={handleChange}
                            type="number"
                            variant="outlined"
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="handicap"
                            name="hasHandicaps"
                            value={newEnseignant.hasHandicaps}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                        />

                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            onClick={handleAddEnseignant}
                            sx={{ mt: 3}}
                            style={{ width: 300, color: "white" }}
                        >
                            Ajouter
                        </Button>
                    </MDBox>
                </MDBox>
            </MDBox>
        </Modal>
    )
}