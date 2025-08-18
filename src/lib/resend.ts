import { config } from 'dotenv'
config()
import { Resend } from "resend"
const RESEND_API_KEY = "re_J4aMMKwN_38xjX48ymf4SCKQT9bTFqFRs"

const resend = new Resend(RESEND_API_KEY)
export default resend