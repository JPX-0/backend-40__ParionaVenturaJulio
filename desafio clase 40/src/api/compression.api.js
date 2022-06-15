const compressionApi = () => {
  const isCompression = [];
  for (let i = 0; i < process.argv.length; i++) {
    if(process.argv[i] == "-c") 
      isCompression.push(process.argv[i + 1] == "false" ? false : process.argv[i + 1] == "true" ? true : process.argv[i + 1]);
    else isCompression[0] = true;
  }
  return isCompression[0];
}

module.exports = compressionApi;