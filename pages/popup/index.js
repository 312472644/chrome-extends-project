let popup = {
  menuId: null,
  /**
   * 页面初始化
   */
  initPage() {
    chromeUtils.chromeTab.getCurrentTab((tabs) => {
      const { url } = tabs;
      $('#input_url').val(url);
    });
    this.bindEvent();
    this.triggerEvent();
  },
  /**
   * 事件监听
   *
   */
  triggerEvent() {
    chromeUtils.chromeCookie.cookieChangeEvent((remove, cookie) => {
      console.log('cookie', cookie);
    });
    chromeUtils.chromeTab.removeTabEvent((tabId, removeInfo) => {
      console.log('removeInfo', removeInfo);
    });
    chromeUtils.chromeTab.selectTabChangeEvent((tabId, selectInfo) => {
      console.log('tabId', tabId);
    });
  },
  /**
   * 展示提示信息
   *
   */
  showAlertSuccess() {
    $('#ant_alert').show();
    setTimeout(() => {
      $('#ant_alert').hide();
    }, 3000);
  },
  /**
   * 创建表哥展示信息
   * @param {*} columnList 列名
   * @param {*} dataList 数据源
   */
  createTable(columnList, dataList) {
    let columnHtml = '<tr>';
    let tbodyHtml = '';
    // 生成表头
    columnList.forEach(item => {
      columnHtml += `<td>${item.label}</td>`;
    });
    columnHtml += '</tr>';
    // 生成列
    dataList.forEach(item => {
      tbodyHtml += `<tr>`;
      columnList.forEach(column => {
        tbodyHtml += `<td>${item[column.name]}</td>`;
      });
      tbodyHtml += `</tr>`;
    })
    let tableHtml = `<table class="cookie-table">
                        <thead>
                          ${columnHtml}
                        </thead>
                        <tbody>
                          ${tbodyHtml}
                        </tbody>
                     </table>`;
    $('#table').html(tableHtml);
    $('#table').show();
  },
  /**
   * 事件绑定
   *
   */
  bindEvent() {
    $("#btn_create_menu").bind("click", () => {
      this.menuId = chromeUtils.chromeMenu.createChromeMenu({
        title: '自定义菜单'
      });
      chromeUtils.chromeMenu.createChromeMenu({
        parentId: this.menuId,
        title: '删除菜单'
      });
      this.showAlertSuccess();
    });

    $("#btn_delete_menu").bind("click", () => {
      Notification.requestPermission().then(function (permission) {
        // 如果用户接受权限，我们就可以发起一条消息
        if (permission === "granted") {
          const notification = new Notification('react hooks', {
            body: 'body'
          });
        }
      });
    });

    $("#btn_get_cookie").bind("click", () => {
      const webUrl = $("#input_url").val().trim();
      chromeUtils.chromeCookie.getAllCookie({ url: webUrl }, (cookie) => {
        const cookieList = cookie || [];
        const columnList = [{
          label: '域名',
          name: 'domain'
        }, {
          label: '名称',
          name: 'name'
        }, {
          label: '值',
          name: 'value'
        }];
        this.createTable(columnList, cookieList);
      });
      chromeUtils.chromeCookie.setCookie({ url: webUrl, name: 'chrome-cookie', value: 'chrome-cookie' });
      // chromeUtils.chromeCookie.removeCookie({ url: webUrl, name: 'chrome-cookie' });
    });

    $("#btn_visible_tab").bind("click", () => {
      chromeUtils.chromeTab.captureVisibleTab();
    });

    $("#btn_create_tab").bind("click", () => {
      chromeUtils.chromeTab.createTab({
        windowId: null,
        url: 'https://www.baidu.com/',
        selected: false
      }, (tabs) => {
        console.log('tabs', tabs);
      })
    });

    $('#btn_get_all_tabs').bind("click", () => {
      chromeUtils.chromeTab.getAllInTabs(null, (tabs) => {
        const columnList = [{
          label: '名称',
          name: 'title'
        }, {
          label: '地址',
          name: 'url'
        }, {
          label: '当前页签',
          name: 'active'
        }];
        this.createTable(columnList, tabs);
      });
    });

    $("#btn_create_window").bind("click", () => {
      chromeUtils.chromeWindow.createWindow({ url: 'https://www.baidu.com/' }, (window) => {
        console.log('window', window);
      });
    });
  }
};

$(function () {
  popup.initPage();
})