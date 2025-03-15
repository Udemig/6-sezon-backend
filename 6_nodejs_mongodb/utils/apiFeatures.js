// Filtreleme, Sayfalama, Sıralama, Alan Lİmitleme gibi özellikleri proje içinde ihtiyaç olan heryerde kod tekrarına düşmeden kullanılabilmesi için yeniden kullanılabilr bi class yazalım.

class APIFeatures {
  constructor(query, params, formattedParams) {
    this.query = query; //sorgu
    this.params = params; //parametreler
    this.formattedParams = formattedParams; //mw'Den gelen filtreleme için parametreler
  }
  filter() {
    //1) turlar için sorgu oluştur(filtreleme)
    this.query = this.query.find(this.formattedQuery);

    return this;
  }
  sort() {
    //2)eğer sort parametresi varsa ona göre sırala yoksa en yeniyi en başa koy
    if (this.params.sort) {
      //mongodb sıralanacak fieldların arasına "," değil " " istediği için güncelledik.
      this.query.sort(this.params.sort.split(",").join(" "));
    } else {
      this.query.sort("-createdAt");
    }
    return this;
  }
  limit() {
    //3)eğer fields parametresi varsa limitle
    if (this.params.fields) {
      const fields = this.params.fields.split(",").join(" ");
      this.query.select(fields);
    }

    return this;
  }
  pagination() {
    //4) pagination - sayfalama
    const page = Number(this.params.page) || 1; //mevcut sayfa sayısı
    const limit = Number(this.params.limit) || 10; //sayfa başına eleman sayısı
    const skip = (page - 1) * limit; //limit çalışmadan önce atlanıcak eleman sayısı

    this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
