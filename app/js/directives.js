'use strict';

/* Directives */
angular.module('myApp.directives', []).
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }]).directive('numerical', ['$timeout', function($timeout) {

        var formatNumber = function (scope) {

            //format the model number.
            var number = parseFloat(scope.ngModel);
            var suffix = '';

            //should we abbreviate this value.
            if (scope.abbreviate) {
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
            if (typeof(scope.precision) !== 'undefined') {
                number = number.toFixed(scope.precision);
            }

            //convert to text for decorating.
            var dollars = number.toString().substring(0, number.toString().indexOf('.'));
            var cents = number.toString().substring(number.toString().indexOf('.'));
            dollars = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            var returnNumber = dollars + cents;

            //apply decorations.
            returnNumber = returnNumber + suffix;
            if (scope.parens && number < 0 ) { returnNumber = '(' + returnNumber + ')' };
            returnNumber = scope.prefix + returnNumber;

            //update the view.
            scope.displayValue = returnNumber;

        };

        return {
            restrict: 'E',
            scope: {
                ngModel: '='
            },
            template: '<div style="color:{{color}}; text-align:{{alignment}} ">{{displayValue}}</div>',
            replace: true,
            link: function link(scope, element, attrs, controller) {

                //set my variable values.
                scope.precision = attrs.precision;
                scope.parens = (typeof(attrs.parens) === 'undefined') ? false : true;
                scope.abbreviate = (typeof(attrs.abbreviate) === 'undefined') ? false : true;
                scope.prefix = (typeof(attrs.prefix) === 'undefined') ? '' : attrs.prefix;
                scope.color = (typeof(attrs.color) === 'undefined') ? '#000000' : attrs.color;
                scope.alignment = (typeof(attrs.alignment) === 'undefined') ? 'left' : attrs.alignment;

                //update the view.
                formatNumber(scope);

                //define object watches.
                scope.$watch('ngModel', function (value) {
                    formatNumber(scope);
                });

            }
        }
    }]);

