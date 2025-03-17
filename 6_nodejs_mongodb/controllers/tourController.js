// Apı'a gelen tur ile alakalı http istekelrine cevap gönderen bütün dosyalar bu dosya da yer alacak
const Tour = require("../models/tourModel.js");
const APIFeatures = require("../utils/apiFeatures.js");

// yıla göre aylık tur istatistiklerini hesapla
exports.getMonthlyPlan = async (req, res) => {
  //url parametresinden yılı al ve number formatına çevir
  const year = Number(req.params.year);

  const stats = await Tour.aggregate([
    //1.adım: statrtdates dizisini açarak her tarihi ayrı bir belge haline getir
    {
      $unwind: {
        path: "$startDates",
      },
    },
    //2.adım:yalnızca belirlenen yıl içerisinde gerçekleşen turları seç
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`), //yılın başından itibaren
          $lte: new Date(`${year}-12-31`), // yılın sonuna kadar olanları filtrele
        },
      },
    },

    //3.adım :turları aylara göre grupla ve iststistikleir hesapla
    {
      $group: {
        _id: { $month: "$startDates" }, // ay bazında grupla
        count: { $sum: 1 }, //her ay kaç tur olduğunu hesapla
        tours: { $push: "$name" }, //o ay yapılan turları listele
      },
    },

    //4.adım: yeni bir alan ekleyerek ay bilgisini düzenle
    {
      $addFields: {
        month: "$_id", // id yerine month alanı ekledim
      },
    },

    //5.adım:id alanını kaldırarak gereksiz veriyi temizle
    {
      $project: {
        _id: 0,
      },
    },
    //6.adım:aylara göre artan sıralaam yap
    {
      $sort: { month: 1 },
    },
  ]);
  res.status(200).json({
    message: `${year} yılı için aylık plan oluşturuldu`,
    stats, // hesap istatististiklerini döndür
  });
};

//zorluk seviyesine göre tur istatistiklerini belirle
exports.getTourStats = async (req, res) => {
  const stats = await Tour.aggregate([
    //1. adım:yalnızca 4.5 ve üzeri puana sahip turları filtrele
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    //2.adım:turları zorluk seviyesine göre grupla ve istatistikleri hesapla
    {
      $group: {
        _id: "$difficulty", //zorluk seviyesine göre grupla
        count: { $sum: 1 }, // her grupta kaç tur olduğu
        avgRating: { $avg: "$ratingsAverage" }, //ortalama
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" }, //en düşük değer
        maxPrice: { $max: "$price" }, //en yüksek değer
      },
    },

    //3.adım:ortalama fiyata göre artan sırala
    { $sort: { avgPrice: 1 } },

    //4.adım:ortalama fiyatı 500den büyük olanları kaldır
    { $match: { avgPrice: { $gte: 500 } } },
  ]);

  res.status(200).json({
    message: "Rapor oluşturuldu",
    stats, // hesap istatististiklerini döndür
  });
};

//günün fırsatları için gerekli filtrelemeyi ayarlar
exports.aliasTopTours = async (req, res, next) => {
  req.query.sort = "-ratingsAverage,-ratingsQuantity";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  req.query["price[lte]"] = 1200;
  req.query.limit = 5;

  next();
};

exports.getAllTours = async (req, res) => {
  try {
    //1) API Features classından örnek al
    const features = new APIFeatures(Tour.find(), req.query, req.formattedQuery)
      .filter()
      .sort()
      .limit()
      .pagination();

    //2) sorguyu çalıştır
    const tours = await features.query;

    res
      .status(200)
      .json({ message: "Bütün turlar alındı", results: tours.length, tours });
  } catch (error) {
    res.status(400).json({ message: "Bir hata oluştu", error: error.message });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({ message: "Yeni tur oluşturuldu", tour: newTour });
  } catch (error) {
    res.status(400).json({ message: "Bir hata oluştu", error: error.message });
  }
};

// id'sine göre bir tur al
exports.getTour = async (req, res) => {
  console.log(req.params.id);
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({ message: "Bir tur alındı", tour });
  } catch (error) {
    res.status(400).json({ message: "Bir hata oluştu", error: error.message });
  }
};

//id'sine göre bir turu güncelle
exports.updateTour = async (req, res) => {
  try {
    const updateTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Tur Güncellendi", tour: updateTour });
  } catch (error) {
    res.status(400).json({ message: "Bir hata oluştu", error: error.message });
  }
};

//id'sine göre bir turu sil
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Tur silindi" });
  } catch (error) {
    res.status(400).json({ message: "Bir hata oluştu", error: error.message });
  }
};
