/** chrome 选项卡 */
const chromeTab = {
    /**
     * 抓取当前选中标签的可视区域(网页截屏)
     *
     * @param {*} windowId 窗口id 默认为当前窗口
     * @param {string} [options={ format: 'jpeg', quality: 1 }] 
     * @param {*} callback 生产base:64地址
     */
    captureVisibleTab(windowId, options = { format: 'jpeg', quality: 100 }) {
        this.getCurrentTab((tabs) => {
            const tabId = tabs.id;
            // chrome.tabs.sendMessage(tabId, { action: 'screenshot', param: chrome.tabs.captureVisibleTab });
            const currentWindowId = windowId || tabs[0].windowId;
            chrome.tabs.captureVisibleTab(currentWindowId, options, (imageUrl) => {
                const linkDom = document.createElement('a');
                linkDom.href = imageUrl;
                linkDom.download = `${new Date().getTime()}.${options.format}`;
                linkDom.style.display = 'none';
                document.body.append(linkDom);
                linkDom.click();
                document.body.remove(linkDom);
            });
        });
    },
    /**
     * 创建tab选项页
     *
     * @param {*} [createProperties={ windowId, url, selected }] window:当前窗口id,url:打开选项卡的地址,selected:是否选中当前选项卡
     * @param {*} callback tabs对象
     */
    createTab(createProperties = { windowId, url, selected: false }, callback) {
        chrome.tabs.create(createProperties, callback);
    },
    /**
     * 关闭标签
     *
     * @param {*} tabId
     * @param {*} callback
     */
    removeTab(tabId, callback) {
        chrome.tabs.remove(tabId, callback);
    },
    /**
     * 动态执行脚本文件或css文件
     *
     * @param {*} tabsId
     * @param {string} [details={ code: '', file: '' }]
     * @param {string} [executeType='script'] 要执行的文件类型(script或css)
     * @param {*} callback
     */
    executeScriptOrCss(tabsId, details = { code: '', file: '' }, executeType = 'script', callback) {
        const { code, file } = details;
        if (code && file) {
            throw new Error('code和file不能同时存在');
        }
        if (executeType === 'script') {
            chrome.tabs.executeScript(tabsId, details, callback);
        } else if (executeType === 'css') {
            chrome.tabs.insertCSS(tabsId, details, callback);
        }
    },
    /**
     * 获取特定窗口指定的标签
     *
     * @param {*} windowId
     * @param {*} callback 返回tabs列表
     */
    getAllInTabs(windowId, callback) {
        chrome.tabs.getAllInWindow(windowId, callback);
    },
    /**
     * 获取当前选中的选项卡
     * @param {*} callback 返回tabs对象
     */
    getCurrentTab(callback) {
        chrome.tabs.getSelected(null, callback);
    },
    /**
     * 关闭选项卡触发事件
     *
     * @param {*} [callback=(tabId, removeInfo) => { }]
     */
    removeTabEvent(callback = (tabId, removeInfo) => { }) {
        chrome.tabs.onRemoved.addListener(callback);
    },
    /**
     * 当窗口选中的标签改变时触发事件 
     *
     * @param {*} [callback=(tabId, selectInfo) => { }]
     */
    selectTabChangeEvent(callback = (tabId, selectInfo) => { }) {
        chrome.tabs.onSelectionChanged.addListener(callback);
    }
};