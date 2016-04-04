export function runBlock( $rootScope: angular.meteor.IRootScopeService, $log: angular.ILogService, $window: angular.IWindowService, $state: angular.ui.IState )
{


  $rootScope.$on('$stateChangeError',  ( event: any, toState: any, toParams: any, fromState: any, fromParams: any, error: any ) => {
     $log.error(error);
     if ( error === 'AUTH_REQUIRED') {

       $state.go( 'login');
     }
   });


  $log.debug('runBlock end');
}
runBlock.$inject = [ '$rootScope', '$log', '$window', '$state' ];
