# MERN STACK

- MongoDb-Express.js-React-Node.js

# Mongoose

- Node.js ortamında MongoDB veritabanıyla çalışmamızı sağlayan bir kütüphanedir.
- Mongoose, Mongodb ile etkileşime geçerken javascript nesne ve fonskiyonlarını kullanarak veritabanı işlemlerini gerçekleştirmemize olanak sağlıyor.

## Mongoose Temel Özellikleri

1. Şema Tanımlama: Veritabanı koleksiyonları için şema tanımlamanıza izin veriyor.Bu şema verielrin yapısını ve özellklerini önceden belirlememizi sağlar.

2. Modellema:Mongoose şemalara dayalı modeller oluşturu.Bu mpdelelr bir koleksiyonla ilişkili veritabanı işlemleri (okuma,yazma,güncellenme,silme) gerçekleştirmek için kullanılır.

3. Doğrulama (Vaidation):Verilerin belirli kurallara uymasını sağlamak için çeşitli doğrulama seçenekleri sunar.

# Enviroment Variables

- Ortam Değişkenleri / Çevre Değişkenleri

- Githuba gönderip herkesle paylaşmak istemeyeceğimiz değerler bire env variable olarak saklanır.
- gitıgnore dosyasına env dosyasını eklersek bu değişkenler localimize erişilebilir olurken githuba gönderilmez.
- Genelde hassas bilgiler, veritabanı, admin bilgilrti vb.durumlarda kullanırız.

# Operatörler

- gt (>): greather than
- gte (>=): greather than or equals
- lt (<): less than
- lte (<=): less than or equals
- ne (!=): not equals

# Authentication (Kimlik Doğrulama)

- Bir kullanıcının kimliğini doğrulma sürecidri.
- Örn: eopsta - şifre | google hesabı | parmak izi
- Kimik doğrulama bir kullanıcının sisteme erişim talebini gerçeklşetiren ilk adımdır.

# Authorization(Yetkilendirme)

- Bir kullanıcını sistemin belirli kaynaklarına erişimini kontrol etme sürecidir.
- Yetkilendirme kimlik doğrulama sürecinden sonr ayaptığımız işlemdir.
- Kimliğini doğruladığımız kullanıcının hangi eylemleri yapıp yapmaycağını belirleriz.
- Ör:
- - user role: sadece okuma yapabilir.
- - guide / lead-guide:sadece kendi oluşturdukları turlarda CRUD işlemleri yapılabilir.
- - admin role: hem bütün turlarda hem de kullanıcı hesaplarında CRUD işlemi yapabilir ve adminlere özel rapor rout'larına erişebilir.

# Hash

- Hash fonksiyonları bir veriyi (örneğin parola) alarak benzer bir d,zye dönüştüren matematiksel algoritmalardır.

* "deneme benim şifrem" > "123456789087654hbfcdjnksm"
* "deneme benim şifrem" > "123456789087654hbfcdjnksm"
* "deneme senin şifren" > "wdfmdkmk1234knmkefnmckdm1"

- farklı girdiler farklı hash değeleri üret,.Aynı girdiler aynı hash değerleri üretir.
- Kullanıcıların parolalarının hashlenmesi parolanın depolanması sırasında güvenliği artırır. Böylece depolama alanına erişen kötü amaçlı kişler gerçek şifreleri doğrudan elde edemez.

# Salt

- Parla tabanlı hash fonbksiyonları aynı girdiler için aynı sonuçları ürettikleri için saltlama kullanrak güvenliği artırırız.Saltlama kullanıcının parolası için rastgele bir değer oluşturur ve bu değeri parolanın kendisiyle birleştiriyor.Sonra ise salt'lanmış parola hashing algoritmasından geçiyor bu sayede aynı olsa bile hah sonraki çıktı farklı oluyor.

* "deneme benim şifrem" > "adshbshdedjs deneme benim şifrem" > "12342434hjsdbnchjs/\*jdcn"
* "deneme benim şifrem" > "287328746274 "deneme benim şifrem" > "swdljndjknkj278237/\*jjk"
