import { FormControl, InputGroup, Button, Form, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect, useContext } from 'react';

import { deleteJourney, getJourneys, getUserBookmarksId, searchJourneys } from '../config/server';
import ConfirmModal from '../components/Modal/ConfirmModal';
import JourneyCard from '../components/Card/JourneyCard';
import NoData from '../components/placeholder/NoData';
import { AppContext } from '../context/AppContext';

function Home() {
	const [modal, setModal] = useState({ show: false, id: '', name: '' });
	const [userBookmarks, setUserBookmarks] = useState([]);
	const [state, dispatch] = useContext(AppContext);
	const [journeys, setJourneys] = useState([]);
	const [search, setSearch] = useState('');

	async function getAllJourneys() {
		const response = await getJourneys();
		setJourneys(response.status === 200 ? response.data.data.journeys : []);
	}

	async function loadUserBookmarksId() {
		const response = await getUserBookmarksId();
		setUserBookmarks(response.status === 200 ? response.data.data.bookmarks : []);
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

	async function handleSearch(e) {
		e.preventDefault();
		dispatch({ type: 'IS_LOADING_TRUE' });
		const response = await searchJourneys(search);
		setJourneys(response.status === 200 ? response.data.data.journeys : []);
		dispatch({ type: 'IS_LOADING_FALSE' });
	}

	useEffect(() => {
		if (search.length < 1) {
			getAllJourneys();
		}
		if (state.isLogin) {
			loadUserBookmarksId();
		}
		return () => {
			setUserBookmarks([]);
		};
	}, [state.isLoading, state.isLogin]);
	return (
		<div className='mx-5' style={{ marginTop: state.isLogin ? '100px' : '30px' }}>
			<h1>Journey</h1>
			<div className='mx-5 mt-5'>
				<Form onSubmit={(e) => handleSearch(e)}>
					<InputGroup>
						<FormControl
							placeholder='Find Journey Title'
							aria-label='Find Journey'
							aria-describedby='find-journey'
							name='search'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<Button
							variant='primary'
							id='search'
							style={{ width: '130px', fontWeight: 500 }}
							type='submit'
						>
							Search
						</Button>
					</InputGroup>
				</Form>
			</div>
			{journeys.length < 1 ? (
				<NoData placeholder='No Journeys' />
			) : (
				<div className='mt-4'>
					<Row>
						{journeys.map((item) => (
							<Col key={item.id} md={3} className='d-flex justify-content-center'>
								<JourneyCard
									item={item}
									isBookmarked={
										userBookmarks.find((bookmark) => bookmark.journeyId === item.id) ? true : false
									}
									setModal={setModal}
								/>
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

export default Home;
