import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";
import ErrorScreen from "@components/screens/ErrorScreen";
import Safe, { KeycardType } from "@lib/api/Safe";
import WrapperError from "@lib/errors/WrapperError";
import AppLoading from "expo-app-loading";

type DataContextType = {
    keycards: KeycardType[];
    setKeycards: (keycards: KeycardType[]) => void;
};

const DataContext = createContext<DataContextType>(null);

export type DataProviderProps = PropsWithChildren<{}>;

export const useKeycards = () => {
    const { keycards, setKeycards } = useContext(DataContext);

    const addKeycard = (keycard: KeycardType) => {
        setKeycards([keycard, ...keycards]);
    };

    return {
        keycards,
        addKeycard,
    };
};
 
const DataProvider = (props: DataProviderProps) => {
    const [keycards, setKeycards] = useState<KeycardType[]>();
    const [error, setError] = useState<WrapperError>();

    const load = async () => {
        const [data, error] = await Safe.getAll(false);

        if(error) setError(error);
        else setKeycards(data);
    };
    
    if(error) {
        return (
            <ErrorScreen error={error} />
        )
    }

    if(!keycards) {
        return (
            <AppLoading
                startAsync={load}
                // We are handling it inside the load method
                onError={() => {}}
                onFinish={() => {}}
            />
        );
    }

    return (
        <DataContext.Provider value={{ keycards, setKeycards }}>
            {props.children}
        </DataContext.Provider>
    );
};

export default DataProvider;