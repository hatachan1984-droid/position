// ポジション定義（正方形のダイヤモンド）
// ダイヤモンド：ホーム(250,470) - 三塁(70,290) - 二塁(250,110) - 一塁(430,290)
// 各辺の長さ：180ピクセル x √2 ≈ 254ピクセル（正方形）
const positions = {
    1: { name: 'ピッチャー', abbr: 'P', full: 'ピッチャー (P)', x: 250, y: 310 },
    2: { name: 'キャッチャー', abbr: 'C', full: 'キャッチャー (C)', x: 250, y: 485 },
    3: { name: 'ファースト', abbr: '1B', full: 'ファースト (1B)', x: 405, y: 305 },
    4: { name: 'セカンド', abbr: '2B', full: 'セカンド (2B)', x: 335, y: 195 },
    5: { name: 'サード', abbr: '3B', full: 'サード (3B)', x: 95, y: 305 },
    6: { name: 'ショート', abbr: 'SS', full: 'ショート (SS)', x: 165, y: 195 },
    7: { name: 'レフト', abbr: 'LF', full: 'レフト (LF)', x: 60, y: 60 },
    8: { name: 'センター', abbr: 'CF', full: 'センター (CF)', x: 250, y: 20 },
    9: { name: 'ライト', abbr: 'RF', full: 'ライト (RF)', x: 440, y: 60 }
};

// ベース座標（正方形のダイヤモンド）
const bases = {
    home: { x: 250, y: 470 },
    first: { x: 430, y: 290 },
    second: { x: 250, y: 110 },
    third: { x: 70, y: 290 }
};

// 走者パターン
const runnerPatterns = {
    none: { name: '走者なし', runners: [] },
    first: { name: '一塁', runners: [1] },
    second: { name: '二塁', runners: [2] },
    third: { name: '三塁', runners: [3] },
    first_second: { name: '一二塁', runners: [1, 2] },
    first_third: { name: '一三塁', runners: [1, 3] },
    second_third: { name: '二三塁', runners: [2, 3] },
    loaded: { name: '満塁', runners: [1, 2, 3] }
};

// 打球パターン
const ballPatterns = {
    common: [
        { id: 'ss_grounder', name: 'ショート正面ゴロ' },
        { id: '2b_grounder', name: 'セカンド正面ゴロ' },
        { id: '3b_grounder', name: 'サード正面ゴロ' },
        { id: '1b_grounder', name: 'ファースト正面ゴロ' },
        { id: 'lf_hit', name: 'レフト前ヒット' },
        { id: 'cf_hit', name: 'センター前ヒット' },
        { id: 'rf_hit', name: 'ライト前ヒット' },
        { id: 'lf_fly', name: 'レフトフライ' },
        { id: 'cf_fly', name: 'センターフライ' },
        { id: 'rf_fly', name: 'ライトフライ' }
    ]
};

// カバーリング・バックアップデータ（CSVから抽出）
// 役割タイプ: 'ball' (打球処理), 'cover' (カバーリング), 'backup' (バックアップ), 'base' (ベースカバー), 'wait' (待機)
const coveringData = {
    // 走者なし
    none: {
        // ショートゴロ
        ss_grounder: {
            description: '走者なし - ショート正面ゴロ',
            movements: {
                1: { role: 'backup', x: 350, y: 340, desc: '一塁送球バックアップ' },
                2: { role: 'backup', x: 480, y: 320, desc: '一塁悪送球のバックアップ' },
                3: { role: 'base', x: 430, y: 290, desc: '一塁ベースカバー' },
                4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
                5: { role: 'cover', x: 120, y: 240, desc: '打球処理カバー' },
                6: { role: 'ball', x: 165, y: 195, desc: '打球処理・一塁送球判断' },
                7: { role: 'cover', x: 90, y: 140, desc: '打球処理カバー' },
                8: { role: 'backup', x: 250, y: 80, desc: '二次送球バックアップ' },
                9: { role: 'backup', x: 470, y: 340, desc: '一塁悪送球のバックアップ' }
            }
        },
        // セカンドゴロ
        '2b_grounder': {
            description: '走者なし - セカンド正面ゴロ',
            movements: {
                1: { role: 'backup', x: 350, y: 340, desc: '一塁送球バックアップ' },
                2: { role: 'backup', x: 480, y: 320, desc: '一塁悪送球のバックアップ' },
                3: { role: 'base', x: 430, y: 290, desc: '一塁ベースカバー' },
                4: { role: 'ball', x: 335, y: 195, desc: '打球処理・一塁送球判断' },
                5: { role: 'wait', x: 95, y: 305, desc: '定位置待機' },
                6: { role: 'cover', x: 250, y: 150, desc: '二遊間の打球処理カバー' },
                7: { role: 'wait', x: 60, y: 60, desc: '定位置待機' },
                8: { role: 'backup', x: 250, y: 70, desc: '二塁後方バックアップ' },
                9: { role: 'backup', x: 470, y: 340, desc: '一塁悪送球のバックアップ' }
            }
        },
        // サードゴロ
        '3b_grounder': {
            description: '走者なし - サード正面ゴロ',
            movements: {
                1: { role: 'backup', x: 350, y: 340, desc: '一塁送球バックアップ' },
                2: { role: 'backup', x: 480, y: 320, desc: '一塁悪送球のバックアップ' },
                3: { role: 'base', x: 430, y: 290, desc: '一塁ベースカバー' },
                4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
                5: { role: 'ball', x: 95, y: 305, desc: '打球処理・一塁送球判断' },
                6: { role: 'cover', x: 120, y: 240, desc: '三遊間の打球処理カバー' },
                7: { role: 'backup', x: 40, y: 220, desc: '三塁側バックアップ' },
                8: { role: 'wait', x: 250, y: 20, desc: '定位置待機' },
                9: { role: 'backup', x: 470, y: 340, desc: '一塁悪送球のバックアップ' }
            }
        },
        // ファーストゴロ
        '1b_grounder': {
            description: '走者なし - ファースト正面ゴロ',
            movements: {
                1: { role: 'base', x: 430, y: 290, desc: '一塁ベースカバー' },
                2: { role: 'backup', x: 480, y: 320, desc: '一塁悪送球のバックアップ' },
                3: { role: 'ball', x: 405, y: 305, desc: '打球処理・一塁送球判断' },
                4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
                5: { role: 'wait', x: 95, y: 305, desc: '定位置待機' },
                6: { role: 'wait', x: 165, y: 195, desc: '定位置待機' },
                7: { role: 'wait', x: 60, y: 60, desc: '定位置待機' },
                8: { role: 'wait', x: 250, y: 20, desc: '定位置待機' },
                9: { role: 'backup', x: 460, y: 250, desc: '一塁悪送球のバックアップ' }
            }
        },
        // レフト前ヒット
        lf_hit: {
            description: '走者なし - レフト前ヒット',
            movements: {
                1: { role: 'backup', x: 250, y: 200, desc: '二次送球バックアップ' },
                2: { role: 'wait', x: 250, y: 470, desc: '本塁待機' },
                3: { role: 'wait', x: 405, y: 305, desc: '定位置待機' },
                4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
                5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
                6: { role: 'cover', x: 150, y: 180, desc: '中継プレー' },
                7: { role: 'ball', x: 60, y: 60, desc: '打球処理・二塁送球' },
                8: { role: 'backup', x: 150, y: 80, desc: '左中間のバックアップ' },
                9: { role: 'backup', x: 350, y: 150, desc: '二次送球バックアップ' }
            }
        },
        // センター前ヒット
        cf_hit: {
            description: '走者なし - センター前ヒット',
            movements: {
                1: { role: 'backup', x: 250, y: 200, desc: '二次送球バックアップ' },
                2: { role: 'wait', x: 250, y: 470, desc: '本塁待機' },
                3: { role: 'wait', x: 405, y: 305, desc: '定位置待機' },
                4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
                5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
                6: { role: 'cover', x: 200, y: 140, desc: '左中間側の中継' },
                7: { role: 'backup', x: 150, y: 80, desc: '左中間バックアップ' },
                8: { role: 'ball', x: 250, y: 20, desc: '打球処理・二塁送球' },
                9: { role: 'backup', x: 350, y: 80, desc: '右中間バックアップ' }
            }
        },
        // ライト前ヒット
        rf_hit: {
            description: '走者なし - ライト前ヒット',
            movements: {
                1: { role: 'backup', x: 250, y: 200, desc: '二次送球バックアップ' },
                2: { role: 'wait', x: 250, y: 470, desc: '本塁待機' },
                3: { role: 'wait', x: 405, y: 305, desc: '定位置待機' },
                4: { role: 'cover', x: 350, y: 180, desc: '中継プレー' },
                5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
                6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
                7: { role: 'backup', x: 150, y: 150, desc: '二次送球バックアップ' },
                8: { role: 'backup', x: 350, y: 80, desc: '右中間のバックアップ' },
                9: { role: 'ball', x: 440, y: 60, desc: '打球処理・二塁送球' }
            }
        },
        // レフトフライ
        lf_fly: {
            description: '走者なし - レフトフライ',
            movements: {
                1: { role: 'backup', x: 150, y: 250, desc: '送球バックアップ' },
                2: { role: 'wait', x: 250, y: 470, desc: '本塁待機' },
                3: { role: 'wait', x: 405, y: 305, desc: '定位置待機' },
                4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
                5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
                6: { role: 'cover', x: 150, y: 180, desc: '中継プレー' },
                7: { role: 'ball', x: 60, y: 60, desc: '飛球処理・捕球' },
                8: { role: 'backup', x: 150, y: 80, desc: 'バックアップ' },
                9: { role: 'wait', x: 440, y: 60, desc: '定位置待機' }
            }
        },
        // センターフライ
        cf_fly: {
            description: '走者なし - センターフライ',
            movements: {
                1: { role: 'backup', x: 250, y: 200, desc: '送球バックアップ' },
                2: { role: 'wait', x: 250, y: 470, desc: '本塁待機' },
                3: { role: 'wait', x: 405, y: 305, desc: '定位置待機' },
                4: { role: 'cover', x: 300, y: 140, desc: '右中間側の中継' },
                5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
                6: { role: 'cover', x: 200, y: 140, desc: '左中間側の中継' },
                7: { role: 'backup', x: 150, y: 80, desc: 'バックアップ' },
                8: { role: 'ball', x: 250, y: 20, desc: '飛球処理・捕球' },
                9: { role: 'backup', x: 350, y: 80, desc: 'バックアップ' }
            }
        },
        // ライトフライ
        rf_fly: {
            description: '走者なし - ライトフライ',
            movements: {
                1: { role: 'backup', x: 350, y: 250, desc: '送球バックアップ' },
                2: { role: 'wait', x: 250, y: 470, desc: '本塁待機' },
                3: { role: 'wait', x: 405, y: 305, desc: '定位置待機' },
                4: { role: 'cover', x: 350, y: 180, desc: '中継プレー' },
                5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
                6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
                7: { role: 'wait', x: 60, y: 60, desc: '定位置待機' },
                8: { role: 'backup', x: 350, y: 80, desc: 'バックアップ' },
                9: { role: 'ball', x: 440, y: 60, desc: '飛球処理・捕球' }
            }
        }
    },
    
    // 走者一塁（主要パターンのみ）
    first: {
        // ショートゴロ
        ss_grounder: {
            description: '走者一塁 - ショート正面ゴロ',
            movements: {
                1: { role: 'wait', x: 250, y: 310, desc: '定位置待機' },
                2: { role: 'wait', x: 250, y: 485, desc: '定位置待機' },
                3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認・送球先準備' },
                4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
                5: { role: 'cover', x: 120, y: 240, desc: '打球処理カバー' },
                6: { role: 'ball', x: 165, y: 195, desc: '打球処理・二塁送球判断' },
                7: { role: 'backup', x: 90, y: 140, desc: '打球処理バックアップ' },
                8: { role: 'backup', x: 250, y: 80, desc: '二塁バックアップ' },
                9: { role: 'wait', x: 440, y: 60, desc: '定位置待機' }
            }
        },
        // レフト前ヒット
        lf_hit: {
            description: '走者一塁 - レフト前ヒット',
            movements: {
                1: { role: 'backup', x: 150, y: 350, desc: '三塁または本塁のバックアップ' },
                2: { role: 'wait', x: 250, y: 470, desc: '本塁待機・二次プレー準備' },
                3: { role: 'wait', x: 405, y: 305, desc: '定位置待機' },
                4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
                5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
                6: { role: 'cover', x: 150, y: 180, desc: '中継プレー' },
                7: { role: 'ball', x: 60, y: 60, desc: '打球処理・三塁送球' },
                8: { role: 'backup', x: 150, y: 80, desc: '左中間のバックアップ' },
                9: { role: 'backup', x: 350, y: 150, desc: '二次送球バックアップ' }
            }
        }
    },
    
    // 走者二塁（主要パターンのみ）
    second: {
        // ショートゴロ
        ss_grounder: {
            description: '走者二塁 - ショート正面ゴロ',
            movements: {
                1: { role: 'backup', x: 350, y: 340, desc: '一塁送球バックアップ' },
                2: { role: 'backup', x: 480, y: 320, desc: '一塁悪送球のバックアップ' },
                3: { role: 'base', x: 430, y: 290, desc: '一塁ベースカバー' },
                4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
                5: { role: 'cover', x: 120, y: 240, desc: '打球処理カバー' },
                6: { role: 'ball', x: 165, y: 195, desc: '打球処理・一塁送球判断' },
                7: { role: 'cover', x: 90, y: 140, desc: '打球処理カバー' },
                8: { role: 'backup', x: 250, y: 80, desc: '二次送球バックアップ' },
                9: { role: 'backup', x: 470, y: 340, desc: '一塁悪送球のバックアップ' }
            }
        }
    },
    
    // 走者三塁（主要パターンのみ）
    third: {
        // ショートゴロ（前進守備）
        ss_grounder: {
            description: '走者三塁 - ショートゴロ（前進守備）',
            movements: {
                1: { role: 'backup', x: 250, y: 420, desc: '本塁バックアップ' },
                2: { role: 'base', x: 250, y: 470, desc: '本塁ベースカバー・走者タッグ' },
                3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認' },
                4: { role: 'wait', x: 335, y: 195, desc: '定位置待機' },
                5: { role: 'cover', x: 150, y: 350, desc: '前進守備・本塁送球の中継/バックアップ' },
                6: { role: 'ball', x: 165, y: 195, desc: '打球処理・本塁送球判断' },
                7: { role: 'cover', x: 90, y: 140, desc: '打球処理カバー' },
                8: { role: 'backup', x: 250, y: 400, desc: '本塁後方バックアップ' },
                9: { role: 'wait', x: 440, y: 60, desc: '定位置待機' }
            }
        }
    }
};
