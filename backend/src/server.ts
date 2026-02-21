
import { app } from "./app"
import { connectDB } from "./config/database"


const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server running in port ${PORT} `)
    })
}).catch((error) => {
    console.error('Error starting server:', error);
})