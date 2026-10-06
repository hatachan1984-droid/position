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

// 打球パターン（走者状況ごとに異なる選択肢）
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

// カバーリング・バックアップデータ
// 役割タイプ: 'ball' (打球処理), 'cover' (カバーリング), 'backup' (バックアップ), 'base' (ベースカバー)
const coveringData = {
    // 走者なし
    none: {
        ss_grounder: {
            description: 'ショート正面ゴロ（走者なし）',
            movements: {
                1: { role: 'backup', target: { x: 300, y: 250 }, desc: '一塁送球のバックアップ' },
                2: { role: 'none', target: null, desc: 'ホームベース付近で待機' },
                3: { role: 'base', target: { x: 445, y: 250 }, desc: '一塁ベースカバー' },
                4: { role: 'cover', target: { x: 200, y: 180 }, desc: '二塁ベースカバー（牽制に備える）' },
                5: { role: 'none', target: null, desc: '三塁方向の打球に備える' },
                6: { role: 'ball', target: null, desc: '打球処理、一塁送球' },
                7: { role: 'backup', target: { x: 120, y: 180 }, desc: 'ショートのバックアップ' },
                8: { role: 'backup', target: { x: 200, y: 100 }, desc: 'ショートのバックアップ' },
                9: { role: 'backup', target: { x: 480, y: 200 }, desc: '一塁送球のバックアップ' }
            }
        },
        '2b_grounder': {
            description: 'セカンド正面ゴロ（走者なし）',
            movements: {
                1: { role: 'backup', target: { x: 300, y: 250 }, desc: '一塁送球のバックアップ' },
                2: { role: 'none', target: null, desc: 'ホームベース付近で待機' },
                3: { role: 'base', target: { x: 445, y: 250 }, desc: '一塁ベースカバー' },
                4: { role: 'ball', target: null, desc: '打球処理、一塁送球' },
                5: { role: 'none', target: null, desc: '三塁方向の打球に備える' },
                6: { role: 'cover', target: { x: 250, y: 50 }, desc: '二塁ベースカバー' },
                7: { role: 'backup', target: { x: 280, y: 220 }, desc: 'セカンドのバックアップ' },
                8: { role: 'backup', target: { x: 320, y: 120 }, desc: 'セカンドのバックアップ' },
                9: { role: 'backup', target: { x: 480, y: 200 }, desc: '一塁送球のバックアップ' }
            }
        },
        '3b_grounder': {
            description: 'サード正面ゴロ（走者なし）',
            movements: {
                1: { role: 'backup', target: { x: 300, y: 250 }, desc: '一塁送球のバックアップ' },
                2: { role: 'none', target: null, desc: 'ホームベース付近で待機' },
                3: { role: 'base', target: { x: 445, y: 250 }, desc: '一塁ベースカバー' },
                4: { role: 'cover', target: { x: 250, y: 50 }, desc: '二塁ベースカバー' },
                5: { role: 'ball', target: null, desc: '打球処理、一塁送球' },
                6: { role: 'cover', target: { x: 50, y: 250 }, desc: '三塁ベースカバー' },
                7: { role: 'backup', target: { x: 80, y: 260 }, desc: 'サードのバックアップ' },
                8: { role: 'backup', target: { x: 150, y: 200 }, desc: 'サードのバックアップ' },
                9: { role: 'backup', target: { x: 480, y: 200 }, desc: '一塁送球のバックアップ' }
            }
        },
        '1b_grounder': {
            description: 'ファースト正面ゴロ（走者なし）',
            movements: {
                1: { role: 'base', target: { x: 445, y: 250 }, desc: '一塁ベースカバー' },
                2: { role: 'none', target: null, desc: 'ホームベース付近で待機' },
                3: { role: 'ball', target: null, desc: '打球処理、ピッチャーへトス' },
                4: { role: 'cover', target: { x: 350, y: 250 }, desc: 'ファーストのカバーリング' },
                5: { role: 'none', target: null, desc: '三塁方向の打球に備える' },
                6: { role: 'cover', target: { x: 250, y: 50 }, desc: '二塁ベースカバー' },
                7: { role: 'none', target: null, desc: 'レフト定位置' },
                8: { role: 'backup', target: { x: 350, y: 150 }, desc: 'ファーストのバックアップ' },
                9: { role: 'backup', target: { x: 420, y: 280 }, desc: 'ファーストのバックアップ' }
            }
        },
        lf_hit: {
            description: 'レフト前ヒット（走者なし）',
            movements: {
                1: { role: 'backup', target: { x: 250, y: 200 }, desc: '二塁送球のバックアップ' },
                2: { role: 'backup', target: { x: 250, y: 350 }, desc: '本塁送球のバックアップ' },
                3: { role: 'backup', target: { x: 380, y: 280 }, desc: '一塁ベース付近で待機' },
                4: { role: 'cover', target: { x: 250, y: 50 }, desc: '二塁ベースカバー（中継）' },
                5: { role: 'cover', target: { x: 50, y: 250 }, desc: '三塁ベースカバー' },
                6: { role: 'cover', target: { x: 150, y: 150 }, desc: '二塁送球の中継' },
                7: { role: 'ball', target: null, desc: '打球処理、二塁方向送球' },
                8: { role: 'backup', target: { x: 150, y: 80 }, desc: 'レフトのバックアップ' },
                9: { role: 'none', target: null, desc: 'ライト定位置' }
            }
        },
        cf_hit: {
            description: 'センター前ヒット（走者なし）',
            movements: {
                1: { role: 'backup', target: { x: 250, y: 200 }, desc: '二塁送球のバックアップ' },
                2: { role: 'backup', target: { x: 250, y: 350 }, desc: '本塁送球のバックアップ' },
                3: { role: 'backup', target: { x: 380, y: 280 }, desc: '一塁ベース付近で待機' },
                4: { role: 'cover', target: { x: 280, y: 140 }, desc: '二塁送球の中継' },
                5: { role: 'cover', target: { x: 50, y: 250 }, desc: '三塁ベースカバー' },
                6: { role: 'cover', target: { x: 250, y: 50 }, desc: '二塁ベースカバー' },
                7: { role: 'backup', target: { x: 150, y: 80 }, desc: 'センターのバックアップ' },
                8: { role: 'ball', target: null, desc: '打球処理、二塁方向送球' },
                9: { role: 'backup', target: { x: 350, y: 80 }, desc: 'センターのバックアップ' }
            }
        },
        rf_hit: {
            description: 'ライト前ヒット（走者なし）',
            movements: {
                1: { role: 'backup', target: { x: 250, y: 200 }, desc: '二塁送球のバックアップ' },
                2: { role: 'backup', target: { x: 250, y: 350 }, desc: '本塁送球のバックアップ' },
                3: { role: 'cover', target: { x: 450, y: 250 }, desc: '一塁ベースカバー' },
                4: { role: 'cover', target: { x: 320, y: 140 }, desc: '二塁送球の中継' },
                5: { role: 'cover', target: { x: 50, y: 250 }, desc: '三塁ベースカバー' },
                6: { role: 'cover', target: { x: 250, y: 50 }, desc: '二塁ベースカバー' },
                7: { role: 'none', target: null, desc: 'レフト定位置' },
                8: { role: 'backup', target: { x: 350, y: 80 }, desc: 'ライトのバックアップ' },
                9: { role: 'ball', target: null, desc: '打球処理、二塁方向送球' }
            }
        },
        lf_fly: {
            description: 'レフトフライ（走者なし）',
            movements: {
                1: { role: 'none', target: null, desc: 'マウンド付近で待機' },
                2: { role: 'none', target: null, desc: 'ホームベース付近で待機' },
                3: { role: 'none', target: null, desc: '一塁ベース付近で待機' },
                4: { role: 'cover', target: { x: 250, y: 50 }, desc: '二塁ベースカバー' },
                5: { role: 'cover', target: { x: 50, y: 250 }, desc: '三塁ベースカバー' },
                6: { role: 'backup', target: { x: 120, y: 120 }, desc: 'レフトのバックアップ' },
                7: { role: 'ball', target: null, desc: 'フライ捕球' },
                8: { role: 'backup', target: { x: 150, y: 90 }, desc: 'レフトのバックアップ' },
                9: { role: 'none', target: null, desc: 'ライト定位置' }
            }
        },
        cf_fly: {
            description: 'センターフライ（走者なし）',
            movements: {
                1: { role: 'none', target: null, desc: 'マウンド付近で待機' },
                2: { role: 'none', target: null, desc: 'ホームベース付近で待機' },
                3: { role: 'none', target: null, desc: '一塁ベース付近で待機' },
                4: { role: 'cover', target: { x: 250, y: 50 }, desc: '二塁ベースカバー' },
                5: { role: 'none', target: null, desc: '三塁ベース付近で待機' },
                6: { role: 'backup', target: { x: 200, y: 80 }, desc: 'センターのバックアップ' },
                7: { role: 'backup', target: { x: 150, y: 70 }, desc: 'センターのバックアップ' },
                8: { role: 'ball', target: null, desc: 'フライ捕球' },
                9: { role: 'backup', target: { x: 350, y: 70 }, desc: 'センターのバックアップ' }
            }
        },
        rf_fly: {
            description: 'ライトフライ（走者なし）',
            movements: {
                1: { role: 'none', target: null, desc: 'マウンド付近で待機' },
                2: { role: 'none', target: null, desc: 'ホームベース付近で待機' },
                3: { role: 'cover', target: { x: 450, y: 250 }, desc: '一塁ベースカバー' },
                4: { role: 'backup', target: { x: 380, y: 120 }, desc: 'ライトのバックアップ' },
                5: { role: 'none', target: null, desc: '三塁ベース付近で待機' },
                6: { role: 'cover', target: { x: 250, y: 50 }, desc: '二塁ベースカバー' },
                7: { role: 'none', target: null, desc: 'レフト定位置' },
                8: { role: 'backup', target: { x: 300, y: 90 }, desc: 'ライトのバックアップ' },
                9: { role: 'ball', target: null, desc: 'フライ捕球' }
            }
        }
    },
    
    // 走者一塁
    first: {
        ss_grounder: {
            description: 'ショート正面ゴロ（走者一塁）',
            movements: {
                1: { role: 'backup', target: { x: 350, y: 150 }, desc: '二塁送球のバックアップ' },
                2: { role: 'backup', target: { x: 250, y: 380 }, desc: '本塁送球のバックアップ' },
                3: { role: 'base', target: { x: 445, y: 250 }, desc: '一塁ベースカバー（ゲッツー）' },
                4: { role: 'base', target: { x: 250, y: 50 }, desc: '二塁ベースカバー（ゲッツー）' },
                5: { role: 'cover', target: { x: 50, y: 250 }, desc: '三塁ベースカバー' },
                6: { role: 'ball', target: null, desc: '打球処理、二塁送球でゲッツー狙い' },
                7: { role: 'backup', target: { x: 100, y: 150 }, desc: '遊撃手のバックアップ' },
                8: { role: 'backup', target: { x: 200, y: 100 }, desc: '二塁送球のバックアップ' },
                9: { role: 'backup', target: { x: 480, y: 200 }, desc: '一塁ベースのバックアップ' }
            }
        },
        '2b_grounder': {
            description: 'セカンド正面ゴロ（走者一塁）',
            movements: {
                1: { role: 'backup', target: { x: 350, y: 150 }, desc: '二塁送球のバックアップ' },
                2: { role: 'backup', target: { x: 250, y: 380 }, desc: '本塁送球のバックアップ' },
                3: { role: 'base', target: { x: 445, y: 250 }, desc: '一塁ベースカバー（ゲッツー）' },
                4: { role: 'ball', target: null, desc: '打球処理、二塁送球でゲッツー狙い' },
                5: { role: 'cover', target: { x: 50, y: 250 }, desc: '三塁ベースカバー' },
                6: { role: 'base', target: { x: 250, y: 50 }, desc: '二塁ベースカバー（ゲッツー）' },
                7: { role: 'backup', target: { x: 280, y: 220 }, desc: '二塁手のバックアップ' },
                8: { role: 'backup', target: { x: 300, y: 120 }, desc: '二塁送球のバックアップ' },
                9: { role: 'backup', target: { x: 480, y: 200 }, desc: '一塁ベースのバックアップ' }
            }
        },
        lf_hit: {
            description: 'レフト前ヒット（走者一塁）',
            movements: {
                1: { role: 'backup', target: { x: 50, y: 200 }, desc: '三塁送球のバックアップ' },
                2: { role: 'backup', target: { x: 250, y: 380 }, desc: '本塁送球のバックアップ' },
                3: { role: 'backup', target: { x: 450, y: 280 }, desc: '一塁ベース付近で待機' },
                4: { role: 'cover', target: { x: 250, y: 50 }, desc: '二塁ベースカバー' },
                5: { role: 'base', target: { x: 50, y: 250 }, desc: '三塁ベースカバー' },
                6: { role: 'cover', target: { x: 120, y: 180 }, desc: '三塁送球の中継' },
                7: { role: 'ball', target: null, desc: '打球処理、三塁方向送球' },
                8: { role: 'backup', target: { x: 150, y: 100 }, desc: 'レフトのバックアップ' },
                9: { role: 'none', target: null, desc: 'ライト定位置' }
            }
        },
        cf_hit: {
            description: 'センター前ヒット（走者一塁）',
            movements: {
                1: { role: 'backup', target: { x: 50, y: 200 }, desc: '三塁送球のバックアップ' },
                2: { role: 'backup', target: { x: 250, y: 380 }, desc: '本塁送球のバックアップ' },
                3: { role: 'backup', target: { x: 450, y: 280 }, desc: '一塁ベース付近で待機' },
                4: { role: 'cover', target: { x: 250, y: 50 }, desc: '二塁ベースカバー' },
                5: { role: 'base', target: { x: 50, y: 250 }, desc: '三塁ベースカバー' },
                6: { role: 'cover', target: { x: 180, y: 140 }, desc: '三塁送球の中継' },
                7: { role: 'backup', target: { x: 150, y: 100 }, desc: 'センターのバックアップ' },
                8: { role: 'ball', target: null, desc: '打球処理、三塁方向送球' },
                9: { role: 'backup', target: { x: 350, y: 100 }, desc: 'センターのバックアップ' }
            }
        },
        rf_hit: {
            description: 'ライト前ヒット（走者一塁）',
            movements: {
                1: { role: 'backup', target: { x: 50, y: 200 }, desc: '三塁送球のバックアップ' },
                2: { role: 'backup', target: { x: 250, y: 380 }, desc: '本塁送球のバックアップ' },
                3: { role: 'cover', target: { x: 450, y: 250 }, desc: '一塁ベースカバー' },
                4: { role: 'cover', target: { x: 300, y: 160 }, desc: '三塁送球の中継' },
                5: { role: 'base', target: { x: 50, y: 250 }, desc: '三塁ベースカバー' },
                6: { role: 'cover', target: { x: 250, y: 50 }, desc: '二塁ベースカバー' },
                7: { role: 'none', target: null, desc: 'レフト定位置' },
                8: { role: 'backup', target: { x: 350, y: 100 }, desc: 'ライトのバックアップ' },
                9: { role: 'ball', target: null, desc: '打球処理、三塁方向送球' }
            }
        }
    },
    
    // 走者三塁（代表的なパターン）
    third: {
        ss_grounder: {
            description: 'ショート正面ゴロ（走者三塁）',
            movements: {
                1: { role: 'backup', target: { x: 280, y: 380 }, desc: '本塁送球のバックアップ' },
                2: { role: 'base', target: { x: 250, y: 450 }, desc: '本塁でタッチプレー準備' },
                3: { role: 'base', target: { x: 445, y: 250 }, desc: '一塁ベースカバー' },
                4: { role: 'cover', target: { x: 250, y: 50 }, desc: '二塁ベースカバー' },
                5: { role: 'cover', target: { x: 50, y: 250 }, desc: '三塁ベースカバー' },
                6: { role: 'ball', target: null, desc: '打球処理、本塁送球' },
                7: { role: 'backup', target: { x: 100, y: 180 }, desc: '遊撃手のバックアップ' },
                8: { role: 'backup', target: { x: 200, y: 150 }, desc: '遊撃手のバックアップ' },
                9: { role: 'backup', target: { x: 350, y: 380 }, desc: '本塁送球のバックアップ' }
            }
        },
        lf_fly: {
            description: 'レフトフライ（走者三塁）',
            movements: {
                1: { role: 'cover', target: { x: 180, y: 320 }, desc: '本塁送球の中継準備' },
                2: { role: 'base', target: { x: 250, y: 450 }, desc: '本塁でタッチプレー準備' },
                3: { role: 'backup', target: { x: 380, y: 380 }, desc: '本塁のバックアップ' },
                4: { role: 'cover', target: { x: 250, y: 50 }, desc: '二塁ベースカバー' },
                5: { role: 'cover', target: { x: 50, y: 250 }, desc: '三塁ベースカバー（タッチアップ後）' },
                6: { role: 'cover', target: { x: 120, y: 200 }, desc: '本塁送球の中継' },
                7: { role: 'ball', target: null, desc: 'フライ捕球、本塁送球' },
                8: { role: 'backup', target: { x: 180, y: 100 }, desc: 'レフトのバックアップ' },
                9: { role: 'none', target: null, desc: 'ライト定位置' }
            }
        }
    }
};

// より多くのパターンを追加（簡略化のため基本パターンのみ実装）
// 実際には走者二塁、満塁など、すべての組み合わせを定義する必要があります
