// AuthContext.tsx
import { createContext } from 'react';

interface AuthContextType {
  jwt: string;
  setJwt: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
