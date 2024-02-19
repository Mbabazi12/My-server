import mongoose, {Document, Schema} from 'mongoose';

export interface MyPortifolio extends Document{
    name: string;
    Age: number;
    Location: string;
    phoneNumber: number;
    email: string;
}

const portifolioSchema: Schema = new Schema({
    name: { type: String, required: true},
    Age: {type: Number},
    location: {type: String},
    phoneNumber: { type: Number},
    email: {type: String, required: true}
},{ timestamps: true });

const Portifolio = mongoose.model<MyPortifolio>('Portifolio', portifolioSchema);

export default Portifolio;
