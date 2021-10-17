import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import firebase from '../../../firebase';

export default function Logout({ navigation }) {

    const dispatch = useDispatch();

    useEffect(() => {
        navigation.replace("LoginScreen");
        firebase.logout();
        dispatch({ type: 'SET_MEDICINES', medicines: [] });
    }, []);

    return null;
}