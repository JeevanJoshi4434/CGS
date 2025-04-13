package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	Id          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name        string             `json:"name" bson:"name"`
	Email       string             `json:"email" bson:"email"`
	PhoneNumber string             `json:"phone_number" bson:"phone_number"`
	DOB         string             `json:"dob" bson:"dob"`
	Address     string             `json:"address" bson:"address"`
	School      string             `json:"school" bson:"school"`
	CreatedAt   string             `json:"created_at" bson:"created_at"`
}
