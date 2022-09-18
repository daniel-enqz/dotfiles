"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// original taken from https://github.com/luca-montaigut/SkeemaParser/blob/main/js/skeemaParser.js
class SkeemaParser {
    constructor(schema, skipTimestamps = true, skipActiveStorage = true) {
        this.parse = () => {
            const allLines = this.schema.split(/\r\n|\n/);
            if (!this.isSchemaDotRbFile(allLines)) {
                console.error('Not a "schema.rb" file');
                return false;
            }
            allLines.forEach((line) => {
                this.processLine(line);
            });
            return this.result;
        };
        this.isSchemaDotRbFile = (allLines) => {
            return Boolean(allLines.find((line) => line.trim().match(/ActiveRecord::Schema/)));
        };
        this.processLine = (line) => {
            this.table ? this.parseTableLine(line) : this.findNewTable(line);
        };
        this.parseTableLine = (line) => {
            if (line.trim().match(/^end$/)) {
                return this.endTable();
            }
            const columnName = this.extractColumnName(line);
            const columnType = this.extractColumnType(line);
            if (columnType === 'index') {
                this.addIndex(columnType, columnName);
            }
            else if ((columnName === 'created_at' && this.skipTimestamps) ||
                (columnName === 'updated_at' && this.skipTimestamps)) {
                return;
            }
            else {
                this.addColumn(columnType, columnName);
            }
        };
        this.findNewTable = (line) => {
            this.table = this.extractTableName(line);
            if (this.table) {
                this.startTable(this.table);
            }
        };
        this.extractTableName = (line) => {
            let tableName;
            if (line.trim().match(/create_table (\S+)/)) {
                tableName = line.split('"')[1];
            }
            if ((tableName === 'active_storage_attachments' && this.skipActiveStorage) ||
                (tableName === 'active_storage_blobs' && this.skipActiveStorage)) {
                return false;
            }
            return tableName;
        };
        this.extractColumnName = (column) => {
            return column.trim().split(' ')[1].split('"')[1];
        };
        this.extractColumnType = (column) => {
            return column.trim().split(' ')[0].split('.')[1];
        };
        this.startTable = (tableName) => {
            this.result[tableName] = {};
        };
        this.endTable = () => {
            this.table = '';
        };
        this.addColumn = (type, name) => {
            this.result[this.table][name] = type;
        };
        this.addIndex = (type, name) => {
            if (!this.result[this.table][type]) {
                this.result[this.table][type] = [];
            }
            this.result[this.table][type].push(name);
        };
        this.schema = schema;
        this.skipTimestamps = skipTimestamps;
        this.skipActiveStorage = skipActiveStorage;
        this.table = '';
        this.result = {};
    }
}
exports.default = SkeemaParser;
// Parser for schema.rb file Rails 5+ (maybe before but untested)
// return {tableName: {columnName: columnType, ... , index: [columnName, ...]} ...}
// Based on : https://github.com/rubysolo/skeema
