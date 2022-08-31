import mongoose from 'mongoose'

type TAuth = {
  d: Date
  u: mongoose.Schema.Types.ObjectId
}

interface IRepo {
  o: string
  a: Array<TAuth>
}

export interface IRepoDocument extends IRepo, mongoose.Document {
  // statics
}

interface RepoModel extends mongoose.Model<IRepoDocument> {
}

const repoSchema = new mongoose.Schema<IRepo, RepoModel>(
  {
    o: {
      type: String,
      alias: 'origin',
      required: true,
    },
    a: {
      type: [{
        d: Date,
        u: mongoose.Schema.Types.ObjectId,
      }],
      alias: 'auth',
    },
  }, {
    timestamps: true,
  },
)

export default mongoose.model<IRepo, RepoModel>('Repo', repoSchema)
