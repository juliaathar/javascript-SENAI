
import axios from "axios";
/**
 * Modulo
 */


/**
 * Rota para o recurso Evento
 */
export const eventsResource = '/Evento'
/**
 * Rota para o recurso Proximos Eventos
 */
export const nextEventResource = `/Evento/ListarProximos`
/**
 * Rota para o recurso Tipos Eventos
 */
export const eventsTypeResource = `/TiposEvento`

const apiPort = '5000';
const localApiUrl = `http://localhost:${apiPort}/api`;
//const externalApiUrl = null;

const api = axios.create({
    baseURL: localApiUrl
});

export default api;