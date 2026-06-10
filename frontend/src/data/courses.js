// ============================================
//   LEARNIFY — BAC 2027 COURSES DATA
//   8 Specializations — Arabic + French
// ============================================

const courses = [

  // ===== 1. SCIENCES EXPÉRIMENTALES | علوم تجريبية =====
  {
    id: 1,
    title: 'Biologie — Les Écosystèmes',
    titleAr: 'علم الأحياء — الأنظمة البيئية',
    instructor: 'Dr. Amina Bouzid',
    rating: 4.9, students: 520,
    category: 'sciences',
    subject: 'Biologie',
    subjectAr: 'علم الأحياء',
    image: 'https://via.placeholder.com/300x180/22c55e/white?text=Biologie',
    videoUrl: 'https://www.youtube.com/embed/G3e-cpL7ofc',
    description: 'Cours complet sur les écosystèmes et la biodiversité.',
    descriptionAr: 'درس شامل حول الأنظمة البيئية والتنوع البيولوجي.',
    level: 'Terminale', year: '3AS', isFree: true, price: 0
  },
  {
    id: 2,
    title: 'Chimie — Réactions Chimiques',
    titleAr: 'الكيمياء — التفاعلات الكيميائية',
    instructor: 'Prof. Karim Meziane',
    rating: 4.8, students: 410,
    category: 'sciences',
    subject: 'Chimie',
    subjectAr: 'الكيمياء',
    image: 'https://via.placeholder.com/300x180/22c55e/white?text=Chimie',
    videoUrl: 'https://www.youtube.com/embed/PkZNo7MFNFg',
    description: 'Les réactions chimiques et leurs mécanismes.',
    descriptionAr: 'التفاعلات الكيميائية وآلياتها.',
    level: 'Terminale', year: '3AS', isFree: true, price: 0
  },
  {
    id: 3,
    title: 'Physique — Mécanique des Fluides',
    titleAr: 'الفيزياء — ميكانيكا الموائع',
    instructor: 'Prof. Youcef Belhadj',
    rating: 4.7, students: 380,
    category: 'sciences',
    subject: 'Physique',
    subjectAr: 'الفيزياء',
    image: 'https://via.placeholder.com/300x180/22c55e/white?text=Physique',
    videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
    description: 'Comprendre la mécanique des fluides en terminale.',
    descriptionAr: 'فهم ميكانيكا الموائع في الصف النهائي.',
    level: 'Terminale', year: '3AS', isFree: true, price: 0
  },

  // ===== 2. MATHÉMATIQUES | رياضيات =====
  {
    id: 4,
    title: 'Analyse — Limites et Continuité',
    titleAr: 'التحليل — النهايات والاتصال',
    instructor: 'Prof. Nassim Hadj',
    rating: 4.9, students: 640,
    category: 'math',
    subject: 'Analyse',
    subjectAr: 'التحليل الرياضي',
    image: 'https://via.placeholder.com/300x180/6366f1/white?text=Analyse',
    videoUrl: 'https://www.youtube.com/embed/Oe421EPjeBE',
    description: 'Maîtriser les limites et la continuité des fonctions.',
    descriptionAr: 'إتقان النهايات واتصال الدوال.',
    level: 'Terminale', year: '3AS', isFree: true, price: 0
  },
  {
    id: 5,
    title: 'Algèbre — Nombres Complexes',
    titleAr: 'الجبر — الأعداد المركبة',
    instructor: 'Prof. Samira Benkhelifa',
    rating: 4.8, students: 530,
    category: 'math',
    subject: 'Algèbre',
    subjectAr: 'الجبر',
    image: 'https://via.placeholder.com/300x180/6366f1/white?text=Algebre',
    videoUrl: 'https://www.youtube.com/embed/ofme2o29ngU',
    description: 'Les nombres complexes et leurs applications.',
    descriptionAr: 'الأعداد المركبة وتطبيقاتها.',
    level: 'Terminale', year: '3AS', isFree: true, price: 0
  },
  {
    id: 6,
    title: 'Probabilités et Statistiques',
    titleAr: 'الاحتمالات والإحصاء',
    instructor: 'Prof. Mourad Ferhat',
    rating: 4.7, students: 490,
    category: 'math',
    subject: 'Probabilités',
    subjectAr: 'الاحتمالات',
    image: 'https://via.placeholder.com/300x180/6366f1/white?text=Proba',
    videoUrl: 'https://www.youtube.com/embed/nu_pCVPKzTk',
    description: 'Probabilités conditionnelles et lois de distribution.',
    descriptionAr: 'الاحتمالات الشرطية وقوانين التوزيع.',
    level: 'Terminale', year: '3AS', isFree: true, price: 0
  },

  // ===== 3. MATHÉMATIQUES TECHNIQUES | تقني رياضي =====
  {
    id: 7,
    title: 'Résistance des Matériaux (RDM)',
    titleAr: 'مقاومة المواد',
    instructor: 'Ing. Rachid Benali',
    rating: 4.8, students: 320,
    category: 'techmath',
    subject: 'RDM',
    subjectAr: 'مقاومة المواد',
    image: 'https://via.placeholder.com/300x180/f59e0b/white?text=RDM',
    videoUrl: 'https://www.youtube.com/embed/G3e-cpL7ofc',
    description: 'Résistance des matériaux pour techniciens.',
    descriptionAr: 'مقاومة المواد للتقنيين الرياضيين.',
    level: 'Terminale', year: '3AS', isFree: true, price: 0
  },
  {
    id: 8,
    title: 'Dessin Technique et DAO',
    titleAr: 'الرسم التقني والرسم بالحاسوب',
    instructor: 'Ing. Farid Amrani',
    rating: 4.7, students: 280,
    category: 'techmath',
    subject: 'Dessin Technique',
    subjectAr: 'الرسم التقني',
    image: 'https://via.placeholder.com/300x180/f59e0b/white?text=Dessin',
    videoUrl: 'https://www.youtube.com/embed/PkZNo7MFNFg',
    description: 'Maîtriser le dessin technique industriel.',
    descriptionAr: 'إتقان الرسم التقني الصناعي.',
    level: 'Terminale', year: '3AS', isFree: true, price: 0
  },

  // ===== 4. MÉCANIQUE | ميكانيك =====
  {
    id: 9,
    title: 'Mécanique — Dynamique des Systèmes',
    titleAr: 'الميكانيك — ديناميكيا الأنظمة',
    instructor: 'Ing. Omar Belhocine',
    rating: 4.9, students: 350,
    category: 'mechanic',
    subject: 'Mécanique',
    subjectAr: 'الميكانيك',
    image: 'https://via.placeholder.com/300x180/e94560/white?text=Mecanique',
    videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
    description: 'Dynamique et cinématique des systèmes mécaniques.',
    descriptionAr: 'ديناميكيا وحركية الأنظمة الميكانيكية.',
    level: 'Terminale', year: '3AS', isFree: true, price: 0
  },
  {
    id: 10,
    title: 'Thermodynamique Appliquée',
    titleAr: 'الديناميكا الحرارية التطبيقية',
    instructor: 'Ing. Salim Chaouch',
    rating: 4.7, students: 290,
    category: 'mechanic',
    subject: 'Thermodynamique',
    subjectAr: 'الديناميكا الحرارية',
    image: 'https://via.placeholder.com/300x180/e94560/white?text=Thermo',
    videoUrl: 'https://www.youtube.com/embed/Oe421EPjeBE',
    description: 'Thermodynamique appliquée aux machines.',
    descriptionAr: 'الديناميكا الحرارية المطبقة على الآلات.',
    level: 'Terminale', year: '3AS', isFree: true, price: 0
  },

  // ===== 5. ÉLECTROTECHNIQUE | كهرباء =====
  {
    id: 11,
    title: 'Électricité — Circuits AC/DC',
    titleAr: 'الكهرباء — دوائر التيار المتردد والمستمر',
    instructor: 'Ing. Hichem Khelifi',
    rating: 4.9, students: 420,
    category: 'electric',
    subject: 'Électricité',
    subjectAr: 'الكهرباء',
    image: 'https://via.placeholder.com/300x180/22d3ee/white?text=Electricite',
    videoUrl: 'https://www.youtube.com/embed/ofme2o29ngU',
    description: 'Maîtriser les circuits électriques AC et DC.',
    descriptionAr: 'إتقان الدوائر الكهربائية للتيار المتردد والمستمر.',
    level: 'Terminale', year: '3AS', isFree: true, price: 0
  },
  {
    id: 12,
    title: 'Électronique — Semi-conducteurs',
    titleAr: 'الإلكترونيك — أشباه الموصلات',
    instructor: 'Ing. Djamel Mansouri',
    rating: 4.8, students: 360,
    category: 'electric',
    subject: 'Électronique',
    subjectAr: 'الإلكترونيك',
    image: 'https://via.placeholder.com/300x180/22d3ee/white?text=Electronique',
    videoUrl: 'https://www.youtube.com/embed/nu_pCVPKzTk',
    description: 'Les semi-conducteurs et composants électroniques.',
    descriptionAr: 'أشباه الموصلات والمكونات الإلكترونية.',
    level: 'Terminale', year: '3AS', isFree: true, price: 0
  },

  // ===== 6. GÉNIE CIVIL | هندسة مدنية =====
  {
    id: 13,
    title: 'Béton Armé — Bases et Calculs',
    titleAr: 'الخرسانة المسلحة — الأسس والحسابات',
    instructor: 'Ing. Mustapha Zerrouk',
    rating: 4.8, students: 310,
    category: 'civil',
    subject: 'Béton Armé',
    subjectAr: 'الخرسانة المسلحة',
    image: 'https://via.placeholder.com/300x180/a78bfa/white?text=Beton',
    videoUrl: 'https://www.youtube.com/embed/G3e-cpL7ofc',
    description: 'Calcul et conception du béton armé.',
    descriptionAr: 'حساب وتصميم الخرسانة المسلحة.',
    level: 'Terminale', year: '3AS', isFree: true, price: 0
  },
  {
    id: 14,
    title: 'Topographie et Métrés',
    titleAr: 'المساحة والكميات',
    instructor: 'Ing. Bilal Hadj Abderrahmane',
    rating: 4.7, students: 260,
    category: 'civil',
    subject: 'Topographie',
    subjectAr: 'المساحة',
    image: 'https://via.placeholder.com/300x180/a78bfa/white?text=Topo',
    videoUrl: 'https://www.youtube.com/embed/PkZNo7MFNFg',
    description: 'Topographie appliquée au génie civil.',
    descriptionAr: 'المساحة التطبيقية في الهندسة المدنية.',
    level: 'Terminale', year: '3AS', isFree: true, price: 0
  },

  // ===== 7. GESTION & ÉCONOMIE | تسيير واقتصاد =====
  {
    id: 15,
    title: 'Comptabilité Générale',
    titleAr: 'المحاسبة العامة',
    instructor: 'Prof. Leila Boumaza',
    rating: 4.9, students: 580,
    category: 'gestion',
    subject: 'Comptabilité',
    subjectAr: 'المحاسبة',
    image: 'https://via.placeholder.com/300x180/34d399/white?text=Compta',
    videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
    description: 'Maîtriser la comptabilité générale et les bilans.',
    descriptionAr: 'إتقان المحاسبة العامة والميزانيات.',
    level: 'Terminale', year: '3AS', isFree: true, price: 0
  },
  {
    id: 16,
    title: 'Économie — Marchés et Prix',
    titleAr: 'الاقتصاد — الأسواق والأسعار',
    instructor: 'Prof. Noureddine Gherbi',
    rating: 4.7, students: 450,
    category: 'gestion',
    subject: 'Économie',
    subjectAr: 'الاقتصاد',
    image: 'https://via.placeholder.com/300x180/34d399/white?text=Economie',
    videoUrl: 'https://www.youtube.com/embed/Oe421EPjeBE',
    description: 'Comprendre les marchés et la formation des prix.',
    descriptionAr: 'فهم الأسواق وتكوين الأسعار.',
    level: 'Terminale', year: '3AS', isFree: true, price: 0
  },

  // ===== 8. LETTRES & PHILOSOPHIE | آداب وفلسفة =====
  {
    id: 17,
    title: 'Philosophie — Épistémologie',
    titleAr: 'الفلسفة — نظرية المعرفة',
    instructor: 'Prof. Fatima Cherif',
    rating: 4.9, students: 620,
    category: 'lettres',
    subject: 'Philosophie',
    subjectAr: 'الفلسفة',
    image: 'https://via.placeholder.com/300x180/fb923c/white?text=Philo',
    videoUrl: 'https://www.youtube.com/embed/ofme2o29ngU',
    description: 'Épistémologie et théorie de la connaissance.',
    descriptionAr: 'نظرية المعرفة وفلسفة العلوم.',
    level: 'Terminale', year: '3AS', isFree: true, price: 0
  },
  {
    id: 18,
    title: 'Littérature Arabe — Poésie Moderne',
    titleAr: 'الأدب العربي — الشعر الحديث',
    instructor: 'Prof. Abdelkader Moussa',
    rating: 4.8, students: 390,
    category: 'lettres',
    subject: 'Littérature',
    subjectAr: 'الأدب',
    image: 'https://via.placeholder.com/300x180/fb923c/white?text=Litterature',
    videoUrl: 'https://www.youtube.com/embed/nu_pCVPKzTk',
    description: 'Analyse de la poésie arabe moderne.',
    descriptionAr: 'تحليل الشعر العربي الحديث.',
    level: 'Terminale', year: '3AS', isFree: true, price: 0
  }
];

export default courses;