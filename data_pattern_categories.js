// 打球/プレーのカテゴリー定義
// 走者状況ごとに、打球/プレーを「系」でグループ化
// keyはformation_all.csvの「打球/プレー」列の値をそのまま使用

const patternCategories = {
    '走者なし': [
        {
            id: 'grounder',
            name: 'ゴロ系',
            icon: 'fa-baseball-ball',
            hasConditions: false,
            patterns: [
                { key: 'ぴっちゃーごろ', label: 'ピッチャーゴロ' },
                { key: 'きゃっちゃーごろ', label: 'キャッチャーゴロ' },
                { key: 'ふぁーすとごろ', label: 'ファーストゴロ' },
                { key: 'せかんどごろ', label: 'セカンドゴロ' },
                { key: 'さーどごろ', label: 'サードゴロ' },
                { key: 'しょーとごろ', label: 'ショートゴロ' }
            ]
        },
        {
            id: 'hit',
            name: 'ヒット・二塁打系',
            icon: 'fa-running',
            patterns: [
                { key: 'れふと前ひっと', label: 'レフト前ヒット' },
                { key: 'れふと線二塁打_二塁送球_', label: 'レフト線二塁打（二塁送球）' },
                { key: 'れふと線二塁打_三塁送球_', label: 'レフト線二塁打（三塁送球）' },
                { key: '左中間二塁打_三塁打_', label: '左中間二塁打（三塁打）' },
                { key: 'せんたー前ひっと', label: 'センター前ヒット' },
                { key: '右中間二塁打_三塁打_', label: '右中間二塁打（三塁打）' },
                { key: 'らいと前ひっと', label: 'ライト前ヒット' },
                { key: 'らいと線二塁打_二塁送球_', label: 'ライト線二塁打（二塁送球）' },
                { key: 'らいと線三塁打', label: 'ライト線三塁打' }
            ]
        }
    ],
    '走者一塁': [
        {
            id: 'grounder',
            name: 'ゴロ系',
            icon: 'fa-baseball-ball',
            hasConditions: false,
            patterns: [
                { key: 'ぴっちゃーごろ', label: 'ピッチャーゴロ' },
                { key: 'きゃっちゃーごろ', label: 'キャッチャーゴロ' },
                { key: 'ふぁーすとごろ', label: 'ファーストゴロ' },
                { key: 'せかんどごろ', label: 'セカンドゴロ' },
                { key: 'さーどごろ', label: 'サードゴロ' },
                { key: 'しょーとごろ', label: 'ショートゴロ' }
            ]
        },
        {
            id: 'hit',
            name: 'ヒット・二塁打系',
            icon: 'fa-running',
            patterns: [
                { key: 'れふと前ひっと', label: 'レフト前ヒット' },
                { key: 'れふと線二塁打', label: 'レフト線二塁打' },
                { key: 'れふと・せんたー間二塁打', label: 'レフト・センター間二塁打' },
                { key: 'せんたー前ひっと', label: 'センター前ヒット' },
                { key: 'らいと・せんたー間二塁打', label: 'ライト・センター間二塁打' },
                { key: 'らいと前ひっと', label: 'ライト前ヒット' },
                { key: 'らいと線二塁打', label: 'ライト線二塁打' }
            ]
        },
        {
            id: 'pickoff',
            name: '牽制系',
            icon: 'fa-hand-paper',
            patterns: [
                { key: 'ぴっちゃーの牽制球_ふぁーすと_', label: 'ピッチャーの牽制球（ファースト）' },
                { key: 'きゃっちゃーの牽制球_ふぁーすと_', label: 'キャッチャーの牽制球（ファースト）' },
                { key: 'ぴっくおふぷれー_ぴっちゃー編_', label: 'ピックオフプレー（ピッチャー編）' },
                { key: 'ぴっくおふぷれー_きゃっちゃー編_', label: 'ピックオフプレー（キャッチャー編）' }
            ]
        },
        {
            id: 'bunt',
            name: 'バント系',
            icon: 'fa-angle-double-right',
            patterns: [
                { key: '送りばんと_通常しふと_', label: '送りバント（通常シフト）' },
                { key: 'ばんとしふと_①ぴっちゃー・さーど前進_', label: 'バントシフト（①ピッチャー・サード前進）' },
                { key: 'ばんとしふと_②せかんど・しょーと前進_', label: 'バントシフト（②セカンド・ショート前進）' }
            ]
        },
        {
            id: 'special',
            name: '特殊プレー',
            icon: 'fa-exclamation-triangle',
            patterns: [
                { key: '暴投_捕逸_', label: '暴投（捕逸）' },
                { key: '盗塁_二塁_', label: '盗塁（二塁）' }
            ]
        }
    ],
    '走者二塁': [
        {
            id: 'grounder',
            name: 'ゴロ系',
            icon: 'fa-baseball-ball',
            hasConditions: false,
            patterns: [
                { key: 'ぴっちゃーごろ_一塁送球_', label: 'ピッチャーゴロ（一塁送球）' },
                { key: 'ぴっちゃーごろ_二塁送球_', label: 'ピッチャーゴロ（二塁送球）' },
                { key: 'きゃっちゃーごろ_一塁送球_', label: 'キャッチャーゴロ（一塁送球）' },
                { key: 'きゃっちゃーごろ_二塁送球_', label: 'キャッチャーゴロ（二塁送球）' },
                { key: 'ふぁーすとごろ', label: 'ファーストゴロ' },
                { key: 'せかんどごろ', label: 'セカンドゴロ' },
                { key: 'さーどごろ', label: 'サードゴロ' },
                { key: 'しょーとごろ_正面_', label: 'ショートゴロ（正面）' },
                { key: 'しょーとごろ_二遊間_', label: 'ショートゴロ（二遊間）' },
                { key: 'しょーとごろ_三遊間_', label: 'ショートゴロ（三遊間）' }
            ]
        },
        {
            id: 'hit',
            name: 'ヒット・フライ系',
            icon: 'fa-running',
            patterns: [
                { key: 'れふと前ひっと', label: 'レフト前ヒット' },
                { key: 'れふとふらい', label: 'レフトフライ' },
                { key: 'せんたー前ひっと', label: 'センター前ヒット' },
                { key: 'せんたーふらい', label: 'センターフライ' },
                { key: 'らいと前ひっと', label: 'ライト前ヒット' },
                { key: 'らいとふらい', label: 'ライトフライ' }
            ]
        },
        {
            id: 'pickoff',
            name: '牽制・盗塁系',
            icon: 'fa-hand-paper',
            patterns: [
                { key: 'ぴっちゃーの牽制球_せかんど_', label: 'ピッチャーの牽制球（セカンド）' },
                { key: 'ぴっちゃーの牽制球_しょーと_', label: 'ピッチャーの牽制球（ショート）' },
                { key: 'ぴっちゃーの一発牽制_せかんど_', label: 'ピッチャーの一発牽制（セカンド）' },
                { key: 'ぴっちゃーの一発牽制_しょーと_', label: 'ピッチャーの一発牽制（ショート）' },
                { key: 'きゃっちゃーの牽制球_せかんど_', label: 'キャッチャーの牽制球（セカンド）' },
                { key: 'きゃっちゃーの牽制球_しょーと_', label: 'キャッチャーの牽制球（ショート）' },
                { key: 'きゃっちゃーのぴっくおふぷれー', label: 'キャッチャーのピックオフプレー' },
                { key: '盗塁_三塁_', label: '盗塁（三塁）' }
            ]
        },
        {
            id: 'bunt',
            name: 'バント系',
            icon: 'fa-angle-double-right',
            patterns: [
                { key: '送りばんと_通常しふと_', label: '送りバント（通常シフト）' },
                { key: 'ばんとしふと', label: 'バントシフト' }
            ]
        },
        {
            id: 'special',
            name: '特殊プレー',
            icon: 'fa-exclamation-triangle',
            patterns: [
                { key: '暴投_捕逸_', label: '暴投（捕逸）' }
            ]
        }
    ],
    '走者三塁': [
        {
            id: 'grounder',
            name: 'ゴロ系',
            icon: 'fa-baseball-ball',
            hasConditions: true,
            conditions: [
                {
                    id: 'forward',
                    name: '前進守備',
                    patterns: [
                        { key: 'ぴっちゃーごろ_前進守備_', label: 'ピッチャーゴロ' },
                        { key: 'きゃっちゃーごろ_前進守備_', label: 'キャッチャーゴロ' },
                        { key: 'ふぁーすとごろ_前進守備_', label: 'ファーストゴロ' },
                        { key: 'せかんどごろ_前進守備_', label: 'セカンドゴロ' },
                        { key: 'さーどごろ_前進守備_', label: 'サードゴロ' }
                    ]
                },
                {
                    id: 'middle',
                    name: '中間守備',
                    patterns: [
                        { key: 'ぴっちゃーごろ_中間守備_', label: 'ピッチャーゴロ' },
                        { key: 'きゃっちゃーごろ_中間守備_', label: 'キャッチャーゴロ' },
                        { key: 'ふぁーすとごろ_中間守備_', label: 'ファーストゴロ' },
                        { key: 'せかんどごろ_中間守備_', label: 'セカンドゴロ' },
                        { key: 'さーどごろ_中間守備_', label: 'サードゴロ' }
                    ]
                }
            ]
        },
        {
            id: 'hit',
            name: 'ヒット・フライ系',
            icon: 'fa-running',
            patterns: [
                { key: 'れふと前ひっと', label: 'レフト前ヒット' },
                { key: 'れふとふらい', label: 'レフトフライ' },
                { key: 'せんたー前ひっと', label: 'センター前ヒット' },
                { key: 'せんたーふらい', label: 'センターフライ' },
                { key: 'らいと前ひっと', label: 'ライト前ヒット' }
            ]
        },
        {
            id: 'pickoff',
            name: '牽制系',
            icon: 'fa-hand-paper',
            patterns: [
                { key: 'ぴっちゃーの牽制球', label: 'ピッチャーの牽制球' },
                { key: 'きゃっちゃーの牽制球', label: 'キャッチャーの牽制球' },
                { key: 'ぴっくおふぷれー_ぴっちゃー編_', label: 'ピックオフプレー（ピッチャー編）' },
                { key: 'ぴっくおふぷれー_きゃっちゃー編_', label: 'ピックオフプレー（キャッチャー編）' }
            ]
        },
        {
            id: 'special',
            name: '特殊プレー',
            icon: 'fa-exclamation-triangle',
            patterns: [
                { key: 'すくいーず', label: 'スクイーズ' },
                { key: '暴投_捕逸_', label: '暴投（捕逸）' },
                { key: '盗塁_ほーむ_', label: '盗塁（ホーム）' }
            ]
        }
    ],
    '走者一二塁': [
        {
            id: 'grounder',
            name: 'ゴロ系',
            icon: 'fa-baseball-ball',
            hasConditions: false,
            patterns: [
                { key: 'ぴっちゃーごろ', label: 'ピッチャーゴロ' },
                { key: 'きゃっちゃーごろ', label: 'キャッチャーゴロ' },
                { key: 'ふぁーすとごろ', label: 'ファーストゴロ' },
                { key: 'せかんどごろ', label: 'セカンドゴロ' },
                { key: 'さーどごろ', label: 'サードゴロ' },
                { key: 'しょーとごろ', label: 'ショートゴロ' }
            ]
        },
        {
            id: 'hit',
            name: 'ヒット・フライ系',
            icon: 'fa-running',
            patterns: [
                { key: 'れふと前ひっと', label: 'レフト前ヒット' },
                { key: 'れふとふらい', label: 'レフトフライ' },
                { key: 'せんたー前ひっと', label: 'センター前ヒット' },
                { key: 'せんたーふらい', label: 'センターフライ' },
                { key: 'らいと前ひっと', label: 'ライト前ヒット' },
                { key: 'らいとふらい', label: 'ライトフライ' }
            ]
        },
        {
            id: 'pickoff',
            name: '牽制系',
            icon: 'fa-hand-paper',
            patterns: [
                { key: 'ぴっちゃーの牽制球_ふぁーすと_', label: 'ピッチャーの牽制球（ファースト）' },
                { key: 'きゃっちゃーの牽制球_ふぁーすと_', label: 'キャッチャーの牽制球（ファースト）' },
                { key: 'ぴっちゃーの牽制球_せかんど_', label: 'ピッチャーの牽制球（セカンド）' },
                { key: 'きゃっちゃーの牽制球_せかんど_', label: 'キャッチャーの牽制球（セカンド）' }
            ]
        },
        {
            id: 'bunt',
            name: 'バント系',
            icon: 'fa-angle-double-right',
            patterns: [
                { key: '送りばんと_通常しふと_', label: '送りバント（通常シフト）' }
            ]
        },
        {
            id: 'special',
            name: '特殊プレー',
            icon: 'fa-exclamation-triangle',
            patterns: [
                { key: '暴投_捕逸_', label: '暴投（捕逸）' }
            ]
        }
    ],
    '走者一三塁': [
        {
            id: 'grounder',
            name: 'ゴロ系',
            icon: 'fa-baseball-ball',
            hasConditions: true,
            conditions: [
                {
                    id: 'forward',
                    name: '前進守備',
                    patterns: [
                        { key: 'ぴっちゃーごろ_前進守備_', label: 'ピッチャーゴロ' },
                        { key: 'きゃっちゃーごろ_前進守備_', label: 'キャッチャーゴロ' },
                        { key: 'ふぁーすとごろ_前進守備_', label: 'ファーストゴロ' },
                        { key: 'せかんどごろ_前進守備_', label: 'セカンドゴロ' },
                        { key: 'さーどごろ_前進守備_', label: 'サードゴロ' }
                    ]
                },
                {
                    id: 'middle',
                    name: '中間守備',
                    patterns: [
                        { key: 'ぴっちゃーごろ_中間守備_', label: 'ピッチャーゴロ' },
                        { key: 'きゃっちゃーごろ_中間守備_', label: 'キャッチャーゴロ' },
                        { key: 'ふぁーすとごろ_中間守備_', label: 'ファーストゴロ' },
                        { key: 'せかんどごろ_中間守備_', label: 'セカンドゴロ' },
                        { key: 'さーどごろ_中間守備_', label: 'サードゴロ' }
                    ]
                }
            ]
        },
        {
            id: 'hit',
            name: 'ヒット・フライ系',
            icon: 'fa-running',
            patterns: [
                { key: 'れふと前ひっと', label: 'レフト前ヒット' },
                { key: 'れふとふらい', label: 'レフトフライ' },
                { key: 'せんたー前ひっと', label: 'センター前ヒット' },
                { key: 'せんたーふらい', label: 'センターフライ' },
                { key: 'らいと前ひっと', label: 'ライト前ヒット' },
                { key: 'らいとふらい', label: 'ライトフライ' }
            ]
        },
        {
            id: 'pickoff',
            name: '牽制系',
            icon: 'fa-hand-paper',
            patterns: [
                { key: 'ぴっちゃーの牽制球_ふぁーすと_', label: 'ピッチャーの牽制球（ファースト）' },
                { key: 'きゃっちゃーの牽制球_ふぁーすと_', label: 'キャッチャーの牽制球（ファースト）' },
                { key: 'ぴっちゃーの牽制球_三塁_', label: 'ピッチャーの牽制球（三塁）' },
                { key: 'きゃっちゃーの牽制球_三塁_', label: 'キャッチャーの牽制球（三塁）' },
                { key: 'ぴっくおふぷれー_ぴっちゃー編①_', label: 'ピックオフプレー（ピッチャー編①）' },
                { key: 'ぴっくおふぷれー_ぴっちゃー編②_', label: 'ピックオフプレー（ピッチャー編②）' },
                { key: 'ぴっくおふぷれー_ぴっちゃー編③_', label: 'ピックオフプレー（ピッチャー編③）' },
                { key: 'ぴっくおふぷれー_きゃっちゃー編_', label: 'ピックオフプレー（キャッチャー編）' }
            ]
        },
        {
            id: 'bunt',
            name: 'バント系',
            icon: 'fa-angle-double-right',
            patterns: [
                { key: '送りばんと_通常しふと_', label: '送りバント（通常シフト）' },
                { key: 'ばんとしふと', label: 'バントシフト' }
            ]
        },
        {
            id: 'special',
            name: '特殊プレー',
            icon: 'fa-exclamation-triangle',
            patterns: [
                { key: 'すくいーず', label: 'スクイーズ' },
                { key: '暴投_捕逸_', label: '暴投（捕逸）' },
                { key: '盗塁_三塁_', label: '盗塁（三塁）' },
                { key: '盗塁_ほーむ_', label: '盗塁（ホーム）' }
            ]
        }
    ],
    '走者二三塁': [
        {
            id: 'grounder',
            name: 'ゴロ系',
            icon: 'fa-baseball-ball',
            hasConditions: true,
            conditions: [
                {
                    id: 'forward',
                    name: '前進守備',
                    patterns: [
                        { key: 'ぴっちゃーごろ_前進守備_', label: 'ピッチャーゴロ' },
                        { key: 'きゃっちゃーごろ_前進守備_', label: 'キャッチャーゴロ' },
                        { key: 'ふぁーすとごろ_前進守備_', label: 'ファーストゴロ' },
                        { key: 'せかんどごろ_前進守備_', label: 'セカンドゴロ' },
                        { key: 'さーどごろ_前進守備_', label: 'サードゴロ' }
                    ]
                },
                {
                    id: 'middle',
                    name: '中間守備',
                    patterns: [
                        { key: 'ぴっちゃーごろ_中間守備_', label: 'ピッチャーゴロ' },
                        { key: 'きゃっちゃーごろ_中間守備_', label: 'キャッチャーゴロ' },
                        { key: 'ふぁーすとごろ_中間守備_', label: 'ファーストゴロ' },
                        { key: 'せかんどごろ_中間守備_', label: 'セカンドゴロ' },
                        { key: 'さーどごろ_中間守備_', label: 'サードゴロ' }
                    ]
                }
            ]
        },
        {
            id: 'hit',
            name: 'ヒット・フライ系',
            icon: 'fa-running',
            patterns: [
                { key: 'れふと前ひっと', label: 'レフト前ヒット' },
                { key: 'れふとふらい', label: 'レフトフライ' },
                { key: 'せんたー前ひっと', label: 'センター前ヒット' },
                { key: 'せんたーふらい', label: 'センターフライ' },
                { key: 'らいと前ひっと', label: 'ライト前ヒット' },
                { key: 'らいとふらい', label: 'ライトフライ' }
            ]
        },
        {
            id: 'pickoff',
            name: '牽制・盗塁系',
            icon: 'fa-hand-paper',
            patterns: [
                { key: 'ぴっちゃーの牽制球_せかんど_', label: 'ピッチャーの牽制球（セカンド）' },
                { key: 'きゃっちゃーの牽制球_せかんど_', label: 'キャッチャーの牽制球（セカンド）' },
                { key: 'ぴっちゃーの牽制球_三塁_', label: 'ピッチャーの牽制球（三塁）' },
                { key: 'きゃっちゃーの牽制球_三塁_', label: 'キャッチャーの牽制球（三塁）' },
                { key: 'ぴっくおふぷれー_ぴっちゃー編①_', label: 'ピックオフプレー（ピッチャー編①）' },
                { key: 'ぴっくおふぷれー_ぴっちゃー編②_', label: 'ピックオフプレー（ピッチャー編②）' },
                { key: 'ぴっくおふぷれー_ぴっちゃー編③_', label: 'ピックオフプレー（ピッチャー編③）' },
                { key: 'ぴっくおふぷれー_きゃっちゃー編_', label: 'ピックオフプレー（キャッチャー編）' },
                { key: '盗塁_三塁_', label: '盗塁（三塁）' },
                { key: '盗塁_ほーむ_', label: '盗塁（ホーム）' }
            ]
        },
        {
            id: 'bunt',
            name: 'バント系',
            icon: 'fa-angle-double-right',
            patterns: [
                { key: '送りばんと_通常しふと_', label: '送りバント（通常シフト）' },
                { key: 'ばんとしふと', label: 'バントシフト' }
            ]
        },
        {
            id: 'special',
            name: '特殊プレー',
            icon: 'fa-exclamation-triangle',
            patterns: [
                { key: 'すくいーず', label: 'スクイーズ' },
                { key: '暴投_捕逸_', label: '暴投（捕逸）' }
            ]
        }
    ],
    '走者満塁': [
        {
            id: 'grounder',
            name: 'ゴロ系',
            icon: 'fa-baseball-ball',
            hasConditions: true,
            conditions: [
                {
                    id: 'forward',
                    name: '前進守備',
                    patterns: [
                        { key: 'ぴっちゃーごろ_前進守備_', label: 'ピッチャーゴロ' },
                        { key: 'きゃっちゃーごろ_前進守備_', label: 'キャッチャーゴロ' },
                        { key: 'ふぁーすとごろ_前進守備_', label: 'ファーストゴロ' },
                        { key: 'せかんどごろ_前進守備_', label: 'セカンドゴロ' },
                        { key: 'さーどごろ_前進守備_', label: 'サードゴロ' }
                    ]
                },
                {
                    id: 'middle',
                    name: '中間守備',
                    patterns: [
                        { key: 'ぴっちゃーごろ_中間守備_', label: 'ピッチャーゴロ' },
                        { key: 'きゃっちゃーごろ_中間守備_', label: 'キャッチャーゴロ' },
                        { key: 'ふぁーすとごろ_中間守備_', label: 'ファーストゴロ' },
                        { key: 'せかんどごろ_中間守備_', label: 'セカンドゴロ' },
                        { key: 'さーどごろ_中間守備_', label: 'サードゴロ' }
                    ]
                }
            ]
        },
        {
            id: 'hit',
            name: 'ヒット・フライ系',
            icon: 'fa-running',
            patterns: [
                { key: 'れふと前ひっと', label: 'レフト前ヒット' },
                { key: 'れふとふらい', label: 'レフトフライ' },
                { key: 'せんたー前ひっと', label: 'センター前ヒット' },
                { key: 'せんたーふらい', label: 'センターフライ' },
                { key: 'らいと前ひっと', label: 'ライト前ヒット' },
                { key: 'らいとふらい', label: 'ライトフライ' }
            ]
        },
        {
            id: 'pickoff',
            name: '牽制・盗塁系',
            icon: 'fa-hand-paper',
            patterns: [
                { key: 'ぴっちゃーの牽制球_ふぁーすと_', label: 'ピッチャーの牽制球（ファースト）' },
                { key: 'きゃっちゃーの牽制球_ふぁーすと_', label: 'キャッチャーの牽制球（ファースト）' },
                { key: 'ぴっちゃーの牽制球_せかんど_', label: 'ピッチャーの牽制球（セカンド）' },
                { key: 'きゃっちゃーの牽制球_せかんど_', label: 'キャッチャーの牽制球（セカンド）' },
                { key: 'ぴっちゃーの牽制球_三塁_', label: 'ピッチャーの牽制球（三塁）' },
                { key: 'きゃっちゃーの牽制球_三塁_', label: 'キャッチャーの牽制球（三塁）' },
                { key: 'ぴっくおふぷれー_ぴっちゃー編①_', label: 'ピックオフプレー（ピッチャー編①）' },
                { key: 'ぴっくおふぷれー_ぴっちゃー編②_', label: 'ピックオフプレー（ピッチャー編②）' },
                { key: 'ぴっくおふぷれー_ぴっちゃー編③_', label: 'ピックオフプレー（ピッチャー編③）' },
                { key: 'ぴっくおふぷれー_きゃっちゃー編_', label: 'ピックオフプレー（キャッチャー編）' },
                { key: '盗塁_ふぁーすと_', label: '盗塁（ファースト）' },
                { key: '盗塁_三塁_', label: '盗塁（三塁）' },
                { key: '盗塁_ほーむ_', label: '盗塁（ホーム）' }
            ]
        },
        {
            id: 'bunt',
            name: 'バント系',
            icon: 'fa-angle-double-right',
            patterns: [
                { key: '送りばんと_通常しふと_', label: '送りバント（通常シフト）' },
                { key: 'ばんとしふと', label: 'バントシフト' }
            ]
        },
        {
            id: 'special',
            name: '特殊プレー',
            icon: 'fa-exclamation-triangle',
            patterns: [
                { key: 'すくいーず', label: 'スクイーズ' },
                { key: '暴投_捕逸_', label: '暴投（捕逸）' }
            ]
        }
    ]
};
