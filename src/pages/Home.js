import React from 'react';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { FormControl, InputGroup, Button, Row, Col } from 'react-bootstrap';
import JourneyCard from '../components/Card/JourneyCard';

import { getJourneys } from '../config/server';
import { AppContext } from '../context/AppContext';

function Home() {
	const [state, dispatch] = useContext(AppContext);
	const [journeys, setJourneys] = useState([]);
	const [search, setSearch] = useState('');
	async function getAllJourneys() {
		const response = await getJourneys();
		setJourneys(response ? response.data.data.journeys : []);
		console.log(response);
	}

	useEffect(() => {
		getAllJourneys();
	}, [state.isLoading]);
	return (
		<div className='mx-5 my-5'>
			<h1>Journey</h1>
			<div className='mx-5 my-4'>
				<InputGroup>
					<FormControl
						placeholder='Find Journey'
						aria-label='Find Journey'
						aria-describedby='find-journey'
						name='search'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Button variant='primary' id='search'>
						Search
					</Button>
				</InputGroup>
			</div>
			{journeys.length < 1 ? (
				'No Journeys'
			) : (
				<div>
					<Row>
						{journeys
							.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
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

export default Home;
