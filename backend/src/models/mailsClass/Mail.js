import { google } from 'googleapis';
import nodemailer from 'nodemailer';

//const OAuth2 = google.auth.OAuth2;


const smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'contrerasesparza2000@gmail.com',
        pass: 'poncogxnptmktbbn'
    }
});

smtpTransport.verify().then(() => {
    console.log("no hay error")
});


//la idea seria enviar la estructura html desde el front
// export function mailCancelarCita(nombre, correoDestino1, correoDestino2, htmlMessage) {
//     const mailOptions = {
//         from: `Hola ${nombre}, se ha cancelado tu cita <contrerasesparza2000@gmail.com>`,
//         to: [correoDestino1, correoDestino2],
//         generateTextFromHTLM: true,
//         html: htmlMessage
//     }



//     smtpTransport.sendMail(mailOptions, (error, res) => {
//         error ? console.log(error) : console.log(res);
//         smtpTransport.close();
//     });
// }

export function mailReservarCita(nombre1,apellido1,nombre2,apellido2,email1,email2,fecha,hora1,hora2) {
    
    
    let htmlMessage = `
        <h1>Tu cita con fecha ${fecha} ha sido agendada</h1>

        <h4>Detalles de cita</h4>

        <p><strong>Fecha:</strong> ${fecha}</p>
        <p><strong>Hora de inicio:</strong> ${hora1}</p>
        <p><strong>Hora de término</strong> ${hora2}</p>
        <p><strong>Paciente:</strong> ${nombre1} ${apellido1}</p>
        <p><strong>Médico:</strong> ${nombre2} ${apellido2}</p>
        
    `;
    const mailOptions = {
        from: `Se ha agendado una cita <contrerasesparza2000@gmail.com>`,
        to: [email1, email2],
        generateTextFromHTLM: true,
        html: htmlMessage
    }



    smtpTransport.sendMail(mailOptions, (error, res) => {
        error ? console.log(error) : console.log(res);
        smtpTransport.close();
    });
}

export function mailCancelarCita(nombre1,apellido1,nombre2,apellido2,email1,email2,fecha,hora1,hora2) {
    
    
    let htmlMessage = `
        <h1>Tu cita con fecha ${fecha} ha sido cancelada</h1>

        <h4>Detalles de cita</h4>

        <p><strong>Fecha:</strong> ${fecha}</p>
        <p><strong>Hora de inicio:</strong> ${hora1}</p>
        <p><strong>Hora de término</strong> ${hora2}</p>
        <p><strong>Paciente:</strong> ${nombre1} ${apellido1}</p>
        <p><strong>Médico:</strong> ${nombre2} ${apellido2}</p>
        
    `;
    const mailOptions = {
        from: `Hola, se ha cancelado tu cita <contrerasesparza2000@gmail.com>`,
        to: [email1, email2],
        generateTextFromHTLM: true,
        html: htmlMessage
    }



    smtpTransport.sendMail(mailOptions, (error, res) => {
        error ? console.log(error) : console.log(res);
        smtpTransport.close();
    });
}

export function enviarMailContacto(nombre, email, telefono, sobreMi) {
    let htmlMessageContacto = `
        <h1>Hola has recibido un mensaje de un medico</h1>
        <table>
            <thead>
                <th>nombre</th>
                <th>email</th>
                <th>telefono</th>
                <th>comentarios</th>
            </thead>
            <tbody>
                <tr>
                    <td>${nombre}</td>
                    <td>${email}</td>
                    <td>${telefono}</td>
                    <td>${sobreMi}</td>
                </tr>
            </tbody>
        </table>
    `;
    const mailOptions = {
        from: `<${email}>`,
        to: "eduardo.contreras1902@alumnos.ubiobio.cl", //podemos incluir el correo
        generateTextFromHTLM: true,
        html: htmlMessageContacto
    }



    smtpTransport.sendMail(mailOptions, (error, res) => {
        error ? console.log(error) : console.log(res);
        smtpTransport.close();
    });
}





