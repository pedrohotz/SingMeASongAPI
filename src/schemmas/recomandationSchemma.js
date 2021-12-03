import joi from 'joi';

const validationRecommendation = joi.object({
    name: joi.string().min(5).required(),
    youtubeLink: joi.string().pattern(/(?:https?:\/\/)?(?:www\.|m\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s\?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s\?]+)/)
})


export {
    validationRecommendation,
}