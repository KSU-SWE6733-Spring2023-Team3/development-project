import * as React from "react";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {getRequest} from "../../util/ajax";
import OauthButton from "./forms/oauthButton";

export default function OauthGithub() {

    const localImagePath = "../../assets/images/github/github-mark.svg";
    const provider = "github";


    return (
        <React.Fragment>
            <OauthButton provider={provider} imagePath={localImagePath}/>
        </React.Fragment>
    )
}


