
import { Button, Modal } from 'react-bootstrap';

const CustomModal = ({ title, body, show, setShow, handleAgreeButtonClick }) => (
  <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{body}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShow(false)}>
        Close
      </Button>
      <Button variant="primary" onClick={handleAgreeButtonClick}>
        OK
      </Button>
    </Modal.Footer>
  </Modal>
);

export default CustomModal;
