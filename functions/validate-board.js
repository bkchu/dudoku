const axios = require("axios")

exports.handler = async function (event, context, callback) {
  const encodeBoard = board =>
    board != null &&
    board.length != 0 &&
    board.reduce(
      (result, row, i) =>
        result +
        `%5B${encodeURIComponent(row)}%5D${
          i === board.length - 1 ? "" : "%2C"
        }`,
      ""
    )

  const encodeParams = params =>
    Object.keys(params)
      .map(key => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
      .join("&")

  try {
    const boardToValidate = JSON.parse(event.body);
    console.log(boardToValidate)
    const encodedBoard = encodeParams(boardToValidate);

    const { data } = await axios.post(
      "https://sugoku.herokuapp.com/validate",
      encodedBoard
    )
    console.log(data)
    callback(null, {
      // return null to show no errors
      statusCode: 200,
      body: JSON.stringify(data),
    })
  } catch (err) {
    callback(Error(err))
  }
}
