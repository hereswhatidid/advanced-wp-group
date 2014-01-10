/* globals jQuery, ko, console */
( function( $, ko ) {
	'use strict';
	/**
	 * Binding handler to truncate a string value to a given length
	 * @type {Object}
	 */
	ko.bindingHandlers.shortenText = {
		update: function( element, valueAccessor, allBindings ) {
			var value = valueAccessor(),
				$el = $( element ),
				output = '',
				outputLength = allBindings.get( 'outputLength' ) || 80;


			output = value().substring( 0, outputLength );

			$el.text( output );
		}
	};
	/**
	 * Binding handler to style and control a Bootstrap progress bar element
	 * @type {Object}
	 */
	ko.bindingHandlers.progressBar = {
		init: function(element, valueAccessor, allBindings) {
			var value = valueAccessor(),
			barType = ( allBindings.get( 'barType' ) || '' ),
			$el = $( element );
			$el.addClass( 'progress' );
			if ( barType !== '' ) {
				barType = ' progress-bar-' + barType;
			}
			$el.append( '<div class="progress-bar' + barType + '" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"><span class="sr-only"></span></div>' );
			$el
			.find( '.progress-bar' )
			.attr( 'aria-valuenow', value() )
			.css( {
				'width': value() + '%'
			} );
			$el
			.find( '.sr-only' )
			.text( value() + '% complete' );
		},
		update: function(element, valueAccessor ) {
			var value = valueAccessor(),
				$el = $( element );

			$el
			.find( '.progress-bar' )
			.attr( 'aria-valuenow', value() )
			.css( {
				'width': value() + '%'
			} );
			$el
			.find( '.sr-only' )
			.text( value() + '% complete' );
		}
	};
	/**
	 * Forces an observable to be an integer within a specified range
	 * @param  {observable} target   The targeted observable
	 * @param  {object} intRange Object containing the desired range (min) to (max)
	 * @return {observable}          The observable with the correctly filtered result as it's value
	 */
	ko.extenders.range = function( target, intRange ) {
		//create a writeable computed observable to intercept writes to our observable
		var result = ko.computed({
			read: target,  //always return the original observables value
			write: function( newValue ) {
				var current = target(),
					newValueAsNum = isNaN( newValue ) ? 0 : parseInt( +newValue, 10 ),
					valueToWrite = newValueAsNum;

				console.log( 'Target: ', target.DOMElement );

				if ( newValueAsNum < intRange.min ) {
					valueToWrite = intRange.min;
				}

				if ( newValueAsNum > intRange.max ) {
					valueToWrite = intRange.max;
				}
				//only write if it changed
				if ( valueToWrite !== current ) {
					target(valueToWrite);
				} else {
					//if the tested value is the same, but a different value was written, force a notification for the current field
					if ( newValue !== current ) {
						target.notifySubscribers( valueToWrite );
					}
				}
			}
		}).extend({ notify: 'always' });
	 
		//initialize with current value to make sure it is rounded appropriately
		result( target() );
	 
		//return the new computed observable
		return result;
	};

	function Post( data ) {
		ko.mapping.fromJS( data, {}, this );

		// this.id = ko.observable( ( data.id || '' ) );
		// this.title = ko.observable( ( data.title || '' ) );
		// this.permalink = ko.observable( ( data.permalink || '' ) );
		// this.content = ko.observable( ( data.content || '' ) );
		// this.categories = ko.observableArray( ( data.categories || [] ) );
	}

	function AppViewModel( postData ) {
		var self = this;

		self.posts = ko.observableArray( ko.utils.arrayMap( postData, function( postData ) {
			return new Post( postData );
		}));

		self.sampleInput = ko.observable( 12 ).extend({ range: {
			min: 2,
			max: 28
		} });

		self.sampleInputModify = ko.computed( function() {
			return self.sampleInput() + 20;
		});

		self.firstName = ko.observable( 'Gabe' );
		self.lastName = ko.observable( 'Shackle' );

		self.fullName = ko.computed({
			read: function() {
				return self.firstName() + ' ' + self.lastName();
			},
			write: function( newValue ) {
				var arrName = newValue.split( ' ' );
				self.firstName( arrName[0] );
				self.lastName( arrName[1] );
			}
		});

		self.progressPercent = ko.observable( 55 );
	}

	$( document ).ready( function() {
		$.ajax({
			url: '/?feed=json',
			dataType: 'json',
			success: function( postData ) {
				console.log( 'JSON Data: ', postData );
				ko.applyBindings( new AppViewModel( postData ), document.getElementById( 'viewApp' ) );
			}
		});
	});

})( jQuery, ko );