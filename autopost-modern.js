export default function autopost(posturl, params, cb) {
  const conv = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let ucb = 'ucb_';
  for (let i = 0; i < 32; i++) {
    ucb += conv.charAt(Math.floor(Math.random() * conv.length));
  }

  const div = document.createElement('div');
  div.style.display = 'none';
  document.body.appendChild(div);

  const iframe = document.createElement('iframe');
  iframe.id = ucb;
  iframe.name = ucb;
  iframe.addEventListener('load', () => {
    try {
      if (iframe.contentWindow.location === 'about:blank') {
        return;
      }
    } catch {}
    cb();
  });
  div.appendChild(iframe);

  const form = document.createElement('form');
  form.target = ucb;
  form.action = posturl;
  form.method = 'POST';

  for (const [key, value] of Object.entries(params)) {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  }

  div.appendChild(form);
  if (window.frames[ucb].name !== ucb) {
    window.frames[ucb].name = ucb;
  }
  form.submit();
}
