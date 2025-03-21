import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appImageLoad]',
  standalone: true
})
export class ImageLoadDirective implements OnInit {
  @Input() appImageLoad!: string;
  @Input() fallbackSrc!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Apply initial styling - a background color placeholder
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#f0f0f0');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'opacity 0.3s ease');
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.6');
    
    // Get the image source from the element or from the input
    const imgSrc = this.el.nativeElement.src || this.appImageLoad;
    
    if (!imgSrc) {
      console.error('No image source provided to appImageLoad directive');
      return;
    }
    
    // Load the actual image
    const img = new Image();
    
    img.onload = () => {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'transparent');
    };
    
    img.onerror = () => {
      if (this.fallbackSrc) {
        this.renderer.setAttribute(this.el.nativeElement, 'src', this.fallbackSrc);
        this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
        this.renderer.setStyle(this.el.nativeElement, 'background-color', 'transparent');
      }
    };
    
    // Start loading the image
    img.src = imgSrc;
  }
}
