class Api {
	#url;
	#headers;

	constructor(data) {
		this.#url = data.url;
		this.#headers = data.headers;
	}

	response(fetch) {
		return fetch()
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				return Promise.reject(new Error(response.status));
			})
			.catch((error) => {
				console.log("Error while sending request", error);
				return false;
			});
	}

	getInitialCards() {
		return this.response(() => {
			return fetch(`${this.#url}/cards`, { credentials: 'include', headers: this.#headers });
		});
	}

	getUserInformation() {
		return this.response(() => {
			return fetch(`${this.#url}/users/me`, { credentials: 'include', headers: this.#headers });
		});
	}

	updateUserInformation(name, about) {
		return this.response(() => {
			return fetch(`${this.#url}/users/me`, {
				method: "PATCH",
				credentials: 'include',
				headers: this.#headers,
				body: JSON.stringify({
					name: name,
					about: about,
				}),
			});
		});
	}

	createCard({ name, link }) {
		return this.response(() => {
			return fetch(`${this.#url}/cards`, {
				method: "POST",
				credentials: 'include',
				headers: this.#headers,
				body: JSON.stringify({
					name: name,
					link: link,
				}),
			});
		});
	}

	deleteCard(id) {
		return this.response(() => {
			return fetch(`${this.#url}/cards/${id}`, {
				method: "DELETE",
				credentials: 'include',
				headers: this.#headers,
			});
		});
	}

	setLike(id) {
		return this.response(() => {
			return fetch(`${this.#url}/cards/${id}/likes`, {
				method: "PUT",
				credentials: 'include',
				headers: this.#headers,
			});
		});
	}

	removeLike(id) {
		return this.response(() => {
			return fetch(`${this.#url}/cards/${id}/likes`, {
				method: "DELETE",
				credentials: 'include',
				headers: this.#headers,
			});
		});
	}

	updateAvatar(link) {
		return this.response(() => {
			return fetch(`${this.#url}/users/me/avatar`, {
				method: "PATCH",
				credentials: 'include',
				headers: this.#headers,
				body: JSON.stringify({
					avatar: link,
				}),
			});
		});
	}

	signOut() {
		return this.response(() => {
			return fetch(`${this.#url}/signout`, { credentials: 'include', headers: this.#headers });
		});
	}
}

const API = new Api({
	url: "http://api.cookie.nomoredomains.xyz",
	credentials: 'include',
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

export { API as Api };
