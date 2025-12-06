import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserListScreen from './src/screens/UserListScreen';
import UserFormScreen from './src/screens/UserFormScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="UserList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#bf1d63ff',
          },
          headerTintColor: '#ffffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#acd5ffff',
          }
        }}
      >
        <Stack.Screen 
          name="UserList" 
          component={UserListScreen}
          options={{ 
            title: 'BIBLIOTECA FACULDADE SENAC',
            headerLargeTitle: true,
          }}
        />
        <Stack.Screen 
          name="UserForm" 
          component={UserFormScreen}
          options={({ route }) => ({ 
            title: route.params?.usuario ? 'Editar Usuário' : 'Novo Usuário'
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}