import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { createConnection } from 'typeorm';
import { redis } from './redis';
import { buildSchema } from 'type-graphql';
import { MeResolver } from './modules/user/Me';
import { LoginResolver } from './modules/user/Login';
import { RegisterResolver } from './modules/user/Register';

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [MeResolver, LoginResolver, RegisterResolver]
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req })
  });

  const app = express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000'
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: 'qid',
      secret: 'aslkdfjoiq12312',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
      }
    })
  );

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('server started on http://localhost:4000/graphql');
  });
};

main().catch(err => console.error(err));