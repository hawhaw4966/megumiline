// axiosライブラリを呼び出す
const axios = require('axios');

// application/x-www-form-urlencoded 形式でデータが送れるように querystring パッケージも呼び出す
// これはインストールする必要なく標準に使えるものなので npm i しなくてOK
const qs = require('querystring');

// LINE Notify API の問い合わせ先URL
const LINE_NOTIFY_API_URL = 'https://notify-api.line.me/api/notify';

// 今回使うLINE Notify のアクセストークン
const LINE_NOTIFY_TOKEN = 'xXJ57hxfsUpvEaXauX92vQrYSsbm0NXz0FdbE9kwJgc';

// リクエストは application/x-www-form-urlencoded (HTMLのデフォルトのフォームの送信形式と同一です) で、POST メソッドを使用します。
// axios で、より細かく設定をして送るために config という名前でオブジェクトを準備します。
// 詳しくは https://notify-bot.line.me/doc/ja/ の通知系の項目を参考にしましょう。

let config = {
    // url 問い合わせ先のURL
    url: LINE_NOTIFY_API_URL,
    // リクエストの仕方（メソッド）→今回は POST リクエスト
    method: 'post',
    // HTTP ヘッダーの設定
    headers: {
        // Content-Type 送るデータの中身はこういうものですよという宣言
        'Content-Type': 'application/x-www-form-urlencoded',
        // Authorization さまざまな認証情報を付与（運搬）できる。
        // 今回は Bearer という記述でトークンを運ぶ。
        // 英語で 運搬人(小切手・手形の)持参人 といった意味合い
        'Authorization': 'Bearer ' + LINE_NOTIFY_TOKEN
    },
    // querystring パッケージで JavaScript のオブジェクトを application/x-www-form-urlencoded 形式に変換
    data: qs.stringify({
        message: '宇宙人からの通知だよー！',
    })
}

// 実際にデータをやりとりする getRequest 関数
async function getRequest() {
  try {
    // get でなく request になっていることに注意。さきほどの config オブジェクトに応じた設定ができる
    // https://github.com/axios/axios#axios-api
    const response = await axios.request(config);
    console.log(response.data);
  } catch (error) {
    // エラーレスポンス
    console.error(error);
  }
}

// getRequest を呼び出してデータを読み込む
getRequest();