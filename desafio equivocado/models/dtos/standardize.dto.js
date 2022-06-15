class StandardizeDTO {
  constructor(data) {
    const dataParsed = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const values = Object.values(element);
      if(typeof values[0] == "object") dataParsed.push(values.reduce((prev, curr) => ({...prev, ...curr}) , {}));
      else dataParsed.push(element);
    }
    this.data = dataParsed.reduce((prev, curr) => ({...prev, ...curr}) , {});
  }

  get product() {
    return {
      title: this.data.title,
      price: this.data.price,
      thumbnail: this.data.thumbnail
    };
  }
  get user() {
    return {
      firstname: this.data.firstname,
      lastname: this.data.lastname,
      email: this.data.email,
      password: this.data.password
    };
  }

  get message() {
    return {
      author: this.data.author,
      text: this.data.text
    };
  }
};

module.exports = StandardizeDTO;