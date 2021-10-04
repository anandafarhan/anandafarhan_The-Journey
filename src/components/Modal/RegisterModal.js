import { Modal, Button, Form, Alert } from 'react-bootstrap';
import React, { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';
import { registerUser } from '../../config/server';
import { AppContext } from '../../context/AppContext';

function RegisterModal(props) {
	const router = useHistory();
	const [state, dispatch] = useContext(AppContext);
	const [failed, setFailed] = useState({
		status: false,
		message: '',
		errors: '',
	});

	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		password: '',
		phone: '',
	});

	function handleChange(e) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const response = await registerUser(formData);

		if (response.status === 201) {
			console.log('try', response);
			setFailed({ status: false, message: '', errors: '' });
			dispatch({
				type: 'REGISTER',
				payload: response.data.data,
			});
			setFormData({
				fullName: '',
				email: '',
				password: '',
				phone: '',
				address: '',
			});
			props.handleClose();
			router.push('/');
		} else {
			console.log('error', response);
			setFailed({
				status: true,
				message: response.data.message,
				errors: response.data.errors,
			});
		}
	}

	return state.isLogin ? (
		''
	) : (
		<Modal
			show={props.show}
			onHide={props.handleClose}
			dialogClassName='modal-overide'
			style={{ width: '350px !important' }}
			size='sm'
			centered
		>
			<Modal.Body>
				<Modal.Title className='text-center fw-bold my-3'>Register</Modal.Title>
				<br />
				<Alert
					variant='danger'
					style={failed.status ? { display: 'block', fontSize: '13px' } : { display: 'none' }}
				>
					{failed.message}
					<br />
					{failed.errors}
				</Alert>
				<Form onSubmit={(e) => handleSubmit(e)}>
					<Form.Group className='mb-3' controlId='FullName'>
						<Form.Label className='fw-bold'>Full Name</Form.Label>
						<Form.Control
							type='text'
							name='fullName'
							value={formData.name}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='Email'>
						<Form.Label className='fw-bold'>Email</Form.Label>
						<Form.Control
							type='email'
							name='email'
							value={formData.email}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='Password'>
						<Form.Label className='fw-bold'>Password</Form.Label>
						<Form.Control
							type='password'
							name='password'
							value={formData.password}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='phone'>
						<Form.Label className='fw-bold'>Phone</Form.Label>
						<Form.Control
							type='tel'
							name='phone'
							value={formData.phone}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='address'>
						<Form.Label className='fw-bold'>Address</Form.Label>
						<Form.Control
							as='textarea'
							name='address'
							value={formData.address}
							onChange={(e) => handleChange(e)}
							rows={3}
						/>
					</Form.Group>
					<div className='d-grid gap-2 my-3'>
						<Button variant='primary' className='bg-overide' type='submit'>
							Register
						</Button>
					</div>
					<p className='text-center text-muted'>
						Already have an account ? Click{' '}
						<span onClick={props.switchModal}>
							<strong>Here</strong>
						</span>
					</p>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default RegisterModal;
