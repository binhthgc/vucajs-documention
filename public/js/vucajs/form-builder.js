/**!
 * By Binhth
 */
(function () {

	function extend(a, b) {
		for (var key in b) {
			if (b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}
		return a;
	}

	var FormBuilder = window.FormBuilder = function (options) {
		// Config
		extend(this.options, options);

		// Init function
		this._init();
	};

	FormBuilder.prototype = {
		options: {
			el: "default",
			groupId: "default",
			className: "default",
			classPK: "default",
			dataPK: "default",
			data: {},
			schema: {},
			options: {},
			template: "default",
			bindings: "default",
			postRender: function(control) {}
		},

		view: {
			"parent": "bootstrap-edit",
			"layout": {
				"template": "default",
				"bindings": {}
			},
			"fields": {}
		},

		_init: function () {
			// Init function
			this._initLoadingMark();

			var optionsData = this.options.options;

			//builder schema
			var schemaBuilder = {};

			for (var key in optionsData) {

				var detailOption = optionsData[key];

				var fieldBuilder = {
					
					"type": "object",
					"required": false

				};

				if (optionsData.hasOwnProperty(key) && detailOption.hasOwnProperty("required")) {

					$.extend( true, fieldBuilder, { "required": detailOption["required"] } );

				}
				
				if (optionsData.hasOwnProperty(key) && detailOption.hasOwnProperty("name")) {
					
					schemaBuilder[key] = fieldBuilder;

				}
				
			}

			this.options.schema = schemaBuilder;

			//builder data
			var dataBuilder = this.options.data;

			this.options.data = dataBuilder;

			//builder postrender

			var postRenderBuilder = this.options.postRender;

			console.log(JSON.stringify(this.options.postRender));

		},

		_inputForm: function () {
			// generator input form
			var inputView = this.view;

			if ( this.options.template === "default" ) {
				delete inputView["layout"]; 
			}

			var alpacaForm = {};

			$.extend( alpacaForm, { "data" : this.options.data } );
			$.extend( alpacaForm, { "schema" : { "type": "object", "properties": this.options.schema } } );
			$.extend( alpacaForm, { "options" : { "fields": this.options.options } } );
			$.extend( alpacaForm, { "view" : inputView } );
			$.extend( alpacaForm, { "postRender" : this.options.postRender } );
			
			$("#" + this.options.el).alpaca(alpacaForm);

			var dldld = this.options.el;

			check(dldld);
			
		},

		_viewForm: function () {
			// generator input form
			var inputView = this.view;
			
			if (this.options.template === "default") {
				$.extend(inputView, { "parent": "bootstrap-display", "layout": {} });
			}

		},

		_initLoadingMark: function () {
			//add loading 
			$("#" + this.options.el).parent().append('<div class="text-center circle-loader-wrap"><div class="circle-loader"></div></div>');

		}

	};

}());

var check = function(el){
	
	var controlBJS = $("#" + el).alpaca("get");
	
    if(controlBJS != null){

		console.log("Form generator done!");
		$("#" + el).parent().children(".circle-loader-wrap").remove();
		
    }
    else {
		setTimeout(function() {
			check(el)
		}, 500);
    }
}