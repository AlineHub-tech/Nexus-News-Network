
import React, { useContext } from 'react';
import { NewsContext } from '../context/NewsContext';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 
import '../styles/TermsOfService.css'; 

const translations = {
  title: { en: "Terms of Service", rw: "Amabwiriza Agenga Serivisi", fr: "Conditions d'Utilisation" },
  lastUpdated: { en: "Last Updated: January 9, 2026", rw: "Byavuguruwe bwa nyuma: Mutarama 9, 2026", fr: "Dernière mise à jour : 9 janvier 2026" },
  sec1Title: { en: "1. Acceptance of Terms", rw: "1. Kwemera Amabwiriza", fr: "1. Acceptation des Conditions" },
  sec1P1: { en: "By accessing and using the Nexus News Network website (the \"Service\"), you agree to be bound by these Terms of Service. If you do not agree to any part of the terms, you may not access the Service.", rw: "Mukoresheje urubuga rwa Nexus News Network (\"Serivisi\"), mwemeye kubahiriza aya mabwiriza. Nimutemera igice na kimwe cy'aya mabwiriza, ntimushobora gukoresha iyi Serivisi.", fr: "En accédant et en utilisant le site Web Nexus News Network (le « Service »), vous acceptez d'être lié par les présentes Conditions d'utilisation. Si vous n'acceptez aucune partie des conditions, vous ne pouvez pas accéder au Service." },
  sec2Title: { en: "2. Intellectual Property", rw: "2. Uburenganzira bw'Umuhanga (Intellectual Property)", fr: "2. Propriété Intellectuelle" },
  sec2P1: { en: "The Service and its original content, features, and functionality are and will remain the exclusive property of Nexus News Network and its licensors. Content is protected by copyright, trademark, and other laws.", rw: "Serivisi n'ibikubiyemo by'umwimerere, imikorere, n'ibindi bizakomeza kuba umutungo wihariye wa Nexus News Network n'abayifashisha. Ibirimo birinzwe n'amategeko agenga uburenganzira bwo gukora no gukwirakwiza ibihangano, ikirango, n'andi mategeko.", fr: "Le Service et son contenu original, ses fonctionnalités et ses fonctionnalités sont et resteront la propriété exclusive de Nexus News Network et de ses concédants. Le contenu est protégé par les droits d'auteur, les marques de commerce et d'autres lois." },
  sec3Title: { en: "3. User Contributions & Conduct", rw: "3. Uruhare rw'Abakoresha n'Imyitwarire", fr: "3. Contributions et Conduite des Utilisateurs" },
  sec3P1: { en: "Users may post comments and content, provided it is not illegal, obscene, defamatory, threatening, infringing of intellectual property rights, or otherwise injurious to third parties.", rw: "Abakoresha bashobora gutangaza ibitekerezo n'ibikubiyemo, ariko ntibyemewe ko biba binyuranyije n'amategeko, biteye isoni, byangisha abandi, bibangamira umutekano, binyuranije n'uburenganzira bw'ubuhanga, cyangwa bibangamira abandi bantu.", fr: "Les utilisateurs peuvent publier des commentaires et du contenu, à condition que ce ne soit pas illégal, obscène, diffamatoire, menaçant, portant atteinte aux droits de propriété intellectuelle, ou autrement préjudiciable à des tiers." },
  sec3P2: { en: "We reserve the right to remove or edit content at our sole discretion.", rw: "Twifitiye uburenganzira bwo gukuraho cyangwa guhindura ibikubiyemo uko tubishaka.", fr: "Nous nous réservons le droit de supprimer ou de modifier le contenu à notre seule discrétion." },
  sec4Title: { en: "4. Limitation of Liability", rw: "4. Kubera Ibishobora Kuba Bikwangiza", fr: "4. Limitation de Responsabilité" },
  sec4P1: { en: "Nexus News Network shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of the Service.", rw: "Nexus News Network ntabwo izagira uruhare ku byangiritse bitaziguye, bitewe n'impanuka, bidasanzwe, byakurikiyeho cyangwa byo guhana, harimo, ariko ntibigarukira gusa, igihombo cy'inyungu, amakuru, ikoreshwa, izina ryiza, cyangwa ibindi bitagaragara, biturutse ku ikoreshwa rya Serivisi.", fr: "Nexus News Network ne sera pas responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, y compris, sans limitation, la perte de profits, de données, d'utilisation, de clientèle ou d'autres pertes intangibles, résultant de votre accès ou de votre utilisation du Service." },
  sec5Title: { en: "5. Governing Law", rw: "5. Amategeko Agenga", fr: "5. Droit Applicable" },
  sec5P1: { en: "These Terms shall be governed and construed in accordance with the laws of the Republic of Rwanda, without regard to its conflict of law provisions.", rw: "Aya mabwiriza azagengwa kandi asobanurwe hakurikijwe amategeko ya Repubulika y'u Rwanda, hatarebwe amategeko ahana ayandi.", fr: "Les présentes Conditions seront régies et interprétées conformément aux lois de la République du Rwanda, hatarebwe amategeko ahana ayandi.", fr: "Les présentes Conditions seront régies et interprétées conformément aux lois de la République du Rwanda, without regard to its conflict of law provisions." },
};

const TermsOfService = () => {
  const { language } = useContext(NewsContext);


  const t = (key) => translations[key]?.[language] || translations[key]?.en;

  return (
    <div className="app-container">
      <Navbar/>
      
      <main className="terms-container">
        <div className="content-card">
          
          <h1 className="policy-title">{t('title')}</h1>
          
          <p className="last-updated">
            <em>{t('lastUpdated')}</em>
          </p>

          <section>
            <h2 className="section-title">{t('sec1Title')}</h2>
            <p className="section-content">{t('sec1P1')}</p>
          </section>

          <section>
            <h2 className="section-title">{t('sec2Title')}</h2>
            <p className="section-content">{t('sec2P1')}</p>
          </section>

          <section>
            <h2 className="section-title">{t('sec3Title')}</h2>
            <p className="section-content">{t('sec3P1')}</p>
            <p className="section-content">{t('sec3P2')}</p>
          </section>
          
          <section>
            <h2 className="section-title">{t('sec4Title')}</h2>
            <p className="section-content">{t('sec4P1')}</p>
          </section>

           <section>
            <h2 className="section-title">{t('sec5Title')}</h2>
            <p className="section-content">{t('sec5P1')}</p>
          </section>
          
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default TermsOfService;

