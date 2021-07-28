import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';

const screens ={
    Home:{
        screen:HomePage,
    },
    Login:{
        screen:LoginPage
    }
}
const screenStack = createStackNavigator();
export default NavigationContainer(screenStack);