const axios = require('axios');
const qs = require('querystring');

const LINE_NOTIFY_API_URL = 'https://notify-api.line.me/api/notify';

const LINE_NOTIFY_TOKEN = 'xXJ57hxfsUpvEaXauX92vQrYSsbm0NXz0FdbE9kwJgc';

let config = {
    url: LINE_NOTIFY_API_URL,
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + LINE_NOTIFY_TOKEN
    },
    data: qs.stringify({
        message: '宇宙人からの通知だよー！',
    })
}

async function getRequest() {

  ////// 天気情報APIを最初につなげる //////////////////

  let dogpic;

  try {
    dogpic = await axios.get(`http://shibe.online/api/shibes?count=3&urls=true&httpsUrls=true`);
    // console.log(dogpic.data.image);
    console.log(dogpic.data[0]);
  } catch (error) {
    console.error(error);
  }
  // メッセージ構成
  // 文字列を+=で連結していく。
  // ダブルクオーテーションで囲むと "\n" で改行も加えられる特性がある。
  
  let dogimage = dogpic.data[0];
  // config のメッセージを送る部分 config.data を上書き
  config.data =  qs.stringify({
    message: '犬です！',
    imageThumbnail: dogimage,
    imageFullsize: dogimage,
  });
  // GIT_CURL_VERBOSE=1 

  ////// LINE Notify に送る ////////////////////////

  try {
    const responseLINENotify = await axios.request(config);
    console.log(responseLINENotify.data);
  } catch (error) {
    console.error(error);
  }

}

// getRequest を呼び出してデータを読み込む
getRequest();