import { useEffect } from 'react';
import firebase from '../../../firebase';

export default function Logout({ navigation }) {

    useEffect(() => {
        navigation.replace("MainScreen");
        firebase.logout();
    }, []);

    return null;
}