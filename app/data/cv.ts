/* CV SLOTU — skelet indi açılır, fayl sonra qoyulur (Rahima-nın "əvvəl skelet, paltar sonra" qaydası).

   ⚠️ `ready: false` olduğu müddətdə link HEÇ YERDƏ render olunmur.
   Səbəb: olmayan fayla link = canlıda 404. Slot açıq qalır, amma ziyarətçi sınıq link görmür.

   🔴 MƏXFİLİK — fayl qoyulmazdan ƏVVƏL oxunmalıdır:
   `personal/raw/…_CV.pdf` başlığında TELEFON NÖMRƏSİ və şəxsi ünvan (`rahimasalman7@`) var.
   Faylı olduğu kimi public etmək bir gün əvvəl HTML-dən çıxardığımız ünvanı geri qaytarır,
   üstəlik telefonu da əlavə edir — PDF-in içi HTML-dən daha asan taranır (mətn qatı açıqdır).
   → Public nüsxədə telefon çıxarılmalı, ünvan `hello.rahimasalman@gmail.com` olmalıdır.

   Fayl `public/cv/rahima-salman-cv.pdf` olaraq qoyulandan sonra: `ready: true`. Başqa dəyişiklik lazım deyil. */
export const cv = {
    ready: true,
    /* `public/` qovluğunun kökü `/`-dır → fayl `public/cv/…` içindədirsə yol budur. */
    file: '/cv/rahima-salman-cv.pdf',
}
