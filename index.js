const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const dunya2014 = fifaData.find(
  (match) => match.Year === 2014 && match.Stage === "Final"
);
const homeTeamName = dunya2014 ? dunya2014["Home Team Name"] : "";

console.log("2014 Dünya Kupası Finali Evsahibi takım ismi: ", homeTeamName);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
const awayTeamName = dunya2014 ? dunya2014["Away Team Name"] : "";
console.log("2014 Dünya kupası Finali Deplasman takım ismi ", awayTeamName);

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
const homeTeamGoals = dunya2014 ? dunya2014["Home Team Goals"] : "";
console.log(
  " 2014 Dünya kupası finali Ev sahibi takım golleri ",
  homeTeamGoals
);

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
const awayTeamGoals = dunya2014 ? dunya2014["Away Team Goals"] : "";
console.log("2014 Dünya kupası finali Deplasman takım golleri", awayTeamGoals);

//(e) 2014 Dünya kupası finali kazananı*/
let kazanan = "";
if (awayTeamGoals > homeTeamGoals) {
  kazanan = awayTeamName;
  console.log("2014 Dünya kupası finali kazananı:", kazanan);
} else {
  kazanan = homeTeamName;
  console.log("2014 Dünya kupası finali kazananı:", kazanan);
}

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/
function Finaller(fifaData) {
  const finalMacı = fifaData.filter(
    (match) => match["Stage"].toLowerCase() === "final"
  );
  return finalMacı;
}
// function Finaller(fifaData /* kodlar buraya */) {
//   /* kodlar buraya */
//   const finalMacı = fifaData.filter((match) => match["stage"] === "Final");
//   return finalMacı;
// }
// const finalMacı = Finaller(fifaData);
// console.log(finalMacı);

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(fifaData, callBack /* kodlar buraya */) {
  const finalMacı = finallerCallback(fifaData);
  const years = finalMacı.map((match) => match.Year);
  return years;
  /* kodlar buraya */
}

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(fifaData, finallerCallback) {
  const finalMacı = finallerCallback(fifaData);
  const kazananlar = finalMacı
    .map((match) => {
      if (match["Home Team Goals"] > match["Away Team Goals"]) {
        return match["Home Team Name"];
      } else if (match["Home Team Goals"] < match["Away Team Goals"]) {
        return match["Away Team Name"];
      } else {
        return null;
      }
    })
    .filter((winner) => winner !== null);

  return kazananlar;
}

const finaller = Finaller(fifaData);
const kazananlar = Kazananlar(fifaData, finaller);
console.log(kazananlar);

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/
function YillaraGoreKazananlar(
  fifaData,
  finallerCallback,
  yillarCallback,
  kazananlarCallback
) {
  const finaller = finallerCallback(fifaData); // Finalleri al
  const yillar = yillarCallback(fifaData); // Yılları al
  const kazananlar = kazananlarCallback(fifaData, finaller); // Kazananları bul

  const YillaraGoreKazananlar = yillar.map((year, index) => {
    const kazanan = kazananlar[index];
    return `${year} yılında, ${kazanan} dünya kupasını kazandı!`;
  });

  return YillaraGoreKazananlar;
}

const finaller = Finaller(fifaData); // Finaller fonksiyonu ile final maçlarını alalım
const kazananlar = Kazananlar(fifaData, finaller); // Kazananları bulalım
console.log(kazananlar);

const YillaraGoreKazananlar = YillaraGoreKazananlar(
  fifaData,
  Finaller,
  Yillar,
  Kazananlar
);
console.log(YillaraGoreKazananlar);

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(Finaller) {
  const toplamGol = Finaller.reduce((toplam, final) => {
    return toplam + final["evsahibi_gol"] + final["deplasman_gol"];
  }, 0);

  const ortalamaGol = toplamGol / (Finaller.length * 2);
  const yuvarlanmisOrtalama = ortalamaGol.toFixed(2);

  return yuvarlanmisOrtalama;
}

const finaller = Finaller(fifaData); // Finaller fonksiyonu ile final maçlarını alalım
const ortalamaGolSayisi = OrtalamaGolSayisi(finaller);
console.log(ortalamaGolSayisi);

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {
  /* kodlar buraya */
}

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
  /* kodlar buraya */
}

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
  /* kodlar buraya */
}

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
