if ( Invoices.find({}).fetch().length === 0 ) {

  var file, data;
  file = Assets.getText("invoices.json");
  data = JSON.parse( file );

  data.forEach( ( val) => {

    Invoices.insert( val );

  } );
}

if ( Meteor.users.find().fetch().length === 0 ) {
  Accounts.createUser(
  {
    email: 'test@test.com'
  , username: 'John'
  , password: 'Welcome123'
  , profile: {
      'firstName': 'John'
    , 'lastName': 'Doe'
    , 'accountState': 'active'
    }
  });
}
