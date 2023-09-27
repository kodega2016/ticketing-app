import Queue from "bull";

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  console.log("process the job", job.data.orderId);
  // after that push the event to the NATS Streaming Server
});

export { expirationQueue };
