/* 世界杯站共享主题切换：报告页引入 <link href="../theme.css"> + <script src="../theme.js"></script> 即可
 * 与首页共用 localStorage key 'wc-theme'，跨页面主题一致 */
(function () {
  // 同步预应用，避免闪屏（脚本需放在 <head> 内同步加载）
  try {
    if (localStorage.getItem('wc-theme') === 'light')
      document.documentElement.setAttribute('data-theme', 'light');
  } catch (e) {}

  function init() {
    if (document.querySelector('.theme-toggle')) return; // 页面已有按钮（如首页）则不重复注入
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.title = '切换白天/黑夜主题';
    function sync() {
      btn.textContent = document.documentElement.getAttribute('data-theme') === 'light' ? '☀️' : '🌙';
    }
    btn.addEventListener('click', function () {
      var light = document.documentElement.getAttribute('data-theme') === 'light';
      if (light) document.documentElement.removeAttribute('data-theme');
      else document.documentElement.setAttribute('data-theme', 'light');
      try { localStorage.setItem('wc-theme', light ? 'dark' : 'light'); } catch (e) {}
      sync();
    });
    document.body.appendChild(btn);
    sync();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
