import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "../pages/main/index";
import Goals from "../pages/goals/index";
import Trophy from "../components/Trophy";
import Welcome from "../pages/welcome";
import SignIn from "../pages/login/signIn";
import SignUp from "../pages/login/signUp";
import ResetPassword from "../pages/login/resetPassword";
import Motivational from "../pages/motivational";

const Stack = createNativeStackNavigator();

export default function AllPages() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="SigIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                <Stack.Screen name="index" component={Index} />
                <Stack.Screen name="goals" component={Goals} />
                <Stack.Screen name="trophy" component={Trophy} />
                <Stack.Screen name="motivational" component={Motivational} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
