# Please give credit if you want:)

## Requirements for every code template
```
npm install discord.js@latest
npm install chalk@4.1.0 (Not required but recommended)
v14 eventHandler
```

```js
const { MongoDB } = require("Your MongoDB URL");
const { connect } = require("mongoose");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    connect(MongoDB).then(() => {
      console.log(`Mongoose Connected`);
    });
  },
};
```
