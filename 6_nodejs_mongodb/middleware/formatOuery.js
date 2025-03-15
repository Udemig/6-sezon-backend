module.exports = (req, res, next) => {
  console.log(req.query);

  //urlen gelen parametre > duration: { lte: '10' },price: { gte: '400' }
  //mongodbin istediği format > duration: { $lte: '10' },price: { $gte: '400' }

  //yapılması gereken urlden parametrelerle eğer ki bir mongodb operatörü başına "$" eklemek
  //1) istek ile gelen parametrelere eriş
  const queryObj = { ...req.query };

  //filtrelemeye tabii tutulmayacak olan parametreleri (sort,fields,page,limit) query nesnesinden kaldır
  const fields = ["sort", "fields", "page", "limit"];
  fields.forEach((el) => delete queryObj[el]);

  //2) replace kullanabilmek için stringe çevir
  let queryStr = JSON.stringify(queryObj);

  //3)bütün operatörlerin başına $ ekle
  queryStr = queryStr.replace(
    /\b(gt|gte|lte|lt|ne)\b/g,
    (found) => `$${found}`
  );

  console.log(queryStr);

  //4)request Jst nesnesine formatlanmış query ekliyoruz
  req.formattedQuery = JSON.parse(queryStr);

  //sonra ki fonksiyonun çalışmasına izin ver
  next();
};
