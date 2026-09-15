import { EtymologyResult } from '../types';

export const FALLBACK_ETYMOLOGY: Record<string, EtymologyResult & { modernWord?: string }> = {
  dialogue: {
    modernWord: "Dialogue",
    rootWord: "leg-",
    rootLanguage: "Proto-Indo-European",
    simplifiedRootLanguage: "Ancient Ancestral Language of Eurasia",
    originalMeaning: "To gather, to collect, or to speak",
    evolutionSummary: "The word started as an ancient root meaning 'to gather or speak', evolved into Ancient Greek 'dialogos' (conversation between two or more people), transitioned into Latin 'dialogus', passed through Old French, and entered Middle English in the 13th century.",
    timeline: [
      {
        language: "Proto-Indo-European",
        simplifiedLanguage: "Ancient Eurasian Ancestor",
        word: "*leg-",
        period: "c. 3500 BCE",
        yearsAgo: "approx. 5,500 years ago",
        description: "Root signifying 'to pick out, gather together, or articulate speech'.",
        region: "Pontic-Caspian steppe"
      },
      {
        language: "Ancient Greek",
        simplifiedLanguage: "Classical Greek",
        word: "διάλογος (dialogos)",
        period: "5th Century BCE",
        yearsAgo: "approx. 2,500 years ago",
        description: "Formed from 'dia-' (across, through) and 'logos' (discourse, speech, reasoning). Used prominently by Plato for philosophical conversations.",
        region: "Athens, Greece"
      },
      {
        language: "Classical Latin",
        simplifiedLanguage: "Roman Latin",
        word: "dialogus",
        period: "1st Century BCE",
        yearsAgo: "approx. 2,100 years ago",
        description: "Borrowed by Roman scholars like Cicero to denote literary or philosophical discussions.",
        region: "Roman Republic / Empire"
      },
      {
        language: "Old French",
        simplifiedLanguage: "Medieval French",
        word: "dialoge",
        period: "12th Century CE",
        yearsAgo: "approx. 850 years ago",
        description: "Adopted into medieval romance vernacular referring to written theatrical or theological exchanges.",
        region: "Northern France"
      },
      {
        language: "Middle English",
        simplifiedLanguage: "Medieval English",
        word: "dialogue",
        period: "c. 1300 CE",
        yearsAgo: "approx. 725 years ago",
        description: "Entered literary English via Norman court influence, eventually solidifying as modern 'dialogue'.",
        region: "England"
      }
    ]
  },
  music: {
    modernWord: "Music",
    rootWord: "men-",
    rootLanguage: "Proto-Indo-European",
    simplifiedRootLanguage: "Ancient Ancestral Language of Eurasia",
    originalMeaning: "To think, remember, or have spiritual inspiration",
    evolutionSummary: "Rooted in the ancient concept of mental inspiration and memory, it gave birth to the Greek Muses (Mousai), the goddesses of creative arts. 'Mousike techne' meant 'art of the Muses', which entered Latin as 'musica', Old French as 'musique', and Middle English as 'musik'.",
    timeline: [
      {
        language: "Proto-Indo-European",
        simplifiedLanguage: "Ancient Eurasian Ancestor",
        word: "*men-",
        period: "c. 3500 BCE",
        yearsAgo: "approx. 5,500 years ago",
        description: "Verbal root denoting mental power, mindfulness, memory, and creative contemplation.",
        region: "Eurasian Steppe"
      },
      {
        language: "Ancient Greek",
        simplifiedLanguage: "Classical Greek",
        word: "μουσική (mousikē)",
        period: "6th Century BCE",
        yearsAgo: "approx. 2,600 years ago",
        description: "Short for 'mousikē technē' (art governed by the Muses), including poetry, dance, song, and philosophy.",
        region: "Ancient Greece"
      },
      {
        language: "Latin",
        simplifiedLanguage: "Roman Latin",
        word: "musica",
        period: "1st Century BCE",
        yearsAgo: "approx. 2,100 years ago",
        description: "Adapted into Roman scholarship as part of the Quadrivium of mathematical arts.",
        region: "Rome"
      },
      {
        language: "Old French",
        simplifiedLanguage: "Medieval French",
        word: "musique",
        period: "12th Century CE",
        yearsAgo: "approx. 850 years ago",
        description: "Maintained in church liturgy, secular troubadour songs, and poetry.",
        region: "France"
      },
      {
        language: "Middle English",
        simplifiedLanguage: "Medieval English",
        word: "musik / musike",
        period: "13th Century CE",
        yearsAgo: "approx. 750 years ago",
        description: "Absorbed into English to encompass vocal, instrumental melody, and harmony.",
        region: "England"
      }
    ]
  },
  terra: {
    modernWord: "Terra",
    rootWord: "ters-",
    rootLanguage: "Proto-Indo-European",
    simplifiedRootLanguage: "Ancient Ancestral Language of Eurasia",
    originalMeaning: "To be dry, parched, or baked by heat",
    evolutionSummary: "Before 'terra' meant earth or planet, it literally meant 'dry land' as contrasted with water or seas, stemming from the PIE root *ters- (dry). In Latin it became the quintessential noun for ground, territory, and earth.",
    timeline: [
      {
        language: "Proto-Indo-European",
        simplifiedLanguage: "Ancient Eurasian Ancestor",
        word: "*ters-",
        period: "c. 4000 BCE",
        yearsAgo: "approx. 6,000 years ago",
        description: "Ancient root meaning 'to dry out, to bake dry, or become parched'.",
        region: "Eurasian Plains"
      },
      {
        language: "Proto-Italic",
        simplifiedLanguage: "Ancestral Italic",
        word: "*tersā",
        period: "c. 1000 BCE",
        yearsAgo: "approx. 3,000 years ago",
        description: "Substantive meaning 'the dry element' (as opposed to sea or celestial air).",
        region: "Italian Peninsula"
      },
      {
        language: "Classical Latin",
        simplifiedLanguage: "Roman Latin",
        word: "terra",
        period: "c. 300 BCE",
        yearsAgo: "approx. 2,300 years ago",
        description: "The primary term for ground, soil, territory, country, and the planet Earth (Terra Mater).",
        region: "Roman Empire"
      },
      {
        language: "Neo-Latin & Modern English",
        simplifiedLanguage: "Scientific & Modern Usage",
        word: "terra",
        period: "17th-20th Century",
        yearsAgo: "approx. 300 years ago",
        description: "Preserved in planetary science ('terrestrial', 'terraforming') and Romance languages (tierra, terre).",
        region: "Global"
      }
    ]
  },
  philosophy: {
    modernWord: "Philosophy",
    rootWord: "bhel- / bhilo-",
    rootLanguage: "Proto-Indo-European",
    simplifiedRootLanguage: "Ancient Ancestral Language of Eurasia",
    originalMeaning: "To love / to care for, combined with wisdom and clarity",
    evolutionSummary: "Formed in Ancient Greece as 'philosophia' from 'philos' (beloved, friend, lover) and 'sophia' (wisdom, skill, knowledge). Coined by Pythagoras and popularized by Socrates and Plato to describe humble inquiry rather than possessing ultimate knowledge.",
    timeline: [
      {
        language: "Proto-Indo-European",
        simplifiedLanguage: "Ancient Eurasian Ancestor",
        word: "*bhil- / *twek-",
        period: "c. 3500 BCE",
        yearsAgo: "approx. 5,500 years ago",
        description: "Root elements denoting deep fondness, kinship affection, and discerning insight.",
        region: "Eurasian Steppe"
      },
      {
        language: "Ancient Greek",
        simplifiedLanguage: "Classical Greek",
        word: "φιλοσοφία (philosophia)",
        period: "6th Century BCE",
        yearsAgo: "approx. 2,600 years ago",
        description: "Literally 'love of wisdom'. Denoting the systematic study of reality, ethics, and reason.",
        region: "Ionia / Athens"
      },
      {
        language: "Latin",
        simplifiedLanguage: "Roman Latin",
        word: "philosophia",
        period: "1st Century BCE",
        yearsAgo: "approx. 2,100 years ago",
        description: "Directly transliterated into Latin intellectual life by Cicero and Seneca.",
        region: "Rome"
      },
      {
        language: "Old French",
        simplifiedLanguage: "Medieval French",
        word: "filosofie",
        period: "12th Century CE",
        yearsAgo: "approx. 850 years ago",
        description: "Studied at the early University of Paris as part of scholastic theology and natural philosophy.",
        region: "Paris, France"
      },
      {
        language: "Middle English",
        simplifiedLanguage: "Medieval English",
        word: "philosophie",
        period: "14th Century CE",
        yearsAgo: "approx. 650 years ago",
        description: "Used by Chaucer in the Canterbury Tales; stabilized into modern English spelling.",
        region: "England"
      }
    ]
  },
  robot: {
    modernWord: "Robot",
    rootWord: "orbh-",
    rootLanguage: "Proto-Indo-European",
    simplifiedRootLanguage: "Ancient Ancestral Language of Eurasia",
    originalMeaning: "To change allegiance, orphaned, or forced servitude",
    evolutionSummary: "An ancient root *orbh- meant orphan or servant bereft of status. In Slavic languages this became 'robota' (forced labor / serf work). In 1920, Czech writer Karel Čapek and his brother Josef used it for artificial workers in the play R.U.R., introducing it to the global lexicon.",
    timeline: [
      {
        language: "Proto-Indo-European",
        simplifiedLanguage: "Ancient Eurasian Ancestor",
        word: "*orbh-",
        period: "c. 3500 BCE",
        yearsAgo: "approx. 5,500 years ago",
        description: "Root indicating an orphan, ward, or one bound to dependent servitude.",
        region: "Eurasia"
      },
      {
        language: "Old Church Slavonic",
        simplifiedLanguage: "Ancient Slavic",
        word: "рабъ (rabu) / работа (robota)",
        period: "9th Century CE",
        yearsAgo: "approx. 1,150 years ago",
        description: "Signified compulsory feudal labor, drudgery, or bonded labor.",
        region: "Central & Eastern Europe"
      },
      {
        language: "Czech",
        simplifiedLanguage: "Bohemian Czech",
        word: "robota",
        period: "17th-19th Century",
        yearsAgo: "approx. 300 years ago",
        description: "Feudal labor tax imposed on peasants until the mid-19th century.",
        region: "Bohemia (Czech Lands)"
      },
      {
        language: "Czech (Literature)",
        simplifiedLanguage: "Modern Czech",
        word: "robot",
        period: "1920 CE",
        yearsAgo: "approx. 106 years ago",
        description: "Coined by Josef Čapek for Karel Čapek's sci-fi play 'R.U.R.' (Rossum's Universal Robots) for synthetic organic laborers.",
        region: "Prague, Czechoslovakia"
      },
      {
        language: "Global English",
        simplifiedLanguage: "Modern English",
        word: "robot",
        period: "1923 CE",
        yearsAgo: "approx. 103 years ago",
        description: "Translated into English theater and adopted worldwide for automated and mechanical machines.",
        region: "London & New York"
      }
    ]
  },
  galaxy: {
    modernWord: "Galaxy",
    rootWord: "gla- / galakt-",
    rootLanguage: "Proto-Indo-European",
    simplifiedRootLanguage: "Ancient Ancestral Language of Eurasia",
    originalMeaning: "Milk, milky secretion",
    evolutionSummary: "Derived from the ancient root for milk. In Ancient Greece, the visible band of stars across the sky was named 'galaxias kyklos' (milky circle). Latin termed it 'Via Lactea' (Milky Way), and 'galaxy' entered English via French in the 14th century.",
    timeline: [
      {
        language: "Proto-Indo-European",
        simplifiedLanguage: "Ancient Eurasian Ancestor",
        word: "*glakt-",
        period: "c. 3500 BCE",
        yearsAgo: "approx. 5,500 years ago",
        description: "Ancient root for milk or white curdled substance.",
        region: "Eurasia"
      },
      {
        language: "Ancient Greek",
        simplifiedLanguage: "Classical Greek",
        word: "γαλαξίας (galaxias)",
        period: "5th Century BCE",
        yearsAgo: "approx. 2,500 years ago",
        description: "Adjective for 'milky', used for the band of stars (galaxias kyklos) associated with the myth of Hera's breastmilk spilling across the heavens.",
        region: "Greece"
      },
      {
        language: "Late Latin",
        simplifiedLanguage: "Late Roman Latin",
        word: "galaxias",
        period: "4th Century CE",
        yearsAgo: "approx. 1,600 years ago",
        description: "Astronomical term preserved in late classical and scholastic astronomical manuscripts.",
        region: "Mediterranean"
      },
      {
        language: "Middle English",
        simplifiedLanguage: "Medieval English",
        word: "galaxie",
        period: "c. 1380 CE",
        yearsAgo: "approx. 646 years ago",
        description: "Chaucer famously wrote of 'the Galaxie, the which men clepeth the Milky Wey'. Extended to island universes in the 19th-20th century.",
        region: "England"
      }
    ]
  },
  man: {
    modernWord: "Man",
    rootWord: "men- / manu-",
    rootLanguage: "Proto-Indo-European",
    simplifiedRootLanguage: "Ancient Ancestral Language of Eurasia",
    originalMeaning: "To think, have a mind; the thinking being",
    evolutionSummary: "Rooted in the ancient Proto-Indo-European root for 'to think' (*men-), it originally described humanity as 'the thinking being'. In Proto-Germanic and Old English, 'mann' generically referred to any human person regardless of gender, before narrowing in Middle English to specifically adult male humans.",
    timeline: [
      {
        language: "Proto-Indo-European",
        simplifiedLanguage: "Ancient Eurasian Ancestor",
        word: "*mon- / *manu-",
        period: "c. 3500 BCE",
        yearsAgo: "approx. 5,500 years ago",
        description: "Root signifying 'one with a mind, the creature that thinks' (cognate with Sanskrit 'Manu' and Latin 'mens').",
        region: "Pontic-Caspian Steppe"
      },
      {
        language: "Proto-Germanic",
        simplifiedLanguage: "Early Ancestral Germanic",
        word: "*mann-",
        period: "c. 500 BCE",
        yearsAgo: "approx. 2,500 years ago",
        description: "Denoted a mortal human being of either sex (mankind).",
        region: "Northern Europe"
      },
      {
        language: "Old English",
        simplifiedLanguage: "Anglo-Saxon English",
        word: "mann",
        period: "c. 800 CE",
        yearsAgo: "approx. 1,200 years ago",
        description: "A person or human being. Adult males were 'wer' and adult females were 'wīf' ('wīf-mann' became woman).",
        region: "Early Medieval England"
      },
      {
        language: "Middle English",
        simplifiedLanguage: "Medieval English",
        word: "man",
        period: "c. 1200 CE",
        yearsAgo: "approx. 800 years ago",
        description: "Gradually shifted to predominantly denote an adult male human, while preserving generic sense in 'mankind'.",
        region: "England"
      }
    ]
  },
  tiger: {
    modernWord: "Tiger",
    rootWord: "tigris / tighra-",
    rootLanguage: "Old Iranian / Avestan",
    simplifiedRootLanguage: "Ancient Persian / Iranian",
    originalMeaning: "Sharp, pointed, swift like an arrow",
    evolutionSummary: "Tracing back to ancient Iranian 'tighra' (pointed, sharp, darting swift), named after its lethal fangs and lightning speed (the Tigris river also shares this root for its swift flow). Greeks borrowed it as 'tigris' during Alexander's campaigns, which passed into Latin, Old French, and English.",
    timeline: [
      {
        language: "Old Iranian / Avestan",
        simplifiedLanguage: "Ancient Iranian",
        word: "*tigra- / *tighri-",
        period: "c. 1000 BCE",
        yearsAgo: "approx. 3,000 years ago",
        description: "Signifying sharp, piercing, pointed, or swift as a dart.",
        region: "Ancient Iran / Mesopotamia"
      },
      {
        language: "Ancient Greek",
        simplifiedLanguage: "Classical Greek",
        word: "τίγρις (tigris)",
        period: "4th Century BCE",
        yearsAgo: "approx. 2,400 years ago",
        description: "Adopted into Greek literature following expeditions into Persia and India.",
        region: "Greece & Near East"
      },
      {
        language: "Classical Latin",
        simplifiedLanguage: "Roman Latin",
        word: "tigris",
        period: "1st Century BCE",
        yearsAgo: "approx. 2,100 years ago",
        description: "Brought to Roman arenas and recorded in Pliny's Natural History.",
        region: "Roman Empire"
      },
      {
        language: "Old French",
        simplifiedLanguage: "Medieval French",
        word: "tigre",
        period: "12th Century CE",
        yearsAgo: "approx. 850 years ago",
        description: "Adapted in medieval bestiaries and heraldry.",
        region: "France"
      },
      {
        language: "Middle English",
        simplifiedLanguage: "Medieval English",
        word: "tigre",
        period: "13th Century CE",
        yearsAgo: "approx. 750 years ago",
        description: "Entered English heraldry and literature, later standardized as 'tiger'.",
        region: "England"
      }
    ]
  }
};
