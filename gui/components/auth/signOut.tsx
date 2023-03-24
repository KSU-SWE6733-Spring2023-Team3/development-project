import {useAuth} from "../../context/auth";
import {Text, View} from "react-native";


export default function SignOut() {

    const { signOut } = useAuth();

    const handleSignOut = () => {
        signOut();
    };


    return (
        <View>
            <Text onPress={handleSignOut}> Sign Out </Text>
        </View>
    )

}