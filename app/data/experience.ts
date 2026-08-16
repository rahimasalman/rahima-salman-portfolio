/* EXPERIENCE — SKELET (mətn burada DEYİL).
   Bölmə əvvəl `index.vue`-də hardcoded 2 <article> idi → 4 iş yeri göstərilə bilmirdi.
   İndi sıra və slot sayı bu massivlə idarə olunur.

   Mətn (`title` / `desc`) i18n-dədir: `experience.<key>.title` / `.desc` — çünki dilə görə dəyişir.
   Burada yalnız dilə görə DƏYİŞMƏYƏN sahələr var: tarix aralığı və texnologiya adları.
   (Eyni meyar `index.vue`-dakı `stack` massivində də tətbiq olunub: xüsusi ad / texniki
   termin tərcümə olunmur → 5 JSON = eyni məlumatın 5 nüsxəsi olmasın.)

   ⚠️ PLACEHOLDER: `period` dəyərləri və boş `tech` massivləri Rahima tərəfindən doldurulacaq.
   `tech: []` olan kartda texnologiya sətri ÜMUMİYYƏTLƏ render olunmur (v-if) — yəni boş
   massiv "boş zolaq" yaratmır, sadəcə element yoxdur. */
export type Job = {
    key: string          // i18n açarı: experience.<key>.title / .desc
    period: string
    tech: string[]
}

export const experience: Job[] = [
    {key: 'newmedia', period: 'TBD — present', tech: ['TypeScript', 'Vue.js', 'Nuxt']},
    {key: 'adviad', period: 'TBD — TBD', tech: []},
    {key: 'artifactlabs', period: 'TBD — TBD', tech: []},
    {key: 'vabiss', period: 'TBD — TBD', tech: []},
]
