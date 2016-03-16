Meteor.scopedMethods( 'account', {

  updateState: ( params: any ): any => {
    console.log( params );
    Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.accountState': params.state } } );
  }
} );
