package controller

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"main.go/service"
)

type TestLinkController struct {
	service service.TestLinkService
}

func NewTestLinkController(service service.TestLinkService) *TestLinkController {
	return &TestLinkController{
		service: service,
	}
}

func (c *TestLinkController) GenerateTestLink(ctx *gin.Context) {
	// Get contest_id from URL parameter
	contestID := ctx.Param("id")
	if contestID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Contest ID is required"})
		return
	}

	var request struct {
		Name     string `json:"name" binding:"required"`
		Location string `json:"location" binding:"required"`
	}

	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	testLink, err := c.service.GenerateTestLink(ctx.Request.Context(), request.Name, request.Location, contestID, time.Now())
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate test link"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message":    "Test link generated successfully",
		"link":       testLink,
		"contest_id": contestID,
	})
}
