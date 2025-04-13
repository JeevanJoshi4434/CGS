# 🏆 College Survey Backend

A robust backend system for managing college surveys and contests, built with Go, MongoDB, and Redis.

## 🚀 Features

- 🔐 Secure admin authentication
- 🏆 Contest management
- 📝 Question handling
- 🔗 Test link generation
- ⚡ Redis caching for improved performance
- 📊 MongoDB for data persistence

## 🛠️ Tech Stack

- **Language:** Go 1.21.6
- **Framework:** Gin
- **Database:** MongoDB
- **Cache:** Redis
- **Environment:** GoDotEnv

## 📦 Prerequisites

- Go 1.21.6 or higher
- MongoDB
- Redis
- Git

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/college-survey-backend.git
cd college-survey-backend
```

2. Install dependencies:
```bash
go mod download
```

3. Create a `.env` file in the root directory:
```env
MONGO_URI=mongodb://localhost:27017
MONGO_DB=college_survey
REDIS_URI=localhost:6379
PORT=7070
```

4. Run the application:
```bash
go run main.go
```

## 📚 API Documentation

For detailed API documentation, please refer to [apis.md](apis.md).

## 🏗️ Project Structure

```
.
├── api/              # API route definitions
├── controller/       # Request handlers
├── db/              # Database connections
├── helper/          # Utility functions
├── models/          # Data models
├── service/         # Business logic
├── main.go          # Application entry point
├── apis.md          # API documentation
└── README.md        # Project documentation
```

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017 |
| MONGO_DB | MongoDB database name | college_survey |
| REDIS_URI | Redis connection string | localhost:6379 |
| PORT | Server port | 7070 |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



## 🙏 Acknowledgments

- [Gin Web Framework](https://github.com/gin-gonic/gin)
- [MongoDB Go Driver](https://github.com/mongodb/mongo-go-driver)
- [Go Redis](https://github.com/redis/go-redis) 