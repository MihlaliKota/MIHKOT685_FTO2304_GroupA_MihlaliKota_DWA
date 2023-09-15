import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { dom } from "./dom.js";

let page = 1;
let matches = books;

/**
 * Renders a book preview element.
 * @param {Object} book - The book object.
 * @param {Object} authors - The authors object.
 * @returns {HTMLElement} The created preview element.
 */
function createBookPreview(book, authors) {
  const { author, id, image, title } = book;

  const previewElement = document.createElement("button");
  previewElement.classList.add("preview");
  previewElement.setAttribute("data-preview", id);

  previewElement.innerHTML = `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;

  return previewElement;
}

/**
 * Renders the initial book previews.
 * @param {Array} bookList - The list of books.
 * @param {number} count - The number of books to render.
 * @param {Object} authors - The authors object.
 * @param {string} containerSelector - The selector of the container.
 */
function InitialBookPreviews(bookList, count, authors, container) {
  const startingFragment = document.createDocumentFragment();

  for (const book of bookList.slice(0, count)) {
    const previewElement = createBookPreview(book, authors);
    startingFragment.appendChild(previewElement);
  }

  container.appendChild(startingFragment);
}

// Render initial book previews
InitialBookPreviews(matches, BOOKS_PER_PAGE, authors, dom.list.items);

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
 * @param {string} container - The selector of the container.
 */
function GenreOptions(genres, container) {
  const genreHtml = document.createDocumentFragment();

  // Create "All Genres" option
  const allGenresOption = createGenreOption("any", "All Genres");
  genreHtml.appendChild(allGenresOption);

  // Create options for each genre
  for (const [id, name] of Object.entries(genres)) {
    const genreOption = createGenreOption(id, name);
    genreHtml.appendChild(genreOption);
  }

  container.appendChild(genreHtml);
}

// Render genre options
GenreOptions(genres, dom.search.genres);

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
function AuthorOptions(authors, container) {
  const authorsHtml = document.createDocumentFragment();

  // Create "All Authors" option
  const allAuthorsOption = createAuthorOption("any", "All Authors");
  authorsHtml.appendChild(allAuthorsOption);

  // Create options for each author
  for (const [id, name] of Object.entries(authors)) {
    const authorOption = createAuthorOption(id, name);
    authorsHtml.appendChild(authorOption);
  }

  container.appendChild(authorsHtml);
}

// Render author options
AuthorOptions(authors, dom.search.authors);

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  dom.settings.theme.value = "night";
  document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
  document.documentElement.style.setProperty("--color-light", "10, 10, 20");
} else {
  dom.settings.theme.value = "day";
  document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
  document.documentElement.style.setProperty("--color-light", "255, 255, 255");
}

const listButton = dom.list.button;
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

dom.search.cancel.addEventListener("click", () => {
  dom.search.overlay.open = false;
});

dom.settings.cancel.addEventListener("click", () => {
  dom.settings.overlay.open = false;
});

dom.header.settings.addEventListener("click", () => {
  dom.search.overlay.open = true;
  dom.search.title.focus();
});

dom.header.settings.addEventListener("click", () => {
  dom.settings.overlay.open = true;
});

dom.list.close.addEventListener("click", () => {
  dom.list.overlay.open = false;
});

dom.settings.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);

  if (theme === "night") {
    document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
    document.documentElement.style.setProperty("--color-light", "10, 10, 20");
  } else {
    document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
    document.documentElement.style.setProperty(
      "--color-light",
      "255, 255, 255"
    );
  }

  dom.settings.overlay.open = false;
});

dom.search.form.addEventListener("submit", (event) => {
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
    dom.list.message.classList.add("list__message_show");
  } else {
    dom.list.message.classList.remove("list__message_show");
  }

  dom.list.items.innerHTML = "";
  const newItems = document.createDocumentFragment();

  for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
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

  dom.list.items.appendChild(newItems);
  dom.list.button.disabled = matches.length - page * BOOKS_PER_PAGE < 1;

  dom.list.button.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${
          matches.length - page * BOOKS_PER_PAGE > 0
            ? matches.length - page * BOOKS_PER_PAGE
            : 0
        })</span>
    `;

  window.scrollTo({ top: 0, behavior: "smooth" });
  dom.search.overlay.open = false;
});

dom.list.button.addEventListener("click", () => {
  const fragment = document.createDocumentFragment();

  console.log("Button clicked");
  console.log("Current page:", page);
  console.log("Remaining books:", remainingBooks);

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

  dom.list.items.appendChild(fragment);
  page += 1;

  console.log("New page:", page);
});

dom.list.items.addEventListener("click", (event) => {
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
    dom.list.overlay.open = true;
    dom.list.blur.src = active.image;
    dom.list.image.src = active.image;
    dom.list.title.innerText = active.title;
    dom.list.subtitle.innerText = `${authors[active.author]} (${new Date(
      active.published
    ).getFullYear()})`;
    dom.list.description.innerText = active.description;
  }
});
