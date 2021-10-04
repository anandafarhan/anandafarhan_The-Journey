import React, { useState, useContext } from 'react';
import {
	BsBookmark,
	BsBookmarkFill,
	BsThreeDotsVertical,
	BsDot,
	BsEye,
	BsEyeSlash,
	BsPencil,
	BsTrash,
} from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { Card, Form } from 'react-bootstrap';
import moment from 'moment';

import { addUserBookmark, updateJourneyNF } from '../../config/server';
import { AppContext } from '../../context/AppContext';
import draftToHtml from 'draftjs-to-html';

const sanitizeHtml = require('sanitize-html');

function JourneyCard({ item, isBookmarked, setModal }) {
	const createdAt = moment(item.createdAt).format('D MMMM YYYY');
	const [userMenu, setUserMenu] = useState(false);
	const [state, dispatch] = useContext(AppContext);
	const description = JSON.parse(item.description);
	const route = useHistory();
	const clean = sanitizeHtml(draftToHtml(description), {
		allowedTags: [],
		allowedAttributes: [],
	});

	function handleClick(e, id) {
		e.stopPropagation();
		route.push(`/journey/${id}`);
	}

	async function handleBookmark(e, id) {
		e.stopPropagation();
		e.preventDefault();
		if (state.isLogin === true) {
			dispatch({ type: 'IS_LOADING_TRUE' });
			await addUserBookmark({ id });
			dispatch({ type: 'IS_LOADING_FALSE' });
		} else {
			dispatch({ type: 'MODAL_LOGIN' });
			dispatch({ type: 'IS_LOADING_FALSE' });
		}
	}

	async function handleChangeStatus(e, status, id) {
		e.stopPropagation();
		e.preventDefault();
		if (state.isLogin === true) {
			dispatch({ type: 'IS_LOADING_TRUE' });
			await updateJourneyNF({ status: !status }, id);
			dispatch({ type: 'IS_LOADING_FALSE' });
		} else {
			dispatch({ type: 'MODAL_LOGIN' });
			dispatch({ type: 'IS_LOADING_FALSE' });
		}
	}

	return (
		<Card
			className='mx-1 my-3 grow'
			style={{
				borderRadius: '10px',
				width: '300px',
				height: '380px',
				filter: 'drop-shadow(0px 0px 3px rgba(200,200,200,70%))',
			}}
			onClick={(e) => handleClick(e, item.id)}
		>
			<Form.Group className='bookmark-ribbon'>
				{item.userId === state.user?.id ? (
					<>
						<Form.Label onClick={(e) => e.stopPropagation()}>
							{userMenu ? <BsDot size='1.5rem' /> : <BsThreeDotsVertical size='1.5rem' />}
							<Form.Check type='checkbox' onChange={() => setUserMenu(!userMenu)} checked={userMenu} />
						</Form.Label>
					</>
				) : isBookmarked ? (
					<Form.Label onClick={(e) => handleBookmark(e, item.id)}>
						<BsBookmarkFill size='1.5rem' />
						<Form.Check type='checkbox' onChange={() => console.log('changed')} checked={isBookmarked} />
					</Form.Label>
				) : (
					<Form.Label onClick={(e) => handleBookmark(e, item.id)}>
						<BsBookmark size='1.5rem' />
						<Form.Check type='checkbox' onChange={() => console.log('changed')} checked={isBookmarked} />
					</Form.Label>
				)}
			</Form.Group>
			{userMenu ? (
				<>
					<div
						className='card-ribbon-menu'
						style={{ top: '2rem', color: '#00AEFF' }}
						onClick={(e) => handleChangeStatus(e, item.status, item.id)}
					>
						{item.status ? <BsEye size='1.5rem' /> : <BsEyeSlash size='1.5rem' />}
					</div>

					<div
						className='card-ribbon-menu'
						style={{ top: '4.2rem', color: '#E8AA1B' }}
						onClick={(e) => {
							e.stopPropagation();
							route.push(`/editJourney/${item.id}`);
						}}
					>
						<BsPencil size='1.5rem' />
					</div>

					<div
						className='card-ribbon-menu'
						style={{ top: '6.4rem', color: '#FF4E44' }}
						onClick={(e) => {
							e.stopPropagation();
							setModal({ show: true, id: item.id, name: item.title });
						}}
					>
						<BsTrash size='1.4rem' />
					</div>
				</>
			) : (
				''
			)}
			<Card.Img
				className='img-card bg-white'
				style={{ borderRadius: '10px' }}
				variant='top'
				src={item.thumbnail}
				alt={item.title}
			/>
			<Card.Body>
				<Card.Title className='text-truncate'>{item.title}</Card.Title>
				<Card.Text className='text-truncate' style={{ fontSize: '.9rem', color: '#BFBFBF' }}>
					{createdAt}, {item.User.fullName}
				</Card.Text>
				<Card.Text style={{ fontSize: '1rem', color: '#6C6C6C' }}>{clean}</Card.Text>
			</Card.Body>
		</Card>
	);
}

export default JourneyCard;
