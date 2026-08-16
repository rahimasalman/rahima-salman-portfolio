export type Project = {
    slug: string
    title: string
    tech: string[]
    /* GitHub repo — həmişə var */
    repo: string
    /* Canlı sayt — hər layihədə olmaya bilər (məs. kitabxana və ya oyun) */
    live?: string
    /* Cover şəkli: `public/projects/<slug>.webp` → şablonda `/projects/<slug>.webp`.
       YOXDURSA kart şəkilsiz render olunur (v-if) — yəni bu sahə boş qalsa heç nə sınmır. */
    cover?: string
    /* Detal səhifəsi (case study) YAZILIBMI?
       ⚠️ Bu, "səhifə mövcuddurmu" sualı deyil — səhifə hər slug üçün onsuz da prerender olunur.
       Bu, "KLİKƏ DƏYƏRMİ" sualıdır: false olanda kart birbaşa canlı sayta/repo-ya göndərir,
       çünki üç sətirlik detal səhifəsi ziyarətçidən klik alıb əvəzində heç nə vermir
       (həm də Google üçün "thin content"-dir). */
    caseStudy?: boolean
}

/* ⚠️ Sıra = göstərilmə sırası (ana səhifədə də, /projects-də də).
   `featured` bayrağı SİLİNDİ: cəmi 4 layihə var və hamısı ana səhifədə göstərilir —
   "ilk 3 + hamısına bax" nisbəti bu sayda gülməli idi. Siyahı 8-10-a çatanda geri qayıdır. */
export const projects: Project[] = [
    {
        slug: 'vue-countdown-timer',
        title: 'Vue Countdown Timer',
        tech: ['JavaScript', 'Vue'],
        caseStudy: true,
        repo: 'https://github.com/rahimasalman/vue-countdown-timer',
    },
    {
        slug: 'demo-issue-tracker',
        title: 'Demo Issue Tracker',
        tech: ['TypeScript', 'React'],
        caseStudy: true,
        repo: 'https://github.com/rahimasalman/demo-issue-tracker',
    },
    {
        slug: 'react-tetris-game',
        title: 'React Tetris Game',
        tech: ['TypeScript', 'React'],
        caseStudy: true,
        repo: 'https://github.com/rahimasalman/react-tetris-game',
    },
    {
        slug: 'rahima-yelpcamp',
        title: 'Rahima YelpCamp',
        tech: ['JavaScript', 'Node.js'],
        caseStudy: true,
        repo: 'https://github.com/rahimasalman/rahima-yelpcamp',
    },
]
