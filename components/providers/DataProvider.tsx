import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";
import ErrorScreen from "@components/screens/ErrorScreen";
import Safe, { KeycardType, SafeType } from "@lib/api/Safe";
import WrapperError from "@wault/error";
import AppLoading from "expo-app-loading";
import { ItemType } from "@lib/api/Item";

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

    const addItem = (safe: SafeType, item: ItemType) => {
        const newKeycards = [...keycards];
        
        for(const keycard of newKeycards) {
            if(keycard.safe.id === safe.id) {
                keycard.safe.items.unshift(item);
            }
        }

        setKeycards(newKeycards);
    };

    const refresh = async () => {
        const keycards = await Safe.getAll(true);
        setKeycards(keycards);
    };

    return {
        keycards,
        addKeycard,
        refresh,
        addItem,
    };
};
 
const DataProvider = (props: DataProviderProps) => {
    const [keycards, setKeycards] = useState<KeycardType[]>();
    const [error, setError] = useState<WrapperError>();

    const load = async () => {
        try {
            setKeycards(await Safe.getAll(false));
        } catch(e) {
            setError(e);
        }
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