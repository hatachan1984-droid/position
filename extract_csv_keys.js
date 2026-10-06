// formation_all.csvから実際のキーを抽出するスクリプト
const fs = require('fs');

// CSVの1行をパースする関数
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);
    
    return result;
}

// キーを生成する関数（app.jsと同じロジック）
function generateKey(play, condition) {
    let key = play.toLowerCase().replace(/[（）()]/g, '_').replace(/\s+/g, '_');
    if (condition) {
        key += '_' + condition.toLowerCase().replace(/[（）()]/g, '_').replace(/\s+/g, '_') + '_';
    }
    return key;
}

// CSVを読み込んで解析
const csvText = fs.readFileSync('formation_all.csv', 'utf8');
const lines = csvText.split('\n');

const patterns = {};

for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = parseCSVLine(lines[i]);
    if (values.length < 13) continue;
    
    const runner = values[0];
    const play = values[1];
    const condition = values[2];
    
    const key = generateKey(play, condition);
    
    if (!patterns[runner]) {
        patterns[runner] = [];
    }
    
    patterns[runner].push({
        play: play,
        condition: condition,
        key: key
    });
}

// 結果を出力
for (const runner in patterns) {
    console.log(`\n=== ${runner} (${patterns[runner].length}パターン) ===`);
    patterns[runner].forEach(p => {
        console.log(`{ key: '${p.key}', label: '${p.play}${p.condition ? '（' + p.condition + '）' : ''}' },`);
    });
}
