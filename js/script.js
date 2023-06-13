
// 單一項目處理----------------------------------------
class el_item {
  constructor(obj) {
    this.el = document.querySelector(obj);
    this.hidden = false
  }

  removeCls(name) {
    this.el.classList.remove(name);
    return this; // 返回 this，以實現鏈式調用
  }

  addCls(addname) {
    this.el.classList.add(addname);
    return this; // 返回 this，以實現鏈式調用
  }

  alertText(text) {
    this.el.innerHTML = text;
    return this; // 返回 this，以實現鏈式調用
  }

  addAni(property, value) {
    this.el.style[property] = value; // 將新的 CSS 屬性和值添加到 style 屬性中
    return this; // 返回 this，以實現鏈式調用
  }

  removeAni(property) {
    this.el.style[property] = ''; // 將指定屬性的值設為空字符串
    return this; // 返回 this，以實現鏈式調用
  }

  toggleHidden() {
    this.hidden = !this.hidden;
    if (this.hidden) {
      this.el.classList.remove('auto');
      this.el.classList.add('hidden');
    } else {
      this.el.classList.remove('hidden');
      this.el.classList.add('auto');
    }
    return this;
  }
}

/* svg icon 路徑檔案 換色--------------------------------- */
function svg_icon(className, colorValue) {
  let imgs = document.querySelectorAll(className);
  if (imgs.length > 0) {
    imgs.forEach((img) => {
      // console.log('抓到檔案', img);
      let imgSrc = img.getAttribute('src');
      fetch(imgSrc)
        .then(response => response.text())
        .then(svgText => {
          let parser = new DOMParser();
          let svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
          let paths = svgDoc.querySelectorAll('path');
          if (paths.length > 0) {
            paths.forEach((path, index) => {
              // 逐個更改每個路徑的填充顏色
              if (index === 0) {
                path.style.fill = colorValue; // 第一個路徑的顏色設置
              } else if (index === 1) {
                path.style.fill = colorValue; // 第二個路徑的顏色設置
              }
              // 可以繼續添加更多路徑的顏色設置
            });
            img.parentNode.insertBefore(svgDoc.documentElement, img);
            img.remove();
          }
        })
        .catch(error => {
          console.log('無法獲取 SVG 文件：', error);
        });
    });
  }
};