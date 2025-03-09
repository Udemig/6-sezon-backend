// Apı'a gelen tur ile alakalı http istekelrine cevap gönderen bütün dosyalar bu dosya da yer alacak
const Tour = require("../models/tourModel.js");

exports.getAllTours = async (req, res) => {
  try {
    console.log("ORJINAL QUERY", req.query);
    console.log("MW GELEN FORMATLANMIŞ QUERY", req.formattedQuery);

    //1) turlar için sorgu oluştur
    const tourQuery = Tour.find(req.formattedQuery);

    // 2) eğer sort değeri varsa ona göre sırala yoksa en yeniyi en başa koy
    if (req.query.sort) {
      // mongodb dıralanacak fieldların arasına "," değil " " istediği için güncelledik
      tourQuery.sort(req.query.sort.split(",").join(" "));
    } else {
      tourQuery.sort("-createdAt");
    }
    //3) eğer limit değeri varsa limitle
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      tourQuery.select(fields);
    }

    //4) sorguyu çalıştır
    const tours = await tourQuery;

    res
      .status(200)
      .json({ message: "Bütün turlar alınıdı", results: tours.length, tours });
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

// id'sine göre bir turu güncele
exports.updateTour = (req, res) => {
  res.status(200).json({ message: "Tur güncellendi" });
};

// id'sine göre bir turu sil
exports.deleteTour = (req, res) => {
  res.status(200).json({ message: "Tur silindi" });
};
