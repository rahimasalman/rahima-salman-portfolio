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
    /* ANA SƏHİFƏDƏ görünürmü? `/projects` (arxiv) HƏMİŞƏ hamısını göstərir.
       ⚠️ Bu bayraq 08-16-da silinmişdi, 08-25-də QƏSDƏN geri qaytarıldı — səbəb dəyişdi:
       əvvəl "ilk 3-ü göstər" mənasında `slice(0,3)` idi və NİYYƏTİ GİZLƏDİRDİ
       (massivin sırası React→React→Node→Vue idi, yəni hero "Vue/Nuxt" deyir, aşağıda Vue yox idi).
       İndi seçim məlumatın ÖZÜNDƏDİR: hansı kartın seçilmiş olduğunu data faylına baxan görür.
       Hazırda dördü də `true` → ana səhifə ilə arxiv eyni görünür. Fərq layihə sayı artanda
       (və ya bir layihə köhnəldikdə) yaranır: kod DEYİL, yalnız bu sətir dəyişir. */
    featured?: boolean
}

/* ⚠️ Sıra = göstərilmə sırası (ana səhifədə də, /projects-də də). */
export const projects: Project[] = [
    {
        slug: 'vue-countdown-timer',
        title: 'Vue Countdown Timer',
        tech: ['JavaScript', 'Vue'],
        caseStudy: true,
        featured: true,
        repo: 'https://github.com/rahimasalman/vue-countdown-timer',
    },
    {
        slug: 'demo-issue-tracker',
        title: 'Demo Issue Tracker',
        tech: ['TypeScript', 'React'],
        caseStudy: true,
        featured: true,
        repo: 'https://github.com/rahimasalman/demo-issue-tracker',
    },
    {
        slug: 'react-tetris-game',
        title: 'React Tetris Game',
        tech: ['TypeScript', 'React'],
        caseStudy: true,
        featured: true,
        repo: 'https://github.com/rahimasalman/react-tetris-game',
    },
    {
        slug: 'rahima-yelpcamp',
        title: 'Rahima YelpCamp',
        tech: ['JavaScript', 'Node.js'],
        caseStudy: true,
        featured: true,
        repo: 'https://github.com/rahimasalman/rahima-yelpcamp',
    },
]

/* Ana səhifə BUNU işlədir, `projects`-i yox — filtr komponentdə deyil, data qatındadır ki,
   "ana səhifədə nə görünür?" sualının cavabı bir yerdə olsun. */
export const featuredProjects = projects.filter(p => p.featured)
