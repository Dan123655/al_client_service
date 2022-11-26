import { body } from 'express-validator'

export const loginValidation =
    [
    body('email','Incorrect email format').isEmail(),
    body('password','Password must contain at least 5 symbols').isLength({min:5}),

]
export const registerValidation =
    [
    body('email','Incorrect email format').isEmail(),
    body('password','Password must contain at least 5 symbols').isLength({min:5}),
    body('fullName', 'Provide full name of at least 3 characters').isLength({min:3}),
    body('avatarUrl','Incorrect image url format').optional().isURL()
]
export const postCreateValidation =
    [
    body('title','Enter post title').isLength({min:3}).isString(),
    body('text','Enter text').isLength({min:10}).isString(),
    body('tags', 'Wrong hashtag format(array required)').optional().isString(),
    body('imageUrl','image url required').optional().isString()
]