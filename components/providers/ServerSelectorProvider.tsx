import ServerSelector from "@lib/ServerSelector";
import React, { Dispatch, SetStateAction } from "react";
import { useContext } from "react";
import { PropsWithChildren } from "react";
import { useState } from "react";
import { createContext } from "react";

export type ServerSelectorProviderProps = PropsWithChildren<{}>;

type ServerSelectorContextType = {
    server: string;
    setServer: (server: string) => void;
};
const ServerSelectorContext = createContext<ServerSelectorContextType>(null);

export const useServer = () => useContext(ServerSelectorContext);

const ServerSelectorProvider = (props: ServerSelectorProviderProps) => {
    const [server, update] = useState(ServerSelector.defaultServer);
    
    const setServer = async (server: string) => {
        update(server);
        ServerSelector.set(server);
    };

    return (
        <ServerSelectorContext.Provider value={{ server, setServer }}>
            {props.children}
        </ServerSelectorContext.Provider>
    );
};

export default ServerSelectorProvider;