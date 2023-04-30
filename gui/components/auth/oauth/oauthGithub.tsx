import * as React from "react";
import OauthButton from "./oauthButton";

export default function OauthGithub() {

    const localImagePath = "../../../assets/images/github/github-mark.svg";
    const provider = "github";
    const disabled = true;


    return (
        <React.Fragment>
            <OauthButton provider={provider} imagePath={localImagePath} disabled={disabled}/>
        </React.Fragment>
    )
}


