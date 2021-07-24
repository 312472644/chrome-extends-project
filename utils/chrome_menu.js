/** 创建右键菜单 contextMenus */
const chromeMenu = {
  /**
   *
   * 创建右键菜单
   * @param {*} [menuConfig={}] 菜单配置属性
   * @param {*} [callback=() => { }] 创建成功回调函数
   * @return {*} 返回创建的menuId
   */
  createChromeMenu(menuConfig = {}, callback = () => { }) {
    return chrome.contextMenus.create(menuConfig, callback);
  },
  /**
   * 删除右键菜单
   *
   * @param {*} menuId 创建menuId
   * @param {*} callback 删除成功回调函数
   */
  removeChromeMenu(menuId, callback) {
    chrome.contextMenus.remove(menuId, callback);
  },
  /**
   * 删除所有右键菜单
   *
   * @param {*} callback
   */
  removeChromeAllMenu(callback) {
    chrome.contextMenus.removeAll(callback);
  },
  /**
   * 更新右键菜单
   *
   * @param {*} menuId 创建菜单menuId
   * @param {*} updateConfig 更新菜单属性
   * @param {*} callback 回调函数
   */
  updateChromeMenu(menuId, updateConfig, callback) {
    if (!menuId) {
      throw new Error('menuId 不能为空');
    }
    chrome.contextMenus.update(menuId, updateConfig, callback);
  }
};