window.addEventListener('load', init);

let qstObject; // 定義為全域變數
let rangeSlider; // 定義為全域變數
let rangeVals = ['1萬', '10萬']; // 假設有初始值

function init() {
  rSliderInit();// range 預算套件執行
  //立即開始 #start_btn 點按後出現問答
  document.getElementById('start_btn').onclick = startAnswer;
  new el_item(`#start_btn`).addCls('auto')

}

// 開始問答--------------------------------------------
function startAnswer() {
  console.log('立即開始回答?', this.id);
  new el_item(`#start_btn`).toggleHidden()

  let form = document.getElementById('form');
  answerArray(form); //取出問題的 name 製作成陣列

  qstObject = new allQst(answerArray(form))//製作的回答空位
  // console.log(qstObject)

  let txt_array = document.querySelector('#array'); // 回答印出的地方
  txt_array.textContent = "init";// 檢查觸發是否開始

  // 聆聽是否變動問卷
  form.addEventListener('change', function (e) {

    printForm(form, txt_array, qstObject)
  });

  // 當最後的按鈕點下後，在傳最後一次資料
  let end_btn = document.getElementById('end_btn');
  end_btn.addEventListener('click', function () {
    let range = qstObject.qstItem[qstObject.qstItem.length - 1];
    console.log('range.name', range.name); //use_range
    range.value = rangeVals;
    range.isChecked = true;
    console.log('qstObject', qstObject)
  })
}

// 確認印出的值----------------------------------------
function printForm(form, txt_array, qstObject, rangeVals) {
  txt_array.textContent = ""; // 陣列清空
  // form 表單下的所有物件存成陣列
  let options = Array.from(form.elements);

  // 取出點選的元素
  checked_array = options.filter((e) => e.checked);
  // 設定 0 秒後印出選擇的 value
  setTimeout(() => {
    for (let item of checked_array) {
      // 尋找對應的項目並更新值
      let qstItem = qstObject.qstItem.find((qst) => qst.name === item.name);
      if (qstItem) {
        qstItem.value = item.value;
        qstItem.isChecked = true
      }
      txt_array.textContent += item.value + "/";
      console.log("checked_array.length:" + checked_array.length);
    }
  }, 0);
  console.log('txt_array.textContent', txt_array.textContent);
};

// 主要操作的問題項目紀錄
const allQst = function (options) {
  this.qstItem = options.map((d, i) => ({
    name: d,
    value: '',
    isChecked: false,
    index: i
  }));
}

// 製作物件--------------------------------------------
function answerArray(form) {
  // 將表單下的所有物件存成陣列
  let options = Array.from(form.elements);

  // 建立一個空陣列來存放重複的name項目
  let optionNames = [];
  options.forEach(function (option) {
    // 判斷是否有重複的name
    if (optionNames.includes(options.name)) {
      return;
    }
    // 將重複的name加入optionNames陣列
    let duplicateOptions = options.filter(function (e) {
      return e.name === option.name;
    });
    // 過濾掉 重複 的name 加入optionNames陣列
    if (!optionNames.includes(option.name)) {
      optionNames.push(option.name);
    }
  })
  return optionNames
};

/* rSlider------------------------------------------------ JS 套件 */
function rSliderInit() {
  rangeSlider = new rSlider({
    target: '#rangeSlider',
    values: ['1萬', '2萬', '3萬', '4萬', '5萬', '6萬', '7萬', '8萬', '9萬', '10萬'],
    range: true,
    set: ['1萬', '10萬'],
    onChange: (newRangeVals) => {
      console.log(newRangeVals);
      rangeVals = newRangeVals; // 更新全域變數 rangeVals 的值
      console.log('rangeVals', rangeVals); // 更新後的 rangeVals 值
    }
  });
};
