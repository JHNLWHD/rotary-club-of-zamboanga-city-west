export function showProjectImageFallback(image: HTMLImageElement | null) {
  const fallback = "/rotary-zc-west.jpg";
  if (image?.complete && image.naturalWidth === 0 && image.getAttribute("src") !== fallback) {
    image.removeAttribute("srcset");
    image.removeAttribute("sizes");
    image.src = fallback;
  }
}
