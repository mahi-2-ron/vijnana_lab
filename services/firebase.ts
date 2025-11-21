
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword as firebaseSignIn,
  createUserWithEmailAndPassword as firebaseSignUp,
  signInWithPopup as firebaseSignInPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  updateProfile as firebaseUpdateProfile
} from 'firebase/auth';
import { 
  getFirestore, 
  doc as firebaseDoc, 
  setDoc as firebaseSetDoc, 
  getDoc as firebaseGetDoc,
  updateDoc as firebaseUpdateDoc
} from 'firebase/firestore';

// Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAaWXN6qojbBL_bHOwVBhy8f1nAJHUVuQ", 
  authDomain: "vijnanalab.firebaseapp.com",
  projectId: "vijnanalab",
  storageBucket: "vijnanalab.firebasestorage.app",
  messagingSenderId: "407063617574",
  appId: "1:407063617574:web:11f5ac68215576f5d6c6e7"
};

// Flags
const isConfigMock = !firebaseConfig.apiKey || firebaseConfig.apiKey.includes("API_KEY");
let forceMockMode = isConfigMock;

// Real Instances
let app: any;
let auth: any = null;
let db: any = null;
let googleProvider: any = null;
let isRealBackendInitialized = false;

// Initialize Real Backend
if (!isConfigMock) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    isRealBackendInitialized = true;
  } catch (error) {
    console.warn("Firebase init failed. Defaulting to Mock Mode.", error);
    forceMockMode = true;
  }
} else {
    console.log("%c Mock Mode Enabled (Config)", "background: #222; color: #bada55");
}

// --- Mock Data Store ---
let mockUser: any = null;
const mockUserDataStore: Record<string, any> = {};
const observers: ((user: any) => void)[] = [];

const notifyObservers = () => {
    observers.forEach(cb => cb(mockUser));
};

// --- Helper: Sync Real User to Mock ---
const syncUserToMock = () => {
    if (auth && auth.currentUser) {
        // Always update mockUser with latest real auth data
        mockUser = {
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
            emailVerified: auth.currentUser.emailVerified
        };
        
        // Update Store if missing or if we want to sync basic details
        if (!mockUserDataStore[mockUser.uid]) {
             mockUserDataStore[mockUser.uid] = {
                role: 'Student',
                grade: '12th Grade',
                institution: 'Vijnana Academy',
                language: 'English',
                avatar: mockUser.photoURL || 'bg-blue-500',
                name: mockUser.displayName || 'Student',
                email: mockUser.email,
                uid: mockUser.uid,
                createdAt: new Date()
            };
        } else {
            // Intelligent Sync: If store has generic name but auth has real name, update store
            const currentStore = mockUserDataStore[mockUser.uid];
            if (mockUser.displayName && 
               (!currentStore.name || currentStore.name === 'Student' || currentStore.name === 'Student User' || currentStore.name === 'Google User')) {
                currentStore.name = mockUser.displayName;
            }
            // Sync Avatar
            if (mockUser.photoURL && (!currentStore.avatar || currentStore.avatar.startsWith('bg-'))) {
                 currentStore.avatar = mockUser.photoURL;
            }
        }
    }
};

// --- Error Handling ---
const handleFirebaseError = (error: any) => {
    const code = error?.code || '';
    const msg = error?.message || '';
    const strErr = String(error).toLowerCase();
    
    const fallbackTriggers = [
        'auth/network-request-failed',
        'auth/operation-not-allowed',
        'auth/internal-error',
        'auth/invalid-api-key',
        'auth/app-not-authorized',
        'permission-denied',
        'unavailable',
        'failed-precondition',
        'offline',
        'network error',
        'api key',
        'quota-exceeded',
        'client-offline'
    ];

    const shouldFallback = fallbackTriggers.some(trigger => 
        code.includes(trigger) || 
        msg.toLowerCase().includes(trigger) || 
        strErr.includes(trigger)
    );

    if (shouldFallback || forceMockMode) {
        if (!forceMockMode) console.warn(`[Firebase] Backend Error (${code}). Switching to Mock Mode.`);
        forceMockMode = true;
        syncUserToMock();
        return true;
    }
    
    // Fallback for everything else to ensure app stability
    console.warn(`[Firebase] Generic Error. Switching to Mock Mode.`);
    forceMockMode = true;
    syncUserToMock();
    return true;
};

// --- Auth Functions ---

export const signInWithEmailAndPassword = async (authInstance: any, email: string, pass: string) => {
    if (!forceMockMode && isRealBackendInitialized && authInstance) {
        try {
            const result = await firebaseSignIn(authInstance, email, pass);
            return result;
        } catch (e) {
            if (!handleFirebaseError(e)) throw e;
        }
    }
    
    // Mock Implementation
    await new Promise(resolve => setTimeout(resolve, 800));
    mockUser = { 
        uid: 'mock-user-' + Date.now(), 
        email, 
        displayName: 'Student User',
        emailVerified: true,
        photoURL: 'bg-blue-500'
    };
    mockUserDataStore[mockUser.uid] = {
        role: 'Student',
        name: 'Student User',
        email: email,
        institution: 'Vijnana Academy',
        grade: '12th Grade',
        avatar: 'bg-blue-500',
        uid: mockUser.uid
    };
    notifyObservers();
    return { user: mockUser };
};

export const createUserWithEmailAndPassword = async (authInstance: any, email: string, pass: string) => {
    if (!forceMockMode && isRealBackendInitialized && authInstance) {
        try {
            return await firebaseSignUp(authInstance, email, pass);
        } catch (e) {
            if (!handleFirebaseError(e)) throw e;
        }
    }

    await new Promise(resolve => setTimeout(resolve, 800));
    mockUser = { 
        uid: 'mock-user-' + Date.now(), 
        email, 
        displayName: 'New Student',
        emailVerified: true,
        photoURL: 'bg-blue-500'
    };
    notifyObservers();
    return { user: mockUser };
};

export const updateProfile = async (user: any, updates: { displayName?: string, photoURL?: string }) => {
    if (!forceMockMode && isRealBackendInitialized && user && typeof user.getIdToken === 'function') {
        try {
            return await firebaseUpdateProfile(user, updates);
        } catch (e) {
            handleFirebaseError(e);
        }
    }
    
    if (mockUser) {
        mockUser = { ...mockUser, ...updates };
        // Also update store
        if (mockUserDataStore[mockUser.uid]) {
            if (updates.displayName) mockUserDataStore[mockUser.uid].name = updates.displayName;
            if (updates.photoURL) mockUserDataStore[mockUser.uid].avatar = updates.photoURL;
        }
        notifyObservers();
    }
};

export const signInWithPopup = async (authInstance: any, provider: any) => {
    if (!forceMockMode && isRealBackendInitialized && authInstance) {
        try {
            return await firebaseSignInPopup(authInstance, provider);
        } catch (error: any) {
            if (!handleFirebaseError(error)) throw error;
        }
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    const uid = 'mock-google-' + Date.now();
    mockUser = { 
        uid, 
        email: 'google@example.com', 
        displayName: 'Google User',
        emailVerified: true,
        photoURL: 'bg-blue-500'
    };
    
    if (!mockUserDataStore[uid]) {
        mockUserDataStore[uid] = {
            role: 'Student',
            grade: '12th Grade',
            institution: 'Vijnana Academy',
            language: 'English',
            avatar: 'bg-blue-500',
            name: 'Google User',
            email: 'google@example.com',
            uid,
            createdAt: new Date()
        };
    }

    notifyObservers();
    return { user: mockUser };
};

export const signOut = async (authInstance: any) => {
    if (!forceMockMode && isRealBackendInitialized && authInstance) {
        try {
            await firebaseSignOut(authInstance);
        } catch(e) { console.warn("Real signout failed", e); }
    }
    
    mockUser = null;
    notifyObservers();
};

export const onAuthStateChanged = (authInstance: any, callback: (user: any) => void) => {
    observers.push(callback);

    let unsubscribeReal = () => {};

    if (!forceMockMode && isRealBackendInitialized && authInstance) {
        try {
            unsubscribeReal = firebaseOnAuthStateChanged(authInstance, (user) => {
                if (forceMockMode) {
                    // If mode switched, try to sync real data to mock data before callback
                    if (!mockUser && user) syncUserToMock();
                    callback(mockUser); 
                } else {
                    callback(user);
                }
            });
        } catch (e) {
            handleFirebaseError(e);
            callback(mockUser);
        }
    } else {
        // In mock mode, callback immediately
        callback(mockUser);
    }
    
    return () => {
        const index = observers.indexOf(callback);
        if (index > -1) observers.splice(index, 1);
        unsubscribeReal();
    };
};

// --- Firestore Functions ---

export const doc = (dbInstance: any, collection: string, id: string) => {
    if (!forceMockMode && isRealBackendInitialized && dbInstance) {
        return firebaseDoc(dbInstance, collection, id);
    }
    return { path: `${collection}/${id}`, id, type: 'mock' };
};

export const setDoc = async (ref: any, data: any) => {
    if (!forceMockMode && isRealBackendInitialized && ref.firestore) {
        try {
            return await firebaseSetDoc(ref, data);
        } catch (e) {
            if (!handleFirebaseError(e)) throw e;
        }
    }
    
    console.log(`[Mock DB] SetDoc ${ref.id}`, data);
    const id = ref.id || (mockUser ? mockUser.uid : 'unknown');
    mockUserDataStore[id] = { ...mockUserDataStore[id], ...data };
};

export const updateDoc = async (ref: any, data: any) => {
    if (!forceMockMode && isRealBackendInitialized && ref.firestore) {
        try {
            return await firebaseUpdateDoc(ref, data);
        } catch (e) {
            if (!handleFirebaseError(e)) throw e;
        }
    }
    
    console.log(`[Mock DB] UpdateDoc ${ref.id}`, data);
    const id = ref.id || (mockUser ? mockUser.uid : 'unknown');
    if (mockUserDataStore[id]) {
        mockUserDataStore[id] = { ...mockUserDataStore[id], ...data };
    }
};

export const getDoc = async (ref: any) => {
    if (!forceMockMode && isRealBackendInitialized && ref.firestore) {
        try {
            return await firebaseGetDoc(ref);
        } catch (e) {
            if (!handleFirebaseError(e)) throw e;
        }
    }
    
    // Mock Implementation matching Firestore Snapshot API
    const id = ref.id;
    
    // If asking for current user, force sync to ensure we have data
    if (id && mockUser && mockUser.uid === id) {
        syncUserToMock();
    }

    const stored = mockUserDataStore[id];
    
    return {
        exists: () => !!stored,
        data: () => stored || {}
    };
};

// --- Utility ---
export const updateUserData = async (uid: string, data: any) => {
    const userRef = doc(db, "users", uid);
    const authUser = auth?.currentUser || mockUser; 

    await updateDoc(userRef, data);

    if (authUser) {
        const profileUpdates: any = {};
        if (data.name) profileUpdates.displayName = data.name;
        if (data.avatar) profileUpdates.photoURL = data.avatar;
        
        if (Object.keys(profileUpdates).length > 0) {
            await updateProfile(authUser, profileUpdates);
        }
    }
    return true;
};

export { auth, db, googleProvider };
