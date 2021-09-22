import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import JourneyCard from '../components/Card/JourneyCard';
import { getUserJourneys } from '../config/server';
import { AppContext } from '../context/AppContext';

function Profile() {
	const [state, dispatch] = useContext(AppContext);

	const [journeys, setJourneys] = useState([]);
	async function getAllJourneys() {
		const response = await getUserJourneys();
		setJourneys(response ? response.data.data.journeys : []);
	}

	useEffect(() => {
		getAllJourneys();
	}, []);

	const avatar = state.user.avatar
		? state.user.avatar
		: `https://avatars.dicebear.com/api/initials/${state.user.name.split(' ').join('+')}.svg`;
	return (
		<div className='mx-5 my-5'>
			<div className='d-flex justify-content-center m-auto text-center' style={{ width: '200px' }}>
				<div className='d-flex flex-column'>
					<Image src={avatar} style={{ borderRadius: '50%', width: '100%' }} />
					<p className='fw-bold fs-4'>{state.user.name}</p>
					<p>{state.user.email}</p>
				</div>
			</div>
			{journeys.length < 1 ? (
				'No Journeys'
			) : (
				<div className='mt-5'>
					<Row>
						{journeys.map((item) => (
							<Col key={item.id} md={3} className='d-flex justify-content-center'>
								<JourneyCard item={item} />
							</Col>
						))}
					</Row>
				</div>
			)}
		</div>
	);
}

export default Profile;
