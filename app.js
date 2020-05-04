const express = require('express');
const mongooose = require('mongoose');
const graphqlHttp = require('express-graphql');
require('dotenv/config');
const cors = require('cors');
const multer = require('multer');
const isAuth = require('./middleware/is-auth');

const graphQLSchema = require('./graphql/schema');
const graphQLResolvers = require('./graphql/resolvers/resolvers');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'client/public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
   
var upload = multer({ storage: storage })
const app = express();
mongooose.set('useCreateIndex', true);
mongooose.set('useFindAndModify', false);

app.use(cors());
app.use(isAuth);
app.use('/graphql', graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
}));
app.use(express.static('public'));
app.post('/upload', upload.single('file'), (req, res) => {
    if(!req.isAuth){
        throw new Error('You need to login to upload');
    }
    const file = req.file;
    if (!file) {
        throw new Error('Please upload a file')
    }
    res.send("/images/" + file.filename);
});


mongooose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(process.env.APP_PORT);
}).catch(err => {
    console.log(err);
});