package main

import (
	"fmt"
	"log"
	"time"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/gin-contrib/cors"
	"main.go/api"
	"main.go/db"
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}
	fmt.Println("Successfully loaded .env file")

	// Connect to MongoDB
	if err := db.Connect(); err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
	}

	// Connect to Redis
	if err := db.ConnectRedis(); err != nil {
		log.Fatal("Failed to connect to Redis:", err)
	}
}

func main() {
	router := gin.Default()

	// CORS setup
	config := cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
	router.Use(cors.New(config))

	baseRoute := "api/v1"

	// Register routes
	api.UserRoutes(router.Group(baseRoute))
	api.ContestRoutes(router.Group(baseRoute))
	api.TestLink(router.Group(baseRoute))
	api.AdminRoutes(router.Group(baseRoute))

	// Start server
	if err := router.Run(":7070"); err != nil {
		log.Fatal("Failed to start server:", err)
	}

	// Cleanup
	defer db.Disconnect()
	defer db.DisconnectRedis()
}
