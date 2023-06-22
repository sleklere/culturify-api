const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAll = (Model, filter) =>
  catchAsync(async (req, res, next) => {
    if (!filter) filter = {};
    if (filter === 'user') filter = { user: req.params.userId };
    const docs = await Model.find(filter);

    const modelName = Model.modelName.toLowerCase();

    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        [`${modelName}s`]: docs,
      },
    });
  });
exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    const modelName = Model.modelName.toLowerCase();

    if (!doc)
      return next(new AppError(`No ${modelName} found with that ID`, 404));

    res.status(200).json({
      status: 'success',
      data: {
        [`${modelName}s`]: doc,
      },
    });
  });
exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    const modelName = Model.modelName.toLowerCase();

    res.status(201).json({
      status: 'success',
      data: {
        [modelName]: newDoc,
      },
    });
  });
exports.updateOne = Model => catchAsync(async (req, res, next) => {});
exports.deleteOne = Model => catchAsync(async (req, res, next) => {});
