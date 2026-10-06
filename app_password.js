// ============================================
// パスワード変更機能
// ============================================

// パスワード変更モーダルを表示
function showPasswordChange() {
    const modal = document.getElementById('passwordChangeModal');
    modal.style.display = 'block';
    
    // フィールドをクリア
    document.getElementById('currentPasswordInput').value = '';
    document.getElementById('newPasswordInput').value = '';
    document.getElementById('newPasswordConfirmInput').value = '';
}

// パスワード変更をキャンセル
function cancelPasswordChange() {
    const modal = document.getElementById('passwordChangeModal');
    modal.style.display = 'none';
}

// パスワード変更を実行
function changePassword() {
    const currentPassword = document.getElementById('currentPasswordInput').value;
    const newPassword = document.getElementById('newPasswordInput').value;
    const newPasswordConfirm = document.getElementById('newPasswordConfirmInput').value;
    
    if (!currentPassword) {
        alert('現在のパスワードを入力してください');
        return;
    }
    
    if (!newPassword) {
        alert('新しいパスワードを入力してください');
        return;
    }
    
    if (newPassword.length < 4) {
        alert('パスワードは4文字以上で設定してください');
        return;
    }
    
    if (newPassword !== newPasswordConfirm) {
        alert('新しいパスワードが一致しません');
        return;
    }
    
    // 現在のパスワードを確認
    const currentHashedPassword = simpleHash(currentPassword);
    if (currentUser.password !== currentHashedPassword) {
        alert('現在のパスワードが間違っています');
        return;
    }
    
    if (confirm('パスワードを変更しますか？')) {
        // パスワードを更新
        currentUser.password = simpleHash(newPassword);
        
        // localStorageを更新
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        let users = JSON.parse(localStorage.getItem('allUsers') || '[]');
        const userIndex = users.findIndex(u => u.nickname === currentUser.nickname);
        if (userIndex >= 0) {
            users[userIndex] = currentUser;
            localStorage.setItem('allUsers', JSON.stringify(users));
        }
        
        // モーダルを閉じる
        cancelPasswordChange();
        
        alert('パスワードを変更しました！');
    }
}
