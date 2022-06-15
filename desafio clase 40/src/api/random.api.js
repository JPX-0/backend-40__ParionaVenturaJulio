const randomApi = async (res, cant) => {
  let qty;
  if(isNaN(cant)) qty = 10000000;
  else qty = cant;
  const dataRandom = [];
  for(let i = 0; i < qty; i++) {
    dataRandom.push(Math.floor(Math.random() * 1000) + 1);
  }
  const dataRepeat = [];
  const dataObject = {};
  for (let i = 0; i < dataRandom.length; i++) {
    const elem = dataRandom[i];
    if(!dataRepeat.includes(elem)) {
      dataRepeat.push(elem);
      dataObject[`${elem}`] = 1;
    } else dataObject[`${elem}`]++;
  }
  return res.json(dataObject);
}

module.exports = randomApi;