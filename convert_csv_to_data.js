// CSVデータをcoveringData形式に変換するスクリプト
// Node.jsで実行: node convert_csv_to_data.js

const fs = require('fs');

// CSVを読み込んで解析
const csvContent = fs.readFileSync('baseball_formations.csv', 'utf-8');
const lines = csvContent.trim().split('\n');
const headers = lines[0].split(',');

// プレー名のマッピング（CSV → アプリ）
const playMapping = {
    'ショートゴロ': 'ss_grounder',
    'ショートゴロ（正面）': 'ss_grounder',
    'セカンドゴロ': '2b_grounder',
    'サードゴロ': '3b_grounder',
    'ファーストゴロ': '1b_grounder',
    'ピッチャーゴロ': 'p_grounder',
    'キャッチャーゴロ': 'c_grounder',
    'レフト前ヒット': 'lf_hit',
    'レフト前ヒット（正面）': 'lf_hit',
    'センター前ヒット': 'cf_hit',
    'センター前ヒット（正面）': 'cf_hit',
    'ライト前ヒット': 'rf_hit',
    'ライト前ヒット（正面）': 'rf_hit',
    'レフトフライ': 'lf_fly',
    'レフトフライ（正面）': 'lf_fly',
    'センターフライ': 'cf_fly',
    'センターフライ（正面）': 'cf_fly',
    'ライトフライ': 'rf_fly',
    'ライトフライ（正面）': 'rf_fly'
};

// 走者状況のマッピング（CSV → アプリ）
const runnerMapping = {
    '走者なし': 'none',
    '走者一塁': 'first',
    '走者二塁': 'second',
    '走者三塁': 'third',
    '走者1,2塁': 'first_second',
    '走者1,3塁': 'first_third',
    '走者2,3塁': 'second_third',
    '走者満塁': 'loaded'
};

// ポジション名のマッピング（CSV → アプリ）
const positionMapping = {
    'ピッチャー': 1,
    'キャッチャー': 2,
    'ファースト': 3,
    'セカンド': 4,
    'サード': 5,
    'ショート': 6,
    'レフト': 7,
    'センター': 8,
    'ライト': 9
};

// ベース座標（アプリと同じ）
const bases = {
    home: { x: 250, y: 470 },
    first: { x: 430, y: 290 },
    second: { x: 250, y: 110 },
    third: { x: 70, y: 290 }
};

// ポジション座標（アプリと同じ）
const positions = {
    1: { x: 250, y: 310 },  // ピッチャー
    2: { x: 250, y: 485 },  // キャッチャー
    3: { x: 405, y: 305 },  // ファースト
    4: { x: 335, y: 195 },  // セカンド
    5: { x: 95, y: 305 },   // サード
    6: { x: 165, y: 195 },  // ショート
    7: { x: 60, y: 60 },    // レフト
    8: { x: 250, y: 20 },   // センター
    9: { x: 440, y: 60 }    // ライト
};

// 役割判定関数
function determineRole(description) {
    if (!description || description.trim() === '') {
        return 'wait';
    }
    
    // 打球処理
    if (description.includes('打球処理') || description.includes('飛球処理')) {
        return 'ball';
    }
    
    // ベースカバー
    if (description.includes('ベースカバー') && !description.includes('バックアップ')) {
        return 'base';
    }
    
    // バックアップ
    if (description.includes('バックアップ')) {
        return 'backup';
    }
    
    // カバーリング（中継、カット含む）
    if (description.includes('中継') || description.includes('カット') || description.includes('カバー')) {
        return 'cover';
    }
    
    // 待機
    return 'wait';
}

// 座標推測関数
function estimatePosition(description, basePosition) {
    if (!description || description.trim() === '') {
        return basePosition;
    }
    
    // 一塁関連
    if (description.includes('一塁')) {
        if (description.includes('バックアップ')) {
            return { x: bases.first.x + 50, y: bases.first.y + 30 };
        }
        return { x: bases.first.x, y: bases.first.y };
    }
    
    // 二塁関連
    if (description.includes('二塁')) {
        if (description.includes('バックアップ')) {
            return { x: bases.second.x, y: bases.second.y - 30 };
        }
        return { x: bases.second.x, y: bases.second.y };
    }
    
    // 三塁関連
    if (description.includes('三塁')) {
        if (description.includes('バックアップ')) {
            return { x: bases.third.x - 30, y: bases.third.y };
        }
        return { x: bases.third.x, y: bases.third.y };
    }
    
    // 本塁関連
    if (description.includes('本塁')) {
        if (description.includes('バックアップ')) {
            return { x: bases.home.x, y: bases.home.y + 30 };
        }
        return { x: bases.home.x, y: bases.home.y };
    }
    
    // 中継プレー（内外野の間）
    if (description.includes('中継')) {
        if (description.includes('左中間')) {
            return { x: 150, y: 130 };
        }
        if (description.includes('右中間')) {
            return { x: 350, y: 130 };
        }
        // 一般的な中継
        return { x: (basePosition.x + bases.second.x) / 2, y: (basePosition.y + bases.second.y) / 2 };
    }
    
    // デフォルトは定位置
    return basePosition;
}

// CSVデータをパース
const data = {};
for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    const columns = line.split(',');
    const runner = columns[0];
    const play = columns[1];
    
    const runnerKey = runnerMapping[runner];
    const playKey = playMapping[play];
    
    // マッピングが存在する場合のみ処理
    if (runnerKey && playKey) {
        if (!data[runnerKey]) {
            data[runnerKey] = {};
        }
        
        // 各ポジションの動きを解析
        const movements = {};
        for (let pos = 1; pos <= 9; pos++) {
            const desc = columns[pos + 1] || ''; // +1はプレー列の次から
            const role = determineRole(desc);
            const targetPos = estimatePosition(desc, positions[pos]);
            
            movements[pos] = {
                role: role,
                x: targetPos.x,
                y: targetPos.y,
                desc: desc || '定位置で待機'
            };
        }
        
        // プレー名を取得
        const playName = Object.keys(playMapping).find(key => playMapping[key] === playKey) || play;
        
        data[runnerKey][playKey] = {
            description: `${runner} - ${play}`,
            movements: movements
        };
    }
}

// data.js形式で出力
let output = `// カバーリング・バックアップデータ（CSVから自動生成）\n`;
output += `// 役割タイプ: 'ball' (打球処理), 'cover' (カバーリング), 'backup' (バックアップ), 'base' (ベースカバー), 'wait' (待機)\n\n`;
output += `const coveringData = ${JSON.stringify(data, null, 2)};\n\n`;
output += `// Node.jsでの使用\nif (typeof module !== 'undefined' && module.exports) {\n`;
output += `    module.exports = coveringData;\n`;
output += `}\n`;

fs.writeFileSync('coveringData_generated.js', output);
console.log('✅ coveringData_generated.js を生成しました');
console.log(`📊 生成されたパターン数: ${Object.keys(data).length}走者状況`);
Object.keys(data).forEach(runner => {
    console.log(`   ${runner}: ${Object.keys(data[runner]).length}パターン`);
});
