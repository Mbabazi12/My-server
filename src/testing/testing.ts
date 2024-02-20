import mongoose, {Document, Schema} from 'mongoose';

export interface MyPortifolio extends Document{
    name: string;
    Age: number;
    phoneNumber: number;
    email: string;
}

const portifolioSchema: Schema = new Schema({
    name: { type: String, required: true},
    Age: {type: Number},
    phoneNumber: { type: Number},
    email: {type: String, required: true}
},{ timestamps: true });

const Portifolio = mongoose.model<MyPortifolio>('Portifolio', portifolioSchema);

export default Portifolio;
