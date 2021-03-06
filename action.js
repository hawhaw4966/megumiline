const axios = require('axios');
const qs = require('querystring');

const LINE_NOTIFY_API_URL = 'https://notify-api.line.me/api/notify';

// GitHub Actions で実行する際に Secret 値 LINE_TOKEN を利用する
// 
// 実際には、GitHub Actions の
// run: LINE_TOKEN=${{secrets.LINE_TOKEN}} node action.js
// という書き方で渡されています
const LINE_NOTIFY_TOKEN = process.env.LINE_TOKEN;

let config = {
    url: LINE_NOTIFY_API_URL,
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + LINE_NOTIFY_TOKEN
    },
    data: qs.stringify({
        message: 'ProtoOut Studioからの通知だよー！',
    })
}

async function getRequest() {

  ////// LINE Notify に送る ////////////////////////

  let dogpic;

  try {
    dogpic = await axios.get(`http://shibe.online/api/shibes?count=3&urls=true&httpsUrls=true`);
    console.log(dogpic.data[0]);
  } catch (error) {
    console.error(error);
  }
  let dogimage = dogpic.data[0];
  // config のメッセージを送る部分 config.data を上書き
  config.data =  qs.stringify({
    message: '質問：何犬ですか？',
    imageThumbnail: dogimage,
    imageFullsize: dogimage,
  });

  try {
    const responseLINENotify = await axios.request(config);
    console.log(responseLINENotify.data);
  } catch (error) {
    console.error(error);
  }

}

// getRequest を呼び出してデータを読み込む
getRequest();