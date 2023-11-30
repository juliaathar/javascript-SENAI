import { jwtDecode } from "jwt-decode";
import { createContext } from "react";

export const UserContext = createContext(null)

export const userDecodeToken = (theToken) => {
    const decoded = jwtDecode(theToken) //objeto do payload
    return{role: decoded.role, nome: decoded.name, userID: decoded.userID, token: theToken}
}