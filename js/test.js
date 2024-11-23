document.getElementById('button-addon1').addEventListener('click', function() {
    // 取得輸入的帳號
    const account = document.getElementById('accountInput').value.trim();
    
    if (account === "") {
        alert("請輸入帳號");
        return;
    }

    // 讀取 JSON 檔案
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // 根據帳號搜尋符合的資料
            const result = data.filter(item => item.Account.toLowerCase() === account.toLowerCase());
    
            // 顯示結果
            const resultContainer = document.getElementById('resultContainer');
            resultContainer.innerHTML = ''; // 清空先前的結果
    
            if (result.length > 0) {
            result.forEach(item => {
                const makeupDisplay = item.Makeup ? new Date(item.Makeup).toLocaleString() : "無";
                const datetype = item.datetype == 0 ? "正常上課" : item.datetype == 1 ? "請假" : "缺課" 
                const types = item.Type == true ? "已消耗堂數" : "未消耗"
                const div = document.createElement('div');
                div.classList.add('card', 'mb-3');
                div.innerHTML = `
                <div class="card-body">
                    <p class="card-title">帳號: ${item.Account}<p>
                    <p class="card-text">點名時間: ${new Date(item.DateTime).toLocaleString()}</p>
                    <p class="card-text">補課: ${makeupDisplay}</p>
                    <p class="card-text">堂數狀態: ${types}</p>
                    <p class="card-text">當天狀況: ${datetype}</p>
                </div>
                `;
                resultContainer.appendChild(div);
            });
            } else {
            resultContainer.innerHTML = '<p>沒有找到匹配的帳號。</p>';
            }
        })
        .catch(error => {
            console.error('錯誤:', error);
            alert('無法讀取資料。');
        });
});