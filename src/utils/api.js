class Api {
  constructor() {
    this._authorization = "e1a4b600-66f9-4d45-b660-4ae737476424";
  }

  async _useFetch(url, method, body) {
    const res = await fetch(url, {
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      method,
      body: JSON.stringify(body),
    });

    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error ${res.status}`);
  }

  async getUserInfoFromServer() {
    try {
      const res = await this._useFetch(
        "https://around.nomoreparties.co/v1/web_es_05/users/me",
        "GET"
      );

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async getCards() {
    try {
      const res = await this._useFetch(
        "https://around.nomoreparties.co/v1/web_es_05/cards",
        "GET"
      );
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async saveDataToServer(name, about) {
    try {
      const res = await this._useFetch(
        "https://around.nomoreparties.co/v1/web_es_05/users/me",
        "PATCH",
        {
          name,
          about,
        }
      );

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async addNewCardToServer(name, link) {
    try {
      const res = await this._useFetch(
        "https://around.nomoreparties.co/v1/web_es_05/cards",
        "POST",
        {
          name: name,
          link: link,
        }
      );
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCardFromServer(cardId) {
    try {
      const res = await this._useFetch(
        `https://around.nomoreparties.co/v1/web_es_05/cards/${cardId}`,
        "DELETE"
      );

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async addLikeFromCard(cardId) {
    try {
      const res = await this._useFetch(
        `https://around.nomoreparties.co/v1/web_es_05/cards/likes/${cardId}`,
        "PUT"
      );

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteLikeFromCard(cardId) {
    try {
      const res = await this._useFetch(
        `https://around.nomoreparties.co/v1/web_es_05/cards/likes/${cardId}`,
        "DELETE"
      );

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async updateAvatar(avatarUrl) {
    try {
      if (typeof avatarUrl === "string" && /^https?:\/\/\S+$/.test(avatarUrl)) {
        const res = await this._useFetch(
          "https://around.nomoreparties.co/v1/web_es_05/users/me/avatar",
          "PATCH",
          {
            avatar: avatarUrl,
          }
        );

        return res;
      } else {
        throw new Error("La URL del avatar no es válida");
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const api = new Api({
  address: "https://around.nomoreparties.co",
  groupId: `web_es_05`,
  token: `e1a4b600-66f9-4d45-b660-4ae737476424`,
});

export default api;
