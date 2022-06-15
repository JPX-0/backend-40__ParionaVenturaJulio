class UserServices {
  render(req) {
    const { params: { idUser }, query: { id } } = req;
    if(idUser && id) throw new Error("Sorry, we cannot understand what you are requesting.");
    if(idUser) return { id: idUser };
    if(id) return { id };
    return null;
  }

  format(data) {
    const { firstname, lastname, email, password } = data;
    if(!firstname || !lastname || !email || !password) {
      const response = [];
      const testData = [
        { key: "firstname", value: firstname },
        { key: "lastname", value: lastname },
        { key: "email", value: email },
        { key: "password", value: password }
      ];
      testData.forEach(e => !e.value && response.push(e.key));
      throw new Error(`You must correctly fill in the following keys: [${response.join(", ")}]`);
    }
    return true;
  }
}

module.exports = UserServices;