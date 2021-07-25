/** chrome 获取网页cookie */
const chromeCookie = {
    /**
     * 获取网址cookie信息
     *
     * @param {*} { url = '',url地址 name = '',cookie名称 }
     * @param {*} callback
     * @return {*} 
     */
    getCookie(details, callback) {
        return chrome.cookies.get(details, callback);
    },
    /**
     * 获取指定网址所有cookie信息
     *
     * @param {string} [details={ url = '', name = '' }]
     * @param {*} callback
     * @return {*} 
     */
    getAllCookie(details, callback) {
        return chrome.cookies.getAll(details, callback);
    },
    /**
     * 设置cookie
     *
     * @param {*} details 同上参数
     */
    setCookie(details) {
        chrome.cookies.set(details);
    },
    /**
     * 删除cookie
     *
     * @param {*} { url = '', name = '' }
     */
    removeCookie({ url = '', name = '' }) {
        chrome.cookies.remove({ url, name })
    },
    /**
     *cookie发生变化时触发事件
     *
     * @param {*} changeEvent removed:cookie是否被删除 cookie:修改cookie对象
     */
    cookieChangeEvent(changeEvent = (removed, cookie) => { }) {
        chrome.cookies.onChanged.addListener(changeEvent);
    }
};