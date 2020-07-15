import { MiddlewareFn } from 'type-graphql';
import { MyContext } from 'src/types/MyContext';

export const logger: MiddlewareFn<MyContext> = async ({ args }, next) => {
  console.log('args: ', args);
  return next();
};
