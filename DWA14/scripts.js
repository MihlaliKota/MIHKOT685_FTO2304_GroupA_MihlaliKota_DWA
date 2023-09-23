import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class TallyCountApp extends LitElement {
  // CSS styles for the component
  static styles = css`
    :host {
      /* Define CSS custom properties (variables) for easy theme customization */
      --color-green: #31c48d;
      --color-white: #ffffff;
      --color-dark-grey: #33333d;
      --color-medium-grey: #424250;
      --color-light-grey: #9ca3ae;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100vh;
      margin: 0;
      background: var(--color-medium-grey);
      color: var(--color-white);
      font-family: Roboto, Arial, Helvetica, sans-serif;
      text-align: center;
    }

    /* Header styles */
    .header {
      text-align: center;
    }

    .header__title {
      font-size: 3rem;
      font-weight: 900;
      color: var(--color-light-grey);
    }

    /* Controls styles */
    .controls {
      background: yellow;
    }

    /* Counter styles */
    .counter {
      background: var(--color-dark-grey);
    }

    .counter__value {
      width: 100%;
      height: 15rem;
      text-align: center;
      font-size: 6rem;
      font-weight: 900;
      background: none;
      color: var(--color-white);
      border-width: 0;
      border-bottom: 1px solid var(--color-light-grey);
    }

    .counter__actions {
      display: flex;
    }

    .counter__button {
      background: none;
      width: 50%;
      border-width: 0;
      color: var(--color-white);
      font-size: 3rem;
      height: 10rem;
      border-bottom: 1px solid var(--color-light-grey);
      transition: transform 0.1s;
      transform: translateY(0);
    }

    .counter__button:disabled {
      opacity: 0.2;
    }

    .counter__button:active {
      background: var(--color-medium-grey);
      transform: translateY(2%);
    }

    .counter__button_first {
      border-right: 1px solid var(--color-light-grey);
    }

    /* Footer styles */
    .footer {
      background: var(--color-dark-grey);
      color: var(--color-light-grey);
      padding: 2rem;
      font-size: 0.8rem;
      text-align: center;
    }

    .footer__link {
      color: var(--color-white);
    }
  `;

  static properties = {
    count: { type: Number },
    minCount: { type: Number },
    maxCount: { type: Number },
  };

  constructor() {
    super();
    this.count = 0;
    this.minCount = -5; // Minimum count value
    this.maxCount = 5; // Maximum count value
  }

  updated(changedProperties) {
    // Update text color when the count property changes
    if (changedProperties.has("count")) {
      this.updateTextColor();
    }
  }

  updateTextColor() {
    // Change text color to red when count reaches minimum or maximum
    if (this.count === this.minCount || this.count === this.maxCount) {
      this.style.setProperty("--text-color", "red");
    } else {
      this.style.removeProperty("--text-color");
    }
  }

  increaseCount() {
    // Increase the count if it's less than the maximum
    if (this.count < this.maxCount) {
      this.count++;
    }
  }

  decreaseCount() {
    // Decrease the count if it's greater than the minimum
    if (this.count > this.minCount) {
      this.count--;
    }
  }

  resetCount() {
    // Reset the count to zero
    this.count = 0;
  }

  render() {
    let message = "";

    // Display messages based on the count value
    if (this.count === this.maxCount) {
      message = "Maximum reached!";
    } else if (this.count === this.minCount) {
      message = "Minimum reached!";
    }

    // Render the HTML template
    return html`
      <div class="header">
        <h1 class="header__title">Tally Count App</h1>
      </div>
      <div class="counter">
        <div class="counter__value">${this.count}</div>
        <div class="counter__actions">
          <button
            class="counter__button counter__button_first danger"
            @click="${this.decreaseCount}"
          >
            Decrease
          </button>
          <button
            class="counter__button reset counter__button_first"
            @click="${this.resetCount}"
          >
            Reset
          </button>
          <button
            class="counter__button success"
            @click="${this.increaseCount}"
          >
            Increase
          </button>
        </div>
      </div>
      <div class="footer">
        <p class="footer__link">${message}</p>
      </div>
    `;
  }
}

customElements.define("tally-count", TallyCountApp);
