import mongoose , {Schema , Document} from "mongoose";

export interface IUrl extends Document {
    originalUrl: string;
    shortCode: string;
    alias:String;
    clicks: number;
    createdAt: Date;
}


const urlSchema = new Schema<IUrl>(
    {
        originalUrl:{
            type:String,
            required:true
        },
        shortCode:{
            type:String,
            required:true,
            unique:true,
        },
        alias:{
            type:String
        },
        clicks:{
            type:Number,
            default:0
        },
    },
    {
        timestamps:true
    }
)

const Url = mongoose.model<IUrl>("Url", urlSchema);

export default Url;