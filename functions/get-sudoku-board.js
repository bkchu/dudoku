const _ = require("lodash")

exports.handler = async function (event, context, callback) {
  const { difficulty } = event.queryStringParameters
  const difficulties = {
    beginner: 71,
    easy: 62,
    medium: 53,
    hard: 44,
    extreme: 35,
  }
  const hints = difficulties[difficulty]

  try {
    // use sudoku api to generate boards
    const Game = new Sudoku(hints)

    // generates board from API
    const preconvertedBoard = Game.generate().getBoard()

    // returns the solution board
    const solutionBoard = Game.getSolution();

    // convert the board from original API structure into the structure needed by the app
    const board = preconvertedBoard.map(board => board.map(piece => (piece === "" ? 0 : piece)))

    // send it to the front end
    callback(null, {
      // return null to show no errors
      statusCode: 200,
      body: JSON.stringify({
        board,
        solutionBoard
      }),
    })
  } catch (err) {
    callback(Error(err))
  }
}

/**
 * A Sudoku API taken from https://gist.github.com/scriptype/80ff816c6ebd9faefbb3
 * by: https://github.com/scriptype
 */
class Sudoku {
  constructor(hints, limit) {
    this.hints = hints
    this.limit = limit || 100000

    this._logs = {
      raw: [],
      incidents: {
        limitExceeded: 0,
        notValid: 0,
        noNumbers: 0,
      },
    }

    this.success = null

    this.numbers = () =>
      new Array(9)
        .join(" ")
        .split(" ")
        .map((num, i) => i + 1)

    /*
      Will be used in initial map. Each row will be
      consisted of randomly ordered numbers
    */
    this.randomRow = () => {
      var row = []
      var numbers = this.numbers()
      while (row.length < 9) {
        var index = Math.floor(Math.random() * numbers.length)
        row.push(numbers[index])
        numbers.splice(index, 1)
      }

      return row
    }

    /*
      This is the dummy placeholder for the
      final results. Will be overridden through the
      backtracking process, and at the and, this will
      be the real results.
    */
    this.result = new Array(9 * 9)
      .join(" ")
      .split(" ")
      .map(entry => null)

    /*
      Will be used as the nodeTree in the
      process of backtracking. Each cell has 9 alternative
      paths (randomly ordered).
    */
    this.map = new Array(9 * 9)
      .join(" ")
      .split(" ")
      .map(path => this.randomRow())

    /*
      Will be used as history in the backtracking
      process for checking if a candidate number is valid.
    */
    this.stack = []

    return this
  }

  toRows(arr) {
    var row = 0
    var asRows = new Array(9)
      .join(" ")
      .split(" ")
      .map(row => [])

    for (let [index, entry] of arr.entries()) {
      asRows[row].push(entry)

      if (!((index + 1) % 9)) {
        row += 1
      }
    }

    return asRows
  }

  no(path, index, msg) {
    var number = path[path.length - 1]
    this._logs.raw.push(`no: @${index} [${number}] ${msg} ${path} `)
  }

  yes(path, index) {
    this._logs.raw.push(`yes: ${index} ${path}`)
  }

  finalLog() {
    console.groupCollapsed("Raw Logs")
    console.groupCollapsed(this._logs.raw)
    console.groupEnd()
    console.groupEnd()
    console.groupCollapsed("Incidents")
    console.groupCollapsed(this._logs.incidents)
    console.groupEnd()
    console.groupEnd()
  }

  getBoard() {
    return this.toRows(this.substractCells())
  }

  getSolution() {
    return this.toRows(this.result)
  }

  substractCells() {
    var _getNonEmptyIndex = () => {
      var index = Math.floor(Math.random() * _result.length)
      return _result[index] ? index : _getNonEmptyIndex()
    }

    var _result = this.result.filter(() => true)

    while (_result.length - this.hints > _result.filter(n => !n).length) {
      _result[_getNonEmptyIndex()] = ""
    }

    return _result
  }

  validate(map, number, index) {
    var rowIndex = Math.floor(index / 9)
    var colIndex = index % 9

    var row = map.slice(rowIndex * 9, 9 * (rowIndex + 1))

    var col = map.filter((e, i) => i % 9 === colIndex)

    var boxRow = Math.floor(rowIndex / 3)
    var boxCol = Math.floor(colIndex / 3)

    var box = map.filter(
      (e, i) => Math.floor(Math.floor(i / 9) / 3) === boxRow && Math.floor((i % 9) / 3) === boxCol
    )

    return {
      row: {
        first: row.indexOf(number),
        last: row.lastIndexOf(number),
      },
      col: {
        first: col.indexOf(number),
        last: col.lastIndexOf(number),
      },
      box: {
        first: box.indexOf(number),
        last: box.lastIndexOf(number),
      },
    }
  }

  _validate(map, index) {
    if (!map[index].length) {
      return false
    }

    this.stack.splice(index, this.stack.length)

    var path = map[index]
    var number = path[path.length - 1]

    var didFoundNumber = this.validate(this.stack, number, index)

    return (
      didFoundNumber.col.first === -1 &&
      didFoundNumber.row.first === -1 &&
      didFoundNumber.box.first === -1
    )
  }

  _generate(map, index) {
    if (index === 9 * 9) {
      return true
    }

    if (--this.limit < 0) {
      this._logs.incidents.limitExceeded++
      this.no(map[index], index, "limit exceeded")
      return false
    }

    var path = map[index]

    if (!path.length) {
      map[index] = this.numbers()
      map[index - 1].pop()
      this._logs.incidents.noNumbers++
      this.no(path, index, "no numbers in it")
      return false
    }

    var currentNumber = path[path.length - 1]

    var isValid = this._validate(map, index)
    if (!isValid) {
      map[index].pop()
      map[index + 1] = this.numbers()
      this._logs.incidents.notValid++
      this.no(path, index, "is not valid")
      return false
    } else {
      this.stack.push(currentNumber)
    }

    for (let number of path.entries()) {
      if (this._generate(map, index + 1)) {
        this.result[index] = currentNumber
        this.yes(path, index)
        return true
      }
    }

    return false
  }

  generate() {
    if (this._generate(this.map, 0)) {
      this.success = true
    }

    this.finalLog()

    return this
  }
}
