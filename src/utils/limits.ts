// If no limit is specified, the default limit is 30

// Ergast F1 API - the maximum number of results returned by a query
export const MAX_LIMIT = 1000;
// There may be reserve drivers
export const CURRENT_DRIVER_LIMIT = 5;

const SECONDS_IN_DAY = 60 * 60 * 24;

/*
If a page is kept open which fetches data
How often should the query be revalidated
*/ 
export const REVALDATION_PERIOD = SECONDS_IN_DAY;




