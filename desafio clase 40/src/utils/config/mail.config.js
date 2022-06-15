const fs = require("fs");

const mailUserView = (user) => `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title></title>
    </head>
    <body>
      <h1>Nuevo registro:</h1>
      <ul>
        <li><p><span style="font-weight: bold;">Name:</span> ${user.firstname} ${user.lastname}</p></li>
        <li><p><span style="font-weight: bold;">Email:</span> ${user.email}</p></li>
        <li><p><span style="font-weight: bold;">Location:</span> ${user.location}</p></li>
        <li><p><span style="font-weight: bold;">Admin:</span> ${user.admin}</p></li>
        <li><p><span style="font-weight: bold;">Avatar:</span> ${user.avatar}</p></li>
      </ul>
    </body>
  </html>
`.trim();

const renderMail = async (idUser, data) => await fs.promises.writeFile(process.cwd() + `/src/utils/response/users/${idUser}.html`, mailUserView(data));


module.exports = renderMail;