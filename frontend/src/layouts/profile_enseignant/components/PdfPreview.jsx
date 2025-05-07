import {Document, Page, Text, View, StyleSheet, pdf, PDFViewer, Image} from '@react-pdf/renderer';
import PropTypes from "prop-types";
import {useState, useEffect} from "react"
import {useStore} from "../../../service/store";
import {myApi} from "../../../service/myApi";
import {Modal} from "@mui/material";
import MDBox from "../../../components/MDBox";
import Box from "@mui/material/Box";
import MDTypography from "../../../components/MDTypography";
import logoIsimm from "assets/logo_isimm.jpeg"
import MDButton from "../../../components/MDButton";

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
        paddingTop: 150 // Add top padding to avoid content overlapping with header
    },
    header: {
        position: 'absolute',
        top: 30,
        left: 30,
        right: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderBottomStyle: 'solid',
        paddingBottom: 10,
        marginBottom: 20
    },
    logo: {
        width: "auto",
        height: 80,
        objectFit: 'fit-content',
        backgroundColor: "white"
    },
    headerText: {
        fontSize: 14,

        textAlign: 'center',
        flex: 1
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableColHeader: {
        width: "16.66%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f0f0f0',
        padding: 5
    },
    tableCol: {
        width: "16.66%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5
    },
    tableCellHeader: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    tableCell: {
        fontSize: 10,
        textAlign: 'center'
    }
});

const MyDocument = ({ data, username }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header} fixed> {/* 'fixed' makes it repeat on every page */}
                <Image
                    style={styles.logo}
                    src={logoIsimm}
                    alt="Company Logo"
                />
                <View style={styles.headerText}>
                    <Text>{"Nom de l'Entreprise"}</Text>
                    <Text>{"Adresse de l'Entreprise"}</Text>
                    <Text>Téléphone: +123 456 789</Text>
                </View>
                <View style={{ width: 100 }} /> {/* Spacer to balance the layout */}
            </View>
            <View>
                <Text style={styles.title}>{`L'état congé de ${username}`}</Text>

                {/* Table Header */}
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Année</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Type congé</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Date début</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Durée</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Date Fin</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Date Retour</Text>
                        </View>
                    </View>

                    {/* Table Rows */}
                    {data.map((item, index) => (
                        <View style={styles.tableRow} key={index}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{item.exercice.annee}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{item.type.nom}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{item.dateDebut}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{item.duree}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{item.dateFin}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{item.dateRetour}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);


MyDocument.propTypes={
    data: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired
}

PDFPreview.propTypes={
    username: PropTypes.string.isRequired,
    cin: PropTypes.string.isRequired
}

//TODO: further develop this
function PDFPreview({username, cin}){
    const [congeEtat, setCongeEtat] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // Fetch your API data here
        const fetchData = async () => {
            try {
                const response = await myApi.fetchEtatConge(cin);
                const result = await response.data;
                setCongeEtat(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDownload = async () => {
        const blob = await pdf(<MyDocument data={congeEtat} username={username}/>).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${cin} | État congé 2025.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePrint = async () => {
        const blob = await pdf(<MyDocument data={congeEtat} username={username}/>).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>PDF Preview</h2>

            <div style={{ height: '500px', width:"800px", border: '1px solid #ccc', marginBottom: '20px' }}>
                <PDFViewer width="100%" height="100%">
                    <MyDocument data={congeEtat} username={username}/>
                </PDFViewer>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent:"end",
                    gap:"10px"
                }}
            >
                <MDButton color={"info"} variant={"gradient"} onClick={handleDownload}>Download PDF</MDButton>
                <MDButton color={"info"} variant={"outlined"} onClick={handlePrint}>Print</MDButton>
            </div>
        </div>
    );
}


PDFPreviewModal.propTypes={
    username: PropTypes.string.isRequired,
    cin: PropTypes.string.isRequired,
    onCloseMethod: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
}
function PDFPreviewModal({cin, username, open, onCloseMethod}){
    return (
        <Modal
            open={open}
            onClose={onCloseMethod}
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgba(142, 235, 248, 0.4)",
               }}>
            <MDBox
                bgColor={"white"}
                boxShadow={24}
                p={4}
                borderRadius="12px"
                sx={{
                    display:"flex",
                    justifyContent: "center",
                    flexDirection:"column",
                    alignItems: "center"
                }}
            >
                <MDTypography id="modal-title" variant="h4" mb={3}>
                    Preview État congé
                </MDTypography>
                <PDFPreview username={username} cin={cin}/>
            </MDBox>
        </Modal>
    )
}

export {PDFPreviewModal}