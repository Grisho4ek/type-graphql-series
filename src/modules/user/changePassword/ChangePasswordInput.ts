import { Field, InputType } from 'type-graphql';
import { PasswordMixin } from '../../shared/PasswordInput';

@InputType()
export class ChangePasswordnput extends PasswordMixin(class {}) {
  @Field()
  token: string;
}
