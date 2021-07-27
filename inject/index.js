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
    },
};

$(function () {
    inject.initPage();
});