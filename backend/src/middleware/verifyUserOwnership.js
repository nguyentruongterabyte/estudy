const verifyUserOwnership = (req, res, next) => {
  const requestedUserId = parseInt(req.query.id || req.body.id || req.params.id || req.params.userId, 10);;
  const loggedInUserId = req.id;

  // console.log( 'request id: ' + requestedUserId );
  // console.log( 'logged in id: ' + loggedInUserId );

  if (requestedUserId !== loggedInUserId) {
    return res.sendStatus(403);
  }

  next();
};

module.exports = verifyUserOwnership;
