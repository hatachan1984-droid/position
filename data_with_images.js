// 走者なしの詳細データ（画像URL付き）
const noneRunnerDetailedData = {
    'p_grounder': {
        id: 'p_grounder',
        name: 'ピッチャーゴロ',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E3%83%A9%E3%83%B3%E3%83%8A%E3%83%BC%E3%81%AA%E3%81%97%E6%8A%95%E3%82%B4%E3%83%AD.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/no-runner-1grounder/',
        movements: {
            1: { desc: '慌てずに処理し、悪送球に注意。多少ファンブルしても焦らない。' },
            2: { desc: '一塁送球の悪送球・ファーストのファンブルに備えてカバー。' },
            3: { desc: 'ピッチャーの一塁送球に備えて一塁ベースに入る。' },
            4: { desc: '捕球ミスに備えて打球処理をカバーし、捕球確認後はファンブルに備える。' },
            5: { desc: '三塁方向へのはじきに備え、ピッチャーに近づく。' },
            6: { desc: 'ファンブル等のカバー。悪送球で走者が二塁へ向かう可能性に備え二塁ベースへ。' },
            7: { desc: '悪送球→二塁送球の悪送球まで想定してカバー。' },
            8: { desc: '二遊間を抜ける場合に備え前進。捕球確認後は二塁送球のカバー。' },
            9: { desc: '悪送球・ファンブルに備えてカバー。' }
        }
    },
    'c_grounder': {
        id: 'c_grounder',
        name: 'キャッチャーゴロ',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E3%83%A9%E3%83%B3%E3%83%8A%E3%83%BC%E3%81%AA%E3%81%97%E6%8D%95%E3%82%B4%E3%83%AD.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/no-runner-2grounder/',
        movements: {
            1: { desc: '自分で処理するつもりで前進し、ファンブルに備えてカバー。' },
            2: { desc: 'ミットで勢いを止めてから処理。送球は走者と接触しないよう走路を避ける。' },
            3: { desc: '一塁送球に備えて一塁ベースへ。' },
            4: { desc: '一塁送球が悪送球になった場合に備えてカバー。' },
            5: { desc: 'ファンブルに備えてカバー。' },
            6: { desc: '悪送球で二塁進塁の可能性に備え二塁ベースへ。' },
            7: { desc: '二塁送球の悪送球に備えるなどカバー。' },
            8: { desc: '同上（二塁送球の悪送球に備える）。' },
            9: { desc: '一塁送球の悪送球・ファンブルに備えてカバー。' }
        }
    },
    '1b_grounder': {
        id: '1b_grounder',
        name: 'ファーストゴロ',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E3%83%A9%E3%83%B3%E3%83%8A%E3%83%BC%E3%81%AA%E3%81%97%E4%B8%80%E3%82%B4%E3%83%AD.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/no-runner-3grounder/',
        movements: {
            1: { desc: 'ファーストからの送球/トスに備えて一塁ベースカバーへ。' },
            2: { desc: '悪送球・ベースカバー野手のファンブルに備えてカバー。' },
            3: { desc: '捕球後は自分で踏むか、ベースカバーへ送球/トス（可能なら近づいてトス）。' },
            4: { desc: '打球/内野の動きで変化（打球カバー→遅れたらベースカバー→一塁送球カバー）。' },
            5: { desc: '主だったカバーなし。三塁付近で待機。' },
            6: { desc: '悪送球で二塁進塁の可能性に備え二塁ベースへ。' },
            7: { desc: '二塁送球の悪送球に備えるなどカバー。' },
            8: { desc: '当初はライト前ヒット想定でライト後方へ。以後は二塁送球の悪送球に備える。' },
            9: { desc: '当初は前進して捕球に備え、以後は悪送球に備えてカバー。' }
        }
    },
    '2b_grounder': {
        id: '2b_grounder',
        name: 'セカンドゴロ',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E3%83%A9%E3%83%B3%E3%83%8A%E3%83%BC%E3%81%AA%E3%81%97%E4%BA%8C%E3%82%B4%E3%83%AD.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/no-runner-4grounder/',
        movements: {
            1: { desc: 'まず一塁ベースカバーへ（状況でファーストが入るなら近づかない）。' },
            2: { desc: '悪送球・ファンブルに備えてカバー。' },
            3: { desc: '一二塁間は打球処理、その他は一塁ベースへ。' },
            4: { desc: '打球処理（多少ファンブルしても焦らない）。' },
            5: { desc: '主だったカバーなし。三塁付近で待機。' },
            6: { desc: '悪送球で二塁進塁の可能性に備え二塁ベースへ。' },
            7: { desc: '二塁送球の悪送球に備えるなどカバー。' },
            8: { desc: 'まず打球処理カバー→送球後の悪送球にも備える。' },
            9: { desc: 'まず打球処理カバー→一塁送球の悪送球に備える。' }
        }
    },
    '3b_grounder': {
        id: '3b_grounder',
        name: 'サードゴロ',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E3%83%A9%E3%83%B3%E3%83%8A%E3%83%BC%E3%81%AA%E3%81%97%E4%B8%89%E3%82%B4%E3%83%AD.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/no-runner-5grounder/',
        movements: {
            1: { desc: '送球の邪魔にならない位置へ。ボールから目を離さない。' },
            2: { desc: '一塁送球の悪送球・ファンブルに備えてカバー。' },
            3: { desc: '一塁送球に備えて一塁ベースへ。' },
            4: { desc: '打球方向へ反応。悪送球で二塁進塁に備え二塁ベースへ。' },
            5: { desc: '打球処理。焦って悪送球しない（間に合わないなら投げない）。' },
            6: { desc: '打球処理のカバー。転がったら拾って一塁送球（間に合わないなら投げない）。' },
            7: { desc: 'まず打球処理カバー→送球後の悪送球にも備える。' },
            8: { desc: '送球後の悪送球にも備える。' },
            9: { desc: '一塁送球の悪送球・ファンブルに備えてカバー。' }
        }
    },
    'ss_grounder': {
        id: 'ss_grounder',
        name: 'ショートゴロ',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E3%83%A9%E3%83%B3%E3%83%8A%E3%83%BC%E3%81%AA%E3%81%97%E9%81%8A%E3%82%B4%E3%83%AD.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/no-runner-6grounder/',
        movements: {
            1: { desc: '主だったカバーなし。' },
            2: { desc: '一塁送球の悪送球・ファンブルに備えてカバー。' },
            3: { desc: '一塁送球に備えて一塁ベースへ。' },
            4: { desc: '打球方向へ反応。悪送球で二塁進塁に備え二塁ベースへ。' },
            5: { desc: '打球処理のカバー。転がったら拾って一塁送球（間に合わないなら投げない）。' },
            6: { desc: '打球処理。焦って悪送球しない（間に合わないなら投げない）。' },
            7: { desc: 'まず打球処理カバー→送球後の悪送球にも備える。' },
            8: { desc: 'まず打球処理カバー→送球後の悪送球にも備える。' },
            9: { desc: '一塁送球の悪送球・ファンブルに備えてカバー。' }
        }
    },
    'lf_hit': {
        id: 'lf_hit',
        name: 'レフト前ヒット',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E3%83%A9%E3%83%B3%E3%83%8A%E3%83%BC%E3%81%AA%E3%81%97%E5%B7%A6%E5%AE%89%EF%BC%88%E6%94%B9%EF%BC%89.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/no-runner-7single/',
        movements: {
            1: { desc: '主だったカバーなし。' },
            2: { desc: '最初は一塁送球カバー→抜けたら定位置へ戻る。' },
            3: { desc: 'オーバーラン等に備え一塁ベースへ。' },
            4: { desc: '二塁ベースに入り送球に備え、カット指示。' },
            5: { desc: '打球に反応→抜けたら三塁へ戻る。' },
            6: { desc: '打球に反応→抜けたらカットマンで送球に備える。' },
            7: { desc: '打球処理。状況で二塁へ強く低い送球/カットマンへ。' },
            8: { desc: '打球処理のカバーでレフト後方へ。' },
            9: { desc: 'カットマン/二塁送球のカバー。' }
        }
    },
    'lf_double_2b': {
        id: 'lf_double_2b',
        name: 'レフト線二塁打（二塁送球）',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E3%83%A9%E3%83%B3%E3%83%8A%E3%83%BC%E3%81%AA%E3%81%97%E5%B7%A6%E7%B7%9A2_A.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/no-runner-7double1/',
        movements: {
            1: { desc: '三塁送球の可能性に備えカバー（送球がそれた場合も三塁送球に備える）。' },
            2: { desc: 'ホーム前に移動し指示を出す。' },
            3: { desc: '一塁踏破確認→二塁付近へ（状況で二塁ベースカバーも）。' },
            4: { desc: '二塁ベースに入り送球に備え、カット指示。' },
            5: { desc: '打球に反応→抜けたら三塁送球に備え三塁へ。' },
            6: { desc: 'カットマン（位置は打球処理位置と二塁のライン上）。' },
            7: { desc: '打球処理。二塁へ強く低い送球（状況により）。' },
            8: { desc: '打球処理のカバーでレフトへ。' },
            9: { desc: 'ショート/二塁送球のカバー。' }
        }
    },
    'lf_double_3b': {
        id: 'lf_double_3b',
        name: 'レフト線二塁打（三塁送球）',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E3%83%A9%E3%83%B3%E3%83%8A%E3%83%BC%E3%81%AA%E3%81%97%E5%B7%A6%E7%B7%9A2_C.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/no-runner-7double2/',
        movements: {
            1: { desc: 'レフト/ショートからの三塁送球が悪送球になったときのカバー。' },
            2: { desc: 'ホーム前に移動し指示を出す。' },
            3: { desc: '一塁踏破確認→二塁へ向かう走者に合わせ二塁付近へ。' },
            4: { desc: 'ショートへの送球が悪送球になったときのカバー。' },
            5: { desc: '三塁ベースに入り送球に備える。' },
            6: { desc: 'カットマンで三塁送球を中継。' },
            7: { desc: '打球処理。三塁へ強く低い送球。' },
            8: { desc: '打球処理のカバーでレフトへ。' },
            9: { desc: '三塁送球の後方カバーなど。' }
        }
    },
    'lc_double': {
        id: 'lc_double',
        name: '左中間二塁打（三塁打）',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E3%83%A9%E3%83%B3%E3%83%8A%E3%83%BC%E3%81%AA%E3%81%97%E5%B7%A6%E4%B8%AD2-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/no-runner-78double/',
        movements: {
            1: { desc: '三塁送球に備えてカバー。' },
            2: { desc: 'ホーム前に移動し指示（ショート/セカンドの移動距離に注意）。' },
            3: { desc: '一塁踏破確認→二塁へ向かう走者に合わせ二塁付近へ。' },
            4: { desc: 'ショートとサードの間で三塁送球のカットマン。' },
            5: { desc: '三塁ベースへ戻り送球に備え、カット指示。' },
            6: { desc: 'カットマンで送球に備える（的を大きく）。' },
            7: { desc: 'レフト/センターいずれかが打球処理（譲り合わない）。' },
            8: { desc: '同上（打球処理担当）。' },
            9: { desc: '二塁送球/三塁送球の後方カバー。' }
        }
    },
    'cf_hit': {
        id: 'cf_hit',
        name: 'センター前ヒット',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E3%83%A9%E3%83%B3%E3%83%8A%E3%83%BC%E3%81%AA%E3%81%97%E4%B8%AD%E5%AE%89.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/no-runner-8single/',
        movements: {
            1: { desc: 'センター→二塁送球の悪送球に備えてカバー。' },
            2: { desc: '最初は一塁送球カバー→抜けたら定位置へ戻る。' },
            3: { desc: 'オーバーラン等に備え一塁ベースへ。' },
            4: { desc: '打球位置でカット/ベースカバーを切替（セカンド寄りならカット、ショート寄りなら二塁）。' },
            5: { desc: '抜けたら三塁へ戻る。' },
            6: { desc: '打球位置でカット/ベースカバーを切替。' },
            7: { desc: 'センターから二塁方向送球のカバー。' },
            8: { desc: '打球処理。状況で二塁へ強く低い送球/カットマンへ。' },
            9: { desc: 'センターの打球処理カバー（後方カバー等）。' }
        }
    },
    'rc_triple': {
        id: 'rc_triple',
        name: '右中間二塁打（三塁打）',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E3%83%A9%E3%83%B3%E3%83%8A%E3%83%BC%E3%81%aa%E3%81%97%E5%8F%B3%E4%B8%AD2-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/no-runner-89triple/',
        movements: {
            1: { desc: '三塁送球に備えてカバー。' },
            2: { desc: 'ホーム前に移動し指示（セカンド/ショートの移動距離に注意）。' },
            3: { desc: '一塁踏破確認→二塁ベースカバーへ。' },
            4: { desc: 'カットマン（打球処理位置と三塁のライン上）。' },
            5: { desc: '三塁ベースに入り送球に備える。' },
            6: { desc: 'カットマン（セカンド→ショート→サードの中継）。' },
            7: { desc: '打球処理のバックアップ。' },
            8: { desc: '打球処理のバックアップ。' },
            9: { desc: '打球処理（右中間）を担当しやすい。' }
        }
    },
    'rf_hit': {
        id: 'rf_hit',
        name: 'ライト前ヒット',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E3%83%A9%E3%83%B3%E3%83%8A%E3%83%BC%E3%81%AA%E3%81%97%E5%8F%B3%E5%AE%89.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/no-runner-9single/',
        movements: {
            1: { desc: '最初は一塁ベースカバー→抜けたら接触に注意。' },
            2: { desc: '最初は一塁送球カバー→抜けたら定位置へ戻る。' },
            3: { desc: '打球に反応→抜けたら一塁ベースへ（一塁送球用）。' },
            4: { desc: '打球に反応→抜けたらカットマンで送球に備える。' },
            5: { desc: '抜けたら三塁ベースへ。' },
            6: { desc: '二塁ベースに入り二塁送球に備える（指示も）。' },
            7: { desc: 'セカンド/ショートへの送球のカバー。' },
            8: { desc: '打球処理のカバーでライトへ。' },
            9: { desc: '打球処理。状況で二塁へ強く低い送球/カットマンへ。' }
        }
    },
    'rf_double': {
        id: 'rf_double',
        name: 'ライト線二塁打（二塁送球）',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E3%83%A9%E3%83%B3%E3%83%8A%E3%83%BC%E3%81%AA%E3%81%97%E5%8F%B3%E7%B7%9A%EF%BC%88%E4%BA%8C%E5%A1%81%EF%BC%89.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/no-runner-9double1/',
        movements: {
            1: { desc: '三塁送球の可能性に備えカバー。' },
            2: { desc: 'ホーム前に移動し指示を出す。' },
            3: { desc: '一塁踏破確認→二塁付近へ（セカンドのカバーも）。' },
            4: { desc: 'カットマンでライトからの送球に備える。' },
            5: { desc: '三塁送球の可能性に備え三塁ベースへ。' },
            6: { desc: '二塁ベースに入り送球に備え、カット指示。' },
            7: { desc: 'ショートへの送球のカバー。' },
            8: { desc: '打球処理のカバーでライトへ。' },
            9: { desc: '打球処理。二塁へ強く低い送球（状況で）。' }
        }
    },
    'rf_triple': {
        id: 'rf_triple',
        name: 'ライト線三塁打',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/03/%E3%83%A9%E3%83%B3%E3%83%8A%E3%83%BC%E3%81%AA%E3%81%97%E5%8F%B3%E7%B7%9A3.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/no-runner-9triple/',
        movements: {
            1: { desc: '三塁送球に備えてカバー。' },
            2: { desc: 'ホーム前に移動し指示を出す。' },
            3: { desc: '一塁踏破確認→二塁ベースカバーへ。' },
            4: { desc: 'カットマン（ライト→セカンド→ショート→サードの中継）。' },
            5: { desc: '三塁ベースに入り送球に備え、カット指示。' },
            6: { desc: '三塁送球のカットマン（セカンドとサードの間）。' },
            7: { desc: '三塁送球の悪送球に備えカバー。' },
            8: { desc: '打球処理のカバーでライトへ。' },
            9: { desc: '打球処理。カットマンへ強く低い送球。' }
        }
    }
};
