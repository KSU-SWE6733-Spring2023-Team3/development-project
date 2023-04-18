import {Stack} from 'expo-router';
import * as React from "react";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="login" options={{headerShown: true, presentation: "modal"}} />
            <Stack.Screen name="register" options={{headerShown: true, presentation: "modal"}} />

        </Stack>
    );
}