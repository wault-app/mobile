import React, { Dispatch, SetStateAction, useState } from "react";
import AppLoading from "expo-app-loading";
import { PropsWithChildren } from "react";
import RegistrationScreen from "@components/screens/RegistrationScreen";
import { createContext } from "react";
import User, { UserType } from "@lib/api/User";
import { useContext } from "react";

export type AuthenticationProviderProps = PropsWithChildren<{}>;

type UserContextType = {
    user: UserType;
};

const UserContext = createContext<UserContextType>(null);

export const useUser = () => useContext(UserContext);

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
    const [user, setUser] = useState<UserType>();
    const [isLoading, setLoading] = useState(true);

    const load = async () => {
        const user = await User.load();
        console.log(user);
        setUser(user);
        setLoading(false);
    };

    if(isLoading) {
        return (
            <AppLoading
                startAsync={load}
                onFinish={() => setLoading(false)}
                onError={console.warn}
            />
        );
    }

    return (
        <UserContext.Provider value={{ user }}>
            {!user ? (
                <RegistrationScreen setUser={setUser} />
            ) : children}
        </UserContext.Provider>
    );
};

export default AuthenticationProvider;