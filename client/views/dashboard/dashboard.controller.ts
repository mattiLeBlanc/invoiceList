class DashboardController {


  static $inject = [ '$log', '$state',  '$modal', '$scope' , '$reactive' ];

  public  myModal: any;

  private type: string = 'open';
  private search: any;
  private invoiceFilter: any = {

    'AmountDue': { $gt: 0 }
  };
  private sortColumns: any = {};


  constructor( private $log: angular.ILogService, private $state: angular.ui.IStateService, private $modal: any, private $scope: any, $reactive: any ) {


    $reactive( this ).attach( $scope );


    this.autorun( () => {

      // console.log( 'autorun Sort', this.getReactively( 'sortColumns' ) );
      console.log( 'autorun', this.getReactively( 'search' ) );

    });


    this.subscribe( 'invoices', () => [ ],  {
      onReady: function () {

        console.log("Subscription ready", arguments);
        // subscriptionHandle.stop();  // Stopping the subscription, will cause onStop to fire
      },
      onStop: function (error) {
        if (error) {
          console.log('An error happened - ', error);
        } else {
          console.log('The subscription stopped');
        }
      }
    });




    this.helpers( {

      invoices: () => {

        var selector
        ,  invoices
        ,  invoiceIds
        ,  sort
        ,  currentState;

        selector = {};


        // this is purely to make sortColumns reactive
        //
        sort = this.getReactively( 'sortColumns', true );


        return Invoices.find( selector, { sort: sort } );
      }
    } );
  }

  updateSort( sort: any ): void {

    // reset sort because for now we only allow sorting on one column
    //
    this.sortColumns = {};


    this.sortColumns[ sort.column ]     = sort.direction === 'desc' ? -1 : 1;

    console.log(this.sortColumns);

    // digest is necessary to make helper refresh
    //
    try {

      this.$scope.$digest();
    }
    catch(e){}
  }



  setCurrentTab( state: string ): string {

    return this.$state.current.name === state ? 'active' : '';
  }



}

this.DashboardController = DashboardController;
