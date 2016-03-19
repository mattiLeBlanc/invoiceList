Meteor.scopedMethods( 'invoice', {

  credit: ( params: any ): any => {
    var invoice: any
    ,  activeInvoice: any
    ,  userId: any
    ,  contact: any
    ,  profile: any
    ,  loanAmount: number
    ;

    userId   = Meteor.userId();
    contact  = Meteor.users.findOne( { _id:userId } );
    profile  = contact.profile;

    console.log('sleep', params);
    Meteor._sleepForMs(2000);
    console.log('wake');

    // check if invoice has been activated
    //
    invoice = ActivatedInvoices.findOne( { invoiceId: params._id } )

    if ( invoice ) {

      throw new Meteor.Error( 'activateInvoice', 'Invoice ' + params._id + ' already activated' );
    }

    // Calculate loanAmount (this needs to be based on the credit decision profile )
    //
    loanAmount = params.Total;

    // all well, activate the invoice
    //
    activeInvoice = {
      invoiceId:         params._id
    , invoiceAmount:     params.Total
    , loanAmount:        loanAmount
    , lastPaymentDate:   moment().add( 12, 'weeks' ).toISOString()
    , paymentsLeft:      12
    , userId:            Meteor.userId()
    };

    ActivatedInvoices.insert( activeInvoice );

    // now update the credit level
    //
    // profile.credit.used += loanAmount;
    // Meteor.users.update( { _id: userId }, { $set: { 'profile.credit': profile.credit } } );

    return {
      status:   'OK'
    , message:  'Invoice activated'
    };
  }
,
  debit: ( params: any ): any => {
    var invoice: any
    ,  activeInvoice: any
    ,  userId: any
    ,  contact: any
    ,  profile: any
    ,  loanAmount: number
    ;

    userId   = Meteor.userId();
    contact  = Meteor.users.findOne( { _id:userId } );
    profile  = contact.profile;

    console.log('sleep', params);
    Meteor._sleepForMs(2000);
    console.log('wake');

    // check if invoice has been activated
    //
    invoice = ActivatedInvoices.findOne( { invoiceId: params._id } )
    if ( invoice.repaid ) {

      throw new Meteor.Error( 'activateInvoice', 'Invoice ' + params._id + ' already repaid' );
    }



    let data = {
      $set: {
        repaid:     true
      , repaidOn: moment().add( 12, 'weeks' ).toISOString()
      }
    };

    ActivatedInvoices.update( { invoiceId: params._id }, data );

    // now update the credit level
    //
    // profile.credit.used -= invoice.invoiceAmount;
    // Meteor.users.update( { _id: userId }, { $set: { 'profile.credit': profile.credit } } );


    return {
      status:   'OK'
    , message:  'Invoice repaid'
    };
  }

} );