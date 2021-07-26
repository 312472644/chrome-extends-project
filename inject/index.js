/** 动态注入页面的脚本文件 */
const inject = {
    initPage() {
        this.addListenerPopupEvent();
    },
    /**
     * 监听popup页面触发的事件
     *
     */
    addListenerPopupEvent() {
        // 监听popup页面触发的事件，因为popup页面无法获取到当前打开选项卡的dom元素，所以采用在inject脚本注入的方式。
        chrome.runtime.onMessage.addListener((request) => {
            const { action } = request;
            if (action === 'screenshot') {
                this.screenshot();
            }
        })
    },
    /**
     * 当前选项卡网页截图
     *
     */
    screenshot() {
        const $document = $(document.body);
        const documentWidth = $document.width();
        const documentHeight = $document.height();

        // 创建canvas画布
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = documentWidth;
        canvas.height = documentHeight;
        canvas.id = 'chrome_canvas';

        document.body.append(canvas);
    }
};

$(function () {
    // inject.initPage();
    // console.log('inject success');
});