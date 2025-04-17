package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Contest struct {
	Id         primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name       string             `json:"name" bson:"name"`
	Location   string             `json:"location" bson:"location"`
	QuestionId string             `json:"question_id" bson:"question_id"`
	Result     string             `json:"result" bson:"result"`
	Date       string             `json:"date" bson:"date"`
	CreatedAt  string             `json:"created_at" bson:"created_at"`
}
