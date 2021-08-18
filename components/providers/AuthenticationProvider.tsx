import React, { Dispatch, SetStateAction, useState } from "react";
import AppLoading from "expo-app-loading";
import { PropsWithChildren } from "react";
import RegistrationScreen from "@components/screens/RegistrationScreen";
import { createContext } from "react";
import User from "@lib/api/User";
import { useContext } from "react";
import { Linking } from "react-native";
import Authentication from "@lib/api/Authentication";
import { UserType } from "@wault/typings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@components/screens/LoginScreen";

export type AuthenticationProviderProps = PropsWithChildren<{}>;

type UserContextType = {
    user: UserType;
    setUser: Dispatch<SetStateAction<UserType>>;
};

const UserContext = createContext<UserContextType>(null);

export const useUser = () => useContext(UserContext);

const Stack = createNativeStackNavigator();

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
    const [user, setUser] = useState<UserType>();
    const [isLoading, setLoading] = useState(true);

    const processVerification = async (url?: string) => {
        try {
            const initialUrl = await Linking.getInitialURL() || url;

            if (initialUrl) {
                const url = initialUrl.replace("wault-auth://", "");
                const [id, secret] = url.split(":");
                
                await Authentication.verifyRegistration(id, secret);
                const user = await User.get();
    
                setUser(user);
                setLoading(false);
            }
        } catch(e) {
            const user = await User.get();
    
            if(user) {
                setUser(user);
                setLoading(false);
            }
        }
    };

    Linking.removeAllListeners("url");
    Linking.addListener("url", async ({ url }) => processVerification(url));

    const load = async () => {
        const user = await User.get();
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
        <UserContext.Provider value={{ user, setUser }}>
            {!user ? (
                <Stack.Navigator>
                    <Stack.Screen
                        name={"register"}
                        options={{
                            headerTitle: "Registration",
                        }}
                        component={RegistrationScreen}
                    />
                    <Stack.Screen
                        name={"login"}
                        options={{
                            headerTitle: "Login"
                        }}
                        component={LoginScreen}
                    />
                </Stack.Navigator>
            ) : children}
        </UserContext.Provider>
    );
};

export default AuthenticationProvider;