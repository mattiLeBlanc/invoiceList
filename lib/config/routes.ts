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
    , resolve: {

        currentUser: [ '$auth', ( $auth ) => {
          return $auth.requireUser();
        } ]
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
    .state('dashboard.activated',
    {
      url: '/activated'
      , views:
      {
        'content@dashboard':
        {
          templateUrl: 'client/views/dashboard/activated/activated.html'
        }
      }
    })

    .state('login',
    {
      url: '/login'
      , views:
      {
        'app':
        {
          templateUrl: 'client/views/auth/login.html'
        , controller:   'DashboardController'
        , controllerAs: 'vm'
        }
      }
     , resolve: {
       currentUser: () => {return null };
     }
    })

  ;
  $urlRouterProvider.otherwise('/dashboard/open');


}
routerConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$uiViewScrollProvider' ];
this.routerConfig = routerConfig;
