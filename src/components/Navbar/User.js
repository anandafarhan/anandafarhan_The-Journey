import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import BookmarkIco from '../../assets/img/Icon/BookmarkIco.svg';
import LogoutIco from '../../assets/img/Icon/LogoutIco.svg';
import UserIco from '../../assets/img/Icon/UserIco.svg';
import LeafIco from '../../assets/img/Icon/LeafIco.svg';
import { AppContext } from '../../context/AppContext';

function User() {
	const [state, dispatch] = useContext(AppContext);
	const route = useHistory();

	function handleLogout() {
		dispatch({
			type: 'LOGOUT',
		});
		route.push('/');
	}

	const avatar = state.user.avatar
		? state.user.avatar
		: `https://avatars.dicebear.com/api/initials/${state.user.name.split(' ').join('+')}.svg`;

	return (
		<>
			<Navbar.Toggle aria-controls='responsive-navbar-nav' />
			<Navbar.Collapse id='responsive-navbar-nav' style={{ flexGrow: '0' }}>
				<Nav>
					<div className='position-relative mx-3 my-auto'></div>
					<Dropdown as={Nav.Item} className='ml-3'>
						<Dropdown.Toggle as={Nav.Link} className='text-white'>
							<img
								className='rounded-circle'
								src={avatar}
								alt='user pic'
								width='50px'
								height='50px'
								style={{ position: 'relative', border: '2px solid #2E86DE' }}
							/>
						</Dropdown.Toggle>
						<Dropdown.Menu align='end'>
							<Dropdown.Item as={Link} to='/profile' className='p-2'>
								<img src={UserIco} className='mx-2' width='30rem' alt='Profile' />
								Profile
							</Dropdown.Item>
							<Dropdown.Item as={Link} to='/journey' className='p-2'>
								<img src={LeafIco} className='mx-2' width='30rem' alt='New Journey' />
								New Journey
							</Dropdown.Item>
							<Dropdown.Item as={Link} to='/bookmark' className='p-2'>
								<img src={BookmarkIco} className='ms-2 me-3' width='20rem' alt='Bookmark' />
								Bookmark
							</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item onClick={handleLogout} className='p-2'>
								<img src={LogoutIco} className='mx-2' width='30rem' alt='Logout' />
								Logout
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Nav>
			</Navbar.Collapse>
		</>
	);
}

export default User;
