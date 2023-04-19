import * as React from "react";
import {useRouter, useSegments} from 'expo-router';


const AppContext = React.createContext(null);

export function useAuth() {
    return React.useContext(AppContext);
}

function useProtectedRoute(user) {
    const segments = useSegments();
    const router = useRouter();

    React.useEffect(() => {
        const inAuthGroup = segments[0] === "(auth)";


        if (!user && !inAuthGroup) {
            router.replace('/home');
        } else if (user && inAuthGroup) {
            if(segments[1] == 'register') {
                router.replace("/additionalinfo");
            } else {
                router.replace('/');
            }
        }
    }, [user, segments]);
}

export function Provider(props: any){


    const [user, setAuth] = React.useState(null);

    useProtectedRoute(user);

    return (
        <AppContext.Provider value={{
            signIn: () => setAuth({}),
            signOut: () => setAuth(null),
            user,
    }}>
    {props.children}
    </AppContext.Provider>
);
}