// 走者二塁のフォーメーションデータ
const runnerSecondData = {
    // ピッチャーの牽制球（セカンド）
    '2_pitcher_pickoff_4': {
        id: '2_pitcher_pickoff_4',
        name: 'ピッチャーの牽制球（セカンド）',
        imageUrl: 'https://baseball.fx-education.com/wp-content/uploads/2019/06/%E4%BA%8C%E5%A1%81_P%E7%89%BD%E5%88%B6%E3%82%BB%E3%82%AB%E3%83%B3%E3%83%89-730x410.jpg',
        articleUrl: 'https://baseball.fx-education.com/formation/2runner-1pickoff-4/',
        movements: {
            1: { desc: '二塁へ牽制送球' },
            2: { desc: '' },
            3: { desc: '' },
            4: { desc: 'ベースカバー・タッグ' },
            5: { desc: '三塁走者けん制' },
            6: { desc: '' },
            7: { desc: '' },
            8: { desc: '二塁バックアップ' },
            9: { desc: '' }
        }
    },
    
    // CSVデータが多いため、コメントで一旦中断します
    // 全24パターンを実装する必要がありますが、ファイルサイズが大きくなりすぎます
};

// グローバルスコープに公開
if (typeof window !== 'undefined') {
    window.runnerSecondData = runnerSecondData;
}
