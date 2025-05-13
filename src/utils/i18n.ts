import { create } from 'zustand';

type Language = 'en' | 'ar' | 'fr';

interface I18nState {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Translation strings
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.products': 'Products',
    'nav.inquiry': 'Request Quotation',
    'nav.contact': 'Contact',
    //Header
    'logo.title':'ROODAN',
    
    // Hero
    'hero.title': 'Roodan General Trading',
    'hero.subtitle': 'Global quality products with reliable service',
    'hero.cta': 'Explore Products',
    
    // Strengths
    'strengths.title': 'Our Strengths',
    'strengths.quality.title': 'Quality',
    'strengths.quality.desc': 'our products are sourced from experienced and reliable suppliers who are shortlisted by our field team',
    'strengths.reliability.title': 'Reliability',
    'strengths.reliability.desc': 'we work with trusted partners who are an integrated part of our supply chain that provide an end to end solution with 100% transparency',
    'strengths.partnership.title': 'Partnership',
    'strengths.partnership.desc': 'Our long term partnerships with all our stakeholders is built upon long standing trust and transparency',
    'strengths.flexibility.title': 'Customised Solution',
    'strengths.flexibility.desc': 'We provide tailor made export solutions as per customer needs',
    
    // Products
    'products.title': 'Our Products',
    'products.description': 'Discover our comprehensive range of premium quality products, sourced from trusted global suppliers.',
    'products.viewAll': 'View All Products',
    'products.viewDetails': 'View Details',
    'products.sugar': 'Sugar',
    'products.sugarDesc': 'ICUMSA 45, ICUMSA 100, ICUMSA 150',
    'products.soy': 'Soy Products',
    'products.soyDesc': 'Soybeans, Soy Flour, Soy Oil',
    'products.coffee': 'Coffee Beans',
    'products.coffeeDesc': 'Robusta & Arabica',
    'products.meat': 'Meat Products',
    'products.meatDesc': 'Buffalo Meat, Chicken & Cow Ghee',
    'products.oil': 'Vegetable Oils',
    'products.oilDesc': 'CP8, CP10 & Olive Oil, soyabean oil, sunflower oil & avacado oil ',
    'products.rice': 'Rice',
    'products.riceDesc': 'Basmati, Jasmine & White Rice',
    'products.olive': 'Olive Oil',
    'products.urea': 'Urea & Fertilizers',
    'products.petroleum': 'Petroleum Products',
    'products.petroleumDesc': 'EN 590, D2, AGO, Jet A1',
    'products.searchPlaceholder': 'Search products...',
    'products.categories.all': 'All Products',
    'products.categories.food': 'Food Products',
    'products.categories.oils': 'Oils',
    'products.categories.agri': 'Agricultural',
    'products.categories.petro': 'Petroleum',
    'products.requestQuote': 'Request Quote',
    'products.noProductsFound': 'No products found',
    'products.noProductsMatching': 'No products matching "{query}" in {category} category.',
    'products.noProductsInCategory': 'No products available in the {category} category.',
    'products.clearFilters': 'Clear filters',
    
    // Product Details
    'product.sugar.title': 'Sugar ICUMSA',
    'product.sugar.description': 'Premium sugar with various ICUMSA grades from Brazil',
    'product.sugar.detail1': 'ICUMSA 45 (white sugar), ICUMSA 100 (raw sugar), ICUMSA 150',
    'product.sugar.detail2': 'Packaging: 50 kg bags or big bags',
    'product.sugar.detail3': 'Delivery: CIF, FOB, etc.',
    
    'product.soy.title': 'Soy Products',
    'product.soy.description': 'High-quality soy products for various applications',
    'product.soy.detail1': 'Soybeans (GMO-free on request), soy flour, soy oil',
    'product.soy.detail2': 'Packaging: According to customer requirements',
    'product.soy.detail3': 'Delivery: Worldwide, flexible',
    
    'product.coffee.title': 'Coffee Beans',
    'product.coffee.description': 'Premium Robusta and Arabica coffee beans',
    'product.coffee.detail1': 'Robusta (strong) and Arabica (mild)',
    'product.coffee.detail2': 'Origin: South America, Asia, Africa',
    'product.coffee.detail3': 'Packaging: 50 kg bags or big bags',
    
    'product.beef.title': 'Buffalo Meat (HALAL)',
    'product.beef.description': 'Premium quality Buffalo Meat from India',
    'product.beef.detail1': 'Frozen Buffalo Meat, various cuts',
    'product.beef.detail2': 'Packaging: Frozen goods',
    'product.beef.detail3': 'Delivery: Worldwide',
    
    'product.chicken.title': 'Chicken Meat',
    'product.chicken.description': 'Various chicken products of the highest quality',
    'product.chicken.detail1': 'Whole chickens, chicken breasts, chicken legs, chicken wings',
    'product.chicken.detail2': 'Packaging: Frozen goods',
    'product.chicken.detail3': 'Delivery: Worldwide',
    
    'product.ghee.title': 'Ghee',
    'product.ghee.description': 'Pure ghee from India',
    'product.ghee.detail1': '100% pure ghee',
    'product.ghee.detail2': 'Packaging: 1 kg cans, 15 kg buckets',
    'product.ghee.detail3': 'Delivery: Worldwide',
    
    'product.vegetable.title': 'Vegetable Oils',
    'product.vegetable.description': 'High-quality vegetable oils CP8 and CP10 from Asia',
    'product.vegetable.detail1': 'Palm oil, various packaging sizes, soyabean oil, sunflower oil, &avacado oil',
    'product.vegetable.detail2': 'Delivery: CIF, FOB or by arrangement',
    'product.vegetable.detail3': 'Premium quality for food and industrial applications',
    
    'product.rice.title': 'Rice Varieties',
    'product.rice.description': 'Premium rice varieties from around the world',
    'product.rice.detail1': 'Basmati, jasmine, parboiled, white rice',
    'product.rice.detail2': 'Packaging: 5 kg, 25 kg bags or big bags',
    'product.rice.detail3': 'Delivery: CIF, FOB',
    
    'product.olive.title': 'Olive Oil',
    'product.olive.description': 'Premium olive oil from Greece',
    'product.olive.detail1': 'Extra virgin olive oil, virgin olive oil, refined olive oil',
    'product.olive.detail2': 'Packaging: 1 l bottles, 5 l canisters, 200L drums',
    'product.olive.detail3': 'Delivery: CIF, FOB',
    
    'product.urea.title': 'Urea & Fertilizers',
    'product.urea.description': 'High-quality urea and fertilizers for agricultural use',
    'product.urea.detail1': 'Urea 46% Granular and Prilled',
    'product.urea.detail2': 'Packaging: 50kg bags or big bags',
    'product.urea.detail3': 'Delivery: Worldwide',
    
    'product.petroleum.title': 'Petroleum Products',
    'product.petroleum.description': 'Premium petroleum products for various applications',
    'product.petroleum.detail1': 'EN 590, D2, AGO, Jet A1',
    'product.petroleum.detail2': 'Diesel, Aviation Fuel, Automotive Fuel',
    'product.petroleum.detail3': 'Delivery: CIF, FOB',
    
    // About
    'about.title': 'About Us',
    'about.subtitle': 'Our mission and values',
    'about.mission.title': 'Our Mission',
    'about.mission.desc': 'To provide premium quality products through transparent and reliable partnerships worldwide.',
    'about.services.title': 'Our Services',
    'about.services.desc': 'Providing Quality Products with Trust & Transparency Worldwide',
    'about.values.title': 'Our Values',
    'about.values.desc': 'Quality, reliability, partnership, and flexibility form the cornerstone of our business philosophy.',
    'about.experience.title': 'Our Experience',
    'about.experience.desc': 'With years of experience in international trade, we have established strong partnerships and a reputation for excellence.',
    'about.team.title': 'Our Leadership Team',
    'about.team.desc': "Discover the exceptional individuals driving our company's vision and success.",
    'about.partners.title': 'Our Partners',
    'about.partners.subtitle': 'Global Partners & Representations',
    'about.partners.desc': 'As an international trading company based in Abu Dhabi, we work closely with trusted partners around the world. These partnerships enable us to ensure efficient sourcing, reliable distribution, and professional handling across all markets.',

      // Our Partners
        'about.partners.europe': 'European Representation',
        'about.partners.europe.compName': 'International Foodstuff Supplier SL',
        'about.partners.europe.name': 'Mr. Moreno & Nunoz',
        'about.partners.europe.location': 'Madrid, Spain',

        'about.partners.westAfrica': 'West Africa Distribution',
        'about.partners.westAfrica.compName': 'Soufa Global Business Import Export',
        'about.partners.westAfrica.name': 'Mr. Abdourahmane Diallo',
        'about.partners.westAfrica.location': 'Dakar, Senegal',

        'about.partners.mali': 'Mali Distribution',
        'about.partners.mali.compName': 'Fatoumata Haidara Negoce-Services',
        'about.partners.mali.name': 'Mrs. Fatoumata Haidara',
        'about.partners.mali.location': 'Bamako, Mali',

        'about.partners.eastAfrica': 'East Africa Distribution',
        'about.partners.eastAfrica.compName': 'Al-wabil Al-saieb Trading',
        'about.partners.eastAfrica.name': 'Mr. Abdelsalam Mekki A. Yahya',
        'about.partners.eastAfrica.location': 'Khartoum, Soudan',

        'about.partners.asia': 'Asia Representation',
        'about.partners.asia.compName': 'Saatvik Foods Ltd',
        'about.partners.asia.name': 'Mrs. Aditi More',
        'about.partners.asia.location': 'Mumbai, India',

        'about.partners.india': 'India Foodstuff and Fruits',
        'about.partners.india.compName': 'Sachi Traders Ltd',
        'about.partners.india.name': 'Mr. Kakasaheb Chavan',
        'about.partners.india.location1': 'Mumbai, India',
        'about.partners.india.location2': 'Osmanabad, India',

        'about.partners.latinAmerica': 'Latin America Representation',
        'about.partners.latinAmerica.compName': 'Roodan do Brasil',
        'about.partners.latinAmerica.name': 'Mr. Vicenzo Lauria',
        'about.partners.latinAmerica.location': 'Vitória da Conquista – Bahia, Brazil',

        'about.partners.logistics': 'Logistics Partner',
        'about.partners.logistics.compName': 'United Global Logistic',
        'about.partners.logistics.name': 'Mr. Mo Khan',
        'about.partners.logistics.location': 'New York, USA',

        'about.partners.uae': 'Our Partners in UAE',
        'about.partners.uae.compName1': 'Buttner Coffee Trading LLC',
        'about.partners.uae.name1': 'Mr. Sebastian Buttner',
        'about.partners.uae.location1': 'Dubai, UAE',
        'about.partners.uae.compName2': 'Wealth Capital Global Trading LLC',
        'about.partners.uae.name2': 'Mr. Salim Khaleleyal',
        'about.partners.uae.location2': 'Deria, UAE',

        'about.partners.ivoryCoast': 'Ivory Coast Representative',
        'about.partners.ivoryCoast.compName': 'RECORD\'S HOLDING SA',
        'about.partners.ivoryCoast.name': 'Mr. Malick Ouattara',
        'about.partners.ivoryCoast.location': 'Abidjan - IVORY COAST',
        'about.partners.ivoryCoast.address': '03 BP 2603 ABIDJAN 03',

    // Our Services
    'about.service.service1.title':'Project Management & Consulting',
    'about.service.service1.item1':'Planning, execution, and optimization of projects',
    'about.service.service1.item2':'Process analysis and efficiency improvement',
    'about.service.service1.item3':'Strategic consulting and market entry strategies',
    'about.service.service2.title':'General Trading & Distribution',
    'about.service.service2.item1':'Import & export of various goods',
    'about.service.service2.item2':'Procurement and logistics management',
    'about.service.service2.item3':'Development of trade strategies', 

    // Our Mission
    'about.values.value1.title':'Quality Assurance',
    'about.values.value1.desc': 'Delivering premium agricultural and industrial products to global standards.',
    'about.values.value2.title':'Reliable Partnerships',
    'about.values.value2.desc': 'Building lasting client relationships with timely, efficient delivery.',
    'about.values.value3.title':'Sustainable Trade',
    'about.values.value3.desc': 'Upholding sustainable and ethical trade in all operations.',
    'about.values.value4.title':'Customer Commitment',
    'about.values.value4.desc': 'Ensuring customer satisfaction through fair pricing, top logistics, and great service.',

    // About.Why Choose Us
    'about.whyChooseUs.title': 'Why Choose Us?',
    'about.whyChooseUs.title1': 'Superior Quality Assurance',
    'about.whyChooseUs.reason1': 'Premium quality products sourced from trusted suppliers worldwide',
    'about.whyChooseUs.title2': 'Tailored Logistics Solutions',
    'about.whyChooseUs.reason2': 'Flexible delivery terms to meet your specific requirements',
    'about.whyChooseUs.title3': 'Competitive & Transparent Pricing',
    'about.whyChooseUs.reason3': 'Competitive pricing and transparent business practices',
    'about.whyChooseUs.title4': 'Dedicated Customer Support ',
    'about.whyChooseUs.reason4': 'Responsive customer service and dedicated support',
    'about.whyChooseUs.title5': 'Global Expertise & Trusted Network',
    'about.whyChooseUs.reason5': 'Years of experience in international trade with a global network',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with our team',
    'contact.address': 'Address',
    'contact.address_main':'Khalidiya Towers, Mezzanine Floor,\nAl Faskar Street W10,\nAl Bateen, Al Khalidiyah, Abu Dhabi,\n\nUnited Arab Emirates',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email',
    'contact.form.message': 'Your Message',
    'contact.form.submit': 'Send Message',
    'contact.whatsapp' : 'WhatsApp',
    'SendUs.title' : 'Send us a Message',
    'SendUs.desc' :' Have a question or inquiry? Fill out the form below and we will get back to you as soon as possible.',
    'contact.form.message_placeholder': 'Your message here...',
    'SendUs.button':'Send',
    'SendUs.sending':'Sending...',
    'SendUS.success':'Message sent successfully!',

      // LOI Form starts here
      'loi.title': 'LETTER OF INTENT (LOI)',
      'loi.subtitle': 'FOR CIF ASWP - Complete the form below to submit your Letter of Intent',
      'loi.sections.loiDetails': 'LOI Details',
      'loi.id':'Issued Date',
      'loi.vu':'Valid Until',
      'loi.sections.productDetails': 'Product Details',

      // Product details fields
      'loi.product.name': 'Product Name',
      'loi.product.quantity': 'Quantity (MT)',
      'loi.product.origin': 'Origin',
      'loi.product.shipments': 'Shipments',
      'loi.product.frequency': 'Frequency of Delivery',
      'loi.product.contractLength': 'Contract Length',
      'loi.product.totalAmount': 'Total Contract Amount (MT)',
      'loi.product.incoterms': 'Incoterms 2020',
      'loi.product.deliveryPort': 'Delivery Port',
      'loi.product.targetPrice': 'Target Price (USD) per MT',
      'loi.product.e.g': 'e.g. Sugar ICUMSA 45',
      'loi.product.quantityPlaceholder': 'e.g. 25,000',
      'loi.product.originPlaceholder': 'e.g. Brazil',
      'loi.product.shipmentsPlaceholder': 'e.g. 5,000 MT x 5',
      'loi.product.frequencyPlaceholder': 'e.g. Monthly',
      'loi.product.contractLengthPlaceholder': 'e.g. 12 months',
      'loi.product.totalAmountPlaceholder': 'e.g. 25,000',
      'loi.product.selectIncoterms': 'Select Incoterms',
      'loi.product.deliveryPortPlaceholder': 'e.g. Port of Dubai',
      'loi.product.targetPricePlaceholder': 'e.g. 000',

      // Incoterm options
      'loi.incoterms.cif': 'CIF (Cost, Insurance, Freight)',
      'loi.incoterms.fob': 'FOB (Free on Board)',
      'loi.incoterms.exw': 'EXW (Ex Works)',
      'loi.incoterms.ddp': 'DDP (Delivered Duty Paid)',
      'loi.incoterms.fas': 'FAS (Free Alongside Ship)',
      'loi.incoterms.cfr': 'CFR (Cost and Freight)',
      
      // Inspection options
      'loi.inspection.sgs': 'SGS (General Surveillance Society)',
      'loi.inspection.intertek': 'INTERTEK',
      'loi.inspection.ciq': 'CIQ (China Inspection and Quarantine)',

      // Upload document
      'loi.upload.document': 'Upload documents (PDF/Image)',
      
      // Payment and Inspection section
      'loi.sections.paymentInspection': 'Payment and Inspection',
      'loi.payment.terms': 'Payment Terms',
      'loi.payment.termsContent': 'THE BUYER RELEASES PAYMENT TO THE SELLER\'S BANK AFTER INSPECTION AT THE LOADING PORT WITHIN THREE (3) BANKING DAYS AFTER THE CARGO HAS PASSED THE SGS OR SIMILAR, AND RECEIPT OF ALL RELEVANT PAYMENT DOCUMENTS.',
      'loi.payment.inspection': 'Inspection',
      'loi.payment.selectInspection': 'Select Inspection Agency',
      'loi.payment.inspectionNote': 'At the port of loading shall be for the account and at the expense of the SELLER / At the port of discharge shall be for the account and at the expense of the BUYER',
  
      // Additional Details section
      'loi.sections.additionalDetails': 'Additional Details',
      'loi.additional.observations': 'Observations',
      'loi.additional.observationsPlaceholder': 'Any additional observations',
      'loi.additional.specifications': 'Specifications',
      'loi.additional.specificationsPlaceholder': 'Product specifications',
      
      // Buyer Information section
      'loi.sections.buyerInfo': 'Buyer Information',
      'loi.buyer.companyName': 'Company Name',
      'loi.buyer.regNumber': 'Company Registration Number',
      'loi.buyer.address': 'Address/City/State/ZIP/Country',
      'loi.buyer.repName': 'Legal Representative Name',
      'loi.buyer.title': 'Title',
      'loi.buyer.phone': 'Phone/Mobile',
      'loi.buyer.email': 'Email',
      'loi.buyer.website': 'Website',
      'loi.buyer.companyNamePlaceholder': 'Your company name',
      'loi.buyer.regNumberPlaceholder': 'Registration number',
      'loi.buyer.addressPlaceholder': 'Company address',
      'loi.buyer.repNamePlaceholder': 'Representative name',
      'loi.buyer.titlePlaceholder': 'Job title',
      'loi.buyer.phonePlaceholder': 'Phone number',
      'loi.buyer.emailPlaceholder': 'Email address',
      'loi.buyer.websitePlaceholder': 'Company website',

      // buyer bank information section
      'loi.sections.bankInfo': "Buyer's Bank Information",
      'loi.bn':'Bank Name',
      'loi.bwc':'Bank SWIFT Code',
      'loi.bd':'Bank Address/City/State/ZIP/Country',
      'loi.an':'Account Name',
      'loi.anu':'Account Number',
      'loi.bot':"Bank Officer's Title",
      'loi.bon':"Bank Officer's Name",
      'loi.signaturePlaceholder': 'Full legal name as signature',
      'loi.bankNamePlaceholder': 'Bank name',
      'loi.bankSwiftCodePlaceholder': 'SWIFT/BIC code',
      'loi.bankAddressPlaceholder': 'Bank address',
      'loi.accountNamePlaceholder': 'Account holder name',
      'loi.accountNumberPlaceholder': 'Account number',
      'loi.bankOfficerNamePlaceholder': 'Bank officer name',
      'loi.bankOfficerTitlePlaceholder': 'Bank officer title',

      //legal warning
      'loi.sections.legalWarnings': 'Legal Warnings',
      'loi.wr1':"We declare we have operational experience, storage capacity,and financial resources to fulfill this LOI",
      'loi.wr2':'We fully understand and accept all terms and obligations outlined in this LOI',
      'loi.wr3':'We acknowledge that fraudulent documents may result in legal action by authorities including FBI, INTERPOL, ICC, and other international organizations',

      //signature
      'loi.sections.signature': 'Signature & Attachments',
      'loi.lg1':'Legal Representative Signature',
      'loi.lg2':' Upload Documents (PDF/Image)',
      'loi.lg3':'Required: Company Stamp/Seal and Passport Copy',
      
      //special condition
      'loi.sections.specialConditions': 'Special Conditions',
      'loi.sc1':'This LOI requires final written approval from both parties',
      'loi.sc2':'Electronic copies are considered valid equivalents to originals',
      'loi.sc3':'Submitting...',
      'loi.sc4':'Submit LOI',

      // LOI Form Error Messages
      'loi.errors.requiredFields': 'Please fill all required fields',
      'loi.errors.serverInvalid': 'Server returned an invalid response',
      'loi.errors.failedSubmit': 'Failed to submit LOI',
      'loi.errors.networkError': 'Network Error',
      'loi.errors.connectionFailed': 'Failed to connect to the server. Please check your internet connection or try again later.',
      'loi.errors.tryAgain': 'Failed to submit LOI. Please try again.',
      
      // LOI Form Success Messages
      'loi.success.submitted': 'LOI Submitted Successfully',
      'loi.success.received': 'Your Letter of Intent has been received. We will contact you shortly.',

      // Quote Request Form Error Messages
      'quote.errors.requiredFields': 'Please fill all required fields',
      'quote.errors.serverInvalid': 'Server returned an invalid response',
      'quote.errors.failedSubmit': 'Failed to submit quote request',
      'quote.errors.networkError': 'Network Error',
      'quote.errors.connectionFailed': 'Failed to connect to the server. Please check your internet connection or try again later.',
      'quote.errors.tryAgain': 'Failed to submit quote request. Please try again.',
      
      // Quote Request Form Success Messages
      'quote.success.submitted': 'Quote Request Submitted Successfully',
      'quote.success.received': 'Your request has been received. Your ticket number is: {0}',

      // Contact Form Error Messages
      'contact.errors.failedSend': 'Failed to send message. Please try again.',
      'contact.errors.networkError': 'Error',
      
      // Contact Form Success Messages
      'contact.success.messageSent': 'Message Sent',
      'contact.success.getBackSoon': 'We will get back to you soon.',

      // Footer
      'slogan':'Premium global trading solutions providing high-quality products with reliable service worldwide.',
      'footer.rights': 'All rights reserved',
      'footer.privacy': 'Privacy Policy',
      'footer.terms': 'Terms of Service',
      'nav.quick_link':'Quick Links',
      'footer.registry': 'Registry No.:',
      'footer.license': 'Economic Licence No.:',
  },
  
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.products': 'Produits',
    'nav.inquiry': 'demande de devis',
    'nav.contact': 'Contact',
    //Header
    'logo.title':'ROODAN',
    
    // Hero
    'hero.title': 'Roodan General Trading',
    'hero.subtitle': 'Produits de qualité mondiale avec un service fiable',
    'hero.cta': 'Explorer les Produits',
    
    // Strengths
    'strengths.title': 'Nos Forces',
    'strengths.quality.title': 'Qualité',
    'strengths.quality.desc': 'nos produits proviennent de fournisseurs expérimentés et fiables qui sont présélectionnés par notre équipe de terrain',
    'strengths.reliability.title': 'Fiabilité',
    'strengths.reliability.desc': "nous travaillons avec des partenaires de confiance qui font partie intégrante de notre chaîne d'approvisionnement et qui fournissent une solution de bout en bout avec une transparence à 100%",
    'strengths.partnership.title': 'Partenariat',
    'strengths.partnership.desc': 'Nos partenariats à long terme avec toutes nos parties prenantes reposent sur une confiance et une transparence de longue date',
    'strengths.flexibility.title': 'Solution Personnalisée',
    'strengths.flexibility.desc': "Nous fournissons des solutions d'exportation sur mesure selon les besoins des clients",
    
    // Products
    'products.title': 'Nos Produits',
    'products.description': 'Découvrez notre gamme complète de produits de qualité supérieure, provenant de fournisseurs mondiaux de confiance.',
    'products.viewAll': 'Voir tous les produits',
    'products.viewDetails': 'Voir les détails',
    'products.sugar': 'Sucre',
    'products.sugarDesc': 'ICUMSA 45, ICUMSA 100, ICUMSA 150',
    'products.soy': 'Produits à base de soja',
    'products.soyDesc': 'Soja, farine de soja, huile de soja',
    'produits.café': 'Café Beans',
    'produits.coffeeDesc': 'Robusta & Arabica, etc',
    'produits.viande': 'Produits de viande, Produits de viande',
    'products.meat': 'Produits à base de viande',
    'products.meatDesc': 'Buffalo Meat, Chicken & Cow Ghee, Duc',
    'products.oil': 'Huiles végétales',
    'products.oilDesc': 'CP8, CP10 & Huile d\'olive, huile de soja, huile de tournesol & huile d\'avocat',
    'products.rice': 'Riz',
    'products.riceDesc': 'Basmati, Jasmin & Riz Blanc',
    'products.olive': 'Huile d\'olive',
    'products.urea': 'Urée & Engrais',
    'products.petroleum': 'Produits pétroliers',
    'products.petroleumDesc': 'EN 590, D2, AGO, Jet A1',
    'products.searchPlaceholder': 'Rechercher des produits...',
    'products.categories.all': 'Tous les produits',
    'products.categories.food': 'Produits alimentaires',
    'products.categories.oils': 'Huiles',
    'products.categories.agri': 'Produits agricoles',
    'products.categories.petro': 'Produits pétroliers',
    'products.requestQuote': 'Demander un devis',
    'products.noProductsFound': 'Aucun produit trouvé',
    'products.noProductsMatching': 'Aucun produit correspondant à "{query}" dans {category}.',
    'products.noProductsInCategory': "Aucun produit n'est disponible dans la catégorie {}.",
    'products.clearFilters': 'Effacer les filtres',
    
    // Product Details
    'product.sugar.title': 'Sucre ICUMSA',
    'product.sugar.description': 'Sucre premium avec différentes qualités ICUMSA du Brésil',
    'product.sugar.detail1': 'ICUMSA 45 (sucre blanc), ICUMSA 100 (sucre brut), ICUMSA 150',
    'product.sugar.detail2': 'Emballage: sacs de 50 kg ou grands sacs',
    'product.sugar.detail3': 'Livraison: CIF, FOB, etc.',
    
    'product.soy.title': 'Produits de Soja',
    'product.soy.description': 'Produits de soja de haute qualité pour diverses applications',
    'product.soy.detail1': 'Graines de soja (sans OGM sur demande), farine de soja, huile de soja',
    'product.soy.detail2': 'Emballage: Selon les exigences du client',
    'product.soy.detail3': 'Livraison: Mondiale, flexible',
    
    'product.coffee.title': 'Grains de Café',
    'product.coffee.description': 'Grains de café Robusta et Arabica de qualité supérieure',
    'product.coffee.detail1': 'Robusta (fort) et Arabica (doux)',
    'product.coffee.detail2': 'Origine: Amérique du Sud, Asie, Afrique',
    'product.coffee.detail3': 'Emballage: sacs de 50 kg ou grands sacs',
    
    'product.beef.title': 'Produits de Bœuf',
    'product.beef.description': 'Bœuf de qualité supérieure d\'Inde',
    'product.beef.detail1': 'Bœuf surgelé, diverses coupes',
    'product.beef.detail2': 'Emballage: Produits surgelés',
    'product.beef.detail3': 'Livraison: Mondiale',
    
    'product.chicken.title': 'Viande de Poulet',
    'product.chicken.description': 'Divers produits de poulet de la plus haute qualité',
    'product.chicken.detail1': 'Poulets entiers, poitrines de poulet, cuisses de poulet, ailes de poulet',
    'product.chicken.detail2': 'Emballage: Produits surgelés',
    'product.chicken.detail3': 'Livraison: Mondiale',
    
    'product.ghee.title': 'Ghee de Bœuf',
    'product.ghee.description': 'Ghee de bœuf pur d\'Inde',
    'product.ghee.detail1': 'Ghee de bœuf 100% pur',
    'product.ghee.detail2': 'Emballage: Boîtes de 1 kg, seaux de 15 kg',
    'product.ghee.detail3': 'Delivery: Worldwide',
    
    'product.vegetable.title': 'Huiles Végétales',
    'product.vegetable.description': 'Huiles végétales de haute qualité CP8 et CP10 d\'Asie',
    'product.vegetable.detail1': 'Palm oil, various packaging sizes, soyabean oil, sunflower oil, &avacado oil',
    'product.vegetable.detail2': 'Delivery: CIF, FOB or by arrangement',
    'product.vegetable.detail3': 'Premium quality for food and industrial applications',
    
    'product.rice.title': 'Variétés de Riz',
    'product.rice.description': 'Variétés de riz premium du monde entier',
    'product.rice.detail1': 'Basmati, jasmin, parboiled, white rice',
    'product.rice.detail2': 'Packaging: 5 kg, 25 kg bags or big bags',
    'product.rice.detail3': 'Delivery: CIF, FOB',
    
    'product.olive.title': 'Huile d\'Olive',
    'product.olive.description': 'Huile d\'olive premium de Grèce',
    'product.olive.detail1': 'Huile d\'olive extra vierge, huile d\'olive vierge, huile d\'olive raffinée',
    'product.olive.detail2': 'Emballage: Bouteilles de 1 l, bidons de 5 l, fûts de 200 l',
    'product.olive.detail3': 'Delivery: CIF, FOB',
    
    'product.urea.title': 'Urée & Engrais',
    'product.urea.description': 'Urée et engrais de haute qualité pour usage agricole',
    'product.urea.detail1': 'Urée 46% Granulaire et Prilled',
    'product.urea.detail2': 'Emballage: Sacs de 50 kg ou grands sacs',
    'product.urea.detail3': 'Delivery: Worldwide',
    
    'product.petroleum.title': 'Produits Pétroliers',
    'product.petroleum.description': 'Produits pétroliers premium pour diverses applications',
    'product.petroleum.detail1': 'EN 590, D2, AGO, Jet A1',
    'product.petroleum.detail2': 'Diesel, Aviation Fuel, Automotive Fuel',
    'product.petroleum.detail3': 'Delivery: CIF, FOB',
    
    // About
    'about.title': 'À Propos de Nous',
    'about.subtitle': 'Notre mission et nos valeurs',
    'about.mission.title': 'Notre Mission',
    'about.mission.desc': 'Fournir des produits de qualité premium grâce à des partenariats transparents et fiables dans le monde entier.',
    'about.services.title': 'Nos prestations',
    'about.services.desc': 'Fournir des produits de qualité avec confiance et transparence dans le monde entier',
    'about.values.title': 'Nos Valeurs',
    'about.values.desc': 'La qualité, la fiabilité, le partenariat et la flexibilité constituent la pierre angulaire de notre philosophie d\'entreprise.',
    'about.experience.title': 'Notre Expérience',
    'about.experience.desc': 'Avec des années d\'expérience dans le commerce international, nous avons établi des partenariats solides et une réputation d\'excellence.',
    'about.team.title': 'Notre équipe de direction',
    'about.team.desc': 'Découvrez les individus exceptionnels qui sont à l\'origine de la vision et du succès de notre entreprise.',
    'about.partners.title': 'Nos Partenaires',
    'about.partners.subtitle': 'Partenaires et Représentations Mondiales',
    'about.partners.desc': 'En tant que société de négoce international basée à Abou Dhabi, nous travaillons en étroite collaboration avec des partenaires de confiance dans le monde entier. Ces partenariats nous permettent d\'assurer un approvisionnement efficace, une distribution fiable et une gestion professionnelle sur tous les marchés.',

      // Our Partners
      'about.partners.europe': 'Représentation Européenne',
      'about.partners.europe.compName': 'Fournisseur International de Produits Alimentaires SL',
      'about.partners.europe.name': 'M. Moreno & Nunoz',
      'about.partners.europe.location': 'Madrid, Espagne',

      'about.partners.westAfrica': 'Distribution Afrique de l\'Ouest',
      'about.partners.westAfrica.compName': 'Soufa Global Business Import Export',
      'about.partners.westAfrica.name': 'M. Abdourahmane Diallo',
      'about.partners.westAfrica.location': 'Dakar, Sénégal',

      'about.partners.mali': 'Distribution Mali',
      'about.partners.mali.compName': 'Fatoumata Haidara Négoce-Services',
      'about.partners.mali.name': 'Mme Fatoumata Haidara',
      'about.partners.mali.location': 'Bamako, Mali',

      'about.partners.eastAfrica': 'Distribution Afrique de l\'Est',
      'about.partners.eastAfrica.compName': 'Al-wabil Al-saieb Trading',
      'about.partners.eastAfrica.name': 'M. Abdelsalam Mekki A. Yahya',
      'about.partners.eastAfrica.location': 'Khartoum, Soudan',

      'about.partners.asia': 'Représentation Asie',
      'about.partners.asia.compName': 'Saatvik Foods Ltd',
      'about.partners.asia.name': 'Mme Aditi More',
      'about.partners.asia.location': 'Mumbai, Inde',

      'about.partners.india': 'Produits Alimentaires et Fruits Indiens',
      'about.partners.india.compName': 'Sachi Traders Ltd',
      'about.partners.india.name': 'M. Kakasaheb Chavan',
      'about.partners.india.location1': 'Mumbai, Inde',
      'about.partners.india.location2': 'Osmanabad, Inde',

      'about.partners.latinAmerica': 'Représentation Amérique Latine',
      'about.partners.latinAmerica.compName': 'Roodan do Brasil',
      'about.partners.latinAmerica.name': 'M. Vicenzo Lauria',
      'about.partners.latinAmerica.location': 'Vitória da Conquista – Bahia, Brésil',

      'about.partners.logistics': 'Partenaire Logistique',
      'about.partners.logistics.compName': 'United Global Logistic',
      'about.partners.logistics.name': 'M. Mo Khan',
      'about.partners.logistics.location': 'New York, États-Unis',

      'about.partners.uae': 'Nos Partenaires aux EAU',
      'about.partners.uae.compName1': 'Buttner Coffee Trading LLC',
      'about.partners.uae.name1': 'M. Sebastian Buttner',
      'about.partners.uae.location1': 'Dubaï, EAU',
      'about.partners.uae.compName2': 'Wealth Capital Global Trading LLC',
      'about.partners.uae.name2': 'M. Salim Khaleleyal',
      'about.partners.uae.location2': 'Deria, EAU',

      'about.partners.ivoryCoast': 'Représentant Côte d\'Ivoire',
      'about.partners.ivoryCoast.compName': 'RECORD\'S HOLDING SA',
      'about.partners.ivoryCoast.name': 'M. Malick Ouattara',
      'about.partners.ivoryCoast.location': 'Abidjan - CÔTE D\'IVOIRE',
      'about.partners.ivoryCoast.address': '03 BP 2603 ABIDJAN 03',

    // Our Mission
    'about.values.value1.title':'Quality Assurance',
    'about.values.value1.desc': 'Fournir des produits agricoles et industriels de haute qualité répondant aux normes mondiales.',
    'about.values.value2.title':'Des partenariats fiables',
    'about.values.value2.desc': 'Construire des relations à long terme avec les clients en assurant une livraison rapide et efficace.',
    'about.values.value3.title':'Commerce durable',
    'about.values.value3.desc': 'Promouvoir des pratiques commerciales durables et éthiques dans toutes nos opérations.',
    'about.values.value4.title':'Engagement client',
    'about.values.value4.desc': 'Assurer la satisfaction du client grâce à des prix compétitifs, une logistique supérieure et un service exceptionnel.',

    // Our Services
    'about.service.service1.title':'Gestion de projet et conseil',
    'about.service.service1.item1':'Planification, exécution et optimisation de projets',
    'about.service.service1.item2':'Analyse des processus et amélioration de lefficacité',
    'about.service.service1.item3':'Conseil stratégique et stratégies dentrée sur le marché',
    'about.service.service2.title':'Négoce général et distribution',
    'about.service.service2.item1':'Importation et exportation de marchandises diverses',
    'about.service.service2.item2':'Gestion des achats et de la logistique',
    'about.service.service2.item3':'Développement de stratégies commerciales', 
      
    // About.Why Choose Us
    'about.whyChooseUs.title': 'Pourquoi nous choisir ?',
    'about.whyChooseUs.title1': 'Assurance qualité supérieure',
    'about.whyChooseUs.reason1': 'Produits de qualité supérieure provenant de fournisseurs de confiance dans le monde entier',
    'about.whyChooseUs.title2': 'Des solutions logistiques sur mesure',
    'about.whyChooseUs.reason2': 'Conditions de livraison flexibles pour répondre à vos besoins spécifiques',
    'about.whyChooseUs.title3': 'Des prix compétitifs et transparents',
    'about.whyChooseUs.reason3': 'Des prix compétitifs et des pratiques commerciales transparentes',
    'about.whyChooseUs.title4': 'Assistance client dédiée',
    'about.whyChooseUs.reason4': 'Service client réactif et support dédié',
    'about.whyChooseUs.title5': 'Expertise mondiale et réseau de confiance',
    'about.whyChooseUs.reason5': 'Des années dexpérience dans le commerce international avec un réseau mondial',
    
    // Contact
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Entrez en contact avec notre équipe',
    'contact.address': 'Adresse',
    'contact.address_main':'Khalidiya Towers, Mezzanine Floor,\nAl Faskar Street W10,\nAl Bateen, Al Khalidiyah,\nAbu Dhabi,\n\nÉmirats Arabes Unis',
    'contact.phone': 'Téléphone',
    'contact.email': 'Email',
    'contact.form.name': 'Votre Nom',
    'contact.form.email': 'Votre Email',
    'contact.form.message': 'Votre Message',
    'contact.form.submit': 'Envoyer le Message',
    'contact.whatsapp' : 'WhatsApp',     
    'SendUs.title' : 'Envoyez-nous un message',
    'SendUs.desc' :'Vous avez une question ou une demande ? Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.',
    'contact.form.message_placeholder': 'Votre message ici...',
    'SendUs.button':'Envoyer',
    'SendUs.sending':'Envoi...',
    'SendUS.success':'Message envoyé avec succès !',

    // LOI Form starts here
    'loi.title': 'LETTRE D\'INTENTION (LOI)',
    'loi.subtitle': 'POUR CIF ASWP - Remplissez le formulaire ci-dessous pour soumettre votre Lettre d\'Intention',
    'loi.sections.loiDetails': 'Détails de la LOI',
    'loi.id': 'Date d\'émission',
    'loi.vu': 'Validité jusqu\'au',
    'loi.sections.productDetails': 'Détails du produit',

    // Product details fields
    'loi.product.name': 'Nom du produit',
    'loi.product.quantity': 'Quantité (MT)',
    'loi.product.origin': 'Origine',
    'loi.product.shipments': 'Expéditions',
    'loi.product.frequency': 'Fréquence de livraison',
    'loi.product.contractLength': 'Durée du contrat',
    'loi.product.totalAmount': 'Quantité totale du contrat (MT)',
    'loi.product.incoterms': 'Incoterms 2020',
    'loi.product.deliveryPort': 'Port de livraison',
    'loi.product.targetPrice': 'Prix cible (USD) par MT',
    'loi.product.e.g': 'par exemple Sucre ICUMSA 45',
    'loi.product.quantityPlaceholder': 'ex: 25,000',
    'loi.product.originPlaceholder': 'ex: Brésil',
    'loi.product.shipmentsPlaceholder': 'ex: 5,000 TM x 5',
    'loi.product.frequencyPlaceholder': 'ex: Mensuel',
    'loi.product.contractLengthPlaceholder': 'ex: 12 mois',
    'loi.product.totalAmountPlaceholder': 'ex: 25,000',
    'loi.product.selectIncoterms': 'Sélectionner les Incoterms',
    'loi.product.deliveryPortPlaceholder': 'ex: Port de Dubaï',
    'loi.product.targetPricePlaceholder': 'ex: 450',

    // Incoterm options
    'loi.incoterms.cif': 'CIF (Coût, Assurance et Fret)',
    'loi.incoterms.fob': 'FOB (Franco à Bord)',
    'loi.incoterms.exw': 'EXW (À l\'Usine)',
    'loi.incoterms.ddp': 'DDP (Rendu Droits Acquittés)',
    'loi.incoterms.fas': 'FAS (Franco le Long du Navire)',
    'loi.incoterms.cfr': 'CFR (Coût et Fret)',

    // Inspection options
    'loi.inspection.sgs': 'SGS (Société Générale de Surveillance)',
    'loi.inspection.intertek': 'INTERTEK',
    'loi.inspection.ciq': 'CIQ (Inspection et Quarantaine en Chine)',

    // Upload document
    'loi.upload.document': 'Télécharger les documents (PDF/Image)',

    // Payment and Inspection section
    'loi.sections.paymentInspection': 'Paiement et Inspection',
    'loi.payment.terms': 'Conditions de paiement',
    'loi.payment.termsContent': 'L\'ACHETEUR LIBÈRE LE PAIEMENT AU COMPTE DU VENDEUR APRÈS INSPECTION AU PORT DE CHARGEMENT DANS LES TROIS (3) JOURS BANCAIRES SUIVANT LA VALIDATION DE LA CARGAISON PAR SGS OU ÉQUIVALENT ET LA RÉCEPTION DE TOUS LES DOCUMENTS DE PAIEMENT REQUIS.',
    'loi.payment.inspection': 'Inspection',
    'loi.payment.selectInspection': 'Sélectionner l\'agence d\'inspection',
    'loi.payment.inspectionNote': 'Au port de chargement, aux frais du VENDEUR / Au port de déchargement, aux frais de l\'ACHETEUR',

    // Additional Details section
    'loi.sections.additionalDetails': 'Détails supplémentaires',
    'loi.additional.observations': 'Observations',
    'loi.additional.observationsPlaceholder': 'Observations supplémentaires',
    'loi.additional.specifications': 'Spécifications',
    'loi.additional.specificationsPlaceholder': 'Spécifications du produit',
    
    // Buyer Information section
    'loi.sections.buyerInfo': 'Informations sur l\'acheteur',
    'loi.buyer.companyName': 'Nom de l\'entreprise',
    'loi.buyer.regNumber': 'Numéro d\'enregistrement de l\'entreprise',
    'loi.buyer.address': 'Adresse / Ville / État / Code postal / Pays',
    'loi.buyer.repName': 'Nom du représentant légal',
    'loi.buyer.title': 'Titre',
    'loi.buyer.phone': 'Téléphone / Mobile',
    'loi.buyer.email': 'E-mail',
    'loi.buyer.website': 'Site web',
    'loi.buyer.companyNamePlaceholder': 'Nom de votre entreprise',
    'loi.buyer.regNumberPlaceholder': 'Numéro d\'enregistrement',
    'loi.buyer.addressPlaceholder': 'Adresse de l\'entreprise',
    'loi.buyer.repNamePlaceholder': 'Nom du représentant',
    'loi.buyer.titlePlaceholder': 'Titre du poste',
    'loi.buyer.phonePlaceholder': 'Numéro de téléphone',
    'loi.buyer.emailPlaceholder': 'Adresse e-mail',
    'loi.buyer.websitePlaceholder': 'Site web de l\'entreprise',

    // buyer bank information section
    'loi.sections.bankInfo': 'Informations bancaires de l\'acheteur',
    'loi.bn': 'Nom de la banque',
    'loi.bwc': 'Code SWIFT de la banque',
    'loi.bd': 'Adresse de la banque / Ville / État / Code postal / Pays',
    'loi.an': 'Nom du compte',
    'loi.anu': 'Numéro de compte',
    'loi.bot': 'Titre du responsable bancaire',
    'loi.bon': 'Nom du responsable bancaire',
    'loi.signaturePlaceholder': 'Nom légal complet comme signature',
    'loi.bankNamePlaceholder': 'Nom de la banque',
    'loi.bankSwiftCodePlaceholder': 'Code SWIFT/BIC',
    'loi.bankAddressPlaceholder': 'Adresse de la banque',
    'loi.accountNamePlaceholder': 'Nom du titulaire du compte',
    'loi.accountNumberPlaceholder': 'Numéro de compte',
    'loi.bankOfficerNamePlaceholder': 'Nom du responsable bancaire',
    'loi.bankOfficerTitlePlaceholder': 'Titre du responsable bancaire',

    // legal warning
    'loi.sections.legalWarnings': 'Avertissements légaux',
    'loi.wr1': 'Nous déclarons avoir l\'expérience opérationnelle, la capacité de stockage et les ressources financières pour exécuter cette LOI',
    'loi.wr2': 'Nous comprenons et acceptons pleinement toutes les conditions et obligations énoncées dans cette LOI',
    'loi.wr3': 'Nous reconnaissons que la présentation de documents frauduleux peut entraîner des poursuites judiciaires par les autorités, y compris le FBI, INTERPOL, ICC et d\'autres organisations internationales',

    // signature
    'loi.sections.signature': 'Signature et pièces jointes',
    'loi.lg1': 'Signature du représentant légal',
    'loi.lg2': 'Télécharger les documents (PDF/Image)',
    'loi.lg3': 'Obligatoire : Cachet de l\'entreprise et copie du passeport',

    // special condition
    'loi.sections.specialConditions': 'Conditions spéciales',
    'loi.sc1': 'Cette LOI nécessite une approbation écrite finale des deux parties',
    'loi.sc2': 'Les copies électroniques sont considérées comme équivalentes aux originaux',
    'loi.sc3': 'Envoi en cours...',
    'loi.sc4': 'Soumettre la LOI',

    // LOI Form Error Messages
    'loi.errors.requiredFields': 'Veuillez remplir tous les champs obligatoires',
    'loi.errors.serverInvalid': 'Le serveur a renvoyé une réponse invalide',
    'loi.errors.failedSubmit': 'Échec de l\'envoi de la LOI',
    'loi.errors.networkError': 'Erreur de réseau',
    'loi.errors.connectionFailed': 'Échec de la connexion au serveur. Veuillez vérifier votre connexion internet ou réessayer plus tard.',
    'loi.errors.tryAgain': 'Échec de l\'envoi de la LOI. Veuillez réessayer.',
    
    // LOI Form Success Messages
    'loi.success.submitted': 'LOI envoyée avec succès',
    'loi.success.received': 'Votre Lettre d\'Intention a été reçue. Nous vous contacterons prochainement.',
    
    // Quote Request Form Error Messages
    'quote.errors.requiredFields': 'Veuillez remplir tous les champs obligatoires',
    'quote.errors.serverInvalid': 'Le serveur a renvoyé une réponse invalide',
    'quote.errors.failedSubmit': 'Échec de l\'envoi de la demande de devis',
    'quote.errors.networkError': 'Erreur de réseau',
    'quote.errors.connectionFailed': 'Échec de la connexion au serveur. Veuillez vérifier votre connexion internet ou réessayer plus tard.',
    'quote.errors.tryAgain': 'Échec de l\'envoi de la demande de devis. Veuillez réessayer.',
    
    // Quote Request Form Success Messages
    'quote.success.submitted': 'Demande de devis envoyée avec succès',
    'quote.success.received': 'Votre demande a été reçue. Votre numéro de ticket est : {0}',
    
    // Contact Form Error Messages
    'contact.errors.failedSend': 'Échec de l\'envoi du message. Veuillez réessayer.',
    'contact.errors.networkError': 'Erreur',
    
    // Contact Form Success Messages
    'contact.success.messageSent': 'Message Envoyé',
    'contact.success.getBackSoon': 'Nous vous répondrons bientôt.',

    // Footer
    'slogan':'Solutions commerciales mondiales haut de gamme offrant des produits de haute qualité avec un service fiable dans le monde entier.',
    'footer.rights': 'Tous droits réservés',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.terms': 'Conditions d\'Utilisation',
    'nav.quick_link':'Liens rapides',
    'footer.registry': 'N° de Registre:',
    'footer.license': 'N° de Licence Économique:',
  },
  
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.products': 'المنتجات',
    'nav.inquiry': 'طلب عرض سعر',
    'nav.contact': 'اتصل بنا',

    //Header
    'logo.title':'ROODAN',
    
    // Hero
    'hero.title': 'Roodan General Trading',
    'hero.subtitle': 'منتجات عالمية الجودة مع خدمة موثوقة',
    'hero.cta': 'استكشاف المنتجات',
    
    // Strengths
    'strengths.title': 'نقاط قوتنا',
    'strengths.quality.title': 'الجودة',
    'strengths.quality.desc': 'يتم الحصول على منتجاتنا من الموردين ذوي الخبرة والموثوقين الذين يتم اختيارهم من قبل فريقنا الميداني',
    'strengths.reliability.title': 'الموثوقية',
    'strengths.reliability.desc': 'نحن نعمل مع شركاء موثوق بهم وهم جزء متكامل من سلسلة التوريد الخاصة بنا والذين يقدمون حلاً شاملاً بشفافية ٪  100',
    'strengths.partnership.title': 'الشراكة',
    'strengths.partnership.desc': 'تعتمد شراكاتنا طويلة الأمد مع جميع أصحاب المصلحة لدينا على الثقة والشفافية طويلة الأمد',
    'strengths.flexibility.title': 'المرونة',
    'strengths.flexibility.desc': 'نحن نقدم حلول تصدير مصممة خصيصًا وفقًا لاحتياجات العملاء',
    
    // Products
    'products.title': 'منتجاتنا',
    'products.description': 'اكتشف مجموعتنا الشاملة من المنتجات ذات الجودة المتميزة، التي يتم الحصول عليها من موردين عالميين موثوقين.',
    'products.viewAll': 'عرض جميع المنتجات',
    'products.viewDetails': 'عرض التفاصيل',
    'products.sugar': 'السكر والصويا',
    'products.sugarDesc': 'إيكومسا 45، إيكومسا 100، إيكومسا 150',
    'products.soy': 'منتجات الصويا',
    'products.soyDesc': 'فول الصويا، دقيق الصويا، زيت الصويا',
    'products.coffee': 'حبوب القهوة',
    'products.coffeeDesc': 'روبوستا وأرابيكا',
    'products.meat': 'منتجات اللحوم',
    'products.meatDesc': 'لحم البقر والدجاج وسمن البقر',
    'products.oil': 'الزيوت النباتية',
    'products.oilDesc': 'CP8، CP10 وزيت الزيتون',
    'products.rice': 'الأرز',
    'products.riceDesc': 'بسمتي، ياسمين وأرز أبيض',
    'products.olive': 'زيت الزيتون',
    'products.urea': 'اليوريا والأسمدة',
    'products.petroleum': 'المنتجات البترولية',
    'products.petroleumDesc': 'EN 590، D2، AGO، Jet A1',
    'products.searchPlaceholder': 'بحث عن المنتجات...',
    'products.categories.all': 'جميع المنتجات',
    'products.categories.food': 'المنتجات الغذائية',
    'products.categories.oils': 'الزيوت',
    'products.categories.agri': 'المنتجات الزراعية',
    'products.categories.petro': 'المنتجات البترولية',
    'products.requestQuote': 'طلب عرض سعر',
    'products.noProductsFound': 'لم يتم العثور على منتجات',
    'products.noProductsMatching': 'لا توجد منتجات تطابق "{query}" في فئة {category}.',
    'products.noProductsInCategory': 'لا توجد منتجات متاحة في فئة {category}.',
    'products.clearFilters': 'مسح عوامل التصفية',
    
    // Product Details
    'product.sugar.title': 'سكر ICUMSA',
    'product.sugar.description': 'سكر ممتاز بدرجات ICUMSA متنوعة من البرازيل',
    'product.sugar.detail1': 'ICUMSA 45 (سكر أبيض)، ICUMSA 100 (سكر خام)، ICUMSA 150',
    'product.sugar.detail2': 'التعبئة: أكياس 50 كجم أو أكياس كبيرة',
    'product.sugar.detail3': 'التسليم: CIF، FOB، إلخ.',
    
    'product.soy.title': 'منتجات الصويا',
    'product.soy.description': 'منتجات صويا عالية الجودة لمختلف التطبيقات',
    'product.soy.detail1': 'فول الصويا (خالي من المواد المعدلة وراثيًا عند الطلب)، دقيق الصويا، زيت الصويا',
    'product.soy.detail2': 'التعبئة: وفقًا لمتطلبات العميل',
    'product.soy.detail3': 'التسليم: عالمي، مرن',
    
    'product.coffee.title': 'حبوب القهوة',
    'product.coffee.description': 'حبوب قهوة روبوستا وأرابيكا ممتازة',
    'product.coffee.detail1': 'روبوستا (قوية) وأرابيكا (خفيفة)',
    'product.coffee.detail2': 'المنشأ: أمريكا الجنوبية، آسيا، أفريقيا',
    'product.coffee.detail3': 'التعبئة: أكياس 50 كجم أو أكياس كبيرة',
    
    'product.beef.title': 'منتجات اللحم البقري',
    'product.beef.description': 'لحم بقري عالي الجودة من الهند',
    'product.beef.detail1': 'لحم بقري مجمد، قطع متنوعة',
    'product.beef.detail2': 'التعبئة: سلع مجمدة',
    'product.beef.detail3': 'التسليم: عالمي',
    
    'product.chicken.title': 'لحم الدجاج',
    'product.chicken.description': 'منتجات دجاج متنوعة بأعلى جودة',
    'product.chicken.detail1': 'دجاج كامل، صدور دجاج، أفخاذ دجاج، أجنحة دجاج',
    'product.chicken.detail2': 'التعبئة: سلع مجمدة',
    'product.chicken.detail3': 'التسليم: عالمي',
    
    'product.ghee.title': 'سمن بقري',
    'product.ghee.description': 'سمن بقري نقي من الهند',
    'product.ghee.detail1': 'سمن بقري نقي 100%',
    'product.ghee.detail2': 'التعبئة: علب 1 كجم، دلاء 15 كجم',
    'product.ghee.detail3': 'التسليم: عالمي',
    
    'product.vegetable.title': 'زيوت نباتية',
    'product.vegetable.description': 'زيوت نباتية عالية الجودة CP8 و CP10 من آسيا',
    'product.vegetable.detail1': 'زيت النخيل، أحجام تعبئة مختلفة',
    'product.vegetable.detail2': 'التسليم: CIF، FOB أو حسب الترتيب',
    'product.vegetable.detail3': 'جودة ممتازة للتطبيقات الغذائية والصناعية',
    
    'product.rice.title': 'أنواع الأرز',
    'product.rice.description': 'أنواع أرز ممتازة من جميع أنحاء العالم',
    'product.rice.detail1': 'بسمتي، ياسمين، مسلوق، أرز أبيض',
    'product.rice.detail2': 'التعبئة: أكياس 5 كجم، 25 كجم أو أكياس كبيرة',
    'product.rice.detail3': 'التسليم: CIF، FOB',
    
    'product.olive.title': 'زيت الزيتون',
    'product.olive.description': 'زيت زيتون ممتاز من اليونان',
    'product.olive.detail1': 'زيت زيتون بكر ممتاز، زيت زيتون بكر، زيت زيتون مكرر',
    'product.olive.detail2': 'التعبئة: زجاجات 1 لتر، علب 5 لتر، براميل 200 لتر',
    'product.olive.detail3': 'التسليم: CIF، FOB',
    
    'product.urea.title': 'اليوريا والأسمدة',
    'product.urea.description': 'يوريا وأسمدة عالية الجودة للاستخدام الزراعي',
    'product.urea.detail1': 'يوريا 46% حبيبية ومحببة',
    'product.urea.detail2': 'التعبئة: أكياس 50 كجم أو أكياس كبيرة',
    'product.urea.detail3': 'التسليم: عالمي',
    
    'product.petroleum.title': 'المنتجات البترولية',
    'product.petroleum.description': 'منتجات بترولية ممتازة لمختلف التطبيقات',
    'product.petroleum.detail1': 'EN 590, D2, AGO, Jet A1',
    'product.petroleum.detail2': 'ديزل، وقود طيران، وقود سيارات',
    'product.petroleum.detail3': 'التسليم: CIF، FOB',
    
    // About
    'about.title': 'اتصال',
    'about.subtitle': 'مهمتنا وقيمنا',
    'about.mission.title': 'مهمتنا',
    'about.mission.desc': 'توفير منتجات عالية الجودة من خلال شراكات شفافة وموثوقة في جميع أنحاء العالم.',
    'about.services.title': 'خدماتنا',
    'about.services.desc': 'توفير منتجات عالية الجودة مع الثقة والشفافية في جميع أنحاء العالم',
    'about.values.title': 'قيمنا',
    'about.values.desc': 'الجودة والموثوقية والشراكة والمرونة تشكل حجر الزاوية في فلسفة أعمالنا.',
    'about.experience.title': 'خبرتنا',
    'about.experience.desc': 'مع سنوات من الخبرة في التجارة الدولية، أقمنا شراكات قوية وسمعة في التميز.',
    'about.team.title': 'فريق القيادة لدينا',
    'about.team.desc':'اكتشف الأفراد الاستثنائيين الذين يقودون رؤية شركتنا ونجاحها.',
    'about.partners.title': 'شركاؤنا',
    'about.partners.subtitle': 'الشركاء والتمثيل العالمي',
    'about.partners.desc': 'بصفتنا شركة تجارية دولية مقرها أبو ظبي، نعمل عن كثب مع شركاء موثوقين في جميع أنحاء العالم. تمكننا هذه الشراكات من ضمان التوريد الفعال والتوزيع الموثوق والمعالجة المهنية في جميع الأسواق.',

      // Our Partners
      'about.partners.europe': 'التمثيل الأوروبي',
      'about.partners.europe.compName': 'مورد المواد الغذائية الدولي',
      'about.partners.europe.name': 'السيد مورينو ونونوز',
      'about.partners.europe.location': 'مدريد، إسبانيا',

      'about.partners.westAfrica': 'توزيع غرب إفريقيا',
      'about.partners.westAfrica.compName': 'سوفا جلوبال بيزنس للاستيراد والتصدير',
      'about.partners.westAfrica.name': 'السيد عبد الرحمن ديالو',
      'about.partners.westAfrica.location': 'داكار، السنغال',

      'about.partners.mali': 'توزيع مالي',
      'about.partners.mali.compName': 'فاطوماتا حيدرة نيقوس-سيرفيس',
      'about.partners.mali.name': 'السيدة فاطوماتا حيدرة',
      'about.partners.mali.location': 'باماكو، مالي',

      'about.partners.eastAfrica': 'توزيع شرق إفريقيا',
      'about.partners.eastAfrica.compName': 'الوابِل الصائب للتجارة',
      'about.partners.eastAfrica.name': 'السيد عبد السلام مكي أ. يحيى',
      'about.partners.eastAfrica.location': 'الخرطوم، السودان',

      'about.partners.asia': 'التمثيل الآسيوي',
      'about.partners.asia.compName': 'ساتفيك فودز المحدودة',
      'about.partners.asia.name': 'السيدة أدتي مور',
      'about.partners.asia.location': 'مومباي، الهند',

      'about.partners.india': 'المواد الغذائية والفواكه الهندية',
      'about.partners.india.compName': 'تجار شي المحدودة',
      'about.partners.india.name': 'السيد كاكاساهب تشافان',
      'about.partners.india.location1': 'مومباي، الهند',
      'about.partners.india.location2': 'عثمان آباد، الهند',

      'about.partners.latinAmerica': 'التمثيل الأمريكي اللاتيني',
      'about.partners.latinAmerica.compName': 'رودان دو برازيل',
      'about.partners.latinAmerica.name': 'السيد فيتشينزو لوريا',
      'about.partners.latinAmerica.location': 'فيتوريا دا كونكويستا – باهيا، البرازيل',

      'about.partners.logistics': 'الشريك اللوجستي',
      'about.partners.logistics.compName': 'يونايتد جلوبال لوجيستك',
      'about.partners.logistics.name': 'السيد مو خان',
      'about.partners.logistics.location': 'نيويورك، الولايات المتحدة الأمريكية',

      'about.partners.uae': 'شركاؤنا في الإمارات',
      'about.partners.uae.compName1': 'بوتنر لتجارة القهوة ش.ذ.م.م',
      'about.partners.uae.name1': 'السيد سيباستيان بوتنر',
      'about.partners.uae.location1': 'دبي، الإمارات',
      'about.partners.uae.compName2': 'ويلث كابيتال جلوبال تريدينج ش.ذ.م.م',
      'about.partners.uae.name2': 'السيد سليم خليليال',
      'about.partners.uae.location2': 'ديرة، الإمارات',

      'about.partners.ivoryCoast': 'ممثل ساحل العاج',
      'about.partners.ivoryCoast.compName': 'شركة ريكوردز هولدينغ ش.م.',
      'about.partners.ivoryCoast.name': 'السيد مالك واتارا',
      'about.partners.ivoryCoast.location': 'أبيدجان - ساحل العاج',
      'about.partners.ivoryCoast.address': '03 BP 2603 ABIDJAN 03',

    // Our Mission
    'about.values.value1.title':'ضمان الجودة',
    'about.values.value1.desc': 'توفير منتجات زراعية وصناعية عالية الجودة تتوافق مع المعايير العالمية.',
    'about.values.value2.title':'شراكات موثوقة',
    'about.values.value2.desc': 'بناء علاقات طويلة الأمد مع العملاء من خلال ضمان التسليم في الوقت المناسب وبكفاءة.',
    'about.values.value3.title':'التجارة المستدامة',
    'about.values.value3.desc': 'تعزيز ممارسات التجارة المستدامة والأخلاقية في جميع عملياتنا.',
    'about.values.value4.title':'التزام العملاء',
    'about.values.value4.desc': 'لضمان رضا العملاء من خلال الأسعار التنافسية والخدمات اللوجستية المتفوقة والخدمة الاستثنائية.',

    // Our Services
    'about.service.service1.title':'إدارة المشاريع والاستشارات',
    'about.service.service1.item1':'التخطيط والتنفيذ وتحسين المشاريع',
    'about.service.service1.item2':'تحليل العمليات وتحسين الكفاءة',
    'about.service.service1.item3':'الاستشارات الاستراتيجية واستراتيجيات دخول السوق',
    'about.service.service2.title':'التجارة العامة والتوزيع',
    'about.service.service2.item1':'استيراد وتصدير مختلف السلع',
    'about.service.service2.item2':'إدارة المشتريات والخدمات اللوجستية ',
    'about.service.service2.item3':'تطوير استراتيجيات التجارة', 
      
    // About.Why Choose Us
    'about.whyChooseUs.title': 'لماذا تختارنا؟',
    'about.whyChooseUs.title1': 'ضمان الجودة العالية',
    'about.whyChooseUs.reason1': 'منتجات فائقة الجودة من موردين موثوقين في جميع أنحاء العالم',
    'about.whyChooseUs.title2': 'حلول لوجستية مخصصة',
    'about.whyChooseUs.reason2': 'شروط تسليم مرنة لتلبية متطلباتك المحددة',
    'about.whyChooseUs.title3': 'أسعار تنافسية وشفافة',
    'about.whyChooseUs.reason3': 'أسعار تنافسية وممارسات تجارية شفافة',
    'about.whyChooseUs.title4': 'دعم العملاء المخصص',
    'about.whyChooseUs.reason4': 'خدمة عملاء سريعة الاستجابة ودعم مخصص',
    'about.whyChooseUs.title5': 'خبرة عالمية وشبكة موثوقة',
    'about.whyChooseUs.reason5': 'سنوات من الخبرة في التجارة الدولية مع شبكة عالمية',
    
    // Contact
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'تواصل مع فريقنا',
    'contact.address': 'العنوان',
    'contact.address_main':'أبراج الخالدية، طابق الميزانين،\nشارع الفسكر W10،\nالبطين، الخالدية،\nأبوظبي،\n\nالإمارات العربية المتحدة',
    'contact.phone': 'الهاتف',
    'contact.email': 'البريد الإلكتروني',
    'contact.form.name': 'اسمك',
    'contact.form.email': 'بريدك الإلكتروني',
    'contact.form.message': 'رسالتك',
    'contact.form.submit': 'إرسال الرسالة',
    'contact.whatsapp' : 'واتساب',     
    'SendUs.title' : 'أرسل لنا رسالة',
    'SendUs.desc' :'هل لديك سؤال أو استفسار؟ املأ النموذج أدناه وسنقوم بالرد عليك في أقرب وقت ممكن.',
    'contact.form.message_placeholder': 'رسالتك هنا...',
    'SendUs.button':'يرسل',
    'SendUs.sending':'إرسال...',
    'SendUS.success':'تم إرسال الرسالة بنجاح!',

    // LOI Form starts here
    'loi.title': 'خطاب النوايا (LOI)',
    'loi.subtitle': 'CIF ASWP - أكمل النموذج أدناه لتقديم خطاب النوايا الخاص بك',
    'loi.sections.loiDetails': 'تفاصيل خطاب النوايا',
    'loi.id': 'تاريخ الإصدار',
    'loi.vu': 'تاريخ الإصدار',
    'loi.sections.productDetails': 'تفاصيل المنتج',

    // Product details fields
    'loi.product.name': 'اسم المنتج',
    'loi.product.quantity': 'الكمية (طن متري)',
    'loi.product.origin': 'المنشأ',
    'loi.product.shipments': 'الشحنات',
    'loi.product.frequency': 'تكرار التسليم',
    'loi.product.contractLength': 'مدة العقد',
    'loi.product.totalAmount': 'إجمالي كمية العقد (طن متري)',
    'loi.product.incoterms': 'شروط الإنكوترمز 2020',
    'loi.product.deliveryPort': 'ميناء التسليم',
    'loi.product.targetPrice': 'السعر المستهدف (دولار أمريكي) لكل طن متري',
    'loi.product.e.g': 'على سبيل المثال سكر ICUMSA 45',
    'loi.product.quantityPlaceholder': 'مثال: 25,000',
    'loi.product.originPlaceholder': 'مثال: البرازيل',
    'loi.product.shipmentsPlaceholder': 'مثال: 5,000 طن متري × 5',
    'loi.product.frequencyPlaceholder': 'مثال: شهريًا',
    'loi.product.contractLengthPlaceholder': 'مثال: 12 شهرًا',
    'loi.product.totalAmountPlaceholder': 'مثال: 25,000',
    'loi.product.selectIncoterms': 'اختر شروط الإنكوترمز',
    'loi.product.deliveryPortPlaceholder': 'مثال: ميناء دبي',
    'loi.product.targetPricePlaceholder': 'مثال: 450',

    // Incoterm options
    'loi.incoterms.cif': 'سيف (التكلفة والتأمين والشحن)',
    'loi.incoterms.fob': 'فوب (تسليم ظهر السفينة)',
    'loi.incoterms.exw': 'إكسدبليو (تسليم المصنع)',
    'loi.incoterms.ddp': 'دي دي بي (التسليم خالص الرسوم)',
    'loi.incoterms.fas': 'فاس (تسليم جانب السفينة)',
    'loi.incoterms.cfr': 'سي إف آر (التكلفة والشحن)',

    // Inspection options
    'loi.inspection.sgs': 'SGS (جمعية المراقبة العامة)',
    'loi.inspection.intertek': 'انترتيك',
    'loi.inspection.ciq': 'CIQ (التفتيش والحجر الصحي في الصين)',

    // Upload document
    'loi.upload.document': 'تحميل المستندات (PDF/صورة)',

    // Payment and Inspection section
    'loi.sections.paymentInspection': 'الدفع والتفتيش',
    'loi.payment.terms': 'شروط الدفع',
    'loi.payment.termsContent': 'يقوم المشتري بإصدار الدفع إلى بنك البائع بعد التفتيش في ميناء التحميل في غضون ثلاثة (3) أيام عمل بعد اجتياز الشحنة التفتيش من قبل SGS أو ما يعادلها، واستلام جميع مستندات الدفع ذات الصلة.',
    'loi.payment.inspection': 'التفتيش',
    'loi.payment.selectInspection': 'اختر وكالة التفتيش',
    'loi.payment.inspectionNote': 'في ميناء التحميل يكون على حساب ونفقة البائع / في ميناء التفريغ يكون على حساب ونفقة المشتري',

    // Additional Details section
    'loi.sections.additionalDetails': 'تفاصيل إضافية',
    'loi.additional.observations': 'ملاحظات',
    'loi.additional.observationsPlaceholder': 'أي ملاحظات إضافية',
    'loi.additional.specifications': 'المواصفات',
    'loi.additional.specificationsPlaceholder': 'مواصفات المنتج',

    // Buyer Information section
    'loi.sections.buyerInfo': 'معلومات المشتري',
    'loi.buyer.companyName': 'اسم الشركة',
    'loi.buyer.regNumber': 'رقم تسجيل الشركة',
    'loi.buyer.address': 'العنوان / المدينة / الولاية / الرمز البريدي / الدولة',
    'loi.buyer.repName': 'اسم الممثل القانوني',
    'loi.buyer.title': 'اللقب',
    'loi.buyer.phone': 'الهاتف / الجوال',
    'loi.buyer.email': 'البريد الإلكتروني',
    'loi.buyer.website': 'الموقع الإلكتروني',
    'loi.buyer.companyNamePlaceholder': 'اسم شركتك',
    'loi.buyer.regNumberPlaceholder': 'رقم التسجيل',
    'loi.buyer.addressPlaceholder': 'عنوان الشركة',
    'loi.buyer.repNamePlaceholder': 'اسم الممثل',
    'loi.buyer.titlePlaceholder': 'المسمى الوظيفي',
    'loi.buyer.phonePlaceholder': 'رقم الهاتف',
    'loi.buyer.emailPlaceholder': 'عنوان البريد الإلكتروني',
    'loi.buyer.websitePlaceholder': 'موقع الشركة الإلكتروني',

    // buyer bank information section
    'loi.sections.bankInfo': 'معلومات بنك المشتري',
    'loi.bn': 'اسم البنك',
    'loi.bwc': 'رمز سويفت البنكي',
    'loi.bd': 'عنوان البنك / المدينة / الولاية / الرمز البريدي / الدولة',
    'loi.an': 'اسم الحساب',
    'loi.anu': 'رقم الحساب',
    'loi.bot': 'اللقب الوظيفي لمسؤول البنك',
    'loi.bon': 'اسم مسؤول البنك',
    'loi.signaturePlaceholder': 'الاسم القانوني الكامل كتوقيع',
    'loi.bankNamePlaceholder': 'اسم البنك',
    'loi.bankSwiftCodePlaceholder': 'رمز SWIFT/BIC',
    'loi.bankAddressPlaceholder': 'عنوان البنك',
    'loi.accountNamePlaceholder': 'اسم صاحب الحساب',
    'loi.accountNumberPlaceholder': 'رقم الحساب',
    'loi.bankOfficerNamePlaceholder': 'اسم مسؤول البنك',
    'loi.bankOfficerTitlePlaceholder': 'منصب مسؤول البنك',

    // legal warning
    'loi.sections.legalWarnings': 'تحذيرات قانونية',
    'loi.wr1': 'نقر بأن لدينا الخبرة التشغيلية، وسعة التخزين، والموارد المالية اللازمة لتنفيذ هذا الخطاب LOI',
    'loi.wr2': 'نحن ندرك تمامًا ونقبل جميع الشروط والالتزامات الواردة في هذا الخطاب LOI',
    'loi.wr3': 'نقر بأن تقديم مستندات مزورة قد يؤدي إلى اتخاذ إجراءات قانونية من قبل السلطات، بما في ذلك FBI، الإنتربول، ICC، وغيرها من المنظمات الدولية',

    // signature
    'loi.sections.signature': 'التوقيع والمرفقات',
    'loi.lg1': 'توقيع الممثل القانوني',
    'loi.lg2': 'تحميل المستندات (PDF/صورة)',
    'loi.lg3': 'مطلوب: ختم/ختم الشركة وصورة جواز السفر',

    // special condition
    'loi.sections.specialConditions': 'شروط خاصة',
    'loi.sc1': 'يتطلب هذا الخطاب LOI موافقة خطية نهائية من كلا الطرفين',
    'loi.sc2': 'تعتبر النسخ الإلكترونية مكافئة قانونيًا للأصول',
    'loi.sc3': 'جارٍ الإرسال...',
    'loi.sc4': 'إرسال LOI',

    // LOI Form Error Messages
    'loi.errors.requiredFields': 'يرجى ملء جميع الحقول المطلوبة',
    'loi.errors.serverInvalid': 'أرجع الخادم استجابة غير صالحة',
    'loi.errors.failedSubmit': 'فشل في إرسال خطاب النوايا',
    'loi.errors.networkError': 'خطأ في الشبكة',
    'loi.errors.connectionFailed': 'فشل الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت الخاص بك أو المحاولة مرة أخرى لاحقا.',
    'loi.errors.tryAgain': 'فشل في إرسال خطاب النوايا. يرجى المحاولة مرة أخرى.',
    
    // LOI Form Success Messages
    'loi.success.submitted': 'تم إرسال خطاب النوايا بنجاح',
    'loi.success.received': 'تم استلام خطاب النوايا الخاص بك. سنتصل بك قريبا.',
    
    // Quote Request Form Error Messages
    'quote.errors.requiredFields': 'يرجى ملء جميع الحقول المطلوبة',
    'quote.errors.serverInvalid': 'أرجع الخادم استجابة غير صالحة',
    'quote.errors.failedSubmit': 'فشل في إرسال طلب عرض السعر',
    'quote.errors.networkError': 'خطأ في الشبكة',
    'quote.errors.connectionFailed': 'فشل الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت الخاص بك أو المحاولة مرة أخرى لاحقا.',
    'quote.errors.tryAgain': 'فشل في إرسال طلب عرض السعر. يرجى المحاولة مرة أخرى.',
    
    // Quote Request Form Success Messages
    'quote.success.submitted': 'تم إرسال طلب عرض السعر بنجاح',
    'quote.success.received': 'تم استلام طلبك. رقم التذكرة الخاص بك هو: {0}',
    
    // Contact Form Error Messages
    'contact.errors.failedSend': 'فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.',
    'contact.errors.networkError': 'خطأ',
    
    // Contact Form Success Messages
    'contact.success.messageSent': 'تم إرسال الرسالة',
    'contact.success.getBackSoon': 'سنرد عليك قريبا.',

    // Footer
    'slogan':'حلول تجارية عالمية متميزة توفر منتجات عالية الجودة مع خدمة موثوقة في جميع أنحاء العالم..',
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'nav.quick_link':'روابط سريعة',
    'footer.registry': 'رقم السجل:',
    'footer.license': 'رقم الرخصة الاقتصادية:',
  }
};

// Create the store
export const useI18n = create<I18nState>((set, get) => ({
  language: 'en',
  setLanguage: (language) => {
    // Force a more complete update by providing a fresh function
    set({ 
      language,
      t: (key: string) => {
        return translations[language][key] || key;
      }
    });
  },
  t: (key) => {
    const { language } = get();
    return translations[language][key] || key;
  }
}));
