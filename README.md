# StarTerminal.js

<img src="preview/icon.png" height="120px">
<small>The current logo</small>
<hr>

## Overview
This is a project that started perhaps 6-9 months ago<br>
The reason why I'm making this is so that users can experience the feeling of being a hacker, or perhaps a Linux guy<br>
Overall, it's a great project<br>
<hr>

# Usage
1. Link the script (depending on your directory) into the `<head>` tag, like this:<br>
```html
<head>
    <script src=".../StarTerminal.js"></script>
</head>
```
<br>

2. Initialize the script inside a separate `<script>` tag:<br>
```html
<script>
    StarTerminal.Init(/* PARENT name */, /* PARENT type */, /* PARENT index */)
    
    // eg: StarTerminal.Init("body", "tag", 0)
</script>
```
<br>

3. You're already done, now you can do some terminal stuff (with limited commands...)

<hr>

# Custom commands

1. On a separate script, create a `.js` file with your preferred name<br>
2. Inside, copy this script:<br>
```javascript
StarTerminal.Util.Execute(/* Command name (when entered, it'll check if this is present or not) */, function(Value, Callback) {
    // Do something here
    Callback()
})
```
<br>

Important to note: Always use `Callback()` at the end of your function, or else your terminal becomes unresponsive

3. And done, you're now making a new command
