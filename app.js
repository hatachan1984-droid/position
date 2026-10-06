// 🎯 寺町トンネルズ カバーリング・バックアップ学習アプリ
// バージョン: 2026.04.17-v5
console.log('寺町トンネルズアプリ version 2026.04.17-v5');

// グローバル変数
let currentUser = null;
let currentRunner = 'none';
let currentBall = '';
let currentQuestion = null;
let consecutiveCorrect = 0;

// ========================
// クラウドデータベース関連
// ========================

// ユーザーをクラウドに保存
async function saveUserToCloud(user) {
    try {
        // IDが存在する場合は更新、存在しない場合は新規作成
        if (user.cloudId) {
            // 更新
            const response = await fetch(`tables/users/${user.cloudId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    nickname: user.nickname,
                    password: user.password,
                    position: user.position,
                    positionData: JSON.stringify(user.positionData),
                    loginTime: Date.now()
                })
            });
            return await response.json();
        } else {
            // 新規作成
            const response = await fetch('tables/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    nickname: user.nickname,
                    password: user.password,
                    position: user.position,
                    positionData: JSON.stringify(user.positionData),
                    loginTime: Date.now()
                })
            });
            const result = await response.json();
            return result;
        }
    } catch (error) {
        console.error('クラウド保存エラー:', error);
        return null;
    }
}

// ニックネームでユーザーを検索
async function findUserByNickname(nickname) {
    try {
        const response = await fetch(`tables/users?search=${encodeURIComponent(nickname)}&limit=100`);
        const data = await response.json();
        // ニックネームが完全一致するユーザーを探す
        const user = data.data.find(u => u.nickname === nickname);
        if (user && user.positionData) {
            // positionDataをJSONパース
            user.positionData = JSON.parse(user.positionData);
        }
        return user;
    } catch (error) {
        console.error('ユーザー検索エラー:', error);
        return null;
    }
}

// 全ユーザーを取得（管理者用）
async function getAllUsers() {
    try {
        const response = await fetch('tables/users?limit=1000');
        const data = await response.json();
        return data.data.map(user => {
            // positionDataがJSON文字列の場合パース
            if (user.positionData && typeof user.positionData === 'string') {
                try {
                    user.positionData = JSON.parse(user.positionData);
                } catch (e) {
                    console.warn('positionDataのパースに失敗:', user.nickname, e);
                    user.positionData = {};
                }
            }
            // positionDataがない場合は空オブジェクト
            if (!user.positionData) {
                user.positionData = {};
            }
            return user;
        });
    } catch (error) {
        console.error('全ユーザー取得エラー:', error);
        return [];
    }
}

// localStorageからクラウドへの移行
async function migrateFromLocalStorage() {
    const localUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    if (localUsers.length === 0) return;
    
    console.log('localStorageからクラウドへ移行中...', localUsers.length, 'ユーザー');
    
    for (const user of localUsers) {
        // クラウドに既に存在するか確認
        const existingUser = await findUserByNickname(user.nickname);
        if (!existingUser) {
            // 存在しない場合のみ追加
            await saveUserToCloud(user);
            console.log('移行完了:', user.nickname);
        }
    }
    
    console.log('移行処理完了');
}

// アプリバージョン
const APP_VERSION = '2026.04.15-v3';
console.log(`🚀 寺町トンネルズアプリ version ${APP_VERSION}`);

// 初期化
window.onload = async function() {
    // localStorageからの移行（初回のみ）
    const migrated = localStorage.getItem('cloudMigrated');
    if (!migrated) {
        await migrateFromLocalStorage();
        localStorage.setItem('cloudMigrated', 'true');
    }
    
    // ログイン状態をチェック
    checkLoginStatus();
    
    // 管理者ページへのアクセス制御
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
        // ログインしている場合は管理者ページにアクセスさせない
        const user = localStorage.getItem('currentUser');
        if (user) {
            alert('管理者ページは選手としてログイン中はアクセスできません。\n一度ログアウトしてから再度アクセスしてください。');
            // URLパラメータを削除してリダイレクト
            window.location.href = window.location.pathname;
        } else {
            // 未ログインの場合のみ管理者ページを表示
            showAdminPage();
        }
    }
};

// ログイン状態チェック
function checkLoginStatus() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        showMainApp();
    } else {
        // 未ログイン時の処理
        document.getElementById('loginPage').classList.add('active');
        // ボトムナビゲーションを非表示
        const bottomNav = document.querySelector('.bottom-nav');
        if (bottomNav) {
            bottomNav.style.display = 'none';
        }
    }
}

// ログインモード切り替え
let loginMode = 'login'; // 'login' or 'register'

function switchLoginMode(mode) {
    loginMode = mode;
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const registerFields = document.getElementById('registerFields');
    const loginButton = document.getElementById('loginButton');
    const loginModeText = document.getElementById('loginModeText');
    
    if (mode === 'login') {
        loginTab.className = 'flex-1 py-3 font-bold text-blue-600 border-b-2 border-blue-600';
        registerTab.className = 'flex-1 py-3 font-bold text-gray-400';
        registerFields.style.display = 'none';
        loginButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> ログイン';
        loginModeText.textContent = 'ニックネームとパスワードを入力してね！';
    } else {
        loginTab.className = 'flex-1 py-3 font-bold text-gray-400';
        registerTab.className = 'flex-1 py-3 font-bold text-blue-600 border-b-2 border-blue-600';
        registerFields.style.display = 'block';
        loginButton.innerHTML = '<i class="fas fa-user-plus"></i> 新規登録';
        loginModeText.textContent = '新しいアカウントを作成しよう！';
    }
}

// 簡易パスワードハッシュ（実際の本番環境では適切な暗号化を使用）
function simpleHash(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}

// ログイン・新規登録処理
function handleLogin() {
    if (loginMode === 'login') {
        performLogin();
    } else {
        performRegister();
    }
}

// ログイン処理
async function performLogin() {
    const nickname = document.getElementById('nicknameInput').value.trim();
    const password = document.getElementById('passwordInput').value;
    const loginButton = document.getElementById('loginButton');
    
    if (!nickname) {
        alert('ニックネームを入力してください');
        return;
    }
    
    if (!password) {
        alert('パスワードを入力してください');
        return;
    }
    
    // ボタンを無効化してローディング表示
    const originalText = loginButton.innerHTML;
    loginButton.disabled = true;
    loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ログイン中...';
    
    try {
        // クラウドからユーザーを検索
        const existingUser = await findUserByNickname(nickname);
    
    if (!existingUser) {
        alert('このニックネームは登録されていません。\n新規登録タブから登録してください。');
        loginButton.disabled = false;
        loginButton.innerHTML = originalText;
        return;
    }
    
    // パスワード確認
    const hashedPassword = simpleHash(password);
    if (existingUser.password !== hashedPassword) {
        alert('パスワードが間違っています');
        loginButton.disabled = false;
        loginButton.innerHTML = originalText;
        return;
    }
    
    // ログイン成功
    currentUser = existingUser;
    currentUser.cloudId = existingUser.id; // クラウドIDを保存
    currentUser.loginTime = Date.now();
    
    // localStorageに保存（オフライン対応）
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // クラウドにログイン時刻を更新
    await saveUserToCloud(currentUser);
    
    showMainApp();
    alert(`おかえり、${nickname}さん！`);
    } catch (error) {
        console.error('ログインエラー:', error);
        alert('ログインに失敗しました。もう一度お試しください。');
        loginButton.disabled = false;
        loginButton.innerHTML = originalText;
    }
}

// 新規登録処理
async function performRegister() {
    const nickname = document.getElementById('nicknameInput').value.trim();
    const password = document.getElementById('passwordInput').value;
    const passwordConfirm = document.getElementById('passwordConfirmInput').value;
    const position = document.getElementById('positionSelect').value;
    const loginButton = document.getElementById('loginButton');
    
    console.log('🔔 新規登録実行:', { nickname, timestamp: new Date().toISOString() });
    
    if (!nickname) {
        alert('ニックネームを入力してください');
        return;
    }
    
    if (!password) {
        alert('パスワードを入力してください');
        return;
    }
    
    if (password.length < 4) {
        alert('パスワードは4文字以上で設定してください');
        return;
    }
    
    if (password !== passwordConfirm) {
        alert('パスワードが一致しません');
        return;
    }
    
    if (!position) {
        alert('ポジションを選択してください');
        return;
    }
    
    // ボタンを無効化してローディング表示
    const originalText = loginButton.innerHTML;
    loginButton.disabled = true;
    loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 登録中...';
    
    try {
        // クラウドから既存ユーザーを確認
        const existingUser = await findUserByNickname(nickname);
    
        if (existingUser) {
            alert('このニックネームは既に使用されています。\n別のニックネームを選んでください。');
            loginButton.disabled = false;
            loginButton.innerHTML = originalText;
            return;
        }
    
        // 新規ユーザー作成
        currentUser = {
            nickname: nickname,
            password: simpleHash(password),
            position: parseInt(position),
            loginTime: Date.now(),
            positionData: {}
        };
    
        // 初期ポジションデータを作成
        initPositionData();
    
        // クラウドに保存
        const savedUser = await saveUserToCloud(currentUser);
        if (savedUser) {
            currentUser.cloudId = savedUser.id;
        }
    
        // localStorageに保存（オフライン対応）
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
        alert('登録完了！\nようこそ、' + nickname + 'さん！');
        showMainApp();
    } catch (error) {
        console.error('登録エラー:', error);
        alert('登録に失敗しました。もう一度お試しください。');
        loginButton.disabled = false;
        loginButton.innerHTML = originalText;
    }
}

// ログアウト
function logout() {
    if (confirm('ログアウトしますか？')) {
        localStorage.removeItem('currentUser');
        currentUser = null;
        location.reload();
    }
}

// メインアプリ表示
function showMainApp() {
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('learningPage').classList.add('active');
    
    // ボトムナビゲーションを表示
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        bottomNav.style.display = 'flex';
    }
    
    // 初期状態を設定
    selectRunner('none');
    
    updateProfile();
}

// ポジション別データ初期化
function initPositionData() {
    if (!currentUser.positionData) {
        currentUser.positionData = {};
    }
    
    // 現在のポジションのデータを初期化
    const pos = currentUser.position;
    if (!currentUser.positionData[pos]) {
        currentUser.positionData[pos] = {
            points: 0,
            level: 1,
            badges: [],
            quizHistory: []
        };
    }
    
    // 後方互換性：古いデータを現在のポジションに移行
    if (currentUser.points || currentUser.level || currentUser.badges || currentUser.quizHistory) {
        if (!currentUser.positionData[pos].quizHistory.length) {
            currentUser.positionData[pos] = {
                points: currentUser.points || 0,
                level: currentUser.level || 1,
                badges: currentUser.badges || [],
                quizHistory: currentUser.quizHistory || []
            };
        }
        // 古いフィールドを削除
        delete currentUser.points;
        delete currentUser.level;
        delete currentUser.badges;
        delete currentUser.quizHistory;
    }
}

// 現在のポジションデータを取得
function getCurrentPositionData() {
    initPositionData();
    return currentUser.positionData[currentUser.position];
}

// プロフィール更新
function updateProfile() {
    // ポジション別データ初期化
    initPositionData();
    const posData = getCurrentPositionData();
    
    // 基本情報の更新
    const profileNickname = document.getElementById('profileNickname');
    const profilePosition = document.getElementById('profilePosition');
    const currentPositionName = document.getElementById('currentPositionName');
    
    if (profileNickname) profileNickname.textContent = currentUser.nickname;
    if (profilePosition) profilePosition.textContent = positions[currentUser.position].name;
    if (currentPositionName) currentPositionName.textContent = positions[currentUser.position].name;
    
    const quizHistory = posData.quizHistory;
    const totalQuizzes = quizHistory.length;
    const correctAnswers = quizHistory.filter(q => q.correct).length;
    const accuracy = totalQuizzes > 0 ? Math.round((correctAnswers / totalQuizzes) * 100) : 0;
    
    // レベル計算 (100ポイントで1レベルアップ)
    const level = Math.floor(posData.points / 100) + 1;
    posData.level = level;
    const pointsToNext = 100 - (posData.points % 100);
    
    // 統計情報の更新（要素が存在する場合のみ）
    const quizAccuracy = document.getElementById('quizAccuracy');
    const totalQuizzesElem = document.getElementById('totalQuizzes');
    const userLevel = document.getElementById('userLevel');
    const userPoints = document.getElementById('userPoints');
    const pointsToNextElem = document.getElementById('pointsToNext');
    const levelProgress = document.getElementById('levelProgress');
    
    if (quizAccuracy) quizAccuracy.textContent = `${accuracy}%`;
    if (totalQuizzesElem) totalQuizzesElem.textContent = `${totalQuizzes}問`;
    if (userLevel) userLevel.textContent = level;
    if (userPoints) userPoints.textContent = posData.points;
    if (pointsToNextElem) pointsToNextElem.textContent = pointsToNext;
    
    // レベルプログレスバー
    if (levelProgress) {
        const progress = (posData.points % 100);
        levelProgress.style.width = `${progress}%`;
    }
    
    // バッジ表示
    displayBadges();
    
    // 全ポジション統計表示
    displayAllPositionsStats();
    
    // クラウドに保存（非同期・バックグラウンド）
    saveUserToCloud(currentUser).catch(err => console.error('クラウド保存エラー:', err));
}

// ページ切り替え
function switchPage(page) {
    // ログイン状態チェック
    if (!currentUser) {
        alert('ログインしてください');
        document.getElementById('loginPage').classList.add('active');
        return;
    }
    
    document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    // クイズ以外のページに切り替えるときはグラウンド図を非表示
    if (page !== 'quiz') {
        hideQuizField();
    }
    
    switch(page) {
        case 'learning':
            document.getElementById('learningPage').classList.add('active');
            document.querySelectorAll('.nav-item')[0].classList.add('active');
            break;
        case 'quiz':
            document.getElementById('quizPage').classList.add('active');
            document.querySelectorAll('.nav-item')[1].classList.add('active');
            // 現在のポジション名を表示
            const quizPositionName = document.getElementById('quizPositionName');
            if (quizPositionName) {
                quizPositionName.textContent = positions[currentUser.position].name;
            }
            break;
        case 'my':
            document.getElementById('myPage').classList.add('active');
            document.querySelectorAll('.nav-item')[2].classList.add('active');
            updateProfile();
            break;
    }
}

// 走者状況選択（ボタン）
let currentCategory = ''; // 現在選択されている系（カテゴリー）
let currentCondition = ''; // 現在選択されている守備条件

async function selectRunner(runner) {
    currentRunner = runner;
    currentBall = '';
    currentCategory = '';
    currentCondition = '';
    
    // 走者ボタンの選択状態更新
    document.querySelectorAll('.runner-btn').forEach(btn => {
        if (btn.dataset.runner === runner) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
    
    // 打球ボタンの選択状態をリセット
    document.querySelectorAll('.ball-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // カテゴリー選択を表示、他を非表示
    document.getElementById('conditionSelectContainer').style.display = 'none';
    document.getElementById('patternSelectContainer').style.display = 'none';
    
    // CSVからカテゴリーを生成
    await updateCategoryButtons();
    resetField();
}

// CSVからカテゴリーボタンを自動生成
async function updateCategoryButtonsFromCSV() {
    const container = document.getElementById('categoryButtonsContainer');
    container.innerHTML = '';
    
    if (!currentRunner) {
        container.innerHTML = '<p class="col-span-2 text-center text-gray-500 py-4">走者状況を選択してください</p>';
        return;
    }
    
    // CSVデータをロード
    const csvData = await loadFormationCSV();
    
    if (!csvData || !csvData[currentRunner]) {
        container.innerHTML = '<p class="col-span-2 text-center text-gray-500 py-4">このパターンのデータはまだ準備中です</p>';
        return;
    }
    
    const runnerData = csvData[currentRunner];
    const categories = {};
    
    // パターンをカテゴリー別に分類
    for (const key in runnerData) {
        const data = runnerData[key];
        const play = data.play;
        
        // カテゴリーを推定
        let category = 'other';
        let categoryName = 'その他';
        let icon = 'fa-baseball-ball';
        
        if (play.includes('ゴロ')) {
            category = 'grounder';
            categoryName = 'ゴロ系';
            icon = 'fa-baseball-ball';
        } else if (play.includes('ヒット') || play.includes('二塁打') || play.includes('三塁打')) {
            category = 'hit';
            categoryName = 'ヒット・長打系';
            icon = 'fa-running';
        } else if (play.includes('フライ')) {
            category = 'fly';
            categoryName = 'フライ系';
            icon = 'fa-arrow-up';
        } else if (play.includes('牽制') || play.includes('ピックオフ')) {
            category = 'pickoff';
            categoryName = '牽制系';
            icon = 'fa-hand-paper';
        } else if (play.includes('バント')) {
            category = 'bunt';
            categoryName = 'バント系';
            icon = 'fa-angle-double-right';
        } else if (play.includes('暴投') || play.includes('盗塁') || play.includes('スクイーズ') || play.includes('ワイルド')) {
            category = 'special';
            categoryName = '特殊プレー';
            icon = 'fa-exclamation-triangle';
        }
        
        if (!categories[category]) {
            categories[category] = {
                id: category,
                name: categoryName,
                icon: icon,
                patterns: []
            };
        }
        
        categories[category].patterns.push({
            key: key,
            label: play,
            condition: data.condition || ''
        });
    }
    
    // カテゴリーボタンを生成（順序を制御）
    const categoryOrder = ['grounder', 'hit', 'fly', 'pickoff', 'bunt', 'special', 'other'];
    
    categoryOrder.forEach(catId => {
        const cat = categories[catId];
        if (cat && cat.patterns.length > 0) {
            const btn = document.createElement('button');
            btn.className = 'ball-btn';
            btn.innerHTML = `
                <i class="fas ${cat.icon}"></i>
                <div>${cat.name}</div>
                <div class="text-xs opacity-75">(${cat.patterns.length})</div>
            `;
            btn.onclick = () => selectCategoryFromCSV(cat);
            container.appendChild(btn);
        }
    });
}

// カテゴリー選択（CSV版）
function selectCategoryFromCSV(category) {
    currentCategory = category.id;
    
    // カテゴリーボタンの選択状態更新
    document.querySelectorAll('#categoryButtonsContainer .ball-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.closest('.ball-btn').classList.add('selected');
    
    // 守備条件があるか確認
    const hasConditions = category.patterns.some(p => p.condition);
    
    if (hasConditions) {
        // 守備条件でグループ化
        const conditions = {};
        category.patterns.forEach(p => {
            const cond = p.condition || '通常';
            if (!conditions[cond]) {
                conditions[cond] = [];
            }
            conditions[cond].push(p);
        });
        
        // 守備条件が複数ある場合のみ選択UIを表示
        if (Object.keys(conditions).length > 1) {
            showConditionButtons(conditions);
            document.getElementById('patternSelectContainer').style.display = 'none';
            return;
        }
    }
    
    // 守備条件がない、または1つだけの場合は直接パターン表示
    document.getElementById('conditionSelectContainer').style.display = 'none';
    showPatternButtons(category.patterns);
}

// 守備条件ボタンを表示
function showConditionButtons(conditions) {
    const container = document.getElementById('conditionButtonsContainer');
    container.innerHTML = '';
    
    for (const condName in conditions) {
        const btn = document.createElement('button');
        btn.className = 'ball-btn';
        btn.innerHTML = `
            <i class="fas fa-shield-alt"></i>
            <div>${condName}</div>
            <div class="text-xs opacity-75">(${conditions[condName].length})</div>
        `;
        btn.onclick = () => {
            currentCondition = condName;
            document.querySelectorAll('#conditionButtonsContainer .ball-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            showPatternButtons(conditions[condName]);
        };
        container.appendChild(btn);
    }
    
    document.getElementById('conditionSelectContainer').style.display = 'block';
}

// パターンボタンを表示
function showPatternButtons(patterns) {
    const container = document.getElementById('ballButtonsContainer');
    container.innerHTML = '';
    
    patterns.forEach(play => {
        const btn = document.createElement('button');
        btn.className = 'ball-btn';
        
        // テキストの長さに応じてフォントサイズを調整
        const labelText = play.condition ? `${play.label}（${play.condition}）` : play.label;
        if (labelText.length >= 14) {
            btn.style.fontSize = '11px';
        } else if (labelText.length >= 10) {
            btn.style.fontSize = '12px';
        } else if (labelText.length >= 8) {
            btn.style.fontSize = '13px';
        }
        
        btn.dataset.ball = play.key;
        btn.textContent = play.label;
        btn.onclick = () => selectBall(play.key);
        container.appendChild(btn);
    });
    
    document.getElementById('patternSelectContainer').style.display = 'block';
}

// カテゴリー（系）ボタン生成
async function updateCategoryButtons() {
    const container = document.getElementById('categoryButtonsContainer');
    container.innerHTML = '';
    
    if (!currentRunner) {
        container.innerHTML = '<p class="col-span-2 text-center text-gray-500 py-4">走者状況を選択してください</p>';
        return;
    }
    
    // CSVからデータを取得
    const formationData = await loadFormationCSV();
    
    if (!formationData) {
        container.innerHTML = '<p class="col-span-2 text-center text-gray-500 py-4">データの読み込みに失敗しました</p>';
        return;
    }
    
    // 走者状況に対応するデータを取得
    // currentRunner は英語キー（例: 'none', 'first' など）
    const runnerData = formationData[currentRunner];
    
    if (!runnerData) {
        container.innerHTML = '<p class="col-span-2 text-center text-gray-500 py-4">このパターンのデータは準備中です</p>';
        return;
    }
    
    // パターンをカテゴリー別に分類
    const categories = categorizePatterns(runnerData);
    
    // カテゴリーボタンを生成
    Object.keys(categories).forEach(categoryName => {
        const patterns = categories[categoryName];
        if (patterns.length === 0) return;
        
        const btn = document.createElement('button');
        btn.className = 'ball-btn';
        btn.style.fontSize = '14px';
        btn.dataset.category = categoryName;
        
        // カテゴリー別にアイコンを設定
        const icon = getCategoryIcon(categoryName);
        
        btn.innerHTML = `
            <i class="fas ${icon}"></i>
            <div>${formatButtonText(categoryName)}</div>
            <div class="text-xs opacity-75">(${patterns.length})</div>
        `;
        btn.onclick = () => selectCategory(categoryName, patterns);
        container.appendChild(btn);
    });
}

// カテゴリー選択
function selectCategory(categoryName, patterns) {
    currentCategory = categoryName;
    currentBall = '';
    currentCondition = '';
    
    // カテゴリーボタンの選択状態更新
    document.querySelectorAll('#categoryButtonsContainer .ball-btn').forEach(btn => {
        if (btn.dataset.category === categoryName) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
    
    // 守備条件があるか確認
    const hasConditions = checkIfPatternsHaveConditions(patterns);
    
    if (hasConditions) {
        // 守備条件選択を表示
        document.getElementById('patternSelectContainer').style.display = 'none';
        document.getElementById('conditionSelectContainer').style.display = 'block';
        showConditionButtons(patterns, categoryName);
    } else {
        // 直接パターン選択を表示
        document.getElementById('conditionSelectContainer').style.display = 'none';
        document.getElementById('patternSelectContainer').style.display = 'block';
        document.getElementById('categoryName').textContent = categoryName;
        showPatternButtons(patterns);
    }
    
    resetField();
}

// パターンをカテゴリー別に分類する関数
function categorizePatterns(runnerData) {
    const categories = {
        'ゴロ': [],
        'ヒット・長打': [],
        '牽制・ピックオフ': [],
        'バント': [],
        '特殊プレー': []
    };
    
    for (const key in runnerData) {
        const data = runnerData[key];
        const play = data.play;
        const condition = data.condition || '';
        const fullName = condition ? `${play}（${condition}）` : play;
        
        const pattern = {
            key: key,
            play: play,
            condition: condition,
            label: fullName
        };
        
        // カテゴリーに分類
        if (play.includes('牽制') || play.includes('ピックオフ')) {
            categories['牽制・ピックオフ'].push(pattern);
        } else if (play.includes('バント') || play.includes('スクイズ')) {
            categories['バント'].push(pattern);
        } else if (play.includes('ワイルド') || play.includes('暴投') || play.includes('捕逸') || play.includes('盗塁')) {
            categories['特殊プレー'].push(pattern);
        } else if (play.includes('ゴロ')) {
            categories['ゴロ'].push(pattern);
        } else {
            categories['ヒット・長打'].push(pattern);
        }
    }
    
    return categories;
}

// カテゴリー別のアイコンを取得
function getCategoryIcon(categoryName) {
    const iconMap = {
        '牽制・ピックオフ': 'fa-exchange-alt',
        'バント': 'fa-sign-out-alt',
        '特殊プレー': 'fa-exclamation-triangle',
        'ゴロ': 'fa-baseball-ball',
        'ヒット・長打': 'fa-fire'
    };
    return iconMap[categoryName] || 'fa-circle';
}

// パターンに守備条件があるか確認
function checkIfPatternsHaveConditions(patterns) {
    // 少なくとも1つのパターンに守備条件があれば true を返す
    return patterns.some(p => p.condition && p.condition.trim());
}

// 守備条件ボタンを表示
function showConditionButtons(patterns, categoryName) {
    const container = document.getElementById('conditionButtonsContainer');
    container.innerHTML = '';
    
    // 守備条件ごとにパターンをグループ化
    const conditionGroups = {};
    patterns.forEach(pattern => {
        const condition = pattern.condition || '通常';
        if (!conditionGroups[condition]) {
            conditionGroups[condition] = [];
        }
        conditionGroups[condition].push(pattern);
    });
    
    // 守備条件ボタンを生成
    Object.keys(conditionGroups).forEach(condition => {
        const btn = document.createElement('button');
        btn.className = 'ball-btn';
        btn.style.fontSize = '14px';
        btn.dataset.condition = condition;
        
        const conditionIcon = condition.includes('前進') ? 'fa-arrow-up' : 
                             condition.includes('中間') ? 'fa-arrows-alt-v' : 'fa-shield-alt';
        
        btn.innerHTML = `
            <i class="fas ${conditionIcon}"></i>
            <div>${formatButtonText(condition)}</div>
            <div class="text-xs opacity-75">(${conditionGroups[condition].length})</div>
        `;
        
        btn.onclick = () => selectCondition(condition, conditionGroups[condition], categoryName);
        container.appendChild(btn);
    });
}

// 守備条件選択（新版）
function selectCondition(condition, patterns, categoryName) {
    currentCondition = condition;
    currentBall = '';
    
    // 条件ボタンの選択状態更新
    document.querySelectorAll('#conditionButtonsContainer .ball-btn').forEach(btn => {
        if (btn.dataset.condition === condition) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
    
    // パターン選択を表示
    document.getElementById('patternSelectContainer').style.display = 'block';
    document.getElementById('categoryName').textContent = `${categoryName}（${condition}）`;
    
    // 守備条件なしのパターンボタンを生成（条件は表示しない）
    showPatternButtonsWithoutCondition(patterns);
    
    resetField();
}

// パターンボタンを表示（守備条件なし）
function showPatternButtonsWithoutCondition(patterns) {
    const container = document.getElementById('ballButtonsContainer');
    container.innerHTML = '';
    
    patterns.forEach(pattern => {
        const btn = document.createElement('button');
        btn.className = 'ball-btn';
        
        // play名のみを表示（守備条件は除く）
        const labelText = pattern.play;
        
        // 括弧を除いた本文の長さでフォントサイズを判定
        const textWithoutBrackets = labelText.replace(/[（(].*?[）)]/g, '');
        const mainTextLength = textWithoutBrackets.length;
        
        if (mainTextLength >= 10 || labelText.length >= 16) {
            btn.style.fontSize = '11px';
        } else if (mainTextLength >= 8 || labelText.length >= 12) {
            btn.style.fontSize = '12px';
        } else if (mainTextLength >= 6 || labelText.length >= 10) {
            btn.style.fontSize = '13px';
        }
        
        btn.dataset.ball = pattern.key;
        btn.innerHTML = formatButtonText(labelText); // textContent → innerHTML
        btn.onclick = () => selectBall(pattern.key);
        container.appendChild(btn);
    });
}

// ボタンテキストを整形する（括弧を小さく表示）
function formatButtonText(text) {
    // 括弧とその中身を小さく表示
    return text.replace(/（([^）]+)）/g, '<span class="bracket-text">（$1）</span>')
               .replace(/\(([^)]+)\)/g, '<span class="bracket-text">($1)</span>');
}

// パターンボタンを表示する関数
function showPatternButtons(patterns) {
    const container = document.getElementById('ballButtonsContainer');
    container.innerHTML = '';
    
    patterns.forEach(pattern => {
        const btn = document.createElement('button');
        btn.className = 'ball-btn';
        
        // テキストの長さに応じてフォントサイズを調整
        const labelText = pattern.label;
        
        // 括弧を除いた本文の長さでフォントサイズを判定
        const textWithoutBrackets = labelText.replace(/[（(].*?[）)]/g, '');
        const mainTextLength = textWithoutBrackets.length;
        
        if (mainTextLength >= 10 || labelText.length >= 16) {
            btn.style.fontSize = '11px';
        } else if (mainTextLength >= 8 || labelText.length >= 12) {
            btn.style.fontSize = '12px';
        } else if (mainTextLength >= 6 || labelText.length >= 10) {
            btn.style.fontSize = '13px';
        }
        
        btn.dataset.ball = pattern.key;
        btn.innerHTML = formatButtonText(pattern.label); // textContent → innerHTML
        btn.onclick = () => selectBall(pattern.key);
        container.appendChild(btn);
    });
}

// 打球/プレーボタン生成（第3段階） - CSVから動的に生成
// 打球方向選択（ボタン）
function selectBall(ballId) {
    currentBall = ballId;
    
    // 打球ボタンの選択状態更新
    document.querySelectorAll('.ball-btn').forEach(btn => {
        if (btn.dataset.ball === ballId) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
    
    // 自動的に動きを表示
    showMovements();
}

// 走者インジケーター更新（SVG削除により不要）
// function updateRunnerIndicators() { ... }

// 動きを表示
async function showMovements() {
    if (!currentBall) {
        alert('打球方向を選択してください');
        return;
    }
    
    // 走者パターンのラベルを取得
    const runnerLabel = runnerPatterns.find(r => r.key === currentRunner)?.label || '';
    
    // 状況表示
    document.getElementById('situationDisplay').style.display = 'block';
    document.getElementById('situationText').textContent = runnerLabel;
    
    // CSVデータを読み込み
    const csvData = await loadFormationCSV();
    
    let imageData = null;
    let fallbackData = null;
    
    // CSVデータから検索
    if (csvData && csvData[currentRunner]) {
        imageData = csvData[currentRunner][currentBall];
        
        // 見つからない場合、部分一致検索を試みる
        if (!imageData) {
            const runnerData = csvData[currentRunner];
            for (const key in runnerData) {
                if (key.includes(currentBall) || currentBall.includes(key.replace(/_/g, ''))) {
                    imageData = runnerData[key];
                    break;
                }
            }
        }
    }
    
    // CSVにない場合、個別データファイルから検索
    if (!imageData) {
        // 走者なしの場合
        if (currentRunner === 'none' && typeof noneRunnerDetailedData !== 'undefined') {
            const imageKey = convertBallKeyToImageKey(currentBall);
            imageData = noneRunnerDetailedData[imageKey];
        }
        // 走者一塁の場合
        else if (currentRunner === 'first' && typeof runnerFirstData !== 'undefined') {
            imageData = runnerFirstData[currentBall];
        }
    }
    
    // 旧データ構造からフォールバック
    if (!imageData) {
        const dataKey = `${currentRunner}-${currentBall}`;
        fallbackData = coveringData[dataKey];
    }
    
    // データが見つからない場合
    if (!imageData && !fallbackData) {
        document.getElementById('formationImageContainer').style.display = 'block';
        const imgElement = document.getElementById('formationImage');
        imgElement.style.display = 'none';
        
        const titleElement = document.getElementById('formationImageContainer').querySelector('.text-center.mb-3');
        if (titleElement) {
            titleElement.innerHTML = `
                <h3 class="font-bold text-gray-800 flex items-center justify-center gap-2">
                    <i class="fas fa-info-circle text-yellow-600"></i>
                    このパターンは準備中です
                </h3>
                <p class="text-sm text-gray-600 mt-2">フォーメーション画像は今後追加予定です</p>
            `;
        }
        document.getElementById('articleLink').style.display = 'none';
        document.getElementById('rolesDescription').style.display = 'none';
        return;
    }
    
    // 画像を表示
    if (imageData && imageData.imageUrl) {
        displayRunnerFormationImage(imageData);
    }
    
    // 役割説明表示
    const displayData = imageData || fallbackData;
    if (displayData) {
        // CSVデータの場合は movements プロパティがある
        const movementsData = displayData.movements || displayData;
        displayRoles(movementsData);
    }
}

// data.jsのボールキーをdata_with_images.jsのキーに変換
function convertBallKeyToImageKey(ballKey) {
    const keyMap = {
        'ss_grounder': 'ss_grounder',
        '2b_grounder': '2b_grounder',
        '3b_grounder': '3b_grounder',
        '1b_grounder': '1b_grounder',
        'lf_hit': 'lf_hit',
        'cf_hit': 'cf_hit',
        'rf_hit': 'rf_hit',
        'lf_fly': 'lf_hit',  // レフトフライもlf_hitの画像を使用
        'cf_fly': 'cf_hit',  // センターフライもcf_hitの画像を使用
        'rf_fly': 'rf_hit'   // ライトフライもrf_hitの画像を使用
    };
    return keyMap[ballKey] || ballKey;
}

// 走者データからフォーメーション画像を表示
function displayRunnerFormationImage(imageData) {
    if (!imageData || !imageData.imageUrl) {
        document.getElementById('formationImageContainer').style.display = 'none';
        return;
    }
    
    const container = document.getElementById('formationImageContainer');
    const img = document.getElementById('formationImage');
    const articleLink = document.getElementById('articleLink');
    const loadingOverlay = document.getElementById('imageLoadingOverlay');
    
    // タイトルを復元
    const titleElement = container.querySelector('.text-center.mb-3');
    if (titleElement) {
        titleElement.innerHTML = `
            <h3 class="font-bold text-gray-800 flex items-center justify-center gap-2">
                <i class="fas fa-image text-blue-600"></i>
                フォーメーション図
            </h3>
        `;
    }
    
    // ローディング表示
    loadingOverlay.style.display = 'flex';
    container.style.display = 'block';
    img.style.display = 'block';
    
    // 画像を読み込み
    img.onload = function() {
        loadingOverlay.style.display = 'none';
    };
    img.onerror = function() {
        loadingOverlay.style.display = 'none';
        console.error('画像の読み込みに失敗しました:', imageData.imageUrl);
    };
    img.src = imageData.imageUrl;
    img.alt = imageData.name + 'のフォーメーション図';
    
    // 記事リンクを表示
    if (imageData.articleUrl) {
        articleLink.style.display = 'block';
        articleLink.querySelector('a').href = imageData.articleUrl;
    } else {
        articleLink.style.display = 'none';
    }
}

// フォーメーション画像を表示
function displayFormationImage(ballKey) {
    const imageData = noneRunnerDetailedData[ballKey];
    if (!imageData || !imageData.imageUrl) {
        document.getElementById('formationImageContainer').style.display = 'none';
        return;
    }
    
    const container = document.getElementById('formationImageContainer');
    const img = document.getElementById('formationImage');
    const articleLink = document.getElementById('articleLink');
    const loadingOverlay = document.getElementById('imageLoadingOverlay');
    
    // ローディング表示
    loadingOverlay.style.display = 'flex';
    container.style.display = 'block';
    
    // 画像を読み込み
    img.onload = function() {
        loadingOverlay.style.display = 'none';
    };
    img.onerror = function() {
        loadingOverlay.style.display = 'none';
        console.error('画像の読み込みに失敗しました:', imageData.imageUrl);
    };
    img.src = imageData.imageUrl;
    img.alt = imageData.name + 'のフォーメーション図';
    
    // 記事リンクを表示
    if (imageData.articleUrl) {
        articleLink.style.display = 'block';
        articleLink.querySelector('a').href = imageData.articleUrl;
    } else {
        articleLink.style.display = 'none';
    }
}

// 矢印と色分け表示（SVG削除により不要）
// function displayMovements(movements) { ... }

// 矢印の先端を作成
// 矢印の先端を作成（SVG削除により不要）
// function createArrowhead(x1, y1, x2, y2, color) { ... }

// CSVから全フォーメーションデータを読み込む
let allFormationDataFromCSV = null;

async function loadFormationCSV() {
    if (allFormationDataFromCSV) return allFormationDataFromCSV;
    
    try {
        const response = await fetch('formation_all.csv');
        const csvText = await response.text();
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        
        allFormationDataFromCSV = {};
        
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            
            const values = parseCSVLine(lines[i]);
            if (values.length < 13) continue;
            
            const runner = values[0];
            const play = values[1];
            const condition = values[2];
            
            // キーを生成（守備条件も含める）
            let key = play.toLowerCase().replace(/[（）()]/g, '_').replace(/\s+/g, '_');
            if (condition && condition.trim()) {
                // 守備条件がある場合はキーに追加
                key += '_' + condition.toLowerCase().replace(/\s+/g, '_');
            }
            
            const data = {
                id: key,
                name: play,
                runner: runner,
                play: play,
                condition: condition,
                imageUrl: values[13],
                articleUrl: values[12],
                movements: {
                    1: { desc: values[3] || '' },
                    2: { desc: values[4] || '' },
                    3: { desc: values[5] || '' },
                    4: { desc: values[6] || '' },
                    5: { desc: values[7] || '' },
                    6: { desc: values[8] || '' },
                    7: { desc: values[9] || '' },
                    8: { desc: values[10] || '' },
                    9: { desc: values[11] || '' }
                }
            };
            
            // 走者状況をキーに変換
            const runnerKey = runnerKeyMap[runner] || runner;
            if (!allFormationDataFromCSV[runnerKey]) {
                allFormationDataFromCSV[runnerKey] = {};
            }
            
            allFormationDataFromCSV[runnerKey][key] = data;
        }
        
        return allFormationDataFromCSV;
    } catch (error) {
        console.error('CSV読み込みエラー:', error);
        return null;
    }
}

// CSVの1行をパースする（カンマ区切り、ダブルクォート対応）
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

// 説明文から役割を判断する関数（優先順位付き判定）
function inferRoleFromDescription(desc) {
    if (!desc || !desc.trim()) return 'wait';
    
    let normalized = desc.trim();
    
    // 🎯 最初の動きを抽出
    // 1. 「打球が飛んだ瞬間は〜、まず〜」のパターン → 「まず〜」の部分を抽出
    const ballFlewMazuMatch = normalized.match(/[、。](まず|最初は|当初は)[^。]+/);
    if (ballFlewMazuMatch) {
        // 「まず」以降の部分だけを判定対象にする
        normalized = ballFlewMazuMatch[0].substring(1); // 先頭の「、」または「。」を除去
    } else {
        // 2. 文頭から「まず」「最初は」「当初は」で始まる場合
        const firstActionMatch = normalized.match(/^(まず|最初は|当初は)[^。]+/);
        if (firstActionMatch) {
            normalized = firstActionMatch[0];
        } else {
            // 3. 「〜。その後〜」「〜。以後〜」のパターンがあれば、最初の文だけを抽出
            const firstSentenceMatch = normalized.match(/^[^。]+/);
            if (firstSentenceMatch && (normalized.includes('その後') || normalized.includes('以後'))) {
                normalized = firstSentenceMatch[0];
            }
        }
    }
    
    // 【優先度1】待機・定位置の明確な指示
    if (normalized.includes('待機') || 
        normalized.includes('主だったカバーなし') || 
        normalized.includes('主だったカバーリングはない') ||
        normalized.includes('定位置へ戻る') ||
        normalized.includes('定位置で') ||
        normalized.includes('定位置に戻る') ||
        (normalized.includes('定位置') && !normalized.includes('から'))) {
        return 'wait';
    }
    
    // 【優先度2】打球処理（本人が処理する）
    // ただし「打球処理のカバー」「打球処理をカバー」は除外
    const isBallHandler = (
        // 「打球処理・〇〇送球」のような簡潔な表現
        normalized.match(/^打球処理[・・]/) ||
        // 明確に「打球を処理」と書かれている（カバーでなければ）
        (normalized.includes('打球を処理') && !normalized.includes('打球処理のカバー') && !normalized.includes('打球処理をカバー')) ||
        normalized.includes('ゴロを捕球') ||
        // 投球動作
        normalized.includes('投球する') ||
        normalized.includes('牽制球を投げる') ||
        // キャッチャーの処理
        normalized.includes('ミットで勢いを止めて') ||
        normalized.includes('ミットで打球の勢いを止め') ||
        // 「処理」+「慌てず/焦らない」は本人の打球処理
        (normalized.includes('処理') && (normalized.includes('慌てず') || normalized.includes('焦ら'))) ||
        // 「捕球後」は打球処理の証拠（カバーでなければ）
        (normalized.includes('捕球後') && !normalized.includes('カバー')) ||
        // 「送球する」は打球処理後のアクション
        (normalized.match(/[一二三本]塁[へに]送球/) && !normalized.includes('備え')) ||
        // 打球処理を目指す動作（カバーでない）
        (normalized.includes('打球処理を目指') && !normalized.includes('カバー'))
    );
    
    if (isBallHandler) return 'ball';
    
    // 【優先度3】ベースカバー（ベースに入って送球を受ける）
    const isBaseCover = (
        normalized.includes('ベースカバー') ||
        normalized.includes('ベースに入る') ||
        normalized.includes('ベースに入り') ||
        normalized.includes('ベースへ入') ||
        normalized.includes('ベースを確保') ||
        normalized.match(/[一二三本]塁.*ベース.*入/) ||
        // 「送球に備える」+「ベース」はベースカバー
        (normalized.includes('送球に備え') && normalized.match(/[一二三本]塁/)) ||
        // タッチプレー
        (normalized.includes('タッチ') && !normalized.includes('バックアップ')) ||
        (normalized.includes('タッグ') && !normalized.includes('バックアップ'))
    );
    
    // ただしバックアップや後方カバーは除外
    if (isBaseCover && 
        !normalized.includes('バックアップ') && 
        !normalized.includes('悪送球') &&
        !normalized.match(/後方.*ベース/) &&
        !normalized.includes('カバーリングする')) {
        return 'base';
    }
    
    // 【優先度4】バックアップ（後方から備える、悪送球対応）
    const isBackup = (
        normalized.includes('バックアップ') ||
        normalized.includes('悪送球') ||
        normalized.includes('ファンブル') ||
        // 「〜に備えてカバーリング」はバックアップ
        (normalized.includes('備えてカバーリング')) ||
        // 「〜に備える」+「悪送球/ファンブル/エラー」はバックアップ
        (normalized.includes('備え') && (normalized.includes('悪送球') || normalized.includes('ファンブル') || normalized.includes('エラー'))) ||
        // 後方カバー
        normalized.includes('後方') ||
        normalized.match(/[左右一二三].*側.*バック/) ||
        // 「ランダウンプレー」「挟殺プレー」に備える
        (normalized.includes('ランダウン') || normalized.includes('挟殺')) ||
        // 「大きく逸球」「転がった場合」等の緊急対応
        (normalized.includes('転がった') && normalized.includes('場合')) ||
        // 「ボールが〜転がった」等の後方支援
        (normalized.includes('ボール') && normalized.includes('転がった'))
    );
    
    if (isBackup) return 'backup';
    
    // 【優先度5】カバーリング（打球処理の補助、送球カバー、中継プレー）
    const isCover = (
        // 打球処理の補助・カバー
        normalized.includes('打球処理をカバー') ||
        normalized.includes('打球処理カバー') ||
        normalized.includes('打球処理のカバー') ||
        normalized.includes('打球処理の補助') ||
        // 一般的なカバーリング
        (normalized.includes('カバーリング') && !normalized.includes('ベースカバー')) ||
        (normalized.includes('カバー') && !normalized.includes('ベースカバー') && !normalized.includes('バックアップ')) ||
        // 中継プレー
        normalized.includes('中継') ||
        normalized.includes('カット') ||
        normalized.includes('カットマン') ||
        // 前進守備・チャージ
        normalized.includes('前進') ||
        normalized.includes('チャージ') ||
        // 打球に反応・向かう
        normalized.includes('打球に反応') ||
        normalized.includes('打球を目指') ||
        normalized.includes('打球方向') ||
        // 指示出し
        normalized.includes('指示') ||
        // 確認動作
        normalized.includes('確認') ||
        // フォロー・補助動作
        normalized.includes('フォロー') ||
        normalized.includes('補助') ||
        // 「近づく」「向かう」等の積極的動作
        normalized.includes('近づく') ||
        normalized.includes('向かう') ||
        normalized.includes('移動') ||
        // 「備える」だけ（ベースカバーやバックアップに該当しない場合）
        (normalized.includes('備え') && !normalized.match(/[一二三本]塁.*備え/)) ||
        // 「〜を見る」「監視」等の観察動作
        normalized.includes('監視') ||
        // 「位置がずれていたら修正」等の調整動作
        normalized.includes('修正') ||
        // 「ノーカット」等の判断動作
        normalized.includes('ノーカット') ||
        normalized.includes('フェイク')
    );
    
    if (isCover) return 'cover';
    
    // 【デフォルト】何も該当しない場合は待機
    return 'wait';
}

// 役割説明表示
function displayRoles(movements) {
    const container = document.getElementById('rolesContent');
    document.getElementById('rolesDescription').style.display = 'block';
    
    // movementsが正しい形式か確認
    if (!movements || typeof movements !== 'object') {
        container.innerHTML = '<p class="text-gray-500">役割データがありません</p>';
        return;
    }
    
    let html = '';
    for (let pos = 1; pos <= 9; pos++) {
        const movement = movements[pos];
        if (!movement) continue;
        
        const posData = positions[pos];
        const isUserPosition = currentUser && currentUser.position === pos;
        
        // roleがない場合は説明文から推定
        let role = movement.role;
        if (!role && movement.desc && movement.desc.trim()) {
            role = inferRoleFromDescription(movement.desc);
        } else if (!role && (!movement.desc || !movement.desc.trim())) {
            role = 'wait'; // 説明がない場合は待機
        }
        
        let roleClass = '';
        let roleName = '';
        
        if (role === 'ball') {
            roleClass = 'role-ball-handler';
            roleName = '打球処理';
        } else if (role === 'cover') {
            roleClass = 'role-cover';
            roleName = 'カバー';
        } else if (role === 'backup') {
            roleClass = 'role-backup';
            roleName = 'バックアップ';
        } else if (role === 'base') {
            roleClass = 'role-base-cover';
            roleName = 'ベースカバー';
        } else {
            roleClass = 'role-wait';
            roleName = '待機';
        }
        
        const desc = movement.desc && movement.desc.trim() ? movement.desc : '主だったカバーなし';
        
        html += `
            <div class="p-3 rounded-lg ${isUserPosition ? 'bg-yellow-50 border-2 border-yellow-400' : 'bg-gray-50'}">
                <div class="flex items-center justify-between mb-2">
                    <span class="font-bold ${isUserPosition ? 'text-yellow-700' : 'text-blue-600'}">${posData.name}</span>
                    ${isUserPosition ? '<span class="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded">あなた</span>' : ''}
                </div>
                <span class="role-badge ${roleClass}">${roleName}</span>
                <p class="text-gray-700 mt-2">${desc}</p>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// フィールドリセット
function resetField() {
    // 画像コンテナを非表示
    document.getElementById('formationImageContainer').style.display = 'none';
    
    // 役割説明非表示
    document.getElementById('rolesDescription').style.display = 'none';
    document.getElementById('situationDisplay').style.display = 'none';
}

// 次の問題を生成するラッパー関数（onclick用）
function handleNextQuestion() {
    generateNewQuestion().catch(err => {
        console.error('問題生成エラー:', err);
        alert('問題の生成に失敗しました。もう一度お試しください。');
    });
}

// クイズ開始（1問1答方式）
async function startQuiz() {
    // ログイン状態チェック
    if (!currentUser) {
        alert('ログインしてください');
        return;
    }
    
    // 現在のポジション名を表示
    const quizPositionName = document.getElementById('quizPositionName');
    if (quizPositionName) {
        quizPositionName.textContent = positions[currentUser.position].name;
    }
    
    consecutiveCorrect = 0;
    
    // CSVデータをロード
    if (!allFormationDataFromCSV || Object.keys(allFormationDataFromCSV).length === 0) {
        await loadFormationCSV();
    }
    
    await generateNewQuestion();
}

// 新しい問題を生成（現在のポジションのみ・CSV対応）
async function generateNewQuestion() {
    // フィードバックコンテナをクリア
    const feedbackContainer = document.getElementById('quizFeedbackContainer');
    if (feedbackContainer) {
        feedbackContainer.innerHTML = '';
    }
    
    // CSVデータがロードされていなければロード
    if (!allFormationDataFromCSV || Object.keys(allFormationDataFromCSV).length === 0) {
        await loadFormationCSV();
    }
    
    // 実際にデータが存在する組み合わせを全て収集
    const availableCombinations = [];
    
    // CSVデータから収集
    Object.keys(allFormationDataFromCSV).forEach(runnerKey => {
        const runnerData = allFormationDataFromCSV[runnerKey];
        Object.keys(runnerData).forEach(playKey => {
            const formationData = runnerData[playKey];
            
            // 現在のポジションのデータが存在するか確認
            if (formationData.movements && formationData.movements[currentUser.position] && formationData.movements[currentUser.position].desc) {
                // 走者・プレーのラベルを取得
                const runnerLabel = formationData.runner || runnerKey;
                const playLabel = formationData.play || playKey;
                
                availableCombinations.push({
                    runner: runnerKey,
                    play: playKey,
                    runnerLabel: runnerLabel,
                    playLabel: playLabel,
                    data: formationData
                });
            }
        });
    });
    
    // 利用可能な組み合わせがない場合
    if (availableCombinations.length === 0) {
        alert('現在のポジションに対応するクイズデータがありません');
        return;
    }
    
    // ランダムに1つ選択
    const selected = availableCombinations[Math.floor(Math.random() * availableCombinations.length)];
    const runnerKey = selected.runner;
    const playKey = selected.play;
    const formationData = selected.data;
    
    // 現在のポジションのみを出題
    const position = currentUser.position;
    const correctMovement = formationData.movements[position];
    
    const options = [];
    options.push(correctMovement.desc);
    
    // 他のポジションから間違い選択肢を生成（重複を除外）
    const allMovements = [];
    for (let pos = 1; pos <= 9; pos++) {
        if (formationData.movements[pos] && formationData.movements[pos].desc) {
            allMovements.push(formationData.movements[pos]);
        }
    }
    
    // 重複を除外してユニークな説明文のリストを作成
    const uniqueDescriptions = [...new Set(allMovements.map(m => m.desc))];
    const otherDescriptions = uniqueDescriptions.filter(d => d !== correctMovement.desc);
    
    // 選択肢が4つになるまでランダムに追加
    while (options.length < 4 && otherDescriptions.length > 0) {
        const idx = Math.floor(Math.random() * otherDescriptions.length);
        const selectedDesc = otherDescriptions.splice(idx, 1)[0];
        // 念のため重複チェック
        if (!options.includes(selectedDesc)) {
            options.push(selectedDesc);
        }
    }
    
    // 選択肢が4つ未満の場合、他のシチュエーションからも選択肢を追加
    if (options.length < 4) {
        const additionalOptions = [];
        
        // 他の走者状況・打球パターンから選択肢を収集
        availableCombinations.forEach(combo => {
            if (combo.data !== formationData) {
                const movement = combo.data.movements[position];
                if (movement && movement.desc && !options.includes(movement.desc) && !additionalOptions.includes(movement.desc)) {
                    additionalOptions.push(movement.desc);
                }
            }
        });
        
        // ランダムにシャッフルして追加
        additionalOptions.sort(() => Math.random() - 0.5);
        while (options.length < 4 && additionalOptions.length > 0) {
            options.push(additionalOptions.shift());
        }
    }
    
    // 選択肢をシャッフル
    const shuffledOptions = options.sort(() => Math.random() - 0.5);
    
    currentQuestion = {
        runner: runnerKey,
        runnerLabel: selected.runnerLabel,
        play: playKey,
        playLabel: selected.playLabel,
        position: position,
        positionName: positions[position].name,
        correctAnswer: correctMovement.desc,
        correctRole: correctMovement.role || 'wait',
        options: shuffledOptions,
        imageUrl: formationData.imageUrl || '',
        articleUrl: formationData.articleUrl || ''
    };
    
    showQuizQuestion();
}

// クイズ問題表示
function showQuizQuestion() {
    // 画像コンテナと親コンテナを非表示にする
    const fieldContainer = document.getElementById('quizFieldContainer');
    const imageContainer = document.getElementById('quizImageContainer');
    
    if (fieldContainer) {
        fieldContainer.style.display = 'none';
    }
    if (imageContainer) {
        imageContainer.style.display = 'none';
    }
    
    const container = document.getElementById('quizContainer');
    const posData = getCurrentPositionData();
    const quizHistory = posData.quizHistory || [];
    const totalQuizzes = quizHistory.length;
    const correctAnswers = quizHistory.filter(q => q.correct).length;
    
    let html = `
        <div class="card mb-4">
            <div class="flex justify-between items-center mb-4">
                <div>
                    <p class="text-sm text-gray-600">挑戦回数</p>
                    <p class="text-2xl font-bold text-blue-600">${totalQuizzes}問</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600">正解数</p>
                    <p class="text-2xl font-bold text-green-600">${correctAnswers}問</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600">連続正解</p>
                    <p class="text-2xl font-bold text-orange-600">${consecutiveCorrect}回</p>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="situation-card mb-4">
                <p class="text-sm mb-1">走者：${currentQuestion.runnerLabel}</p>
                <p class="text-sm mb-1">プレー：${currentQuestion.playLabel}</p>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-4">
                <span class="text-blue-600">${currentQuestion.positionName}</span>の動きは？
            </h3>
            <div class="space-y-3" id="quizOptions">
    `;
    
    currentQuestion.options.forEach((option, idx) => {
        const label = String.fromCharCode(65 + idx);
        html += `
            <div class="quiz-option" onclick="answerQuiz(${idx})">
                <span class="inline-block">
                    <span class="font-bold text-gray-700">${label}.</span>
                    <span class="ml-1">${formatButtonText(option)}</span>
                </span>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // グラウンド図を表示（デフォルト配置+走者インジケーター）
    showQuizField(currentQuestion.runner);
}

// クイズ回答
function answerQuiz(answerIndex) {
    const answer = currentQuestion.options[answerIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    // ポジションデータ取得
    const posData = getCurrentPositionData();
    
    // 正解判定とポイント計算
    let pointsEarned = 0;
    if (isCorrect) {
        consecutiveCorrect++;
        pointsEarned = 10; // 基本ポイント
        
        // 連続正解ボーナス
        if (consecutiveCorrect >= 3) {
            pointsEarned += 5; // +5ボーナス
        }
        if (consecutiveCorrect >= 5) {
            pointsEarned += 10; // さらに+10ボーナス
        }
        
        posData.points = (posData.points || 0) + pointsEarned;
    } else {
        consecutiveCorrect = 0;
    }
    
    // クイズ履歴に追加
    posData.quizHistory.push({
        timestamp: new Date().toISOString(),
        runner: currentQuestion.runner,
        play: currentQuestion.play,
        position: currentQuestion.position,
        correct: isCorrect
    });
    
    // バッジチェック
    checkAndAwardBadges();
    
    // ローカルストレージに保存
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // クラウドに保存（非同期）
    saveUserToCloud(currentUser).catch(err => console.error('クラウド保存エラー:', err));
    
    // 選択肢の表示を更新
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((option, idx) => {
        option.style.pointerEvents = 'none';
        if (currentQuestion.options[idx] === currentQuestion.correctAnswer) {
            option.classList.add('correct');
        } else if (idx === answerIndex && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // ① 即座に正誤フィードバックを表示（1秒間）
    try {
        showImmediateFeedback(isCorrect, pointsEarned);
    } catch (error) {
        console.error('即座フィードバックエラー:', error);
    }
    
    // ② 1秒後：グラウンド図に正解の動きを表示
    setTimeout(() => {
        try {
            showQuizCorrectMovement();
            showFieldGuideMessage(); // 「正解の動きを確認しましょう」
        } catch (error) {
            console.error('グラウンド図表示エラー:', error);
        }
    }, 1000);
    
    // ③ 4秒後：次の問題ボタンを表示
    setTimeout(() => {
        try {
            showQuizFeedback(isCorrect, pointsEarned);
        } catch (error) {
            console.error('フィードバック表示エラー:', error);
        }
    }, 4000);
}

// ① 即座の正誤フィードバック表示（大きく目立つ）
function showImmediateFeedback(isCorrect, pointsEarned) {
    const feedbackContainer = document.getElementById('quizFeedbackContainer');
    
    let bonusText = '';
    if (consecutiveCorrect >= 5) {
        bonusText = '<p class="text-orange-600 font-bold text-lg animate-bounce"><i class="fas fa-fire"></i> 5連続正解ボーナス！</p>';
    } else if (consecutiveCorrect >= 3) {
        bonusText = '<p class="text-orange-600 font-bold animate-bounce"><i class="fas fa-fire"></i> 3連続正解ボーナス！</p>';
    }
    
    const feedbackHtml = `
        <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" style="animation: fadeIn 0.3s;">
            <div class="bg-white rounded-3xl p-8 text-center shadow-2xl transform scale-100" style="animation: bounceIn 0.5s;">
                <div class="text-8xl mb-4">
                    <i class="fas ${isCorrect ? 'fa-check-circle text-green-500' : 'fa-times-circle text-red-500'}"></i>
                </div>
                <h2 class="text-4xl font-bold mb-3 ${isCorrect ? 'text-green-600' : 'text-red-600'}">
                    ${isCorrect ? '正解！' : '不正解'}
                </h2>
                ${isCorrect ? `<p class="text-2xl font-bold text-green-700 mb-2">+${pointsEarned} pt</p>` : ''}
                ${bonusText}
            </div>
        </div>
    `;
    
    feedbackContainer.innerHTML = feedbackHtml;
    
    // 1秒後にフェードアウト
    setTimeout(() => {
        const overlay = feedbackContainer.querySelector('.fixed');
        if (overlay) {
            overlay.style.animation = 'fadeOut 0.3s';
            setTimeout(() => {
                feedbackContainer.innerHTML = '';
            }, 300);
        }
    }, 1000);
}

// ② グラウンド図のガイドメッセージ
function showFieldGuideMessage() {
    const feedbackContainer = document.getElementById('quizFeedbackContainer');
    
    const guideHtml = `
        <div class="card mt-4 bg-blue-50 border-2 border-blue-400 text-center" style="animation: slideDown 0.5s;">
            <p class="text-lg font-bold text-blue-700 flex items-center justify-center gap-2">
                <i class="fas fa-eye"></i>
                正解の動きを確認しましょう
            </p>
        </div>
    `;
    
    feedbackContainer.innerHTML = guideHtml;
}

// クイズフィードバック表示
function showQuizFeedback(isCorrect, pointsEarned) {
    const feedbackContainer = document.getElementById('quizFeedbackContainer');
    
    // 励ましメッセージ
    const messages = {
        correct: [
            '素晴らしい！',
            'その調子！',
            '完璧だ！',
            'よくできました！',
            'すごいぞ！'
        ],
        incorrect: [
            'もう一度チャレンジ！',
            '次は頑張ろう！',
            'もうちょっと！',
            '練習あるのみ！',
            'あきらめないで！'
        ]
    };
    
    const messageList = isCorrect ? messages.correct : messages.incorrect;
    const message = messageList[Math.floor(Math.random() * messageList.length)];
    
    let bonusText = '';
    if (consecutiveCorrect >= 5) {
        bonusText = '<p class="text-orange-600 font-bold text-lg mt-2"><i class="fas fa-fire"></i> 5連続正解ボーナス！ +15pt</p>';
    } else if (consecutiveCorrect >= 3) {
        bonusText = '<p class="text-orange-600 font-bold mt-2"><i class="fas fa-fire"></i> 3連続正解ボーナス！ +5pt</p>';
    }
    
    let feedbackHtml = `
        <div class="card mt-4 text-center ${isCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'}">
            <div class="text-6xl mb-3"><i class="fas ${isCorrect ? 'fa-check-circle text-green-600' : 'fa-times-circle text-red-600'}"></i></div>
            <h3 class="text-2xl font-bold mb-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}">${message}</h3>
            ${isCorrect ? `<p class="text-xl font-bold text-green-700 mb-2">+${pointsEarned} ポイント獲得！</p>` : ''}
            ${bonusText}
            <p class="text-gray-700 mt-3"><strong>正解：</strong>${currentQuestion.correctAnswer}</p>
            <div class="flex gap-2 mt-4 justify-center">
                <button onclick="handleNextQuestion()" class="btn-primary">
                    <i class="fas fa-redo"></i> 次の問題
                </button>
                <button onclick="switchPage('learning')" class="btn-secondary">
                    <i class="fas fa-book-open"></i> 学習に戻る
                </button>
            </div>
        </div>
    `;
    
    feedbackContainer.innerHTML = feedbackHtml;
    
    // プロフィール更新
    updateProfile();
}

// バッジチェックと授与
function checkAndAwardBadges() {
    const posData = getCurrentPositionData();
    if (!posData.badges) posData.badges = [];
    
    const quizHistory = posData.quizHistory;
    const totalQuizzes = quizHistory.length;
    const correctAnswers = quizHistory.filter(q => q.correct).length;
    const accuracy = totalQuizzes > 0 ? (correctAnswers / totalQuizzes) * 100 : 0;
    
    const badges = [
        // 挑戦バッジ
        { id: 'first_quiz', name: '初チャレンジ', desc: '初めてクイズに挑戦', condition: () => totalQuizzes >= 1, icon: 'fa-flag-checkered' },
        { id: 'quiz_5', name: '5問挑戦', desc: 'クイズ5問挑戦', condition: () => totalQuizzes >= 5, icon: 'fa-seedling' },
        { id: 'quiz_10', name: '努力家', desc: 'クイズ10問挑戦', condition: () => totalQuizzes >= 10, icon: 'fa-book' },
        { id: 'quiz_25', name: '継続者', desc: 'クイズ25問挑戦', condition: () => totalQuizzes >= 25, icon: 'fa-running' },
        { id: 'quiz_50', name: '継続は力なり', desc: 'クイズ50問挑戦', condition: () => totalQuizzes >= 50, icon: 'fa-dumbbell' },
        { id: 'quiz_100', name: 'クイズマスター', desc: 'クイズ100問挑戦', condition: () => totalQuizzes >= 100, icon: 'fa-crown' },
        { id: 'quiz_200', name: 'レジェンド', desc: 'クイズ200問挑戦', condition: () => totalQuizzes >= 200, icon: 'fa-dragon' },
        { id: 'quiz_500', name: '鉄人', desc: 'クイズ500問挑戦', condition: () => totalQuizzes >= 500, icon: 'fa-medal' },
        
        // 正解バッジ
        { id: 'correct_5', name: '5問正解', desc: '通算5問正解', condition: () => correctAnswers >= 5, icon: 'fa-check' },
        { id: 'correct_10', name: '10問正解', desc: '通算10問正解', condition: () => correctAnswers >= 10, icon: 'fa-star' },
        { id: 'correct_25', name: '25問正解', desc: '通算25問正解', condition: () => correctAnswers >= 25, icon: 'fa-star' },
        { id: 'correct_50', name: '50問正解', desc: '通算50問正解', condition: () => correctAnswers >= 50, icon: 'fa-star' },
        { id: 'correct_100', name: '100問正解', desc: '通算100問正解', condition: () => correctAnswers >= 100, icon: 'fa-star' },
        { id: 'correct_250', name: '250問正解', desc: '通算250問正解', condition: () => correctAnswers >= 250, icon: 'fa-gem' },
        
        // 連続正解バッジ
        { id: 'streak_3', name: '3連続', desc: '3問連続正解', condition: () => consecutiveCorrect >= 3, icon: 'fa-fire' },
        { id: 'streak_5', name: '5連続', desc: '5問連続正解', condition: () => consecutiveCorrect >= 5, icon: 'fa-fire' },
        { id: 'streak_7', name: '7連続', desc: '7問連続正解', condition: () => consecutiveCorrect >= 7, icon: 'fa-fire' },
        { id: 'streak_10', name: '10連続', desc: '10問連続正解', condition: () => consecutiveCorrect >= 10, icon: 'fa-fire' },
        { id: 'streak_15', name: '15連続', desc: '15問連続正解', condition: () => consecutiveCorrect >= 15, icon: 'fa-fire' },
        
        // レベルバッジ
        { id: 'level_3', name: 'レベル3', desc: 'レベル3に到達', condition: () => posData.level >= 3, icon: 'fa-trophy' },
        { id: 'level_5', name: 'レベル5', desc: 'レベル5に到達', condition: () => posData.level >= 5, icon: 'fa-trophy' },
        { id: 'level_10', name: 'レベル10', desc: 'レベル10に到達', condition: () => posData.level >= 10, icon: 'fa-trophy' },
        { id: 'level_15', name: 'レベル15', desc: 'レベル15に到達', condition: () => posData.level >= 15, icon: 'fa-trophy' },
        { id: 'level_20', name: 'レベル20', desc: 'レベル20に到達', condition: () => posData.level >= 20, icon: 'fa-trophy' },
        
        // 正解率バッジ
        { id: 'accuracy_50', name: '正解率50%', desc: '正解率50%以上（10問以上）', condition: () => totalQuizzes >= 10 && accuracy >= 50, icon: 'fa-bullseye' },
        { id: 'accuracy_70', name: '正解率70%', desc: '正解率70%以上（20問以上）', condition: () => totalQuizzes >= 20 && accuracy >= 70, icon: 'fa-bullseye' },
        { id: 'accuracy_80', name: '正解率80%', desc: '正解率80%以上（30問以上）', condition: () => totalQuizzes >= 30 && accuracy >= 80, icon: 'fa-bullseye' },
        { id: 'accuracy_90', name: '正解率90%', desc: '正解率90%以上（50問以上）', condition: () => totalQuizzes >= 50 && accuracy >= 90, icon: 'fa-bullseye' },
        
        // 特別バッジ
        { id: 'perfect_10', name: 'パーフェクト10', desc: '10問連続全問正解', condition: () => consecutiveCorrect >= 10, icon: 'fa-award' },
        { id: 'multi_position', name: 'マルチプレーヤー', desc: '3つ以上のポジションでレベル3以上', condition: () => {
            let count = 0;
            for (let pos = 1; pos <= 9; pos++) {
                if (currentUser.positionData[pos] && currentUser.positionData[pos].level >= 3) {
                    count++;
                }
            }
            return count >= 3;
        }, icon: 'fa-users' },
        { id: 'all_positions', name: '全ポジション制覇', desc: '全ポジションで最低1問挑戦', condition: () => {
            for (let pos = 1; pos <= 9; pos++) {
                if (!currentUser.positionData[pos] || currentUser.positionData[pos].quizHistory.length === 0) {
                    return false;
                }
            }
            return true;
        }, icon: 'fa-chess-king' }
    ];
    
    const newBadges = [];
    badges.forEach(badge => {
        if (!posData.badges.includes(badge.id) && badge.condition()) {
            posData.badges.push(badge.id);
            newBadges.push(badge);
        }
    });
    
    // 新しいバッジがあれば通知
    if (newBadges.length > 0) {
        showBadgeNotification(newBadges);
    }
}

// バッジ通知表示
function showBadgeNotification(badges) {
    const container = document.getElementById('quizContainer');
    
    badges.forEach(badge => {
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-6 py-4 rounded-lg shadow-lg z-50 animate-bounce';
        notification.innerHTML = `
            <div class="text-center">
                <div class="text-4xl mb-2"><i class="fas ${badge.icon} text-yellow-600"></i></div>
                <p class="font-bold"><i class="fas fa-award"></i> 新しいバッジ獲得！</p>
                <p class="text-sm">${badge.name}</p>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    });
}

// バッジ表示
function displayBadges() {
    const container = document.getElementById('badgesContainer');
    if (!container) return;
    
    const posData = getCurrentPositionData();
    
    const allBadges = [
        // 挑戦バッジ
        { id: 'first_quiz', name: '初チャレンジ', icon: 'fa-flag-checkered', category: '挑戦' },
        { id: 'quiz_5', name: '5問挑戦', icon: 'fa-seedling', category: '挑戦' },
        { id: 'quiz_10', name: '努力家', icon: 'fa-book', category: '挑戦' },
        { id: 'quiz_25', name: '継続者', icon: 'fa-running', category: '挑戦' },
        { id: 'quiz_50', name: '継続は力', icon: 'fa-dumbbell', category: '挑戦' },
        { id: 'quiz_100', name: 'マスター', icon: 'fa-crown', category: '挑戦' },
        { id: 'quiz_200', name: 'レジェンド', icon: 'fa-dragon', category: '挑戦' },
        { id: 'quiz_500', name: '鉄人', icon: 'fa-medal', category: '挑戦' },
        
        // 正解バッジ
        { id: 'correct_5', name: '5問正解', icon: 'fa-check', category: '正解' },
        { id: 'correct_10', name: '10問正解', icon: 'fa-star', category: '正解' },
        { id: 'correct_25', name: '25問正解', icon: 'fa-star', category: '正解' },
        { id: 'correct_50', name: '50問正解', icon: 'fa-star', category: '正解' },
        { id: 'correct_100', name: '100問正解', icon: 'fa-star', category: '正解' },
        { id: 'correct_250', name: '250問正解', icon: 'fa-gem', category: '正解' },
        
        // 連続正解バッジ
        { id: 'streak_3', name: '3連続', icon: 'fa-fire', category: '連続' },
        { id: 'streak_5', name: '5連続', icon: 'fa-fire', category: '連続' },
        { id: 'streak_7', name: '7連続', icon: 'fa-fire', category: '連続' },
        { id: 'streak_10', name: '10連続', icon: 'fa-fire', category: '連続' },
        { id: 'streak_15', name: '15連続', icon: 'fa-fire', category: '連続' },
        
        // レベルバッジ
        { id: 'level_3', name: 'Lv3', icon: 'fa-trophy', category: 'レベル' },
        { id: 'level_5', name: 'Lv5', icon: 'fa-trophy', category: 'レベル' },
        { id: 'level_10', name: 'Lv10', icon: 'fa-trophy', category: 'レベル' },
        { id: 'level_15', name: 'Lv15', icon: 'fa-trophy', category: 'レベル' },
        { id: 'level_20', name: 'Lv20', icon: 'fa-trophy', category: 'レベル' },
        
        // 正解率バッジ
        { id: 'accuracy_50', name: '50%達成', icon: 'fa-bullseye', category: '正解率' },
        { id: 'accuracy_70', name: '70%達成', icon: 'fa-bullseye', category: '正解率' },
        { id: 'accuracy_80', name: '80%達成', icon: 'fa-bullseye', category: '正解率' },
        { id: 'accuracy_90', name: '90%達成', icon: 'fa-bullseye', category: '正解率' },
        
        // 特別バッジ
        { id: 'perfect_10', name: 'パーフェクト', icon: 'fa-award', category: '特別' },
        { id: 'multi_position', name: 'マルチ', icon: 'fa-users', category: '特別' },
        { id: 'all_positions', name: '全ポジション', icon: 'fa-chess-king', category: '特別' }
    ];
    
    let html = '<div class="grid grid-cols-4 gap-2">';
    allBadges.forEach(badge => {
        const earned = posData.badges.includes(badge.id);
        html += `
            <div class="text-center p-2 rounded-lg ${earned ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-gray-100 opacity-50'}">
                <div class="text-2xl mb-1"><i class="fas ${earned ? badge.icon + ' text-yellow-600' : 'fa-lock text-gray-400'}"></i></div>
                <p class="text-xs font-bold">${badge.name}</p>
            </div>
        `;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

// 管理者ページ表示
function showAdminPage() {
    // ログイン済みユーザーは管理者ページにアクセスできない
    const user = localStorage.getItem('currentUser');
    if (user) {
        alert('管理者ページは選手としてログイン中はアクセスできません。\n一度ログアウトしてから再度アクセスしてください。');
        window.location.href = window.location.pathname;
        return;
    }
    
    // すべてのページを非表示
    document.querySelectorAll('.page-section').forEach(page => {
        page.classList.remove('active');
    });
    
    // 管理者ページのみ表示
    document.getElementById('adminPage').classList.add('active');
    document.querySelector('.bottom-nav').style.display = 'none';
}

// 管理者ログイン
function adminLogin() {
    const password = document.getElementById('adminPassword').value;
    
    if (password === 'tunnels2024') {
        const loginDiv = document.getElementById('adminLogin');
        const contentDiv = document.getElementById('adminContent');
        
        if (!loginDiv || !contentDiv) {
            console.error('管理者ページの要素が見つかりません');
            alert('ページの読み込みに問題があります。ページを再読み込みしてください。');
            return;
        }
        
        loginDiv.style.display = 'none';
        contentDiv.style.display = 'block';
        
        // 管理者ダッシュボードを読み込み
        loadAdminDashboard();
    } else {
        alert('パスワードが間違っています');
    }
}

// グローバル変数（管理画面用）
let allUsersData = [];
let filteredUsersData = [];

// 管理者ダッシュボード読み込み
async function loadAdminDashboard() {
    try {
        console.log('📊 管理者ダッシュボード読み込み開始');
        
        // クラウドから全ユーザーを取得
        const users = await getAllUsers();
        console.log('✅ ユーザー取得完了:', users.length, '件');
        allUsersData = users;
        
        // ユーザーデータを処理
        console.log('📝 ユーザーデータ処理開始');
        processUserData(users);
        console.log('✅ ユーザーデータ処理完了');
        
        // チーム統計を計算・表示
        console.log('📈 チーム統計計算開始');
        calculateTeamStats(users);
        console.log('✅ チーム統計計算完了');
        
        // 初期表示
        console.log('📋 テーブル表示開始');
        filteredUsersData = users;
        renderUserTable(users);
        console.log('✅ 管理者ダッシュボード読み込み完了');
    } catch (error) {
        console.error('❌ 管理者ダッシュボード読み込みエラー:', error);
        
        // エラー表示
        const tbody = document.getElementById('userProgressTable');
        if (tbody) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="9" class="px-3 py-8 text-center text-red-600">
                        <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
                        <p>データの読み込みに失敗しました</p>
                        <p class="text-sm mt-2">${error.message}</p>
                    </td>
                </tr>
            `;
        }
    }
}

// ユーザーデータ処理
function processUserData(users) {
    users.forEach(user => {
        try {
            // 全ポジションのクイズデータを集計
            let totalQuizzes = 0;
            let totalCorrect = 0;
            let totalPoints = 0;
            let maxLevel = 0;
            let badges = [];
            
            if (user.positionData && typeof user.positionData === 'object') {
                for (let pos = 1; pos <= 9; pos++) {
                    const posData = user.positionData[pos];
                    if (posData && typeof posData === 'object') {
                        if (Array.isArray(posData.quizHistory)) {
                            totalQuizzes += posData.quizHistory.length;
                            totalCorrect += posData.quizHistory.filter(q => q && q.correct).length;
                        }
                        if (typeof posData.points === 'number') {
                            totalPoints += posData.points;
                        }
                        if (posData.level && posData.level > maxLevel) {
                            maxLevel = posData.level;
                        }
                        if (Array.isArray(posData.badges)) {
                            badges = badges.concat(posData.badges);
                        }
                    }
                }
            }
            
            // 現在のポジションデータ
            const currentPosData = user.positionData && user.positionData[user.position] ? user.positionData[user.position] : {};
            
            // 計算結果を保存
            user.stats = {
                totalQuizzes,
                totalCorrect,
                totalPoints,
                accuracy: totalQuizzes > 0 ? Math.round((totalCorrect / totalQuizzes) * 100) : 0,
                level: currentPosData.level || 0,
                points: currentPosData.points || 0,
                badges: [...new Set(badges)], // 重複削除
                currentPosition: user.currentPosition || (positions[user.position] ? positions[user.position].name : '未設定'),
                lastLogin: user.updated_at || user.created_at || Date.now()
            };
        } catch (error) {
            console.error('ユーザーデータ処理エラー:', user.nickname, error);
            // エラーが発生した場合はデフォルト値を設定
            user.stats = {
                totalQuizzes: 0,
                totalCorrect: 0,
                totalPoints: 0,
                accuracy: 0,
                level: 0,
                points: 0,
                badges: [],
                currentPosition: '未設定',
                lastLogin: user.updated_at || user.created_at || Date.now()
            };
        }
    });
}

// チーム統計を計算
function calculateTeamStats(users) {
    try {
        const totalUsers = users.length;
        
        // アクティブユーザー（直近7日間）
        const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        const activeUsers = users.filter(u => u.stats && u.stats.lastLogin > sevenDaysAgo).length;
        
        // 平均レベル
        const totalLevel = users.reduce((sum, u) => sum + (u.stats && u.stats.level ? u.stats.level : 0), 0);
        const avgLevel = totalUsers > 0 ? (totalLevel / totalUsers).toFixed(1) : 0;
        
        // 平均正解率
        const totalAccuracy = users.reduce((sum, u) => sum + (u.stats && u.stats.accuracy ? u.stats.accuracy : 0), 0);
        const avgAccuracy = totalUsers > 0 ? Math.round(totalAccuracy / totalUsers) : 0;
        
        // 表示
        const totalUsersEl = document.getElementById('totalUsers');
        const activeUsersEl = document.getElementById('activeUsers');
        const avgLevelEl = document.getElementById('avgLevel');
        const avgAccuracyEl = document.getElementById('avgAccuracy');
        
        if (totalUsersEl) totalUsersEl.textContent = totalUsers;
        if (activeUsersEl) activeUsersEl.textContent = activeUsers;
        if (avgLevelEl) avgLevelEl.textContent = avgLevel;
        if (avgAccuracyEl) avgAccuracyEl.textContent = avgAccuracy;
    } catch (error) {
        console.error('チーム統計計算エラー:', error);
    }
}

// ユーザーテーブル表示
function renderUserTable(users) {
    const tbody = document.getElementById('userProgressTable');
    
    if (!tbody) {
        console.error('テーブル要素が見つかりません');
        return;
    }
    
    if (!users || users.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" class="px-3 py-8 text-center text-gray-500">
                    ユーザーが見つかりません
                </td>
            </tr>
        `;
        return;
    }
    
    try {
        let html = '';
        users.forEach(user => {
            try {
                if (!user.stats) {
                    console.warn('statsがないユーザー:', user.nickname);
                    return;
                }
                
                const stats = user.stats;
                const lastLoginDate = new Date(stats.lastLogin);
                const now = new Date();
                const diffHours = (now - lastLoginDate) / (1000 * 60 * 60);
                
                let lastLoginText = '';
                if (diffHours < 1) {
                    lastLoginText = '今';
                } else if (diffHours < 24) {
                    lastLoginText = `${Math.floor(diffHours)}時間前`;
                } else if (diffHours < 24 * 7) {
                    lastLoginText = `${Math.floor(diffHours / 24)}日前`;
                } else {
                    lastLoginText = lastLoginDate.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' });
                }
                
                const accuracyColor = stats.accuracy >= 80 ? 'text-green-600' : stats.accuracy >= 60 ? 'text-blue-600' : 'text-gray-600';
                
                html += `
                    <tr class="border-b hover:bg-gray-50 cursor-pointer" onclick="showPlayerDetail('${user.id}')">
                        <td class="px-3 py-3">${user.nickname || '不明'}</td>
                        <td class="px-3 py-3">${stats.currentPosition || '未設定'}</td>
                        <td class="px-3 py-3 text-center font-bold text-purple-600">Lv ${stats.level || 0}</td>
                        <td class="px-3 py-3 text-center">${stats.points || 0}</td>
                        <td class="px-3 py-3 text-center">${stats.totalCorrect || 0}/${stats.totalQuizzes || 0}</td>
                        <td class="px-3 py-3 text-center font-bold ${accuracyColor}">${stats.accuracy || 0}%</td>
                        <td class="px-3 py-3 text-center">${stats.badges ? stats.badges.length : 0}</td>
                        <td class="px-3 py-3 text-center text-sm">${lastLoginText}</td>
                        <td class="px-3 py-3 text-center">
                            <button onclick="event.stopPropagation(); deleteUser('${user.id}', '${user.nickname || '不明'}')" class="text-red-600 hover:text-red-800 text-xs">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            } catch (userError) {
                console.error('ユーザー行生成エラー:', user.nickname, userError);
            }
        });
        
        tbody.innerHTML = html;
    } catch (error) {
        console.error('テーブル表示エラー:', error);
        tbody.innerHTML = `
            <tr>
                <td colspan="9" class="px-3 py-8 text-center text-red-600">
                    <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
                    <p>テーブルの表示に失敗しました</p>
                    <p class="text-sm mt-2">${error.message}</p>
                </td>
            </tr>
        `;
    }
}

// フィルター適用
function applyFilters() {
    const positionFilter = document.getElementById('positionFilter').value;
    const sortBy = document.getElementById('sortBy').value;
    
    // フィルタリング
    let filtered = allUsersData;
    if (positionFilter !== 'all') {
        filtered = filtered.filter(u => u.stats.currentPosition === positionFilter);
    }
    
    // ソート
    filtered.sort((a, b) => {
        switch (sortBy) {
            case 'level':
                return b.stats.level - a.stats.level;
            case 'accuracy':
                return b.stats.accuracy - a.stats.accuracy;
            case 'lastLogin':
                return b.stats.lastLogin - a.stats.lastLogin;
            case 'name':
                return a.nickname.localeCompare(b.nickname, 'ja');
            default:
                return 0;
        }
    });
    
    filteredUsersData = filtered;
    renderUserTable(filtered);
}

// 選手詳細表示
function showPlayerDetail(userId) {
    const user = allUsersData.find(u => u.id === userId);
    if (!user) return;
    
    const stats = user.stats;
    
    // モーダル表示
    document.getElementById('playerDetailModal').style.display = 'flex';
    document.getElementById('modalPlayerName').textContent = user.nickname;
    document.getElementById('modalPosition').textContent = stats.currentPosition;
    document.getElementById('modalLevel').textContent = `Lv ${stats.level}`;
    document.getElementById('modalPoints').textContent = `${stats.points}pt`;
    document.getElementById('modalAccuracy').textContent = `${stats.accuracy}%`;
    
    // 全ポジション統計
    const allPosContainer = document.getElementById('modalAllPositions');
    let posHtml = '';
    for (let pos = 1; pos <= 9; pos++) {
        const posData = user.positionData && user.positionData[pos] ? user.positionData[pos] : {};
        const posName = positions[pos]?.name || `ポジション${pos}`;
        const level = posData.level || 0;
        const points = posData.points || 0;
        const quizCount = posData.quizHistory ? posData.quizHistory.length : 0;
        const correct = posData.quizHistory ? posData.quizHistory.filter(q => q.correct).length : 0;
        const acc = quizCount > 0 ? Math.round((correct / quizCount) * 100) : 0;
        
        posHtml += `
            <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div class="flex items-center gap-2">
                    <span class="font-bold text-blue-600">${posName}</span>
                    <span class="text-xs text-gray-600">Lv ${level} | ${points}pt</span>
                </div>
                <div class="text-xs">
                    <span class="${acc >= 80 ? 'text-green-600' : acc >= 60 ? 'text-blue-600' : 'text-gray-600'} font-bold">${acc}%</span>
                    <span class="text-gray-500 ml-1">(${correct}/${quizCount})</span>
                </div>
            </div>
        `;
    }
    allPosContainer.innerHTML = posHtml;
    
    // バッジ表示
    document.getElementById('modalBadgeCount').textContent = stats.badges.length;
    const badgesContainer = document.getElementById('modalBadges');
    if (stats.badges.length === 0) {
        badgesContainer.innerHTML = '<p class="col-span-3 text-center text-gray-500 text-sm py-4">まだバッジがありません</p>';
    } else {
        badgesContainer.innerHTML = stats.badges.map(badge => {
            const badgeInfo = allBadges.find(b => b.id === badge) || { name: badge, icon: '🏅' };
            return `
                <div class="flex flex-col items-center p-2 bg-yellow-50 rounded text-center">
                    <div class="text-2xl mb-1">${badgeInfo.icon}</div>
                    <div class="text-xs font-bold text-gray-700">${badgeInfo.name}</div>
                </div>
            `;
        }).join('');
    }
}

// モーダルを閉じる
function closePlayerDetail() {
    document.getElementById('playerDetailModal').style.display = 'none';
}

// ユーザー削除
async function deleteUser(userId, nickname) {
    if (!confirm(`本当に「${nickname}」を削除しますか？\nこの操作は取り消せません。`)) {
        return;
    }
    
    try {
        const response = await fetch(`tables/users/${userId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('削除しました');
            loadAdminDashboard(); // 再読み込み
        } else {
            alert('削除に失敗しました');
        }
    } catch (error) {
        console.error('削除エラー:', error);
        alert('削除に失敗しました');
    }
}

// CSV出力
function exportCSV() {
    const users = filteredUsersData;
    
    // CSVヘッダー
    let csv = 'ニックネーム,ポジション,レベル,ポイント,クイズ正解数,クイズ総数,正解率(%),バッジ数,最終ログイン\n';
    
    // データ行
    users.forEach(user => {
        const stats = user.stats;
        const lastLogin = new Date(stats.lastLogin).toLocaleDateString('ja-JP');
        csv += `${user.nickname},${stats.currentPosition},${stats.level},${stats.points},${stats.totalCorrect},${stats.totalQuizzes},${stats.accuracy},${stats.badges.length},${lastLogin}\n`;
    });
    
    // ダウンロード
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `tunnels_progress_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ============================================
// クイズ用グラウンド図の制御
// ============================================

// クイズ用グラウンド図を表示（SVG削除により今後は画像表示）
function showQuizField(runnerPattern) {
    // 今後、画像表示機能を追加予定
    // 現在は何もしない
}

// クイズ用グラウンド図に正解の動きを表示（SVG削除により今後は画像表示）
function showQuizCorrectMovement() {
    // currentQuestionからimageUrlを取得して画像を表示
    if (currentQuestion && currentQuestion.imageUrl) {
        const fieldContainer = document.getElementById('quizFieldContainer');
        const container = document.getElementById('quizImageContainer');
        const imgElement = document.getElementById('quizFormationImage');
        const articleLink = document.getElementById('quizArticleLink');
        
        if (container && imgElement) {
            // 親コンテナも表示
            if (fieldContainer) {
                fieldContainer.style.display = 'block';
            }
            
            container.style.display = 'block';
            imgElement.src = currentQuestion.imageUrl;
            imgElement.alt = `${currentQuestion.runnerLabel} - ${currentQuestion.playLabel}`;
            
            // 記事リンクがあれば表示
            if (articleLink && currentQuestion.articleUrl) {
                articleLink.href = currentQuestion.articleUrl;
                articleLink.style.display = 'inline-flex';
            } else if (articleLink) {
                articleLink.style.display = 'none';
            }
        }
    }
}

// クイズ用の矢印を描画（SVG削除により不要）
// function drawQuizArrow(x1, y1, x2, y2, color, role) { ... }

// クイズ用グラウンド図を非表示
function hideQuizField() {
    const container = document.getElementById('quizImageContainer');
    if (container) {
        container.style.display = 'none';
    }
}

// ============================================
// ポジション変更機能
// ============================================

// ポジション変更モーダルを表示
function showPositionChange() {
    const modal = document.getElementById('positionChangeModal');
    const select = document.getElementById('newPositionSelect');
    
    select.value = currentUser.position;
    modal.style.display = 'block';
}

// ポジション変更をキャンセル
function cancelPositionChange() {
    const modal = document.getElementById('positionChangeModal');
    modal.style.display = 'none';
}

// ポジション変更を実行
function changePosition() {
    const newPosition = parseInt(document.getElementById('newPositionSelect').value);
    
    if (newPosition === currentUser.position) {
        alert('同じポジションです。');
        return;
    }
    
    if (confirm(`ポジションを ${positions[newPosition].name} に変更しますか？\n各ポジションのデータは個別に保存されます。`)) {
        currentUser.position = newPosition;
        
        // localStorageを更新
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // クラウドに保存（非同期）
        saveUserToCloud(currentUser).catch(err => console.error('クラウド保存エラー:', err));
        
        // UIを更新
        cancelPositionChange();
        updateProfile();
        
        alert(`ポジションを ${positions[newPosition].name} に変更しました！`);
    }
}

// 全ポジション統計を表示
function displayAllPositionsStats() {
    const container = document.getElementById('allPositionsStats');
    if (!container) return;
    
    initPositionData();
    
    let html = '';
    for (let pos = 1; pos <= 9; pos++) {
        const posData = currentUser.positionData[pos] || { points: 0, level: 1, quizHistory: [] };
        const totalQuizzes = posData.quizHistory.length;
        const correctAnswers = posData.quizHistory.filter(q => q.correct).length;
        const isCurrent = pos === currentUser.position;
        
        html += `
            <div class="flex items-center justify-between p-3 rounded-lg ${isCurrent ? 'bg-blue-50 border-2 border-blue-400' : 'bg-gray-50'}">
                <div class="flex items-center gap-2">
                    <span class="font-bold ${isCurrent ? 'text-blue-600' : 'text-gray-700'}">${positions[pos].abbr}</span>
                    <span class="text-sm text-gray-600">${positions[pos].name}</span>
                    ${isCurrent ? '<span class="text-xs bg-blue-400 text-white px-2 py-1 rounded">現在</span>' : ''}
                </div>
                <div class="flex items-center gap-3 text-sm">
                    <div class="text-center">
                        <p class="text-xs text-gray-500">Lv</p>
                        <p class="font-bold text-purple-600">${posData.level}</p>
                    </div>
                    <div class="text-center">
                        <p class="text-xs text-gray-500">pt</p>
                        <p class="font-bold text-pink-600">${posData.points}</p>
                    </div>
                    <div class="text-center">
                        <p class="text-xs text-gray-500">問題</p>
                        <p class="font-bold text-blue-600">${totalQuizzes}</p>
                    </div>
                    <div class="text-center">
                        <p class="text-xs text-gray-500">正解</p>
                        <p class="font-bold text-green-600">${correctAnswers}</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}
