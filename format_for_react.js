const fs = require('fs');

function formatForReact(inputFile, outputFile) {
    console.log(`📖 Reading ${inputFile}...`);
    
    let data;
    try {
        data = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
    } catch (err) {
        console.error(`❌ Error reading ${inputFile}:`, err.message);
        process.exit(1);
    }
    
    const questions = data.questions || [];
    
    console.log(`✅ Found ${questions.length} questions`);
    
    // Create JavaScript module content
    const jsContent = `// Auto-generated QuantPrep Questions Database
// Total Questions: ${questions.length}
// Generated: ${new Date().toISOString()}

const QUESTIONS_DB = ${JSON.stringify(data, null, 2)};

export default QUESTIONS_DB;
`;
    
    // Write to output file
    fs.writeFileSync(outputFile, jsContent, 'utf-8');
    
    console.log(`\n✨ JavaScript module created: ${outputFile}`);
    console.log(`📊 Total questions: ${questions.length}`);
    
    // Statistics
    const stats = {
        types: {},
        difficulties: {},
        categories: {}
    };
    
    questions.forEach(q => {
        stats.types[q.type] = (stats.types[q.type] || 0) + 1;
        stats.difficulties[q.difficulty] = (stats.difficulties[q.difficulty] || 0) + 1;
        stats.categories[q.category] = (stats.categories[q.category] || 0) + 1;
    });
    
    console.log('\n📈 Statistics:');
    console.log('   Question Types:', stats.types);
    console.log('   Difficulties:', stats.difficulties);
    console.log('   Categories:', Object.keys(stats.categories).length, 'unique');
    
    // Instructions
    console.log('\n📝 Next Steps:');
    console.log('   1. Open components/QuantPrepApp.js');
    console.log('   2. Find the QUESTIONS_DB constant (near the top)');
    console.log('   3. Replace it with the content from', outputFile);
    console.log('   4. Run: npm run dev');
}

const INPUT_FILE = 'converted_questions_db.json';
const OUTPUT_FILE = 'questionsDatabase.js';

console.log('🚀 Converting JSON to JavaScript module');
console.log('=' .repeat(50));

try {
    formatForReact(INPUT_FILE, OUTPUT_FILE);
    console.log('\n✅ Conversion complete!');
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}