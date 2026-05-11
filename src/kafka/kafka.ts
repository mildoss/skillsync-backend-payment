import { Kafka, Producer } from 'kafkajs';
import dotenv from 'dotenv';
import fs from 'fs';
import path from "node:path";
import {PaymentSuccessPayload} from "../types";

dotenv.config();

const certsPath = path.resolve(__dirname, '../../certs');

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,

  brokers: [
    process.env.KAFKA_BROKERS as string
  ],

  ssl: {
    rejectUnauthorized: true,
    ca: [fs.readFileSync(path.join(certsPath, 'ca.pem'), 'utf-8')],
    key: fs.readFileSync(path.join(certsPath, 'service.key'), 'utf-8'),
    cert: fs.readFileSync(path.join(certsPath, 'service.cert'), 'utf-8'),
  },
});

const producer: Producer = kafka.producer();

export const connectKafka = async () => {
  try {
    await producer.connect();
  } catch {
    process.exit(1);
  }
};

export const sendPaymentSuccessEvent = async (paymentData: PaymentSuccessPayload) => {
  try {
    await producer.send({
      topic: 'billing-payments-success',
      messages: [
        {
          key: paymentData.userId,
          value: JSON.stringify({
            eventType: 'PAYMENT_SUCCESS',
            timestamp: new Date().toISOString(),
            data: paymentData,
          }),
        },
      ],
    });

  } catch (error) {
    console.error('❌ Kafka send error:', error);
  }
};