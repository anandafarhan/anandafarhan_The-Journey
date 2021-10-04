import React, { useContext } from 'react';
import { useHistory } from 'react-router';

import JourneyForm from '../components/Form/JourneyForm';
import { AppContext } from '../context/AppContext';
import { addJourney } from '../config/server';

function NewJourney() {
	const [state, dispatch] = useContext(AppContext);
	const route = useHistory();

	async function handlePost(formData, rawContentState) {
		dispatch({ type: 'IS_LOADING_TRUE' });
		const form = new FormData();
		form.set('title', formData.title);
		form.set('description', JSON.stringify(rawContentState));
		form.set('status', formData.status);
		try {
			form.set('thumbnail', formData.thumbnail[0], formData.thumbnail[0].name);
		} catch (error) {}
		const response = await addJourney(form);
		if (response.status === 201) {
			route.push('/profile');
		} else {
			console.log(response);
		}
		dispatch({ type: 'IS_LOADING_FALSE' });
	}

	return (
		<div className='mx-5 pb-5' style={{ marginTop: '100px' }}>
			<h1>New Journey</h1>
			<div className='mx-5'>
				<JourneyForm handlePost={handlePost} />
			</div>
		</div>
	);
}

export default NewJourney;
