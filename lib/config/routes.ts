function routerConfig( $stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider, $locationProvider: angular.ILocationProvider, $uiViewScrollProvider: angular.ui.IUiViewScrollProvider )
{

  // static $inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$uiViewScrollProvider' ];

  $locationProvider.html5Mode( true );

  $stateProvider



    .state('dashboard',
    {
      url: '/dashboard'
    , abstract: true
    , views:
      {
        'app':
        {
            templateUrl: 'client/views/dashboard/dashboard.html'
          , controller:   'DashboardController'
          , controllerAs: 'vm'
        }

      }
    } )
    .state('dashboard.open',
    {
      url: '/open'
      , views:
      {
        'content@dashboard':
        {
          templateUrl: 'client/views/dashboard/open/open.html'
          // , controller:   'GetStartedController'
          // , controllerAs: 'vm'
        }
      }
    })

  ;
  $urlRouterProvider.otherwise('/dashboard/open');


}
routerConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$uiViewScrollProvider' ];
this.routerConfig = routerConfig;
