/* ============================================
   LUNA WHALE ART LAB — Storage Utilities
   ============================================ */

window.LunaStorage = {
    // ─── Folder Constants ───
    FOLDERS: {
        CLASSES: 'class_thumbnails',
        ENCYCLOPEDIA: 'encyclopedia_images',
        VIDEOS: 'artists_eye_videos',
        GALLERY: 'student_gallery'
    },

    /**
     * Upload a file to Firebase Storage
     * @param {File} file - The file object to upload
     * @param {string} folder - Destination folder (use LunaStorage.FOLDERS)
     * @param {function} onProgress - Callback for upload progress (percent)
     * @returns {Promise<string>} - Resolves to the Download URL
     */
    async uploadFile(file, folder, onProgress) {
        if (!window.LunaAuth || !LunaAuth.getStorage()) {
            throw new Error('Firebase Storage not initialized');
        }

        const storage = LunaAuth.getStorage();
        const fileName = `${Date.now()}_${file.name}`;
        const storageRef = storage.ref(`${folder}/${fileName}`);
        const uploadTask = storageRef.put(file);

        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload progress: ${progress.toFixed(2)}%`);
                    if (onProgress) onProgress(progress);
                },
                (error) => {
                    console.error('Upload failed:', error);
                    if (window.LunaApp && LunaApp.toast) LunaApp.toast('❌ Upload failed: ' + error.message);
                    reject(error);
                },
                async () => {
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                    console.log('File available at:', downloadURL);
                    resolve(downloadURL);
                }
            );
        });
    },

    /**
     * Upload a file and update a Firestore document automatically
     */
    async uploadAndUpdateFirestore(file, folder, collection, docId, fieldName, onProgress) {
        try {
            const downloadURL = await this.uploadFile(file, folder, onProgress);

            if (collection && docId && fieldName) {
                const db = LunaAuth.getDb();
                await db.collection(collection).doc(docId).update({
                    [fieldName]: downloadURL,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                console.log(`Firestore document ${docId} updated with new ${fieldName}`);
            }

            return downloadURL;
        } catch (err) {
            console.error('Upload and Sync failed:', err);
            throw err;
        }
    }
};
