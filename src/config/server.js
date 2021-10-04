import axios from 'axios';

//*------------------------------  Initiate Axios  ------------------------------*//
const baseURL = 'http://localhost:5000/api/v1';

export const API = axios.create({
	baseURL,
});

const configJSON = {
	headers: {
		'Content-Type': 'application/json',
	},
};

const configMultiPart = {
	headers: {
		'Content-Type': 'multipart/form-data',
	},
};

//*------------------------------  Set Auth Header  ------------------------------*//
export const setAuthToken = (token) => {
	if (token) {
		API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete API.defaults.headers.common['Authorization'];
	}
};

//*------------------------------  Register User  ------------------------------*//
export async function registerUser(inputData) {
	try {
		const response = await API.post('/auth/register', inputData, configJSON);
		setAuthToken(response.data.data.token);
		return response;
	} catch (err) {
		return err.response;
	}
}

//*------------------------------  Login User  ------------------------------*//

export async function loginUser(inputData) {
	try {
		const response = await API.post('/auth/login', inputData, configJSON);
		setAuthToken(response.data.data.token);
		return response;
	} catch (err) {
		return err.response;
	}
}

//*------------------------------  Update Profile  ------------------------------*//

export async function updateProfile(data) {
	try {
		const response = await API.patch(`/user`, data, configMultiPart);
		return response;
	} catch (err) {
		return err.response;
	}
}

//*------------------------------  Get Journeys  ------------------------------*//

export async function getJourneys() {
	try {
		const response = await API.get('/journeys');
		return response;
	} catch (err) {
		return err.response;
	}
}

//*------------------------------  Search Journeys  ------------------------------*//

export async function searchJourneys(s) {
	try {
		const response = await API.get(`/journeys?search=${s}`);
		return response;
	} catch (err) {
		return err.response;
	}
}

//*------------------------------  Get User Journeys  ------------------------------*//

export async function getUserJourneys() {
	try {
		const response = await API.get('/my-journeys');
		return response;
	} catch (err) {
		return err.response;
	}
}

//*------------------------------  Get Journey by Id  ------------------------------*//

export async function getJourney(id) {
	try {
		const response = await API.get(`/journey/${id}`);
		return response;
	} catch (err) {
		return err.response;
	}
}

//*------------------------------  Add Journeys  ------------------------------*//

export async function addJourney(data) {
	try {
		const response = await API.post('/journey', data, configMultiPart);
		return response;
	} catch (err) {
		return err.response;
	}
}

//*------------------------------  Update Journey No File  ------------------------------*//

export async function updateJourneyNF(data, id) {
	try {
		const response = await API.patch(`/journeyNF/${id}`, data, configJSON);
		return response;
	} catch (err) {
		return err.response;
	}
}

//*------------------------------  Update Journey  ------------------------------*//

export async function updateJourney(data, id) {
	try {
		const response = await API.patch(`/journey/${id}`, data, configMultiPart);
		return response;
	} catch (err) {
		return err.response;
	}
}

//*------------------------------  Delete Journey  ------------------------------*//

export async function deleteJourney(id) {
	try {
		const response = await API.delete(`/journey/${id}`);
		return response;
	} catch (err) {
		return err.response;
	}
}

//*------------------------------  Get User Bookmarks  ------------------------------*//
export async function getUserBookmarks() {
	try {
		const response = await API.get('/my-bookmarks');
		return response;
	} catch (err) {
		return err.response;
	}
}

//*------------------------------  Get User Bookmarks  ------------------------------*//
export async function getUserBookmarksId() {
	try {
		const response = await API.get('/my-bookmarksId');
		return response;
	} catch (err) {
		return err.response;
	}
}

//*------------------------------  Add / Delete User Bookmark  --------------------------*//
export async function addUserBookmark(data) {
	try {
		const response = await API.post('/bookmark', data, configJSON);
		return response;
	} catch (err) {
		return err.response;
	}
}

//*------------------------------  Upload Image  ------------------------------*//

export async function uploadImage(data) {
	try {
		const response = await API.post('/upload', data, configMultiPart);
		return response;
	} catch (err) {
		return err.response;
	}
}

//!------------------------------  Delete User Bookmark  ------------------------------*//
export async function deleteUserBookmark(id) {
	try {
		const response = await API.delete(`/bookmark/${id}`);
		return response;
	} catch (err) {
		return err.response;
	}
}
