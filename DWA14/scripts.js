import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class TallyCountApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      text-align: center;
    }

    .count {
      font-size: 2rem;
      color: var(--text-color, black);
    }

    .reset-message {
      color: red;
    }

    .buttons {
      display: flex;
      gap: 16px;
      justify-content: center;
    }

    button {
      font-size: 1.2rem;
      padding: 8px 16px;
      margin: 8px;
    }

    .danger {
      background-color: red;
      color: white;
    }

    .success {
      background-color: green;
      color: white;
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
    this.minCount = -5;
    this.maxCount = 15;
  }

  updated(changedProperties) {
    if (changedProperties.has("count")) {
      this.updateTextColor();
    }
  }

  updateTextColor() {
    if (this.count === this.minCount || this.count === this.maxCount) {
      this.style.setProperty("--text-color", "red");
    } else {
      this.style.removeProperty("--text-color");
    }
  }

  increaseCount() {
    if (this.count < this.maxCount) {
      this.count++;
    }
  }

  decreaseCount() {
    if (this.count > this.minCount) {
      this.count--;
    }
  }

  resetCount() {
    this.count = 0;
  }

  render() {
    let message = "";

    if (this.count === this.maxCount) {
      message = "Maximum reached!";
    } else if (this.count === this.minCount) {
      message = "Minimum reached!";
    }

    return html`
      <h1>Tally Count App</h1>
      <div class="count">${this.count}</div>
      <p class="reset-message">${message}</p>
      <div class="buttons">
        <button class="danger" @click="${this.decreaseCount}">Decrease</button>
        <button @click="${this.resetCount}">Reset</button>
        <button class="success" @click="${this.increaseCount}">Increase</button>
      </div>
    `;
  }
}

customElements.define("tally-count-app", TallyCountApp);
