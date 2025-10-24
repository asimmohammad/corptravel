# LaaSyCorpTravel - Corporate Travel Management System

A comprehensive corporate travel management system with API key authentication, policy management, booking system, and real-time monitoring.

## 🚀 Features

### 🔐 Authentication & Security
- **API Key + Secret Authentication** - Secure API access with Bearer token format
- **Permission-based Access Control** - Granular permissions for different operations
- **Rate Limiting** - Configurable requests per hour per API key
- **Usage Tracking** - Comprehensive API usage monitoring

### 📊 Core Modules
- **Policy Management** - Create, publish, and enforce corporate travel policies
- **Booking System** - Unified booking flow for flights, hotels, and cars
- **Trip Management** - Centralized view of past and upcoming travel
- **Traveler Management** - User and traveler profile management
- **Search & Discovery** - Real-time travel option search
- **Reports & Analytics** - Comprehensive reporting and insights

### 🏗️ Architecture
- **Backend**: FastAPI + SQLAlchemy + MySQL
- **Frontend**: React + Vite (coming soon)
- **Database**: AWS RDS MySQL
- **Authentication**: API Key + Secret system
- **Deployment**: Docker + Docker Compose

## 🛠️ Quick Start

### Prerequisites
- Docker and Docker Compose
- AWS RDS MySQL database (or local MySQL)

### 1. Clone and Setup
```bash
git clone https://github.com/asimmohammad/corptravel.git
cd corptravel
```

### 2. Configure Database
Update the `DATABASE_URL` in `docker-compose.yml` with your AWS RDS credentials:
```yaml
environment:
  DATABASE_URL: "mysql+pymysql://username:password@your-rds-endpoint:3306/database"
```

### 3. Start the Application
```bash
docker compose up --build -d
```

### 4. Bootstrap Admin API Key
```bash
curl -X POST "http://localhost:8000/api-keys/bootstrap"
```

### 5. Access the API
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/healthz

## 🔑 API Authentication

### Generate API Key
```bash
# Bootstrap first admin key
curl -X POST "http://localhost:8000/api-keys/bootstrap"

# Generate additional keys (requires admin permissions)
curl -H "Authorization: Bearer <api_key>:<api_secret>" \
     -X POST "http://localhost:8000/api-keys/generate?app_name=MyApp&permissions=bookings&permissions=trips"
```

### Use API Key
```bash
curl -H "Authorization: Bearer <api_key>:<api_secret>" \
     "http://localhost:8000/policies"
```

## 📚 API Endpoints

### Authentication
- `POST /api-keys/bootstrap` - Create first admin API key
- `POST /api-keys/generate` - Generate new API keys
- `GET /api-keys/` - List all API keys
- `GET /api-keys/my/status` - Get current API key status

### Core APIs
- `GET /policies` - List travel policies
- `POST /policies` - Create new policy
- `POST /bookings` - Create booking
- `GET /trips` - List trips
- `GET /travelers` - List travelers
- `GET /search/flights` - Search flights
- `GET /search/hotels` - Search hotels
- `GET /search/cars` - Search cars

## 🔐 Permission System

| Permission | Description |
|------------|-------------|
| `admin` | Full system access |
| `users` | User management |
| `policies` | Policy management |
| `bookings` | Booking operations |
| `trips` | Trip management |
| `reports` | Report generation |

## 📊 Monitoring & Observability

### API Usage Tracking
- All API calls are logged with timestamps, endpoints, and response codes
- Rate limiting prevents abuse with configurable limits
- Usage statistics available via API

### Health Monitoring
- Health check endpoint: `/healthz`
- Database connection monitoring
- API key status tracking

## 🏗️ Database Schema

The system uses a comprehensive MySQL schema with the following key tables:
- `api_keys` - API key management and permissions
- `api_key_usage` - API usage tracking
- `users` - User management
- `policies` - Travel policies
- `bookings` - Booking records
- `trips` - Trip management
- `travelers` - Traveler profiles

## 🚀 Deployment

### Local Development
```bash
docker compose up --build
```

### Production (AWS)
The system is designed to work with AWS RDS MySQL. Update the `DATABASE_URL` in `docker-compose.yml` with your production database credentials.

## 🔧 Configuration

### Environment Variables
- `DATABASE_URL` - MySQL connection string
- `LOG_LEVEL` - Logging level (default: INFO)

### Database Configuration
The system automatically creates database tables on startup using SQLAlchemy models.

## 📈 Future Enhancements

- [ ] Frontend React application
- [ ] OIDC/SSO integration
- [ ] Advanced reporting dashboards
- [ ] AI-powered price recommendations
- [ ] Mobile application
- [ ] Real-time notifications
- [ ] Integration with travel providers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

© 2025 **LaaSy Inc.** – All Rights Reserved. Use restricted to internal demo, client proof-of-concept, and evaluation.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ by the LaaSy team**