/**
 * This exporter produces Microsoft Excel 2007 xlsx files for the supplied data. The standard [ISO/IEC 29500-1:2012][1]
 * was used for this implementation.
 *
 * [1]: http://www.iso.org/iso/home/store/catalogue_ics/catalogue_detail_ics.htm?csnumber=61750
 */
Ext.define('Ext.exporter.excel.Xlsx', {
    extend: 'Ext.exporter.Base',
 
    // for backward compatibility 
    alternateClassName: 'Ext.exporter.Excel',
 
    alias: [
        'exporter.excel07',
        'exporter.xlsx',
        // last version of excel supported will get this alias 
        'exporter.excel'
    ],
 
    requires: [
        'Ext.exporter.file.ooxml.Excel'
    ],
 
    config: {
        /**
         * @cfg {Ext.exporter.file.excel.Style} defaultStyle
         *
         * Default style applied to all cells
         */
        defaultStyle: {
            alignment: {
                vertical: 'Top'
            },
            font: {
                fontName: 'Arial',
                family: 'Swiss',
                size: 11,
                color: '#000000'
            }
        },
 
        /**
         * @cfg {Ext.exporter.file.excel.Style} titleStyle
         *
         * Default style applied to the title
         */
        titleStyle: {
            alignment: {
                horizontal: 'Center',
                vertical: 'Center'
            },
            font: {
                fontName: 'Arial',
                family: 'Swiss',
                size: 18,
                color: '#1F497D'
            }
        },
 
        /**
         * @cfg {Ext.exporter.file.excel.Style} groupHeaderStyle
         *
         * Default style applied to the group headers
         */
        groupHeaderStyle: {
            borders: [{
                position: 'Bottom',
                lineStyle: 'Continuous',
                weight: 1,
                color: '#4F81BD'
            }]
        },
 
        /**
         * @cfg {Ext.exporter.file.excel.Style} groupFooterStyle
         *
         * Default style applied to the group footers
         */
        groupFooterStyle: {
            borders: [{
                position: 'Top',
                lineStyle: 'Continuous',
                weight: 1,
                color: '#4F81BD'
            }]
        },
 
        /**
         * @cfg {Ext.exporter.file.excel.Style} tableHeaderStyle
         *
         * Default style applied to the table headers
         */
        tableHeaderStyle: {
            alignment: {
                horizontal: 'Center',
                vertical: 'Center'
            },
            borders: [{
                position: 'Bottom',
                lineStyle: 'Continuous',
                weight: 1,
                color: '#4F81BD'
            }],
            font: {
                fontName: 'Arial',
                family: 'Swiss',
                size: 11,
                color: '#1F497D'
            }
        }
    },
 
    fileName: 'export.xlsx',
    charset: 'ascii',
    mimeType: 'application/zip',
    binary: true,
 
    titleRowHeight: 22.5,
    headerRowHeight: 20.25,
 
    destroy: function () {
        var me = this;
 
        me.excel = me.worksheet = Ext.destroy(me.excel, me.worksheet);
 
        me.callParent();
    },
 
    getContent: function() {
        var me = this,
            config = this.getConfig(),
            data = config.data,
            colMerge, ws;
 
        me.excel = new Ext.exporter.file.ooxml.Excel({
            properties: {
                title: config.title,
                author: config.author
            }
        });
 
        me.worksheet = ws = me.excel.addWorksheet({
            name: config.title
        });
        me.tableHeaderStyleId = me.excel.addCellStyle(config.tableHeaderStyle);
 
        colMerge = data ? data.getColumnCount() : 1;
 
        ws.beginRowRendering();
 
        me.addTitle(config, colMerge);
 
        if(data) {
            ws.renderRows(me.buildHeader());
            ws.renderRows(me.buildRows(data._groups, colMerge, 0));
        }
 
        ws.endRowRendering();
 
        me.columnStylesNormal = me.columnStylesNormalId = me.columnStylesFooter = me.columnStylesFooterId = null;
 
        return me.excel.render();
    },
 
    addTitle: function(config, colMerge){
        if(!Ext.isEmpty(config.title)) {
            // TODO trial file needs update 
            this.worksheet.renderRow({
                height: this.titleRowHeight,
                cells: [{
                    mergeAcross: colMerge - 1,
                    value: config.title,
                    styleId: this.excel.addCellStyle(config.titleStyle)
                }]
            });
        }
    },
 
    buildRows: function (groups, colMerge, level) {
        var me = this,
            showSummary = me._showSummary,
            rows = [],
            g, row, styleH, styleF, cells,
            i, j, k, gLen, sLen, cLen, oneLine,
            text, items, cell, temp;
 
        if (!groups) {
            return rows;
        }
 
        styleH = me.excel.addCellStyle(Ext.applyIf({
            alignment: {
                Indent: level > 0 ? level : 0
            }
        }, me._groupHeaderStyle));
 
        styleF = me.excel.addCellStyle(Ext.applyIf({
            alignment: {
                Indent: level > 0 ? level : 0
            }
        }, me.columnStylesFooter[0]));
 
        gLen = groups.length;
        for (i = 0; i < gLen; i++) {
            g = groups.items[i];
            text = g._text;
 
            // if the group has no subgroups and no rows then show only summaries 
            oneLine = (!g._groups && !g._rows);
 
            if(showSummary !== false && !Ext.isEmpty(text) && !oneLine){
                rows.push({
                    styleId: styleH,
                    cells: [{
                        mergeAcross: colMerge - 1,
                        value: text,
                        styleId: styleH
                    }]
                });
            }
 
            if(g._groups) {
                Ext.Array.insert(rows, rows.length, me.buildRows(g._groups, colMerge, level + 1));
            }
            if(g._rows) {
                items = g._rows.items;
                sLen = items.length;
                for(k = 0; k < sLen; k++){
                    temp = items[k];
                    row = {
                        id: temp._id,
                        cells: []
                    };
                    cells = temp._cells;
                    cLen = cells.length;
                    for(j = 0; j < cLen; j++){
                        cell = cells.items[j];
                        row.cells.push({
                            id: cell._id,
                            value: cell._value,
                            styleId: this.columnStylesNormalId[j]
                        });
                    }
                    rows.push(row);
                }
            }
 
            items = g._summaries && g._summaries.items;
            if( items && (showSummary || oneLine) ){
                sLen = items.length;
                for(k = 0; k < sLen; k++){
                    // that's the summary footer 
                    temp = items[k];
                    row = {
                        id: temp._id,
                        cells: []
                    };
                    cells = temp._cells;
                    cLen = cells.length;
                    for (j = 0; j < cLen; j++) {
                        cell = cells.items[j];
                        row.cells.push({
                            id: cell._id,
                            value: cell._value,
                            styleId: ( oneLine ? me.columnStylesNormalId[j] : (j === 0 ? styleF : me.columnStylesFooterId[j]) )
                        });
                    }
                    rows.push(row);
                }
            }
            g.destroy();
 
        }
 
        return rows;
    },
 
    buildHeader: function () {
        var me = this,
            ret = {},
            data = me.getData(),
            rows = [],
            keys, row, i, j, len, lenCells, style, arr, fStyle, col, colCfg, cell;
 
        me.buildHeaderRows(data.getColumns(), ret);
 
        keys = Ext.Object.getKeys(ret);
        len = keys.length;
 
        for(i = 0; i < len; i++){
            row = {
                height: me.headerRowHeight,
                styleId: me.tableHeaderStyleId,
                cells: []
            };
 
            arr = ret[keys[i]];
            lenCells = arr.length;
 
            for(j = 0; j < lenCells; j++){
                cell = arr[j];
                cell.styleId = me.tableHeaderStyleId;
                row.cells.push(cell);
            }
            rows.push(row);
        }
 
        arr = data.getBottomColumns();
        lenCells = arr.length;
        me.columnStylesNormal = [];
        me.columnStylesNormalId = [];
        me.columnStylesFooter = [];
        me.columnStylesFooterId = [];
        fStyle = me.getGroupFooterStyle();
 
        for(j = 0; j < lenCells; j++){
            col = arr[j];
            colCfg = {
                style: col.getStyle(),
                width: col.getWidth()
            };
 
 
            style = Ext.applyIf({parentId: 0}, fStyle);
            style = Ext.merge(style, colCfg.style);
            me.columnStylesFooter.push(style);
            me.columnStylesFooterId.push(me.excel.addCellStyle(style));
 
            style = Ext.applyIf({parentId: 0}, colCfg.style);
            me.columnStylesNormal.push(style);
            colCfg.styleId = me.excel.addCellStyle(style);
            me.columnStylesNormalId.push(colCfg.styleId);
 
            colCfg.min = colCfg.max = j + 1;
            colCfg.style = null;
            if(colCfg.width){
                colCfg.width = colCfg.width / 10;
            }
 
            me.worksheet.addColumn(colCfg);
        }
 
        return rows;
    },
 
    buildHeaderRows: function (columns, result) {
        var col, cols, i, len, name;
 
        if (!columns) {
            return;
        }
 
        len = columns.length;
        for (i = 0; i < len; i++) {
            col = columns.items[i].getConfig();
            col.value = col.text;
            cols = col.columns;
            delete(col.columns);
            delete(col.table);
 
            name = 's' + col.level;
            result[name] = result[name] || [];
            result[name].push(col);
 
            this.buildHeaderRows(cols, result);
        }
    }
 
 
});