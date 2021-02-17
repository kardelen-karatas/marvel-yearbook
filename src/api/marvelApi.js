import axios from "axios";
import md5 from "md5";
require("dotenv").config({ path: "../.env" });

export function marvelCharactersApi(parameters) {
  const timestamp = new Date().getTime();
  const hash = md5(
    timestamp +
      process.env.REACT_APP_PRIVATEKEY +
      process.env.REACT_APP_PUBLICKEY
  );
  const base = "http://gateway.marvel.com/v1/public/characters?";
  const auth = `ts=${timestamp}&apikey=${process.env.REACT_APP_PUBLICKEY}&hash=${hash}`;

  // create parameters string for api
  // examp: 'limit=8&offset=24'
  const params = Object.entries(parameters).reduce(
    (acc, [key, value]) => acc + `${key}=${value}&`,
    ""
  );

  const url = `${base}${params}${auth}`;

  return axios.get(url).then((response) => response.data);
}
