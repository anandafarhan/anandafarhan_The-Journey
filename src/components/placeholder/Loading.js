import { Spinner } from 'react-bootstrap';

function Loading() {
	return (
		<div className='d-flex flex-column justify-content-center align-items-center vh-100'>
			<Spinner animation='border' role='status' variant='primary' />
		</div>
	);
}

export default Loading;
