import 'react-native-gesture-handler';
import React ,{useContext}from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator, Text} from 'react-native'
import { AppRegistry } from "react-native";
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import HomeNavigator from './HomeNavigator';
import {GlobalContext} from '../context/Provider'
import { useEffect } from 'react/cjs/react.development';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppNavContainer = () => {
  const {
    authState: {isLoggedIn},
  } = useContext(GlobalContext);

  const [isAuthenticated, setIsAuthenticated] = React.useState(isLoggedIn);
  const [authLoaded, setAuthLoaded] = React.useState(false);

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      console.log(`user data`,user )
      if (user) {
        setAuthLoaded(true);

        setIsAuthenticated(true);
      } else {
        setAuthLoaded(true);

        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log('not found')
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  console.log(`is`, authLoaded)

  return (
    
      
    <>
    {authLoaded ? (
      <NavigationContainer >
        {isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    ) : (
      <ActivityIndicator />
    )}
  </>
      
  );
};

export default AppNavContainer;