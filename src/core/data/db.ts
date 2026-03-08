import { DataSource } from "typeorm"

/**
 * Database connection manager
 */
export const db = {

    dataSource: new DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: [],
        synchronize: true,
        logging: false,
    }),
    
    /**
     * Initialize the database connection
     */
    init: async () => {

        // if the database is already initialized, return
        console.log("Initializing database connection");
        if (db.dataSource.isInitialized) {
            return;
        }

        // try to initialize the database connection
        try {
            await db.dataSource.initialize();
            console.log("Database connection established");
        } catch (error) {
            console.error("Error initializing database connection", error);
            throw error;
        }
    }
}