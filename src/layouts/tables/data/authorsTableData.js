/* eslint-disable react/prop-types */
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images
import team2 from "assets/images/team-2.jpg";

export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "nom et prénom", accessor: "author", align: "left", width: "10px" },
      { Header: "adresse", accessor: "adresse", align: "left", width: "10px" },
      { Header: "telephone", accessor: "telephone", align: "left", width: "10px" },
      { Header: "Grade", accessor: "Grade", align: "center", width: "10px" },
      {
        Header: "date de naissance",
        accessor: "date_de_naissance",
        align: "center",
        width: "10px",
      },
      { Header: "age", accessor: "age", align: "center", width: "10px" },
      { Header: "sexe", accessor: "sexe", align: "center", width: "10px" },
      { Header: "post", accessor: "post", align: "center", width: "10px" },
      { Header: "ancienneté", accessor: "ancienneté", align: "center", width: "10px" },
      { Header: "handicap", accessor: "handicap", align: "center", width: "10px" },
      { Header: "", accessor: "action", align: "center", width: "10px" },
    ],

    rows: [
      {
        author: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        adresse: "sousse",
        telephone: "29292501",
        Grade: "DOCTEUR",
        date_de_naissance: "15/02/1990",
        age: "32",
        sexe: "homme",
        post: "chef de service",
        ancienneté: "15 ans",
        handicap: "non",
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
    ],
  };
}
