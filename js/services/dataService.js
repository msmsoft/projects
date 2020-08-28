(function() {
  'use strict';
  angular
    .module('app')
    .service('dataService',  dataService);
  function dataService() {
    var vm = this;
    vm.navigation = [{
      name: 'Resume',
      link: '/'
    },{
      name: 'Components',
      link: '#!/components'
    },{
      name: 'T-Shirt',
      link: '/t-shirt'
    },{
      name: 'Reference',
      link: '/refs'
    },{
      name: 'CV (docx)',
      link: '/downloads/mikhail_malakhvei_front-end.docx'
    }];
  };
})();