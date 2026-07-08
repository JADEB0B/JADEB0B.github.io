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
})();
