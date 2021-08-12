import { DeviceType } from "@wault/typings";
import React from "react";
import { List, useTheme } from "react-native-paper";

export type DeviceItemProps = {
    device: DeviceType;
};

const DeviceItem = (props: DeviceItemProps) => {
    const theme = useTheme();
    const date = new Date(props.device.loggedInAt);

    return (
        <List.Accordion
            style={{ backgroundColor: theme.colors.surface }}
            title={props.device.name}
            description={`Logged in at ${new Date(props.device.loggedInAt).toLocaleDateString()}`}
            left={p => <List.Icon {...p} icon={props.device.type === "BROWSER" ? "web" : props.device.type === "MOBILE" ? "cellphone" : "laptop"} />}>
            <List.Item
                title={"Device name"}
                description={props.device.name}    
            />
            <List.Item
                title={"Device type"}
                description={props.device.type}    
            />
            <List.Item
                title={"Logged in at"}
                description={date.toLocaleString()}
            />
        </List.Accordion>

    );
};

export default DeviceItem;