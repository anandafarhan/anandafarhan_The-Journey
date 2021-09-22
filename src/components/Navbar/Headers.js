import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import LoginModal from '../Modal/LoginModal';
import RegisterModal from '../Modal/RegisterModal';
import User from './User';
import Guest from './Guest';
import { AppContext } from '../../context/AppContext';
import Logo from '../../assets/img/Logo.svg';

function Headers() {
	const [state, dispatch] = useContext(AppContext);

	const navStatus = () => {
		if (!state.isLogin) {
			return <Guest dispatch={dispatch} />;
		} else {
			return <User />;
		}
	};

	return (
		<>
			<Navbar
				collapseOnSelect
				expand='lg'
				className={
					!state.isLogin ? 'd-flex align-items-start hero' : 'd-flex align-items-start shadow-sm'
				}
				bg='white'
			>
				<Container className=' d-flex justify-content-between'>
					<Link to='/'>
						<Navbar.Brand>
							<img src={Logo} alt='Journeys Diary' width='140px' />
						</Navbar.Brand>
					</Link>
					{navStatus()}
				</Container>
			</Navbar>
			<LoginModal
				handleClose={() => dispatch({ type: 'MODAL_LOGIN' })}
				switchModal={() => dispatch({ type: 'SWITCH_MODAL' })}
				show={state.modalLogin}
			/>
			<RegisterModal
				handleClose={() => dispatch({ type: 'MODAL_REGISTER' })}
				switchModal={() => dispatch({ type: 'SWITCH_MODAL' })}
				show={state.modalRegister}
			/>
		</>
	);
}

export default Headers;
