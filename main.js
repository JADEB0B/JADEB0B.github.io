(function () {
  var body = document.body;
  var toggle = document.getElementById('modeToggle');
  if (!toggle) return;
  var label = toggle.querySelector('.toggle-text');

  function setOrigin() {
    var r = toggle.getBoundingClientRect();
    document.documentElement.style.setProperty('--ox', (r.left + r.width / 2) + 'px');
    document.documentElement.style.setProperty('--oy', (r.top + r.height / 2) + 'px');
  }

  function setMode(isPrivate) {
    setOrigin();
    body.classList.toggle('is-private', isPrivate);
    toggle.setAttribute('aria-pressed', String(isPrivate));
    if (label) label.textContent = isPrivate ? 'Personal' : 'Public';
    var priv = document.getElementById('privateView');
    if (priv) priv.setAttribute('aria-hidden', String(!isPrivate));
    try { localStorage.setItem('site-mode', isPrivate ? 'private' : 'public'); } catch (e) {}
  }

  toggle.addEventListener('click', function () {
    setMode(!body.classList.contains('is-private'));
  });

  window.addEventListener('resize', setOrigin);

  var saved = null;
  try { saved = localStorage.getItem('site-mode'); } catch (e) {}
  setMode(saved === 'private');

  // Replay playlist year tabs
  var tabs = document.getElementById('yearTabs');
  var musicFrame = document.getElementById('musicFrame');
  if (tabs && musicFrame) {
    tabs.addEventListener('click', function (e) {
      var btn = e.target.closest('.year-tab');
      if (!btn) return;
      var src = btn.getAttribute('data-src');
      if (src && musicFrame.src !== src) musicFrame.src = src;
      tabs.querySelectorAll('.year-tab').forEach(function (t) {
        t.classList.toggle('active', t === btn);
      });
    });
  }
})();
