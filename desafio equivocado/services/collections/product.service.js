class ProductServices {
  render(req) {
    const { params: { idProd }, query: { id, name, maxPrice } } = req;
    if(!idProd && !id && !name && !maxPrice ) return null;
    else if(idProd) return { id: idProd };
    else if(!idProd && (id || name || maxPrice)) {
      if(maxPrice && isNaN(+maxPrice)) throw new Error("The entered price value must be a number.");
      return req.query;
    } else throw new Error("Sorry, we cannot understand what you are requesting.")
  }

  generate(req) {
    const { body, query } = req;
    if(body && query) throw new Error("Sorry, we cannot understand what you are requesting.");
    if(body) return req.body;
    if(query) return req.query;
    throw new Error("Sorry, we cannot understand what you are requesting.");
  }

  format(data) {
    const { title, price, thumbnail } = data;
    if(isNaN(+price)) throw new Error("The entered price value must be a number.");
    if(!title || !price || !thumbnail) {
      const response = [];
      const testData = [{ key: "title", value: title }, { key: "price", value: price }, { key: "thumbnail", value: thumbnail }];
      testData.forEach(e => !e.value && response.push(e.key));
      throw new Error(`You must correctly fill in the following keys: [${response.join(", ")}]`);
    }
    return true;
  }
}

module.exports = ProductServices;