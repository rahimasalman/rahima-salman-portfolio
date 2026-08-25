/* EXPERIENCE — SKELET (mətn burada DEYİL).
   Bölmə əvvəl `index.vue`-də hardcoded 2 <article> idi → 4 iş yeri göstərilə bilmirdi.
   İndi sıra və slot sayı bu massivlə idarə olunur.

   Mətn (`title` / `desc`) i18n-dədir: `experience.<key>.title` / `.desc` — çünki dilə görə dəyişir.
   Burada yalnız dilə görə DƏYİŞMƏYƏN sahələr var: tarix aralığı və texnologiya adları.
   (Eyni meyar `index.vue`-dakı `stack` massivində də tətbiq olunub: xüsusi ad / texniki
   termin tərcümə olunmur → 5 JSON = eyni məlumatın 5 nüsxəsi olmasın.)

   ⚠️ TARİX FORMATI QƏSDƏN RƏQƏMLİDİR (`MM.YYYY`): bu sahə i18n-də deyil, ona görə içində
   tərcümə tələb edən söz OLA BİLMƏZ. "present"/"indi" yazsaydıq, o söz 5 dilin hamısında
   ingiliscə görünərdi. Davam edən iş üçün açıq tire (`12.2024 —`) hər dildə eyni oxunur.
   Mənbə: personal/raw/…_CV.pdf (uydurulmayıb, CV-dəki aralıqların eynisidir). */
export type Job = {
    key: string          // i18n açarı: experience.<key>.title / .desc
    period: string
    tech: string[]
}

export const experience: Job[] = [
    {key: 'newmedia',     period: '12.2024 —',            tech: ['TypeScript', 'Vue.js', 'Nuxt', 'REST']},
    {key: 'adviad',       period: '08.2022 — 12.2024',    tech: ['Vue.js', 'Vuex', 'SCSS', 'Docker']},
    {key: 'artifactlabs', period: '03.2022 — 07.2022',    tech: ['Vue.js', 'GitLab']},
    {key: 'vabiss',       period: '03.2021 — 03.2022',    tech: ['JavaScript', 'Vue.js', 'Vuex', 'SCSS']},
]
