export type Language = 'en' | 'mr' | 'hi';

export interface Translations {
  nav: {
    home: string;
    about: string;
    plans: string;
    calculator: string;
    services: string;
    claims: string;
    faqs: string;
    contact: string;
    login: string;
    dashboard: string;
    adminPortal: string;
    ctaButton: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    highlight1: string;
    highlight2: string;
    highlight3: string;
    authorizedAgentTag: string;
  };
  disclaimer: {
    badge: string;
    bannerText: string;
    nonCorporateDisclaimer: string;
    noGuaranteedReturns: string;
  };
  calculator: {
    title: string;
    subtitle: string;
    ageLabel: string;
    annualIncomeLabel: string;
    existingCoverLabel: string;
    dependentsLabel: string;
    loansLabel: string;
    expensesLabel: string;
    periodLabel: string;
    calculateBtn: string;
    resetBtn: string;
    estimatedCover: string;
    educationalNotice: string;
    breakdownTitle: string;
    expensesComponent: string;
    liabilitiesComponent: string;
    milestoneComponent: string;
    existingDeducted: string;
    discussionTitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    fullName: string;
    phone: string;
    email: string;
    city: string;
    category: string;
    preferredTime: string;
    preferredLanguage: string;
    message: string;
    consentText: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successMessage: string;
    referenceNumber: string;
    newEnquiryBtn: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Advisor',
      plans: 'Insurance Plans',
      calculator: 'Insurance Calculator',
      services: 'Services',
      claims: 'Claim Assistance',
      faqs: 'FAQs',
      contact: 'Contact',
      login: 'Customer Login',
      dashboard: 'Customer Portal',
      adminPortal: 'Admin Portal',
      ctaButton: 'Get Insurance Guidance',
    },
    hero: {
      headline: 'Protect What Matters. Plan for a Better Tomorrow.',
      subheadline:
        'Explore life insurance options with personalized guidance, clear explanations, and ongoing policy assistance from an authorized insurance advisor.',
      primaryCta: 'Explore Insurance Options',
      secondaryCta: 'Speak with the Advisor',
      highlight1: 'Personalized Insurance Guidance',
      highlight2: 'Policy Documentation Assistance',
      highlight3: 'Ongoing Customer Support',
      authorizedAgentTag: 'Authorized Insurance Advisory Services',
    },
    disclaimer: {
      badge: 'Statutory Compliance Notice',
      bannerText:
        'Independent Insurance Advisory Portal | Advisor: Dnyaneshwar Yedu Bhoi (Mobile: 9923835939 / 7972131176)',
      nonCorporateDisclaimer:
        'This website is operated by an independent insurance advisor and is not the official corporate website of Life Insurance Corporation of India. Insurance information is provided for general guidance and should be verified against applicable official policy documents.',
      noGuaranteedReturns:
        'Market-linked products (ULIPs) are subject to investment risks. Bonus rates and claim approvals are determined strictly in accordance with official insurer procedures.',
    },
    calculator: {
      title: 'Life Insurance Needs Calculator',
      subtitle:
        'Understand how much financial protection your family needs using structured Human Life Value and liability assessment principles.',
      ageLabel: 'Your Age (Years)',
      annualIncomeLabel: 'Annual Income (₹)',
      existingCoverLabel: 'Existing Active Life Cover (₹)',
      dependentsLabel: 'Number of Dependents',
      loansLabel: 'Outstanding Loans & Liabilities (₹)',
      expensesLabel: 'Estimated Annual Family Expenses (₹)',
      periodLabel: 'Desired Protection Period (Years)',
      calculateBtn: 'Calculate Protection Need',
      resetBtn: 'Reset',
      estimatedCover: 'Illustrative Insurance Protection Estimate',
      educationalNotice:
        'Note: This is an educational calculation to guide planning discussions with your advisor, not an official quotation or binding underwriting commitment.',
      breakdownTitle: 'Estimate Component Breakdown',
      expensesComponent: 'Family Expense Continuity',
      liabilitiesComponent: 'Outstanding Debt Liquidation',
      milestoneComponent: 'Dependents Future Milestones',
      existingDeducted: 'Existing Active Cover (Deducted)',
      discussionTitle: 'Recommended Discussion Points with Advisor',
    },
    contact: {
      title: 'Get Personalized Insurance Guidance',
      subtitle:
        'Share your requirements below. Advisor Dnyaneshwar Yedu Bhoi will review your query and provide dedicated guidance.',
      fullName: 'Full Name',
      phone: 'Mobile Number (10 Digits)',
      email: 'Email Address',
      city: 'Your City',
      category: 'Insurance Category of Interest',
      preferredTime: 'Preferred Contact Time',
      preferredLanguage: 'Preferred Language for Consultation',
      message: 'Your Query / Insurance Goals',
      consentText:
        'I consent to be contacted by LIC Insurance Advisor Dnyaneshwar Yedu Bhoi via call, email, or WhatsApp for insurance planning guidance.',
      submitBtn: 'Submit Advisory Request',
      submittingBtn: 'Registering Your Enquiry...',
      successTitle: 'Enquiry Registered Successfully!',
      successMessage:
        'Your inquiry has been securely stored in our system and an alert has been dispatched to the advisor.',
      referenceNumber: 'Enquiry Reference Number',
      newEnquiryBtn: 'Submit Another Inquiry',
    },
  },
  mr: {
    nav: {
      home: 'मुख्यपृष्ठ',
      about: 'सल्लागाराबद्दल',
      plans: 'विमा योजना',
      calculator: 'विमा गणकयंत्र',
      services: 'सेवा',
      claims: 'दावा साहाय्य',
      faqs: 'वारंवार विचारले जाणारे प्रश्न',
      contact: 'संपर्क',
      login: 'ग्राहक लॉगिन',
      dashboard: 'ग्राहक पोर्टल',
      adminPortal: 'प्रशासक पोर्टल',
      ctaButton: 'विमा मार्गदर्शन मिळवा',
    },
    hero: {
      headline: 'महत्त्वाच्या गोष्टींचे संरक्षण करा. उज्ज्वल भविष्याचे नियोजन करा.',
      subheadline:
        'अधिकृत विमा सल्लागार ज्ञानेश्वर येदू भोई यांच्याकडून वैयक्तिक मार्गदर्शन, स्पष्ट माहिती आणि निरंतर पॉलिसी साहाय्य मिळवा.',
      primaryCta: 'विमा योजना पहा',
      secondaryCta: 'सल्लागारांशी बोला',
      highlight1: 'वैयक्तिक विमा मार्गदर्शन',
      highlight2: 'पॉलिसी दस्तऐवजीकरण साहाय्य',
      highlight3: 'सतत ग्राहक सेवा व साहाय्य',
      authorizedAgentTag: 'अधिकृत विमा सल्लागार सेवा',
    },
    disclaimer: {
      badge: 'कायदेशीर अनुपालन सूचना',
      bannerText:
        'स्वतंत्र विमा सल्लागार पोर्टल | सल्लागार: ज्ञानेश्वर येदू भोई (मोबाईल: ९९२३८३५९३९ / ७९७२१३११७६)',
      nonCorporateDisclaimer:
        'ही वेबसाइट एका स्वतंत्र विमा सल्लागाराद्वारे चालवली जाते आणि ही भारतीय जीवन विमा निगम (LIC) ची अधिकृत कॉर्पोरेट वेबसाइट नाही. विमा माहिती केवळ मार्गदर्शनासाठी आहे.',
      noGuaranteedReturns:
        'बाजार-संलग्न योजना (ULIPs) गुंतवणुकीच्या जोखमीच्या अधीन असतात. दाव्याची मंजुरी अधिकृत विमा नियमांनुसार ठरवली जाते.',
    },
    calculator: {
      title: 'जीवन विमा गरज गणकयंत्र',
      subtitle: 'आपल्या कुटुंबाला किती आर्थिक संरक्षणाची गरज आहे याचे वास्तववादी मूल्यमापन करा.',
      ageLabel: 'तुमचे वय (वर्षे)',
      annualIncomeLabel: 'वार्षिक उत्पन्न (₹)',
      existingCoverLabel: 'सध्याचे विमा संरक्षण (₹)',
      dependentsLabel: 'अवलंबून असलेल्या व्यक्तींची संख्या',
      loansLabel: 'थकबाकी कर्जे आणि देणी (₹)',
      expensesLabel: 'अंदाजे वार्षिक कौटुंबिक खर्च (₹)',
      periodLabel: 'अपेक्षित संरक्षण कालावधी (वर्षे)',
      calculateBtn: 'संरक्षण गरजेची गणना करा',
      resetBtn: 'रीसेट करा',
      estimatedCover: 'अंदाजे विमा संरक्षण गरज',
      educationalNotice:
        'टीप: हे केवळ नियोजनासाठी शैक्षणिक गणकयंत्र आहे, अधिकृत कोटेशन किंवा अंतिम हमी नाही.',
      breakdownTitle: 'घटक तपशील',
      expensesComponent: 'कौटुंबिक खर्च सातत्य',
      liabilitiesComponent: 'कर्ज निवारण संरक्षण',
      milestoneComponent: 'भविष्यातील महत्त्वाचे खर्च',
      existingDeducted: 'सध्याचे विद्यमान कव्हर (वजा केले)',
      discussionTitle: 'सल्लागारांशी चर्चेचे मुद्दे',
    },
    contact: {
      title: 'वैयक्तिक विमा मार्गदर्शन मिळवा',
      subtitle:
        'आपली माहिती खाली भरा. विमा सल्लागार ज्ञानेश्वर येदू भोई आपल्याशी संपर्क साधतील.',
      fullName: 'पूर्ण नाव',
      phone: 'मोबाईल क्रमांक (१० अंक)',
      email: 'ईमेल पत्ता',
      city: 'तुमचे शहर',
      category: 'विमा वर्गवारी',
      preferredTime: 'संपर्काची सोयीची वेळ',
      preferredLanguage: 'संभाषणाची भाषा',
      message: 'तुमचा प्रश्न / उद्दिष्टे',
      consentText:
        'मी विमा मार्गदर्शनासाठी ज्ञानेश्वर येदू भोई यांच्याशी फोन, ईमेल किंवा व्हॉट्सॲपवर संपर्क साधण्यास सहमती देतो/देते.',
      submitBtn: 'चौकशी नोंदवा',
      submittingBtn: 'चौकशी नोंदवली जात आहे...',
      successTitle: 'चौकशी यशस्वीरित्या नोंदवली गेली!',
      successMessage:
        'आपली माहिती सुरक्षितपणे नोंदवली गेली आहे आणि सल्लागारांना सूचना पाठवण्यात आली आहे.',
      referenceNumber: 'चौकशी संदर्भ क्रमांक',
      newEnquiryBtn: 'दुसरी चौकशी नोंदवा',
    },
  },
  hi: {
    nav: {
      home: 'होम',
      about: 'सलाहकार के बारे में',
      plans: 'बीमा योजनाएं',
      calculator: 'बीमा कैलकुलेटर',
      services: 'सेवाएं',
      claims: 'दावा सहायता',
      faqs: 'सामान्य प्रश्न',
      contact: 'संपर्क',
      login: 'ग्राहक लॉगिन',
      dashboard: 'ग्राहक पोर्टल',
      adminPortal: 'एडमिन पोर्टल',
      ctaButton: 'बीमा मार्गदर्शन प्राप्त करें',
    },
    hero: {
      headline: 'जो अनमोल है उसकी रक्षा करें। बेहतर कल की योजना बनाएं।',
      subheadline:
        'अधिकृत बीमा सलाहकार ज्ञानेश्वर येदू भोई से व्यक्तिगत मार्गदर्शन, स्पष्ट जानकारी और निरंतर पॉलिसी सहायता प्राप्त करें।',
      primaryCta: 'बीमा योजनाएं देखें',
      secondaryCta: 'सलाहकार से बात करें',
      highlight1: 'व्यक्तिगत बीमा मार्गदर्शन',
      highlight2: 'पॉलिसी दस्तावेज़ीकरण सहायता',
      highlight3: 'सतत ग्राहक सेवा और समर्थन',
      authorizedAgentTag: 'अधिकृत जीवन बीमा सलाहकार सेवाएं',
    },
    disclaimer: {
      badge: 'वैधानिक अनुपालन सूचना',
      bannerText:
        'स्वतंत्र बीमा सलाहकार पोर्टल | सलाहकार: ज्ञानेश्वर येदू भोई (मोबाइल: 9923835939 / 7972131176)',
      nonCorporateDisclaimer:
        'यह वेबसाइट एक स्वतंत्र बीमा सलाहकार द्वारा संचालित है और भारतीय जीवन बीमा निगम (LIC) की आधिकारिक कॉर्पोरेट वेबसाइट नहीं है। बीमा जानकारी केवल सामान्य मार्गदर्शन के लिए है।',
      noGuaranteedReturns:
        'बाजार-आधारित योजनाएं (ULIP) निवेश जोखिमों के अधीन हैं। दावों की स्वीकृति आधिकारिक बीमा कंपनी के नियमों के अनुसार होती है।',
    },
    calculator: {
      title: 'जीवन बीमा आवश्यकता कैलकुलेटर',
      subtitle: 'पारिवारिक सुरक्षा और वित्तीय देनदारियों के आधार पर अपने आवश्यक बीमा कवर का आकलन करें।',
      ageLabel: 'आपकी आयु (वर्ष)',
      annualIncomeLabel: 'वार्षिक आय (₹)',
      existingCoverLabel: 'वर्तमान में सक्रिय बीमा कवर (₹)',
      dependentsLabel: 'आश्रितों की संख्या',
      loansLabel: 'बकाया ऋण और देनदारियां (₹)',
      expensesLabel: 'अनुमानित वार्षिक पारिवारिक व्यय (₹)',
      periodLabel: 'वांछित सुरक्षा अवधि (वर्ष)',
      calculateBtn: 'बीमा आवश्यकता की गणना करें',
      resetBtn: 'रीसेट करें',
      estimatedCover: 'अनुमानित आवश्यक बीमा सुरक्षा',
      educationalNotice:
        'नोट: यह केवल वित्तीय योजना में मार्गदर्शन के लिए एक शैक्षणिक अनुमान है, कोई आधिकारिक कोटेशन नहीं।',
      breakdownTitle: 'अनुमान घटक विवरण',
      expensesComponent: 'पारिवारिक व्यय निरंतरता',
      liabilitiesComponent: 'ऋण मुक्ति सुरक्षा',
      milestoneComponent: 'आश्रितों के भविष्य के मील के पत्थर',
      existingDeducted: 'वर्तमान सक्रिय कवर (घटाया गया)',
      discussionTitle: 'सलाहकार के साथ अनुशंसित चर्चा बिंदु',
    },
    contact: {
      title: 'व्यक्तिगत बीमा मार्गदर्शन प्राप्त करें',
      subtitle:
        'अपनी आवश्यकताएं नीचे साझा करें। सलाहकार ज्ञानेश्वर येदू भोई आपकी सहायता करेंगे।',
      fullName: 'पूरा नाम',
      phone: 'मोबाइल नंबर (10 अंक)',
      email: 'ईमेल पता',
      city: 'आपका शहर',
      category: 'रुचि की बीमा श्रेणी',
      preferredTime: 'संपर्क का पसंदीदा समय',
      preferredLanguage: 'परामर्श की पसंदीदा भाषा',
      message: 'आपका प्रश्न / बीमा लक्ष्य',
      consentText:
        'मैं बीमा मार्गदर्शन के लिए सलाहकार ज्ञानेश्वर येदू भोई द्वारा कॉल, ईमेल या व्हाट्सएप के माध्यम से संपर्क किए जाने की सहमति देता/देती हूँ।',
      submitBtn: 'जांच अनुरोध भेजें',
      submittingBtn: 'अनुरोध दर्ज किया जा रहा है...',
      successTitle: 'पूछताछ सफलतापूर्वक दर्ज की गई!',
      successMessage:
        'आपकी पूछताछ सुरक्षित रूप से दर्ज कर ली गई है और सलाहकार को सूचित कर दिया गया है।',
      referenceNumber: 'पूछताछ संदर्भ संख्या',
      newEnquiryBtn: 'एक और पूछताछ भेजें',
    },
  },
};
