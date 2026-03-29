/* ============================================
   LUNA WHALE ART LAB — Firebase Auth Module
   ============================================
   Firebase Authentication + Firestore User Profile
   ============================================ */

// ─── Firebase SDK (compat mode for simplicity) ───
// These are loaded via CDN in HTML <script> tags BEFORE this file:
//   firebase-app-compat.js
//   firebase-auth-compat.js
//   firebase-firestore-compat.js

// ─── Firebase Configuration ───
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAWABXijGTwNaNOPV6gDE6eZ_I2BcWh1oU",
    authDomain: "luna-whale.firebaseapp.com",
    projectId: "luna-whale",
    storageBucket: "luna-whale.firebasestorage.app",
    messagingSenderId: "517428711182",
    appId: "1:517428711182:web:996df2737d4a7c5a29915f",
    measurementId: "G-7L4VMSXNPZ"
};

// ─── Initialize Firebase ───
if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
}

const _auth = firebase.auth();
const _db = firebase.firestore();
const _storage = typeof firebase.storage === 'function' ? firebase.storage() : null;
const _functions = typeof firebase.functions === 'function' ? firebase.functions() : null;

// ─── Google Auth Provider ───
const _googleProvider = new firebase.auth.GoogleAuthProvider();
_googleProvider.setCustomParameters({ prompt: 'select_account' });

// ─── Error Code → Korean Message Map ───
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

// ============================================
//  LunaAuth — Public API
// ============================================
window.LunaAuth = {

    // ─── Get current user & DB references ───
    getCurrentUser() {
        return _auth.currentUser;
    },

    getUser() {
        try {
            return JSON.parse(localStorage.getItem('lw_user'));
        } catch (e) {
            return null;
        }
    },

    // ─── Ready State Management ───
    _isReady: false,
    _readyCallbacks: [],
    
    /**
     * Executes callback when Firebase & LunaAuth are fully initialized.
     * @param {Function} callback 
     */
    onReady(callback) {
        if (this._isReady) {
            callback();
        } else {
            this._readyCallbacks.push(callback);
        }
    },

    _setReady() {
        if (this._isReady) return;
        this._isReady = true;
        console.log('LunaAuth: System Ready');
        while (this._readyCallbacks.length > 0) {
            const cb = this._readyCallbacks.shift();
            try { cb(); } catch (e) { console.error('LunaAuth Ready Callback Error:', e); }
        }
    },

    getDb() {
        return _db;
    },

    getStorage() {
        return _storage;
    },

    getFunctions() {
        return _functions;
    },

    // ─── Get Korean error message ───
    getErrorMessage(errorCode) {
        return ERROR_MESSAGES[errorCode] || '오류가 발생했습니다. 다시 시도해 주세요.';
    },

    // ─── Show toast (delegates to LunaApp.toast) ───
    _toast(msg, duration) {
        if (window.LunaApp && LunaApp.toast) {
            LunaApp.toast(msg, duration || 4000);
        } else {
            alert(msg);
        }
    },

    // ─── Show error toast from Firebase error ───
    _showError(error) {
        console.error('LunaAuth Error:', error.code, error.message);
        this._toast('⚠️ ' + this.getErrorMessage(error.code));
    },

    // ─── Create/Update Firestore user profile ───
    async _saveUserProfile(user, extraData = {}) {
        const userRef = _db.collection('users').doc(user.uid);
        const doc = await userRef.get();

        if (!doc.exists) {
            // Create new profile
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

            // Update last login and potentially upgrade to admin
            const updatePayload = {
                lastLoginAt: firebase.firestore.FieldValue.serverTimestamp(),
                ...(user.photoURL ? { photoURL: user.photoURL } : {}),
                ...(needsAdminUpgrade ? { role: 'admin' } : {})
            };

            await userRef.update(updatePayload);
            return { ...data, ...updatePayload };
        }
    },

    // ─── Check access tier ───
    async _checkAccessDoc(collection, email) {
        if (!email) return false;
        try {
            const normalizedEmail = email.toLowerCase().trim();
            const doc = await _db.collection(collection).doc(normalizedEmail).get();
            if (doc.exists) {
                const data = doc.data();
                if (data.active === false) return false;
                if (data.expiresAt) {
                    const expiry = data.expiresAt.toDate ? data.expiresAt.toDate() : new Date(data.expiresAt);
                    if (expiry < new Date()) return false;
                }
                return true;
            }
            return false;
        } catch (e) { return false; }
    },

    async checkPremiumAccess(email) { return this._checkAccessDoc('premiumAccess', email); },
    async checkParentAccess(email) { return this._checkAccessDoc('parentAccess', email); },

    // ─── Sync Firebase user to localStorage (for LunaApp compat) ───
    _syncToLocalStorage(firebaseUser, firestoreProfile) {
        if (!firebaseUser) {
            localStorage.removeItem('lw_user');
            localStorage.removeItem('lw_role');
            return;
        }

        // Force admin role for the master email
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
            isPremium: firestoreProfile?.isPremium || false,
            isParentAccess: firestoreProfile?.isParentAccess || false,
            purchasedClasses: firestoreProfile?.purchasedClasses || [],
        };
        localStorage.setItem('lw_user', JSON.stringify(lwUser));
        localStorage.setItem('lw_role', finalRole);
    },

    // ─── Get Firestore user profile ───
    async getUserProfile(uid) {
        try {
            const doc = await _db.collection('users').doc(uid).get();
            return doc.exists ? doc.data() : null;
        } catch (err) {
            console.error('getUserProfile error:', err);
            return null;
        }
    },

    // ============================================
    //  Sign Up with Email/Password
    // ============================================
    async signUpWithEmail(email, password, displayName, role) {
        try {
            const cred = await _auth.createUserWithEmailAndPassword(email, password);
            const user = cred.user;

            // Update Firebase Auth display name
            await user.updateProfile({ displayName: displayName });

            // Create Firestore profile
            const profile = await this._saveUserProfile(user, { displayName, role });
            this._syncToLocalStorage(user, profile);

            this._toast('🎉 회원가입이 완료되었습니다! 환영합니다!');
            return { success: true, user, profile };
        } catch (error) {
            this._showError(error);
            return { success: false, error };
        }
    },

    // ============================================
    //  Login with Email/Password
    // ============================================
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

    // ============================================
    //  Login with Google
    // ============================================
    async loginWithGoogle(role) {
        try {
            const result = await _auth.signInWithPopup(_googleProvider);
            const user = result.user;

            // Check if first-time → create profile with role; otherwise just update
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

    // ============================================
    //  Update User Profile
    // ============================================
    async updateProfile(uid, data) {
        try {
            await _db.collection('users').doc(uid).update(data);

            // Also update local storage if it's the current user
            const user = _auth.currentUser;
            if (user && user.uid === uid) {
                const profile = await this.getUserProfile(uid);
                this._syncToLocalStorage(user, profile);
            }

            return { success: true };
        } catch (error) {
            this._showError(error);
            return { success: false, error };
        }
    },

    // ============================================
    //  Logout
    // ============================================
    async logout() {
        try {
            await _auth.signOut();
            localStorage.removeItem('lw_user');
            this._toast('👋 로그아웃되었습니다.');
            return { success: true };
        } catch (error) {
            this._showError(error);
            return { success: false, error };
        }
    },

    // ============================================
    //  Auth State Change Listener
    // ============================================
    onAuthChange(callback) {
        console.log('LunaAuth: Registering onAuthChange');
        return _auth.onAuthStateChanged(async (user) => {
            console.log('LunaAuth: onAuthStateChanged trigger:', user ? user.email : 'null');
            if (user) {
                const currentLocalRole = localStorage.getItem('lw_role');
                console.log('LunaAuth: Current local role:', currentLocalRole);

                // Pre-sync basic info so index.html can show the UI immediately
                this._syncToLocalStorage(user, { role: currentLocalRole || 'parent' });

                try {
                    const profile = await this.getUserProfile(user.uid);
                    console.log('LunaAuth: Fetched profile from Firestore:', profile);

                    // Force admin role check
                    const isMasterAdmin = user.email === 'skyclover777@gmail.com';
                    if (isMasterAdmin) {
                        console.log('LunaAuth: Master Admin detected, forcing admin role');
                        if (!profile || profile.role !== 'admin') {
                            if (profile) profile.role = 'admin';
                        }
                    }

                    // Check access tiers
                    const isPremium = isMasterAdmin || await this.checkPremiumAccess(user.email);
                    const isParentAccess = !isPremium && await this.checkParentAccess(user.email);
                    if (profile) {
                        profile.isPremium = isPremium;
                        profile.isParentAccess = isParentAccess;
                    }
                    console.log('LunaAuth: Premium:', isPremium, 'ParentAccess:', isParentAccess);

                    this._syncToLocalStorage(user, profile);
                    console.log('LunaAuth: Sync complete. Calling callback with role:', profile?.role);
                    this._setReady(); // Signal ready
                    if (callback) callback(user, profile);
                } catch (e) {
                    console.warn('LunaAuth: Profile fetch failed, using basic info:', e);
                    const isMasterAdmin = user.email === 'skyclover777@gmail.com';
                    const fallbackProfile = { role: isMasterAdmin ? 'admin' : 'parent' };
                    this._syncToLocalStorage(user, fallbackProfile);
                    this._setReady(); // Signal ready even on failure
                    if (callback) callback(user, fallbackProfile);
                }
            } else {
                console.log('LunaAuth: No user session found.');
                localStorage.removeItem('lw_user');
                localStorage.removeItem('lw_role');
                this._setReady(); // Signal ready
                if (callback) callback(null, null);
            }
        });
    },

    // ============================================
    //  Get current Firebase user (sync)
    // ============================================
    get currentUser() {
        return _auth.currentUser;
    },

    // ============================================
    //  Password Reset
    // ============================================
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

    // ============================================
    //  Update GNB (Global Navigation Bar)
    // ============================================
    updateGNB(user, profile) {
        // === Header profile area (top-right) ===
        const headerProfileLinks = document.querySelectorAll('a[href*="profile.html"]');
        const headerRight = document.querySelector('header .flex.items-center.gap-1\\.5');

        if (!headerRight) return;

        // Find or create user info element in header
        let userInfoEl = document.getElementById('gnb-user-info');

        if (user && profile) {
            // User is logged in
            if (!userInfoEl) {
                userInfoEl = document.createElement('div');
                userInfoEl.id = 'gnb-user-info';
                userInfoEl.className = 'relative';
                headerRight.appendChild(userInfoEl);
            }

            const displayName = profile.displayName || user.displayName || user.email?.split('@')[0] || 'User';
            const initials = displayName.charAt(0).toUpperCase();
            const isMasterAdmin = (user && user.email === 'skyclover777@gmail.com');
            const isAdmin = isMasterAdmin || (profile && profile.role === 'admin');
            const isTeacher = profile.role === 'teacher';

            userInfoEl.innerHTML = `
                <button onclick="LunaAuth._toggleProfileMenu()" class="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-slate-100 transition-colors">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br ${isTeacher ? 'from-emerald-500 to-teal-600' : 'from-primary to-accent-purple'} flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        ${user.photoURL ? `<img src="${user.photoURL}" class="w-full h-full rounded-full object-cover" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><span class="hidden items-center justify-center">${initials}</span>` : initials}
                    </div>
                    <span class="hidden sm:block text-xs font-bold text-slate-700 max-w-[80px] truncate">${displayName}</span>
                    <span class="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
                </button>
                <div id="gnb-profile-menu" class="absolute right-0 top-12 bg-white border border-slate-200 rounded-2xl shadow-2xl w-56 py-2 z-[9999]" style="display:none">
                    <div class="px-4 py-3 border-b border-slate-100">
                        <p class="text-sm font-bold text-slate-800 truncate">${displayName}</p>
                        <p class="text-xs text-slate-500 truncate">${user.email || ''}</p>
                        <span class="inline-block mt-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${isTeacher || isAdmin ? 'bg-emerald-100 text-emerald-700' : profile.role === 'student' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}">
                            ${isAdmin ? '🛡️ 관리자' : isTeacher ? '✏️ 미술 강사' : profile.role === 'student' ? '🎨 학생' : '👨‍👩‍👧 학부모'}
                        </span>
                    </div>
                    <div class="py-1">
                        <a href="${this._getRelativePath('pages/main/profile.html')}" class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                            <span class="material-symbols-outlined text-lg text-slate-400">account_circle</span>
                            마이페이지
                        </a>
                        ${(isTeacher || isAdmin) ? `
                        <a href="${this._getRelativePath('pages/admin/admin.html')}" class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                            <span class="material-symbols-outlined text-lg text-emerald-500">dashboard</span>
                            강사 대시보드
                        </a>
                        ` : ''}
                        <a href="${this._getRelativePath('pages/main/settings.html')}" class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                            <span class="material-symbols-outlined text-lg text-slate-400">settings</span>
                            설정
                        </a>
                    </div>
                    <div class="border-t border-slate-100 pt-1">
                        <button onclick="LunaAuth.logout().then(()=>{window.location.href='${this._getRelativePath('pages/auth/login.html')}'})" class="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left">
                            <span class="material-symbols-outlined text-lg">logout</span>
                            로그아웃
                        </button>
                    </div>
                </div>
            `;

            // Hide old profile link in header (the gradient circle icon)
            headerProfileLinks.forEach(link => {
                if (link.closest('header')) link.style.display = 'none';
            });

        } else {
            // User is logged out — show login button
            if (userInfoEl) userInfoEl.remove();
            headerProfileLinks.forEach(link => {
                if (link.closest('header')) link.style.display = '';
            });
        }

        // === Sidebar User Quick Info ===
        const sidebarUserInfo = document.querySelector('.app-sidebar .flex.items-center.gap-3.px-2.py-3');
        if (sidebarUserInfo && user && profile) {
            const _sideAdmin = user.email === 'skyclover777@gmail.com' || profile.role === 'admin';
            const _sideTeacher = profile.role === 'teacher';
            const _sideName = profile.displayName || user.displayName || user.email?.split('@')[0] || 'User';
            sidebarUserInfo.innerHTML = `
                <div class="w-9 h-9 rounded-full bg-gradient-to-br ${_sideAdmin ? 'from-amber-400 to-orange-600' : _sideTeacher ? 'from-emerald-500 to-teal-600' : 'from-primary to-accent-purple'} flex items-center justify-center overflow-hidden">
                    ${user.photoURL ? `<img src="${user.photoURL}" class="w-full h-full object-cover" onerror="this.outerHTML='<span class=\\'material-symbols-outlined text-white text-sm\\'>person</span>'">` : '<span class="material-symbols-outlined text-white text-sm">person</span>'}
                </div>
                <div>
                    <div class="text-xs font-bold">${_sideName}</div>
                    <div class="text-[10px] text-slate-500">${_sideAdmin ? '🛡️ 관리자' : _sideTeacher ? '✏️ 미술 강사' : profile.role === 'student' ? '🎨 학생' : '👨‍👩‍👧 학부모'}</div>
                </div>
            `;
        }

        // === Admin Nav Visibility ===
        // Re-derive admin status outside the user/profile block to avoid scope issues
        const _isAdminForNav = user && profile &&
            (user.email === 'skyclover777@gmail.com' || profile.role === 'admin');

        const adminNavItem = document.getElementById('admin-nav-item');
        if (adminNavItem) {
            adminNavItem.style.display = _isAdminForNav ? 'flex' : 'none';
        }

        const adminCreateClassBtn = document.getElementById('admin-create-class-btn');
        if (adminCreateClassBtn) {
            adminCreateClassBtn.style.display = _isAdminForNav ? 'flex' : 'none';
        }

        const studentPageNavItem = document.getElementById('student-page-nav-item');
        if (studentPageNavItem) {
            studentPageNavItem.style.display = _isAdminForNav ? 'flex' : 'none';
        }

        // === Profile Page Stats ===
        if (window.location.pathname.includes('profile.html') && profile) {
            const displayName = profile.displayName || user.displayName || user.email?.split('@')[0] || 'Luna Artist';
            const isTeacher = profile.role === 'teacher';
            const isAdmin = profile.role === 'admin';

            // Update Hero Name and Avatar
            const profileNameEl = document.getElementById('profile-display-name');
            if (profileNameEl) profileNameEl.textContent = displayName;

            const avatarContainer = document.getElementById('profile-avatar-container');
            if (avatarContainer) {
                const photoURL = user.photoURL || profile.photoURL;
                if (photoURL) {
                    avatarContainer.innerHTML = `<img src="${photoURL}" class="w-full h-full object-cover">`;
                } else {
                    avatarContainer.innerHTML = `<span class="material-symbols-outlined text-white text-5xl md:text-6xl">person</span>`;
                }
            }

            const statStudents = document.getElementById('stat-students');
            const statPoints = document.getElementById('stat-points');
            const statProgress = document.getElementById('stat-progress');

            if (statStudents) statStudents.textContent = profile.studentCount || 0;
            if (statPoints) statPoints.textContent = profile.xpPoints || 0;
            if (statProgress) statProgress.textContent = profile.classProgress || 0;

            // === Dynamic Lists Render Helpers ===
            const renderClassThumbnails = (containerId, sectionId, classIds) => {
                const section = document.getElementById(sectionId);
                const container = document.getElementById(containerId);
                if (!section || !container) return;

                if (!classIds || classIds.length === 0) {
                    if (sectionId === 'purchased-classes-section') {
                        section.style.display = 'block';
                        container.innerHTML = '<p class="text-sm text-slate-500 py-4 text-center w-full" data-i18n="pro_no_purchased_classes">아직 수강 중인 수업이 없습니다. 새로운 수업을 만나보세요!</p>';
                        if (window.lwApplyLang) window.lwApplyLang(container);
                    } else {
                        section.style.display = 'none';
                    }
                    return;
                }

                section.style.display = 'block';
                container.innerHTML = classIds.map(id => {
                    let thumbUrl = '../../images/thumbnails/mini/' + id + '.jpg';
                    // We assume class-guide-app.html for students for the links
                    return `
                        <a href="class-guide-app.html?id=${id}" class="flex-none group">
                            <div class="w-16 h-16 rounded-2xl overflow-hidden shadow-sm border-2 border-primary/30 ring-2 ring-primary/10 bg-slate-100">
                                <img src="${thumbUrl}" alt="Class" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" onerror="this.src='../../images/thumbnails/${id}.jpg';">
                            </div>
                        </a>
                    `;
                }).join('');
            };

            // 1. Purchased Classes
            renderClassThumbnails('purchased-classes-list', 'purchased-classes-section', profile.purchasedClasses || []);

            // 2. Recent Classes
            // Use profile.recentClasses if it exists, otherwise check localStorage fallback just in case
            let recentClasses = profile.recentClasses || [];
            try { if (!recentClasses.length) recentClasses = JSON.parse(localStorage.getItem('lw_recent_classes') || '[]'); } catch (e) { }
            renderClassThumbnails('recent-classes-list', 'recent-classes-section', recentClasses);

            // 3. Recent Encyclopedia
            let recentEncy = profile.recentEncyclopedia || [];
            try { if (!recentEncy.length) recentEncy = JSON.parse(localStorage.getItem('lw_recent_encyclopedia') || '[]'); } catch (e) { }

            const encySection = document.getElementById('recent-encyclopedia-section');
            const encyList = document.getElementById('recent-encyclopedia-list');
            if (encySection && encyList) {
                if (recentEncy.length === 0) {
                    encySection.style.display = 'none';
                } else {
                    encySection.style.display = 'block';
                    encyList.innerHTML = recentEncy.map(id => {
                        let thumbUrl = '../../images/encyclopedia/thumbs/' + id + '.jpg';
                        return `
                            <a href="encyclopedia.html?id=${id}" class="flex-none group">
                                <div class="w-16 h-16 rounded-2xl overflow-hidden shadow-sm border-2 border-emerald-500/30 ring-2 ring-emerald-500/10 bg-slate-100">
                                    <img src="${thumbUrl}" alt="Encyclopedia" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" onerror="this.src='../../images/encyclopedia/${id}.jpg';">
                                </div>
                            </a>
                        `;
                    }).join('');
                }
            }

            // === My Classes Page ===
            if (window.location.pathname.includes('my-classes.html') && window.lwUpdateMyClasses) {
                window.lwUpdateMyClasses(profile.purchasedClasses || [], profile.folders || []);
            }
        }
    },

    // ─── Toggle profile dropdown ───
    _toggleProfileMenu() {
        const menu = document.getElementById('gnb-profile-menu');
        if (menu) {
            menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
        }
    },

    // ─── Get relative path helper ───
    _getRelativePath(path) {
        if (window.location.protocol === 'file:') {
            if (window.location.pathname.includes('/pages/')) {
                return '../../' + path;
            }
            return path;
        }
        return '/' + path;
    },

    // ============================================
    //  Admin Specific Data Helpers
    // ============================================
    async logVisit() {
        try {
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            const visitRef = _db.collection('stats').doc('visits').collection('daily').doc(today);
            
            await _db.runTransaction(async (transaction) => {
                const doc = await transaction.get(visitRef);
                if (!doc.exists) {
                    transaction.set(visitRef, { count: 1 });
                } else {
                    const newCount = (doc.data().count || 0) + 1;
                    transaction.update(visitRef, { count: newCount });
                }
            });
        } catch (err) {
            console.error('logVisit error:', err);
        }
    },

    async getTodayVisits() {
        try {
            const today = new Date().toISOString().split('T')[0];
            const doc = await _db.collection('stats').doc('visits').collection('daily').doc(today).get();
            return doc.exists ? doc.data().count : 0;
        } catch (err) {
            console.error('getTodayVisits error:', err);
            return 0;
        }
    },

    async getRecentLogins() {
        try {
            const usersSnap = await _db.collection('users')
                .orderBy('lastLoginAt', 'desc')
                .limit(20)
                .get();

            const logins = [];
            usersSnap.forEach(doc => {
                const data = doc.data();
                const loginDate = data.lastLoginAt?.toDate();
                let lastLoginStr = '-';
                if (loginDate) {
                    const month = loginDate.getMonth() + 1;
                    const day = loginDate.getDate();
                    const hours = String(loginDate.getHours()).padStart(2, '0');
                    const mins = String(loginDate.getMinutes()).padStart(2, '0');
                    lastLoginStr = `${month}/${day} ${hours}:${mins}`;
                }
                logins.push({
                    uid: doc.id,
                    email: data.email,
                    displayName: data.displayName,
                    role: data.role || 'parent',
                    lastLogin: lastLoginStr
                });
            });
            return logins;
        } catch (err) {
            console.error('getRecentLogins error:', err);
            return [];
        }
    },

    async getAdminStats() {
        const stats = {
            totalUsers: 0,
            premiumUsers: 0,
            activeClasses: 0,
            todayVisits: 0
        };

        try {
            // 1. Total Users
            const usersSnap = await _db.collection('users').get();
            stats.totalUsers = usersSnap.size;

            // 2. Premium Users
            try {
                const premSnap = await _db.collection('premiumAccess').where('active', '==', true).get();
                stats.premiumUsers = premSnap.size;
            } catch (e) { /* premiumAccess may not exist yet */ }

            // 3. Active Classes
            if (window.CLASSES_DATA) {
                stats.activeClasses = window.CLASSES_DATA.length;
            }

            // 4. Today Visits
            stats.todayVisits = await this.getTodayVisits();

            return stats;
        } catch (err) {
            console.error('getAdminStats error:', err);
            return stats;
        }
    },

    async getRecentActivity() {
        try {
            // Try to get latest 5 users or gallery posts as activity
            const activities = [];
            
            // Fetch newest users
            const usersSnap = await _db.collection('users')
                .orderBy('createdAt', 'desc')
                .limit(3)
                .get();
            
            usersSnap.forEach(doc => {
                const data = doc.data();
                const joinDate = data.createdAt?.toDate();
                const dateStr = joinDate ? `${joinDate.getMonth()+1}/${joinDate.getDate()} ${String(joinDate.getHours()).padStart(2,'0')}:${String(joinDate.getMinutes()).padStart(2,'0')}` : '방금';
                activities.push({
                    type: 'user',
                    title: `새 회원 가입 — ${data.displayName || '익명'}`,
                    subtitle: dateStr,
                    icon: 'person_add',
                    color: 'blue'
                });
            });

            // Fetch newest gallery posts if possible
            try {
            const gallerySnap = await _db.collection('gallery')
                .orderBy('createdAt', 'desc')
                .limit(2)
                .get();

            gallerySnap.forEach(doc => {
                const data = doc.data();
                activities.push({
                    type: 'gallery',
                    title: `새 갤러리 게시물 — ${data.title || '제목없음'}`,
                    subtitle: data.author || '작가',
                    icon: 'photo_camera',
                    color: 'purple'
                });
            });
            } catch (e) { /* gallery collection may not exist */ }

            return activities;
        } catch (err) {
            console.error('getRecentActivity error:', err);
            return [];
        }
    },

    // ─── Save Recent Encyclopedia ID ───
    async saveRecentEncyclopedia(id) {
        console.log("Saving recent encyclopedia:", id);
        const user = _auth.currentUser;
        if (!user) return;

        try {
            const userRef = _db.collection('users').doc(user.uid);
            const doc = await userRef.get();
            if (doc.exists) {
                let recent = doc.data().recentEncyclopedia || [];
                recent = recent.filter(item => item !== id);
                recent.unshift(id);
                recent = recent.slice(0, 12);
                await userRef.update({ recentEncyclopedia: recent });

                // Update local profile too
                const profile = JSON.parse(localStorage.getItem('lw_profile') || '{}');
                profile.recentEncyclopedia = recent;
                localStorage.setItem('lw_profile', JSON.stringify(profile));
            }
        } catch (err) {
            console.error("Error saving recent encyclopedia:", err);
        }
    },

    // ─── Save Recent Class ID + Increment View Count ───
    async saveRecentClass(id) {
        console.log("Saving recent class:", id);
        const user = _auth.currentUser;
        if (!user) return;

        try {
            // 1. Update recent classes for user
            const userRef = _db.collection('users').doc(user.uid);
            const doc = await userRef.get();
            if (doc.exists) {
                let recent = doc.data().recentClasses || [];
                recent = recent.filter(item => item !== id);
                recent.unshift(id);
                recent = recent.slice(0, 12);
                await userRef.update({ recentClasses: recent });

                const profile = JSON.parse(localStorage.getItem('lw_profile') || '{}');
                profile.recentClasses = recent;
                localStorage.setItem('lw_profile', JSON.stringify(profile));
            }

            // 2. Increment class view count (stats/classViews)
            const viewRef = _db.collection('stats').doc('classViews');
            await viewRef.set(
                { [id]: firebase.firestore.FieldValue.increment(1) },
                { merge: true }
            );
        } catch (err) {
            console.error("Error saving recent class:", err);
        }
    },

    // ============================================
    //  Premium Access Management (Admin Only)
    // ============================================

    /** Add a premium user by email (durationMonths: 0 = unlimited) */
    async addPremiumUser(email, memo = '', durationMonths = 0) {
        const normalizedEmail = email.toLowerCase().trim();
        if (!normalizedEmail) throw new Error('이메일을 입력해 주세요.');

        const data = {
            email: normalizedEmail,
            memo: memo,
            active: true,
            grantedAt: firebase.firestore.FieldValue.serverTimestamp(),
            grantedBy: _auth.currentUser?.email || 'admin',
        };

        if (durationMonths > 0) {
            const expiry = new Date();
            expiry.setMonth(expiry.getMonth() + durationMonths);
            data.expiresAt = expiry;
        } else {
            data.expiresAt = null; // unlimited
        }

        await _db.collection('premiumAccess').doc(normalizedEmail).set(data);
        return { success: true, email: normalizedEmail };
    },

    /** Remove premium access */
    async removePremiumUser(email) {
        const normalizedEmail = email.toLowerCase().trim();
        await _db.collection('premiumAccess').doc(normalizedEmail).delete();
        return { success: true };
    },

    /** Toggle active status */
    async togglePremiumUser(email, active) {
        const normalizedEmail = email.toLowerCase().trim();
        await _db.collection('premiumAccess').doc(normalizedEmail).update({ active });
        return { success: true };
    },

    /** List all premium users */
    async listPremiumUsers() {
        const snapshot = await _db.collection('premiumAccess').orderBy('grantedAt', 'desc').get();
        const users = [];
        snapshot.forEach(doc => { users.push({ id: doc.id, ...doc.data() }); });
        return users;
    },

    // ============================================
    //  Parent Access Management (월간수업 제외)
    // ============================================
    async addParentUser(email, memo = '', durationMonths = 0) {
        const normalizedEmail = email.toLowerCase().trim();
        if (!normalizedEmail) throw new Error('이메일을 입력해 주세요.');
        const data = {
            email: normalizedEmail, memo, active: true,
            grantedAt: firebase.firestore.FieldValue.serverTimestamp(),
            grantedBy: _auth.currentUser?.email || 'admin',
            expiresAt: durationMonths > 0 ? (() => { const d = new Date(); d.setMonth(d.getMonth() + durationMonths); return d; })() : null,
        };
        await _db.collection('parentAccess').doc(normalizedEmail).set(data);
        return { success: true, email: normalizedEmail };
    },
    async removeParentUser(email) {
        await _db.collection('parentAccess').doc(email.toLowerCase().trim()).delete();
        return { success: true };
    },
    async toggleParentUser(email, active) {
        await _db.collection('parentAccess').doc(email.toLowerCase().trim()).update({ active });
        return { success: true };
    },
    async listParentUsers() {
        const snapshot = await _db.collection('parentAccess').orderBy('grantedAt', 'desc').get();
        const users = [];
        snapshot.forEach(doc => { users.push({ id: doc.id, ...doc.data() }); });
        return users;
    },

    // ============================================
    //  User Activity Tracking
    // ============================================

    /** Log user page visit to Firestore */
    async logUserActivity(action, detail = '') {
        const user = _auth.currentUser;
        if (!user) return;

        try {
            await _db.collection('userActivity').add({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || '',
                action: action,
                detail: detail,
                page: window.location.pathname,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        } catch (e) {
            // Silent fail — activity logging should never break the app
        }
    },

    /** Get activity logs for admin (optionally filtered by uid) */
    async getUserActivityLogs(uid = null, limitCount = 50) {
        try {
            let query = _db.collection('userActivity')
                .orderBy('timestamp', 'desc')
                .limit(limitCount);

            if (uid) {
                query = _db.collection('userActivity')
                    .where('uid', '==', uid)
                    .orderBy('timestamp', 'desc')
                    .limit(limitCount);
            }

            const snap = await query.get();
            const logs = [];
            snap.forEach(doc => {
                const d = doc.data();
                const ts = d.timestamp?.toDate();
                logs.push({
                    ...d,
                    id: doc.id,
                    timeStr: ts ? `${ts.getMonth()+1}/${ts.getDate()} ${String(ts.getHours()).padStart(2,'0')}:${String(ts.getMinutes()).padStart(2,'0')}` : '-'
                });
            });
            return logs;
        } catch (e) {
            console.error('getUserActivityLogs error:', e);
            return [];
        }
    },

    // ============================================
    //  Initialize Auth State on Page Load
    // ============================================
    init() {
        // Log this visit
        this.logVisit();

        this.onAuthChange((user, profile) => {
            this.updateGNB(user, profile);

            if (user && profile) {
                // Auto-track page visit activity
                const path = window.location.pathname;
                const pageName = path.split('/').pop()?.replace('.html', '') || 'index';
                // Map page names to Korean labels for readability
                const pageLabels = {
                    'index': '홈',
                    'classes': '수업 목록',
                    'gallery': '갤러리',
                    'profile': '마이페이지',
                    'settings': '설정',
                    'curriculum': '커리큘럼',
                    'pricing': '요금제',
                    'support': '고객센터',
                    'encyclopedia': '백과사전',
                    'admin': '관리자',
                    'coloring': '색칠교실',
                    'art-cosmos': '아트코스모스',
                    'photo-tool': '포토툴',
                    'monthly-catalog': '월간 카탈로그',
                    'adult-catalog': '성인반',
                };
                let label = pageLabels[pageName] || pageName;

                // Lesson page detection
                if (path.includes('/pages/lessons/lesson-')) {
                    const parts = path.split('lesson-');
                    if (parts.length > 1) {
                        const classId = parts[1].replace('.html', '');
                        label = '수업: ' + classId;
                        this.saveRecentClass(classId);
                    }
                }

                this.logUserActivity('페이지 방문', label);
            }
        });

        // Close profile menu on outside click
        document.addEventListener('click', (e) => {
            const menu = document.getElementById('gnb-profile-menu');
            const userInfo = document.getElementById('gnb-user-info');
            if (menu && userInfo && !userInfo.contains(e.target)) {
                menu.style.display = 'none';
            }
        });
    }
};

// ─── Auto-initialize on DOM ready ───
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on non-login pages (login page handles its own flow)
    if (!window.location.pathname.includes('/auth/login')) {
        LunaAuth.init();
    }
});
