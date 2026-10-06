// 走者一塁のフォーメーションデータ
const runnerFirstData = {
    // 投手牽制（一塁バックアップ）
    'p_pickoff_backup': {
        id: 'p_pickoff_backup',
        name: '投手牽制（一塁バックアップ）',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81_%E7%89%BD%E5%88%B6_%E6%8A%95%E6%89%8B.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-1pickoff-normal/',
        movements: {
            1: { desc: '牽制後、一塁ベースカバーまたはランダウンプレーに備える' },
            2: { desc: 'ホームベースで待機。悪送球に備える' },
            3: { desc: '一塁ベースに入り、送球を受ける' },
            4: { desc: '二塁ベースカバー。悪送球に備える' },
            5: { desc: 'ランナーの動きを牽制。三塁ベース方向に備える' },
            6: { desc: '二塁ベースバックアップ' },
            7: { desc: '一塁悪送球のバックアップ' },
            8: { desc: '一塁悪送球のバックアップ' },
            9: { desc: '一塁悪送球のバックアップ' }
        }
    },
    
    // 捕手牽制（一塁バックアップ）
    'c_pickoff_backup': {
        id: 'c_pickoff_backup',
        name: '捕手牽制（一塁バックアップ）',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81_%E7%89%BD%E5%88%B6_%E6%8D%95%E6%89%8B-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-2pickoff-normal/',
        movements: {
            1: { desc: '牽制後、一塁ベースカバーまたはランダウンプレーに備える' },
            2: { desc: '一塁へ牽制球を投げる。その後ホームベースに戻る' },
            3: { desc: '一塁ベースに入り、送球を受ける' },
            4: { desc: '二塁ベースカバー。悪送球に備える' },
            5: { desc: 'ランナーの動きを牽制。三塁ベース方向に備える' },
            6: { desc: '二塁ベースバックアップ' },
            7: { desc: '一塁悪送球のバックアップ' },
            8: { desc: '一塁悪送球のバックアップ' },
            9: { desc: '一塁悪送球のバックアップ' }
        }
    },
    
    // 投手牽制（クイック）
    'p_pickoff_quick': {
        id: 'p_pickoff_quick',
        name: '投手牽制（クイック）',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81_PO_%E6%8A%95%E6%89%8B2-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-1pickoff/',
        movements: {
            1: { desc: 'クイックで一塁へ牽制。牽制後、一塁ベースカバーに備える' },
            2: { desc: 'ホームベースで待機。悪送球に備える' },
            3: { desc: '一塁ベースに入り、送球を受ける' },
            4: { desc: '二塁ベースカバー。一塁からの送球に備える' },
            5: { desc: 'ランナーの動きを牽制。三塁ベース方向に備える' },
            6: { desc: '二塁ベースバックアップ' },
            7: { desc: '一塁悪送球のバックアップ' },
            8: { desc: '二塁への悪送球バックアップ' },
            9: { desc: '一塁悪送球のバックアップ' }
        }
    },
    
    // 捕手牽制（クイック）
    'c_pickoff_quick': {
        id: 'c_pickoff_quick',
        name: '捕手牽制（クイック）',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81_PO_%E6%8D%95%E6%89%8B-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-2pickoff/',
        movements: {
            1: { desc: '一塁ベースカバー。牽制後のランダウンプレーに備える' },
            2: { desc: '素早く一塁へ牽制球を投げる。その後ホームベースに戻る' },
            3: { desc: '一塁ベースに入り、送球を受ける' },
            4: { desc: '二塁ベースカバー。一塁からの送球に備える' },
            5: { desc: 'ランナーの動きを牽制。三塁ベース方向に備える' },
            6: { desc: '二塁ベースバックアップ' },
            7: { desc: '一塁悪送球のバックアップ' },
            8: { desc: '二塁への悪送球バックアップ' },
            9: { desc: '一塁悪送球のバックアップ' }
        }
    },
    
    // 送りバント（標準）
    'bunt_standard': {
        id: 'bunt_standard',
        name: '送りバント（標準）',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81%E9%80%81%E3%83%90_%E6%A8%99%E6%BA%96-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-bunt-normal/',
        movements: {
            1: { desc: '前進してバント処理。一塁または二塁へ送球' },
            2: { desc: 'ホームベースカバー。前進してバント処理に備える' },
            3: { desc: '一塁ベースカバー。送球を受ける' },
            4: { desc: '二塁ベースカバー。送球を受ける' },
            5: { desc: '前進してバント処理。一塁または二塁へ送球' },
            6: { desc: 'バント処理のバックアップ。三塁ベース方向に備える' },
            7: { desc: '一塁・二塁への悪送球バックアップ' },
            8: { desc: 'バント処理のバックアップ' },
            9: { desc: '一塁への悪送球バックアップ' }
        }
    },
    
    // 送りバント（シフト①一塁・三塁）
    'bunt_shift1': {
        id: 'bunt_shift1',
        name: '送りバント（シフト①一塁・三塁）',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81%E9%80%81%E3%83%90_%E3%82%B7%E3%83%95%E3%83%88-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-bunt-shift1/',
        movements: {
            1: { desc: '前進してバント処理。一塁へ送球' },
            2: { desc: 'ホームベースカバー。前進してバント処理に備える' },
            3: { desc: '前進してバント処理。一塁または二塁へ送球' },
            4: { desc: '二塁ベースカバー。送球を受ける' },
            5: { desc: '三塁ベースカバー。バックアップに備える' },
            6: { desc: 'バント処理のバックアップ。三塁ベース方向に備える' },
            7: { desc: '一塁・二塁への悪送球バックアップ' },
            8: { desc: 'バント処理のバックアップ' },
            9: { desc: '一塁への悪送球バックアップ' }
        }
    },
    
    // 送りバント（シフト②二塁・三塁）
    'bunt_shift2': {
        id: 'bunt_shift2',
        name: '送りバント（シフト②二塁・三塁）',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81%E9%80%81%E3%83%90_%E3%82%B7%E3%83%95%E3%83%88%E3%82%B7%E3%83%95%E3%83%882-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-bunt-shift2/',
        movements: {
            1: { desc: '前進してバント処理。一塁へ送球' },
            2: { desc: 'ホームベースカバー。前進してバント処理に備える' },
            3: { desc: '一塁ベースカバー。送球を受ける' },
            4: { desc: '前進してバント処理。一塁または二塁へ送球' },
            5: { desc: '三塁ベースカバー。バックアップに備える' },
            6: { desc: '二塁ベースカバー。送球を受ける' },
            7: { desc: '一塁・二塁への悪送球バックアップ' },
            8: { desc: 'バント処理のバックアップ' },
            9: { desc: '一塁への悪送球バックアップ' }
        }
    },
    
    // 暴投
    'wild_pitch': {
        id: 'wild_pitch',
        name: '暴投',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81_%E6%9A%B4%E6%8A%95-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runne-wild-pitch/',
        movements: {
            1: { desc: 'ホームベースカバー。捕手の後方をバックアップ' },
            2: { desc: '後方へ逸れた打球を処理。ホームベースへ戻る' },
            3: { desc: '一塁ベースカバー。ランナーの進塁を防ぐ' },
            4: { desc: '二塁ベースカバー。送球を受ける準備' },
            5: { desc: '三塁ベースカバー。ランナーの進塁に備える' },
            6: { desc: '二塁ベースバックアップ' },
            7: { desc: 'ホームベース後方のバックアップ' },
            8: { desc: 'ホームベース後方のバックアップ' },
            9: { desc: 'ホームベース後方のバックアップ' }
        }
    },
    
    // 盗塁
    'steal': {
        id: 'steal',
        name: '盗塁',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81_%E7%9B%97%E5%A1%81%E3%82%B7%E3%83%A7%E3%83%BC%E3%83%88-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-2steal/',
        movements: {
            1: { desc: 'ホームベース方向に備える。二塁バックアップ' },
            2: { desc: '二塁へ送球。盗塁を阻止する' },
            3: { desc: '一塁ランナーを牽制。三塁方向へ備える' },
            4: { desc: '二塁ベースカバー。送球を受けてタッグ' },
            5: { desc: '三塁ベースカバー。バックアップ' },
            6: { desc: '二塁ベースカバー。送球を受けてタッグ' },
            7: { desc: '二塁への悪送球バックアップ' },
            8: { desc: '二塁への悪送球バックアップ' },
            9: { desc: '二塁への悪送球バックアップ' }
        }
    },
    
    // ピッチャーゴロ
    'p_grounder': {
        id: 'p_grounder',
        name: 'ピッチャーゴロ',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81_%E6%8A%95%E3%82%B4%E3%83%AD-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-1grounder/',
        movements: {
            1: { desc: 'ゴロを処理。先頭ランナーをアウトにするため二塁へ送球' },
            2: { desc: 'ホームベースカバー。一塁への悪送球に備える' },
            3: { desc: '一塁ベースカバー。送球を受ける' },
            4: { desc: '二塁ベースカバー。送球を受けてダブルプレーを狙う' },
            5: { desc: '三塁ベースカバー。ランナーの進塁に備える' },
            6: { desc: '投手の打球処理をバックアップ。二塁送球に備える' },
            7: { desc: '二塁への悪送球バックアップ' },
            8: { desc: '投手の打球処理をバックアップ' },
            9: { desc: '一塁への悪送球バックアップ' }
        }
    },
    
    // キャッチャーゴロ
    'c_grounder': {
        id: 'c_grounder',
        name: 'キャッチャーゴロ',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81_%E6%8D%95%E3%82%B4%E3%83%AD-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-2grounder/',
        movements: {
            1: { desc: 'ホームベースカバー。捕手の打球処理をバックアップ' },
            2: { desc: 'ゴロを処理。先頭ランナーをアウトにするため二塁へ送球' },
            3: { desc: '一塁ベースカバー。送球を受ける' },
            4: { desc: '二塁ベースカバー。送球を受けてダブルプレーを狙う' },
            5: { desc: '三塁ベースカバー。ランナーの進塁に備える' },
            6: { desc: '捕手の打球処理をバックアップ。二塁送球に備える' },
            7: { desc: '二塁への悪送球バックアップ' },
            8: { desc: '捕手の打球処理をバックアップ' },
            9: { desc: '一塁への悪送球バックアップ' }
        }
    },
    
    // ファーストゴロ
    '1b_grounder': {
        id: '1b_grounder',
        name: 'ファーストゴロ',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81_%E4%B8%80%E3%82%B4%E3%83%AD-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-3grounder/',
        movements: {
            1: { desc: '一塁ベースカバー。送球を受ける' },
            2: { desc: 'ホームベースカバー。三塁への悪送球に備える' },
            3: { desc: 'ゴロを処理。先頭ランナーをアウトにするため二塁へ送球' },
            4: { desc: '二塁ベースカバー。送球を受けてダブルプレーを狙う' },
            5: { desc: '三塁ベースカバー。ランナーの進塁に備える' },
            6: { desc: '一塁手の打球処理をバックアップ。二塁送球に備える' },
            7: { desc: '二塁・三塁への悪送球バックアップ' },
            8: { desc: '一塁手の打球処理をバックアップ' },
            9: { desc: '一塁への悪送球バックアップ' }
        }
    },
    
    // セカンドゴロ
    '2b_grounder': {
        id: '2b_grounder',
        name: 'セカンドゴロ',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81_%E4%BA%8C%E3%82%B4%E3%83%AD2-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-4grounder/',
        movements: {
            1: { desc: '一塁ベースカバー。送球を受ける準備' },
            2: { desc: 'ホームベースカバー。三塁への悪送球に備える' },
            3: { desc: '一塁ベースカバー。送球を受ける' },
            4: { desc: 'ゴロを処理。二塁ベース（遊撃手）へトスまたは送球' },
            5: { desc: '三塁ベースカバー。ランナーの進塁に備える' },
            6: { desc: '二塁ベースカバー。送球を受けてダブルプレーを狙う' },
            7: { desc: '二塁・三塁への悪送球バックアップ' },
            8: { desc: '二塁手の打球処理をバックアップ' },
            9: { desc: '一塁への悪送球バックアップ' }
        }
    },
    
    // サードゴロ
    '3b_grounder': {
        id: '3b_grounder',
        name: 'サードゴロ',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81_%E4%B8%89%E3%82%B4%E3%83%AD2-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-5grounder/',
        movements: {
            1: { desc: '一塁ベースカバー。送球を受ける準備' },
            2: { desc: 'ホームベースカバー。三塁への悪送球に備える' },
            3: { desc: '一塁ベースカバー。送球を受ける' },
            4: { desc: '二塁ベースカバー。送球を受けてダブルプレーを狙う' },
            5: { desc: 'ゴロを処理。先頭ランナーをアウトにするため二塁へ送球' },
            6: { desc: '三塁手の打球処理をバックアップ。二塁送球に備える' },
            7: { desc: '二塁・三塁への悪送球バックアップ' },
            8: { desc: '三塁手の打球処理をバックアップ' },
            9: { desc: '一塁への悪送球バックアップ' }
        }
    },
    
    // ショートゴロ
    'ss_grounder': {
        id: 'ss_grounder',
        name: 'ショートゴロ',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81_%E9%81%8A%E3%82%B4%E3%83%AD-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-6grounder/',
        movements: {
            1: { desc: '一塁ベースカバー。送球を受ける準備' },
            2: { desc: 'ホームベースカバー。三塁への悪送球に備える' },
            3: { desc: '一塁ベースカバー。送球を受ける' },
            4: { desc: '二塁ベースカバー。送球を受けてダブルプレーを狙う' },
            5: { desc: '三塁ベースカバー。ランナーの進塁に備える' },
            6: { desc: 'ゴロを処理。二塁ベース（二塁手）へトスまたは送球' },
            7: { desc: '二塁・三塁への悪送球バックアップ' },
            8: { desc: '遊撃手の打球処理をバックアップ' },
            9: { desc: '一塁への悪送球バックアップ' }
        }
    },
    
    // レフト前ヒット
    'lf_single': {
        id: 'lf_single',
        name: 'レフト前ヒット',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81_%E5%B7%A6%E5%AE%89-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-7single/',
        movements: {
            1: { desc: '三塁バックアップまたはホームバックアップ' },
            2: { desc: 'ホームベースで待機。三塁への送球に備える' },
            3: { desc: '二塁ベースカバー。中継プレーに備える' },
            4: { desc: '三塁ベースカバー。送球を受ける' },
            5: { desc: '三塁ベースカバー。ランナーの動きに備える' },
            6: { desc: 'カットマン。レフトからの送球を中継する' },
            7: { desc: 'ボールを処理して三塁へ送球' },
            8: { desc: 'レフト・センター間のバックアップ' },
            9: { desc: '二塁送球のバックアップ' }
        }
    },
    
    // レフト線二塁打
    'lf_double': {
        id: 'lf_double',
        name: 'レフト線二塁打',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81_%E5%B7%A6%E7%B7%9A1_1-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-7double/',
        movements: {
            1: { desc: 'ホームバックアップ' },
            2: { desc: 'ホームベースで待機。送球を受ける準備' },
            3: { desc: '三塁ベースカバー。ホームへの送球に備える' },
            4: { desc: '二塁ベースカバー。打者走者の動きに備える' },
            5: { desc: '三塁ベースカバー。送球を受ける' },
            6: { desc: 'カットマン。レフトからの送球を中継してホームへ' },
            7: { desc: 'ボールを処理してカットマンへ送球' },
            8: { desc: 'レフト・センター間のバックアップ' },
            9: { desc: '二塁送球のバックアップ' }
        }
    },
    
    // レフト・センター間二塁打
    'lf_center_double': {
        id: 'lf_center_double',
        name: 'レフト・センター間二塁打',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81_%E5%B7%A6%E4%B8%AD2_1-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-78double/',
        movements: {
            1: { desc: 'ホームバックアップ' },
            2: { desc: 'ホームベースで待機。送球を受ける準備' },
            3: { desc: '三塁ベースカバー。ホームへの送球に備える' },
            4: { desc: 'カットマン（ライト・センター側）。ホームへの中継' },
            5: { desc: '三塁ベースカバー。送球を受ける' },
            6: { desc: 'カットマン（レフト・センター側）。ホームへの中継' },
            7: { desc: 'ボールを処理してカットマンへ送球' },
            8: { desc: 'ボールを処理してカットマンへ送球' },
            9: { desc: '二塁ベースバックアップ' }
        }
    },
    
    // センター前ヒット
    'cf_single': {
        id: 'cf_single',
        name: 'センター前ヒット',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81_%E4%B8%AD%E5%AE%89_1-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-8single/',
        movements: {
            1: { desc: '三塁バックアップまたはホームバックアップ' },
            2: { desc: 'ホームベースで待機。三塁への送球に備える' },
            3: { desc: '二塁ベースカバー。中継プレーに備える' },
            4: { desc: 'カットマン（ライト・センター側）。三塁への中継' },
            5: { desc: '三塁ベースカバー。送球を受ける' },
            6: { desc: 'カットマン（レフト・センター側）。三塁への中継' },
            7: { desc: 'レフト・センター間のバックアップ' },
            8: { desc: 'ボールを処理して三塁へ送球' },
            9: { desc: 'ライト・センター間のバックアップ' }
        }
    },
    
    // ライト・センター間二塁打
    'rf_center_double': {
        id: 'rf_center_double',
        name: 'ライト・センター間二塁打',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81_%E5%8F%B3%E4%B8%AD2_1-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-89double/',
        movements: {
            1: { desc: 'ホームバックアップ' },
            2: { desc: 'ホームベースで待機。送球を受ける準備' },
            3: { desc: '三塁ベースカバー。ホームへの送球に備える' },
            4: { desc: 'カットマン（ライト・センター側）。ホームへの中継' },
            5: { desc: '三塁ベースカバー。送球を受ける' },
            6: { desc: 'カットマン（レフト・センター側）。ホームへの中継' },
            7: { desc: '二塁ベースバックアップ' },
            8: { desc: 'ボールを処理してカットマンへ送球' },
            9: { desc: 'ボールを処理してカットマンへ送球' }
        }
    },
    
    // ライト前ヒット
    'rf_single': {
        id: 'rf_single',
        name: 'ライト前ヒット',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81_%E5%8F%B3%E5%AE%89_1-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-9single/',
        movements: {
            1: { desc: '三塁バックアップまたはホームバックアップ' },
            2: { desc: 'ホームベースで待機。三塁への送球に備える' },
            3: { desc: '二塁ベースカバー。中継プレーに備える' },
            4: { desc: 'カットマン。ライトからの送球を中継する' },
            5: { desc: '三塁ベースカバー。送球を受ける' },
            6: { desc: '三塁ベースカバー。ランナーの動きに備える' },
            7: { desc: '二塁送球のバックアップ' },
            8: { desc: 'ライト・センター間のバックアップ' },
            9: { desc: 'ボールを処理して三塁へ送球' }
        }
    },
    
    // ライト線二塁打
    'rf_double': {
        id: 'rf_double',
        name: 'ライト線二塁打',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E4%B8%80%E5%A1%81_%E5%8F%B3%E7%B7%9A2_1-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/1runner-9double/',
        movements: {
            1: { desc: 'ホームバックアップ' },
            2: { desc: 'ホームベースで待機。送球を受ける準備' },
            3: { desc: '三塁ベースカバー。ホームへの送球に備える' },
            4: { desc: 'カットマン。ライトからの送球を中継してホームへ' },
            5: { desc: '三塁ベースカバー。送球を受ける' },
            6: { desc: '二塁ベースカバー。打者走者の動きに備える' },
            7: { desc: '二塁送球のバックアップ' },
            8: { desc: 'ライト・センター間のバックアップ' },
            9: { desc: 'ボールを処理してカットマンへ送球' }
        }
    }
};

// グローバルスコープに公開
if (typeof window !== 'undefined') {
    window.runnerFirstData = runnerFirstData;
}
