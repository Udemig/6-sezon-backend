// tour versinin backende yönetimi için schema ve model dosya da tanımlanacak

const { Schema, model } = require("mongoose");

// veritabanına kaydedilecek olan verilerin kısıtlamalarını yazınız.

const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, "Tur isim değerine sahip olmalı"],
    unique: [true, "İsim değeri benzersiz olmalı"],
  },
  duration: {
    type: Number,
    required: [true, "Tur süre değerine sahip olmalı"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "Tur max kişi sayısı değerine sahip olmalı"],
  },
  difficulty: {
    type: String,
    required: [true, "Tur zorluk değerine sahip olmalı"],
    enum: ["hard", "difficult", "easy", "medium"],
  },
  ratingsAverage: {
    type: Number,
    min: [1, "Rating 1'den küçük olamaz"],
    max: [5, "Rating 5'ten büyük olamaz"],
    default: 4.0,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "Tur fiyat değerine sahip olmalı"],
  },
  summary: {
    type: String,
    maxLength: [200, "Özet alanı 200 karakteri geçemez"],
    required: [true, "Tur özet değerine sahip olmalı"],
    trim: true,
  },
  description: {
    type: String,
    maxLength: [1000, "Açıklama alanı 1000 karakteri geçemez"],
    required: [true, "Tur açıklama değerine sahip olmalı"],
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "Tur resim değerine sahip olmalı"],
  },
  images: { type: [String] },
  startDates: { type: [Date] },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//model oluştur (veri tabanında ki akış verisini yönetmek için kullancağız)

const Tour = model("Tour", tourSchema);

module.exports = Tour;
