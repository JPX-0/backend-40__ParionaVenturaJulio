class MessageServices {
  render(req) {
    const { params: { idUser }, query: { id, text } } = req;
    if(idUser && id) throw new Error("Sorry, we cannot understand what you are requesting.");
    if(idUser) return { id: idUser, text };
    if(id) return { id, text };
    return null;
  }

  format(data) {
    const { author, text } = data;
    if(!author || !text) {
      const response = [];
      const testData = [{ key: "author", value: author }, { key: "text", value: text }];
      testData.forEach(e => !e.value && response.push(e.key));
      throw new Error(`You must correctly fill in the following keys: [${response.join(", ")}]`);
    }
    return true;
  }
}

module.exports = MessageServices;