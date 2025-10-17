"use client";
import React from "react";
import Banner from "@/src/components/PageBanner/Banner";
import { useLanguage } from "@/src/contexts/LanguageContext";

const PrivacyPolicy = () => {
  const { currentLanguage: lang } = useLanguage();

  const text = {
    en: {
      heading: "Our Commitment to Your Privacy",
      moto: "Privacy Policy",
      sections: [
        {
          title: "1. Introduction",
          content: `Your privacy matters to us. This Privacy Policy explains how we collect, use, and protect your personal information when you engage with our website or services. By accessing our platform, you agree to the terms described below. We encourage you to read this policy carefully to understand how your information is handled.`,
        },
        {
          title: "2. Information We Collect",
          content: `We collect both personal and non-personal information to improve your experience and ensure smooth operation of our website. This may include:`,
          list: [
            "Personal details such as your name, email address, and phone number.",
            "Information submitted through forms, surveys, or sign-up processes.",
            "Usage data, including IP address, browser type, and pages visited.",
            "Cookies and similar tracking technologies to enhance site performance.",
          ],
        },
        {
          title: "3. How We Use Your Information",
          content: `The data we collect allows us to provide a seamless experience, improve our content, and communicate effectively with you. We use your information to:`,
          list: [
            "Respond to inquiries, feedback, or service requests.",
            "Personalize and improve user experience on our platform.",
            "Send important updates, newsletters, or promotional materials (only if you opt-in).",
            "Monitor and analyze usage patterns to enhance website performance.",
          ],
        },
        {
          title: "4. Data Protection",
          content: `We prioritize the security of your personal data. All information is stored using secure servers and protected by appropriate administrative, technical, and physical safeguards. While we strive to ensure the highest level of security, please note that no method of electronic storage or transmission over the internet is 100% secure.`,
        },
        {
          title: "5. Sharing Your Information",
          content: `We do not sell or rent your personal data to third parties. However, we may share limited information with trusted partners or service providers who help us operate our website or deliver services — always under strict confidentiality agreements and only for legitimate business purposes.`,
        },
        {
          title: "6. Your Rights",
          content: `You have full control over your personal information. You may request access, correction, or deletion of your data at any time. You can also choose to unsubscribe from our emails or withdraw consent where applicable.`,
        },
        {
          title: "7. Changes to This Policy",
          content: `We may update this Privacy Policy periodically to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any modifications will be posted on this page with an updated revision date.`,
        },
        {
          title: "8. Contact Us",
          content: `If you have any questions, concerns, or requests related to this Privacy Policy, please contact us at support@example.com. We are here to ensure your experience with us remains safe, transparent, and respectful of your privacy.`,
        },
      ],
    },

    hi: {
      heading: "आपकी गोपनीयता के प्रति हमारी प्रतिबद्धता",
      moto: "गोपनीयता नीति",
      sections: [
        {
          title: "1. परिचय",
          content: `आपकी गोपनीयता हमारे लिए महत्वपूर्ण है। यह गोपनीयता नीति बताती है कि जब आप हमारी वेबसाइट या सेवाओं का उपयोग करते हैं, तो हम आपकी व्यक्तिगत जानकारी को कैसे एकत्रित, उपयोग और सुरक्षित करते हैं। हमारे प्लेटफ़ॉर्म का उपयोग करके, आप नीचे दिए गए नियमों से सहमत होते हैं। कृपया इस नीति को ध्यान से पढ़ें ताकि आप समझ सकें कि आपकी जानकारी को कैसे संभाला जाता है।`,
        },
        {
          title: "2. हम कौन सी जानकारी एकत्र करते हैं",
          content: `हम आपकी सुविधा और हमारी वेबसाइट के सुचारू संचालन के लिए व्यक्तिगत और गैर-व्यक्तिगत जानकारी एकत्र करते हैं। इसमें शामिल हो सकता है:`,
          list: [
            "व्यक्तिगत विवरण जैसे आपका नाम, ईमेल पता और फोन नंबर।",
            "फ़ॉर्म, सर्वेक्षण या साइन-अप प्रक्रियाओं के माध्यम से जमा की गई जानकारी।",
            "उपयोग डेटा, जैसे IP पता, ब्राउज़र प्रकार और देखे गए पृष्ठ।",
            "साइट प्रदर्शन बढ़ाने के लिए कुकीज़ और समान ट्रैकिंग तकनीकें।",
          ],
        },
        {
          title: "3. हम आपकी जानकारी का उपयोग कैसे करते हैं",
          content: `हम जो डेटा एकत्र करते हैं, उसका उपयोग एक सहज अनुभव प्रदान करने, हमारे कंटेंट में सुधार करने और आपसे प्रभावी ढंग से संवाद करने के लिए किया जाता है। हम आपकी जानकारी का उपयोग करते हैं:`,
          list: [
            "प्रश्नों, प्रतिक्रियाओं या सेवा अनुरोधों का उत्तर देने के लिए।",
            "हमारे प्लेटफ़ॉर्म पर उपयोगकर्ता अनुभव को वैयक्तिकृत और बेहतर बनाने के लिए।",
            "महत्वपूर्ण अपडेट, न्यूज़लेटर या प्रचार सामग्री भेजने के लिए (केवल यदि आप सहमति दें)।",
            "वेबसाइट प्रदर्शन को बढ़ाने के लिए उपयोग पैटर्न की निगरानी और विश्लेषण करने के लिए।",
          ],
        },
        {
          title: "4. डेटा सुरक्षा",
          content: `हम आपके व्यक्तिगत डेटा की सुरक्षा को प्राथमिकता देते हैं। सभी जानकारी सुरक्षित सर्वरों का उपयोग करके संग्रहीत की जाती है और उपयुक्त प्रशासनिक, तकनीकी और भौतिक सुरक्षा उपायों द्वारा संरक्षित की जाती है। हालांकि हम उच्चतम स्तर की सुरक्षा सुनिश्चित करने का प्रयास करते हैं, कृपया ध्यान दें कि इंटरनेट पर कोई भी भंडारण या संचार विधि 100% सुरक्षित नहीं है।`,
        },
        {
          title: "5. आपकी जानकारी साझा करना",
          content: `हम आपकी व्यक्तिगत जानकारी को तीसरे पक्ष को नहीं बेचते या किराए पर नहीं देते। हालाँकि, हम सीमित जानकारी विश्वसनीय भागीदारों या सेवा प्रदाताओं के साथ साझा कर सकते हैं जो हमारी वेबसाइट को संचालित करने या सेवाएं प्रदान करने में हमारी मदद करते हैं — हमेशा गोपनीयता समझौतों के तहत और केवल वैध व्यावसायिक उद्देश्यों के लिए।`,
        },
        {
          title: "6. आपके अधिकार",
          content: `आपको अपनी व्यक्तिगत जानकारी पर पूर्ण नियंत्रण प्राप्त है। आप किसी भी समय अपने डेटा तक पहुंच, संशोधन या हटाने का अनुरोध कर सकते हैं। आप हमारी ईमेल सदस्यता रद्द कर सकते हैं या जहां लागू हो अपनी सहमति वापस ले सकते हैं।`,
        },
        {
          title: "7. इस नीति में परिवर्तन",
          content: `हम समय-समय पर इस गोपनीयता नीति को अद्यतन कर सकते हैं ताकि हमारी प्रथाओं में हुए परिवर्तनों या अन्य परिचालन, कानूनी या नियामक कारणों को दर्शाया जा सके। कोई भी संशोधन इस पृष्ठ पर अद्यतन तिथि के साथ पोस्ट किया जाएगा।`,
        },
        {
          title: "8. हमसे संपर्क करें",
          content: `यदि आपके पास इस गोपनीयता नीति से संबंधित कोई प्रश्न, चिंता या अनुरोध है, तो कृपया support@example.com पर हमसे संपर्क करें। हम यह सुनिश्चित करने के लिए यहां हैं कि आपका अनुभव सुरक्षित, पारदर्शी और आपकी गोपनीयता के प्रति सम्मानजनक बना रहे।`,
        },
      ],
    },
  };

  return (
    <div>
      <Banner Heading={text[lang].heading} BannerMoto={text[lang].moto} />

      <section className="max-w-4xl mx-auto px-4 py-12 text-gray-700 leading-relaxed">
        {text[lang].sections.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <p className="mb-6">{section.content}</p>
            {section.list && (
              <ul className="list-disc list-outside pl-4 mb-6 space-y-2">
                {section.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default PrivacyPolicy;
