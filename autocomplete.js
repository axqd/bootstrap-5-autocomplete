class AutoComplete {
  static DEFAULTS = Object.freeze({
    minNumOfCharsToMatch: 3,
    maxNumOfItems: 5,
    highLightTyped: true,
    highLightClass: 'text-primary',
  });

  constructor(field, options) {
    this.field = field;
    this.options = Object.assign({}, AutoComplete.DEFAULTS, options);

    field.parentNode.classList.add('dropdown');
    field.setAttribute('data-bs-toggle', 'dropdown');
    field.classList.add('dropdown-toggle');

    this.insertAfter(this.createDropdownMenu(), field);

    this.dropdown = new bootstrap.Dropdown(field);

    field.addEventListener('click', (e) => {
      if (this.createItems() === 0) {
        this.dropdown.hide();
      }
    });

    field.addEventListener('input', (e) => {
      this.render(e);
    });

    field.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) { // Esc
        this.dropdown.hide();
        return;
      }
      if (e.keyCode === 40) { // ArrowDown
        this.dropdown._menu.children[0]?.focus();
        return;
      }
    });
  }

  createDropdownMenu() {
    const div = document.createElement('div');
    div.classList.add('dropdown-menu');
    return div;
  }

  createButton(lookup, item) {
    const btn = document.createElement('button');
    btn.classList.add('dropdown-item');
    btn.setAttribute('data-label', item);

    if (this.options.highLightTyped) {
      const idx = this.removeDiacritics(item).toLowerCase()
          .indexOf(this.removeDiacritics(lookup).toLowerCase());

      const part1 = item.substring(0, idx);
      const part2 = item.substring(idx, idx + lookup.length);
      const part3 = item.substring(idx + lookup.length, item.length);

      btn.innerText = part1;

      if (part2.length > 0) {
        const span = document.createElement('span');
        span.classList.add(this.options.highLightClass);
        span.innerText = part2;

        btn.appendChild(span);
      }

      if (part3.length > 0) {
        btn.appendChild(document.createTextNode(part3));
      }
    } else {
      btn.innerText = item;
    }

    return btn;
  }

  insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
  }

  removeDiacritics(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  render(e) {
    if (this.createItems() > 0) {
      this.dropdown.show();
    } else {
      this.dropdown.hide();
    }
  }

  createItems() {
    const lookup = this.field.value;
    if (lookup.length < this.options.minNumOfCharsToMatch) {
      this.dropdown.hide();
      return 0;
    }

    const items = this.field.nextSibling;
    items.innerHTML = '';

    let count = 0;
    for (let i = 0; i < this.options.data.length; i++) {
      const item = this.options.data[i];
      if (this.removeDiacritics(item).toLowerCase().indexOf(this.removeDiacritics(lookup).toLowerCase()) >= 0) {
        items.appendChild(this.createButton(lookup, item));
        if (this.options.maxNumOfItems > 0 && ++count >= this.options.maxNumOfItems)
          break;
      }
    }

    items.addEventListener('click', (e) => {
      let dataLabel = e.target.getAttribute('data-label');
      if (dataLabel === null) {
        dataLabel = e.target.parentElement.getAttribute('data-label');
      }

      this.field.value = dataLabel;

      if (this.options.onSelectItem) {
        this.options.onSelectItem(dataLabel);
      }

      this.dropdown.hide();
    });

    return items.childNodes.length;
  }
}
