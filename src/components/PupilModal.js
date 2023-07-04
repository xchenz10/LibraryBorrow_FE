import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PupilModal(props) {
  const [show, setShow] = useState(false);
  const [rent, setRent] = useState([]);
  const [loading, setLoading] = useState(true)
  const nav = useNavigate()


  useEffect(() => {
    const getPupilRent = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/v1/has-rent?p_id=${props.p_id}`);
        setRent(res.data.msg);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    getPupilRent();
  }, [props.p_id]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div style={{ display: 'flex', direction: 'rtl' }}>
        <Card style={{ backgroundColor: '#1a38bf48', width: '18rem', margin: '10px', direction: 'rtl' }}>
          <Card.Body>
            <Card.Title>{props.p_name}</Card.Title>
            <Card.Text>{props.p_id}</Card.Text>
            <div style={{ direction: 'ltr' }}>
              <Button variant="success" onClick={handleShow}>
                לחץ כאן
              </Button>
            </div>
            <div>
              <Modal style={{ direction: 'rtl' }} show={show} onHide={handleClose}>
                <Modal.Header>
                  <Modal.Title>{props.p_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={{ direction: 'rtl' }}>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>פרטים אישיים</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                        שם התלמיד: {props.p_name}
                          <br />
                          תעודת זהות: {props.p_id}
                          <br />
                          כיתה: {props.p_grade}'
                          <br />
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                        <Typography>ספרים הוזמנו על ידי {props.p_name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {loading ? (
                          <Typography>Loading...</Typography>
                        ) : rent.length > 0 ? (
                          <ul>
                            {rent.map((rentItem) => (
                              <li key={rentItem.id}>
                                הזמנה בוצעה בתאריך: {new Date(rentItem.start_date).toLocaleDateString()}
                                <br />
                                יש להחזיר את הספרים עד: {new Date(rentItem.end_date).toLocaleDateString()}
                                <br />
                                ספרים שהוזמנו:
                                <ul>
                                  {Object.keys(rentItem)
                                    .filter((key) => key.startsWith('book_') && rentItem[key])
                                    .map((key) => (
                                      <li key={key}>{rentItem[key].book_name}</li>
                                    ))}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <Typography>
                            טרם בוצעה הזמנת ספרים לתלמיד זהות
                            <br/>
                            <Button onClick={()=>{nav(`/rent?p_id=${props.p_id}&p_grade=${props.p_grade}&p_name=${props.p_name}`)}}>להזמנה</Button>
                          </Typography>
                        )}
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                        <Typography>Disabled Accordion</Typography>
                      </AccordionSummary>
                    </Accordion>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleClose}>
                    סגור
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default PupilModal;
