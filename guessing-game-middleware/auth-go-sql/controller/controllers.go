package controller

import (
	"unsafe"

	"github.com/gofiber/fiber/v2"

	"auth-sql/models"

	"auth-sql/database"

	"github.com/golang-jwt/jwt/v4"

	"strconv"

	"time"

	"math/rand"

	"golang.org/x/crypto/bcrypt"
)

const SecretKey = "secret"

func Signup(c *fiber.Ctx) error {
	var data map[string]string

	err := c.BodyParser(&data)

	if err != nil {
		return err
	}

	initSecret := xrand(0, 99)

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	user := models.User{
		Username:  data["username"],
		Password:  password,
		SecretNum: initSecret,
	}

	dberr := database.DB.Create(&user).Error

	if dberr != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Cannot use this username"})
	} else {
		c.Status(fiber.StatusOK)
	}

	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	err := c.BodyParser(&data)

	if err != nil {
		return err
	}

	var user models.User

	database.DB.Where("username = ?", data["username"]).First(&user)
	if user.Id == 0 {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "User not found",
		})
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect password",
		})
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(user.Id)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	})

	token, err := claims.SignedString([]byte(SecretKey))

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Could not login",
		})
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)
	c.Status(fiber.StatusOK)

	return c.JSON(fiber.Map{
		"message": "Login Success",
	})

	// return c.JSON(user)
}

func UserValidate(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated",
		})
	}

	claims := token.Claims.(*jwt.StandardClaims)

	var user models.User

	database.DB.Where("id = ?", claims.Issuer).First(&user)

	c.Status(fiber.StatusOK)

	return c.JSON(user)
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)
	c.Status(fiber.StatusOK)

	return c.JSON(fiber.Map{
		"message": "Logout success",
	})
}

func Guess(c *fiber.Ctx) error {
	var data map[string]string

	err := c.BodyParser(&data)

	if err != nil {
		return err
	}

	user := models.User{
		Username: data["username"],
		GuessNum: data["guessnum"],
	}

	database.DB.Where("username = ?", data["username"]).First(&user)
	if user.Id == 0 {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "User not found",
		})
	} else {
		database.DB.Model(&user).Update("guess_num", data["guessnum"])
	}

	guessInt, atoierr := strconv.Atoi(user.GuessNum)

	if atoierr != nil {
		return atoierr
	}

	randSecret := xrand(0, 99)

	if user.SecretNum == guessInt {
		c.Status(fiber.StatusCreated) //201
		database.DB.Model(&user).Update("secret_num", randSecret)
		return c.JSON(fiber.Map{
			"message": "Correct, Regenerate ...",
		})
	} else if user.SecretNum < guessInt {
		c.Status(fiber.StatusOK) //200
		return c.JSON(fiber.Map{
			"message": "Too High!",
		})
	} else if user.SecretNum > guessInt {
		c.Status(fiber.StatusAccepted) //202
		return c.JSON(fiber.Map{
			"message": "Too Low!",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Guess success",
	})
}

func xrand(min, max int) int {
	rand.Seed(time.Now().Unix())
	return rand.Intn(max-min) + min
}

func IntToByteArray(num int64) []byte {
	size := int(unsafe.Sizeof(num))
	arr := make([]byte, size)
	for i := 0; i < size; i++ {
		byt := *(*uint8)(unsafe.Pointer(uintptr(unsafe.Pointer(&num)) + uintptr(i)))
		arr[i] = byt
	}
	return arr
}

func ByteArrayToInt(arr []byte) int64 {
	val := int64(0)
	size := len(arr)
	for i := 0; i < size; i++ {
		*(*uint8)(unsafe.Pointer(uintptr(unsafe.Pointer(&val)) + uintptr(i))) = arr[i]
	}
	return val
}
