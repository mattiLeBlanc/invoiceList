import { Invoices } from '/imports/collections/invoices'

// IMPORTANT NOT TO USE FAT ARROW DUE TO LOSS OF THIS SCOPE. this.userId will become undefined
//

// Meteor.publishComposite( 'invoices', function ( filter: any ) {
//   return {
//     find: function() {

//       filter         = filter || {};
//       filter.userId  = this.userId;


//       return Invoices.find( filter, {
//         fields: {
//           'Total':          1
//         , 'DueDate':        1
//         , 'Date':           1
//         , 'InvoiceNumber':  1
//         , 'LineItems.Description' : 1
//         , 'Contact.Name':   1
//         }
//       } );
//     }
//   }
// } );

Meteor.publish( 'invoices', function () {

  var filter         = {};

  return Invoices.find( filter, {
    fields: {
      'Total':          1
    , 'DueDate':        1
    , 'Date':           1
    // , 'InvoiceNumber':  1
    , 'LineItems.Description' : 1
    // , 'Contact.Name':   1
    }
  } );
} );