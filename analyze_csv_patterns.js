// CSVパターン分析スクリプト（ブラウザで実行可能）
// formation_all.csvから全パターンを抽出し、カテゴリー別に分類します

async function analyzeCSVPatterns() {
    const response = await fetch('formation_all.csv');
    const csvText = await response.text();
    const lines = csvText.split('\n');
    
    // 走者状況別にパターンを分類
    const patternsByRunner = {};
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // CSVパース（簡易版）
        const fields = parseCSVLine(line);
        if (fields.length < 3) continue;
        
        const runner = fields[0];
        const play = fields[1];
        const condition = fields[2];
        
        if (!patternsByRunner[runner]) {
            patternsByRunner[runner] = [];
        }
        
        patternsByRunner[runner].push({
            play: play,
            condition: condition,
            fullName: condition ? `${play}（${condition}）` : play
        });
    }
    
    // 各走者状況のパターンをカテゴリー分類
    console.log('=== CSV パターン分析結果 ===\n');
    
    for (const [runner, patterns] of Object.entries(patternsByRunner)) {
        console.log(`\n【${runner}】 全${patterns.length}パターン`);
        
        // カテゴリー分類
        const categories = {
            '牽制・ピックオフ': [],
            'バント': [],
            '特殊プレー': [],
            'ゴロ': [],
            'ヒット・長打': []
        };
        
        patterns.forEach(p => {
            if (p.play.includes('牽制') || p.play.includes('ピックオフ')) {
                categories['牽制・ピックオフ'].push(p.fullName);
            } else if (p.play.includes('バント')) {
                categories['バント'].push(p.fullName);
            } else if (p.play.includes('ワイルド') || p.play.includes('暴投') || p.play.includes('盗塁')) {
                categories['特殊プレー'].push(p.fullName);
            } else if (p.play.includes('ゴロ')) {
                categories['ゴロ'].push(p.fullName);
            } else {
                categories['ヒット・長打'].push(p.fullName);
            }
        });
        
        // カテゴリー別に表示
        for (const [category, items] of Object.entries(categories)) {
            if (items.length > 0) {
                console.log(`  【${category}】 ${items.length}個`);
                items.forEach(item => console.log(`    - ${item}`));
            }
        }
    }
    
    return patternsByRunner;
}

function parseCSVLine(line) {
    const fields = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            fields.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    fields.push(current);
    
    return fields;
}

// ブラウザコンソールで実行
console.log('CSVパターン分析スクリプトを読み込みました。');
console.log('実行するには: analyzeCSVPatterns()');
