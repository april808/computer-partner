window.addEventListener('load', init);

let qstObject; // 定義為全域變數 回答的物件
let rangeSlider; // 定義為全域變數
let rangeVals = ['1萬', '10萬']; // 假設有初始值
let form = document.getElementById('form');


// 主要操作的問題項目紀錄
const allQst = function (options) {
  this.qstItem = options.map((d, i) => ({
    name: d,
    value: '',
    isChecked: false,
    index: i
  }));
}

// 觸發開關
const newStartBtn = new el_item('#start_btn');
newStartBtn.addCls('auto');
const newEndBtn = new el_item('#end_btn');
newEndBtn.addCls('auto');
const newbestAdvice = new el_item('#best-advice');
newbestAdvice.addCls('hidden').hidden = true;

const newAbout= new el_item('.about');
  newAbout.addAni('margin-bottom','-300px')

// const newFormContent = new el_item('#form');
// newFormContent.addCls('hidden').hidden = true;


function init() {
  rSliderInit();// range 預算套件執行
  //立即開始 #start_btn 點按後出現問答
  initSwiper();//把所有問題隱藏
  document.getElementById('start_btn').onclick = startAnswer;
  newStartBtn
    .addCls('auto')
    .addAni('transition-delay', 's');
}



// 主要操作的class項目
const all_qst = [".question-1", ".question-2", ".question-3", ".question-4", ".question-5", ".question-final"];



function initSwiper() {
  for (let i = 0; i < all_qst.length; i++) {
    // 事先將指定的項目在畫面中消失
    let qstList = new el_item(all_qst[i]);
    qstList.addCls('hidden').hidden = true;
  }
}

// 取得方法1的5個問題陣列-------------並觸發翻頁
function getRadio1_5(firstFiveItems, txt_array, checked_array, swiper) {
  // let all_answer = firstFiveItems.every((item) => item.isChecked);
  let all_answer = checked_array.length === swiper.slides.length;
  let swiperIndex = swiper.realIndex;

  if (all_answer === true) {
    console.log('all_answer', all_answer);
    txt_array.style.backgroundColor = "green";
    new el_item("#q1_alert")
      .alertText(`<span>方法1 項目完成!</span>`)
      .addCls('ani_end')
      .addAni('animation', 'ani_s 0.3s 1');
    new el_item('.question-2').removeCls('hidden').addCls('auto').hidden = false;
    return;
  } else {
    // 觸發點按事件後，確認當下的按鈕有沒有值
    if (!firstFiveItems[swiperIndex].isChecked) {
      setTimeout(() => {
        swiper.slideNext(500, false);
      }, 300)
      // swiper.slideTo(swiper.realIndex + 1);
    }
    if (swiper.isEnd && !all_answer) {
      let emptyIndex;
      emptyIndex = -1;
      setTimeout(() => { // 假如1秒後仍沒有全部回答
        for (let k = 0; k < swiper.slides.length; k++) {
          if (!firstFiveItems[k].isChecked) {
            emptyIndex = k;
            break;
          }
        }
        if (emptyIndex !== -1) {
          new el_item("#q1_alert")
            .alertText(`<span>有空白項目: ${emptyIndex + 1}</span>`)
            .addAni('animation', 'ani_s 0.6s 1');

          txt_array.style.backgroundColor = "red";
          setTimeout(() => {
            swiper.slideTo(emptyIndex);
          }, 400);

          setTimeout(() => {
            new el_item("#q1_alert")
              .addAni('animation', 'ani_e .8s 1')
              .alertText(``);
          }, 1000);
        }
      }, 1000);
    }
    if (checked_array === swiper.slides.length) {
      txt_array.style.backgroundColor = "green";
      new el_item("#q1_alert")
        .addAni('animation', 'ani_e 0.6s 1')
        .alertText(`<span>方法1 項目完成! 先錯誤再正確</span>`)
        .addCls('ani_end')
        .addAni('animation', 'ani_s 0.3s 1');
    };
  }
};


// 開始問答--------------------------------------------
function startAnswer() {
  console.log('立即開始回答?', this.id);
  new el_item(`#start_btn`).toggleHidden();
  new el_item('.question-1').removeCls('hidden').addCls('auto').hidden = false;
  console.log('new el_item(.question-1', new el_item('.question-1'))
  newAbout.removeAni('margin-bottom')

  answerArray(form); //取出問題的 name 製作成陣列

  qstObject = new allQst(answerArray(form))//製作的回答空位
  // console.log(qstObject)

  let txt_array = document.querySelector('#array'); // 回答印出的地方
  txt_array.textContent = "init";// 檢查觸發是否開始

  // 聆聽是否變動問卷
  form.addEventListener('change', function (e) {
    checked_array = printForm(form, txt_array, qstObject);

    // // 取得 qstObject 的前五個項目
    let firstFiveItems = qstObject.qstItem.slice(0, 5);
    // console.log('firstFiveItems',firstFiveItems,swiper)
    getRadio1_5(firstFiveItems, txt_array, checked_array, swiper); // 將 qstObject 和 swiper 作為參數傳遞

    console.log('e', e.target.name)

    if (e.target.name == 'use_place') {
      new el_item('.question-3').removeCls('hidden').addCls('auto').hidden = false;
    }

    if (e.target.name == 'use_system') {
      new el_item('.question-4').removeCls('hidden').addCls('auto').hidden = false;

      setTimeout(()=>{
        new el_item('.question-5').removeCls('hidden').addCls('auto').hidden = false;
      }, 600)

      setTimeout(()=>{
        new el_item('.question-final').removeCls('hidden').addCls('auto').hidden = false;
      }, 1200)

    }
  });

  // 當最後的按鈕點下後，傳最後一次資料
  let end_btn = document.getElementById('end_btn');
  end_btn.addEventListener('click', function () {
    let range = qstObject.qstItem.find((qst) => qst.name === 'use_range');
    console.log('range.name', range.name); //use_range
    range.value = rangeVals;
    range.isChecked = true;
    txt_array.textContent += rangeVals;
    console.log('qstObject', qstObject)
    newEndBtn.toggleHidden();
    newbestAdvice.toggleHidden();
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
  return checked_array;
};

// 製作--------------------------------------------
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
/* Initialize Swiper------------------------------------------------ JS 套件 */
const swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
  runCallbacks: true,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    disabledClass: 'disabled_swiper_button'
  }
});