#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const package_json_1 = require("../../package.json");
const __1 = require("..");
const consola_1 = require("consola");
/**
 * Initialize and configure the CLI program with default options.
 */
function setupCLIProgram() {
    const program = new commander_1.Command();
    program
        .name(package_json_1.name)
        .description(package_json_1.description)
        .version(package_json_1.version)
        .option('-s, --sequelize-path <path>', 'Path for init sequelize, models and associations', './models/index.js')
        .option('-m, --migrations-path <path>', 'Folder to save the generated migrations', './migrations');
    return program;
}
/**
 * Handle the successful execution of the main function.
 */
function onSuccess() {
    consola_1.default.success('Done!');
}
/**
 * Handle errors that occur during the execution of the main function.
 * @param error {Error} - The error that occurred.
 */
function onError(error) {
    consola_1.default.error(new Error(`Error: ${error.message}`));
    throw error;
}
const program = setupCLIProgram();
program.parse();
const options = program.opts();
(0, __1.default)(options).then(onSuccess).catch(onError);
//# sourceMappingURL=index.js.map