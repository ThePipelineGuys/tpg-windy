let args = process.argv.slice(2)
if (args.length != 1)
  process.exit(1)
let fileName = args[0]

let data = require(fileName)

let output = Object.entries(data)
              .map(flagify)
              .flat()
              .join(' ')
console.log(output)

function flagify(flag) {
  if (flag[0] == "entry")
    return flag[1]

  switch (typeof(flag[1])) {
    case "boolean":
      return `--${flag[0]}`
    case "object":
      return Array.isArray(flag[1])
        ? flag[1].map((el)=>flagify([flag[0], el]))
        : Object.entries(flag[1]).map((el)=>flagify([`${flag[0]}:${el[0]}`, el[1]]))
    default:
      return `--${flag[0]}=${flag[1]}`;
  }
}
