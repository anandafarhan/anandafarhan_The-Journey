import React, { useEffect, useState, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';

import JourneyCard from '../components/Card/JourneyCard';
import NoData from '../components/placeholder/NoData';
import { getUserBookmarks } from '../config/server';
import { AppContext } from '../context/AppContext';

function Bookmarks() {
	const [state] = useContext(AppContext);
	const [bookmarks, setBookmarks] = useState([]);

	async function getBookmarks() {
		const response = await getUserBookmarks();
		setBookmarks(response.status === 200 ? response.data.data.bookmarks : []);
	}

	useEffect(() => {
		getBookmarks();
	}, [state.isLoading]);
	return (
		<div className='mx-5' style={{ marginTop: '100px' }}>
			<h1>Bookmark</h1>
			{bookmarks.length < 1 ? (
				<NoData placeholder='No Journeys Bookmarked' />
			) : (
				<div>
					<Row>
						{bookmarks.map((item) => (
							<Col key={item.id} md={3} className='d-flex justify-content-center'>
								<JourneyCard item={item.Journey} isBookmarked={true} />
							</Col>
						))}
					</Row>
				</div>
			)}
		</div>
	);
}

export default Bookmarks;
