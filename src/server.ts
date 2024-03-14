import application from ".";
import { PORT } from "./config/env.config.ts";

let port = PORT || 3000;
application.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});