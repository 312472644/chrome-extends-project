let popup = {
  menuId: null,
  /**
   * 页面初始化
   */
  initPage() {
    this.bindEvent();
    this.triggerEvent();
  },
  /**
   * 事件监听
   *
   */
  triggerEvent() {
    chromeCookie.cookieChangeEvent((remove, cookie) => {
      console.log('cookie', cookie);
    });
    chromeTab.removeTabEvent((tabId, removeInfo) => {
      console.log('removeInfo', removeInfo);
    });
    chromeTab.selectTabChangeEvent((tabId, selectInfo) => {
      console.log('tabId', tabId);
    });
  },
  /**
   * 事件绑定
   *
   */
  bindEvent() {
    $("#btn_create_menu").bind("click", () => {
      this.menuId = chromeMenu.createChromeMenu({
        title: '自定义菜单'
      });
      chromeMenu.createChromeMenu({
        parentId: this.menuId,
        title: '自定义菜单-1',
        onclick() {
          chromeMenu.removeChromeAllMenu()
        }
      });
    })
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
      chromeCookie.getAllCookie({ url: webUrl }, (cookie) => {
        console.log('cookie', cookie);
      });
      chromeCookie.setCookie({ url: webUrl, name: 'chrome-cookie', value: 'chrome-cookie' });
      chromeCookie.removeCookie({ url: webUrl, name: 'chrome-cookie' })
    });
    $("#btn_visible_tab").bind("click", () => {
      chromeTab.captureVisibleTab();
    });
    $("#btn_create_tab").bind("click", () => {
      chromeTab.createTab({
        windowId: null,
        url: 'https://www.baidu.com/',
        selected: false
      }, (tabs) => {
        console.log('tabs', tabs);
      })
    });
    $("#btn_execute_scripts").bind("click", () => {
      chromeTab.executeScriptOrCss(null, { code: 'body{background:red}' }, 'css');
    });
    $('#btn_get_all_tabs').bind("click", () => {
      chromeTab.getAllInTabs(null, (tabs) => {
        tabs.forEach(element => {
          const { active, id } = element;
          if (!active) {
            chromeTab.removeTab(id);
          }
        });
      });
    });
    $("#btn_create_window").bind("click", () => {
      chromeWindow.createWindow({ url: 'https://www.baidu.com/' }, (window) => {
        console.log('window', window);
      });
    });
  }
};

$(function () {
  popup.initPage();
})