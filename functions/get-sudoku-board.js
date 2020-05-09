const axios = require("axios");

exports.handler = async function(event, context, callback) {
  console.log("queryStringParameters", event.queryStringParameters)
  try {
    const { data } = await axios.get(
      "https://sugoku.herokuapp.com/board?difficulty=easy"
    )
    callback(null, {
      // return null to show no errors
      statusCode: 200,
      body: JSON.stringify(data)
    })
  } catch (err) {
    callback(Error(err))
  }
}
