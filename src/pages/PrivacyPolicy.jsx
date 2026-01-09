
import React, { useContext } from 'react';
import { NewsContext } from '../context/NewsContext';

// SHYIRA TRANSLATIONS HANZE YA FUNCTION NYAMUKURU
const translations = {
  title: { en: "Privacy Policy", rw: "Politiki Y'ibanga", fr: "Politique de Confidentialité" },
  lastUpdated: { en: "Last Updated: January 9, 2026", rw: "Byavuguruwe bwa nyuma: Mutarama 9, 2026", fr: "Dernière mise à jour : 9 janvier 2026" },

  // Section 1: Data Collection
  sec1Title: { en: "1. Data We Collect", rw: "1. Amakuru Dukusanya", fr: "1. Données que nous Collectons" },
  sec1P1: { en: "We collect personal data to provide and improve our Service. The types of data we collect include: Personal Data (Email address, Name, Phone Number, Location) and Usage Data (IP addresses, pages visited, browser type).", rw: "Dukusanya amakuru kugirango dutange kandi tunezeze abakoresha serivisi zacu. Amakuru dukusanya arimo: Amakuru bwite (Email, Amazina, Nimero ya Telefone, Aho uherereye) n'Amakuru ajyanye n'ikoreshwa (IP address, pages wasuye, ubwoko bwa mushakisha ukoresha).", fr: "Nous collectons des données personnelles pour fournir et améliorer notre Service. Les types de données que nous collectons incluent : Données personnelles (Adresse e-mail, Nom, Numéro de téléphone, Emplacement) et Données d'utilisation (Adresses IP, pages visitées, type de navigateur)." },

  // Section 2: Use of Data
  sec2Title: { en: "2. How We Use Your Data", rw: "2. Uburyo Dukoresha Amakuru Yawe", fr: "2. Comment nous Utilisons vos Données" },
  sec2P1: { en: "We use the collected data for various purposes: to provide and maintain the Service, to notify you about changes to our Service, to provide customer support, to monitor the usage of the Service, and for targeted advertising and analytics.", rw: "Dukoresha amakuru yakusanyijwe mu mpamvu zitandukanye: gutanga no kubungabunga Serivisi, kukumenyesha impinduka kuri Serivisi zacu, gutanga ubufasha, kugenzura ikoreshwa rya Serivisi, no kwamamaza byihariye no gusesengura imikoreshereze.", fr: "Nous utilisons les données collectées à diverses fins : fournir et maintenir le Service, vous informer des modifications apportées à notre Service, fournir un support client, surveiller l'utilisation du Service, et pour la publicité ciblée et l'analyse." },

  // Section 3: Data Disclosure & Security
  sec3Title: { en: "3. Disclosure & Security of Data", rw: "3. Gutanga Amakuru n'Umutekano", fr: "3. Divulgation et Sécurité des Données" },
  sec3P1: { en: "We may share your information with trusted third-party service providers (like analytics partners) to facilitate our Service. We take reasonable steps to protect your data, but remember no method is 100% secure.", rw: "Dushobora gusangiza amakuru yawe abafatanyabikorwa bizewe (nk'abasesengura imikoreshereze) kugirango Serivisi zacu zikore neza. Dufata ingamba zikwiye zo kurinda amakuru yawe, ariko menya ko nta buryo bwizewe 100%.", fr: "Nous pouvons partager vos informations avec des fournisseurs de services tiers de confiance (comme des partenaires d'analyse) pour faciliter notre Service. Dufata ingamba zikwiye zo kurinda amakuru yawe, ariko menya ko nta buryo bwizewe 100%.", fr: "Nous pouvons partager vos informations avec des fournisseurs de services tiers de confiance (comme des partenaires d'analyse) pour faciliter notre Service. Nous prenons des mesures raisonnables pour protéger vos données, mais rappelez-vous qu'aucune méthode n'est sécurisée à 100 %." },

  // Section 4: User Rights
  sec4Title: { en: "4. Your Data Protection Rights", rw: "4. Uburenganzira bwawe ku Makuru", fr: "4. Vos Droits en Matière de Protection des Données" },
  sec4P1: { en: "Depending on your location (e.g., Rwanda DPP Law, GDPR), you may have the right to access, update, or delete the information we have on you. Contact us to exercise these rights.", rw: "Bitewe n'aho uherereye (urugero, itegeko ryo mu Rwanda ryerekeye DPP), ushobora kugira uburenganzira bwo kubona, kuvugurura, cyangwa gusiba amakuru tugufiteho. Twandikire kugirango ukoreshe ubwo burenganzira.", fr: "Selon votre localisation (par exemple, la loi rwandaise sur la PPD, le RGPD), vous pouvez avoir le droit d'accéder, de mettre à jour ou de supprimer les informations que nous détenons sur vous. Contactez-nous pour exercer ces droits." },
};


const PrivacyPolicy = () => {
  const { language } = useContext(NewsContext);


  const t = (key) => translations[key]?.[language] || translations[key]?.en;

  return (
    <div className="page-content" style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>{t('title')}</h1>
      <p><em>{t('lastUpdated')}</em></p>
      
      <h2>{t('sec1Title')}</h2>
      <p>{t('sec1P1')}</p>

      <h2>{t('sec2Title')}</h2>
      <p>{t('sec2P1')}</p>

      <h2>{t('sec3Title')}</h2>
      <p>{t('sec3P1')}</p>
      
      <h2>{t('sec4Title')}</h2>
      <p>{t('sec4P1')}</p>
    </div>
  );
};

export default PrivacyPolicy; 
