/** chrome 窗口 */
const chromeWindow = {
  /**
   * 创建窗口
   *
   * @param {string} [createData={
   *     url: '', 一个或者一组在视窗作为标签打开的URL
   *     tabId: '', 选项卡id
   *     let: 0, 左边距
   *     top: 0, 上边距
   *     width, 窗体宽度
   *     height, 窗体高度
   *   }]
   * @param {*} callback
   */
  createWindow(createData = {
    url: '',
  }, callback) {
    chrome.windows.create(createData, callback);
  },
  /**
   * 获取当前窗口
   *
   * @param {*} callback
   */
  getCurrentWindow(callback) {
    chrome.windows.getCurrent(callback);
  },
  /**
   * 关闭当前窗口
   *
   * @param {*} windowId
   * @param {*} callback
   */
  removeWindow(windowId, callback) {
    chrome.windows.remove(windowId, callback);
  },
  /**
   * 关闭当前窗口之外的所有窗口
   *
   */
  removeWindowExcludeCurrent() {
    chrome.windows.getAll({}, (callback) => {
      this.getCurrentWindow((window) => {
        const currentWindowId = window.id;
        callback.forEach(element => {
          const windowId = element.id;
          if (windowId !== currentWindowId) {
            this.removeWindow(windowId);
          }
        });
      })
    })
  },
  /**
   * 创建窗口触发事件
   *
   * @param {*} callback windows对象
   */
  createWindowEvent(callback) {
    chrome.windows.onCreated.addListener(callback);
  },
  /**
   * 关闭窗口触发事件
   *
   * @param {*} callback windowId
   */
  removeWindowEvent(callback) {
    chrome.windows.onRemoved.addListener(callback);
  }
};