import { books, authors } from "./data.js";

/**
 * Factory function for creating book preview elements.
 * @param {Object} authors - The authors object.
 * @returns {Function} A function that creates book preview elements.
 */
export function createBookPreview(authors) {
  return function (book) {
    const { id, image, title } = book;

    const previewElement = document.createElement("button");
    previewElement.classList.add("preview");
    previewElement.setAttribute("data-preview", id);

    const imageElement = document.createElement("img");
    imageElement.classList.add("preview__image");
    imageElement.src = image;

    const infoElement = document.createElement("div");
    infoElement.classList.add("preview__info");

    const titleElement = document.createElement("h3");
    titleElement.classList.add("preview__title");
    titleElement.textContent = title;

    const authorElement = document.createElement("div");
    authorElement.classList.add("preview__author");
    authorElement.textContent = authors[book.author];

    infoElement.appendChild(titleElement);
    infoElement.appendChild(authorElement);

    previewElement.appendChild(imageElement);
    previewElement.appendChild(infoElement);

    return previewElement;
  };
}

const bookPreview = createBookPreview(authors);

const bookList = books;

const bookPreviews = bookList.map((book) => {
  return bookPreview(book);
});