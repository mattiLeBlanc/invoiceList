function DateFormat(): angular.IFilterService {

    return ( value: string ) => {

      let now: moment.Moment
      ,   date: any;

      now    = moment();
      date   = moment( new Date( value ) );

      if ( date.year() === now.year() ) {

        return date.format( 'MMM D, YYYY' );
      }
      else {

        return date.format( 'MMM D, YYYY' );
      }

    };

}
this.DateFormat = DateFormat;

