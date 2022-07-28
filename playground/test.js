const fs =require('fs')
const obj = {
    name:'Pranay',
    age:'twenty two'
}

const objJSON = JSON.stringify(obj)
fs.writeFileSync('file1.json',objJSON)

const buffer = fs.readFileSync('file1.json')
const data = buffer.toString()
const data1 = JSON.parse(data)

console.log(buffer)
console.log(data)
console.log(data1)