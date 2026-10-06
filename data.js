// ⚾ 寺町トンネルズ カバーリング・バックアップ学習アプリ
// データ定義ファイル（CSVベース・正式版）

// ポジション定義（画面座標）
const positions = {
  1: { name: 'ピッチャー', abbr: 'P', x: 250, y: 310 },
  2: { name: 'キャッチャー', abbr: 'C', x: 250, y: 485 },
  3: { name: 'ファースト', abbr: '1B', x: 405, y: 305 },
  4: { name: 'セカンド', abbr: '2B', x: 335, y: 195 },
  5: { name: 'サード', abbr: '3B', x: 95, y: 305 },
  6: { name: 'ショート', abbr: 'SS', x: 165, y: 195 },
  7: { name: 'レフト', abbr: 'LF', x: 60, y: 60 },
  8: { name: 'センター', abbr: 'CF', x: 250, y: 20 },
  9: { name: 'ライト', abbr: 'RF', x: 440, y: 60 }
};

// ベース座標
const bases = {
  home: { x: 250, y: 470 },
  first: { x: 430, y: 290 },
  second: { x: 250, y: 110 },
  third: { x: 70, y: 290 }
};

// 走者パターン
const runnerPatterns = [
  { key: 'none', label: '走者なし' },
  { key: 'first', label: '一塁' },
  { key: 'second', label: '二塁' },
  { key: 'third', label: '三塁' },
  { key: 'first_second', label: '一二塁' },
  { key: 'first_third', label: '一三塁' },
  { key: 'second_third', label: '二三塁' },
  { key: 'loaded', label: '満塁' }
];

// 打球パターン
const ballPatterns = [
  { key: 'ss_grounder', label: 'ショート正面ゴロ' },
  { key: '2b_grounder', label: 'セカンド正面ゴロ' },
  { key: '3b_grounder', label: 'サード正面ゴロ' },
  { key: '1b_grounder', label: 'ファースト正面ゴロ' },
  { key: 'lf_hit', label: 'レフト前ヒット' },
  { key: 'cf_hit', label: 'センター前ヒット' },
  { key: 'rf_hit', label: 'ライト前ヒット' },
  { key: 'lf_fly', label: 'レフトフライ' },
  { key: 'cf_fly', label: 'センターフライ' },
  { key: 'rf_fly', label: 'ライトフライ' }
];

// カバーリングデータ（CSVから生成）
const coveringData = {
  // ========================================
  // 走者なし
  // ========================================
  'none-ss_grounder': {
    1: { role: 'backup', x: 350, y: 340, desc: '一塁送球バックアップ' },
    2: { role: 'backup', x: 480, y: 320, desc: '一塁悪送球のバックアップ' },
    3: { role: 'base', x: 430, y: 290, desc: '一塁ベースカバー' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'cover', x: 95, y: 305, desc: '打球処理カバー' },
    6: { role: 'ball', x: 165, y: 195, desc: '打球処理・一塁送球判断' },
    7: { role: 'cover', x: 60, y: 60, desc: '打球処理カバー' },
    8: { role: 'backup', x: 250, y: 20, desc: '二次送球バックアップ' },
    9: { role: 'backup', x: 480, y: 90, desc: '一塁悪送球のバックアップ' }
  },
  'none-2b_grounder': {
    1: { role: 'backup', x: 350, y: 340, desc: '一塁送球バックアップ' },
    2: { role: 'backup', x: 480, y: 320, desc: '一塁悪送球のバックアップ' },
    3: { role: 'base', x: 430, y: 290, desc: '一塁ベースカバー' },
    4: { role: 'ball', x: 335, y: 195, desc: '打球処理・一塁送球判断' },
    5: { role: 'wait', x: 95, y: 305, desc: '待機' },
    6: { role: 'cover', x: 165, y: 195, desc: '二遊間の打球処理カバー' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁後方バックアップ' },
    9: { role: 'backup', x: 480, y: 90, desc: '一塁悪送球のバックアップ' }
  },
  'none-3b_grounder': {
    1: { role: 'backup', x: 350, y: 340, desc: '一塁送球バックアップ' },
    2: { role: 'backup', x: 480, y: 320, desc: '一塁悪送球のバックアップ' },
    3: { role: 'base', x: 430, y: 290, desc: '一塁ベースカバー' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'ball', x: 95, y: 305, desc: '打球処理・一塁送球判断' },
    6: { role: 'cover', x: 165, y: 195, desc: '三遊間の打球処理カバー' },
    7: { role: 'backup', x: 30, y: 100, desc: '三塁側バックアップ' },
    8: { role: 'wait', x: 250, y: 20, desc: '待機' },
    9: { role: 'backup', x: 480, y: 90, desc: '一塁悪送球のバックアップ' }
  },
  'none-1b_grounder': {
    1: { role: 'base', x: 430, y: 290, desc: '一塁ベースカバー' },
    2: { role: 'backup', x: 480, y: 320, desc: '一塁悪送球のバックアップ' },
    3: { role: 'ball', x: 405, y: 305, desc: '打球処理・一塁送球判断' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'wait', x: 95, y: 305, desc: '待機' },
    6: { role: 'wait', x: 165, y: 195, desc: '待機' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'wait', x: 250, y: 20, desc: '待機' },
    9: { role: 'backup', x: 460, y: 140, desc: '一塁悪送球のバックアップ' }
  },
  'none-lf_hit': {
    1: { role: 'backup', x: 250, y: 200, desc: '二次送球バックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '中継プレー' },
    7: { role: 'ball', x: 60, y: 60, desc: '打球処理・二塁送球' },
    8: { role: 'backup', x: 150, y: 40, desc: '左中間のバックアップ' },
    9: { role: 'backup', x: 250, y: 200, desc: '二次送球バックアップ' }
  },
  'none-cf_hit': {
    1: { role: 'backup', x: 250, y: 200, desc: '二次送球バックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'cover', x: 380, y: 150, desc: '右中間側の中継・二塁カバー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '左中間側の中継' },
    7: { role: 'backup', x: 150, y: 40, desc: '左中間バックアップ' },
    8: { role: 'ball', x: 250, y: 20, desc: '打球処理・二塁送球' },
    9: { role: 'backup', x: 350, y: 40, desc: '右中間バックアップ' }
  },
  'none-rf_hit': {
    1: { role: 'backup', x: 250, y: 200, desc: '二次送球バックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'cover', x: 380, y: 150, desc: '中継プレー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'backup', x: 250, y: 200, desc: '二次送球バックアップ' },
    8: { role: 'backup', x: 350, y: 40, desc: '右中間のバックアップ' },
    9: { role: 'ball', x: 440, y: 60, desc: '打球処理・二塁送球' }
  },
  'none-lf_fly': {
    1: { role: 'backup', x: 250, y: 200, desc: '二次送球バックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '中継プレー' },
    7: { role: 'ball', x: 60, y: 60, desc: '飛球処理・捕球後二塁送球判断' },
    8: { role: 'backup', x: 150, y: 40, desc: '左中間のバックアップ' },
    9: { role: 'backup', x: 250, y: 200, desc: '二次送球バックアップ' }
  },
  'none-cf_fly': {
    1: { role: 'backup', x: 250, y: 200, desc: '二次送球バックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'cover', x: 380, y: 150, desc: '右中間側の中継' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '左中間側の中継' },
    7: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    8: { role: 'ball', x: 250, y: 20, desc: '飛球処理・捕球後二塁送球判断' },
    9: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' }
  },
  'none-rf_fly': {
    1: { role: 'backup', x: 250, y: 200, desc: '二次送球バックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'cover', x: 380, y: 150, desc: '中継プレー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'wait', x: 165, y: 195, desc: '待機' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' },
    9: { role: 'ball', x: 440, y: 60, desc: '飛球処理・捕球後二塁送球判断' }
  },

  // ========================================
  // 走者一塁
  // ========================================
  'first-ss_grounder': {
    1: { role: 'wait', x: 250, y: 310, desc: '待機' },
    2: { role: 'wait', x: 250, y: 485, desc: '待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認・送球先準備' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'cover', x: 95, y: 305, desc: '打球処理カバー' },
    6: { role: 'ball', x: 165, y: 195, desc: '打球処理・二塁送球判断' },
    7: { role: 'cover', x: 60, y: 60, desc: '打球処理カバー' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'first-2b_grounder': {
    1: { role: 'wait', x: 250, y: 310, desc: '待機' },
    2: { role: 'wait', x: 250, y: 485, desc: '待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認・送球先準備' },
    4: { role: 'ball', x: 335, y: 195, desc: '打球処理・二塁送球判断' },
    5: { role: 'wait', x: 95, y: 305, desc: '待機' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁バックアップ' },
    9: { role: 'backup', x: 440, y: 60, desc: '打球処理バックアップ' }
  },
  'first-3b_grounder': {
    1: { role: 'wait', x: 250, y: 310, desc: '待機' },
    2: { role: 'wait', x: 250, y: 485, desc: '待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認・送球先準備' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'ball', x: 95, y: 305, desc: '打球処理・二塁送球判断' },
    6: { role: 'cover', x: 165, y: 195, desc: '三遊間の打球処理カバー' },
    7: { role: 'backup', x: 30, y: 100, desc: '打球処理バックアップ' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'first-1b_grounder': {
    1: { role: 'wait', x: 250, y: 310, desc: '待機' },
    2: { role: 'wait', x: 250, y: 485, desc: '待機' },
    3: { role: 'ball', x: 405, y: 305, desc: '打球処理・二塁送球判断' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'wait', x: 95, y: 305, desc: '待機' },
    6: { role: 'wait', x: 165, y: 195, desc: '待機' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁バックアップ' },
    9: { role: 'backup', x: 460, y: 140, desc: '打球処理バックアップ' }
  },
  'first-lf_hit': {
    1: { role: 'backup', x: 180, y: 250, desc: '三塁または本塁のバックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機・二次プレー準備' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '中継プレー' },
    7: { role: 'ball', x: 60, y: 60, desc: '打球処理・三塁送球' },
    8: { role: 'backup', x: 150, y: 40, desc: '左中間のバックアップ' },
    9: { role: 'backup', x: 250, y: 200, desc: '二次送球バックアップ' }
  },
  'first-cf_hit': {
    1: { role: 'backup', x: 180, y: 250, desc: '三塁または本塁のバックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機・二次プレー準備' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'cover', x: 380, y: 150, desc: '右中間側の中継・二塁カバー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '左中間側の中継' },
    7: { role: 'backup', x: 150, y: 40, desc: '左中間バックアップ' },
    8: { role: 'ball', x: 250, y: 20, desc: '打球処理・三塁送球' },
    9: { role: 'backup', x: 350, y: 40, desc: '右中間バックアップ' }
  },
  'first-rf_hit': {
    1: { role: 'backup', x: 180, y: 250, desc: '三塁または本塁のバックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機・二次プレー準備' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'cover', x: 380, y: 150, desc: '中継プレー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'backup', x: 150, y: 200, desc: '二次送球バックアップ' },
    8: { role: 'backup', x: 350, y: 40, desc: '右中間のバックアップ' },
    9: { role: 'ball', x: 440, y: 60, desc: '打球処理・三塁送球' }
  },
  'first-lf_fly': {
    1: { role: 'backup', x: 180, y: 250, desc: '三塁または本塁のバックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機・二次プレー準備' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '中継プレー' },
    7: { role: 'ball', x: 60, y: 60, desc: '飛球処理・捕球後三塁送球判断' },
    8: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'first-cf_fly': {
    1: { role: 'backup', x: 180, y: 250, desc: '三塁または本塁のバックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機・二次プレー準備' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'cover', x: 380, y: 150, desc: '右中間側の中継' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '左中間側の中継' },
    7: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    8: { role: 'ball', x: 250, y: 20, desc: '飛球処理・捕球後三塁送球判断' },
    9: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' }
  },
  'first-rf_fly': {
    1: { role: 'backup', x: 180, y: 250, desc: '三塁または本塁のバックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機・二次プレー準備' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'cover', x: 380, y: 150, desc: '中継プレー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'wait', x: 165, y: 195, desc: '待機' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' },
    9: { role: 'ball', x: 440, y: 60, desc: '飛球処理・捕球後三塁送球判断' }
  },

  // ========================================
  // 走者二塁
  // ========================================
  'second-ss_grounder': {
    1: { role: 'backup', x: 350, y: 340, desc: '一塁送球バックアップ' },
    2: { role: 'backup', x: 480, y: 320, desc: '一塁悪送球のバックアップ' },
    3: { role: 'base', x: 430, y: 290, desc: '一塁ベースカバー' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'cover', x: 95, y: 305, desc: '打球処理カバー' },
    6: { role: 'ball', x: 165, y: 195, desc: '打球処理・一塁送球判断' },
    7: { role: 'cover', x: 60, y: 60, desc: '打球処理カバー' },
    8: { role: 'backup', x: 250, y: 20, desc: '二次送球バックアップ' },
    9: { role: 'backup', x: 480, y: 90, desc: '一塁悪送球のバックアップ' }
  },
  'second-2b_grounder': {
    1: { role: 'backup', x: 350, y: 340, desc: '一塁送球バックアップ' },
    2: { role: 'backup', x: 480, y: 320, desc: '一塁悪送球のバックアップ' },
    3: { role: 'base', x: 430, y: 290, desc: '一塁ベースカバー' },
    4: { role: 'ball', x: 335, y: 195, desc: '打球処理・一塁送球判断' },
    5: { role: 'wait', x: 95, y: 305, desc: '待機' },
    6: { role: 'cover', x: 165, y: 195, desc: '二遊間の打球処理カバー' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁後方バックアップ' },
    9: { role: 'backup', x: 480, y: 90, desc: '一塁悪送球のバックアップ' }
  },
  'second-3b_grounder': {
    1: { role: 'backup', x: 350, y: 340, desc: '一塁送球バックアップ' },
    2: { role: 'backup', x: 480, y: 320, desc: '一塁悪送球のバックアップ' },
    3: { role: 'base', x: 430, y: 290, desc: '一塁ベースカバー' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'ball', x: 95, y: 305, desc: '打球処理・一塁送球判断' },
    6: { role: 'cover', x: 165, y: 195, desc: '三遊間の打球処理カバー' },
    7: { role: 'backup', x: 30, y: 100, desc: '三塁側バックアップ' },
    8: { role: 'wait', x: 250, y: 20, desc: '待機' },
    9: { role: 'backup', x: 480, y: 90, desc: '一塁悪送球のバックアップ' }
  },
  'second-1b_grounder': {
    1: { role: 'base', x: 430, y: 290, desc: '一塁ベースカバー' },
    2: { role: 'backup', x: 480, y: 320, desc: '一塁悪送球のバックアップ' },
    3: { role: 'ball', x: 405, y: 305, desc: '打球処理・一塁送球判断' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'wait', x: 95, y: 305, desc: '待機' },
    6: { role: 'wait', x: 165, y: 195, desc: '待機' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'wait', x: 250, y: 20, desc: '待機' },
    9: { role: 'backup', x: 460, y: 140, desc: '一塁悪送球のバックアップ' }
  },
  'second-lf_hit': {
    1: { role: 'backup', x: 180, y: 250, desc: '三塁または本塁のバックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機・二次プレー準備' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '中継プレー' },
    7: { role: 'ball', x: 60, y: 60, desc: '打球処理・三塁送球' },
    8: { role: 'backup', x: 150, y: 40, desc: '左中間のバックアップ' },
    9: { role: 'backup', x: 250, y: 200, desc: '二次送球バックアップ' }
  },
  'second-cf_hit': {
    1: { role: 'backup', x: 180, y: 250, desc: '三塁または本塁のバックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機・二次プレー準備' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'cover', x: 380, y: 150, desc: '右中間側の中継・二塁カバー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '左中間側の中継' },
    7: { role: 'backup', x: 150, y: 40, desc: '左中間バックアップ' },
    8: { role: 'ball', x: 250, y: 20, desc: '打球処理・三塁送球' },
    9: { role: 'backup', x: 350, y: 40, desc: '右中間バックアップ' }
  },
  'second-rf_hit': {
    1: { role: 'backup', x: 180, y: 250, desc: '三塁または本塁のバックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機・二次プレー準備' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'cover', x: 380, y: 150, desc: '中継プレー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'backup', x: 150, y: 200, desc: '二次送球バックアップ' },
    8: { role: 'backup', x: 350, y: 40, desc: '右中間のバックアップ' },
    9: { role: 'ball', x: 440, y: 60, desc: '打球処理・三塁送球' }
  },
  'second-lf_fly': {
    1: { role: 'backup', x: 180, y: 250, desc: '本塁または三塁バックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'wait', x: 335, y: 195, desc: '待機' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '中継プレー' },
    7: { role: 'ball', x: 60, y: 60, desc: '飛球処理・捕球後三塁送球判断' },
    8: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'second-cf_fly': {
    1: { role: 'backup', x: 180, y: 250, desc: '本塁または三塁バックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'cover', x: 380, y: 150, desc: '右中間側の中継' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '左中間側の中継' },
    7: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    8: { role: 'ball', x: 250, y: 20, desc: '飛球処理・捕球後三塁送球判断' },
    9: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' }
  },
  'second-rf_fly': {
    1: { role: 'backup', x: 180, y: 250, desc: '本塁または三塁バックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'cover', x: 380, y: 150, desc: '中継プレー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'wait', x: 165, y: 195, desc: '待機' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' },
    9: { role: 'ball', x: 440, y: 60, desc: '飛球処理・捕球後三塁送球判断' }
  },

  // ========================================
  // 走者三塁
  // ========================================
  'third-ss_grounder': {
    1: { role: 'wait', x: 250, y: 310, desc: '待機' },
    2: { role: 'wait', x: 250, y: 485, desc: '待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認・送球先準備' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'cover', x: 95, y: 305, desc: '打球処理カバー' },
    6: { role: 'ball', x: 165, y: 195, desc: '打球処理・二塁送球判断' },
    7: { role: 'backup', x: 60, y: 60, desc: '打球処理バックアップ' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'third-2b_grounder': {
    1: { role: 'wait', x: 250, y: 310, desc: '待機' },
    2: { role: 'wait', x: 250, y: 485, desc: '待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認・送球先準備' },
    4: { role: 'ball', x: 335, y: 195, desc: '打球処理・二塁送球判断' },
    5: { role: 'wait', x: 95, y: 305, desc: '待機' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁バックアップ' },
    9: { role: 'backup', x: 440, y: 60, desc: '打球処理バックアップ' }
  },
  'third-3b_grounder': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー・走者タッグ' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認' },
    4: { role: 'wait', x: 335, y: 195, desc: '待機' },
    5: { role: 'ball', x: 95, y: 305, desc: '打球処理・本塁送球判断' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'backup', x: 30, y: 100, desc: '三塁側バックアップ' },
    8: { role: 'backup', x: 250, y: 530, desc: '本塁後方バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'third-1b_grounder': {
    1: { role: 'wait', x: 250, y: 310, desc: '待機' },
    2: { role: 'wait', x: 250, y: 485, desc: '待機' },
    3: { role: 'ball', x: 405, y: 305, desc: '打球処理・二塁送球判断' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'wait', x: 95, y: 305, desc: '待機' },
    6: { role: 'wait', x: 165, y: 195, desc: '待機' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁バックアップ' },
    9: { role: 'backup', x: 460, y: 140, desc: '打球処理バックアップ' }
  },
  'third-lf_hit': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁走者けん制準備' },
    4: { role: 'wait', x: 335, y: 195, desc: '待機' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '中継プレー' },
    7: { role: 'ball', x: 60, y: 60, desc: '飛球処理・捕球後本塁送球判断' },
    8: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'third-cf_hit': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁走者けん制準備' },
    4: { role: 'cover', x: 380, y: 150, desc: '右中間側の中継' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '左中間側の中継' },
    7: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    8: { role: 'ball', x: 250, y: 20, desc: '飛球処理・捕球後本塁送球判断' },
    9: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' }
  },
  'third-rf_hit': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁走者けん制準備' },
    4: { role: 'cover', x: 380, y: 150, desc: '中継プレー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' },
    9: { role: 'ball', x: 440, y: 60, desc: '飛球処理・捕球後本塁送球判断' }
  },
  'third-lf_fly': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁走者けん制準備' },
    4: { role: 'wait', x: 335, y: 195, desc: '待機' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '中継プレー' },
    7: { role: 'ball', x: 60, y: 60, desc: '飛球処理・捕球後本塁送球判断' },
    8: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'third-cf_fly': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁走者けん制準備' },
    4: { role: 'cover', x: 380, y: 150, desc: '右中間側の中継' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '左中間側の中継' },
    7: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    8: { role: 'ball', x: 250, y: 20, desc: '飛球処理・捕球後本塁送球判断' },
    9: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' }
  },
  'third-rf_fly': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁走者けん制準備' },
    4: { role: 'cover', x: 380, y: 150, desc: '中継プレー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' },
    9: { role: 'ball', x: 440, y: 60, desc: '飛球処理・捕球後本塁送球判断' }
  },

  // ========================================
  // 走者一二塁
  // ========================================
  'first_second-ss_grounder': {
    1: { role: 'wait', x: 250, y: 310, desc: '待機' },
    2: { role: 'wait', x: 250, y: 485, desc: '待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認・送球先準備' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'cover', x: 95, y: 305, desc: '打球処理カバー' },
    6: { role: 'ball', x: 165, y: 195, desc: '打球処理・二塁送球判断' },
    7: { role: 'backup', x: 60, y: 60, desc: '打球処理バックアップ' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'first_second-2b_grounder': {
    1: { role: 'wait', x: 250, y: 310, desc: '待機' },
    2: { role: 'wait', x: 250, y: 485, desc: '待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認・送球先準備' },
    4: { role: 'ball', x: 335, y: 195, desc: '打球処理・二塁送球判断' },
    5: { role: 'wait', x: 95, y: 305, desc: '待機' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁バックアップ' },
    9: { role: 'backup', x: 440, y: 60, desc: '打球処理バックアップ' }
  },
  'first_second-3b_grounder': {
    1: { role: 'wait', x: 250, y: 310, desc: '待機' },
    2: { role: 'wait', x: 250, y: 485, desc: '待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認' },
    4: { role: 'wait', x: 335, y: 195, desc: '待機' },
    5: { role: 'ball', x: 95, y: 305, desc: '打球処理・三塁送球判断' },
    6: { role: 'cover', x: 165, y: 195, desc: '遊撃後方のカバー' },
    7: { role: 'backup', x: 30, y: 100, desc: '三塁バックアップ' },
    8: { role: 'wait', x: 250, y: 20, desc: '待機' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'first_second-1b_grounder': {
    1: { role: 'wait', x: 250, y: 310, desc: '待機' },
    2: { role: 'wait', x: 250, y: 485, desc: '待機' },
    3: { role: 'ball', x: 405, y: 305, desc: '打球処理・二塁送球判断' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'wait', x: 95, y: 305, desc: '待機' },
    6: { role: 'wait', x: 165, y: 195, desc: '待機' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁バックアップ' },
    9: { role: 'backup', x: 460, y: 140, desc: '打球処理バックアップ' }
  },
  'first_second-lf_hit': {
    1: { role: 'backup', x: 250, y: 530, desc: '本塁後方バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '中継プレー' },
    7: { role: 'ball', x: 60, y: 60, desc: '打球処理・本塁送球' },
    8: { role: 'backup', x: 150, y: 40, desc: '左中間のバックアップ' },
    9: { role: 'backup', x: 250, y: 200, desc: '二次送球バックアップ' }
  },
  'first_second-cf_hit': {
    1: { role: 'backup', x: 250, y: 530, desc: '本塁後方バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認' },
    4: { role: 'cover', x: 380, y: 150, desc: '右中間側の中継・二塁カバー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '左中間側の中継' },
    7: { role: 'backup', x: 150, y: 40, desc: '左中間バックアップ' },
    8: { role: 'ball', x: 250, y: 20, desc: '打球処理・本塁送球' },
    9: { role: 'backup', x: 350, y: 40, desc: '右中間バックアップ' }
  },
  'first_second-rf_hit': {
    1: { role: 'backup', x: 250, y: 530, desc: '本塁後方バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認' },
    4: { role: 'cover', x: 380, y: 150, desc: '中継プレー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'backup', x: 150, y: 200, desc: '二次送球バックアップ' },
    8: { role: 'backup', x: 350, y: 40, desc: '右中間のバックアップ' },
    9: { role: 'ball', x: 440, y: 60, desc: '打球処理・本塁送球' }
  },
  'first_second-lf_fly': {
    1: { role: 'backup', x: 180, y: 250, desc: '本塁または三塁バックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'wait', x: 335, y: 195, desc: '待機' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '中継プレー' },
    7: { role: 'ball', x: 60, y: 60, desc: '飛球処理・捕球後三塁送球判断' },
    8: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'first_second-cf_fly': {
    1: { role: 'backup', x: 180, y: 250, desc: '本塁または三塁バックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'cover', x: 380, y: 150, desc: '右中間側の中継' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '左中間側の中継' },
    7: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    8: { role: 'ball', x: 250, y: 20, desc: '飛球処理・捕球後三塁送球判断' },
    9: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' }
  },
  'first_second-rf_fly': {
    1: { role: 'backup', x: 180, y: 250, desc: '本塁または三塁バックアップ' },
    2: { role: 'wait', x: 250, y: 485, desc: '本塁待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'cover', x: 380, y: 150, desc: '中継プレー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'wait', x: 165, y: 195, desc: '待機' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' },
    9: { role: 'ball', x: 440, y: 60, desc: '飛球処理・捕球後三塁送球判断' }
  },

  // ========================================
  // 走者一三塁
  // ========================================
  'first_third-ss_grounder': {
    1: { role: 'wait', x: 250, y: 310, desc: '待機' },
    2: { role: 'wait', x: 250, y: 485, desc: '待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認・送球先準備' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'cover', x: 95, y: 305, desc: '打球処理カバー' },
    6: { role: 'ball', x: 165, y: 195, desc: '打球処理・二塁送球判断' },
    7: { role: 'backup', x: 60, y: 60, desc: '打球処理バックアップ' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'first_third-2b_grounder': {
    1: { role: 'wait', x: 250, y: 310, desc: '待機' },
    2: { role: 'wait', x: 250, y: 485, desc: '待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認・送球先準備' },
    4: { role: 'ball', x: 335, y: 195, desc: '打球処理・二塁送球判断' },
    5: { role: 'wait', x: 95, y: 305, desc: '待機' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁バックアップ' },
    9: { role: 'backup', x: 440, y: 60, desc: '打球処理バックアップ' }
  },
  'first_third-3b_grounder': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー・走者タッグ' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認' },
    4: { role: 'wait', x: 335, y: 195, desc: '待機' },
    5: { role: 'ball', x: 95, y: 305, desc: '打球処理・本塁送球判断' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'backup', x: 30, y: 100, desc: '三塁側バックアップ' },
    8: { role: 'backup', x: 250, y: 530, desc: '本塁後方バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'first_third-1b_grounder': {
    1: { role: 'wait', x: 250, y: 310, desc: '待機' },
    2: { role: 'wait', x: 250, y: 485, desc: '待機' },
    3: { role: 'ball', x: 405, y: 305, desc: '打球処理・二塁送球判断' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'wait', x: 95, y: 305, desc: '待機' },
    6: { role: 'wait', x: 165, y: 195, desc: '待機' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁バックアップ' },
    9: { role: 'backup', x: 460, y: 140, desc: '打球処理バックアップ' }
  },
  'first_third-lf_hit': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁走者けん制準備' },
    4: { role: 'wait', x: 335, y: 195, desc: '待機' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '中継プレー' },
    7: { role: 'ball', x: 60, y: 60, desc: '飛球処理・捕球後本塁送球判断' },
    8: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'first_third-cf_hit': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁走者けん制準備' },
    4: { role: 'cover', x: 380, y: 150, desc: '右中間側の中継' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '左中間側の中継' },
    7: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    8: { role: 'ball', x: 250, y: 20, desc: '飛球処理・捕球後本塁送球判断' },
    9: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' }
  },
  'first_third-rf_hit': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁走者けん制準備' },
    4: { role: 'cover', x: 380, y: 150, desc: '中継プレー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' },
    9: { role: 'ball', x: 440, y: 60, desc: '飛球処理・捕球後本塁送球判断' }
  },
  'first_third-lf_fly': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁走者けん制準備' },
    4: { role: 'wait', x: 335, y: 195, desc: '待機' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '中継プレー' },
    7: { role: 'ball', x: 60, y: 60, desc: '飛球処理・捕球後本塁送球判断' },
    8: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'first_third-cf_fly': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁走者けん制準備' },
    4: { role: 'cover', x: 380, y: 150, desc: '右中間側の中継' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '左中間側の中継' },
    7: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    8: { role: 'ball', x: 250, y: 20, desc: '飛球処理・捕球後本塁送球判断' },
    9: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' }
  },
  'first_third-rf_fly': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁走者けん制準備' },
    4: { role: 'cover', x: 380, y: 150, desc: '中継プレー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' },
    9: { role: 'ball', x: 440, y: 60, desc: '飛球処理・捕球後本塁送球判断' }
  },

  // ========================================
  // 走者二三塁
  // ========================================
  'second_third-ss_grounder': {
    1: { role: 'wait', x: 250, y: 310, desc: '待機' },
    2: { role: 'wait', x: 250, y: 485, desc: '待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認・送球先準備' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'cover', x: 95, y: 305, desc: '打球処理カバー' },
    6: { role: 'ball', x: 165, y: 195, desc: '打球処理・二塁送球判断' },
    7: { role: 'backup', x: 60, y: 60, desc: '打球処理バックアップ' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'second_third-2b_grounder': {
    1: { role: 'wait', x: 250, y: 310, desc: '待機' },
    2: { role: 'wait', x: 250, y: 485, desc: '待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認・送球先準備' },
    4: { role: 'ball', x: 335, y: 195, desc: '打球処理・二塁送球判断' },
    5: { role: 'wait', x: 95, y: 305, desc: '待機' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁バックアップ' },
    9: { role: 'backup', x: 440, y: 60, desc: '打球処理バックアップ' }
  },
  'second_third-3b_grounder': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー・走者タッグ' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認' },
    4: { role: 'wait', x: 335, y: 195, desc: '待機' },
    5: { role: 'ball', x: 95, y: 305, desc: '打球処理・本塁送球判断' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'backup', x: 30, y: 100, desc: '三塁側バックアップ' },
    8: { role: 'backup', x: 250, y: 530, desc: '本塁後方バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'second_third-1b_grounder': {
    1: { role: 'wait', x: 250, y: 310, desc: '待機' },
    2: { role: 'wait', x: 250, y: 485, desc: '待機' },
    3: { role: 'ball', x: 405, y: 305, desc: '打球処理・二塁送球判断' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'wait', x: 95, y: 305, desc: '待機' },
    6: { role: 'wait', x: 165, y: 195, desc: '待機' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁バックアップ' },
    9: { role: 'backup', x: 460, y: 140, desc: '打球処理バックアップ' }
  },
  'second_third-lf_hit': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁走者けん制準備' },
    4: { role: 'wait', x: 335, y: 195, desc: '待機' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '中継プレー' },
    7: { role: 'ball', x: 60, y: 60, desc: '飛球処理・捕球後本塁送球判断' },
    8: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'second_third-cf_hit': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁走者けん制準備' },
    4: { role: 'cover', x: 380, y: 150, desc: '右中間側の中継' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '左中間側の中継' },
    7: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    8: { role: 'ball', x: 250, y: 20, desc: '飛球処理・捕球後本塁送球判断' },
    9: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' }
  },
  'second_third-rf_hit': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁走者けん制準備' },
    4: { role: 'cover', x: 380, y: 150, desc: '中継プレー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' },
    9: { role: 'ball', x: 440, y: 60, desc: '飛球処理・捕球後本塁送球判断' }
  },
  'second_third-lf_fly': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁走者けん制準備' },
    4: { role: 'wait', x: 335, y: 195, desc: '待機' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '中継プレー' },
    7: { role: 'ball', x: 60, y: 60, desc: '飛球処理・捕球後本塁送球判断' },
    8: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'second_third-cf_fly': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁走者けん制準備' },
    4: { role: 'cover', x: 380, y: 150, desc: '右中間側の中継' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '左中間側の中継' },
    7: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    8: { role: 'ball', x: 250, y: 20, desc: '飛球処理・捕球後本塁送球判断' },
    9: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' }
  },
  'second_third-rf_fly': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁走者けん制準備' },
    4: { role: 'cover', x: 380, y: 150, desc: '中継プレー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' },
    9: { role: 'ball', x: 440, y: 60, desc: '飛球処理・捕球後本塁送球判断' }
  },

  // ========================================
  // 走者満塁
  // ========================================
  'loaded-ss_grounder': {
    1: { role: 'wait', x: 250, y: 310, desc: '待機' },
    2: { role: 'wait', x: 250, y: 485, desc: '待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認・送球先準備' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'cover', x: 95, y: 305, desc: '打球処理カバー' },
    6: { role: 'ball', x: 165, y: 195, desc: '打球処理・二塁送球判断' },
    7: { role: 'backup', x: 60, y: 60, desc: '打球処理バックアップ' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'loaded-2b_grounder': {
    1: { role: 'wait', x: 250, y: 310, desc: '待機' },
    2: { role: 'wait', x: 250, y: 485, desc: '待機' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認・送球先準備' },
    4: { role: 'ball', x: 335, y: 195, desc: '打球処理・二塁送球判断' },
    5: { role: 'wait', x: 95, y: 305, desc: '待機' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁バックアップ' },
    9: { role: 'backup', x: 440, y: 60, desc: '打球処理バックアップ' }
  },
  'loaded-3b_grounder': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー・走者タッグ' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認' },
    4: { role: 'wait', x: 335, y: 195, desc: '待機' },
    5: { role: 'ball', x: 95, y: 305, desc: '打球処理・本塁送球判断' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'backup', x: 30, y: 100, desc: '三塁側バックアップ' },
    8: { role: 'backup', x: 250, y: 530, desc: '本塁後方バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'loaded-1b_grounder': {
    1: { role: 'wait', x: 250, y: 310, desc: '待機' },
    2: { role: 'wait', x: 250, y: 485, desc: '待機' },
    3: { role: 'ball', x: 405, y: 305, desc: '打球処理・二塁送球判断' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'wait', x: 95, y: 305, desc: '待機' },
    6: { role: 'wait', x: 165, y: 195, desc: '待機' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 250, y: 20, desc: '二塁バックアップ' },
    9: { role: 'backup', x: 460, y: 140, desc: '打球処理バックアップ' }
  },
  'loaded-lf_hit': {
    1: { role: 'backup', x: 250, y: 530, desc: '本塁後方バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認' },
    4: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '中継プレー' },
    7: { role: 'ball', x: 60, y: 60, desc: '打球処理・本塁送球' },
    8: { role: 'backup', x: 150, y: 40, desc: '左中間のバックアップ' },
    9: { role: 'backup', x: 250, y: 200, desc: '二次送球バックアップ' }
  },
  'loaded-cf_hit': {
    1: { role: 'backup', x: 250, y: 530, desc: '本塁後方バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認' },
    4: { role: 'cover', x: 380, y: 150, desc: '右中間側の中継・二塁カバー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '左中間側の中継' },
    7: { role: 'backup', x: 150, y: 40, desc: '左中間バックアップ' },
    8: { role: 'ball', x: 250, y: 20, desc: '打球処理・本塁送球' },
    9: { role: 'backup', x: 350, y: 40, desc: '右中間バックアップ' }
  },
  'loaded-rf_hit': {
    1: { role: 'backup', x: 250, y: 530, desc: '本塁後方バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '一塁残塁確認' },
    4: { role: 'cover', x: 380, y: 150, desc: '中継プレー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'backup', x: 150, y: 200, desc: '二次送球バックアップ' },
    8: { role: 'backup', x: 350, y: 40, desc: '右中間のバックアップ' },
    9: { role: 'ball', x: 440, y: 60, desc: '打球処理・本塁送球' }
  },
  'loaded-lf_fly': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'wait', x: 335, y: 195, desc: '待機' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '中継プレー' },
    7: { role: 'ball', x: 60, y: 60, desc: '飛球処理・捕球後本塁送球判断' },
    8: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    9: { role: 'wait', x: 440, y: 60, desc: '待機' }
  },
  'loaded-cf_fly': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'cover', x: 380, y: 150, desc: '右中間側の中継' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'cover', x: 120, y: 150, desc: '左中間側の中継' },
    7: { role: 'backup', x: 150, y: 40, desc: 'バックアップ' },
    8: { role: 'ball', x: 250, y: 20, desc: '飛球処理・捕球後本塁送球判断' },
    9: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' }
  },
  'loaded-rf_fly': {
    1: { role: 'backup', x: 250, y: 400, desc: '本塁バックアップ' },
    2: { role: 'base', x: 250, y: 485, desc: '本塁ベースカバー' },
    3: { role: 'wait', x: 405, y: 305, desc: '待機' },
    4: { role: 'cover', x: 380, y: 150, desc: '中継プレー' },
    5: { role: 'base', x: 70, y: 290, desc: '三塁ベースカバー' },
    6: { role: 'base', x: 250, y: 110, desc: '二塁ベースカバー' },
    7: { role: 'wait', x: 60, y: 60, desc: '待機' },
    8: { role: 'backup', x: 350, y: 40, desc: 'バックアップ' },
    9: { role: 'ball', x: 440, y: 60, desc: '飛球処理・捕球後本塁送球判断' }
  }
};
