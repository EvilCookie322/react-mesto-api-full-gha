const BASE_URl = "http://api.cookie.nomoredomains.xyz";

const checkResponse = (response) => {
	return response.ok ? response.json() : Promise.reject(response.json());
};

const registration = ({ email, password }) => {
	return fetch(`${BASE_URl}/signup`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		credentials: 'include',
		body: JSON.stringify({ email, password }),
	}).then((response) => checkResponse(response));
};

const authorization = ({ email, password }) => {
	return fetch(`${BASE_URl}/signin`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		credentials: 'include',
		body: JSON.stringify({ email, password }),
	}).then((response) => checkResponse(response));
};
const checkToken = () => {
	return fetch(`${BASE_URl}/users/me`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		credentials: 'include',
	}).then((response) => {
		return response.ok
			? response.json()
			: Promise.reject(
					new Error(`Ошибка проверки токена. Код ошибки: ${response.status}`, )
			);
	});
};

export { registration, authorization, checkToken };
