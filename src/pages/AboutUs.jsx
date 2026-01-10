import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import "../styles/About.css"; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const translations = {
  mainTitle: {
    en: "About Nexus News Network",
    rw: "Ibirebana na Nexus News Network",
    fr: "À Propos de Nexus News Network",
  },
  p1_strong: { en: "Nexus News Network (NNN Rwanda)", rw: "Nexus News Network (NNN Rwanda)", fr: "Nexus News Network (NNN Rwanda)" },
  p1_rest: {
    en: " is a professional, independent, and community-centered media platform operating under Nexus Group Rwanda. We are committed to delivering reliable, timely, and impactful news that reflects the realities, aspirations, and voices of our people.",
    rw: " ni urubuga rw'itangazamakuru rw'umwuga, rwigenga, kandi rushingiye ku baturage, rukorera munsi ya Nexus Group Rwanda. Twiyemeje gutanga amakuru yizewe, ku gihe, kandi agira ingaruka, agaragaza ibibazo, ibyifuzo, n'amajwi by'abantu bacu.",
    fr: " est une plateforme médiatique professionnelle, indépendante et axée sur la communauté, opérant sous Nexus Group Rwanda. Nous nous engageons à fournir des informations fiables, opportunes et percutantes qui reflètent les réalités, les aspirations et les voix de notre peuple.",
  },
  p2_part1: { en: "Our platform focuses primarily on publishing content in ", rw: "Urubuga rwacu rwibanda cyane ku gutangaza ibikubiyemo mu ", fr: "Notre plateforme se concentre principalement sur la publication de contenu en " },
  p2_strong: { en: "Kinyarwanda", rw: "Kinyarwanda", fr: "Kinyarwanda" },
  p2_part2: { en: ", ensuring accessibility to the wider population, while also producing content in English and French to engage regional and international audiences.", rw: ", bigatuma abantu benshi bayabona, ariko tugakora n'ibikubiyemo mu Cyongereza n'Igifaransa kugira ngo tugere ku banywanyi bo mu karere no ku rwego mpuzamahanga.", fr: ", assurant l'accessibilité à la population au sens large, tout en produisant du contenu en anglais et en français pour engager les publics régionaux et internationaux." },
  p3: {
    en: "At Nexus News Network, we combine responsible journalism, digital innovation, and creative storytelling to inform, educate, and inspire communities. We believe that media plays a vital role in shaping informed societies, strengthening democracy, and promoting positive social transformation.",
    rw: "Kuri Nexus News Network, duhuza itangazamakuru ribereye, udushya twa digitale, n'inkuru zimeze neza kugira ngo tumenye, twigishe, kandi duhuze imiryango. Twizera ko itangazamakuru rifite uruhare runini mu kubaka sosiyete ifite amakuru, gushimangira demokarasi, no guteza imbere impinduka nziza mu mibereho.",
    fr: "Chez Nexus News Network, nous combinons journalisme responsable, innovation numérique et narration créative pour informer, éduquer et inspirer les communautés. Nous pensons que les médias jouent un rôle essentiel dans la formation de sociétés informées, le renforcement de la démocratie et la promotion d'une transformation sociale positive.",
  },
  
   hl1Title: { en: "Credible Journalism", rw: "Itangazamakuru Ryizewe", fr: "Journalisme Crédible" },
  hl1Text: { en: "We prioritize accuracy, fact-checking, and ethical reporting in every story we publish.", rw: "Duhuriza imbere ukuri, kugenzura amakuru, no gutangaza inkuru mu buryo bw'umuco mu nkuru zose dutangaza.", fr: "Nous privilégions l'exactitude, la vérification des faits et le reportage éthique dans chaque histoire que nous publions." },
  
  hl2Title: { en: "Community Impact", rw: "Ingaruka ku Baturage", fr: "Impact Communautaire" },
  hl2Text: { en: "Our stories amplify grassroots voices and highlight issues that matter to local communities.", rw: "Inkuru zacu zitanga ijwi ry'abaturage kandi zigaragaza ibibazo by'ingenzi ku miryango y'ibanze.", fr: "Nos histoires amplifient les voix locales et mettent en évidence les problèmes qui comptent pour les communautés locales." },
  
  hl3Title: { en: "Digital Innovation", rw: "Udushya muri Digital", fr: "Innovation Numérique" },
  hl3Text: { en: "We embrace modern media tools including video, data journalism, and interactive storytelling.", rw: "Twakira ibikoresho bigezweho by'itangazamakuru birimo videwo, itangazamakuru ry'amakuru, n'inkuru zo kuganira.", fr: "Nous adoptons des outils médiatiques modernes, notamment la vidéo, le journalisme de données et la narration interactive." },
  
  hl4Title: { en: "Regional & Global Reach", rw: "Kugera Hose mu Karere n'Isi", fr: "Portée Régionale et Mondiale" },
  hl4Text: { en: "Our multilingual approach allows us to reach audiences beyond Rwanda.", rw: "Uburyo bwacu bwo gukoresha indimi nyinshi bituma tugera no hanze y'u Rwanda.", fr: "Notre approche multilingue nous permet d'atteindre des publics au-delà du Rwanda." },
};

const AboutUs = () => {
  const { language } = useContext(NewsContext);


  const t = (key) => translations[key]?.[language] || translations[key]?.en;

  return (
    <section className="about-section">
      <Navbar/>
      <div className="about-container fade-in">
        <h1 className="main-title">{t("mainTitle")}</h1>

        <p className="about-text">
          <strong>{t("p1_strong")}</strong>
          {t("p1_rest")}
        </p>

        <p className="about-text">
          {t("p2_part1")}
          <strong>{t("p2_strong")}</strong>
          {t("p2_part2")}
        </p>

        <p className="about-text">{t("p3")}</p>

        <div className="about-highlights">
          {/* Card 1 */}
          <div className="highlight-card">
            <i className="fas fa-check-circle icon-large"></i> {/* Real Icon */}
            <h4>{t("hl1Title")}</h4>
            <p>{t("hl1Text")}</p>
          </div>

          {/* Card 2 */}
          <div className="highlight-card">
            <i className="fas fa-users icon-large"></i> {/* Real Icon */}
            <h4>{t("hl2Title")}</h4>
            <p>{t("hl2Text")}</p>
          </div>

    
          <div className="highlight-card">
            <i className="fas fa-lightbulb icon-large"></i> {/* Real Icon */}
            <h4>{t("hl3Title")}</h4>
            <p>{t("hl3Text")}</p>
          </div>

       
          <div className="highlight-card">
            <i className="fas fa-globe-africa icon-large"></i> {/* Real Icon */}
            <h4>{t("hl4Title")}</h4>
            <p>{t("hl4Text")}</p>
          </div>
        </div>
      </div>
      <Footer/>
    </section>
  );
};


export default AboutUs;
