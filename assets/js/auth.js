/* ============================================
   LUNA WHALE ART LAB — Firebase Auth Module
   ============================================
   Firebase Authentication + Firestore User Profile
   ============================================ */

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAWABXijGTwNaNOPV6gDE6eZ_I2BcWh1oU",
    authDomain: "luna-whale.firebaseapp.com",
    projectId: "luna-whale",
    storageBucket: "luna-whale.firebasestorage.app",
    messagingSenderId: "517428711182",
    appId: "1:517428711182:web:996df2737d4a7c5a29915f",
    measurementId: "G-7L4VMSXNPZ"
};

if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
}

const _auth = firebase.auth();
const _db = firebase.firestore();
const _googleProvider = new firebase.auth.GoogleAuthProvider();
_googleProvider.setCustomParameters({ prompt: 'select_account' });

const ERROR_MESSAGES = {
    'auth/email-already-in-use': '이미 가입된 이메일 주소입니다.',
    'auth/invalid-email': '올바른 이메일 형식을 입력해 주세요.',
    'auth/operation-not-allowed': '이 로그인 방식은 현재 사용할 수 없습니다.',
    'auth/weak-password': '비밀번호는 최소 6자 이상이어야 합니다.',
    'auth/user-disabled': '이 계정은 비활성화되었습니다. 관리자에게 문의해 주세요.',
    'auth/user-not-found': '등록되지 않은 이메일입니다.',
    'auth/wrong-password': '비밀번호가 올바르지 않습니다.',
    'auth/invalid-credential': '이메일 또는 비밀번호가 올바르지 않습니다.',
    'auth/too-many-requests': '로그인 시도가 너무 많습니다. 잠시 후 다시 시도해 주세요.',
    'auth/network-request-failed': '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.',
    'auth/popup-closed-by-user': '로그인 창이 닫혔습니다. 다시 시도해 주세요.',
    'auth/cancelled-popup-request': '이전 로그인 요청이 취소되었습니다.',
    'auth/popup-blocked': '팝업이 차단되었습니다. 브라우저 설정에서 팝업을 허용해 주세요.',
    'auth/requires-recent-login': '보안을 위해 다시 로그인해 주세요.',
};

window.LunaAuth = {
    getErrorMessage(errorCode) {
        return ERROR_MESSAGES[errorCode] || '오류가 발생했습니다. 다시 시도해 주세요.';
    },

    _toast(msg, duration) {
        if (window.LunaApp && LunaApp.toast) {
            LunaApp.toast(msg, duration || 4000);
        } else {
            alert(msg);
        }
    },

    _showError(error) {
        console.error('LunaAuth Error:', error.code, error.message);
        this._toast('⚠️ ' + this.getErrorMessage(error.code));
    },

    async _saveUserProfile(user, extraData = {}) {
        const userRef = _db.collection('users').doc(user.uid);
        const doc = await userRef.get();

        if (!doc.exists) {
            const profile = {
                email: user.email || '',
                displayName: extraData.displayName || user.displayName || '',
                role: user.email === 'skyclover777@gmail.com' ? 'admin' : (extraData.role || 'parent'),
                photoURL: user.photoURL || '',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastLoginAt: firebase.firestore.FieldValue.serverTimestamp(),
            };
            await userRef.set(profile);
            return profile;
        } else {
            const data = doc.data();
            const isAdminEmail = user.email === 'skyclover777@gmail.com';
            const needsAdminUpgrade = isAdminEmail && data.role !== 'admin';

            const updatePayload = {
                lastLoginAt: firebase.firestore.FieldValue.serverTimestamp(),
                ...(user.photoURL ? { photoURL: user.photoURL } : {}),
                ...(needsAdminUpgrade ? { role: 'admin' } : {})
            };

            await userRef.update(updatePayload);
            return { ...data, ...updatePayload };
        }
    },

    _syncToLocalStorage(firebaseUser, firestoreProfile) {
        if (!firebaseUser) {
            localStorage.removeItem('lw_user');
            localStorage.removeItem('lw_role');
            return;
        }

        const isMasterAdmin = firebaseUser.email === 'skyclover777@gmail.com';
        const finalRole = isMasterAdmin ? 'admin' : (firestoreProfile?.role || 'parent');

        const lwUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firestoreProfile?.displayName || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            displayName: firestoreProfile?.displayName || firebaseUser.displayName || '',
            role: finalRole,
            photoURL: firebaseUser.photoURL || firestoreProfile?.photoURL || '',
            isFirebaseUser: true,
            purchasedClasses: firestoreProfile?.purchasedClasses || [],
        };
        localStorage.setItem('lw_user', JSON.stringify(lwUser));
        localStorage.setItem('lw_role', finalRole);
    },

    async getUserProfile(uid) {
        try {
            const doc = await _db.collection('users').doc(uid).get();
            return doc.exists ? doc.data() : null;
        } catch (err) {
            console.error('getUserProfile error:', err);
            return null;
        }
    },

    async signUpWithEmail(email, password, displayName, role) {
        try {
            const cred = await _auth.createUserWithEmailAndPassword(email, password);
            const user = cred.user;
            await user.updateProfile({ displayName: displayName });
            const profile = await this._saveUserProfile(user, { displayName, role });
            this._syncToLocalStorage(user, profile);
            this._toast('🎉 회원가입이 완료되었습니다! 환영합니다!');
            return { success: true, user, profile };
        } catch (error) {
            this._showError(error);
            return { success: false, error };
        }
    },

    async loginWithEmail(email, password) {
        try {
            const cred = await _auth.signInWithEmailAndPassword(email, password);
            const user = cred.user;
            const profile = await this._saveUserProfile(user);
            this._syncToLocalStorage(user, profile);
            this._toast('✅ 로그인 성공! 환영합니다, ' + (profile.displayName || user.email));
            return { success: true, user, profile };
        } catch (error) {
            this._showError(error);
            return { success: false, error };
        }
    },

    async loginWithGoogle(role) {
        try {
            const result = await _auth.signInWithPopup(_googleProvider);
            const user = result.user;
            const profile = await this._saveUserProfile(user, {
                displayName: user.displayName,
                role: role || 'parent'
            });
            this._syncToLocalStorage(user, profile);
            this._toast('✅ Google 로그인 성공! 환영합니다, ' + (profile.displayName || user.displayName));
            return { success: true, user, profile };
        } catch (error) {
            this._showError(error);
            return { success: false, error };
        }
    },

    async logout() {
        try {
            await _auth.signOut();
            localStorage.removeItem('lw_user');
            localStorage.removeItem('lw_role');
            this._toast('👋 로그아웃되었습니다.');
            return { success: true };
        } catch (error) {
            this._showError(error);
            return { success: false, error };
        }
    },

    onAuthChange(callback) {
        return _auth.onAuthStateChanged(async (user) => {
            if (user) {
                const currentLocalRole = localStorage.getItem('lw_role');
                this._syncToLocalStorage(user, { role: currentLocalRole || 'parent' });
                try {
                    const profile = await this.getUserProfile(user.uid);
                    this._syncToLocalStorage(user, profile);
                    if (callback) callback(user, profile);
                } catch (e) {
                    const isMasterAdmin = user.email === 'skyclover777@gmail.com';
                    const fallbackProfile = { role: isMasterAdmin ? 'admin' : 'parent' };
                    this._syncToLocalStorage(user, fallbackProfile);
                    if (callback) callback(user, fallbackProfile);
                }
            } else {
                localStorage.removeItem('lw_user');
                localStorage.removeItem('lw_role');
                if (callback) callback(null, null);
            }
        });
    },

    get currentUser() {
        return _auth.currentUser;
    },

    async sendPasswordReset(email) {
        try {
            await _auth.sendPasswordResetEmail(email);
            this._toast('📧 비밀번호 재설정 이메일을 보냈습니다. 메일함을 확인해 주세요.');
            return { success: true };
        } catch (error) {
            this._showError(error);
            return { success: false, error };
        }
    },

    updateGNB(user, profile) {
        // UI Syncing Logic
        const sidebarName = document.querySelector('.app-sidebar .text-xs.font-bold');
        const sidebarRole = document.querySelector('.app-sidebar .text-\\[10px\\].text-slate-500');
        const headerProfileIcon = document.querySelector('header a[href="profile.html"]');

        if (user && profile) {
            const name = profile.displayName || user.displayName || user.email.split('@')[0];
            const roleTxt = profile.role === 'admin' ? '🛡️ 관리자' :
                profile.role === 'teacher' ? '✏️ 강사' :
                    profile.role === 'student' ? '🎨 학생' : '👨‍👩‍👧 학부모';

            if (sidebarName) sidebarName.textContent = name;
            if (sidebarRole) sidebarRole.textContent = roleTxt;

            // Update sidebar avatar
            const avatarContainer = document.querySelector('.app-sidebar .w-9.h-9');
            if (avatarContainer) {
                const initials = name.charAt(0).toUpperCase();
                avatarContainer.innerHTML = user.photoURL ?
                    `<img src="${user.photoURL}" class="w-full h-full rounded-full object-cover">` :
                    `<span class="material-symbols-outlined text-white text-sm">person</span>`;
            }

            // GNB Admin visibility
            const adminNav = document.getElementById('admin-nav-item');
            if (adminNav) adminNav.style.display = profile.role === 'admin' ? 'flex' : 'none';
        } else {
            if (sidebarName) sidebarName.textContent = 'Guest';
            if (sidebarRole) sidebarRole.textContent = 'Please Login';
        }
    },

    init() {
        this.onAuthChange((user, profile) => {
            this.updateGNB(user, profile);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (!window.location.pathname.includes('login.html')) {
        LunaAuth.init();
    }
});
