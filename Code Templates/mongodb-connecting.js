Requirements:
```
npm i mongoose
npm i discord.js@v14.3.0
```

const { MongoDB } = require("MongoDB URL");
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
