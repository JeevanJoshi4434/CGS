package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Question struct {
	Id      primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Text    string             `json:"text" bson:"text"`
	Options string             `json:"options" bson:"options"`
}
