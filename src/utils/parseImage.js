const VALID_SIZES = new Set(['square', 'wide', 'tall', 'large']);

export function parseImageFilename(path) {
  const filename = path.split('/').pop() ?? path;
  const base = filename.replace(/\.(jpeg|jpg|png|webp)$/i, '');
  const match = base.match(/^(\d+)-([a-zA-Z]+)-(.+)$/);
  if (!match) {
    return { order: Number.MAX_SAFE_INTEGER, size: 'square', alt: base };
  }
  const [, order, size, alt] = match;
  return {
    order: parseInt(order, 10),
    size: VALID_SIZES.has(size) ? size : 'square',
    alt: alt.trim(),
  };
}

export function parseImageGlob(glob) {
  return Object.entries(glob)
    .map(([path, mod]) => ({ ...parseImageFilename(path), src: mod.default, path }))
    .sort((a, b) => a.order - b.order);
}

export function interleaveArrays(...arrays) {
  const result = [];
  const maxLen = Math.max(0, ...arrays.map((a) => a.length));
  for (let i = 0; i < maxLen; i++) {
    for (const arr of arrays) {
      if (i < arr.length) result.push(arr[i]);
    }
  }
  return result;
}
