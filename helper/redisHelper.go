package helper

import (
	"context"
	"encoding/json"
	"main.go/db"
	"main.go/models"
	"time"
)

// Store contest data in Redis
func StoreContest(ctx context.Context, contest *models.Contest) error {
	contestJSON, err := json.Marshal(contest)
	if err != nil {
		return err
	}

	key := "contest:" + contest.Id.Hex()
	return db.RedisClient.Set(ctx, key, contestJSON, 24*time.Hour).Err()
}

// Get contest data from Redis
func GetContest(ctx context.Context, contestID string) (*models.Contest, error) {
	key := "contest:" + contestID
	data, err := db.RedisClient.Get(ctx, key).Bytes()
	if err != nil {
		return nil, err
	}

	var contest models.Contest
	err = json.Unmarshal(data, &contest)
	return &contest, err
}

// Store question data in Redis
func StoreQuestion(ctx context.Context, question *models.Question) error {
	questionJSON, err := json.Marshal(question)
	if err != nil {
		return err
	}

	key := "question:" + question.Id.Hex()
	return db.RedisClient.Set(ctx, key, questionJSON, 24*time.Hour).Err()
}

// Get question data from Redis
func GetQuestion(ctx context.Context, questionID string) (*models.Question, error) {
	key := "question:" + questionID
	data, err := db.RedisClient.Get(ctx, key).Bytes()
	if err != nil {
		return nil, err
	}

	var question models.Question
	err = json.Unmarshal(data, &question)
	return &question, err
} 