'use strict';

/* Filters */

angular.module('allston.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]).
  filter('numerical', function() {
    return function(input, config) {

        //set default values to be used if no config object is passed.
        var number = parseFloat(input),
            precision = -1,
            parens = false,
            abbreviate = false,
            prefix = '',
            suffix = '';


        //clean the configuration parameters.
        if (typeof(config) !== 'undefined') {
            //precision can be in the config object or default parameter
            //value for the numerical filter.
            if (!isNaN(config)) {
                precision = config;
            } else if (typeof(config.precision) !== 'undefined') {
                precision = config.precision;
            }
            //just check for existence of these config values.
            if (typeof(config.parens) !== 'undefined') { parens = true; }
            if (typeof(config.abbreviate) !== 'undefined') { abbreviate = true; }
            if (typeof(config.prefix) !== 'undefined') { prefix = config.prefix; }

        }

        //should we abbreviate this value.
        if (abbreviate) {
            if (Math.abs(number) > 1000000000) {
                number = number / 1000000000;
                suffix = ' BN';
            }
            if (Math.abs(number) > 1000000) {
                number = number / 1000000;
                suffix = ' MM';
            }
        }

        //set the precision.
        if (precision > -1) {
            number = number.toFixed(precision);
        }

        //convert to text to string for decorating.
        var dollars = number.toString().substring(0, number.toString().indexOf('.')),
            cents = number.toString().substring(number.toString().indexOf('.'));

        //add commas to the dollars but leave the cents alone.
        dollars = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        var returnNumber = dollars + cents;

        //should we abbreviate large numbers?
        if (suffix.length > 0) { returnNumber = returnNumber + suffix; }

        //should we wrap negative numbers in parenthesis?
        if (parens && number < 0) {
            returnNumber = '(' + returnNumber + ')';
        }

        //add a currency prefix.
        if (prefix.length > 0) { returnNumber = prefix + returnNumber; }

        //return the decorated numerical value.
        return returnNumber;
    };
  }).
  filter('prefix', function() {
    return function(input, prefix) {

        //return the decorated numerical value.
        return prefix + input;
    };
  }).
  filter('parens', function() {
     return function(input) {

         //return the decorated numerical value.
         return (input < 0) ? '(' + input + ')' : input;
     };
  });