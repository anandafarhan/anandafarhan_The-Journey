import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { getJourney } from '../config/server';

function JourneyDetail() {
	const [journey, setJourney] = useState(null);
	const { id } = useParams();

	async function loadJourney() {
		const response = await getJourney(id);
		setJourney(response.data.data.journey);
	}

	useEffect(() => {
		loadJourney();
	}, []);
	return (
		<div className='mx-5 my-5'>
			{!journey ? (
				'No Journey'
			) : (
				<>
					<Row>
						<Col md={10}>
							<h1>{journey.title}</h1>
							<span>{journey.createdAt}</span>
						</Col>
						<Col md={2}>
							<span>{journey.User.fullName}</span>
						</Col>
					</Row>
					<div dangerouslySetInnerHTML={{ __html: journey.description }} />
				</>
			)}
		</div>
	);
}

export default JourneyDetail;
