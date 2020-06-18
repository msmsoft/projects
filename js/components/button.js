(function () {
    'use strict';
    angular
        .module('app')
        .directive('ecButton', function (componentServiceUtils, $window) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    data: '@',
                    clickEvent: '&',
                    link: '<'
                },
                template: function (element, attrs) {
                    var defaultOptions = {
                        'name': 'button',
                        'type': 'button',
                        'class': 'btn btn-style-02 btn-1e',
                        'extraClass': '',
                        'disabled': false,
                        'icon': false,
                        'showLabel': true
                    };
                    var extendOptions = componentServiceUtils.objectConverter(attrs.data);
                    var options = angular.extend(defaultOptions, extendOptions);
                    var html = '';
                    html += '<button ';
                    html += ' class="' + options.class + ' ' + options.extraClass + '"';
                    html += ' type="' + options.type + '" ';
                    html += '>';
                    if (options.icon) {
                        html += '<i class="' + options.icon + '"></i>&nbsp;';
                    }
                    if (options.showLabel) {
                        html += options.name;
                    }
                    html += '</button>';
                    return html;
                },
                link: function (scope, element, attrs) {
                    element.bind('click', function (element) {
                        if (scope.clickEvent) {
                            scope.clickEvent.apply();
                            scope.$apply();
                        }
                        if (scope.link) {
                            $window.location.href = scope.link;
                            scope.$apply();
                        }
                    });
                }
            };
        });
})();