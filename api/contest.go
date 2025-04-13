package api

import (
	"main.go/controller"

	"github.com/gin-gonic/gin"
)

func ContestRoutes(router *gin.RouterGroup) {
	contestController := controller.NewContestController()
	router.POST("/contests", contestController.CreateContest)
	router.GET("/contests/:id", contestController.GetContest)
} 