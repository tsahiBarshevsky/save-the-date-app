//import * as firebase from "firebase";
import app from 'firebase/app';
import 'firebase/auth';

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
    }

    getCurrentUsername() {
        return this.auth.currentUser && this.auth.currentUser.displayName;
    }

    getCurrentEmail() {
        return this.auth.currentUser.email;
    }

    async register(name, email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password);
        return this.auth.currentUser.updateProfile({
            displayName: name
        });
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        return this.auth.signOut();
    }

    async changeUsername(newUsername) {
        this.auth.currentUser.updateProfile({
            displayName: newUsername
        });
    }

    async changePassword(newPassword) {
        this.auth.currentUser.updatePassword(newPassword);
    }
}

export default new Firebase();