"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = __importDefault(require("./db/models"));
const users_router_1 = __importDefault(require("./routes/users.router"));
const tasks_router_1 = __importDefault(require("./routes/tasks.router"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
(0, models_1.default)().then(sequelize => {
    app.set('db', sequelize);
    app.use(body_parser_1.default.json());
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    app.use('/users', users_router_1.default);
    app.use('/tasks', tasks_router_1.default);
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
