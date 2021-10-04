import { useHistory, useParams } from 'react-router';
import React, { useContext } from 'react';

import { updateJourney, updateJourneyNF } from '../config/server';
import JourneyForm from '../components/Form/JourneyForm';
import { AppContext } from '../context/AppContext';

function EditJourney() {
	const route = useHistory();
	const [state, dispatch] = useContext(AppContext);
	const { id } = useParams();

	async function handlePost(formData, rawContentState) {
		dispatch({ type: 'IS_LOADING_TRUE' });
		let response = null;
		if (formData.thumbnail) {
			const form = new FormData();
			form.set('title', formData.title);
			form.set('description', JSON.stringify(rawContentState));
			form.set('status', formData.status);
			try {
				form.set('thumbnail', formData.thumbnail[0], formData.thumbnail[0].name);
			} catch (error) {}
			response = await updateJourney(form, id);
		} else {
			const data = {
				title: formData.title,
				description: JSON.stringify(rawContentState),
				status: formData.status,
			};
			response = await updateJourneyNF(data, id);
		}
		if (response.status === 200) {
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
				<JourneyForm handlePost={handlePost} id={id} />
			</div>
		</div>
	);
}

export default EditJourney;
