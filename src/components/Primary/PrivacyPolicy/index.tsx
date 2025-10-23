// pages/privacy-policy.tsx

import React from 'react';
import Head from 'next/head';
export const privacyPolicySections2 = [
  {
    id: 1,
    title: "1. परिचय",
    heading: "आपकी गोपनीयता के प्रति हमारी प्रतिबद्धता",
    banner: "गोपनीयता नीति",
    content:
      "आपकी गोपनीयता हमारे लिए महत्वपूर्ण है। यह गोपनीयता नीति बताती है कि जब आप हमारी वेबसाइट या सेवाओं का उपयोग करते हैं, तो हम आपकी व्यक्तिगत जानकारी कैसे एकत्र करते हैं, उपयोग करते हैं और उसकी सुरक्षा करते हैं। हमारे प्लेटफ़ॉर्म का उपयोग करके, आप नीचे वर्णित शर्तों से सहमत होते हैं। हम आपको इस नीति को ध्यान से पढ़ने के लिए प्रोत्साहित करते हैं ताकि आप समझ सकें कि आपकी जानकारी कैसे संभाली जाती है।"
  },
  {
    id: 2,
    title: "2. हम कौन सी जानकारी एकत्र करते हैं",
    content:
      "हम आपके अनुभव को बेहतर बनाने और हमारी वेबसाइट के सुचारू संचालन के लिए व्यक्तिगत और गैर-व्यक्तिगत दोनों प्रकार की जानकारी एकत्र करते हैं। इसमें शामिल हो सकता है:",
    list: [
      "आपका नाम, ईमेल पता और फ़ोन नंबर जैसी व्यक्तिगत जानकारी।",
      "फॉर्म, सर्वेक्षण या साइन-अप प्रक्रिया के माध्यम से दी गई जानकारी।",
      "उपयोग डेटा जैसे कि IP पता, ब्राउज़र प्रकार, और देखे गए पृष्ठ।",
      "कुकीज़ और समान ट्रैकिंग तकनीकें जो साइट के प्रदर्शन को बेहतर बनाती हैं।"
    ]
  },
  {
    id: 3,
    title: "3. हम आपकी जानकारी का उपयोग कैसे करते हैं",
    content:
      "हम जो डेटा एकत्र करते हैं वह हमें एक सहज अनुभव प्रदान करने, अपनी सामग्री में सुधार करने और आपके साथ प्रभावी ढंग से संवाद करने में मदद करता है। हम आपकी जानकारी का उपयोग निम्नलिखित के लिए करते हैं:",
    list: [
      "पूछताछ, प्रतिक्रिया या सेवा अनुरोधों का उत्तर देने के लिए।",
      "हमारे प्लेटफ़ॉर्म पर उपयोगकर्ता अनुभव को वैयक्तिकृत और बेहतर बनाने के लिए।",
      "महत्वपूर्ण अपडेट, न्यूज़लेटर या प्रचार सामग्री भेजने के लिए (केवल यदि आपने सहमति दी है)।",
      "वेबसाइट प्रदर्शन को बढ़ाने के लिए उपयोग पैटर्न की निगरानी और विश्लेषण करने के लिए।"
    ]
  },
  {
    id: 4,
    title: "4. डेटा सुरक्षा",
    content:
      "हम आपकी व्यक्तिगत जानकारी की सुरक्षा को प्राथमिकता देते हैं। सभी डेटा सुरक्षित सर्वर पर संग्रहीत किए जाते हैं और उचित प्रशासनिक, तकनीकी और भौतिक सुरक्षा उपायों द्वारा सुरक्षित होते हैं। हालांकि, कृपया ध्यान दें कि इंटरनेट पर डेटा ट्रांसमिशन का कोई भी तरीका 100% सुरक्षित नहीं होता।"
  },
  {
    id: 5,
    title: "5. आपकी जानकारी साझा करना",
    content:
      "हम आपकी व्यक्तिगत जानकारी को किसी तीसरे पक्ष को नहीं बेचते या किराए पर नहीं देते। हालांकि, हम विश्वसनीय साझेदारों या सेवा प्रदाताओं के साथ सीमित जानकारी साझा कर सकते हैं जो हमारी वेबसाइट चलाने या सेवाएं प्रदान करने में मदद करते हैं — हमेशा सख्त गोपनीयता समझौतों के तहत और केवल वैध व्यावसायिक उद्देश्यों के लिए।"
  },
  {
    id: 6,
    title: "6. आपके अधिकार",
    content:
      "आपकी व्यक्तिगत जानकारी पर आपका पूरा नियंत्रण है। आप किसी भी समय अपने डेटा तक पहुंच, संशोधन या उसे हटाने का अनुरोध कर सकते हैं। आप हमारे ईमेल से सदस्यता समाप्त करने या जहां लागू हो, अपनी सहमति वापस लेने का विकल्प भी चुन सकते हैं।"
  },
  {
    id: 7,
    title: "7. इस नीति में बदलाव",
    content:
      "हम समय-समय पर इस गोपनीयता नीति को अद्यतन कर सकते हैं ताकि हमारे अभ्यासों में हुए बदलावों या कानूनी कारणों को प्रतिबिंबित किया जा सके। कोई भी संशोधन इस पृष्ठ पर अद्यतन तिथि के साथ पोस्ट किया जाएगा।"
  },
  {
    id: 8,
    title: "8. हमसे संपर्क करें",
    content:
      "यदि आपके पास इस गोपनीयता नीति से संबंधित कोई प्रश्न, चिंता या अनुरोध है, तो कृपया हमसे support@example.com पर संपर्क करें। हम यह सुनिश्चित करने के लिए प्रतिबद्ध हैं कि आपका अनुभव हमारे साथ सुरक्षित, पारदर्शी और आपकी गोपनीयता के प्रति सम्मानजनक बना रहे।"
  }
];


export const privacyPolicySections = [
  {
    id: 1,
    title: "1. Introduction",
    heading: "Our Commitment to Your Privacy",
    banner: "Privacy Policy",
    content: "Your privacy matters to us. This Privacy Policy explains how we collect, use, and protect your personal information when you engage with our website or services. By accessing our platform, you agree to the terms described below. We encourage you to read this policy carefully to understand how your information is handled."
  },
  {
    id: 2,
    title: "2. Information We Collect",
    content: "We collect both personal and non-personal information to improve your experience and ensure smooth operation of our website. This may include:",
    list: [
      "Personal details such as your name, email address, and phone number.",
      "Information submitted through forms, surveys, or sign-up processes.",
      "Usage data, including IP address, browser type, and pages visited.",
      "Cookies and similar tracking technologies to enhance site performance."
    ]
  },
  {
    id: 3,
    title: "3. How We Use Your Information",
    content: "The data we collect allows us to provide a seamless experience, improve our content, and communicate effectively with you. We use your information to:",
    list: [
      "Respond to inquiries, feedback, or service requests.",
      "Personalize and improve user experience on our platform.",
      "Send important updates, newsletters, or promotional materials (only if you opt-in).",
      "Monitor and analyze usage patterns to enhance website performance."
    ]
  },
  {
    id: 4,
    title: "4. Data Protection",
    content: "We prioritize the security of your personal data. All information is stored using secure servers and protected by appropriate administrative, technical, and physical safeguards. While we strive to ensure the highest level of security, please note that no method of electronic storage or transmission over the internet is 100% secure."
  },
  {
    id: 5,
    title: "5. Sharing Your Information",
    content: "We do not sell or rent your personal data to third parties. However, we may share limited information with trusted partners or service providers who help us operate our website or deliver services — always under strict confidentiality agreements and only for legitimate business purposes."
  },
  {
    id: 6,
    title: "6. Your Rights",
    content: "You have full control over your personal information. You may request access, correction, or deletion of your data at any time. You can also choose to unsubscribe from our emails or withdraw consent where applicable."
  },
  {
    id: 7,
    title: "7. Changes to This Policy",
    content: "We may update this Privacy Policy periodically to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any modifications will be posted on this page with an updated revision date."
  },
  {
    id: 8,
    title: "8. Contact Us",
    content: "If you have any questions, concerns, or requests related to this Privacy Policy, please contact us at support@example.com. We are here to ensure your experience with us remains safe, transparent, and respectful of your privacy."
  }
];

export default function PrivacyPolicyPage() {

  return (
    <>
      {/* Main Content */}
      <section className="bg-gray-50 py-5 lg:py-16 lg:px-4">
        <div className="max-w-5xl mx-auto space-y-2 lg:space-y-12">
          {privacyPolicySections.map((section) => (
            <div
              key={section.id}
              className="bg-white lg:shadow-lg rounded-xl px-4 py-4 md:px-8 md:py-8 transition-transform duration-300 hover:scale-[1.02]"
            >
              <h2 className=" text-xl lg:text-2xl font-semibold text-gray-800 mb-4 ">{section.title}</h2>
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
              {section.list && (
                <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
                  {section.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-white border-t border-gray-200 py-12 lg:mt-10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-xl font-medium text-gray-800">Still have questions?</h3>
          <p className="text-gray-600 mt-2">
            Contact our support team at{" "}
            <a href="mailto:support@example.com" className="text-blue-600 underline">
              support@example.com
            </a>{" "}
            and we’ll be happy to help.
          </p>
        </div>
      </section>
    </>
  );
}
