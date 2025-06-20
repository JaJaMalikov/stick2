export const keystr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+_=';

export function encode64(input) {
  const output = [];
  let i = 0;
  while (i < input.length) {
    const chr1 = input.charCodeAt(i++);
    const chr2 = input.charCodeAt(i++);
    const chr3 = input.charCodeAt(i++);

    const enc1 = chr1 >> 2;
    const enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    let enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    let enc4 = chr3 & 63;

    if (Number.isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (Number.isNaN(chr3)) {
      enc4 = 64;
    }

    output.push(keystr.charAt(enc1), keystr.charAt(enc2), keystr.charAt(enc3), keystr.charAt(enc4));
  }
  return output.join('');
}

export function decode64(input) {
  const clean = input.replace(/\//g, '_');
  let output = '';
  let i = 0;
  while (i < clean.length) {
    const enc1 = keystr.indexOf(clean.charAt(i++));
    const enc2 = keystr.indexOf(clean.charAt(i++));
    const enc3 = keystr.indexOf(clean.charAt(i++));
    const enc4 = keystr.indexOf(clean.charAt(i++));

    const chr1 = (enc1 << 2) | (enc2 >> 4);
    const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    const chr3 = ((enc3 & 3) << 6) | enc4;

    output += String.fromCharCode(chr1);
    if (enc3 !== 64) output += String.fromCharCode(chr2);
    if (enc4 !== 64) output += String.fromCharCode(chr3);
  }
  return output;
}
