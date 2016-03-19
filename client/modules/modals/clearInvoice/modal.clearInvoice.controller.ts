
class ClearInvoiceController {

  static $inject = [ '$log', '$state', '$scope',  '$reactive', '$auth', 'invoiceData', '$timeout' ];

  private currentStep: number;

  // step 1
  //
  private offer: any         = {};
  private offerDetails: any  = {};
  private invoice: any;

  private processingInvoice: boolean = false;


  constructor( private $log: angular.ILogService, private $state: angular.ui.IStateService, private $scope: any, $reactive: any, private $auth: any, private invoiceData: any, private $timeout: any ) {

    $reactive( this ).attach( $scope );

    this.currentStep = 1;


    this.offer.credit = invoiceData.Total;
    this.offer.debit  = invoiceData.Total*1.15;
    this.offerDetails.lastPaymentDate = moment().add( 12, 'weeks' );


  }


  isStep( step: number ): boolean {

    return this.currentStep === step;
  }

  goToStep( step: number ): void {

    this.currentStep = step;
  }

  goToNextStep(): void {

    var user
    ;

    user                 = Meteor.user();



    if ( this.currentStep === 1 ) {

      this.currentStep = 4;
    }
    // handle terms and conditions
    //
    else if ( this.currentStep === 4 ) {

      // run validator

      this.$scope.$broadcast('show-errors-check-validity', { form: 'frmAcceptTerms' } );
      if ( this.$scope.frmAcceptTerms.$invalid) { return; }

      // set next step
      //
      this.currentStep = 5;
      // but we also want to kick of processing
      //
      this.processingInvoice = true;

      // var that = this;

      this.call( 'invoice.credit', this.invoiceData, ( error, result ) => {

        if ( error ) {

          this.$log.error( error );
        }
        console.log( "done crediting", result, this);


        this.processingInvoice  = false;
        this.success     = true;

        // this.$scope.$apply();
        // this.$scope.$digest();
      } );
    }
  }


  goToActive(): void {

    this.$state.go( 'dashboard.activated', {}, { reload: true } );
  }

}
this.ClearInvoiceController = ClearInvoiceController;
