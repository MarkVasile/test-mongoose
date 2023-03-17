## Testing some weird mongoose issues

`yarn dev` will run the two different tests.

### FIRST TEST: Aliases are only sometimes working

I will look deeper into why this happens, but take a look at the index.ts here, we create a repo, then try to find a repo with a query that should return none. And yet, mongoose happily returns the first record it finds. Looking at the debug message it seems our query was completely ignored, and it now finds any record.

Cause: the use of `alias` in the schema makes the query transformer fail with no errors. Removing the alias and working with actual field names will solve this issue and the try-catch will correctly result in a catch error.

### SECOND TEST: Silently ignoring queries

We're trying to update a record, but we have a field that's not defined in the schema (model).
Mongo native driver will correctly update ZERO records.
Mongoose library will update ALL records (look at the query it spits out in the debug message).

This happens with DELETE too, not just UPDATE.
