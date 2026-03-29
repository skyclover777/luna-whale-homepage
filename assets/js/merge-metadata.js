const fs = require('fs');

const metadata = JSON.parse(fs.readFileSync('classes_metadata.json', 'utf8'));
let classesDataContent = fs.readFileSync('classes-data.js', 'utf8');

// I'll replace the whole CLASSES_DATA array by finding its boundaries
const startLabel = 'const CLASSES_DATA = [';
const endLabel = '];';

const startIndex = classesDataContent.indexOf(startLabel);
// Find the closing bracket that matches the opening one
let openBrackets = 0;
let endIndex = -1;

for (let i = startIndex + startLabel.length - 1; i < classesDataContent.length; i++) {
    if (classesDataContent[i] === '[') openBrackets++;
    if (classesDataContent[i] === ']') {
        openBrackets--;
        if (openBrackets === 0) {
            endIndex = i + 1;
            break;
        }
    }
}

if (startIndex !== -1 && endIndex !== -1) {
    const updatedArray = JSON.stringify(metadata, null, 4);
    const newContent = classesDataContent.substring(0, startIndex) + `const CLASSES_DATA = ${updatedArray}` + classesDataContent.substring(endIndex);
    fs.writeFileSync('classes-data.js', newContent);
    console.log('Successfully updated classes-data.js');
} else {
    console.error('Could not find CLASSES_DATA boundaries');
}
