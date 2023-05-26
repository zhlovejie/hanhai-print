let str = '19905134546'
const myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/

console.log(str.length)

console.log(myreg.test(str))