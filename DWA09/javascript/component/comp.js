import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { createBookPreview } from "./bookPreviews.js";

export class BookList extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.page = 1;
    this.matches = books;

    const bookPreviews = this.matches.map((book) =>
      createBookPreview(authors)(book)
    );

    this.render(bookPreviews);
  }

  render(bookPreviews) {
    const container = document.createElement("div");
    container.setAttribute("data-list-items", "");

    bookPreviews.forEach((previewElement) =>
      container.appendChild(previewElement)
    );

    this.shadowRoot.appendChild(container);
  }
}

customElements.define("book-list", BookList);
