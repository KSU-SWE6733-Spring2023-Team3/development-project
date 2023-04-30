import * as React from "react";
import OauthGithub from "./oauthGithub";
import OauthGoogle from "./oauthGoogle";
import {View} from "react-native";

export default function OauthOptions() {

    return (
        <View style={styles.container}>
            <OauthGithub />
            <OauthGoogle />
        </View>
    )
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",

    }
};