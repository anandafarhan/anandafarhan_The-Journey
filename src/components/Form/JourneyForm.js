import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Image, Spinner } from 'react-bootstrap';

import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { BsCardImage } from 'react-icons/bs';

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { getJourney, uploadImage } from '../../config/server';
import { AppContext } from '../../context/AppContext';

function JourneyForm({ handlePost, id }) {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [state] = useContext(AppContext);
	const [preview, setPreview] = useState(null);
	const [formData, setFormData] = useState({
		title: '',
		thumbnail: null,
		status: true,
	});

	async function loadJourney() {
		const response = await getJourney(id);
		const journey = response.data.data.journey;
		const editorContent = convertFromRaw(JSON.parse(journey.description));
		setFormData({
			title: journey.title,
			thumbnail: null,
			status: journey.status,
		});
		setPreview(response.data.data.journey.thumbnail);
		setEditorState(EditorState.createWithContent(editorContent));
	}

	function handleChange(e) {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
		}));

		if (e.target.type === 'file') {
			let url = e.target.files.length < 1 ? null : URL.createObjectURL(e.target.files[0]);
			setPreview(url);
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
		const rawContentState = convertToRaw(editorState.getCurrentContent());
		handlePost(formData, rawContentState);
	}

	async function uploadImageCB(image) {
		const form = new FormData();
		form.set('image', image);
		const response = await uploadImage(form);
		return { data: { link: response.data.path } };
	}

	useEffect(() => {
		if (id) {
			loadJourney();
		}
	}, []);

	return (
		<Form onSubmit={(e) => handleSubmit(e)}>
			<Form.Group className='mb-3' controlId='Title'>
				<Form.Label className='fw-bold'>Title</Form.Label>
				<Form.Control
					type='text'
					name='title'
					value={formData.title}
					onChange={(e) => handleChange(e)}
					className='input-overide'
					required
				/>
			</Form.Group>
			<Form.Group className='mb-3' controlId='Thumbnail'>
				<Form.Label>
					<span className='fw-bold'>Thumbnail</span>
					<div
						className='d-flex justify-content-center align-items-center'
						style={{
							color: 'rgba(50,50,50,60%)',
							border: '2px solid #3b97d3',
							width: '12rem',
							height: '9rem',
							borderRadius: '5px',
						}}
					>
						{preview ? <Image src={preview} alt='thumbnail' width='90%' /> : <BsCardImage size='10rem' />}
					</div>
				</Form.Label>
				<Form.Control
					type='file'
					name='thumbnail'
					onChange={(e) => handleChange(e)}
					style={{ display: 'none' }}
				/>
			</Form.Group>

			<Editor
				editorState={editorState}
				onEditorStateChange={setEditorState}
				wrapperClassName='wrapper-class'
				toolbarClassName='toolbar-class'
				editorClassName='editor-class'
				toolbar={{
					image: {
						uploadCallback: uploadImageCB,
						previewImage: true,
						inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
					},
				}}
			/>

			<div className='my-3 d-flex justify-content-end'>
				<Form.Group className='me-4 d-flex flex-row align-items-center justify-content-between'>
					<Form.Label
						className={formData.status ? 'm-0 me-2 fw-bold text-1' : 'm-0 me-2 fw-bold text-3'}
					>
						{formData.status ? 'Publish' : 'Unpublish'}
					</Form.Label>
					<Form.Check
						type='switch'
						id='status'
						checked={formData.status}
						onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
					/>
				</Form.Group>
				{state.isLoading ? (
					<Button type='submit' variant='primary' style={{ width: '100px' }} disabled>
						<Spinner animation='border' variant='light' size='sm' />
					</Button>
				) : (
					<Button type='submit' variant='primary' style={{ width: '100px' }}>
						Post
					</Button>
				)}
			</div>
		</Form>
	);
}

export default JourneyForm;
