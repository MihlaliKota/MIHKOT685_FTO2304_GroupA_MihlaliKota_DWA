// Variables for DOM elements
const dom = {
  list: {
    button: document.querySelector("[data-list-button]"),
    message: document.querySelector("[data-list-message]"),
    overlay: document.querySelector("[data-list-active]"),
    items: document.querySelector("[data-list-items]"),
    image: document.querySelector("[data-list-image]"),
    title: document.querySelector("[data-list-title]"),
    subtitle: document.querySelector("[data-list-subtitle]"),
    description: document.querySelector("[data-list-description]"),
    close: document.querySelector("[data-list-close]"),
  },

  search: {
    button: document.querySelector("[data-header-search]"),
    overlay: document.querySelector("[data-search-overlay]"),
    cancel: document.querySelector("[data-search-cancel]"),
    form: document.querySelector("[data-search-form]"),
    authors: document.querySelector("[data-search-authors]"),
    genres: document.querySelector("[data-search-genres]"),
    title: document.querySelector("[data-search-title]"),
  },

  settings: {
    button: document.querySelector("[data-header-settings]"),
    overlay: document.querySelector("[data-settings-overlay]"),
    cancel: document.querySelector("[data-settings-cancel]"),
    form: document.querySelector("[data-settings-form]"),
    theme: document.querySelector("[data-settings-theme]"),
  },
};
