Ext.define('raxademo1.store.Contacts', {
    extend: 'Ext.data.Store',

    config: {
        model: 'raxademo1.model.Location',
        autoLoad: true,
        sorters: 'location',
        grouper: {
            groupFn: function(record) {
                return record.get('links')[0];
            }
        },
        proxy: {
            type: 'ajax',
            url: '/openmrs-standalone/ws/rest/v1/location'
        }
    }
});

