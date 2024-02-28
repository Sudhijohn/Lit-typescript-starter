import { LitElement } from 'lit';
import './slide-button.js';
export declare class SimpleCarousel extends LitElement {
    static styles: import("lit").CSSResult;
    private containerHeight;
    slideIndex: number;
    private readonly slideElements;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    updated(): void;
    private changeSlide;
    private navigateToPrevSlide;
    private navigateToNextSlide;
    private initializeSlide;
}
declare global {
    interface HTMLElementTagNameMap {
        'simple-carousel': SimpleCarousel;
    }
}
//# sourceMappingURL=simple-carousel.d.ts.map