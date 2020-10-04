const faunadb = require("faunadb") /* Import faunaDB sdk */

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
  /* configure faunaDB Client with our secret */
  const q = faunadb.query
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_BOOTSTRAP_KEY,
  })
  
  return client
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("allScores"))),
        q.Lambda(
          "s",
          q.Let(
            {
              score: q.Get(q.Var("s")),
              time: q.Select(["data", "time"], q.Var("score")),
              difficulty: q.Select(["data", "difficulty"], q.Var("score")),
              username: q.Select(
                ["data", "username"],
                q.Get(q.Select(["data", "user"], q.Var("score")))
              ),
            },
            {
              score: q.Var("score"),
              time: q.Var("time"),
              difficulty: q.Var("difficulty"),
              username: q.Var("username"),
            }
          )
        )
      )
    )
    .then(response => {
      console.log("[GET_ALL_SCORES - Success]", response)
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
      })
      /* Success! return the response with statusCode 200 */
    })
    .catch(error => {
      console.log("[GET_ALL_SCORES - Error]", error)
      /* Error! return the error with statusCode 400 */
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      })
    })
}
