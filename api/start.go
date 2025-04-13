package api

import (
	"github.com/gin-gonic/gin"
)

func Default(router *gin.RouterGroup ){
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Server is running",
		})
	})
}