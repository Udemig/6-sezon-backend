// tour versinin backende yönetimi için schema ve model dosya da tanımlanacak

const { Schema, model } = require("mongoose");
const validator = require("validator");

// veritabanına kaydedilecek olan verilerin kısıtlamalarını yazınız.

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Tur isim değerine sahip olmalı"],
      unique: [true, "İsim değeri benzersiz olmalı"],
      minLength: [5, "Turun ismi en az 5 karakter olmalı"],
      maxLength: [40, "Turun ismi 40 karakterden fazla olamaz"],
      validate: [
        validator.isAlpha, //validator kütüphanesinden geldi
        "İsimde sadece alfabetik karakterler olmalı",
      ],
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

    priceDiscount: {
      type: Number,
      //! custom validator (kendi yazdığımız kontrolcüler)
      //doğrulama fonskiyonu false return ederse bu kotntrolcüler geçmedi ve veritabanına kaydedilemez anlamına gelir, true return ederse verinin kaydedilmesinin önüne bir engel anlamına gelir.
      //indirim fiyatı asıl fiyattan büyükse false değilse true döndürmeli
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        message: "İndirim fiyatı asıl fiyattan büyük olamaz",
      },
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
    hour: {
      type: Number,
    },
  },
  //şema virtual ayarları
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//! Virtual Property(sanal)
// Veri tabanında tutmamıza değemeyecek ama clieanta göndermemiz gereken değerlerdir.
// Ör: frontend bizden url'de kullanabilmek için tur isminin slug verisyonunu istesin
// İstenen: Doğa Gezisi > doğa-gezisi ,, The Star Gazer > the-star-gazer
// Bu tarz durumlarda: Veirtabanında tutmamıza değemyecek ama client tarafından istenilen özellikler var ise bunları veritaabnında tutmak yerine verileri veritabanından alıp clienta göndermeden önce hesaplayıp virtuel property olarka ekleriz.
tourSchema.virtual("slug").get(function () {
  return this.name.toLowerCase().replace(/ /g, "-");
});

// Örn: Client sayfa da kullanamk üzere turun dolar fiyatından ziyade bizden tl fiyatını da istedi.tl fiyatı zaten dolar üzerinden yapılacak olan hesaplamaalr sonucu eşde edilebileceği için TL fiyatını veritaabında tutmak çok mantıksız olucaktır.Bunu yerin verileri clienta gönderöeden hemenn önce tl fiyatını hesaplayıp virtuel property olarak ekleriz.
tourSchema.virtual("turkishPrice").get(function () {
  return this.price * 37;
});

//! Document Middleware
// bir belgenin kaydedilme güncellenme silinme okunma gibi olaylarınından önce veya sonra işlem gerçekleşltşr ek için kullanıyoruz.
// client'tan gelen turun veritabanına kaydeilmeden hemen önce kaç saat sürdüğünü hesapla ve veritabaına bu veriyi kaydet.
tourSchema.pre("save", function (next) {
  console.log("kaydedilme işleminden hemen önce çalıştı");

  //veritabanı hour(saat) özelliğini hesaplayıp kaydet
  this.hour = this.duration * 24;

  //sonraki adıma grçiş izni
  next();
});

//pre() işlemden önce post() işlemden sonra middleware çalışltırmaya yarar
tourSchema.post("save", function (doc, next) {
  // ör: post kullanıcı yeni bir hesap oluşturduktan sonra mail/smm göndermek için kullanılır
  console.log("yeni hesap oluşturma işleminden hemen sonra çalıştı");
  next();
});

//! Query Middleware
// sorgu işlemlerinde önce veya sonra çalıştırılan middlewarelere verilen isim
tourSchema.pre("find", function (next) {
  console.log("find işleminden önce çalıştı");

  this.find({ premium: { $ne: true } });

  next();
});

//! Aggregate Middleware
// raporlama işlemlerinde önce veya sonra çalıştırılan middlewarelere verilen isim
tourSchema.post("aggregate", function (doc, next) {
  console.log("raporlama işlemindne hemen sonra çalıştı");

  next();
});

tourSchema.pre("aggregate", function (next) {
  //premium olanların rapora dahil edilmemesi için agregation. pipeline başlangıç adımı olarka premiumları çıkaran bir adım ekledik.
  this.pipeline().unshift({ $match: { premium: { $ne: true } } });
  next();
});

//model oluştur (veri tabanında ki akış verisini yönetmek için kullancağız)

const Tour = model("Tour", tourSchema);

module.exports = Tour;
