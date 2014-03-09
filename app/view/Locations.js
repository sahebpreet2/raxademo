Ext.define('raxademo1.view.Locations', {
    extend: 'Ext.List',
    xtype: 'locations',

    config: {
        title: 'Locations',
        cls: 'x-locations',
        variableHeights: true,

        store: 'Locations',
        itemTpl: [
            '<div class="headshot"></div>',
            '{location} {uri}'
        ].join('')
    }
});
