const joi = require('joi');

const createStorySchema = joi.object({
  title: joi.string().required(),
  synopsis: joi.string().required(),
  status: joi.valid('Published', 'Draft').required(),
  writer: joi.string().required(),
  category: joi.valid('Technology', 'Financial', 'Health').required(),
  tags: joi.array().items(joi.string().valid('Best', 'Short', 'Mental illness')).required(),
  image: joi.string().optional(),
  chapters: joi
    .array()
    .items(
      joi.object({
        title: joi.string().required(),
        content: joi.string().required(),
      })
    )
    .optional(),
});

const updateStorySchema = joi.object({
  title: joi.string().optional(),
  synopsis: joi.string().optional(),
  status: joi.valid('Published', 'Draft').optional(),
  writer: joi.string().optional(),
  category: joi.valid('Technology', 'Financial', 'Health').optional(),
  tags: joi.array().items(joi.string().valid('Best', 'Short', 'Mental illness')).optional(),
  image: joi.string().optional().allow(''),
  chapters: joi
    .array()
    .items(
      joi.object({
        title: joi.string().optional(),
        content: joi.string().optional(),
      })
    )
    .optional(),
});

module.exports = {
  createStorySchema,
  updateStorySchema,
};
