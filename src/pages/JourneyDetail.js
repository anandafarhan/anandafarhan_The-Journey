import React, { useState, useEffect, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import draftToHtml from 'draftjs-to-html';
import { useParams } from 'react-router';
import moment from 'moment';

import { AppContext } from '../context/AppContext';
import { getJourney } from '../config/server';

function JourneyDetail() {
	const [state] = useContext(AppContext);
	const [journey, setJourney] = useState(null);
	const { id } = useParams();

	async function loadJourney() {
		const response = await getJourney(id);
		setJourney({
			...response.data.data.journey,
			description: draftToHtml(JSON.parse(response.data.data.journey.description)),
		});
	}

	useEffect(() => {
		loadJourney();
	}, []);
	return (
		<div className='post-container' style={{ paddingTop: state.isLogin ? '100px' : '30px' }}>
			{!journey ? (
				'No Journey'
			) : (
				<>
					<Row>
						<Col md={10} className='mb-4'>
							<h1>{journey.title}</h1>
							<p style={{ fontSize: '1.3rem', color: '#3B97D3' }}>
								{moment(journey.createdAt).format('D MMMM YYYY')}
							</p>
						</Col>
						<Col md={2} className='author'>
							<p style={{ fontSize: '1.3rem' }}>{journey.User.fullName}</p>
						</Col>
					</Row>
					<div dangerouslySetInnerHTML={{ __html: journey.description }} />
				</>
			)}
		</div>
	);
}

export default JourneyDetail;
