package service

import (
	"context"
	"encoding/base64"
	"fmt"
	"time"
)

type TestLinkService interface {
	GenerateTestLink(ctx context.Context, name, location, id string, date time.Time) (string, error)
}

type testLinkService struct{}

func NewTestLinkService() TestLinkService {
	return &testLinkService{}
}

func (s *testLinkService) GenerateTestLink(ctx context.Context, name, location string, id string, date time.Time) (string, error) {
	// Create the link string with the provided parameters
	linkStr := fmt.Sprintf("token=%s&timestamp=%s&test=true", id, date.Format(time.RFC3339))

	// Base64 encode the link string
	encodedLink := base64.StdEncoding.EncodeToString([]byte(linkStr))

	// Create the final URL
	domain := "your-domain.com" // Replace with your actual domain
	link := fmt.Sprintf("https://%s?%s", domain, encodedLink)

	return link, nil
}
