import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers';
import { createStore } from 'redux';
import RootNavigator from './src/components';

const store = createStore(rootReducer);

export default function App() {
    return (
        <Provider store={store}>
            <RootNavigator />
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
