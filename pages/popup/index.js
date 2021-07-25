let popup = {
  menuId: null,
  /**
   * 页面初始化
   */
  initPage() {
    this.bindEvent();
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
        title: '自定义菜单-1'
      });
    })
    $("#btn_delete_menu").bind("click", () => {
      // chromeMenu.removeChromeAllMenu();
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
    })
    chromeCookie.cookieChangeEvent((remove, cookie) => {
      console.log('remove', remove);
      console.log('cookie', cookie);
    });
  }
};

$(function () {
  popup.initPage();
})