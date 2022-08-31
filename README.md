## Testing some weird mongoose issues

### Silently ignoring queries

I will look deeper into why this happens, but take a look at the index.ts here, we create a repo, then try to find a repo with a query that should return none. And yet, mongoose happily returns the first record it finds. Looking at the debug message it seems our query was completely ignored, and it now finds any record.

Cause: the use of `alias` in the schema makes the query transformer fail with no errors. Removing the alias and working with actual field names will solve this issue and the try-catch will correctly result in a catch error.
