# Sequelize Migration Generator Helper

supports `createTable`, `removeTable`, `addColumn`, `modifyColumn`, `removeColumn` migrations.

## Installation

Using npm:

```bash
npm i sequelize-mtm-cli --save-dev
```

## Getting started

- **Create sequelize init script**

  create a file that exports a function that return a promise with the updated sequelize object.

  ```js
  // ./models/init.js
  const {Sequelize} = require('sequelize');

  module.exports = async () => {
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: './db.sqlite',
    });

    await sequelize.authenticate();

    return sequelize;
  };
  ```

- **Use sequelize-mtm-cli cli**

  add `make:migration` script to your `package.json`

  ```json
  {
    ...
    "scripts": {
      ...
      "make:migrations": "sequelize-mtm-cli -s ./models/init.js -m ./db/migrations",
      "run:migrations": "sequelize-cli db:migrate"
    }
  }
  ```

  ```bash
  Options:
  -V, --version                 output the version number
  -s, --sequelize-path <path>   Path for init sequelize, models and associations (default: "./models/index.js")
  -m, --migrations-path <path>  Folder to save the generated migrations (default: "./migrations")
  ```

## Typescripts

Currently `sequelize-path` can only handle `js` file. So it recomended to compile your ts files and run the cli after.

example:

```json
{
    ...
    "scripts": {
        ...
        "compile": "tsc",
        "premake:migrations": "npm compile",
        "make:migrations": "sequelize-mtm-cli -s ./dist/db/models/init.js -m ./db/migrations",
        "run:migrations": "sequelize-cli db:migrate"
    }
}
```

OR with a model file provided:

```json
{
    ...
    "scripts": {
        ...
        "compile": "tsc",
        "premake:migrations": "npm compile",
        "make:migrations": "sequelize-mtm-cli -s ./dist/db/models/init.js -m ./db/migrations/model.json",
        "run:migrations": "sequelize-cli db:migrate"
    }
}
```
