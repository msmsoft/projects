(function() {
    angular.module('app')
        .directive('ecTimeline', function ($compile, componentServiceUtils) {
            return {
                restrict: 'E',
                scope: {
                    collection: '<',
                    done: '=',
                    data: '<'
                },
                link: function (scope, element, attrs) {
                    var defaultOptions = {
                        'id': '',
                        'extraClass': ''
                    };
                    var extendOptions = null;
                    if (attrs.data) {
                        extendOptions = componentServiceUtils.objectConverter(attrs.data);
                    }
                    var options = angular.extend(defaultOptions, extendOptions);

                    //Function shows
                    function findWithAttr (array, attr, value) {
                        for (var i = 0; i < array.length; i += 1) {
                            if (array[i][attr] === value) {
                                return i;
                            }
                        }
                        return -1;
                    }

                    if (scope.collection) {
                        scope.indexObj = findWithAttr(scope.collection, 'name', scope.done) + 1;
                    } else {
                        console.error('EC-TIMELINE: Set collection Value!');
                    }

                    var html = '';
                    html += '<div id="timeline" class="hidden-print">';
                    html += ' <ol class="timeline">';
                    html += '   <li class="timeline__step" ng-repeat="item in collection track by $index" ng-class="{\'done\': $index < indexObj}">';
                    html += '     <input class="timeline__step-radio" type="radio">';
                    html += '     <span class="timeline__step-title" ng-bind="item.name"></span> <i class="timeline__step-marker" ng-bind="item.title"></i>';
                    html += '   </li>';
                    html += ' </ol>';
                    html += '</div>';
                    html = angular.element(html);
                    var e = $compile(html)(scope);
                    element.replaceWith(e);
                    scope.$watch('done', function() {
                        scope.indexObj = findWithAttr(scope.collection, 'name', scope.done) + 1;
                    });
                }
            };
        });
})();