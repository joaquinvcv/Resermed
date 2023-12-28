export interface ICita {
    id: number,
    fecha: string,
    hora_inicio: string,
    hora_termino: string,
    observacion: string,
    asiste: boolean,
    pagada: boolean,
    libre: boolean,
    costo: number,
    UsuarioId: number | any,
    MedicoId: number
}

export interface IMedico{
    id: number,
    nombre:string,
    apellido:string,
    rut:string,
    email:string,
    especialidad:string
    password:string,
    img_url:string,
    telefono:number,
    direccion: string
}
export interface IUsuario{
    id: number,
    nombre:string,
    apellido:string,
    rut:string,
    email:string,
    password:string,
    img_url:string,
    telefono:number,
}

export interface IMantenedor{
    id: number,
    nombre:string,
    apellido:string,
    rut:string,
    email:string,
    password:string,
    img_url:string,
    telefono:number,
}

export interface DecodedToken{
    exp: number;
    id: string;
    nombre: string;
    email: string;
    userType: string
    iat: number;
}

export interface ParamCitas{
    duracion: number,
    intervalo: number,
    protegido1: string,
    protegido2: string,
    jornadaI: string,
    jornadaT: string,
    costo: number
}

export interface IEvent{
    title: string,
    start: string,
    end: string
}