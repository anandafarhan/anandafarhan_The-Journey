import React, { useEffect, useState, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import JourneyCard from '../components/Card/JourneyCard';
import { getJourneys } from '../config/server';
import { AppContext } from '../context/AppContext';

function Bookmarks() {
	const [state, dispatch] = useContext(AppContext);
	const [journeys, setJourneys] = useState([]);
	async function getAllJourneys() {
		const response = await getJourneys();
		setJourneys(response ? response.data.data.journeys : []);
	}

	useEffect(() => {
		getAllJourneys();
	}, [state.isLoading]);
	return (
		<div className='mx-5 my-5'>
			<h1>Bookmark</h1>
			{journeys.length < 1 ? (
				'No Journeys'
			) : (
				<div>
					<Row>
						{journeys
							.filter((item) => item.Bookmark)
							.map((item) => (
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

export default Bookmarks;
