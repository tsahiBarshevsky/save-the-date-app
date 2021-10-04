import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers';
import HomeScreen from './src/components/HomeScreen/HomeScreen';
import { createStore } from 'redux';

const store = createStore(rootReducer);

export default function App() {
    return (
        <Provider store={store}>
            <HomeScreen />
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
