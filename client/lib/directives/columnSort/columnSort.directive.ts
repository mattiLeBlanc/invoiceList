// interface IFieldMatch extends angular.INgModelController {
//   fieldMatch: string;
// }
// interface IForm extends angular.IFormController {

// }

class SortabletDirective implements angular.IDirective {

  public restrict = 'A';
  // public require = ['ngModel', '^form'];
  // public scope         = {
  //   handler:  '&'
  // };
  public scope = false;
  private localScope: any;
  private currentSortedColumn: any;


  constructor( private $templateRequest: any ) {

  }

  public link = (
    scope:       angular.IScope,
    element:     angular.IAugmentedJQuery,
    attr:        any,
    ctrlArr:     any,
    transclude:  angular.ITranscludeFunction ) => {

      this.localScope = scope;
      this.init( element, scope );

  };

  public init = ( element: any, scope: any ) => {

    this.$templateRequest( 'client/lib/directives/columnSort/columnSort.column.html' ).then( ( html ) => {

      var template
      ,   columns
      ;
      // Convert the html to an actual DOM node
      //
      template = angular.element(html);
      columns  = element[0].querySelectorAll( '[sort-by]' );

      angular.forEach( columns, ( el ) => {

        var wrapper
        ,  $label
        ,  $sort
        ,  $el
        ;

        $el      = angular.element( el );
        wrapper  = angular.copy( template );
        $label   = angular.element( wrapper[0].querySelector( '.columnLabel' ) );
        $sort    = angular.element( wrapper[0].querySelector( '.sort' ) );

        // hide the sorting chevron initially
        //
        $sort.toggleClass( 'hide' );
        $label.text( $el.text() );

        // wrapper.on( 'click', { currentSortedColumn: this.currentSortedColumn }, this.doSort );
        wrapper.on( 'click', ( e ) => {

          this.doSort( e.currentTarget );


        });

        // copy over the attribte to the new wrapper
        //
        angular.forEach( el.attributes, ( val, key ) => {

          wrapper.attr( val.name, val.value );
        } );

        // if there is a preset direction on one of the columsn, do the sort
        //
        if ( $el.attr( 'direction' ) ) {

          $sort.toggleClass( 'hide' );
          this.localScope.$parent.vm.updateSort( {

            column:     $el.attr( 'sort-by')
          , direction:  $el.attr( 'direction' )
          } );
          this.currentSortedColumn = wrapper[0];
        }



        $el.replaceWith( wrapper );
      } );
    });

  };

  public doSort = ( target ) => {

    var $el
    ,   $sort
    ,   direction
    ;

    $el     = angular.element( target );
    $sort   = angular.element( $el[0].querySelector( '.sort' ) );
    $sort.toggleClass( 'hide' );


    direction = $el.attr( 'direction') || 'asc';


    if ( this.currentSortedColumn ) {


      if (  this.currentSortedColumn === target ) {

         direction = direction === 'desc' ? 'asc' : 'desc';
      }
      // new sort column: remove direction from previous column
      //
      else {
        angular.element( this.currentSortedColumn ).removeAttr( 'direction' );
      }
    }
    angular.element( this.currentSortedColumn.querySelector( '.sort' ) ).toggleClass( 'hide' );

    // set direction on new column
    $el.attr( 'direction', direction );
    this.currentSortedColumn = target;

    this.localScope.$parent.vm.updateSort( {
      column: $el.attr( 'sort-by')
    , direction: direction
    } );
  }
}

function sortableFactory() : angular.IDirectiveFactory {

  var directive = ( $templateRequest: any ) => new SortabletDirective( $templateRequest );

  directive.$inject = ['$templateRequest'];
  return directive;
}

this.sortableFactory = sortableFactory;