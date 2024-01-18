const prisma = require('../libs/prisma');
const { createStorySchema, updateStorySchema } = require('../validation/story.validation');

// Create and Save a new Story
const createStory = async (req, res, next) => {
  try {
    const { value, error } = createStorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
    const story = await prisma.story.create({
      data: {
        title: value.title,
        synopsis: value.synopsis,
        status: value.status,
        writer: value.writer,
        category: value.category,
        tags: value.tags.map((tag) => tag.replace(/\s/g, '_')),
        image: value.image,
        chapters: value.chapters
          ? {
              createMany: {
                data: value.chapters,
              },
            }
          : undefined,
      },
      include: {
        chapters: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Story created successfully',
      data: story,
    });
  } catch (error) {
    next(error);
  }
};

const getStories = async (req, res, next) => {
  try {
    let stories = [];
    if (req.query.search) {
      stories = await prisma.story.findMany({
        select: {
          id: true,
          title: true,
          writer: true,
          category: true,
          tags: true,
          status: true,
          updatedAt: true,
        },
        where: {
          OR: [
            {
              title: {
                contains: req.query.search,
                mode: 'insensitive',
              },
            },
            {
              writer: {
                contains: req.query.search,
                mode: 'insensitive',
              },
            },
          ],
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
    } else if (req.query.category && req.query.status) {
      stories = await prisma.story.findMany({
        select: {
          id: true,
          title: true,
          writer: true,
          category: true,
          tags: true,
          status: true,
          updatedAt: true,
        },
        where: {
          AND: [
            {
              category: req.query.category,
            },
            {
              status: req.query.status,
            },
          ],
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
    } else if (req.query.category) {
      stories = await prisma.story.findMany({
        select: {
          id: true,
          title: true,
          writer: true,
          category: true,
          tags: true,
          status: true,
          updatedAt: true,
        },
        where: {
          category: req.query.category,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
    } else if (req.query.status) {
      stories = await prisma.story.findMany({
        select: {
          id: true,
          title: true,
          writer: true,
          category: true,
          tags: true,
          status: true,
          updatedAt: true,
        },
        where: {
          status: req.query.status,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
    } else {
      stories = await prisma.story.findMany({
        select: {
          id: true,
          title: true,
          writer: true,
          category: true,
          tags: true,
          status: true,
          updatedAt: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'Stories retrieved successfully',
      data: stories.map((story) => ({
        ...story,
        tags: story.tags.map((t) => t.replace(/_/g, ' ')),
      })),
    });
  } catch (error) {
    next(error);
  }
};

const getStoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const story = await prisma.story.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        chapters: true,
      },
    });

    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found',
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Story retrieved successfully',
      data: {
        ...story,
        tags: story.tags.map((t) => t.replace(/_/g, ' ')),
      },
    });
  } catch (error) {
    next(error);
  }
};

const editStory = async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log(req.body);
    const { value, error } = updateStorySchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
        data: null,
      });
    }

    const story = await prisma.story.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found',
        data: null,
      });
    }
    value.tags = value.tags.map((tag) => tag.replace(/\s/g, '_'));
    const updatedStory = await prisma.story.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...value,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Story updated successfully',
      data: updatedStory,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const story = await prisma.story.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found',
        data: null,
      });
    }

    await prisma.story.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      success: true,
      message: 'Story deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStory,
  getStories,
  getStoryById,
  editStory,
  deleteStory,
};
