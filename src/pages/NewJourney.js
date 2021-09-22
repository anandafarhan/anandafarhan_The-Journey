import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/third_party/embedly.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/third_party/embedly.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';
import { useHistory } from 'react-router';
import { addJourney } from '../config/server';

function NewJourney() {
	const route = useHistory();
	const [preview, setPreview] = useState(null);
	const [formData, setFormData] = useState({
		title: '',
		thumbnail: null,
		description: '',
		status: true,
	});

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

	async function handleSubmit(e) {
		e.preventDefault();
		const form = new FormData();
		form.set('title', formData.title);
		form.set('description', formData.description);
		form.set('status', formData.status);
		try {
			form.set('thumbnail', formData.thumbnail[0], formData.thumbnail[0].name);
		} catch (error) {}

		await addJourney(form);

		route.push('/profile');
	}

	return (
		<div className='mx-5 my-5'>
			<h1>New Journey</h1>
			<div className='mx-5'>
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
					<Form.Group className='mb-5' controlId='Thumbnail'>
						<Form.Label className='fw-bold'>Thumbnail</Form.Label>
						<Form.Control
							type='file'
							name='thumbnail'
							onChange={(e) => handleChange(e)}
							className='input-overide'
							required
						/>
					</Form.Group>
					<FroalaEditor
						model={formData.description}
						onModelChange={(description) => setFormData({ ...formData, description })}
						tag='textarea'
						config={{
							attribution: false,
							placeholder: 'Type Something',
							toolbarButtons: {
								moreText: {
									buttons: [
										'bold',
										'italic',
										'underline',
										'strikeThrough',
										'subscript',
										'superscript',
										'fontFamily',
										'fontSize',
										'textColor',
										'backgroundColor',
										'inlineClass',
										'inlineStyle',
										'clearFormatting',
									],
								},
								moreParagraph: {
									buttons: [
										'alignLeft',
										'alignCenter',
										'formatOLSimple',
										'alignRight',
										'alignJustify',
										'formatOL',
										'formatUL',
										'paragraphFormat',
										'paragraphStyle',
										'lineHeight',
										'outdent',
										'indent',
										'quote',
									],
								},
								moreRich: {
									buttons: [
										'insertLink',
										'insertImage',
										'insertVideo',
										'insertTable',
										'emoticons',
										'fontAwesome',
										'specialCharacters',
										'embedly',
										'insertFile',
										'insertHR',
									],
								},
								moreMisc: {
									buttons: [
										'undo',
										'redo',
										'fullscreen',
										'print',
										'getPDF',
										'spellChecker',
										'selectAll',
										'html',
										'help',
									],
									align: 'right',
									buttonsVisible: 2,
								},
							},
						}}
						required
					/>
					<div className='my-3 d-flex justify-content-end'>
						<Button type='submit' variant='primary'>
							Post
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default NewJourney;
