import * as React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Conges({ conges }) {
  return (
    <div>
      
      {conges && conges.length > 0 ? (
        conges.map((solde, index) => (
          <Accordion key={index} sx={{ marginBottom: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-conges-${index}-content`}
              id={`panel-conges-${index}-header`}
            >
              <Typography component="span">
                Données de congés
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                <strong>Solde restant:</strong> {solde.soldeRestant} jours<br />
                <strong>Solde compensation restant:</strong> {solde.soldeCompRestant !== null ? solde.soldeCompRestant + " jours" : "Aucun"}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography variant="body2" sx={{ padding: 2 }}>
          Aucune information de congés disponible.
        </Typography>
      )}
    </div>
  );
}

Conges.propTypes = {
  conges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.shape({
        annee: PropTypes.number.isRequired,
        cin: PropTypes.string
      }).isRequired,
      soldeRestant: PropTypes.number.isRequired,
      soldeCompRestant: PropTypes.number
    })
  )
};

Conges.defaultProps = {
  conges: []
};

export default Conges;