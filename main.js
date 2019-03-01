function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.round(h * 100), Math.round(s * 100), Math.round(l * 100)];
}

function toHexString(number) {
  number < 0 ? number = 0xFFFFFFFF + number + 1 : null;
  a = number.toString(16).toUpperCase();
  a.length == 2 ? a = a : a = '0'.concat(a);
  return (a);
}

function updatecolor(mode) {
  // Modes:
  // Mode 0: Creates an array of [r, g, b], updates page.
  // Mode 1: Creates an array of [h, s, l], updates page.
  // Mode 2: Gets hex value sting, updates page.
  let colorrgb;
  let colorhsl;
  let colorhex;
  if (mode == 0) {
    colorrgb = [parseInt(document.getElementById('redslide').value), parseInt(document.getElementById('greenslide').value), parseInt(document.getElementById('blueslide').value)];
    colorhsl = rgbToHsl(colorrgb[0], colorrgb[1], colorrgb[2]);
    colorhex = '#'.concat(toHexString(colorrgb[0]), toHexString(colorrgb[1]), toHexString(colorrgb[2]));
  }
  if (mode == 1) {
    colorhsl = [parseInt(document.getElementById('hueslide').value), parseInt(document.getElementById('satslide').value), parseInt(document.getElementById('lightslide').value)];
    colorrgb = hslToRgb(colorhsl[0] / 100, colorhsl[1] / 100, colorhsl[2] / 100);
    colorhex = '#'.concat(toHexString(colorrgb[0]), toHexString(colorrgb[1]), toHexString(colorrgb[2]));
  }
  if (mode == 2) {
    colorhex = document.getElementById('hexvalue').value;
    colorrgb = [parseInt(colorhex.substr(1, 2), 16), parseInt(colorhex.substr(3,2), 16), parseInt(colorhex.substr(5, 2), 16)];
    colorhsl = rgbToHsl(colorrgb[0], colorrgb[1], colorrgb[2]);
  }
  document.getElementById('huevalue').innerHTML = colorhsl[0];
  document.getElementById('satvalue').innerHTML = colorhsl[1];
  document.getElementById('lightvalue').innerHTML = colorhsl[2];
  document.getElementById('redvalue').innerHTML = colorrgb[0];
  document.getElementById('greenvalue').innerHTML = colorrgb[1];
  document.getElementById('bluevalue').innerHTML = colorrgb[2];
  document.getElementById('hexvalue').value = colorhex;
  document.getElementById('colorrectdiv').style.backgroundColor = colorhex;
  document.getElementById('hueslide').value = colorhsl[0];
  document.getElementById('satslide').value = colorhsl[1];
  document.getElementById('lightslide').value = colorhsl[2];
  document.getElementById('redslide').value = colorrgb[0];
  document.getElementById('greenslide').value = colorrgb[1];
  document.getElementById('blueslide').value = colorrgb[2];
}
function copytoclip() {
  x = document.getElementById('hexvalue');
  x.select();
  document.execCommand('copy');
}
function togallery() {
  x = document.getElementById('hexvalue');
  let ucolors = [];
  for (var i = 0; i < document.getElementsByClassName('maincolor').length; i++) {
    if (document.getElementsByClassName('maincolor')[i].classList.contains('unassigned')) {
      ucolors.push(document.getElementsByClassName('maincolor')[i]);
    }
  }
  y0 = ucolors[0].id;
  y = y0.replace("maincolor","");
  subhexid = "subhex".concat(y);
  subhexval = "<span>var</span>".replace("var", hexvalue.value);
  document.getElementById(subhexid).innerHTML = subhexval;
  ucolors[0].style.backgroundColor = x.value;
  ucolors[0].classList.remove('unassigned');
  ucolors[0].classList.add('assigned');
  ucolors[0].addEventListener('mouseover', function(){colorhover(ucolors[0], 0)});
  ucolors[0].addEventListener('mouseout', function(){colorhover(ucolors[0], 1)});
}
function colorhover(color, mode) {
  temp1 = color.id;
  n = temp1.replace('maincolor', '')
  copyn = "copy".concat(n);
  subhexn = "subhex".concat(n);
  if (mode == 0) {
    document.getElementById(copyn).style.opacity = 1;
    document.getElementById(copyn).style.marginTop = '30px';
    document.getElementById(subhexn).style.opacity = 1;
    document.getElementById(subhexn).style.marginBottom = '30px';
  }
  else if (mode == 1) {
    document.getElementById(copyn).style.opacity = 0;
    document.getElementById(copyn).style.marginTop = '70px';
    document.getElementById(subhexn).style.opacity = 0;
    document.getElementById(subhexn).style.marginBottom = '70px';
  }
}

window.onload = function() {
  for (var i = 0; i < document.getElementsByClassName('color').length; i++) {
    let a = document.getElementsByClassName('color')[i];
    let b = document.getElementsByClassName('copy')[i];
    let c = document.getElementsByClassName('subhex')[i];
    if (i < 8) {
      a.id = "maincolor".concat(i);
      a.style.gridRowStart = 2;
      a.style.gridRowEnd = 'span 1';
      a.style.gridColumnStart = i+1;
      a.style.gridColumnEnd = 'span 1';
      a.classList.add('unassigned');
      a.classList.add('maincolor');
      b.id = "copy".concat(i);
      b.style.gridRowStart = 1;
      b.style.gridRowEnd = 'span 1';
      b.style.gridColumnStart = i+1;
      b.style.gridColumnEnd = 'span 1';
      c.id = "subhex".concat(i);
      c.style.gridRowStart = 3;
      c.style.gridRowEnd = 'span 1';
      c.style.gridColumnStart = i+1;
      c.style.gridColumnEnd = 'span 1';
    }
  }
  updatecolor(2);
}
