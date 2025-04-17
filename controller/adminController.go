package controller

import (
	"context"
	"net/http"
	"go.mongodb.org/mongo-driver/bson"
	"main.go/db"
	"main.go/models"

	"github.com/gin-gonic/gin"
)

type AdminController struct{}

func NewAdminController() *AdminController {
	return &AdminController{}
}

func (ac *AdminController) GetContest(c *gin.Context) {
	// Access collection
	collection := db.Database.Collection("contests")

	// Find all contests
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch contests"})
		return
	}
	defer cursor.Close(context.Background())

	var contests []models.Contest
	if err := cursor.All(context.Background(), &contests); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse contests"})
		return
	}

	// Return contests
	c.JSON(http.StatusOK, gin.H{
		"message":  "Contests fetched successfully",
		"contests": contests,
	})
}


func (ac *AdminController) Login(c *gin.Context) {
	var loginRequest struct {
		Email    string `json:"email" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find admin in MongoDB
	collection := db.Database.Collection("admins")
	var admin models.Admin
	err := collection.FindOne(context.Background(), bson.M{"email": loginRequest.Email}).Decode(&admin)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Check password
	if admin.Password != loginRequest.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Return success response with admin details
	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"admin": gin.H{
			"id":    admin.Id.Hex(),
			"name":  admin.Name,
			"email": admin.Email,
		},
	})
}
