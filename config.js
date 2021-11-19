const fs = require("fs");
//const backendURL = process.env.BACKEND_URL;
const backendURL = 'https://clientes-app-v1.herokuapp.com';
if (backendURL) {
    const data = fs.readFileSync('./src/environments/environment.prod.ts', 'utf-8');
    const appURL = `urlBackend: '${backendURL}',`;
    const newValue = data.replace(/urlBackend:(.*)/g, appURL);
    console.log(newValue);
    fs.writeFileSync('./src/environments/environment.prod.ts', newValue, 'utf-8');
}