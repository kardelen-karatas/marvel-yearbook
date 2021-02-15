import axios from "axios";
import md5 from 'md5'
require('dotenv').config({path:'../.env'})

export function marvelCharactersAPI(limit, offset){

    const timestamp = new Date().getTime();
    const hash = md5(timestamp + process.env.REACT_APP_PRIVATEKEY + process.env.REACT_APP_PUBLICKEY); 
    const url = `http://gateway.marvel.com/v1/public/characters?limit=${limit}&offset=${offset}&ts=${timestamp}&apikey=${process.env.REACT_APP_PUBLICKEY}&hash=${hash}`;
    return axios.get(url).then(response => response.data)

}