import {useAuth} from "../../context/auth";
import {Text, View} from "react-native";
import {getRequest} from "../../util/ajax";


export default function SignOut() {

    const { signOut } = useAuth();

    const handleSignOut = () => {


        getRequest('api/logout').then( response => {
                console.log(response);
                signOut();
            }
        );
    };


    return (
        <View>
            <Text onPress={handleSignOut}> Sign Out </Text>
        </View>
    )

}