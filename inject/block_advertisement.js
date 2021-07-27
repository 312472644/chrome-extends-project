/** 拦截广告 */
const blockAdvertisement = {
  /**
   * 屏蔽广告
   *
   */
  init() {
    this.blockCSDN();
    this.blockCNBlog();
    this.blockJueJin();
  },
  /**
   * 屏蔽CSDN
   *
   */
  blockCSDN() {
    if (!location.host.includes('csdn')) {
      return;
    }
    // 屏蔽首页
    $('.www-banner-top,.advertisement,.kp_bos_swiper').hide();
    // 屏蔽文章页
    $('#recommendAdBox').hide();
  },
  /**
  * 屏蔽博客园
  *
  */
  blockCNBlog() {
    if (!location.host.includes('cnblogs')) {
      return;
    }
    setTimeout(() => {
      $('.sidebar-image,.under-post-card,.bannerbar').hide();
    }, 0);
  },
  /**
   * 屏蔽掘金
   *
   */
  blockJueJin() {
    if (!location.host.includes('juejin')) {
      return;
    }
    this.delayExecute(500).then(() => {
      document.querySelectorAll('.banner').forEach((element) => {
        element.remove();
      });
    })
    this.delayExecute(2000).then(() => {
      document.querySelector('.sidebar-bd-entry').remove();
    })
  },
  /**
   * 延迟调用函数
   *
   * @param {number} [delay=500]
   * @return {*} promise对象
   */
  delayExecute(delay = 500) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, delay);
    })
  }
};

$(function () {
  blockAdvertisement.init();
})