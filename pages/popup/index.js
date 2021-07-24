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
    })
  }
};

$(function () {
  popup.initPage();
})