**Issues with Angular Meteor 1.3.6 / 1.3.7**
--------------------------------------------

## Explanation of test app ##

**Installation**
Clone repo into a folder and run the app with 'meteor'.

**First run**
First run will load invoices into MongoDB from a JSON source file in the folder `/private`.

The app will automatically load the state `dashboard/open`. Here you should see a list of invoices.
Please open your Chrome console to see if the subscription loaded correctly if you are not seeing any invoices.

The main files you should look at are:

 - DashboardController, located in `client/views/dashboard/dashboard.controller.ts`
 - Invoices view, located in `client/views/dashboard/open/..`
 - ColumnSort directive, located in `client/lib/directives/columnSort/..`

The Dashboard controller has an `updateSort` function that is being called by the columnSort directive to update the column to sort on.
That is the extend of the scenario: triggering sorts which reloads the list etc.

## Issues ##

1) Reactivity with an object: not autorunning after setting of new value

This still seems to be an issue, unless I am not using it correctly.

The code below has the updateSort function triggered by a directive and provides a value like { column: 'Total', direction: 'desc' }.
This is set in the private variable sortColumns which is being watched (the whole variable).

 this.helpers( {

  invoices: () => {
    var sort;

    // this is purely to make sortColumns reactive
    //
    sort = this.getReactively( 'sortColumns' );
    return Invoices.find( {}}, { sort: sort } );
  }
} );

updateSort( sort: any ): void {

   this.sortColumns[ sort.column ]  = sort.direction === 'desc' ? -1 : 1;
  this.$scope.$digest(); // still necessary to make the reactive update work
 }
Updating the object with another key doesn't trigger the watch on the object itself. Maybe this is because that is not how the watch should work. However with Meteor Blaze ReactiveVar (if I am remembering correctly) it DOES work.

I only get the situation working if I add this.sortColyms = {} to the updateSort function and reset the object on each column order. That works but feels like a hack if the reactivity should work on an object.

The $DIGEST is still necessary. Other wise the Helper will not reRun.

Checking DeepWatch option now on getReactivitly().

**EDIT 8/2/2016 22:40 AEST**

Setting DeepWatch to true does work partially ( don't have to reset the columnSort to {} every time), however without the $DIGEST it doesn't work. $digest call is required to make it work right now.
That looks like a bug, right?

2) Updating controller variable directly from directive not triggering reactive update

Not a bug IMO, because directive makes copy of variable and that copy is not being watched. Using the controller function to update the variable being watched makes sense.

3) Running in a $digest error

Removing $digest is not an option right now, see issue 1.

4) Subscription stop issue

Unfortunately I still see the subscription stopping during Meteor Development rebuild with version 1.3.7.
It seems to happen constantly after code update and Meteor reloads the browser (chrome). I really need to navigate to another state and back to get the subscription to work.

**EDIT 8/2/2016 22:42 AEST**

Event when the dashboard is loading the subscription, a hard reload will actually break the subscription now....Actually the subscriptions seems to stop more often than on version 1.3.6

5) Helper reactive reRun returns empty collection for a instant and then normal collection

This issue is still relevant. The template apparently gets an update before the helper is finished getting the full cursor. It happens when I do multiple sorts in a row and the helper is called a couple of times with every time a new Sort command

**ADDED 17/3/2016**

6) User's account state not updating in template through helper

I have added a selectbox at the top of the page which will update the users account state in Mongo (user.profile.accountState). The current state is printed in the template ( {{vm.user.profile.accountState}} ). However, when you update the value to a new state (check chrome log console to see success), the user helper doesn't rerun even when the subscription DID renew (check Meteor.users.findOne().profile.accountState in your console).
I think the helper should rerun on changes in mongo, right?