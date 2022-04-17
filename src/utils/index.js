exports.metadata = [
  {
    $group: {
      _id: null,
      total: { $sum: 1 },
    },
  },
];
exports.paginate = (page, limit) => {
  return [{ $skip: (page - 1) * limit }, { $limit: limit }];
};

exports.to = (promise, improved) => {
  return promise
    .then((data) => {
      console.log('delete here', data);
      return [null, data];
    })
    .catch((err) => {
      if (improved) {
        Object.assign(err, improved);
      }
      return [err];
    });
};
