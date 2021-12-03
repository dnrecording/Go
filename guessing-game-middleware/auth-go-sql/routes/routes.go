package routes

import (
	"auth-sql/controller"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	app.Post("/api/signup", controller.Signup)

	app.Post("/api/login", controller.Login)

	app.Get("/api/user", controller.UserValidate)

	app.Post("/api/logout", controller.Logout)

	app.Patch("/api/guess", controller.Guess)

}
