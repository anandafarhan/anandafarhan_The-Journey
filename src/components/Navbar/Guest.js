import { Button } from 'react-bootstrap';
import React from 'react';

function Guest({ dispatch }) {
	return (
		<div className='d-flex flex-row'>
			<Button
				variant='outline-light'
				className='mx-2'
				size='sm'
				style={{ width: '100px' }}
				onClick={() => dispatch({ type: 'MODAL_LOGIN' })}
			>
				Login
			</Button>

			<Button
				variant='primary'
				className='mx-2 bg-overide'
				size='sm'
				style={{ width: '100px' }}
				onClick={() => dispatch({ type: 'MODAL_REGISTER' })}
			>
				Register
			</Button>
		</div>
	);
}

export default Guest;
