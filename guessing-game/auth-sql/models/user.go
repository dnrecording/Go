package models

type User struct {
	Id        uint   `json:"id" gorm:"autoIncrement;primaryKey"`
	Username  string `json:"username" gorm:"unique"`
	Password  []byte `json:"-"`
	SecretNum int    `json:"-"`
	GuessNum  string `json:"guessnum"`
}
