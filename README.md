# bootstrap-5-autocomplete

This is a simplified version of https://github.com/gch1p/bootstrap-5-autocomplete

### Example

```js
const data = [
  'hello',
  'world'
];

const ac = new AutoComplete(
  document.getElementById('FIXME'),
  {
    data: data,
    minNumOfCharsToMatch: 3,
    maxNumOfItems: 5,
    highLightTyped: true,
    highLightClass: 'text-primary',
    onSelectItem: (item) => {
      alert(item);
    }
  }
);
```

```html
<script src="js/autocomplete.js"></script>

<div class="input-group input-group-sm">
  <input type="text" class="form-control" placeholder="FIXME" aria-label="FIXME" aria-describedby="FIXME" id="FIXME" autocomplete="off" />
</div>
```

### Options

Options is a JSON object with the following attributes (in alphabetical order):

**data**:  
The data from where autocomplete will lookup items to show.

**highLightClass**:  
The class to use when highlighting typed text on items. Only used when highlightTyped is true. Default is text-primary.

**highLightTyped**:  
Whether to highlight (style) typed text on items. Default is true.

**maxNumOfItems**:  
How many items you want to show when the autocomplete is displayed. Default is 5. Set to 0 to display all available items.

**minNumOfCharsToMatch**:  
The number of characters that need to be typed on the input in order to trigger the autocomplete. Default is 3.

**onSelectItem**:  
A callback that is fired every time an item is selected. It receives the selected item.
    
### License

MIT
