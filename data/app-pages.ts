import type { Locale } from "@/i18n/config";

export type AppFeature = {
  emoji: string;
  title: string;
  text: string;
};

export type AppPageCopy = {
  category: string;
  short: string;
  tagline: string;
  intro: string;
  features: AppFeature[];
  audience: string[];
  closing: string;
};

export type AppPageContent = {
  appId: string;
  slug: string;
  accent: string;
  website?: string;
  copy: Record<Locale, AppPageCopy>;
};

export const APP_PAGES: AppPageContent[] = [
  {
    appId: "com.ferhatozcelik.agropulse",
    slug: "agropulse",
    accent: "#3f8f4a",
    copy: {
      tr: {
        category: "Tarım",
        short: "Uydudan bitki sağlığı, sulama önerisi ve tarla kazanç takibi.",
        tagline: "Uydu verisini tarlanız için sade tavsiyelere dönüştürür.",
        intro:
          "AgroPulse ile tarlanızı haritada işaretlemeniz yeterli. Uydu görüntülerinden bitki sağlığını, toprak nemini ve yağışı takip eder; ne zaman sulamanız gerektiğini sade bir dille söyler. Masraf ve satışlarınızı kaydederek sezon sonunda elinize ne kaldığını görürsünüz.",
        features: [
          { emoji: "🛰️", title: "Uydudan bitki sağlığı", text: "Uydu görüntülerinden hesaplanan yeşillik puanı ile ürününüzün durumunu görün." },
          { emoji: "💧", title: "Toprak nemi", text: "Üst toprak ve kök bölgesi için uydu ölçümleri." },
          { emoji: "🌦️", title: "Yağış ve su kaybı", text: "Tarlanız için günlük buharlaşma ve yağış verileri." },
          { emoji: "✅", title: "Net sulama tavsiyesi", text: "Ne zaman sulamanız ve neye bakmanız gerektiğini sade dille söyler." },
          { emoji: "💰", title: "Kazanç takibi", text: "Tohum, gübre, mazot, işçilik ve satışları kaydedin; tarla tarla kârınızı görün." },
          { emoji: "📐", title: "Otomatik alan hesabı", text: "Tarlanın köşelerine dokunun; dekar ya da hektar olarak alan hesaplansın." },
        ],
        audience: ["Çiftçiler", "Tarım danışmanları", "Aile işletmeleri", "Birden fazla tarlası olanlar"],
        closing: "Tarlanıza gitmeden durumunu bilin. Suyu, emeği ve parayı doğru yere harcayın.",
      },
      en: {
        category: "Agriculture",
        short: "Crop health from satellite, irrigation advice and field profit tracking.",
        tagline: "Turns satellite data into simple advice for your field.",
        intro:
          "With AgroPulse you just mark your field on the map. It tracks crop health, soil moisture and rainfall from satellite imagery and tells you in plain language when to irrigate. Log your costs and sales to see what you actually earned at the end of the season.",
        features: [
          { emoji: "🛰️", title: "Crop health from satellite", text: "See how your crop is doing with a greenness score computed from satellite imagery." },
          { emoji: "💧", title: "Soil moisture", text: "Satellite readings for topsoil and the root zone." },
          { emoji: "🌦️", title: "Rainfall and water loss", text: "Daily evaporation and rainfall data for your field." },
          { emoji: "✅", title: "Clear irrigation advice", text: "Tells you in plain words when to water and what to check." },
          { emoji: "💰", title: "Profit tracking", text: "Log seed, fertiliser, fuel, labour and sales; see profit field by field." },
          { emoji: "📐", title: "Automatic area calculation", text: "Tap the corners of your field to get its area in decares or hectares." },
        ],
        audience: ["Farmers", "Agricultural advisers", "Family farms", "Growers with several fields"],
        closing: "Know how your field is doing before you get there. Spend water, effort and money where it counts.",
      },
    },
  },
  {
    appId: "com.ferhatozcelik.mycodes",
    slug: "my-codes",
    accent: "#6a3fd0",
    copy: {
      tr: {
        category: "Wear OS",
        short: "Wear OS için QR kod cüzdanı ve tarayıcı. Kodlarınız her an bileğinizde.",
        tagline: "Telefonu cebinden çıkarma. Bileğini kaldır, yeter.",
        intro:
          "My Codes, Wear OS akıllı saatler için geliştirilmiş bir QR kod cüzdanı ve tarayıcısıdır. Biniş kartları, biletler, sadakat kartları ve dijital kartvizitler saatinizde durur; internet olmasa bile tek dokunuşla açılır.",
        features: [
          { emoji: "⌚", title: "Wear OS için tasarlandı", text: "Küçük ekrana özel, akıcı ve sezgisel bir deneyim." },
          { emoji: "📷", title: "Saatten QR tarama", text: "QR kodlarını doğrudan saatinizle hızlı ve doğru tarayın." },
          { emoji: "🧩", title: "Döşeme (Tile) desteği", text: "Favori kodlarınızı Wear OS döşemelerine sabitleyin, tek kaydırmada açın." },
          { emoji: "✈️", title: "Çevrimdışı erişim", text: "Uçakta, metroda, çekmeyen yerde bile kodlarınız hazır." },
          { emoji: "🎫", title: "Her tür QR", text: "URL, metin, vCard, biletler, sadakat ve üyelik kartları." },
          { emoji: "🔒", title: "Tamamen gizli", text: "Veri toplanmaz, bulut yok, takip yok. Her şey cihazınızda." },
        ],
        audience: ["Wear OS kullanıcıları", "Sık seyahat edenler", "Etkinliklere katılanlar", "Dijital kartvizit kullananlar"],
        closing: "Biletiniz, kartınız, kartvizitiniz: hepsi bileğinizde, her zaman.",
      },
      en: {
        category: "Wear OS",
        short: "A QR code wallet and scanner for Wear OS. Your codes, always on your wrist.",
        tagline: "Leave your phone in your pocket. Just raise your wrist.",
        intro:
          "My Codes is a QR code wallet and scanner built for Wear OS smartwatches. Boarding passes, tickets, loyalty cards and digital business cards live on your watch and open with a single tap, even offline.",
        features: [
          { emoji: "⌚", title: "Built for Wear OS", text: "A smooth, intuitive experience designed for the small screen." },
          { emoji: "📷", title: "Scan from your watch", text: "Scan QR codes quickly and accurately, right from your wrist." },
          { emoji: "🧩", title: "Tile support", text: "Pin favourite codes to Wear OS Tiles and open them with one swipe." },
          { emoji: "✈️", title: "Works offline", text: "Your codes are ready on a plane, on the metro, anywhere without signal." },
          { emoji: "🎫", title: "Every kind of QR", text: "URLs, text, vCards, tickets, loyalty and membership cards." },
          { emoji: "🔒", title: "Fully private", text: "No data collection, no cloud, no tracking. Everything stays on your device." },
        ],
        audience: ["Wear OS users", "Frequent travellers", "Event-goers", "Digital business card users"],
        closing: "Your ticket, your card, your contact details: all on your wrist, all the time.",
      },
    },
  },
  {
    appId: "ferhatozcelik.zincirikirma",
    slug: "keep-the-chain",
    accent: "#d0581c",
    copy: {
      tr: {
        category: "Verimlilik",
        short: "“Zinciri kırma” tekniğiyle hedeflerini ve alışkanlıklarını her gün takip et.",
        tagline: "Her gün bir halka. Zinciri kırma.",
        intro:
          "Zinciri Kırma, kanıtlanmış “zinciri kırma” yöntemine dayanan bir alışkanlık takipçisidir. Hedefinizi belirleyin, her gün küçük bir adım atın ve takvimde uzayan zincirinizi izleyin. Zincir uzadıkça bırakmak zorlaşır.",
        features: [
          { emoji: "🎯", title: "Net hedefler", text: "Ulaşmak istediğiniz hedefi ve ona götürecek adımları tanımlayın." },
          { emoji: "📅", title: "Görsel takvim zinciri", text: "Tamamladığınız her günü işaretleyin; kesintisiz zinciriniz motivasyonunuz olsun." },
          { emoji: "✅", title: "Günlük küçük adımlar", text: "Büyük hedefleri yönetilebilir günlük görevlere bölün." },
          { emoji: "🚭", title: "Kötü alışkanlıkları bırakın", text: "Sigara gibi alışkanlıkları bırakmak için de aynı güçlü yöntemi kullanın." },
          { emoji: "⏰", title: "Hatırlatıcılar", text: "Özelleştirilebilir hatırlatıcılarla hiçbir günü kaçırmayın." },
          { emoji: "💬", title: "Motivasyon sözleri", text: "Yol boyunca ilham veren alıntılar ve faydalı ipuçları." },
        ],
        audience: ["Spora başlamak isteyenler", "Kitap okuma hedefi olanlar", "Sigarayı bırakmak isteyenler", "Disiplin kazanmak isteyen herkes"],
        closing: "Bugün ilk halkayı ekleyin. Gerisi zincirin gücüne kalsın.",
      },
      en: {
        category: "Productivity",
        short: "Track your goals and habits every day with the “don't break the chain” method.",
        tagline: "One link a day. Don't break the chain.",
        intro:
          "Keep the Chain is a habit tracker built on the proven “don't break the chain” method. Set a goal, take a small step every day and watch your chain grow on the calendar. The longer it gets, the harder it is to stop.",
        features: [
          { emoji: "🎯", title: "Clear goals", text: "Define what you want to achieve and the steps that get you there." },
          { emoji: "📅", title: "Visual calendar chain", text: "Mark every day you complete; your unbroken chain becomes your motivation." },
          { emoji: "✅", title: "Small daily steps", text: "Break big goals into manageable daily tasks." },
          { emoji: "🚭", title: "Quit bad habits", text: "Use the same powerful method to stop habits like smoking." },
          { emoji: "⏰", title: "Reminders", text: "Customisable reminders so you never miss a day." },
          { emoji: "💬", title: "Motivational quotes", text: "Inspiring quotes and useful tips along the way." },
        ],
        audience: ["People starting to exercise", "Readers with a reading goal", "Anyone quitting smoking", "Anyone building discipline"],
        closing: "Add the first link today. Let the chain do the rest.",
      },
    },
  },
  {
    appId: "com.ferhatozcelik.ulgen",
    slug: "ulgen",
    accent: "#2f7d4f",
    copy: {
      tr: {
        category: "Güvenlik",
        short: "Zararlı bağlantıları anında tespit eden, gizlilik odaklı modern tarayıcı.",
        tagline: "İnternette daha güvenli, daha bilinçli, daha huzurlu gezinin.",
        intro:
          "Ulgen, ziyaret ettiğiniz bağlantıları anlık olarak analiz eden modern bir tarayıcıdır. Kimlik avı (phishing), zararlı yazılım ve riskli sitelere karşı sizi önceden uyarır; verilerinizi ise hiç toplamaz.",
        features: [
          { emoji: "🔍", title: "Gerçek zamanlı link analizi", text: "Açtığınız her bağlantı anında kontrol edilir; şüpheli içerikte uyarı alırsınız." },
          { emoji: "🛡️", title: "Phishing ve zararlı site koruması", text: "Kimlik avı ve zararlı yazılım barındıran sitelere karşı ek bir koruma katmanı." },
          { emoji: "🔐", title: "Gizlilik öncelikli", text: "Kişisel veri toplanmaz, işlenmez, paylaşılmaz. Gezinmeniz takip edilmez." },
          { emoji: "⚡", title: "Hızlı ve sade arayüz", text: "Karmaşık ayarlar yok; hızlı sayfa yükleme ve herkesin kullanabileceği bir tasarım." },
          { emoji: "🔔", title: "Akıllı bildirimler", text: "Riskli durumlarda net ve anlaşılır güvenlik bildirimleri." },
          { emoji: "🔄", title: "Sürekli güncel altyapı", text: "Yeni tehdit türlerine karşı düzenli olarak güncellenen koruma mekanizmaları." },
        ],
        audience: ["Güvenli internet isteyen herkes", "Çocuklu aileler", "Gizliliğe önem verenler", "Teknolojiyle arası iyi olmayanlar"],
        closing: "Bağlantılara tıklamadan önce düşünmenize gerek kalmasın. Ulgen sizin yerinize kontrol etsin.",
      },
      en: {
        category: "Security",
        short: "A modern, privacy-first browser that detects malicious links instantly.",
        tagline: "Browse safer, smarter and with peace of mind.",
        intro:
          "Ulgen is a modern browser that analyses the links you visit in real time. It warns you in advance about phishing, malware and risky sites, and it never collects your data.",
        features: [
          { emoji: "🔍", title: "Real-time link analysis", text: "Every link you open is checked instantly; suspicious content triggers a warning." },
          { emoji: "🛡️", title: "Phishing and malware protection", text: "An extra layer of protection against phishing and malware sites." },
          { emoji: "🔐", title: "Privacy first", text: "No personal data collected, processed or shared. Your browsing is never tracked." },
          { emoji: "⚡", title: "Fast, simple interface", text: "No complicated settings; fast page loads and a design anyone can use." },
          { emoji: "🔔", title: "Smart notifications", text: "Clear, understandable security alerts when something looks risky." },
          { emoji: "🔄", title: "Always up to date", text: "Protection regularly updated against new types of threats." },
        ],
        audience: ["Anyone who wants a safer internet", "Families with children", "Privacy-conscious users", "Less tech-savvy users"],
        closing: "Stop second-guessing every link. Let Ulgen check it for you.",
      },
    },
  },
  {
    appId: "com.tulparim",
    slug: "tulparim",
    accent: "#8a7a52",
    website: "https://tulparim.com",
    copy: {
      tr: {
        category: "Araç & Servis",
        short: "QR kodlu dijital servis defteri: bakım geçmişi, filo yönetimi ve yapay zekâ asistan.",
        tagline: "Aracınızın tüm bakım geçmişi tek bir QR kodda.",
        intro:
          "Tulparım, kâğıt servis defterinin dijital ve doğrulanmış halidir. Sürücüler bakımlarını tek yerde tutar; QR kodu okutan herkes aracın gerçek geçmişini görür. Servisler ve filolar ise tüm araçlarını tek panelden yönetir.",
        features: [
          { emoji: "📱", title: "QR ile doğrulanmış geçmiş", text: "Aracınızın QR kodunu okutan alıcı ya da servis, doğrulanmış bakım geçmişini anında görür." },
          { emoji: "🧾", title: "Tüm kayıtlar tek yerde", text: "Yağ, lastik, onarım, parça… Kaybolan fatura ve defter derdine son." },
          { emoji: "🔧", title: "Adım adım servis takibi", text: "Ön kontrol, parça, onarım ve teslim aşamalarını canlı takip edin." },
          { emoji: "🤖", title: "Yapay zekâ arıza asistanı", text: "Arıza kodunu sorun; olası nedeni ve önerilen bakımı saniyeler içinde görün." },
          { emoji: "🚚", title: "Filo ve servis paneli", text: "Araçları, müşterileri ve bakımları tek panelden yönetin." },
          { emoji: "🤝", title: "Şeffaf müşteri ilişkisi", text: "Bakım sürecini müşterilerinizle açıkça paylaşın, güven kazanın." },
        ],
        audience: ["Bireysel sürücüler", "Oto servisler", "Filo yöneticileri", "İkinci el araç alıcıları"],
        closing: "Aracınızın değerini koruyun: her bakım kayıt altında, her kayıt doğrulanmış.",
      },
      en: {
        category: "Vehicles & Service",
        short: "A QR-based digital service book: maintenance history, fleet management and an AI assistant.",
        tagline: "Your vehicle's entire service history in a single QR code.",
        intro:
          "Tulparım is the digital, verified version of the paper service book. Drivers keep every service in one place and anyone who scans the QR code sees the vehicle's real history. Workshops and fleets manage all their vehicles from one dashboard.",
        features: [
          { emoji: "📱", title: "QR-verified history", text: "Buyers or workshops scan your vehicle's QR code and see its verified service history instantly." },
          { emoji: "🧾", title: "Every record in one place", text: "Oil, tyres, repairs, parts… no more lost invoices or service books." },
          { emoji: "🔧", title: "Step-by-step service tracking", text: "Follow inspection, parts, repair and delivery stages live." },
          { emoji: "🤖", title: "AI fault assistant", text: "Ask about a fault code; see the likely cause and recommended service in seconds." },
          { emoji: "🚚", title: "Fleet and workshop dashboard", text: "Manage vehicles, customers and services from one panel." },
          { emoji: "🤝", title: "Transparent with customers", text: "Share the service process openly and build trust." },
        ],
        audience: ["Drivers", "Car workshops", "Fleet managers", "Used car buyers"],
        closing: "Protect your vehicle's value: every service recorded, every record verified.",
      },
    },
  },
  {
    appId: "com.ferhatozcelik.spincoater",
    slug: "stellnex",
    accent: "#55606e",
    copy: {
      tr: {
        category: "Bilim & Laboratuvar",
        short: "İnce film laboratuvarları için Bluetooth kontrollü, vakumsuz spin coater sistemi.",
        tagline: "Yazılım çözümleriyle akıllı laboratuvar ekipmanları.",
        intro:
          "StellNex, ince film araştırmalarında kullanılan döndürme kaplama (spin coating) cihazını telefonunuzdan kontrol etmenizi sağlar. OLED, OPV, perovskit, OFET, TFT, grafen/2D ve sensör çalışmaları için ergonomik, düşük maliyetli ve homojen film üreten bir sistem sunar.",
        features: [
          { emoji: "📶", title: "Bluetooth ile kablosuz kontrol", text: "Arduino tabanlı cihazı telefondan yönetin; kapalı ortam düzeneklerinde bile rahatça kullanın." },
          { emoji: "🧪", title: "Vakumsuz cam tutucu", text: "Vakum yerine cam boyutunda özel kanallar; filmin yapısı ve homojenliği bozulmaz." },
          { emoji: "💧", title: "Fazla sıvı tahliyesi", text: "Sıvı kanalları, kaplama sırasında fazla çözeltiyi kolayca uzaklaştırır." },
          { emoji: "🔒", title: "Kapalı ve güvenli yapı", text: "Zararlı kimyasallara maruz kalmayı önleyen kapalı sistem tasarımı." },
          { emoji: "💰", title: "Düşük maliyet", text: "Piyasadaki sistemlere göre daha ekonomik ve homojen film üretiminde daha verimli." },
          { emoji: "🔬", title: "Geniş araştırma alanı", text: "OLED, OPV, perovskit, OFET, TFT, grafen/2D ve sensör çalışmalarına uygun." },
        ],
        audience: ["Üniversite laboratuvarları", "Malzeme bilimi araştırmacıları", "Ar-Ge ekipleri", "Lisansüstü öğrenciler"],
        closing: "Her ince film laboratuvarının ihtiyaç duyduğu spin coater, artık cebinizden kontrol ediliyor.",
      },
      en: {
        category: "Science & Lab",
        short: "A Bluetooth-controlled, vacuum-free spin coater system for thin-film labs.",
        tagline: "Smart lab equipment with software solutions.",
        intro:
          "StellNex lets you control a spin coating device, used in thin-film research, from your phone. It offers an ergonomic, low-cost system that produces homogeneous films for OLED, OPV, perovskite, OFET, TFT, graphene/2D and sensor research.",
        features: [
          { emoji: "📶", title: "Wireless Bluetooth control", text: "Run the Arduino-based device from your phone, even inside sealed setups." },
          { emoji: "🧪", title: "Vacuum-free substrate holder", text: "Custom glass-sized channels instead of vacuum keep the film structure and uniformity intact." },
          { emoji: "💧", title: "Excess liquid drainage", text: "Liquid channels remove surplus solution during coating." },
          { emoji: "🔒", title: "Enclosed, safe design", text: "A closed system that limits exposure to harmful chemicals." },
          { emoji: "💰", title: "Low cost", text: "More affordable than systems on the market and more efficient at producing homogeneous films." },
          { emoji: "🔬", title: "Broad research use", text: "Suited to OLED, OPV, perovskite, OFET, TFT, graphene/2D and sensor work." },
        ],
        audience: ["University labs", "Materials science researchers", "R&D teams", "Graduate students"],
        closing: "The spin coater every thin-film lab needs, now controlled from your pocket.",
      },
    },
  },
  {
    appId: "com.ferhatozcelik.emojidefense",
    slug: "emoji-arcade",
    accent: "#d8920a",
    copy: {
      tr: {
        category: "Oyun",
        short: "Tek uygulamada dört emoji oyunu: Sort, Blast, Rush ve Merge.",
        tagline: "Dört farklı oyun, tek uygulama, sınırsız emoji eğlencesi.",
        intro:
          "Emoji Arcade; bulmaca, eşleştirme, koşu ve birleştirme oyunlarını tek bir uygulamada toplar. Kısa molalarda da uzun oyun seanslarında da canınız ne isterse onu oynayın, rekorlarınızı kırın.",
        features: [
          { emoji: "🧩", title: "Emoji Sort", text: "Renkli emojileri doğru kutulara yerleştir, hamlelerini planla, zorlaşan bölümleri geç." },
          { emoji: "💥", title: "Emoji Blast", text: "Aynı emojileri eşleştir, zincirleme patlamalar ve güçlendiricilerle en yüksek skoru yap." },
          { emoji: "🏃", title: "Emoji Rush", text: "Sonsuz parkurda koş, engellerden kaç, altınları topla. Ne kadar uzağa gidebilirsin?" },
          { emoji: "🧬", title: "Emoji Merge", text: "Aynı emojileri birleştirip daha büyüklerini oluştur; alan dolmadan zirveye ulaş." },
          { emoji: "🏆", title: "Rekor ve başarılar", text: "Skorlar, kişisel rekorlar ve başarılarla kendinle yarış." },
          { emoji: "🎮", title: "Kolay kontroller", text: "Öğrenmesi saniyeler süren, sezgisel ve renkli bir oyun deneyimi." },
        ],
        audience: ["Bulmaca sevenler", "Arcade oyuncuları", "Kısa molada oynamak isteyenler", "Her yaştan oyuncu"],
        closing: "Bulmaca mı, aksiyon mu? Seçmek zorunda değilsin. Dördü de burada.",
      },
      en: {
        category: "Game",
        short: "Four emoji games in one app: Sort, Blast, Rush and Merge.",
        tagline: "Four games, one app, endless emoji fun.",
        intro:
          "Emoji Arcade brings puzzle, match, runner and merge games together in one app. Play whatever you feel like, in a quick break or a long session, and beat your records.",
        features: [
          { emoji: "🧩", title: "Emoji Sort", text: "Place colourful emojis in the right boxes, plan your moves and clear harder levels." },
          { emoji: "💥", title: "Emoji Blast", text: "Match emojis and chase high scores with chain blasts and power-ups." },
          { emoji: "🏃", title: "Emoji Rush", text: "Run an endless track, dodge obstacles and collect coins. How far can you go?" },
          { emoji: "🧬", title: "Emoji Merge", text: "Merge matching emojis into bigger ones and reach the top before the board fills." },
          { emoji: "🏆", title: "Records and achievements", text: "Compete with yourself through scores, personal bests and achievements." },
          { emoji: "🎮", title: "Easy controls", text: "An intuitive, colourful game you can learn in seconds." },
        ],
        audience: ["Puzzle fans", "Arcade players", "Quick-break gamers", "Players of all ages"],
        closing: "Puzzle or action? You don't have to choose. All four are here.",
      },
    },
  },
  {
    appId: "ferhatozcelik.trsms",
    slug: "konya-macerasi",
    accent: "#1f9d8a",
    copy: {
      tr: {
        category: "Keşif Oyunu",
        short: "Konya'yı GPS radarı ve 3D haritayla sokak sokak keşfettiren konum tabanlı oyun.",
        tagline: "Konya'yı adım adım, 3D haritada keşfet!",
        intro:
          "Konya Macerası, gerçek GPS radarı ve 3D açık dünya haritasıyla şehri bir oyuna dönüştürür. Tarihi mekânlara yaklaşın, onları keşif defterinize ekleyin, XP kazanın ve Selçuklu rozetlerini toplayın. Ücretsiz, reklamsız ve 6 yaş üstü aile dostu.",
        features: [
          { emoji: "📡", title: "Canlı GPS radarı", text: "120 metre hassasiyetle çevrenizdeki keşfedilecek noktaları gösterir." },
          { emoji: "🗺️", title: "3D açık dünya Konya", text: "Şehri 3D haritada gezin, sokak sokak yeni yerler bulun." },
          { emoji: "🕌", title: "264 tarihi durak", text: "Cami, medrese, müze, park ve lezzet durakları; hepsi bir arada." },
          { emoji: "📖", title: "Keşif defteri", text: "Ziyaret ettiğiniz yerleri kategoriye göre toplayın, koleksiyonu %100 tamamlayın." },
          { emoji: "🏅", title: "Selçuklu rozetleri", text: "XP kazanın, seviye atlayın, unvan ve madalyaların sahibi olun." },
          { emoji: "👨‍👩‍👧", title: "Ücretsiz ve reklamsız", text: "Aileler ve çocuklar için güvenli, 6+ yaşa uygun deneyim." },
        ],
        audience: ["Konyalılar", "Şehre gelen turistler", "Aileler ve çocuklar", "Okul gezileri"],
        closing: "Bir sonraki yürüyüşünüz bir maceraya dönüşsün. Konya'yı oynayarak tanıyın.",
      },
      en: {
        category: "Exploration Game",
        short: "A location-based game that lets you explore Konya street by street with GPS radar and a 3D map.",
        tagline: "Discover Konya step by step on a 3D map!",
        intro:
          "Konya Macerası turns the city into a game with a real GPS radar and a 3D open-world map. Get close to historic sites, add them to your discovery log, earn XP and collect Seljuk badges. Free, ad-free and family friendly for ages 6+.",
        features: [
          { emoji: "📡", title: "Live GPS radar", text: "Shows nearby places to discover with 120-metre precision." },
          { emoji: "🗺️", title: "3D open-world Konya", text: "Roam the city on a 3D map and find new places street by street." },
          { emoji: "🕌", title: "264 historic stops", text: "Mosques, madrasas, museums, parks and food stops, all in one." },
          { emoji: "📖", title: "Discovery log", text: "Collect the places you visit by category and complete the set." },
          { emoji: "🏅", title: "Seljuk badges", text: "Earn XP, level up and unlock titles and medals." },
          { emoji: "👨‍👩‍👧", title: "Free and ad-free", text: "A safe experience for families and children aged 6+." },
        ],
        audience: ["Konya locals", "Visitors to the city", "Families and children", "School trips"],
        closing: "Turn your next walk into an adventure. Get to know Konya by playing.",
      },
    },
  },
];

export function getAppPageBySlug(slug: string): AppPageContent | undefined {
  return APP_PAGES.find((page) => page.slug === slug);
}

export function getAppPageByAppId(appId: string): AppPageContent | undefined {
  return APP_PAGES.find((page) => page.appId === appId);
}
