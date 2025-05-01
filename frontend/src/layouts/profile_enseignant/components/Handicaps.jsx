import * as React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Handicaps({ handicaps }) {
  return (
    <div>
      {/* Check if handicaps exists and has items */}
      {handicaps && handicaps.length > 0 ? (
        handicaps.map((handicap, index) => (
          <Accordion key={index} sx={{ marginBottom: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography component="span">
                {handicap.handicapName} 
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                <strong>Sévérité:</strong> {handicap.severity || "pas mentionner"} <br />
                <strong>Dispositifs d&apos;assistance:</strong> {handicap.assistive_devices || "Aucun"}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography variant="body2" sx={{ padding: 2 }}>
          Aucun handicap déclaré.
        </Typography>
      )}
    </div>
  );
}

// Updated prop type validation to match your actual data structure
Handicaps.propTypes = {
  handicaps: PropTypes.arrayOf(
    PropTypes.shape({
      handicapId: PropTypes.number.isRequired,
      handicapName: PropTypes.string.isRequired,
      severity: PropTypes.string.isRequired,
      assistive_devices: PropTypes.string
    })
  )
};

// Set default props
Handicaps.defaultProps = {
  handicaps: []
};

export default Handicaps;