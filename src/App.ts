import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import Root from './GraphQL/Root';

const app: express.Express = express();

app.use('/graphql', graphqlHTTP({
    schema: Root,
    graphiql: true
}));

app.listen(8080, () => console.log('Listening on port 8080'));
