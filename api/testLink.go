package api

import (
	"github.com/gin-gonic/gin"
	"main.go/controller"
	"main.go/service"
)

func TestLink(router *gin.RouterGroup) {
	testLinkService := service.NewTestLinkService()
	testLinkController := controller.NewTestLinkController(testLinkService)

	router.POST("/testlink/:id", testLinkController.GenerateTestLink)
}
