class DashboardController {


  static $inject = [ '$log', '$state',  '$modal', '$scope' , '$reactive', 'currentUser' ];

  public  myModal: any;

  private type: string = 'open';
  private search: any;
  private accountStateSelect: any;
  private invoiceFilter: any = {

    'AmountDue': { $gt: 0 }
  };
  private sortColumns: any = {};

  private testColumn: any;


  constructor( private $log: angular.ILogService, private $state: angular.ui.IStateService, private $modal: any, private $scope: any, private $reactive: any, private currentUser: any ) {


    $reactive( this ).attach( $scope );

    // console.log( 'currentUser', currentUser );

    // this.autorun( () => {

    //   // console.log( 'autorun Sort', this.getReactively( 'sortColumns' ) );
    //   console.log( 'autorun', this.getReactively( 'search' ) );

    // });


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
        ,  testColumn
        ,  currentState;

        selector = {};


        // this is purely to make sortColumns reactive
        //
        sort = this.getReactively( 'sortColumns', true );
        testColumn = this.getReactively( 'testColumn' );
        console.log( 'testColumn=', testColumn );

        return Invoices.find( selector, { sort: sort } );
      }
    ,
      user: () => {
        return Meteor.users.findOne();
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

  setAccountState(): void {
    console.log(this.accountStateSelect);
    this.call( 'account.updateState', { state: this.accountStateSelect }, ( error, result ) => {
      if ( error ) {
        console.error( error );
      }
      console.log( 'account state updated to ', this.accountStateSelect );
    } );
  }

  whatIsTestColumn(): void {
    console.log("Test column is", this.testColumn );
  }

  setCurrentTab( state: string ): string {

    return this.$state.current.name === state ? 'active' : '';
  }

  login(): void {
    Meteor.loginWithPassword( 'John', 'Welcome123', ( error ) => {
      if ( error ) {
        console.error( error );
      }
      this.$state.go( 'dashboard.open')
      console.log('logged in');
    });
  }


}

this.DashboardController = DashboardController;
