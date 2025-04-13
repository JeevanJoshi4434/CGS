package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Admin struct {
	Id        primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name      string             `json:"name" bson:"name"`
	Email     string             `json:"email" bson:"email"`
	Password  string             `json:"password" bson:"password"`
	ContestId string             `json:"contest_id" bson:"contest_id"`
}
