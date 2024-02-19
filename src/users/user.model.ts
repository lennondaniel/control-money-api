import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hashPassword } from 'src/helpers/hashPassword';

@Schema()
export class UserModel {
    @Prop({
        type: String,
        default: function genUUID() {
            return crypto.randomUUID();
        }
    })
    id: string;

    @Prop()
    name: string;

    @Prop({ lowercase: true, unique: true })
    email: string;

    @Prop({ select: true })
    password: string;
}

export const UserModelSchema = SchemaFactory.createForClass(UserModel);

UserModelSchema.pre<UserModel>('save', async function (next) {
    this.password = hashPassword(this.password);
    next();
});
