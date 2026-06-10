import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

// ===== ALL TRANSLATIONS =====
export const translations = {
  en: {
    // Navbar
    home:       'Home',
    courses:    'Courses',
    about:      'About',
    login:      'Login',
    signup:     'Sign Up',
    logout:     'Logout',
    dashboard:  'Dashboard',

    // Hero
    heroTag:    '🚀 The Future of Learning is Here',
    heroTitle1: 'Learn Without',
    heroTitle2: 'Limits',
    heroTitle3: 'Build Your Future Today',
    heroDesc:   'Master modern tech skills with world-class video courses. Join thousands of developers building their dream careers.',
    heroBtnStart: '🚀 Start Learning Free',
    heroBtnJoin:  '✨ Join the Community',

    // Stats
    students:   'Active Students',
    coursesLbl: 'Video Courses',
    satisfaction:'Satisfaction Rate',
    hours:      'Hours of Content',

    // Features
    whyTag:     'WHY LEARNIFY',
    whyTitle:   'Everything You Need to',
    whyTitleHL: 'Succeed',
    whySub:     'Built for the next generation of developers',

    feat1Title: 'HD Video Lessons',
    feat1Desc:  'Watch crystal-clear courses from YouTube and top instructors worldwide.',
    feat2Title: 'Track Your Progress',
    feat2Desc:  'Smart progress tracking keeps you motivated and on the right path.',
    feat3Title: 'Earn Certificates',
    feat3Desc:  'Complete courses and earn certificates to showcase your skills.',
    feat4Title: 'Community Support',
    feat4Desc:  'Join a community of passionate learners and get help when you need it.',
    feat5Title: 'Activation System',
    feat5Desc:  'Simple one-time activation code gives you lifetime access to all content.',
    feat6Title: 'Learn Anywhere',
    feat6Desc:  'Access your courses on any device, anytime, anywhere in the world.',

    // Courses
    coursesTag:   'COURSES',
    coursesTitle: 'Start Learning',
    coursesTitleHL:'Today',
    coursesSub:   'Hand-picked courses to boost your career',
    searchPlaceholder: 'Search courses, topics, skills...',
    allCourses:   'All',
    frontend:     'Frontend',
    backend:      'Backend',
    fullstack:    'Full Stack',
    coursesFound: 'courses found',
    viewAll:      'View All Courses →',
    watchNow:     'Watch Now',
    noResults:    'No courses found for',
    clearSearch:  'Clear Search',

    // How it works
    howTag:    'HOW IT WORKS',
    howTitle:  'Start in',
    howTitleHL:'3 Simple Steps',
    step1Title:'Create Account',
    step1Desc: 'Sign up for free in seconds. No credit card required.',
    step2Title:'Activate Access',
    step2Desc: 'Enter your activation code to unlock all premium courses.',
    step3Title:'Start Learning',
    step3Desc: 'Watch videos, track progress, and earn certificates.',

    // CTA
    ctaTitle:  'Ready to Start Your',
    ctaTitleHL:'Journey?',
    ctaSub:    'Join thousands of students already learning on Learnify',
    ctaBtn1:   'Get Started Free →',
    ctaBtn2:   '🔑 Activate Code',

    // Auth
    welcomeBack:    'Welcome Back!',
    loginSubtitle:  'Login to continue learning',
    emailLabel:     'Email Address',
    passwordLabel:  'Password',
    forgotPassword: 'Forgot password?',
    loginBtn:       'Login →',
    loggingIn:      '⏳ Logging in...',
    noAccount:      "Don't have an account?",
    signUpFree:     'Sign Up Free',
    orText:         'or',
    googleLogin:    'Continue with Google',

    createAccount:  'Create Your Account',
    registerSub:    'Start learning for free today',
    nameLabel:      'Full Name',
    confirmLabel:   'Confirm Password',
    roleLabel:      'I want to join as',
    studentRole:    '🎓 Student',
    instructorRole: '👨‍🏫 Instructor',
    registerBtn:    'Create Account →',
    creating:       '⏳ Creating account...',
    haveAccount:    'Already have an account?',

    // Dashboard
    myProfile:    'My Profile',
    myProgress:   'My Progress',
    createCourse: 'Create Course',
    adminPanel:   'Admin Panel',
    activateAcc:  'Activate Account',
    logoutBtn:    'Logout',
    fullName:     'Full Name',
    email:        'Email',
    role:         'Role',
    accountType:  'Account Type',
    memberSince:  'Member Since',
    watched:      'Watched Courses',
    completed:    'Completed',
    certificates: 'Certificates',

    // Footer
    platform:    'Platform',
    categories:  'Categories',
    contact:     'Contact',
    footerDesc:  'Learn without limits. Free courses for everyone, everywhere.',
    footerRights:'Built with ❤️ for learners everywhere.',
  },

  ar: {
    // Navbar
    home:       'الرئيسية',
    courses:    'الدورات',
    about:      'عن المنصة',
    login:      'تسجيل الدخول',
    signup:     'إنشاء حساب',
    logout:     'تسجيل الخروج',
    dashboard:  'لوحة التحكم',

    // Hero
    heroTag:    '🚀 مستقبل التعلم بدأ الآن',
    heroTitle1: 'تعلّم بلا',
    heroTitle2: 'حدود',
    heroTitle3: 'ابنِ مستقبلك اليوم',
    heroDesc:   'أتقن مهارات التقنية الحديثة مع دورات فيديو عالمية المستوى. انضم إلى آلاف المطورين الذين يبنون مسيرتهم المهنية.',
    heroBtnStart: '🚀 ابدأ التعلم مجاناً',
    heroBtnJoin:  '✨ انضم للمجتمع',

    // Stats
    students:    'طالب نشط',
    coursesLbl:  'دورة فيديو',
    satisfaction:'نسبة الرضا',
    hours:       'ساعة محتوى',

    // Features
    whyTag:     'لماذا ليرنيفاي',
    whyTitle:   'كل ما تحتاجه لـ',
    whyTitleHL: 'النجاح',
    whySub:     'مبني لجيل المطورين القادم',

    feat1Title: 'دروس فيديو عالية الجودة',
    feat1Desc:  'شاهد دورات واضحة من يوتيوب وأفضل المدرسين حول العالم.',
    feat2Title: 'تتبع تقدمك',
    feat2Desc:  'نظام تتبع ذكي يبقيك متحفزاً على المسار الصحيح.',
    feat3Title: 'احصل على شهادات',
    feat3Desc:  'أكمل الدورات واحصل على شهادات لإبراز مهاراتك.',
    feat4Title: 'دعم المجتمع',
    feat4Desc:  'انضم لمجتمع من المتعلمين المتحمسين واحصل على المساعدة.',
    feat5Title: 'نظام التفعيل',
    feat5Desc:  'رمز تفعيل بسيط يمنحك وصولاً مدى الحياة لكل المحتوى.',
    feat6Title: 'تعلّم في أي مكان',
    feat6Desc:  'ادخل لدوراتك من أي جهاز، في أي وقت، من أي مكان.',

    // Courses
    coursesTag:    'الدورات',
    coursesTitle:  'ابدأ التعلم',
    coursesTitleHL:'اليوم',
    coursesSub:    'دورات مختارة بعناية لتعزيز مسيرتك المهنية',
    searchPlaceholder: 'ابحث عن دورات، مواضيع، مهارات...',
    allCourses:    'الكل',
    frontend:      'الواجهة الأمامية',
    backend:       'الواجهة الخلفية',
    fullstack:     'فول ستاك',
    coursesFound:  'دورة متاحة',
    viewAll:       'عرض كل الدورات ←',
    watchNow:      'شاهد الآن',
    noResults:     'لا توجد دورات لـ',
    clearSearch:   'مسح البحث',

    // How it works
    howTag:    'كيف تعمل المنصة',
    howTitle:  'ابدأ في',
    howTitleHL:'3 خطوات بسيطة',
    step1Title:'أنشئ حسابك',
    step1Desc: 'سجل مجاناً في ثوانٍ. لا بطاقة ائتمانية مطلوبة.',
    step2Title:'فعّل وصولك',
    step2Desc: 'أدخل رمز التفعيل لفتح جميع الدورات المميزة.',
    step3Title:'ابدأ التعلم',
    step3Desc: 'شاهد الفيديوهات، تتبع تقدمك، واحصل على شهادات.',

    // CTA
    ctaTitle:  'هل أنت مستعد لبدء',
    ctaTitleHL:'رحلتك؟',
    ctaSub:    'انضم لآلاف الطلاب الذين يتعلمون على ليرنيفاي',
    ctaBtn1:   'ابدأ مجاناً ←',
    ctaBtn2:   '🔑 تفعيل الرمز',

    // Auth
    welcomeBack:    'مرحباً بعودتك!',
    loginSubtitle:  'سجل دخولك لمواصلة التعلم',
    emailLabel:     'البريد الإلكتروني',
    passwordLabel:  'كلمة المرور',
    forgotPassword: 'نسيت كلمة المرور؟',
    loginBtn:       'تسجيل الدخول ←',
    loggingIn:      '⏳ جاري تسجيل الدخول...',
    noAccount:      'ليس لديك حساب؟',
    signUpFree:     'سجل مجاناً',
    orText:         'أو',
    googleLogin:    'المتابعة بحساب جوجل',

    createAccount:  'إنشاء حسابك',
    registerSub:    'ابدأ التعلم مجاناً اليوم',
    nameLabel:      'الاسم الكامل',
    confirmLabel:   'تأكيد كلمة المرور',
    roleLabel:      'أريد الانضمام كـ',
    studentRole:    '🎓 طالب',
    instructorRole: '👨‍🏫 مدرس',
    registerBtn:    'إنشاء الحساب ←',
    creating:       '⏳ جاري إنشاء الحساب...',
    haveAccount:    'لديك حساب بالفعل؟',

    // Dashboard
    myProfile:    'ملفي الشخصي',
    myProgress:   'تقدمي',
    createCourse: 'إنشاء دورة',
    adminPanel:   'لوحة الإدارة',
    activateAcc:  'تفعيل الحساب',
    logoutBtn:    'تسجيل الخروج',
    fullName:     'الاسم الكامل',
    email:        'البريد الإلكتروني',
    role:         'الدور',
    accountType:  'نوع الحساب',
    memberSince:  'عضو منذ',
    watched:      'الدورات المشاهدة',
    completed:    'المكتملة',
    certificates: 'الشهادات',

    // Footer
    platform:    'المنصة',
    categories:  'الفئات',
    contact:     'تواصل معنا',
    footerDesc:  'تعلّم بلا حدود. دورات مجانية للجميع، في كل مكان.',
    footerRights:'صُنع بـ ❤️ للمتعلمين في كل مكان.',
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    localStorage.getItem('lang') || 'en'
  );

  useEffect(() => {
    localStorage.setItem('lang', lang);
    // Set RTL for Arabic
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    // Add/remove Arabic font
    if (lang === 'ar') {
      document.body.style.fontFamily = "'Cairo', 'Segoe UI', sans-serif";
    } else {
      document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    }
  }, [lang]);

  const t = translations[lang];
  const toggleLang = () => setLang(l => l === 'en' ? 'ar' : 'en');
  const isRTL = lang === 'ar';

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

export default LanguageContext;