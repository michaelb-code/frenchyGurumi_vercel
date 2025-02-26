import dotenv from "dotenv"
dotenv.config()

export const env = {
    PORT : process.env.PORT,
    MONGO_URI : process.env.MONGO_URI,
    MONGO_URI_LOCAL : process.env.MONGO_URI_LOCAL,
    DB_NAME : process.env.DB_NAME,
    TOKEN : process.env.TOKEN
}