# Parse-Server

* Uzaksunucu olarak parse-server kullanılacak.
* Parse-server aracılığıyla mongodb ile veri işlemlerini gerçekleştireceğiz.
* Duruma göre sistemde kullanacağımız algoritmaları parse-server içindeki "cloud
    code" yapısını kullanarak implement edebiliriz. 
* Bu algoritmalar Cloud code'a üç şekilde implement edilebiliyor.
    1- client-side'tan "cloud function" çağrılarak, server-side'taki callback, 
    server-side üzerinde çalıştırılır ve gerekli response anında client'e gönderilir.
    2- client-side'tan "cloud job" çağrılır, ve server-side'taki callback
    server-side üzerinde çalıştırılır ancak client'e response gönderilmez.
    Çalıştırılan bu callback ya database'i modifiye eder ve return vermez ya da
    server-side üzerindeki başka bir callback'i return eder.
    3- Client-side tarafından yapılan database işlemleri ile tetiklenen 'trigger'lar 
    aracılığıyla gerekli callback'ler return olur.

# Parse-Dashboard
* Uzaksunucu üzerinde tam yetkili bir şekilde admin olarak database verilerini görmek, düzenlemek,
veya veri eklemek için parse-dashboard client'ini kullanacağız. 
* Parse-Dashboard Reactjs kullanılarak yapılmıştır. Gerekli önyüz tasarımları ve düzenlemeler
çok rahat bir şekilde yapılabilir.

# Yapılacaklar
* Administration ve Database ile ilgili ACL(Parse-server için access-control-list) düzenlenecek.
* Client'in class oluşturması engellemeli. Client öncede admin tarafından oluşturulan classları kullanmalı.
* Var olan Parse-server tek bir "app" bulunduruyor. Servera multi-app bir yapı kazandırmamız gerekiyor. (Ekonomik)
* Https ve Wss protocollerine uygunluk sağlanacak.
* Internet bağlantısı kopması durumda local bir parse-serverın acil durum için devreye girmesi, nodejs'te bu mekanizmanın
  ayarlanabileceğini düşünüyorum ve gerekirse bunun için bir otomasyon hazılayabiliriz. Çalışma biçimi:
    - internet bağlantısı koptuğunda bir event listener aracılığıyla local parse-server'ı devreye sokacağız. 
    - internet bağlantısı yeniden sağlandığında yine bir event listener aracılığıyla local parse-serverına kaydedilmiş tüm
    veriler push edeceğiz ve localde ki veriler sileceğiz, ve yeniden uzak sunucuya bağlanacağız.

# Nasıl Çalıştırılır?
Gereklilikler: nodejs, mongodb, yarn

.env dosyası sisteme uygun modifiye edilir. Daha sonra:

yarn install --frozen-lockfile
yarn start

örnek olarak
dashboard linki => http://localhost:2000/dashboard
parse server linki => http://localhost:2000/parse