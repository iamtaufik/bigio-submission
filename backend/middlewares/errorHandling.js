const errorHandler = (err, req, res, next) => {
  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      message: err.message,
      data: null,
    });
  }
  console.log(err);
  if (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
      data: null,
    });
  }
  next();
};

module.exports = errorHandler;
