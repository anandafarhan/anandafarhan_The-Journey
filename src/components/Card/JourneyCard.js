import React, { useContext } from 'react';
import { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { addUserBookmark, deleteUserBookmark } from '../../config/server';
import { AppContext } from '../../context/AppContext';
const sanitizeHtml = require('sanitize-html');

function JourneyCard({ item }) {
	const [state, dispatch] = useContext(AppContext);
	const route = useHistory();
	const clean = sanitizeHtml(item.description, {
		allowedTags: [],
		allowedAttributes: [],
	});

	async function handleAddBookmark(e, id) {
		e.stopPropagation();
		e.preventDefault();
		if (state.isLogin === true) {
			if (item.userId === state.user.id) return console.log('Cant Bookmark Self Post');
			dispatch({ type: 'IS_LOADING_TRUE' });
			console.log(id);
			await addUserBookmark({ id });
			dispatch({ type: 'IS_LOADING_FALSE' });
		} else {
			dispatch({ type: 'MODAL_LOGIN' });
			dispatch({ type: 'IS_LOADING_FALSE' });
		}
	}

	async function handleDeleteBookmark(e, id) {
		e.stopPropagation();
		e.preventDefault();
		if (state.isLogin === true) {
			dispatch({ type: 'IS_LOADING_TRUE' });
			console.log(id);
			await deleteUserBookmark(id);
			dispatch({ type: 'IS_LOADING_FALSE' });
		} else {
			dispatch({ type: 'MODAL_LOGIN' });
			dispatch({ type: 'IS_LOADING_FALSE' });
		}
	}

	function handleClick(e, id) {
		e.stopPropagation();
		e.preventDefault();
		route.push(`/journey/${id}`);
	}
	return (
		<Card
			className='mx-1 my-3'
			style={{
				borderRadius: '10px',
				width: '300px',
				height: '360px',
				filter: 'drop-shadow(0px 0px 3px rgba(200,200,200,70%))',
			}}
			onClick={(e) => handleClick(e, item.id)}
		>
			{item.Bookmark ? (
				<Form.Check
					type='checkbox'
					className='position-absolute top-0 end-0'
					onClick={(e) => handleDeleteBookmark(e, item.Bookmark.id)}
					checked
				/>
			) : (
				<Form.Check
					type='checkbox'
					className='position-absolute top-0 end-0'
					onClick={(e) => handleAddBookmark(e, item.id)}
				/>
			)}

			<Card.Img
				className='img-card bg-white'
				style={{ borderRadius: '10px' }}
				variant='top'
				src={item.thumbnail}
				alt={item.title}
			/>
			<Card.Body>
				<Card.Title style={{ textDecoration: 'none' }}>{item.title}</Card.Title>
				<Card.Text className='fs-6'>{clean}</Card.Text>
			</Card.Body>
		</Card>
	);
}

export default JourneyCard;
