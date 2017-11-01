import express from 'express';
import passport from 'passport';
import errors from 'throw.js';

import Draft from '../../models/Draft';

const draftApiRouter = express.Router();

draftApiRouter.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  console.log(req.body);

  if (!req.body) return next(new errors.BadRequest());

  if (!req.body.name || !req.body.url) {
    return next(new errors.BadRequest());
  }

  return Draft.create({
    name: req.body.name,
    url: req.body.url,
  })
  .then(() => res.json({ success: true }));
});


module.exports = draftApiRouter;
