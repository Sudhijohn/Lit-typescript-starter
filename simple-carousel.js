var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, queryAssignedElements, state, } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import './slide-button.js';
import { BOOTSTRAP_CHEVRON_RIGHT, BOOTSTRAP_CHEVRON_LEFT } from './constants.js';
let SimpleCarousel = class SimpleCarousel extends LitElement {
    constructor() {
        super(...arguments);
        this.containerHeight = 0;
        this.slideIndex = 0;
    }
    render() {
        const containerStyles = {
            height: `${this.containerHeight}px`,
        };
        return html `
      <slide-button @click=${this.navigateToPrevSlide}
        >${BOOTSTRAP_CHEVRON_LEFT}</slide-button
      >
      <div id="container" style="${styleMap(containerStyles)}">
        <slot></slot>
      </div>
      <slide-button @click=${this.navigateToNextSlide}
        >${BOOTSTRAP_CHEVRON_RIGHT}</slide-button
      >
    `;
    }
    firstUpdated() {
        this.containerHeight = getMaxElHeight(this.slideElements);
        this.initializeSlide();
    }
    updated() {
        this.initializeSlide();
    }
    changeSlide(offset) {
        const slideCount = this.slideElements.length;
        this.slideIndex =
            (slideCount + ((this.slideIndex + offset) % slideCount)) % slideCount;
    }
    navigateToPrevSlide() {
        this.changeSlide(-1);
    }
    navigateToNextSlide() {
        this.changeSlide(1);
    }
    initializeSlide() {
        for (let i = 0; i < this.slideElements.length; i++) {
            if (i === this.slideIndex) {
                showSlide(this.slideElements[i]);
            }
            else {
                hideSlide(this.slideElements[i]);
            }
        }
    }
};
SimpleCarousel.styles = css `
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    #container {
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      margin: 0 18px;
      padding: 1em;
      overflow: hidden;
      position: relative;
      box-shadow: var(--shadow, gray) 0.3em 0.3em 0.4em,
        var(--highlight, white) -0.1em -0.1em 0.2em;
    }

    ::slotted(.slide-hidden) {
      display: none;
    }
    ::slotted(*) {
      position: absolute;
      padding: 1em;
    }
  `;
__decorate([
    state()
], SimpleCarousel.prototype, "containerHeight", void 0);
__decorate([
    property({ type: Number })
], SimpleCarousel.prototype, "slideIndex", void 0);
__decorate([
    queryAssignedElements()
], SimpleCarousel.prototype, "slideElements", void 0);
SimpleCarousel = __decorate([
    customElement('simple-carousel')
], SimpleCarousel);
export { SimpleCarousel };
function getMaxElHeight(els) {
    return Math.max(0, ...els.map((el) => el.getBoundingClientRect().height));
}
function hideSlide(el) {
    el.classList.add('slide-hidden');
}
function showSlide(el) {
    el.classList.remove('slide-hidden');
}
//# sourceMappingURL=simple-carousel.js.map