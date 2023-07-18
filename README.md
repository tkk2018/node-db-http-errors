# DB HTTP errors

Convert `DBError` to HTTP status code. This follow the suggestion [here](https://vincit.github.io/objection.js/recipes/error-handling.html#) but use __403__ instead of __409__ for consistency reason. This behavious can be changed by setting `use409` to `true`.
