import { config } from "dotenv";
config();

import { server } from "./server";

const PORT = process.env.PORT || 4000;

// Server Listening
server.listen(PORT, () => {
    console.log(`Server is running at port - ${PORT}`);
});