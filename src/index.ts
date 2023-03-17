import mongoose from 'mongoose'
import Repo from './models/repo.model'

mongoose.set('debug', true)

mongoose.connect(
  'mongodb://127.0.0.1:27017/test-mongoose', 
  { useNewUrlParser: true, useUnifiedTopology: true },
).then(async () => {
  console.info('Connected to MongoDB')
  /* create a repo */
  await Repo.deleteMany({})
  await Repo.create({ origin: 'something', auth: [{ u: new mongoose.Types.ObjectId() }] })
  const origin = 'github.com/test-mongoose'
  const uid = '123456'
  console.log('\nFIRST TEST: Mongoose aliases')
  try {
    // Now try to find a repo that does not exist
    const repo = await Repo.findOne({ origin, 'auth.u': uid })
    console.log('REPO found', repo) // BAD: no errors, and we've found a repo that does not correspond to the query; check mongoose debug msg.
  } catch (err) {
    console.error(new Error('could not find repo'))
    console.log(err)
  }

  console.log('\nSECOND TEST MongoDB: updating elements using mongoDB library')
  try {
    const db = mongoose.connection.db
    await db.collection('Repos').findOneAndUpdate({ origin, outsideSchema: 1 }, { $set: { o: 'BOOM !!' } })
    const repo = await Repo.findOne({ origin })
    console.log('REPO after update', repo) // BAD: no errors, and we've found a repo that does not correspond to the query; check mongoose debug msg.
  } catch (err) {
    console.error(new Error('could not find repo'))
    console.log(err)
  }

  console.log('\nSECOND TEST Mongoose: updating elements')
  try {
    await Repo.updateOne({ origin, outsideSchema: 1 }, { $set: { o: 'BOOM !!' } })
    const repo = await Repo.findOne({ origin })
    console.log('REPO after update', repo) // BAD: no errors, and we've found a repo that does not correspond to the query; check mongoose debug msg.
  } catch (err) {
    console.error(new Error('could not find repo'))
    console.log(err)
  }

  process.exit(0)
})

