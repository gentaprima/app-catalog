Ext.Loader.setConfig({
    enabled: true,
    // disableCaching: false
});

Ext.Loader.setPath('Ext.ux', 'libs/ext/build/src/ux');
Ext.setGlyphFontFamily('FontAwesome');

Ext.require([
    'Ext.ux.*',
  	// 'exporter',
  	// 'Ext.ux.statusbar.StatusBar',
   	'Ext.util.History',
    // 'Ext.ux.grid.filter.Filter',
    // 'Ext.grid.plugin.Exporter'
    // 'Ext.src.FocusManager'
    // 'Ext.grid.plugin.Exporter',
    // 'Ext.exporter.text.CSV',
    // 'Ext.ux.form.field.Currency'

]);
Ext.apply(Ext.form.VTypes, {
    FileDocument: function(val, field) {
        var fileName = /^.*\.(docx|doc|xls|xlsx|pdf|cdr)$/i;
        return fileName.test(val);
    },
    FileDocumentText: 'File must be in .Doc,.XLS,.XLSX,.PDF,.CDR format',
    FileImages: function(val, field) {
        var fileName = /^.*\.(jpg|jpeg|img|png|gif)$/i;
        return fileName.test(val);
    },
    FileImagesText: 'Image must be in .JPG,.JPEG,.IMG,.PNG,.GIF format',
    FileCleansing: function(val, field) {
        var fileName = /^.*\.(docx|doc|xls|xlsx|pdf|cdr)$/i;
        return fileName.test(val);
    },
    FileCleansingText: 'File must be in .Doc,.XLS,.XLSX,.PDF,.CDR format',
});

// Ext.FocusManager.enable(true);
Ext.define('Ext.ux.plugin.BadgeText', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.badgetext',
    textSize: 10,
    textColor: 'white',
    disableOpacity: 0,
    align: 'left',
    text: '',
    disable: false,
    button: null,
    /**
     *
     * @param button
     */
    init: function (button) {

        var me = this;

        me.button = button;

        button.on('render', me.addBadgeEl, me);

        Ext.apply(button, {

            setBadgeText: function (text) {
                me.disable = typeof me.text == 'undefined'; // || me.text === me.defaultText;
                me.text = text;
                if (button.rendered) {
                    button.badgeEl.update(text.toString ? me.text.toString() : me.text);

                    me.button.badgeEl.setOpacity(Ext.isEmpty(me.text) ? 0 : 1);

                    if (Ext.isStrict && Ext.isIE8) {
                        button.el.repaint();
                    }
                }
                return button;
            },

            getBadgeText: function () {
                return me.text;
            }

        });

    },

    /**
     *
     * @param button
     */
    addBadgeEl: function (button) {
        var me = this,
            styles = {
                'position': 'absolute',
                'background-color': "red",
                'opacity': (Ext.isEmpty(me.text) ? 0 : 1),
                'font-size': me.textSize + 'px',
                'color': me.textColor,
                'padding': '1px 2px',
                'index': 50,
                'top': '-8px',
                'border-radius': '3px',
                'font-weight': 'bold',
                'text-shadow': 'rgba(0, 0, 0, 0.5) 0 -0.08em 0',
                'box-shadow': 'rgba(0, 0, 0, 0.3) 0 0.1em 0.1em',
                'cursor': 'pointer'
            };

        if (me.align == 'left') {
            styles.left = '2px';
        } else {
            styles.right = '2px';
        }

        button.setStyle({
            "overflow": "visible"
        });

        button.badgeEl = Ext.DomHelper.append(button.el, {
            tag: 'div',
            cls: 'badgeText x-unselectable'
        }, true);

        button.badgeEl.setStyle(styles);
        button.badgeEl.update(me.text.toString ? me.text.toString() : me.text);

    },

    /**
     *
     */
    onBadgeClick: function () {
        var me = this;
        me.button.fireEvent('badgeclick', me.button, me.text)
    },

    /**
     *
     * @param disable
     */
    setDisabled: function (disable) {
        var me = this;

        me.button.badgeEl.setStyle({
            'background-color': (disable ? me.disableBg : me.enableBg),
            //'color': (disable ? 'black' : 'white'),
            'opacity': (disable ? me.disableOpacity : 1)
        });

        me.button.badgeEl.clearListeners();
        if (!disable) me.button.badgeEl.on('click', me.onBadgeClick, me, {
            preventDefault: true,
            stopEvent: true
        });

    }
});

Ext.define('Ext.ux.mixin.Badge', {
    extend: 'Ext.Mixin',

    mixinConfig: {
        id: 'badge',
        after: {
            render: 'afterRender'
        }
    },

    afterRender: function() {
        var me = this;
        
        me.badgeText = me.badgeText || '';

        if (!me.el) {
            me.on('render', Ext.pass(me.setBadgeText, [me.badgeText, true], me), me, {
                single: true
            });
            return;
        }

        me.el.addCls('abp-badge');
        me.setBadgeText(me.badgeText, true);

    },

    setBadgeText: function(text, force) {

        var me = this,
            oldBadgeText = me.badgeText,
            el = me.el,
            dom = el && el.dom;

        if (el && dom) {
            if (force || oldBadgeText !== text) {
                me.badgeText = text;

                dom.setAttribute('data-abp-badge', me.badgeText || '');

                if (Ext.isEmpty(me.badgeText)) {
                    el.addCls('hide-badge');
                } else {
                    el.removeCls('hide-badge');
                }

                me.fireEvent('badgetextchange', me, oldBadgeText, text);
            } else {
                console.log('Badge text is already set to ', text);
            }
        } else {
            console.warn('Unable to set badge without valid el and dom references');
        }

    },

    getBadgeText: function() {
        return me.badgeText;
    }
});

Ext.define('Ext.ux.form.trigger.Clear', {
    extend: 'Ext.form.trigger.Trigger',
    alias: 'trigger.clear',

    cls: Ext.baseCSSPrefix + 'form-clear-trigger',

    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * @cfg {Boolean} Hides the clear trigger when the field is empty (has no value)
     *      (default: true).
     */
    hideWhenEmpty: true,

    /**
     * @cfg {Boolean} Hides the clear trigger until the mouse hovers over the field
     *      (default: false).
     */
    hideWhenMouseOut: false,

    /**
     * @cfg {Boolean} Clears the textfield/combobox when the escape (ESC) key is pressed
     */
    clearOnEscape: false,

    destroy: function() {
        this.clearListeners();
        this.callParent();
    },

    initEvents: function() {
        this.updateTriggerVisibility();

        this.callParent();

        var cmp = this.field;

        if (this.hideWhenEmpty) {
            this.addManagedListener(cmp, 'change', this.updateTriggerVisibility, this);
        }

        if (this.hideWhenMouseOut) {
            var bodyEl = cmp.bodyEl;

            this.addManagedListener(bodyEl, 'mouseover', function() {
                this.mouseover = true;
                this.updateTriggerVisibility();
            }, this);

            this.addManagedListener(bodyEl, 'mouseout', function() {
                this.mouseover = false;
                this.updateTriggerVisibility();
            }, this);
        }

        if (this.clearOnEscape) {
            this.addManagedListener(cmp.inputEl, 'keydown', function(e) {
                if (e.getKey() === Ext.event.Event.ESC) {
                    if (cmp.isExpanded) {
                        return;
                    }
                    this.handler(cmp);
                    e.stopEvent();
                }
            }, this);
        }
    },

    updateTriggerVisibility: function() {
        if (this.isTriggerVisible()) {
            if (!this.isVisible()) {
                this.show();
            }
        }
        else {
            if (this.isVisible()) {
                this.hide();
            }
        }
    },

    handler: function(cmp) {
        if (Ext.isFunction(cmp.clearValue)) {
            cmp.clearValue();
        }
        else {
            cmp.setValue('');
        }
    },

    isTriggerVisible: function() {
        if (!this.field || !this.rendered || this.isDestroyed) {
            return false;
        }

        if (this.hideWhenEmpty && Ext.isEmpty(this.field.getValue())) {
            return false;
        }

        if (this.hideWhenMouseOut && !this.mouseover) {
            return false;
        }

        return true;
    }

});

Ext.define('Ext.override.grid.filters.filter.Base', {
    override: 'Ext.grid.filters.filter.Base',
    createFilter: function(config, key) {
        var me = this,
            filter = me.callParent(arguments),
            type = me.getInitialConfig('type');
        filter.type = type;
        return filter;
    }
});
Ext.define('Ext.override.util.Filter', {
    override: 'Ext.util.Filter',
    getState: function() {
        var me = this,
            state = this.callParent(arguments);
        if (me.type) {
            state.type = me.type;
        }
        return state;
    }
});

Ext.define('Ext.override.util.Filter', {
    override: 'Ext.util.Filter',

    onReconfigure: function(grid, store, columns, oldStore) {
        // var me = this;

        // me.sep = Ext.destroy(me.sep);
        // if (me.menuItems && me.menuItems[grid.id]) {
        //     me.menuItems[grid.id].destroy();
        // }

        // me.callParent(arguments);
    }
});
Ext.define("Ext.override.ThousandSeparatorNumber", {
    override: "Ext.form.field.Number",

    /**
     * @cfg {Boolean} allowThousandSeparator
     * False to disallow thousand separator feature.
     */
    allowThousandSeparator: true,

    /**
     * @private
     */
    toBaseNumber: function (value) {
        var me = this;
        return String(value).replace(new RegExp("[" + Ext.util.Format.thousandSeparator + "]", "g"), '').replace(me.decimalSeparator, '.');
    },

    /**
     * @private
     */
    parseRawValue: function (value) {
        var me = this;
        value = parseFloat(me.toBaseNumber(value));
        return isNaN(value) ? null : value;
    },

    getErrors: function(value) {
        if (!this.allowThousandSeparator)
            return this.callParent(arguments);
        value = arguments.length > 0 ? value : this.processRawValue(this.getRawValue());

        var me = this,
            errors = me.callSuper([value]),
            format = Ext.String.format,
            num;

        if (value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
            return errors;
        }

        value = me.toBaseNumber(value);

        if(isNaN(value)){
            errors.push(format(me.nanText, value));
        }

        num = me.parseValue(value);

        if (me.minValue === 0 && num < 0) {
            errors.push(this.negativeText);
        }
        else if (num < me.minValue) {
            errors.push(format(me.minText, me.minValue));
        }

        if (num > me.maxValue) {
            errors.push(format(me.maxText, me.maxValue));
        }

        return errors;
    },

    rawToValue: function (rawValue) {
        if (!this.allowThousandSeparator)
            return this.callParent(arguments);
        var value = this.fixPrecision(this.parseRawValue(rawValue));
        if (value === null) {
            value = rawValue || null;
        }
        return value;
    },

    valueToRaw: function (value) {
        if (!this.allowThousandSeparator) {
            return this.callParent(arguments);
        }
        var me = this,
            decimalSeparator = me.decimalSeparator,
            format = "0,000";
        if (me.allowDecimals) {
            for (var i = 0; i < me.decimalPrecision; i++) {
                if (i == 0) {
                    format += ".";
                }
                format += "0";
            }
        }
        value = me.parseValue(value);
        value = me.fixPrecision(value);
        value = Ext.isNumber(value) ? value : parseFloat(String(value).replace(decimalSeparator, '.'));
        value = isNaN(value) ? '' : Ext.util.Format.number(value, format);
        return value;
    },

    getSubmitValue: function () {
        if (!this.allowThousandSeparator)
            return this.callParent();
        var me = this,
            value = me.callSuper();

        if (!me.submitLocaleSeparator) {
            value = me.toBaseNumber(value);
        }
        return value;
    },

    setMinValue: function (value) {
        if (!this.allowThousandSeparator)
            return this.callParent(arguments);
        var me = this,
            ariaDom = me.ariaEl.dom,
            minValue, allowed, ariaDom;

        me.minValue = minValue = Ext.Number.from(value, Number.NEGATIVE_INFINITY);
        me.toggleSpinners();

        // May not be rendered yet
        if (ariaDom) {
            if (minValue > Number.NEGATIVE_INFINITY) {
                ariaDom.setAttribute('aria-valuemin', minValue);
            }
            else {
                ariaDom.removeAttribute('aria-valuemin');
            }
        }

        // Build regexes for masking and stripping based on the configured options
        if (me.disableKeyFilter !== true) {
            allowed = me.baseChars + '';

            if (me.allowExponential) {
                allowed += me.decimalSeparator + 'e+-';
            }
            else {
                allowed += Ext.util.Format.thousandSeparator;
                if (me.allowDecimals) {
                    allowed += me.decimalSeparator;
                }
                if (me.minValue < 0) {
                    allowed += '-';
                }
            }

            allowed = Ext.String.escapeRegex(allowed);
            me.maskRe = new RegExp('[' + allowed + ']');
            if (me.autoStripChars) {
                me.stripCharsRe = new RegExp('[^' + allowed + ']', 'gi');
            }
        }
    }
});
Ext.define('Ext.overrides.ProxyStore', {
    override: 'Ext.data.ProxyStore',
    onSorterEndUpdate: function() {
        var me = this,
            sorters;
        // If we're in the middle of grouping, it will take care of loading
        sorters = me.getSorters(false);
        if (me.settingGroups || !sorters) {
            return;
        }
        sorters = sorters.getRange();
        // Only load or sort if there are sorters
        if (sorters.length) {
            //FIX: make sure autoLoad setting is respected
            if (me.getRemoteSort() && (me.getAutoLoad() || me.isLoaded())) {
                me.load({
                    callback: function() {
                        me.fireEvent('sort', me, sorters);
                    }
                });
            } else if (!me.getRemoteSort()) {
                me.fireEvent('datachanged', me);
                me.fireEvent('refresh', me);
                me.fireEvent('sort', me, sorters);
            }
        } else {
            // Sort event must fire when sorters collection is updated to empty.
            me.fireEvent('sort', me, sorters);
        }
    },
    onFilterEndUpdate: function() {
        var me = this,
            suppressNext = me.suppressNextFilter;
        if (me.getRemoteFilter()) {
            //<debug>
            me.getFilters().each(function(filter) {
                if (filter.getInitialConfig().filterFn) {
                    Ext.raise('Unable to use a filtering function in conjunction with remote filtering.');
                }
            });
            //</debug>
            me.currentPage = 1;
            //FIX: make sure autoLoad setting is respected
            if (!suppressNext && (me.getAutoLoad() || me.isLoaded())) {
                me.load();
            }
        } else if (!suppressNext) {
            me.fireEvent('datachanged', me);
            me.fireEvent('refresh', me);
        }
        if (me.trackStateChanges) {
            // We just mutated the filter collection so let's save stateful filters from this point forward.
            me.saveStatefulFilters = true;
        }
        // This is not affected by suppressEvent.
        me.fireEvent('filterchange', me, me.getFilters().getRange());
    }
});
/*Ext.define('Ext.patch.data.AbstractStore', {
    override: 'Ext.data.AbstractStore',

    // Skip first load caused by filters initialization if autoLoad=false and Store has never been loaded
    onFilterEndUpdate: function () {
        var me = this,
            mustSkipLoad = !me.getAutoLoad() && !me.isLoaded(),
            originalSuppressNext = me.suppressNextFilter;

        if (mustSkipLoad) {
            me.suppressNextFilter = true;
            me.callParent(arguments);
            me.suppressNextFilter = originalSuppressNext;
        } else {
            me.callParent(arguments);
        }
    },
    onGroupEndUpdate: function () {
        var me = this,
            mustSkipLoad = !me.getAutoLoad() && !me.isLoaded(),
            originalSuppressNext = me.suppressNextFilter;

        if (mustSkipLoad) {
            me.suppressNextFilter = true;
            me.callParent(arguments);
            me.suppressNextFilter = originalSuppressNext;
        } else {
            me.callParent(arguments);
        }
    }
});*/
/*Ext.define('Ext.override.grid.filters.Filters', {
    override: 'Ext.grid.filters.Filters',

    onReconfigure: function(grid, store, columns, oldStore) {
        var me = this,
            filterMenuItem = this.filterMenuItem,
            changed = oldStore !== store,
            key;
            console.log('Dodol'+store);
        // The Filters item's menu should have already been destroyed by the time we get here but
        // we still need to null out the menu reference.
        if (columns) {
            for (key in filterMenuItem) {
                filterMenuItem[key].setMenu(null);
            }
        }
        if (store) {
            if (oldStore && !oldStore.destroyed && changed) {
                me.resetFilters(oldStore);
            }
            if (changed) {
                me.bindStore(store);
                console.log(store);
                //me.applyFilters(store); //bug introduced in 6.0.2 that triggers an unwanted store load
            }
        }
        me.initColumns();
    }
});*/

Ext.application({
    name: 'APP',
    controllers: [
        'ApplicationController',
        'SecurityController',
    ],
    store:[
    
    ],
    requires: [
        'Ext.util.Point',
        'Ext.util.History',
        'APP.domain.Proxy'
    ],

    launch: function(){
        // "this" = Ext.app.Application
        var me = this;
        var reloadIcon = false;
        var iconStore = Ext.create('Ext.data.JsonStore',{
            proxy: {
                type: 'ajax',
                url: '/Icons',
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'total'
                }
            },
            root: 'data',
            fields: [
                {name:'id'},
                {name:'title'},
                {name:'clsname'},
                {name:'icon'}
            ],
            remoteSort: true,
            sorters: [
                {
                    property : 'rowid',
                    direction: 'ASC'
                },
            ],
            listeners: {
                load: function(store) {
                    var iconcss ;
                    iconStore.each(function(r,i){
                            var row = r.data;
                            iconcss +=" ";
                            iconcss += Ext.String.format('.{0} { background-image: url(images/icon/{1}) !important; }',row.clsname,row.icon);
                        }
                    );
                    if (reloadIcon)
                        Ext.util.CSS.removeStyleSheet('iconcss');
                    Ext.util.CSS.createStyleSheet(iconcss, 'iconcss');
                    reloadIcon = false;
                }
            }

        });

        iconStore.load({params:{start: 0, limit:1000}});

        Ext.globalEvents.fireEvent( 'beforeviewportrender' );

    }
});

function convert(v){
    v = parseFloat(v);
    v = isNaN(v)? 0.00 : v;
    //alert(v);
    v = (Math.round((v-0)*100))/100;
    v = (v == Math.floor(v)) ? v + ".00" : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
    v = String(v);
    var ps = v.split('.'),
        whole = ps[0],
        sub = ps[1] ? '.'+ ps[1] : '.00',
        r = /(\d+)(\d{3})/;
    while (r.test(whole)) {
        whole = whole.replace(r, '$1' + ',' + '$2');
    }
    v = whole + sub;
    if(v.charAt(0) == '-'){
        return '-' + v.substr(1);
    }
    return v;
}

function getDecimal(v){

    return v.replace('.',',');
}

function CurrencyFormatted(amount) {
    var i = parseFloat(amount);
    if(isNaN(i)) { i = 0.00; }
    var minus = '';
    if(i < 0) { minus = '-'; }
    i = Math.abs(i);
    i = parseInt((i + .005) * 100);
    i = i / 100;
    s = new String(i);
    if(s.indexOf('.') < 0) { s += '.'; }
    if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
    s = minus + s;
    return s;
}
function CommaFormatted(amount){
    var delimiter = ","; // replace comma if desired
    var a = amount.split('.',2)
    var d = a[1];
    var i = parseInt(a[0]);
    if(isNaN(i)) { return ''; }
    var minus = '';
    if(i < 0) { minus = '-'; }
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while(n.length > 3)
    {
        var nn = n.substr(n.length-3);
        a.unshift(nn);
        n = n.substr(0,n.length-3);
    }
    if(n.length > 0) { a.unshift(n); }
    n = a.join(delimiter);
    if(d.length < 1) { amount = n; }
    else { amount = n + '.' + d; }
    amount = minus + amount;

    return amount;

}
/*======== end of Format Pecahan ========*/
/*Menghilangkan Koma*/
function removeCommas(str) {
    return str.replace(/,/g, "");
}
/*==== end of remove koma ====*/

function focus_uang(field){
    pot = field.value;
    field.value= removeCommas(pot);
}

function blur_uang(field,flag){
    pot = field.value;

    var result = CurrencyFormatted(pot);
    var temp = CommaFormatted(result);
    if(flag){
        if(temp!=0){
            field.value=temp;
        }else{
            field.value="";
        }
    }else{
        field.value=temp;
    }
}

function getValue(val){

}

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function fastreport (fr3,param,format) {
    var url = 'http://'+window.location.hostname+':8882/result?report='+fr3+'&format='+format+'&'+param ;
    window.open(url,'open_window','menubar, toolbar, location, directories, status, scrollbars, resizable, dependent, width=640, height=480, left=0, top=0')
}

function empty(data)
{
    if(typeof(data) == 'number' || typeof(data) == 'boolean')
    {
        return false;
    }
    if(typeof(data) == 'undefined' || data === null)
    {
        return true;
    }
    if(typeof(data.length) != 'undefined')
    {
        return data.length == 0;
    }
    var count = 0;
    for(var i in data)
    {
        if(data.hasOwnProperty(i))
        {
            count ++;
        }
    }
    return count == 0;
}

function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

function PopUpMsg(title,msg){
    Ext.Msg.show({
        title   : title,
        msg     : msg,
        buttons : Ext.Msg.OK,
        icon :  Ext.MessageBox.INFO,
    });
}

function isEmpty(value) {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null || value =='an empty string';
}
