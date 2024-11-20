import { useContext } from "react";
import { AuthContext } from "../state/AuthContext";
import { login, logout } from "../state/auth/actions";
import { getUser } from "../services/getUser.service";
import { createUser } from "../services/createUser.service";
import { Account } from "../interfaces/user";

export type AuthContextType = {
  [key: string]: any;
  loginFunction: (username: string, password: string) => Promise<boolean>;
  logoutFunction: () => Promise<void>;
  signUpFunction: (username: string, password: string, token: string) => Promise<boolean>;
};

export const useAuth = (): AuthContextType => {
  const { state, dispatch } = useContext(AuthContext);

  const loginFunction = async (username: string, password: string) => {
    const response = getUser(username, password).then((response) => {
      const { dinBody } = response;
      const {token, roles, cuentas } = dinBody;
      
      if(token) {
        dispatch(login({username, role: roles[0], token}));
        
        const cuenta1: Account = {
          accountNumber: cuentas[0].number.toString(),
          balance: cuentas[0].amount,
          customer: username,
        };
        localStorage.setItem('cuenta1', JSON.stringify(cuenta1));
        return true;
      }
      return false;
    }).catch((error) => {
      console.log(error);

      throw new Error('Login failed');
    });
    return response;
  }

  const logoutFunction = async () => {
    dispatch(logout());
  }

  const signUpFunction = async (username: string, password: string, token: string) => {
    const response = createUser(username, password, token).then((response) => {
      if(response.ok) {
        return true;
      }
      return false;
    }).catch((error) => {
      console.log(error);
      throw new Error('Can not create new account: ');
    });
    return response;
  }
  

  return {...state, loginFunction, logoutFunction, signUpFunction};
};