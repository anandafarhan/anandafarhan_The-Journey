import { Col, Form, Image, Row, Button } from 'react-bootstrap';
import React, { useState, useContext, useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';

import { API, deleteJourney, getUserJourneys, updateProfile } from '../config/server';
import ConfirmModal from '../components/Modal/ConfirmModal';
import JourneyCard from '../components/Card/JourneyCard';
import { AppContext } from '../context/AppContext';
import NoData from '../components/placeholder/NoData';

function Profile() {
	const [modal, setModal] = useState({ show: false, id: '', name: '' });
	const [state, dispatch] = useContext(AppContext);
	const [editMode, setEditMode] = useState(false);
	const [journeys, setJourneys] = useState([]);
	const [userData, setUserData] = useState({});
	const [preview, setPreview] = useState(null);

	function handleEdit() {
		setEditMode((prev) => !prev);
		setUserData({
			fullName: state.user.name,
			phone: state.user.phone,
			address: state.user.address,
			avatar,
		});
		setPreview(null);
	}

	function handleChange(e) {
		setUserData({
			...userData,
			[e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
		});

		if (e.target.type === 'file') {
			let url = e.target.files.length < 1 ? null : URL.createObjectURL(e.target.files[0]);
			setPreview(url);
		}
	}

	async function handleSave() {
		dispatch({ type: 'IS_LOADING_TRUE' });
		const form = new FormData();
		form.set('fullName', userData.fullName);
		form.set('address', userData.address);
		try {
			form.set('avatar', userData.avatar[0], userData.avatar[0].name);
		} catch (error) {}

		await updateProfile(form);
		const response2 = await API('/auth');
		dispatch({
			type: 'LOAD_USER',
			payload: response2.data.data,
		});
		setEditMode(false);
		dispatch({ type: 'IS_LOADING_FALSE' });
	}

	async function getAllJourneys() {
		const response = await getUserJourneys();
		setJourneys(response.status === 200 ? response.data.data.journeys : []);
	}

	async function handleDelete(id) {
		if (state.isLogin === true) {
			dispatch({ type: 'IS_LOADING_TRUE' });
			await deleteJourney(id);
			setModal({ show: false, id: '', name: '' });
			dispatch({ type: 'IS_LOADING_FALSE' });
		} else {
			dispatch({ type: 'MODAL_LOGIN' });
			dispatch({ type: 'IS_LOADING_FALSE' });
		}
	}

	useEffect(() => {
		getAllJourneys();
	}, [state.isLoading]);

	const avatar = state.user.avatar
		? state.user.avatar
		: `https://avatars.dicebear.com/api/initials/${state.user.name.split(' ').join('+')}.svg`;
	return (
		<div className='mx-5' style={{ marginTop: '100px' }}>
			<h1>Profile</h1>
			<div
				className='m-auto text-center grow'
				style={{
					width: '300px',
					backgroundColor: 'white',
					padding: '30px',
					borderRadius: '10px',
					filter: 'drop-shadow(0 0 10px rgba(210, 210, 210, 1))',
				}}
			>
				{!editMode ? (
					<div className='d-flex align-items-center flex-column'>
						<BiEdit
							size='1.5rem'
							color='#3b97d3'
							style={{ position: 'absolute', top: '.5rem', right: '.5rem' }}
							onClick={handleEdit}
						/>
						<Image
							src={avatar}
							className='rounded-circle'
							style={{ width: '220px', height: '220px', border: '3px solid #2E86DE' }}
						/>
						<p className='fw-bold fs-4 m-0'>{state.user.name}</p>
						<p className='m-0 text-muted'>{state.user.email}</p>
						<p className='m-0 text-muted'>{state.user.phone}</p>
						<p className='m-0 text-muted'>{state.user.address}</p>
					</div>
				) : (
					<div className='d-flex flex-column'>
						<BiEdit
							size='1.5rem'
							color='#DDDDDD'
							style={{ position: 'absolute', top: '.5rem', right: '.5rem' }}
							onClick={handleEdit}
						/>
						<div
							className='p-2 mb-3'
							style={{
								border: '2px solid #3b97d3',
								borderRadius: '5px',
							}}
						>
							<label htmlFor='formFileLg'>
								<Image
									src={preview ? preview : avatar}
									className='rounded-circle'
									style={{ width: '200px', height: '200px', border: '3px solid #2E86DE' }}
								/>
							</label>
							<Form.Group controlId='formFileLg' style={{ display: 'none' }}>
								<Form.Control
									type='file'
									name='avatar'
									onChange={(e) => handleChange(e)}
									accept='.jpg,.jpeg,.png,.svg'
									required
								/>
							</Form.Group>
						</div>
						<Form.Group className='mb-3' controlId='Title'>
							<Form.Control
								type='text'
								name='fullName'
								placeholder='Full Name'
								value={userData.fullName}
								onChange={(e) => handleChange(e)}
								style={{ border: '2px solid #2E86DE' }}
								required
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='Title'>
							<Form.Control
								type='text'
								name='phone'
								placeholder='Phone'
								value={userData.phone}
								onChange={(e) => handleChange(e)}
								style={{ border: '2px solid #2E86DE' }}
								required
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='address'>
							<Form.Control
								as='textarea'
								name='address'
								placeholder='Address'
								value={userData.address}
								onChange={(e) => handleChange(e)}
								rows={3}
								style={{ border: '2px solid #2E86DE' }}
								required
							/>
						</Form.Group>
						{!state.isLoading ? (
							<Form.Group className='d-flex flex-row justify-content-between'>
								<Button variant='outline-primary' style={{ width: '90px' }} onClick={handleEdit}>
									Cancel
								</Button>
								<Button variant='primary' style={{ width: '90px' }} onClick={handleSave}>
									Save
								</Button>
							</Form.Group>
						) : (
							<Form.Group className='d-flex flex-row justify-content-between'>
								<Button variant='outline-primary' style={{ width: '90px' }} disabled>
									Cancel
								</Button>
								<Button variant='primary' style={{ width: '90px' }} disabled>
									Save
								</Button>
							</Form.Group>
						)}
					</div>
				)}
			</div>
			{journeys.length < 1 ? (
				<NoData placeholder='You have no journeys' />
			) : (
				<div className='mt-5'>
					<h1>Your Journey</h1>
					<Row>
						{journeys.map((item) => (
							<Col key={item.id} md={3} className='d-flex justify-content-center'>
								<JourneyCard item={item} isBookmarked={false} setModal={setModal} />
							</Col>
						))}
					</Row>
				</div>
			)}
			<ConfirmModal
				show={modal.show}
				variant='danger'
				actionName='Delete'
				name={modal.name}
				body="Warning, this action can't be undone !"
				action={() => handleDelete(modal.id)}
				handleClose={() => {
					setModal({ show: false, id: '', name: '' });
				}}
			/>
		</div>
	);
}

export default Profile;
