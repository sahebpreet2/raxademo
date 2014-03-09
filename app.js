/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
	name: 'raxademo1',

    	requires: [
        	'Ext.MessageBox',
		'Ext.Container',
        	'Ext.Button',
        	'Ext.Toolbar',
        	'Ext.TitleBar',
       	 	'Ext.data.JsonP',
        	'Ext.Ajax',
        	'Ext.XTemplate',
		'Ext.navigation.View',
		'Ext.Panel'
    	],

    	views: [
        	'Main'
    	],

    	icon: {
        	'57': 'resources/icons/Icon.png',
        	'72': 'resources/icons/Icon~ipad.png',
        	'114': 'resources/icons/Icon@2x.png',
        	'144': 'resources/icons/Icon~ipad@2x.png'
    	},

    	isIconPrecomposed: true,

    	startupImage: {
        	'320x460': 'resources/startup/320x460.jpg',
        	'640x920': 'resources/startup/640x920.png',
        	'768x1004': 'resources/startup/768x1004.png',
        	'748x1024': 'resources/startup/748x1024.png',
        	'1536x2008': 'resources/startup/1536x2008.png',
        	'1496x2048': 'resources/startup/1496x2048.png'
    	},

    	launch: function() {
		/*var data;
		// Initialize the main view
		
		var mainView = Ext.create("Ext.Panel", {
			fullscreen: true,
			xtype: 'mainview',
		});*/
		Ext.Viewport.mask();
		/*Ext.Ajax.cors = true;
		Ext.Ajax.useDefaultXhrHeader = false;*/
		Ext.Ajax.request({
			url: "/openmrs-standalone/ws/rest/v1/location",
            		//callbackKey: 'callback',
	    		success: function(result) {
				var data  = Ext.JSON.decode(result.responseText);
                		if (data) {
					/*var tpl = new Ext.XTemplate(						
						'<div>Location: {display}</div>'
					);
					console.log(data);
					console.log(data.results[0].display);
					var navView,button;
					navView = Ext.create('Ext.navigation.View',{});
					for (var i in data.results){
					//	navView = Ext.create('Ext.navigation.View',{});
						button = Ext.create('Ext.Button',{
							html:data.results[i].display
						});
						button.setHtml(data.results[i].display);
						navView.add(button);
						mainView.add(navView);
					}*/
					createui(data);
				}
				else {
					Ext.Msg.alert('Error', 'There was an error retrieving the locations.');
                		}
            		},
            		failure: function(result) {
               	 		Ext.Msg.alert('Error', 'There was an error retrieving the location.');
			}
        	});
		var createui = function(data){
			var button;
			var items = Array();
			for (var i in data.results){
				var location = data.results[i];
				button = {
					xtype: 'button',
					text:location.display,
					ui:'forward',
					url: 'http://'+location.links[0].uri,
					handler: function(){						
						Ext.Viewport.mask();
						console.log("url in handler" + this.url);
						Ext.Ajax.request({
							url: this.url,
							success: function(result) {
								var locationData  = Ext.JSON.decode(result.responseText);
								console.log(locationData.latitude+locationData.longitude);
								mainView.add([{
									xtype: 'map',
									mapOptions: {
										center: new google.maps.LatLng ( locationData.latitude, locationData.longitude ),
										mapTypeId: google.maps.MapTypeId.ROADMAP,
										zoom: 17
									}
								}]);
							},
							failure: function(result) {
			       					Ext.Msg.alert('Error', 'There was an error retrieving the location.');
								console.log(result);
			      				}
						});
						Ext.Viewport.unmask();
					}
 				};
				items.push(button);
			}	
			console.log(items);
			var mainView = Ext.create("Ext.navigation.View", {
				fullscreen: true,
				xtype: 'mainview',
				items: [{
					title:"Available Locations",
					items: items
				}]
			});
		}
		/*var createItems = function(data){
			var items="";	
			for (var i in data.results )*/

		Ext.Viewport.unmask();
    	},
    	makeJsonpRequest: function(url){
		console.log(url);
		url = url + '/ws/rest/v1/location';
		var tpl = this.getLocationTemplate(),
		contentView = this.contentView,
		statusView = this.statusView;
		Ext.Viewport.mask();
		
	//	contentView.setMasked({
      //      xtype: 'loadmask',
        //    message: 'Loading...'
        //});
		Ext.Ajax.cors = true;
		Ext.Ajax.useDefaultXhrHeader = false;
		Ext.Ajax.request({
            url: url,
            callbackKey: 'callback',
	    success: function(result) {
				console.log("result"+result.responseText);
				console.log(result.location);
				var decoded  = Ext.JSON.decode(result.responseText);
				var results = decoded["results"];			
                if (results) {
			//		contentView.setHtml(tpl.apply(locations));
				//	statusView.setTitle('Locations');
                } else {
					Ext.Msg.alert('Error', 'There was an error retrieving the weather.');
                }
			//	contentView.unmask();
            },
            failure: function(result) {
                Ext.Msg.alert('Error', 'There was an error retrieving the location.');
		console.log(result);
              //  contentView.unmask();
            }
        });
		
	},
	
	getLocationTemplate: function() {
        return new Ext.XTemplate([
            '<tpl for=".">',
                '<div class="day">',
                    '<div class="date">{date:date("M d, Y")}</div>',
                    '<div class="icon">',
                        '<tpl for="weatherIconUrl">',
                            '<img src="{value}" />',
                        '</tpl>',
                    '</div>',
                    '<div class="temp">{tempMaxF}&deg;<span class="temp_low">{tempMinF}&deg;</span></div>',
                '</div>',
            '</tpl>'
        ].join(''));
    },


    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
