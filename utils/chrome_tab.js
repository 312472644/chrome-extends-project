/** chrome 选项卡 */
const chromeTab = {
    /**
     * 抓取当前选中标签的可视区域
     *
     * @param {*} windowId 窗口id 默认为当前窗口
     * @param {string} [options={ format: 'jpeg', quality: 1 }] 
     * @param {*} callback 生产base:64地址
     */
    captureVisibleTab(windowId, options = { format: 'png', quality: 100 }) {
        this.getCurrentTab((tabs) => {
            const currentWindowId = windowId || tabs[0].windowId;
            chrome.tabs.captureVisibleTab(currentWindowId, options, (dataUrl) => {
                const linkDom = document.createElement('a');
                linkDom.href = dataUrl;
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
     * 获取当前选中的选项卡
     * @param {*} callback
     */
    getCurrentTab(callback) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, callback);
    }
};