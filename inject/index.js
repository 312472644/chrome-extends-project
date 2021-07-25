/** 动态注入页面的脚本文件 */
const inject = {
    initPage() {
        console.log('dom load');
    }
};

$(function () {
    inject.initPage();
});