import app from './app.js';
import {sequelize} from './db/db.js';

var port = 5000;

async function start(){
    try {
        /*
        NOTA: Utilizar alguno de los sync de abajo puede vaciar las tablas de la bdd, usar cuando sea necesario
        sync({force: true}) para forzar la creación de tablas al ejecutar (este borra todo)
        sync({alter: true}) para modificar tablas al ejecutar 
        */
        await sequelize.authenticate();
        await sequelize.sync();
        
        console.log("Conexión establecida con la base de datos");
        app.listen(port, ()=>{
            console.log("Server has started on port 5000");
        });
    } catch (error) {
        console.log("No se pudo conectar con la base de datos: ", error);
    }
}

start();