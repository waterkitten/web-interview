function test(person) {
  person.age = 26
  person = {
    name: 'yyy',
    age: 30
  }
  return person
}
const p1 = {
  name: 'yck',
  age: 25
}
const p2 = test(p1)
console.log(p1) // -> ? 
console.log(p2) // -> ?