// SVG-иконки. Возвращают строку HTML.
// Использование: icon('tg', 16)

const ICON_PATHS = {
  arrow:    '<path d="M5 12h14M13 6l6 6-6 6"/>',
  tg:       '<path d="M3 11.5 20.5 4 17 20l-5-4-3 3v-5l9-8-11 6-4-1 .5-3.5Z"/>',
  mail:     '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3 7 9 6 9-6"/>',
  gh:       '<path d="M12 3a9 9 0 0 0-2.85 17.54c.45.08.6-.2.6-.43v-1.6c-2.5.54-3.03-1.2-3.03-1.2-.4-1.05-1-1.33-1-1.33-.83-.57.07-.56.07-.56.92.07 1.4.95 1.4.95.82 1.4 2.15 1 2.68.77.08-.6.32-1 .58-1.23-2-.23-4.1-1-4.1-4.48 0-1 .35-1.8.93-2.44-.1-.23-.4-1.15.08-2.4 0 0 .76-.25 2.5.92a8.6 8.6 0 0 1 4.55 0c1.73-1.17 2.5-.92 2.5-.92.48 1.25.18 2.17.08 2.4.58.64.92 1.44.92 2.44 0 3.5-2.1 4.25-4.1 4.47.33.28.62.83.62 1.68v2.5c0 .24.15.52.6.43A9 9 0 0 0 12 3Z"/>',
  in:       '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 11v6"/>',
  blog:     '<path d="M4 5h12a4 4 0 0 1 4 4v10H8a4 4 0 0 1-4-4V5Z"/><path d="M8 10h8M8 14h5"/>',
  ext:      '<path d="M7 17 17 7M9 7h8v8"/>',
  download: '<path d="M12 3v12m0 0-4-4m4 4 4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>',
};

function icon(name, size) {
  size = size || 16;
  var path = ICON_PATHS[name];
  if (!path) return '';
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + '</svg>';
}
