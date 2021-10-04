import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';

function ConfirmModal(props) {
	return (
		<Modal show={props.show} onHide={props.handleClose} centered>
			<Modal.Body>
				<Modal.Title className='my-3 fs-5'>
					Confirm {props.actionName} <strong>{props.name}</strong> ?
				</Modal.Title>
				<Alert variant={props.variant}>{props.body}</Alert>
			</Modal.Body>
			<Modal.Footer className='d-flex justify-content-between'>
				<Button variant='secondary' onClick={props.handleClose}>
					Cancel
				</Button>
				<Button variant={props.variant} onClick={props.action}>
					{props.actionName}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ConfirmModal;
