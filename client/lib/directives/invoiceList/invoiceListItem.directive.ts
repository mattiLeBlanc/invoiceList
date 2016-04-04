interface IMyScope extends angular.IScope {

  profileReady: any;
}

class Ctrl {

  static $inject = [ '$log', '$state', '$modal', '$scope' ];

  public myModal: any;

  public dateDifference: string;
  private type: string;
  private inactive: boolean;
  private invoice: any;
  private accountState: string;
  private handler: any;


  constructor( private $log: angular.ILogService, private $state: angular.ui.IStateService, private $modal: any, private $scope: any) {

    this.type           = $state.current.name === 'dashboard.open' ? 'open' : 'activated';
    this.type           = $state.current.name === 'invoiceHistory' ? 'archived' : this.type;
    this.dateDifference = moment( this.$scope.invoice.DueDate ).diff( moment( this.$scope.invoice.Date ), 'days' )

    // this.invoice        = $scope.invoice;           // not nesessary with bindToController
    // this.accountState   = this.$scope.accountState; // not nesessary with bindToController


    // set the invoice specific variables
    //
    if ( this.accountState === 'updateProfile' ) {

      this.inactive = true;
      this.handler  = this.updateProfile;
    }
    if ( this.accountState === 'creditPending' ) {

      this.inactive = true;
      this.handler  = this.creditPending;
    }
    if ( this.accountState === 'creditApproved' ) {

      this.inactive = false;
      this.handler  = this.clearInvoice;
    }


  }

  handle(): void {

    console.log( 'handle invoice ');

    if ( this.handler && angular.isFunction( this.handler ) ) {
      this.handler();
    }
  }

  updateProfile(): void  {

    this.myModal = this.$modal({ scope: this.$scope,  templateUrl: 'client/modules/modals/updateProfile/modal.updateProfile.html', show: false, placement: 'center'  });
    this.myModal.$promise.then(this.myModal.show);
  }

  creditPending(): void {

   this.myModal = this.$modal({ scope: this.$scope,  templateUrl: 'client/modules/modals/creditPending/modal.creditPending.html', show: false, placement: 'center'  });
   this.myModal.$promise.then(this.myModal.show);
  }

  clearInvoice(): void  {

    this.myModal = this.$modal( {

      scope:           this.$scope
    , templateUrl:     'client/modules/modals/clearInvoice/modal.clearInvoice.html'
    , show:            false
    , placement:       'center'
    , controller:      'ClearInvoiceController'
    , controllerAs:    'invoiceModel'
    , locals: {
        invoiceData:   this.invoice
      }

    } );
    this.myModal.$promise.then(this.myModal.show);
  }



  goToProfile(): void {
    this.$state.go( 'private.profile.information' );
    this.myModal.$promise.then(this.myModal.hide);

  }

  // isInactive(): boolean {
  //   var accountStates: Array<string> = [ 'updateProfile', 'creditPending', '' ];
  //         if ( _.includes( states, toState.name ) ) {

  //   return this.accountState
  // }

}


class InvoiceListItemDirective implements angular.IDirective {

  public restrict      = 'E';
  public templateUrl   = 'client/lib/directives/invoiceList/invoiceListItem.html';
  public replace       = true;
  public controller    = Ctrl;
  public controllerAs  = 'invoiceItem';

  public bindToController = {
  // public scope = {
    accountState:  '=accountState'
  , invoice:   '=data'
  };

  // public require = ['ngModel', '^form'];
  // public link: (scope: any, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) => void;

  // constructor() {}

  public link = (
    scope:       IMyScope,
    element:     angular.IAugmentedJQuery,
    attr:        any,
    ctrlArr:     any,
    transclude:  angular.ITranscludeFunction ) => {

  };
}

export function invoiceListItemFactory(): angular.IDirectiveFactory {

  var directive = () => new InvoiceListItemDirective();
  return directive;
}
