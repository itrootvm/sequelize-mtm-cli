import { TemplateData, TemplateTypes } from '../types';
/**
 * Renders the template with given data and writes it to specified path.
 * @param templateName {TemplateTypes} Type of template.
 * @param data {TemplateData} Template data.
 * @param migrationsPath {string} Path to write the file.
 */
declare const renderTemplate: (templateName: TemplateTypes, data: TemplateData, migrationsPath: string) => Promise<void>;
export default renderTemplate;
