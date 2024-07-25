const fields = Object.freeze({
	FACHBEREICH_I: "Fachbereich I", // (Wirtschafts- und Gesellschaftswissenschaften)
    FACHBEREICH_II: "Fachbereich II", // (Mathematik – Physik – Chemie)
	FACHBEREICH_III: "Fachbereich III", // (Bauingenieur- und Geoinformationswesen)
	FACHBEREICH_IV: "Fachbereich IV", // (Architektur und Gebäudetechnik)
	FACHBEREICH_V: "Fachbereich V", // (Life Sciences and Technology)
	FACHBEREICH_VI: "Fachbereich VI", // (Informatik und Medien)
	FACHBEREICH_VII: "Fachbereich VII", // (Elektrotechnik – Mechatronik – Optometrie)
	FACHBEREICH_VIII: "Fachbereich VIII" // (Maschinenbau, Veranstaltungstechnik, Verfahrenstechnik)
})

const courses = Object.freeze({
    ANGEWANDTE_MATHEMATIK_BSC: "Angewandte Mathematik (B.Sc.)", // Fachbereich II (Mathematik – Physik – Chemie)
    ARCHITEKTUR_BSC: "Architektur (B.Sc.)",	// Fachbereich IV (Architektur und Gebäudetechnik)
    ARCHITEKTUR_MSC: "Architektur (M.Sc.)", // Fachbereich IV (Architektur und Gebäudetechnik)
    AUGENOPTIK_OPTOMETRIE_BSC: "Augenoptik/Optometrie (B.Sc.)",	// Fachbereich VII (Elektrotechnik – Mechatronik – Optometrie)
    AUGENOPTIK_OPTOMETRIE_MSC: "Augenoptik/Optometrie (M.Sc.)", // Fachbereich VII (Elektrotechnik – Mechatronik – Optometrie)
    BAUINGENIEURWESEN_BENG: "Bauingenieurwesen (B.Eng.)", // Fachbereich III (Bauingenieur- und Geoinformationswesen)
    BETRIEBSWIRTSCHAFTSLEHRE_DUAL_BA: "Betriebswirtschaftslehre (Dual) (B.A.)", // Fachbereich I (Wirtschafts- und Gesellschaftswissenschaften)
    BETRIEBSWIRTSCHAFTSLEHRE_DIGITALE_WIRTSCHAFT_BSC: "Betriebswirtschaftslehre – Digitale Wirtschaft (B.Sc.)",	// Fachbereich I (Wirtschafts- und Gesellschaftswissenschaften)
    BIOTECHNOLOGIE_BSC: "Biotechnologie	(B.Sc.)", // Fachbereich V (Life Sciences and Technology)
    BIOTECHNOLOGIE_MSC: "Biotechnologie	(M.Sc.)", // Fachbereich V (Life Sciences and Technology)
    BRANDSCHUTZ_UND_SICHERHEITSTECHNIK_BENG: "Brandschutz und Sicherheitstechnik (B.Eng.)",	// Fachbereich II (Mathematik – Physik – Chemie)
    CLINICAL_TRIAL_MANAGEMENT_FERNSTUDIUM_MSC: "Clinical Trial Management (Fernstudium) (M.Sc.)", // Fachbereich II (Mathematik – Physik – Chemie)
    COMPUTATIONAL_ENGINEERING_FERNSTUDIUM_MENG: "Computational Engineering (Fernstudium) (M.Eng.)", // Fachbereich VIII (Maschinenbau, Veranstaltungstechnik, Verfahrenstechnik)
    COMPUTATIONAL_ENGINEERING_AND_DESIGN_BSC: "Computational Engineering and Design (B.Sc.)", // Fachbereich VIII (Maschinenbau, Veranstaltungstechnik, Verfahrenstechnik)
    DATA_SCIENCE_MSC: "Data Science (M.Sc.)",  // Fachbereich VI (Informatik und Medien)
    DRUCK_UND_MEDIENTECHNIK_BENG: "Druck- und Medientechnik (B.Eng.)", // Fachbereich VI (Informatik und Medien)
    DRUCK_UND_MEDIENTECHNIK_MENG: "Druck- und Medientechnik (M.Eng.)", // Fachbereich VI (Informatik und Medien)
    ELEKTROMOBILITAET_BENG: "Elektromobilität (B.Eng.)", // Fachbereich VII (Elektrotechnik – Mechatronik – Optometrie)
    ELEKTROTECHNIK_BENG: "Elektrotechnik (B.Eng.)",	// Fachbereich VII (Elektrotechnik – Mechatronik – Optometrie)
    ELEKTROTECHNIK_AUSBILDUNGSINTEGRIERENDE_STUDIENFORM_DUAL_BENG: "Elektrotechnik – ausbildungsintegrierende Studienform (Dual) (B.Eng.)", // Fachbereich VII (Elektrotechnik – Mechatronik – Optometrie)
    ENERGIE_UND_AUTOMATISIERUNGSSYSTEME_MENG: "Energie- und Automatisierungssysteme (M.Eng.)", // Fachbereich VII (Elektrotechnik – Mechatronik – Optometrie)
    ENERGIE_UND_RESSOURCENEFFIZIENZ_FERNSTUDIUM_MENG: "Energie- und Ressourceneffizienz (Fernstudium) (M.Eng.)", // Fachbereich VII (Elektrotechnik – Mechatronik – Optometrie)
    FACILITY_MANAGEMENT_BSC: "Facility Management (B.Sc.)", // Fachbereich IV (Architektur und Gebäudetechnik)
    FACILITY_MANAGEMENT_MSC: "Facility Management (M.Sc.)", // Fachbereich IV (Architektur und Gebäudetechnik)
    GARTENBAULICHE_PHYTOTECHNOLOGIE_BSC: "Gartenbauliche Phytotechnologie (B.Sc.)", // Fachbereich V (Life Sciences and Technology)
    GEBAEUDE_UND_ENERGIETECHNIK_BENG: "Gebäude- und Energietechnik (B.Eng.)", // Fachbereich IV (Architektur und Gebäudetechnik)
    GEBAEUDETECHNIK_UND_ENERGIEMANAGEMENT_MENG: "Gebäudetechnik und Energiemanagement (M.Eng.)", // Fachbereich IV (Architektur und Gebäudetechnik)
    GEOINFORMATION_BENG: "Geoinformation (B.Eng.)", // Fachbereich III (Bauingenieur- und Geoinformationswesen)
    GEOINFORMATION_MSC: "Geoinformation (M.Sc.)", // Fachbereich III (Bauingenieur- und Geoinformationswesen)
    GREEN_ENGINEERING_VERFAHRENSTECHNIK_BENG:"Green Engineering – Verfahrenstechnik	(B.Eng.)", // Fachbereich VIII (Maschinenbau, Veranstaltungstechnik, Verfahrenstechnik)
    HUMANOIDE_ROBOTIK_BENG: "Humanoide Robotik (B.Eng.)", // Fachbereich VII (Elektrotechnik – Mechatronik – Optometrie)
    INDUSTRIAL_ENGINEERING_UND_MANAGEMENT_FERNSTUDIUM_MENG: "Industrial Engineering und Management (Fernstudium) (M.Eng.)", // Fachbereich VIII (Maschinenbau, Veranstaltungstechnik, Verfahrenstechnik)
    INFORMATION_AND_COMMUNICATIONS_ENGINEERING_MENG: "Information and Communications Engineering (M.Eng.)", // Fachbereich VII (Elektrotechnik – Mechatronik – Optometrie)
    IT_SICHERHEIT_ONLINE_BSC: "IT-Sicherheit Online (B.Sc.)", // Fachbereich VI (Informatik und Medien)
    KONSTRUKTIVER_HOCH_UND_INGENIEURBAU_MENG: "Konstruktiver Hoch- und Ingenieurbau	(M.Eng.)", // Fachbereich III (Bauingenieur- und Geoinformationswesen)
    LANDSCHAFTSARCHITEKTUR_BENG: "Landschaftsarchitektur (B.Eng.)", // Fachbereich V (Life Sciences and Technology)
    LANDSCHAFTSBAU_UND_GRUENFLAECHENMANAGEMENT_DUAL_BENG: "Landschaftsbau und Grünflächenmanagement (Dual) (B.Eng.)", // Fachbereich V (Life Sciences and Technology)
    LEBENSMITTELTECHNOLOGIE_BSC: "Lebensmitteltechnologie (B.Sc.)", // Fachbereich V (Life Sciences and Technology)
    LEBENSMITTELTECHNOLOGIE_MSC: "Lebensmitteltechnologie (M.Sc.)", // Fachbereich V (Life Sciences and Technology)
    MANAGEMENT_UND_CONSULTING_MA: "Management und Consulting (M.A.)", // Fachbereich I (Wirtschafts- und Gesellschaftswissenschaften)
    MASCHINENBAU_BENG: "Maschinenbau (B.Eng.)", // Fachbereich VIII (Maschinenbau, Veranstaltungstechnik, Verfahrenstechnik)
    MASCHINENBAU_ERNEUERBARE_ENERGIEN_MENG: "Maschinenbau – Erneuerbare Energien (M.Eng.)", // Fachbereich VIII (Maschinenbau, Veranstaltungstechnik, Verfahrenstechnik)
    MASCHINENBAU_KONSTRUKTIONSTECHNIK_MENG: "Maschinenbau – Konstruktionstechnik (M.Eng.)", // Fachbereich VIII (Maschinenbau, Veranstaltungstechnik, Verfahrenstechnik)
    MASCHINENBAU_PRODUKTIONSSYSTEME_MENG: "Maschinenbau – Produktionssysteme (M.Eng.)",	// Fachbereich VIII (Maschinenbau, Veranstaltungstechnik, Verfahrenstechnik)
    MBA_RENEWABLES_FERNSTUDIUM_MBA: "MBA Renewables (Fernstudium) (MBA)", // Fachbereich I (Wirtschafts- und Gesellschaftswissenschaften)
    MECHATRONIK_BENG: "Mechatronik (B.Eng.)", // Fachbereich VII (Elektrotechnik – Mechatronik – Optometrie)
    MECHATRONIK_MENG: "Mechatronik (M.Eng.)", // Fachbereich VII (Elektrotechnik – Mechatronik – Optometrie)
    MEDIENINFORMATIK_BSC: "Medieninformatik (B.Sc.)", // Fachbereich VI (Informatik und Medien)
    MEDIENINFORMATIK_MSC: "Medieninformatik (M.Sc.)", // Fachbereich VI (Informatik und Medien)
    MEDIENINFORMATIK_ONLINE_BSC: "Medieninformatik Online (B.Sc.)", // Fachbereich VI (Informatik und Medien)
    MEDIENINFORMATIK_ONLINE_MSC: "Medieninformatik Online (M.Sc.)",	 // Fachbereich VI (Informatik und Medien)
    MEDIZINISCHE_INFORMATIK_FERNSTUDIUM_MSC: "Medizinische Informatik (Fernstudium) (M.Sc.)", // Fachbereich VI (Informatik und Medien)
    PHARMA_UND_CHEMIETECHNIK_BENG: "Pharma- und Chemietechnik (B.Eng.)", // Fachbereich II (Mathematik – Physik – Chemie)
    PHARMA_UND_CHEMIETECHNIK_MSC: "Pharma- und Chemietechnik (M.Eng.)",	 // Fachbereich II (Mathematik – Physik – Chemie)
    PHYSIKALISCHE_TECHNIK_MEDIZINPHYSIK_MENG: "Physikalische Technik – Medizinphysik (M.Eng.)", // Fachbereich II (Mathematik – Physik – Chemie)
    PHYSIKALISCHE_TECHNIK_MEDIZINPHYSIK_BENG: "Physikalische Technik – Medizinphysik (B.Eng.)", // Fachbereich II (Mathematik – Physik – Chemie)
    PLANUNG_NACHHALTIGER_GEBAEUDE_MSC: "Planung nachhaltiger Gebäude (M.Sc.)", // Fachbereich IV (Architektur und Gebäudetechnik)
    SCREEN_BASED_MEDIA_BA: "Screen Based Media (B.A.)", // Fachbereich VI (Informatik und Medien)
    TECHNISCHE_INFORMATIK_EMBEDDED_SYSTEMS_BENG: "Technische Informatik – Embedded Systems (B.Eng.)", // Fachbereich VI (Informatik und Medien)
    TECHNISCHE_INFORMATIK_EMBEDDED_SYSTEMS_MENG: "Technische Informatik – Embedded Systems (M.Eng.)", // Fachbereich VI (Informatik und Medien)
    THEATER_UND_VERANSTALTUNGSTECHNIK_UND_MANAGEMENT_BENG: "Theater- und Veranstaltungstechnik und -management (B.Eng.)", // Fachbereich VIII (Maschinenbau, Veranstaltungstechnik, Verfahrenstechnik)
    UMWELTINFORMATION_GIS_MSC: "Umweltinformation – GIS (M.Sc.)", // Fachbereich III (Bauingenieur- und Geoinformationswesen)
    UMWELTINGENIEURWESEN_BAU_BENG: "Umweltingenieurwesen – Bau (B.Eng.)", // Fachbereich III (Bauingenieur- und Geoinformationswesen)
    URBANE_INFRASTRUKTURPLANUNG_VERKEHR_UND_WASSER_MENG: "Urbane Infrastrukturplanung – Verkehr und Wasser (M.Eng.)", // Fachbereich III (Bauingenieur- und Geoinformationswesen)
    URBANES_PFLANZEN_UND_FREIRAUMMANAGEMENT_MENG: "Urbanes Pflanzen- und Freiraummanagement (M.Eng.)", // Fachbereich III (Bauingenieur- und Geoinformationswesen)
    VERANSTALTUNGSTECHNIK_UND_MANAGEMENT_MENG: "Veranstaltungstechnik und –management (M.Eng.)", // Fachbereich VIII (Maschinenbau, Veranstaltungstechnik, Verfahrenstechnik)
    VERFAHRENSTECHNIK_MENG: "Verfahrenstechnik (M.Eng.)", // Fachbereich VIII (Maschinenbau, Veranstaltungstechnik, Verfahrenstechnik)
    VERPACKUNGSTECHNIK_BENG: "Verpackungstechnik (B.Eng.)", // Fachbereich V (Life Sciences and Technology)
    VERPACKUNGSTECHNIK_MENG: "Verpackungstechnik (M.Eng.)", // Fachbereich V (Life Sciences and Technology)
    WIRTSCHAFTSINFORMATIK_ONLINE_BSC: "Wirtschaftsinformatik Online (B.Sc.)", // Fachbereich I (Wirtschafts- und Gesellschaftswissenschaften)
    WIRTSCHAFTSINGENIEUR_IN_UMWELT_UND_NACHHALTIGKEIT_BENG: "Wirtschaftsingenieur/in Umwelt und Nachhaltigkeit (B.Eng.)", // Fachbereich VIII (Maschinenbau, Veranstaltungstechnik, Verfahrenstechnik)
    WIRTSCHAFTSINGENIEUR_IN_ENERGIE_UND_UMWELTRESSOURCEN_MSC: "Wirtschaftsingenieur/in – Energie und Umweltressourcen (M.Sc.)",	// Fachbereich VIII (Maschinenbau, Veranstaltungstechnik, Verfahrenstechnik)
    WIRTSCHAFTSINGENIEURWESEN_ONLINE_BENG: "Wirtschaftsingenieurwesen Online (B.Eng.)", // Fachbereich I (Wirtschafts- und Gesellschaftswissenschaften)
    WIRTSCHAFTSINGENIEURWESEN_BAU_BENG: "Wirtschaftsingenieurwesen/Bau (B.Eng.)", // Fachbereich I (Wirtschafts- und Gesellschaftswissenschaften) && Fachbereich III (Bauingenieur- und Geoinformationswesen)
    WIRTSCHAFTSINGENIEURWESEN_BAUTECHNIK_UND_MANAGEMENT_MSC: "Wirtschaftsingenieurwesen/Bautechnik und –management (M.Sc.)", // Fachbereich I (Wirtschafts- und Gesellschaftswissenschaften) && Fachbereich III (Bauingenieur- und Geoinformationswesen)
    WIRTSCHAFTSINGENIEURWESEN_MASCHINENBAU_BENG: "Wirtschaftsingenieurwesen/Maschinenbau (B.Eng.)",	// Fachbereich I (Wirtschafts- und Gesellschaftswissenschaften)
    WIRTSCHAFTSINGENIEURWESEN_MASCHINENBAU_MSC: "Wirtschaftsingenieurwesen/Maschinenbau (M.Sc.)", // Fachbereich I (Wirtschafts- und Gesellschaftswissenschaften)
    WIRTSCHAFTSINGENIEURWESEN_PROJEKTMANAGEMENT_MA: "Wirtschaftsingenieurwesen/Projektmanagement (M.A.)" // Fachbereich I (Wirtschafts- und Gesellschaftswissenschaften)
})

const both = { 
    "Fachbereich I" : ["Betriebswirtschaftslehre (Dual) (B.A.)", "Betriebswirtschaftslehre – Digitale Wirtschaft (B.Sc.)",
                       "Management und Consulting (M.A.)", "MBA Renewables (Fernstudium) (MBA)", 
                       "Wirtschaftsinformatik Online (B.Sc.)", "Wirtschaftsingenieurwesen Online (B.Eng.)", 
                       "Wirtschaftsingenieurwesen/Bau (B.Eng.)", "Wirtschaftsingenieurwesen/Bautechnik und –management (M.Sc.)", 
                       "Wirtschaftsingenieurwesen/Maschinenbau (B.Eng.)", "Wirtschaftsingenieurwesen/Maschinenbau (M.Sc.)", 
                       "Wirtschaftsingenieurwesen/Projektmanagement (M.A.)"],

    "Fachbereich II" : ["Angewandte Mathematik (B.Sc.)", "Brandschutz und Sicherheitstechnik (B.Eng.)",
                        "Clinical Trial Management (Fernstudium) (M.Sc.)", "Pharma- und Chemietechnik (B.Eng.)",
                        "Pharma- und Chemietechnik (M.Eng.)", "Physikalische Technik – Medizinphysik (B.Eng.)",
                        "Physikalische Technik – Medizinphysik (M.Eng.)"],

    "Fachbereich III" : ["Bauingenieurwesen (B.Eng.)", "Geoinformation (B.Eng.)",
                        "Geoinformation (M.Sc.)", "Konstruktiver Hoch- und Ingenieurbau (M.Eng.)",
                        "Umweltinformation – GIS (M.Sc.)", "Umweltingenieurwesen – Bau (B.Eng.)",
                        "Urbane Infrastrukturplanung – Verkehr und Wasser (M.Eng.)", "Urbanes Pflanzen- und Freiraummanagement (M.Eng.)",
                        "Wirtschaftsingenieurwesen/Bau (B.Eng.)", "Wirtschaftsingenieurwesen/Bautechnik und –management (M.Sc.)"],

    "Fachbereich IV" : ["Architektur (B.Sc.)", "Architektur (M.Sc.)",
                        "Facility Management (B.Sc.)", "Facility Management (M.Sc.),",
                        "Gebäude- und Energietechnik (B.Eng.)", "Gebäudetechnik und Energiemanagement (M.Eng.)",
                        "Planung nachhaltiger Gebäude (M.Sc.)"],

    "Fachbereich V" : ["Biotechnologie (B.Sc.)", "Biotechnologie (M.Sc.)", 
                        "Gartenbauliche Phytotechnologie (B.Sc.)", "Landschaftsarchitektur (B.Eng.)",
                        "Landschaftsbau und Grünflächenmanagement (Dual) (B.Eng.)", "Lebensmitteltechnologie (B.Sc.)",
                        "Lebensmitteltechnologie (M.Sc.)", "Verpackungstechnik (B.Eng.)",
                        "Verpackungstechnik (M.Eng.)"],

    "Fachbereich VI" : ["Data Science (M.Sc.)", "Druck- und Medientechnik (B.Eng.)", 
                        "Druck- und Medientechnik (M.Eng.)", "IT-Sicherheit Online (B.Sc.)",
                        "Medieninformatik (B.Sc.)", "Medieninformatik (M.Sc.)",
                        "Medieninformatik Online (B.Sc.)", "Medieninformatik Online (M.Sc.)",
                        "Medizinische Informatik (Fernstudium) (M.Sc.)", "Screen Based Media (B.A.)",
                        "Technische Informatik – Embedded Systems (B.Eng.)", "Technische Informatik – Embedded Systems (M.Eng.)"],

    "Fachbereich VII" : ["Augenoptik/Optometrie (B.Sc.)", "Augenoptik/Optometrie (M.Sc.)",
                        "Elektromobilität (B.Eng.)", "Elektrotechnik (B.Eng.)",
                        "Elektrotechnik – ausbildungsintegrierende Studienform (Dual) (B.Eng.)", "Energie- und Automatisierungssysteme (M.Eng.)",
                        "Energie- und Ressourceneffizienz (Fernstudium) (M.Eng.)", "Humanoide Robotik (B.Eng.)",
                        "Information and Communications Engineering (M.Eng.)", "Mechatronik (B.Eng.)",
                        "Mechatronik (M.Eng.)"],

    "Fachbereich VIII" : ["Computational Engineering (Fernstudium) (M.Eng.)", "Computational Engineering and Design (B.Sc.)",
                        "Green Engineering – Verfahrenstechnik (B.Eng.)", "Industrial Engineering und Management (Fernstudium) (M.Eng.)",
                        "Maschinenbau (B.Eng.)", "Maschinenbau – Erneuerbare Energien (M.Eng.)",
                        "Maschinenbau – Konstruktionstechnik (M.Eng.)", "Maschinenbau – Produktionssysteme (M.Eng.)",
                        "Theater- und Veranstaltungstechnik und -management (B.Eng.)", "Veranstaltungstechnik und –management (M.Eng.)",
                        "Verfahrenstechnik (M.Eng.)", "Wirtschaftsingenieur/in Umwelt und Nachhaltigkeit (B.Eng.)", 
                        "Wirtschaftsingenieur/in – Energie und Umweltressourcen (M.Sc.)"]
}

module.exports = {
    fields,
    courses,
    both
}