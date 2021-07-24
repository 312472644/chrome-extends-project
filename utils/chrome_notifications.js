/** chrome桌面通知,需要权限notifications */
const chromeNotification = {
  /**
   * 发送桌面消息
   *
   * @param {*} title
   * @param {string} [options={
   *     icon: '', 通知消息显示icon地址
   *     body: '', 消息主题
   *     onclick: () => { }, 点击消息事件
   *     onshow: () => { }, 显示消息触发事件
   *     onclose: () => { } 关闭消息触发事件
   *   }]
   *  @return {*} notification实例
   */
  sendNotification(title, options = {
    icon: '',
    body: '',
    onclick: () => { },
    onshow: () => { },
    onclose: () => { }
  }) {
    let notification = null;
    const permission = Notification.permission;
    // 用户已经授权
    if (permission === "granted") {
      notification = new Notification(title, options);
    }
    // 用户还未授权
    else if (permission === "denied") {
      Notification.requestPermission().then((permission) => {
        // 如果用户接受权限，我们就可以发起一条消息
        if (permission === "granted") {
          notification = new Notification(title, options);
        } else {
          throw new Error('用户拒绝桌面消息推送');
        }
      });
    }
    return notification;
  }
};