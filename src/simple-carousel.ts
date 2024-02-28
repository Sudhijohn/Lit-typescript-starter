import {LitElement, html, css} from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
import './slide-button.js';
import {BOOTSTRAP_CHEVRON_RIGHT, BOOTSTRAP_CHEVRON_LEFT} from './constants.js';

@customElement('simple-carousel')
export class SimpleCarousel extends LitElement {
  static override styles = css`
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

  @state() private containerHeight = 0;
  @property({type: Number})
  slideIndex = 0;

  @queryAssignedElements()
  private readonly slideElements!: HTMLElement[];

  override render() {
    const containerStyles = {
      height: `${this.containerHeight}px`,
    };
    return html`
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

  override firstUpdated() {
    this.containerHeight = getMaxElHeight(this.slideElements);
    this.initializeSlide();
  }

  override updated() {
    this.initializeSlide();
  }

  private changeSlide(offset: number) {
    const slideCount = this.slideElements.length;
    this.slideIndex =
      (slideCount + ((this.slideIndex + offset) % slideCount)) % slideCount;
  }

  private navigateToPrevSlide() {
    this.changeSlide(-1);
  }
  private navigateToNextSlide() {
    this.changeSlide(1);
  }

  private initializeSlide() {
    for (let i = 0; i < this.slideElements.length; i++) {
      if (i === this.slideIndex) {
        showSlide(this.slideElements[i]);
      } else {
        hideSlide(this.slideElements[i]);
      }
    }
  }
}

function getMaxElHeight(els: HTMLElement[]) {
  return Math.max(0, ...els.map((el) => el.getBoundingClientRect().height));
}

function hideSlide(el: HTMLElement) {
  el.classList.add('slide-hidden');
}

function showSlide(el: HTMLElement) {
  el.classList.remove('slide-hidden');
}

declare global {
  interface HTMLElementTagNameMap {
    'simple-carousel': SimpleCarousel;
  }
}
