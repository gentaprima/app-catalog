/**
 * This is the base class for an exporter. This class is supposed to be extended to allow
 * data export to various formats.
 *
 * The purpose is to have more exporters that can take the same {@link #data data set} and export it to different
 * formats.
 *
 * Exporters are used by {@link Ext.grid.plugin.Exporter grid Exporter plugin} and {@link Ext.pivot.plugin.Exporter pivot Exporter plugin}
 * but could also be used individually when needed.
 *
 */
Ext.define('Ext.exporter.Base', {
    mixins: [
        'Ext.mixin.Factoryable'
    ],
 
    alias:  'exporter.base',
 
    requires: [
        'Ext.exporter.File'
    ],
 
    config: {
        /**
         * @cfg {Object} data (required)
         *
         * Data to be consumed by the exporter should look like this:
         *
         *      {
         *          columns: [{
         *              text: 'First column'
         *          },{
         *              text: 'Second column',
         *              columns: [{ // columns is optional
         *                  text: '2nd column 1'
         *              },{
         *                  text: '2nd column 2'
         *              }]
         *          }],
         *
         *          groups: [{
         *              // if the first level group is missing then the exported document will
         *              // only contain column headers and no data
         *
         *              text: '1st level group', // text is optional; hidden when missing.
         *              rows: [
         *                  [1.23, 4.65, 3.23],
         *                  [10.23, 7.45, 7.93]
         *              ],
         *              summary: [11.46, 14.10, 11.16] // summary is optional; hidden when missing.
         *
         *              groups: [{ // groups is optional; hidden when missing;
         *                  text: '2nd level group',
         *                  rows: [...],
         *                  summary: [...],
         *
         *                  groups: [...]
         *              }]
         *          }]
         *      }
         *
         */
        data:           null,
        /**
         * @cfg {Boolean} [showSummary=true]
         *
         * Should group summaries be shown? The data this exporter can consume
         * may contain group summaries.
         */
        showSummary:    true,
        /**
         * @cfg {String} [title=""]
         *
         * Title displayed above the table. Hidden when empty
         */
        title:          '',
        /**
         * @cfg {String} [author="Sencha"]
         *
         * The author that generated the file.
         */
        author:         'Sencha',
 
        /**
         * @cfg {String} [fileName="export.txt"]
         *
         * Name of the saved file
         */
        fileName:       'export.txt',
 
        /**
         * @cfg {String} [charset="UTF-8"]
         *
         * File's charset
         */
        charset:        'UTF-8'
    },
 
    constructor: function(config){
        this.initConfig(config || {});
        return this.callParent(arguments);
    },
 
    /**
     * Generates the file content.
     */
    getContent: Ext.identityFn,
 
    /**
     * Save the file on user's machine using the content generated by this exporter.
     */
    saveAs: function(){
        Ext.exporter.File.saveAs(this.getContent(), this.getFileName(), this.getCharset());
    },
 
    /**
     * Returns the number of columns available in the provided `columns` array.
     * It will parse the whole tree structure to count the bottom level columns too.
     *
     * @param columns
     * @returns {Number}
     */
    getColumnCount: function(columns){
        var s = 0;
 
        if (!columns) {
            return s;
        }
 
        for (var i = 0; i < columns.length; i++) {
            if (!columns[i].columns) {
                s += 1;
            } else {
                s += this.getColumnCount(columns[i].columns);
            }
        }
 
        return s;
    },
 
    applyData: function(data){
        if(Ext.isObject(data)) {
            data.columns = data.columns || [];
            this.fixColumns(data.columns, this.getColDepth(data.columns, -1));
        }else{
            data = {};
        }
 
        data.groups = data.groups || [];
        return data;
    },
 
    getColDepth: function(columns, level){
        var m = 0;
 
        if (!columns) {
            return level;
        }
 
        for (var i = 0; i < columns.length; i++) {
            columns[i].level = level + 1;
            m = Math.max(m, this.getColDepth(columns[i].columns, level + 1));
        }
 
        return m;
    },
 
    fixColumns: function (columns, depth) {
        var col;
 
        if (!columns) {
            return;
        }
 
        for (var i = 0; i < columns.length; i++) {
            col = columns[i];
            if (!col.columns && depth > col.level) {
                col.columns = [];
                col.columns.push({
                    text: '',
                    level: col.level + 1
                });
            }
            this.fixColumns(col.columns, depth);
        }
    }
 
 
});