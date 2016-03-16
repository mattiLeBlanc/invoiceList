Meteor.scopedMethods = ( scopeName: string, methodMap: any ): any => {
  var scopeMap = {};

  _.each( methodMap, ( method, name ) => {

    return scopeMap[ scopeName + '.' + name ] = method;
  });
  return Meteor.methods(scopeMap);
};