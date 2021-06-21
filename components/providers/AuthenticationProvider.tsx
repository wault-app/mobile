import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { PropsWithChildren } from "react";
import RegistrationScreen from "@components/screens/RegistrationScreen";
import Authentication from "@lib/api/Authentication";
import { Fragment } from "react";

export type AuthenticationProviderProps = PropsWithChildren<{}>;

const AuthenticationProvider = (props: AuthenticationProviderProps) => {
    const [isLoading, setLoading] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(false);

    const load = async () => {
        setLoggedIn(await Authentication.isLoggedIn());
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

    if(!isLoggedIn) {
        return (
            <RegistrationScreen />
        );
    }

    return (
        <Fragment>
            {props.children}
        </Fragment>
    );
};

export default AuthenticationProvider;