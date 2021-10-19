import * as firebase from "firebase";
import app from 'firebase/app';
import 'firebase/auth';
import Toast from 'react-native-toast-message';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// // Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//     app = firebase.initializeApp(firebaseConfig);
// }
// else {
//     app = firebase.app();
// }

// const auth = firebase.auth();

// export { auth };

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.storage = app.storage();
    }

    getCurrentUsername() {
        return this.auth.currentUser && this.auth.currentUser.displayName;
    }

    getCurrentEmail() {
        return this.auth.currentUser.email;
    }

    getRegisterDate() {
        return this.auth.currentUser.metadata.creationTime;
    }

    async register(name, email, password) {
        return this.auth.createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                user.updateProfile({ displayName: name });
            })
            .catch(error => {
                Toast.show({
                    type: 'error',
                    text1: "Error",
                    text2: error.message,
                    position: 'bottom'
                })
            });
    }

    async updatePhotoURL(URL) {
        this.auth.currentUser.updateProfile({
            photoURL: URL
        });
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        return this.auth.signOut();
    }

    async changePassword(newPassword) {
        this.auth.currentUser.updatePassword(newPassword);
    }

    async resetPassword(email) {
        this.auth.sendPasswordResetEmail(email);
    }
}

export default new Firebase();