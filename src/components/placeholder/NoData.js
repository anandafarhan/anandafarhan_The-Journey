import React from 'react';

function NoData({ placeholder }) {
	return (
		<div className='d-flex flex-column justify-content-center align-items-center mt-5'>
			<h2>{placeholder}</h2>
		</div>
	);
}

export default NoData;
