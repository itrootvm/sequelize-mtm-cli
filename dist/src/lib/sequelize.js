"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeInitializer = void 0;
const consola_1 = require("consola");
const fs_1 = require("fs");
class SequelizeInitializer {
    init(sequelizePath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, fs_1.existsSync)(sequelizePath)) {
                consola_1.default.error(sequelizePath, 'does not exist');
                return Promise.reject('sequelize path not exist');
            }
            const { default: init } = require(sequelizePath.slice(0, -3)); // Remove the extention {.js | ,ts}
            if (!init) {
                consola_1.default.error(sequelizePath, 'does not have a default export');
                return Promise.reject(sequelizePath + ' does not have a default export');
            }
            try {
                console.group('Sequelize init');
                const res = yield init();
                console.groupEnd();
                return res;
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
}
exports.SequelizeInitializer = SequelizeInitializer;
//# sourceMappingURL=sequelize.js.map