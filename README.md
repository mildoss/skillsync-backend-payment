# SkillSync Backend - Payment Service

A TypeScript-based payment processing microservice built with Fastify, Stripe integration, and Kafka messaging for the SkillSync platform.

## Overview

The SkillSync Payment Service is a backend microservice responsible for handling payment processing, Stripe integration, and asynchronous messaging through Kafka. It provides RESTful APIs for payment operations and integrates with Stripe for secure payment processing.

## Features

- **Payment Processing**: Handle payment transactions and processing
- **Stripe Integration**: Seamless integration with Stripe payment gateway
- **Kafka Messaging**: Asynchronous event-driven architecture using Kafka
- **RESTful API**: Built with Fastify for high performance
- **Health Checks**: Service health monitoring endpoints
- **Environment Configuration**: Flexible configuration via environment variables

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Fastify 5.8.5
- **Language**: TypeScript
- **Payment Gateway**: Stripe SDK 22.1.1
- **Message Queue**: Kafka (KafkaJS 2.2.4)
- **Build Tool**: TypeScript Compiler (TSC)

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Kafka cluster (for messaging)
- Stripe API keys

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mildoss/skillsync-backend-payment.git
cd skillsync-backend-payment
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3005
STRIPE_API_KEY=your_stripe_api_key_here
KAFKA_BROKER=localhost:9092
NODE_ENV=development
```

## Usage

### Development

Start the development server with hot reload:
```bash
npm run dev
```

The service will start on `http://localhost:3005` by default.

### Production Build

Build the TypeScript code:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Endpoints

### Health Check

- **GET** `/health`
  - Returns the service status
  - Response: `{ "status": "ok", "service": "payment-service" }`

### Payment Routes

All payment-related endpoints are prefixed with `/payments`. For detailed documentation of payment endpoints, see the routes configuration in `src/routes/payment.ts`.

## Project Structure

```
src/
├── server.ts           # Main server entry point
├── routes/
│   └── payment.ts      # Payment API routes
├── kafka/
│   └── kafka.ts        # Kafka connection and configuration
└── ...
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Service port | `3005` |
| `STRIPE_API_KEY` | Stripe API key | Required |
| `KAFKA_BROKER` | Kafka broker address | Required |
| `NODE_ENV` | Environment (development/production) | `development` |

## Dependencies

### Production
- **fastify** (^5.8.5) - Web framework
- **fastify-raw-body** (^5.0.0) - Raw body parser for Fastify
- **stripe** (^22.1.1) - Stripe payment API
- **kafkajs** (^2.2.4) - Kafka client for Node.js
- **dotenv** (^17.4.2) - Environment variable management

### Development
- **typescript** (^6.0.3) - TypeScript compiler
- **@types/node** (^25.6.2) - Node.js type definitions
- **tsx** (^3.1.14) - TypeScript runtime
- **ts-node** (^10.9.2) - TypeScript execution

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Start production server |

## Development

### Setting Up for Development

1. Install dependencies: `npm install`
2. Configure environment variables in `.env`
3. Start Kafka locally (or point to a remote instance)
4. Run `npm run dev` to start the development server

### Code Format

The project is written in TypeScript. Ensure all code follows TypeScript best practices:
- Use strict typing
- Configure tsconfig.json appropriately
- Run the TypeScript compiler: `npm run build`

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the package.json file for details.

## Support

For issues, questions, or contributions, please open an issue on the [GitHub repository](https://github.com/mildoss/skillsync-backend-payment).

## Related Projects

This is part of the SkillSync platform ecosystem. Other related services may include:
- SkillSync Backend (main service)
- SkillSync Frontend
- Other microservices

---

**Last Updated**: 2026-05-15
