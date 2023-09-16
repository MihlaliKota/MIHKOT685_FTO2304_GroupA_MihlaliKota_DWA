import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { createBookPreview } from "./bookPreviews.js"

let page = 1;
let matches = books;

const bookPreviews = books.map((book) => createBookPreview(authors)(book));

/**
 * Renders the initial book previews.
 * @param {Array} bookPreviews - The list of book preview elements.
 * @param {string} containerSelector - The selector of the container.
 */
function InitialBookPreviews(bookPreviews, containerSelector) {
  const container = document.querySelector(containerSelector);

  for (const previewElement of bookPreviews) {
    container.appendChild(previewElement);
  }
}

// Render initial book previews
InitialBookPreviews(bookPreviews, "[data-list-items]");

/**
 * Creates and returns a genre option element.
 * @param {string} value - The value attribute.
 * @param {string} text - The text content.
 * @returns {HTMLElement} The created genre option element.
 */
function createGenreOption(value, text) {
  const option = document.createElement("option");
  option.value = value;
  option.innerText = text;
  return option;
}

/**
 * Renders genre options in the specified container.
 * @param {Object} genres - The genres object.
 * @param {string} containerSelector - The selector of the container.
 */
function GenreOptions(genres, containerSelector) {
  const genreHtml = document.createDocumentFragment();

  // Create "All Genres" option
  const allGenresOption = createGenreOption("any", "All Genres");
  genreHtml.appendChild(allGenresOption);

  // Create options for each genre
  for (const [id, name] of Object.entries(genres)) {
    const genreOption = createGenreOption(id, name);
    genreHtml.appendChild(genreOption);
  }

  const container = document.querySelector(containerSelector);
  container.appendChild(genreHtml);
}

// Render genre options
GenreOptions(genres, "[data-search-genres]");

/**
 * Creates and returns an author option element.
 * @param {string} value - The value attribute.
 * @param {string} text - The text content.
 * @returns {HTMLElement} The created author option element.
 */
function createAuthorOption(value, text) {
  const option = document.createElement("option");
  option.value = value;
  option.innerText = text;
  return option;
}

/**
 * Renders author options in the specified container.
 * @param {Object} authors - The authors object.
 * @param {string} containerSelector - The selector of the container.
 */
function AuthorOptions(authors, containerSelector) {
  const authorsHtml = document.createDocumentFragment();

  // Create "All Authors" option
  const allAuthorsOption = createAuthorOption("any", "All Authors");
  authorsHtml.appendChild(allAuthorsOption);

  // Create options for each author
  for (const [id, name] of Object.entries(authors)) {
    const authorOption = createAuthorOption(id, name);
    authorsHtml.appendChild(authorOption);
  }

  const container = document.querySelector(containerSelector);
  container.appendChild(authorsHtml);
}

// Render author options
AuthorOptions(authors, "[data-search-authors]");

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.querySelector("[data-settings-theme]").value = "night";
  document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
  document.documentElement.style.setProperty("--color-light", "10, 10, 20");
} else {
  document.querySelector("[data-settings-theme]").value = "day";
  document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
  document.documentElement.style.setProperty("--color-light", "255, 255, 255");
}

const listButton = document.querySelector("[data-list-button]");
const remainingBooks = matches.length - page * BOOKS_PER_PAGE;

/**
 * Updates the text content and disabled status of the list button.
 * @param {number} remaining - The number of remaining books.
 */
function updateListButton(remaining) {
  listButton.innerText = `Show more (${remaining})`;
  listButton.disabled = remaining > 0;
}

/**
 * Renders the list button's remaining book count.
 * @param {number} remaining - The number of remaining books.
 */
function ListButtonRemaining(remaining) {
  const remainingHtml = `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
    `;
  listButton.innerHTML = remainingHtml;
}

// Update and render list button content
updateListButton(remainingBooks);
ListButtonRemaining(remainingBooks);

document.querySelector("[data-search-cancel]").addEventListener("click", () => {
  document.querySelector("[data-search-overlay]").open = false;
});

document
  .querySelector("[data-settings-cancel]")
  .addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = false;
  });

document.querySelector("[data-header-search]").addEventListener("click", () => {
  document.querySelector("[data-search-overlay]").open = true;
  document.querySelector("[data-search-title]").focus();
});

document
  .querySelector("[data-header-settings]")
  .addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = true;
  });

document.querySelector("[data-list-close]").addEventListener("click", () => {
  document.querySelector("[data-list-active]").open = false;
});

document
  .querySelector("[data-settings-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    if (theme === "night") {
      document.documentElement.style.setProperty(
        "--color-dark",
        "255, 255, 255"
      );
      document.documentElement.style.setProperty("--color-light", "10, 10, 20");
    } else {
      document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
      document.documentElement.style.setProperty(
        "--color-light",
        "255, 255, 255"
      );
    }

    document.querySelector("[data-settings-overlay]").open = false;
  });

document
  .querySelector("[data-search-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

    for (const book of books) {
      let genreMatch = filters.genre === "any";

      for (const singleGenre of book.genres) {
        if (genreMatch) break;
        if (singleGenre === filters.genre) {
          genreMatch = true;
        }
      }

      if (
        (filters.title.trim() === "" ||
          book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
        (filters.author === "any" || book.author === filters.author) &&
        genreMatch
      ) {
        result.push(book);
      }
    }

    page = 1;
    matches = result;

    if (result.length < 1) {
      document
        .querySelector("[data-list-message]")
        .classList.add("list__message_show");
    } else {
      document
        .querySelector("[data-list-message]")
        .classList.remove("list__message_show");
    }

    document.querySelector("[data-list-items]").innerHTML = "";
    const newItems = document.createDocumentFragment();

    for (const { author, id, image, title } of result.slice(
      0,
      BOOKS_PER_PAGE
    )) {
      const element = document.createElement("button");
      element.classList = "preview";
      element.setAttribute("data-preview", id);

      element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;

      newItems.appendChild(element);
    }

    document.querySelector("[data-list-items]").appendChild(newItems);
    document.querySelector("[data-list-button]").disabled =
      matches.length - page * BOOKS_PER_PAGE < 1;

    document.querySelector("[data-list-button]").innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${
          matches.length - page * BOOKS_PER_PAGE > 0
            ? matches.length - page * BOOKS_PER_PAGE
            : 0
        })</span>
    `;

    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector("[data-search-overlay]").open = false;
  });

document.querySelector("[data-list-button]").addEventListener("click", () => {
  const fragment = document.createDocumentFragment();

  for (const { author, id, image, title } of matches.slice(
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE
  )) {
    const element = document.createElement("button");
    element.classList = "preview";
    element.setAttribute("data-preview", id);

    element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;

    fragment.appendChild(element);
  }

  document.querySelector("[data-list-items]").appendChild(fragment);
  page += 1;
});

document
  .querySelector("[data-list-items]")
  .addEventListener("click", (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
      if (active) break;

      if (node?.dataset?.preview) {
        let result = null;

        for (const singleBook of books) {
          if (result) break;
          if (singleBook.id === node?.dataset?.preview) result = singleBook;
        }

        active = result;
      }
    }

    if (active) {
      document.querySelector("[data-list-active]").open = true;
      document.querySelector("[data-list-blur]").src = active.image;
      document.querySelector("[data-list-image]").src = active.image;
      document.querySelector("[data-list-title]").innerText = active.title;
      document.querySelector("[data-list-subtitle]").innerText = `${
        authors[active.author]
      } (${new Date(active.published).getFullYear()})`;
      document.querySelector("[data-list-description]").innerText =
        active.description;
    }
  });
