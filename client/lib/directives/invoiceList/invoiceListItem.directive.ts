interface IMyScope extends angular.IScope {

  profileReady: any;
}

class Ctrl {

  static $inject = [ '$log', '$state', '$modal', '$scope' ];

  public myModal: any;

  public dateDifference: string;


  constructor( private $log: angular.ILogService, private $state: angular.ui.IStateService, private $modal: any, private $scope: any ) {

    this.dateDifference = moment( this.$scope.invoiceData.DueDate ).diff( moment( this.$scope.invoiceData.Date ), 'days' )
  }


}


class InvoiceListItemDirective implements angular.IDirective {

  public restrict      = 'E';
  public templateUrl   = 'client/lib/directives/invoiceList/invoiceListItem.html';
  public replace       = true;
  public controller    = Ctrl;
  public controllerAs  = 'vm';

  public scope         = {
    invoiceData:   '=data'
  , type:          '=type'
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

function invoiceListItemFactory(): angular.IDirectiveFactory {

  var directive = () => new InvoiceListItemDirective();
  return directive;
}
this.invoiceListItemFactory = invoiceListItemFactory;
