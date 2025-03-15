// Apı'a gelen tur ile alakalı http istekelrine cevap gönderen bütün dosyalar bu dosya da yer alacak
const Tour = require("../models/tourModel.js");
const APIFeatures = require("../utils/apiFeatures.js");

exports.getAllTours = async (req, res) => {
  try {
    //1) API Features classından örnek al
    const features = new APIFeatures(Tour.find(), req.query, req.formattedOuery)
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
