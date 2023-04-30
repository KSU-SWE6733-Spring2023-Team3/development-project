import * as React from "react";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {getRequest} from "../../../util/ajax";
import {useAuth} from "../../../context/auth";


type oauthButtonProps = {
  provider: string,
  imagePath: string
};

const OauthButton = (props: oauthButtonProps) =>  {

    console.log(props);

    const {signIn} = useAuth();

   const handleOauthRequest = () => {
     getRequest('api/login/' + props.provider).then( (response) => {
         if (response.hasOwnProperty('success')) {
            signIn(true);
         }
     });
   };

    return (
        <React.Fragment>
            <TouchableOpacity onPress={handleOauthRequest}>
                <Image source={props.imagePath} style={styles.itemImage} />
            </TouchableOpacity>
        </React.Fragment>
    )
};


const styles = StyleSheet.create({
    itemImage: {
        width: 25,
        height: 25,
        borderRadius: 10,
    },
});

export default OauthButton;