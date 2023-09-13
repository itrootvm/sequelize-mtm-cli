#!/usr/bin/env node

import {Command} from 'commander';
import {name, version, description} from '../../package.json';
import {MainArgs} from '../types';
import main from '..';
import consola from 'consola';

/**
 * Initialize and configure the CLI program with default options.
 */
function setupCLIProgram(): Command {
  const program = new Command();

  program
    .name(name)
    .description(description)
    .version(version)
    .option(
      '-s, --sequelize-path <path>',
      'Path for init sequelize, models and associations',
      './models/index.js'
    )
    .option(
      '-m, --migrations-path <path>',
      'Folder to save the generated migrations',
      './migrations'
    );

  return program;
}

/**
 * Handle the successful execution of the main function.
 */
function onSuccess(): void {
  consola.success('Done!');
}

/**
 * Handle errors that occur during the execution of the main function.
 * @param error {Error} - The error that occurred.
 */
function onError(error: Error): void {
  consola.error(new Error(`Error: ${error.message}`));
  throw error;
}

const program = setupCLIProgram();
program.parse();

const options: MainArgs = program.opts();

main(options).then(onSuccess).catch(onError);
