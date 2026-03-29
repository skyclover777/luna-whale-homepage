const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { CLASSES_DATA } = require('./classes-data.js');

const THUMBNAIL_DIR = 'images/thumbnails';
const OUTPUT_FILE = 'classes-data-updated.js';

// Ensure thumbnail directory exists
if (!fs.existsSync(THUMBNAIL_DIR)) {
    fs.mkdirSync(THUMBNAIL_DIR, { recursive: true });
}

console.log(`Processing ${CLASSES_DATA.length} classes...`);

const updatedData = CLASSES_DATA.map((item, index) => {
    if (!item.image) return item;

    const originalPath = item.image;
    const ext = path.extname(originalPath);
    const thumbnailName = `${item.id}.jpg`;
    const thumbnailPath = path.join(THUMBNAIL_DIR, thumbnailName);

    console.log(`[${index + 1}/${CLASSES_DATA.length}] Processing: ${item.id}`);

    let dominantColor = '#94a3b8'; // Default slate-400
    let processedThumbnail = null;

    try {
        // 1. Generate Thumbnail (JPG, Max 400px)
        if (fs.existsSync(originalPath)) {
            execSync(`sips -s format jpeg -Z 400 "${originalPath}" --out "${thumbnailPath}"`);
            processedThumbnail = thumbnailPath;
        } else {
            console.warn(`  Warning: File not found ${originalPath}`);
        }

        // 2. Extract Dominant Color
        if (fs.existsSync(originalPath)) {
            const colorResult = execSync(`convert "${originalPath}" -scale 1x1! -format "%[pixel:u]" info:`).toString().trim();
            dominantColor = colorResult;
            console.log(`  Color: ${dominantColor}`);
        }
    } catch (err) {
        console.error(`  Error processing ${item.id}:`, err.message);
    }

    return {
        ...item,
        thumbnail: processedThumbnail || item.image,
        dominantColor: dominantColor
    };
});

// Generate the new file content
const fileContent = `/**
 * Global Class Gallery Data (Updated with Thumbnails and Colors)
 */

const CLASSES_DATA = ${JSON.stringify(updatedData, null, 4)};

const SUB_CATS = {
    'all': [
        { key: 'sub_monthly', tag: 'Monthly' },
        { key: 'sub_kids_masterpiece', tag: 'KidsMasterpiece' }
    ],
    'expression': [{ key: 'sub_monthly', tag: 'Monthly' }, { key: 'sub_kids_masterpiece', tag: 'KidsMasterpiece' }],
    '3d': [{ key: 'sub_monthly', tag: 'Monthly' }, { key: 'sub_kids_masterpiece', tag: 'KidsMasterpiece' }],
    'observation': [{ key: 'sub_monthly', tag: 'Monthly' }, { key: 'sub_kids_masterpiece', tag: 'KidsMasterpiece' }],
    'culture': [{ key: 'sub_monthly', tag: 'Monthly' }, { key: 'sub_kids_masterpiece', tag: 'KidsMasterpiece' }],
    'project': [{ key: 'sub_monthly', tag: 'Monthly' }, { key: 'sub_kids_masterpiece', tag: 'KidsMasterpiece' }],
    'color': [{ key: 'sub_monthly', tag: 'Monthly' }]
};

// ... other constants (MOCK_DATA, LESSON_MAP) should be preserved or re-imported
// For simplicity in this demo, I'll just export the CLASSES_DATA for now or merge later.

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CLASSES_DATA, SUB_CATS };
}
`;

// In a real scenario, I'd read the whole file and replace only the CLASSES_DATA array
// but for now I'll just write this to a temp file and I'll handle the merge manually to be safe.
fs.writeFileSync('classes_metadata.json', JSON.stringify(updatedData, null, 4));
console.log('Metadata saved to classes_metadata.json');
