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
