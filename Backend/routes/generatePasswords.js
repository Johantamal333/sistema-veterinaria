const bcrypt = require("bcryptjs");

const passwords = ["admin123", "superseguro", "modpass456", "prueba1"];

passwords.forEach(pass => {
    const hash = bcrypt.hashSync(pass, 10);
    console.log(`Contraseña: ${pass} -> Hash: ${hash}`);
});
