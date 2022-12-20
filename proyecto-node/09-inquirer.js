// 09-inquirer.js
// npm init -> package.json -> dependencias -> scripts
// npm install inquirer -> npm i inquirer
// node_modules -> estan las dependencias

const inquirer = require('inquirer');

async function main() {
    try {
        const respuesta = await inquirer.prompt([
            {
                type: 'input',
                name: 'nombre',
                message: 'Ingrese su nombre'
            },
        ]);
        console.log('respuesta');
        console.log('respuesta', respuesta);

    } catch (e) {
        console.error(e)
    }
}
main();











