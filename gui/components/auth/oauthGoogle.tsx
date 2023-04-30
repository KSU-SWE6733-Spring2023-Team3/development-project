import * as React from "react";
import OauthButton from "./forms/oauthButton";

export default function OauthGoogle() {

    const localImagePath = "../../assets/images/google/btn_google_light_normal_ios.svg";
    const provider = "google";
    const disabled = true;


    return (
        <React.Fragment>
            <OauthButton provider={provider} imagePath={localImagePath} disabled={disabled}/>
        </React.Fragment>
    )
}


