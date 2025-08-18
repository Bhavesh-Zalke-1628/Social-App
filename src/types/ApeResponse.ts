// jb bhi type hoga to o bhi ek interface hoga

import { User } from "@/model/UserModel";


export interface ApiResponse {
    success: Boolean,
    message: String,
    isAccessptingMessage?: String,
    messages?: Array<User>
}