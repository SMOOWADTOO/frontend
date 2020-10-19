export const devBASE = "http://localhost";
export const prodBASE = "http://35.185.176.233";

export const BASE = devBASE;

export const USER = BASE == devBASE ? BASE + ":7001/user" : BASE + "/api/user";

export default {
    USERAPI: USER,
}