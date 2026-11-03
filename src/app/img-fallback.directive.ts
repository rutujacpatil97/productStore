import { Directive, HostListener, Input } from '@angular/core';

const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">' +
      '<rect width="300" height="300" fill="#e9ecef"/>' +
      '<text x="150" y="158" font-family="sans-serif" font-size="18" fill="#6c757d" text-anchor="middle">No image</text>' +
      '</svg>'
  );

/** Swaps in a placeholder when an <img> fails to load (these are hotlinked, so they do break). */
@Directive({ selector: 'img[appImgFallback]' })
export class ImgFallbackDirective {
  @Input() appImgFallback = '';

  @HostListener('error', ['$event'])
  onError(event: Event): void {
    const img = event.target as HTMLImageElement;
    const fallback = this.appImgFallback || PLACEHOLDER;
    if (img.src !== fallback) {
      img.src = fallback;
    }
  }
}
