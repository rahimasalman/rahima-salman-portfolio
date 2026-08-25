/* CRAFT — "Qapı 2" (texniki/arxitekt review) üçün case-study qatı.
   Strategiya: design-system.md → İki Qapı Funnel. Qapı 1 (recruiter, ~10 san) hero-dur;
   bu isə DƏRİNLİK qapısıdır: real problem → mühakimə → nəticə.

   ⚠️ SKELET: siyahı BOŞDUR və bu, qəsdəndir. Boş case-study səhifəsi Google üçün "thin content",
   ziyarətçi üçün isə yalançı vəddir. Ona görə:
     · `publishedCraft` boşdursa → nav-da link YOXDUR və `/craft` 404 verir (səhifə mövcud olmur);
     · ilk yazı əlavə olunan kimi (aşağıdakı formada) nav linki, siyahı və prerender ÖZÜ işə düşür.
   Yəni məzmun yazmaq üçün kod dəyişikliyi lazım deyil — Experience/Projects ilə eyni meyar.

   Yeni yazı əlavə etmək:
     ① bura bir obyekt: { slug: 'ad-group-reactivity', published: true }
     ② 5 locale faylına `craft.items.<slug>.title` / `.summary` / `.body` açarları.

   Namizəd mövzular (design-system.md-dən): ad group reactivity bug-ı ·
   integrations Strategy+Registry refaktoru · SSR/hydration: localStorage vs cookie. */
export type CaseStudy = {
    slug: string
    /* Yazılıb və göstərilə bilər? Qaralama `false` qalır — repoda olur, saytda yox. */
    published: boolean
    /* Əlaqəli layihə (varsa) — `data/projects.ts`-dəki slug. */
    project?: string
}

export const craft: CaseStudy[] = []

export const publishedCraft = craft.filter(c => c.published)
