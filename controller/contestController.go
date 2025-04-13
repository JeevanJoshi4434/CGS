package controller

import (
	"context"
	"net/http"
	"time"


	
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"main.go/db"
	"main.go/helper"
	"main.go/models"

	"github.com/gin-gonic/gin"
)

type ContestController struct{}

func NewContestController() *ContestController {
	return &ContestController{}
}

func (cc *ContestController) CreateContest(c *gin.Context) {
	var contest models.Contest
	if err := c.ShouldBindJSON(&contest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set creation timestamp
	currentTime := time.Now()
	contest.CreatedAt = currentTime.Format(time.RFC3339)
	contest.Date = currentTime.Format("2006-01-02")

	// Insert contest into MongoDB
	collection := db.Database.Collection("contests")
	res, err := collection.InsertOne(context.Background(), contest)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create contest"})
		return
	}

	// Convert ObjectID to string
	contest.Id = res.InsertedID.(primitive.ObjectID)

	// Store contest in Redis
	if err := helper.StoreContest(c.Request.Context(), &contest); err != nil {
		// Log error but don't fail the request
		c.JSON(http.StatusCreated, gin.H{
			"message":    "Contest created successfully (Redis cache failed)",
			"contest_id": contest.Id.Hex(),
			"date":       contest.Date,
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":    "Contest created successfully",
		"contest_id": contest.Id.Hex(),
		"date":       contest.Date,
	})
}

func (cc *ContestController) GetContest(c *gin.Context) {
	contestID := c.Param("id")
	if contestID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Contest ID is required"})
		return
	}

	// Try to get from Redis first  id at redis = 'contest-${id}'
	contest, err := helper.GetContest(c.Request.Context(), contestID)
	if err == nil {
		c.JSON(http.StatusOK, contest)
		return
	}

	// If not in Redis, get from MongoDB
	collection := db.Database.Collection("contests")
	objID, err := primitive.ObjectIDFromHex(contestID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid contest ID"})
		return
	}

	err = collection.FindOne(context.Background(), bson.M{"_id": objID}).Decode(&contest)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Contest not found"})
		return
	}

	// Store in Redis for future requests
	helper.StoreContest(c.Request.Context(), contest)

	c.JSON(http.StatusOK, contest)
}
