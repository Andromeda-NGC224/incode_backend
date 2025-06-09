// Load env variables before anything else
import dotenv from 'dotenv';
dotenv.config();

// other imports
import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { rootRouter } from 'routes';
import { connectDatabase } from 'database';
import { errorHandler } from 'common/middleware';
import { NotFoundException } from 'common/exceptions';

// App init
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.json());

// Routes
app.use('/api', rootRouter);

// Routes Fallback
app.use((_req, _res) => {
  throw new NotFoundException('Route not found');
});

// Global Error Handler (should be the last one)
app.use(errorHandler);

// Bootstrap
const bootstrap = async () => {
  try {
    // connect database
    await connectDatabase();

    // run server
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.dir(error);
    process.exit(1);
  }
};

void bootstrap();
