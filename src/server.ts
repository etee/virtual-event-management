import application from ".";
import { PORT } from "./config/env.config.ts";

application.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});