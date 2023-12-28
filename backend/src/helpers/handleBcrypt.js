import { compare, hashSync} from 'bcrypt'


export const encryptP = async (text) =>{
    const hashP =  hashSync(text,8);
    return hashP
}

export const compareP = async (passPlain,hashPass) =>{
    return await compare(passPlain,hashPass);
}

