let popup = {
  menuId: null,
  url: null,
  /**
   * 页面初始化
   */
  initPage() {
    chromeUtils.chromeTab.getCurrentTab((tabs) => {
      const { url } = tabs;
      this.url = url;
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
    const $alert = $('#ant_alert');
    $alert.show(() => {
      setTimeout(() => {
        $alert.hide();
      }, 3000);
    });
  },
  /**
   * 创建表格展示信息
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
    if (dataList.length === 0) {
      tbodyHtml += `<tr><td class='no-record' colspan=${columnList.length}>暂无数据</td></tr>`;
    } else {
      dataList.forEach(item => {
        tbodyHtml += `<tr>`;
        columnList.forEach((column) => {
          const value = item[column.name];
          tbodyHtml += `<td class='ellipsis' title=${value}>${value}</td>`;
        });
        tbodyHtml += `</tr>`;
      })
    }
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
   * 创建右键菜单
   *
   */
  createMenu() {
    this.menuId = chromeUtils.chromeMenu.createChromeMenu({
      title: '自定义菜单'
    });
    chromeUtils.chromeMenu.createChromeMenu({
      parentId: this.menuId,
      title: '删除菜单'
    });
    this.showAlertSuccess();
  },
  /**
   * 发送桌面消息
   *
   */
  sendNotification() {
    Notification.requestPermission().then(function (permission) {
      // 如果用户接受权限，我们就可以发起一条消息
      if (permission === "granted") {
        const notification = new Notification('通知', {
          body: '这是测试消息',
          icon: '../../assets/images/notice.png'
        });
      }
    });
  },
  /**
   * 获取网页cookie
   *
   */
  getWebSiteCookie() {
    if (!(this.url.includes('http') || this.url.includes('https'))) {
      return;
    }
    chromeUtils.chromeCookie.getAllCookie({ url: this.url }, (cookie) => {
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
  },
  /**
   * 创建选项卡
   *
   */
  createTab() {
    chromeUtils.chromeTab.createTab({
      windowId: null,
      url: this.url,
      selected: false
    }, (tabs) => {
      console.log('tabs', tabs);
    })
  },
  /**
   * 获取所有选项卡信息
   *
   */
  getAllInTabs() {
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
  },
  /**
   * 关闭非当前选项卡
   *
   */
  closeOtherTabs() {
    chromeUtils.chromeTab.getAllInTabs(null, (tabList = []) => {
      tabList.forEach(tab => {
        const { active, id } = tab;
        if (!active) {
          chromeUtils.chromeTab.removeTab(id);
        }
      })
    })
  },
  /**
   * 清除缓存
   *
   */
  clearCache() {
    chromeUtils.chromeCookie.getAllCookie({ url: this.url }, (cookieList = []) => {
      cookieList.forEach(cookie => {
        chromeUtils.chromeCookie.removeCookie({ url: this.url, name: cookie.name });
      });
      this.getWebSiteCookie();
    });
  },
  /**
   * 事件绑定
   *
   */
  bindEvent() {
    $("#btn_create_menu").bind("click", () => {
      this.createMenu();
      chrome.storage.local.get(['color'], function (value) {
        console.log(value);
      });
    });

    $("#btn_send_notification").bind("click", () => {
      this.sendNotification();
    });

    $("#btn_get_cookie").bind("click", () => {
      this.getWebSiteCookie();
      // 保存数据
      chrome.storage.sync.set({ color: 'blue' }, function () {
        console.log('保存成功！');
      });
    });

    $("#btn_visible_tab").bind("click", () => {
      chromeUtils.chromeTab.captureVisibleTab();
    });

    $("#btn_create_tab").bind("click", () => {
      this.createTab();
    });

    $('#btn_get_all_tabs').bind("click", () => {
      this.getAllInTabs();
    });

    $("#btn_create_window").bind("click", () => {
      chromeUtils.chromeWindow.createWindow({ url: this.url }, (window) => {
        console.log('window', window);
      });
    });

    $('#btn_other_tab').bind('click', () => {
      this.closeOtherTabs();
    });

    $('#btn_clear_cookie').bind('click', () => {
      this.clearCache();
    });

    $('#btn_set_storage').bind('click', () => {
      chromeUtils.chromeStorage.storageLocalSet({ name: 'sugar' });
      this.showAlertSuccess();
    });

    $('#btn_send_message').bind('click', () => {
      chromeUtils.chromeMessage.sendMessage({ action: 'cmd', value: 'test' }, (response) => {
        console.log('response', response);
      });
    });
  }
};

$(function () {
  popup.initPage();
})