'use strict';

angular.module( 'invoiceNow', [
  'angular-meteor'
, 'angular-meteor.auth'
, 'ngAnimate'
, 'ngSanitize'
, 'ui.router'
, 'mgcrea.ngStrap'
, 'anim-in-out'

] )
  .config( routerConfig )
  .config( config )
  .run( runBlock )
  // .constant( 'prospaApi',
  // {

  //   // host:   'http://10.1.1.59:49838/'
  //   host:   'http://40.126.252.117/invoicenow/'
  // } )
  .controller( 'DashboardController', DashboardController )
  .filter( 'dateFormat', DateFormat )
  .directive( 'sortable', sortableFactory() )
  .directive( 'invoiceListItem', invoiceListItemFactory() )
  .controller( 'ClearInvoiceController', ClearInvoiceController )
  // .service( 'apiService', ApiService )
;



function onReady() {

  angular.bootstrap(document, ['invoiceNow'], {
    strictDi: true
  });
}

if ( Meteor.isCordova ) {

  angular.element(document).on('deviceready', onReady);
}
else {

    angular.element(document).ready(onReady);
}
