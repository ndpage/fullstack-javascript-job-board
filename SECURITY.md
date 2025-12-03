# Security Policy

## Security Improvements

This document outlines the security vulnerabilities that have been identified and fixed in this project.

### Critical Issues Fixed

#### 1. Cross-Site Scripting (XSS) Vulnerability
**Location**: `client/src/JobModal.js`

**Issue**: The application was using `html-react-parser` to render unsanitized HTML from job descriptions, which could allow attackers to inject malicious scripts.

**Fix**: Replaced `html-react-parser` with DOMPurify sanitization to remove any potentially malicious code before rendering HTML content.

```javascript
// Before: Vulnerable to XSS
{require('html-react-parser')(`${job.description}`)}

// After: Protected with DOMPurify
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description) }} />
```

### High Priority Issues Fixed

#### 2. Missing Security Headers
**Location**: `api/api.js`

**Issue**: The Express API was missing security headers, making it vulnerable to various attacks.

**Fix**: Added Helmet middleware to set secure HTTP headers automatically.

```javascript
app.use(helmet())
```

#### 3. Insecure CORS Configuration
**Location**: `api/api.js`

**Issue**: CORS was configured inline without proper validation and security checks.

**Fix**: Implemented proper CORS middleware with configurable origins via environment variables.

```javascript
const corsOptions = {
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
```

#### 4. No Rate Limiting
**Location**: `api/api.js`

**Issue**: API endpoints had no rate limiting, making them vulnerable to DoS attacks.

**Fix**: Added rate limiting middleware to prevent abuse.

```javascript
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
})
app.use(limiter)
```

#### 5. Insecure Redis Connection
**Location**: `api/api.js` and `worker/tasks/fetch-github.js`

**Issue**: Redis client was created without authentication options or connection security.

**Fix**: 
- Updated Redis client to v4 (latest version with security improvements)
- Added support for authentication via environment variables
- Added proper error handling for Redis connection errors

```javascript
var client = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
    },
    password: process.env.REDIS_PASSWORD || undefined
});
```

#### 6. Missing Error Handling
**Location**: `api/api.js`

**Issue**: API endpoints lacked proper error handling, potentially exposing sensitive error information.

**Fix**: Added try-catch blocks with proper error responses.

```javascript
app.get('/api/jobs', async(req, res) => {
    try {
        const jobs = await getAsync('GitHub');
        if (!jobs) {
            return res.status(404).json({ error: 'No jobs found' });
        }
        const parsedJobs = JSON.parse(jobs);
        return res.json(parsedJobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})
```

### Dependency Vulnerabilities Fixed

Updated the following packages to fix known security vulnerabilities:

1. **nodemon**: Updated to latest version to fix semver ReDoS vulnerability
2. **redis**: Updated from v3.1.1 to v4.x for security improvements
3. **node-fetch**: Already at v3.1.1 (fixed ReDoS vulnerability)
4. **express**: Updated dependencies to fix path-to-regexp and qs vulnerabilities

### Configuration Security

#### Environment Variables
Created `.env.example` file to document required environment variables:

```
# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# CORS Configuration
ALLOWED_ORIGIN=http://localhost:3000
```

#### Sensitive Data Protection
Added `dump.rdb` to `.gitignore` to prevent Redis database dumps from being committed to version control.

## Security Best Practices

### For Developers

1. **Never commit sensitive data**: Always use environment variables for secrets, API keys, and passwords
2. **Keep dependencies updated**: Regularly run `npm audit` and update vulnerable packages
3. **Validate all input**: Always validate and sanitize user input before processing
4. **Use HTTPS**: In production, always use HTTPS for all connections
5. **Enable Redis authentication**: Set a strong password for Redis in production environments

### Node.js Version Compatibility

This project was originally designed for Node.js v14. When running on Node.js v17+ and using the older react-scripts (v3.4.1), you may encounter build errors due to OpenSSL changes.

**Workaround for development**: Use Node.js v14 or v16, or set the `NODE_OPTIONS` environment variable:
```bash
export NODE_OPTIONS=--openssl-legacy-provider
npm run build
```

**Recommended**: Upgrade to react-scripts v5.x or later for full Node.js v18+ compatibility (this is a breaking change outside the scope of this security review).

### Deployment Checklist

Before deploying to production:

- [ ] Set strong Redis password via `REDIS_PASSWORD` environment variable
- [ ] Configure `ALLOWED_ORIGIN` to match your production domain
- [ ] Use HTTPS for all connections
- [ ] Review and adjust rate limits based on expected traffic
- [ ] Ensure Redis is not exposed to the public internet
- [ ] Keep all dependencies updated

## Reporting Security Issues

If you discover a security vulnerability, please email the maintainers directly rather than opening a public issue.

## Security Tools Used

- **DOMPurify**: HTML sanitization to prevent XSS attacks
- **Helmet**: Security headers middleware for Express
- **express-rate-limit**: Rate limiting to prevent DoS attacks
- **CodeQL**: Static analysis for security vulnerabilities (0 alerts found)
