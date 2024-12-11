const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const nombre = process.argv[3]
const telefono = process.argv[4]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.5jwdd.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('persona', personSchema)

mongoose.model('persona2', personSchema)

if (nombre && telefono) {
  const persona = new Person({
    name: nombre,
    number: telefono,
  })

  persona.save().then(() => {
    console.log(`added ${nombre} number ${telefono} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    result.forEach(persona => {
      console.log(persona)
    })
    mongoose.connection.close()
  })
}