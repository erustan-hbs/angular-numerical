'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]).
  filter('numerical', function() {
    return function(input, config) {

        //precision can be in the config object or default parameter
        //value for the numerical filter.
        var precision = -1;
        if (!isNaN(config)) {
            precision = config;
        } else if (typeof(config) !== 'undefined' &&
                   typeof(config.precision) !== 'undefined') {
            precision = config.precision;
        }

        //clean the configuration parameters.
        var number = parseFloat(input),
            suffix = '',
            parens = (typeof(config) === 'undefined' ||
                      typeof(config.parens) === 'undefined')
                            ? false : true,
            abbreviate = (typeof(config) === 'undefined' ||
                          typeof(config.abbreviate) === 'undefined')
                            ? false : true,
            prefix = (typeof(config) === 'undefined' ||
                      typeof(config.prefix) === 'undefined')
                            ? '' : config.prefix;

            //color = (typeof(config) === 'undefined' ||
            //            typeof(config.color) === 'undefined')
            //                ? '' : config.color;

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
        if (precision !== -1) {
            number = number.toFixed(precision);
        }

        //convert to text to string for decorating.
        var dollars = number.toString().substring(0, number.toString().indexOf('.'));
        var cents = number.toString().substring(number.toString().indexOf('.'));
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

        //add coloring.
        //if (color.length > 0) {
        //    returnNumber = "<span style='color: ||a||;'>" + returnNumber + "</span>";
        //    returnNumber = returnNumber.replace('||a||', color);
        //}

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