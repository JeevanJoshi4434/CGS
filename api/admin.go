package api

import (
	"main.go/controller"

	"github.com/gin-gonic/gin"
)

func AdminRoutes(router *gin.RouterGroup) {
	adminController := controller.NewAdminController()
	router.POST("/admin/login", adminController.Login)
} 