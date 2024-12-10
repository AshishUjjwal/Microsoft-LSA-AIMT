
import cron from 'node-cron';
import { User } from '../src/Models/user.model.js';

cron.schedule("0 0 * * *", async () => {
  try {
    const now = Date.now();
    const result = await User.deleteMany({
      isVerified: false,
      verificationExpiresAt: { $lt: now },
    });
    console.log(`${result.deletedCount} unverified accounts deleted.`);
  } catch (error) {
    console.error("Error cleaning up unverified accounts:", error);
  }
});
