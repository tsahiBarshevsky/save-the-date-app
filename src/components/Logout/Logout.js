import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../../../firebase';

export default function Logout({ navigation }) {

    const dispatch = useDispatch();

    useEffect(() => {
        navigation.replace("MainScreen");
        firebase.logout();
        dispatch({ type: 'SET_MEDICINES', medicines: [] });
    }, []);

    return null;
}