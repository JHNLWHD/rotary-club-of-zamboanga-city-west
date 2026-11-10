export function contentfulImageUrl(source: string, width: number): string {
  try {
    const url = new URL(source.startsWith('//') ? `https:${source}` : source);
    if (!['images.ctfassets.net', 'images.eu.ctfassets.net'].includes(url.hostname)
      || !/\.(png|jpe?g|webp|avif)$/i.test(url.pathname)) return source;

    url.searchParams.set('w', String(width));
    url.searchParams.set('fm', 'webp');
    url.searchParams.set('q', '80');
    return url.href;
  } catch {
    return source;
  }
}

export function responsiveImage(source: string, widths: number[], sizes: string, nativeWidth?: number) {
  // Contentful does not upscale. Keep width descriptors true for smaller originals.
  const candidates = Array.from(new Set(widths.map((width) => nativeWidth && nativeWidth > 0 ? Math.min(width, nativeWidth) : width)));
  const src = contentfulImageUrl(source, candidates[candidates.length - 1]);
  if (src === source && contentfulImageUrl(source, 1) === source) return { src };
  return {
    src,
    srcSet: candidates.map((width) => `${contentfulImageUrl(source, width)} ${width}w`).join(', '),
    sizes,
  };
}
