# chrome-cli

# 监听消息

chrome.runtime.onMessage.addListener

# 发送消息

```
chrome.tabs.query({active:true, currentWindow:true}, function   (tab) {//获取当前 tab
    //向 tab 发送请求
    chrome.tabs.sendMessage(tab[0].id, {
    action: "send",
}, function (response) {
    console.log(response);
    });
});
```
