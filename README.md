# fullstack-javascript-job-board

This web app is a React app that was boostrapped using *create-react-app*. 
The app pulls data from an Express API that is located in api/api.js. The API has two routes:
  */api/test*
  */api/jobs*

The **/api/jobs** route provides a list of jobs in the form of an array of JavaScript objects (JSON). The API retrieves job data from the GitHub Jobs API and stores them in a Redis database. 

## Security

This application has been reviewed and hardened for security vulnerabilities. Key security features include:

- **XSS Protection**: HTML content is sanitized using DOMPurify before rendering
- **Security Headers**: Helmet middleware provides secure HTTP headers
- **Rate Limiting**: API endpoints are protected against DoS attacks
- **CORS Protection**: Configurable CORS policy via environment variables
- **Secure Redis**: Support for authenticated Redis connections

For detailed security information, see [SECURITY.md](SECURITY.md).

## Configuration

Copy `.env.example` to `.env` and configure your environment variables:

```bash
cp .env.example .env
```

Required environment variables:
- `REDIS_HOST`: Redis server hostname (default: localhost)
- `REDIS_PORT`: Redis server port (default: 6379)
- `REDIS_PASSWORD`: Redis password (recommended for production)
- `ALLOWED_ORIGIN`: CORS allowed origin (default: http://localhost:3000)

## Security Best Practices

- Always use strong passwords for Redis in production
- Use HTTPS for all connections in production
- Keep dependencies updated with `npm audit`
- Never commit `.env` file or sensitive data to version control

