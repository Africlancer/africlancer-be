import { Types } from "mongoose";

export default ()=>({
    hourlyRate:0,
    professionalHeadline:"I'm a freelancer",
    summary:"About my services",
    location:"Earth",
    recommendations:0,
    rating:0,
    banner: {
        _id: new Types.ObjectId(),
        url: "",
        secure_url: ""
    }
})