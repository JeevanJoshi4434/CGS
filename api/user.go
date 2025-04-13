package api

import (
	"main.go/controller"

	"github.com/gin-gonic/gin"
)

func UserRoutes(router *gin.RouterGroup) {
	userController := controller.NewUserController()
	router.POST("/user/register", userController.CreateUser)
} 