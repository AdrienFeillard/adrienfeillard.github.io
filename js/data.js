// Portfolio content — projects, skills, and tool→project mapping.

export const FEAT_IDS = ['yneuro', 'lpsy'];

export const CONTEXT = {
  'yneuro': 'YNEURO — INTERNSHIP',
  'lpsy': 'LPSY, EPFL — NX-492',
  'blazepose': 'CS-433 MACHINE LEARNING',
  'optml': 'CS-439 OPTIMIZATION FOR ML',
  'ada': 'CS-401 APPLIED DATA ANALYSIS',
  'neural-interfaces': 'NX-422 NEURAL INTERFACES',
  'gwas': 'MATH-493 APPLIED BIOSTATISTICS',
  'thailand': 'HUM-500',
  'tne-upper-limb': 'NX-423 TRANSLATIONAL ENG.',
  'tne-stroke': 'NX-423 TRANSLATIONAL ENG.',
  'nssp': 'NX-421 NEURAL SIGNALS',
  'esn': 'ESN EPFL — BOARD'
};

export const projects = [
  {
    id: "yneuro",
    shortTitle: "YNeuro Internship",
    period: "Sep 2025 – Feb 2026",
    image: "images/yneuro_logo.jpeg",
    alt: "YNeuro logo",
    description: "During my five-month internship at YNeuro, a neurotechnology startup developping a solution for EEG signal authentification, I contributed to the development and optimization of EEG data processing with a strong focus on metadata extraction, curation, validation and montage alignement. This experience allowed me to apply my academic knowledge in a practical setting, collaborate with a team of experts, expand my skills and knowledge in collaborative coding and gain insights into the challenges and innovations in the neurotechnology industry.",
    links: [
      { label: "Linkedin", icon: "fab fa-linkedin", href: "https://www.linkedin.com/company/yneuro/posts/?feedView=all" },
      { label: "Website", icon: "fas fa-globe", href: "https://www.yneuro.com/" }
    ]
  },
  {
    id: "lpsy",
    shortTitle: "EEG Visual-Skills Prediction",
    period: "Sep 2024 – Jul 2025",
    image: "images/placeholder-brain.svg",
    alt: "EEG predictive framework for visual skills",
    description: "This project focuses on creating a predictive framework for visual skills thresholds using EEG data and steady-state visual evoked potentials (SSVEPs). Key contributions include EEG data visualization, preprocessing, and filtering; SSVEP signal extraction; development of machine learning algorithms for predictive modeling; and organization of experimental setups. The work advances objective, data-driven approaches to understanding and predicting visual performance.",
    links: [
      { label: "Github", icon: "fab fa-github", href: "https://github.com/AdrienFeillard/Semester-Project-1-LPSY" },
      { label: "Laboratory of Psychophysics (LPSY), EPFL Brain-Mind Institute", icon: "", href: "https://www.epfl.ch/labs/lpsy/" }
    ]
  },
  {
    id: "blazepose",
    shortTitle: "Markerless Pose Estimation",
    period: "2024",
    image: "images/blazpose.png",
    alt: "BlazePose markerless pose estimation",
    description: "This project evaluates the accuracy of BlazePose, a markerless pose estimation system, for classifying exercises and identifying errors in physiotherapy movements. Using machine learning models such as neural networks, GRU, CNN, and Random Forest, the analysis demonstrates BlazePose's potential for affordable and effective home-based physiotherapy.",
    links: [
      { label: "Github", icon: "fab fa-github", href: "https://github.com/AdrienFeillard/ML_project" },
      { label: "Project report", icon: "fas fa-file-pdf", href: "pdfs/report_project2_ML.pdf" },
      { label: "Machine Learning (CS-433)", icon: "", href: "https://edu.epfl.ch/coursebook/en/machine-learning-CS-433" }
    ]
  },
  {
    id: "optml",
    shortTitle: "Adaptive Noise Injection in CNNs",
    period: "2024",
    image: "images/optml.png",
    alt: "Adaptive noise injection in CNN training",
    description: "As part of our group project, we explored the impact of noise injection on Convolutional Neural Networks and Resnet18 model trained for image classification on the CIFAR-10 dataset. Our report details the different models and methods, specifically the noise injection methodology that we implemented.",
    links: [
      { label: "Github", icon: "fab fa-github", href: "https://github.com/AdrienFeillard/OptML_project" },
      { label: "Project report", icon: "fas fa-file-pdf", href: "pdfs/OptiML___Project.pdf" },
      { label: "Optimization for Machine Learning (CS-439)", icon: "", href: "https://edu.epfl.ch/coursebook/en/optimization-for-machine-learning-CS-439" }
    ]
  },
  {
    id: "ada",
    shortTitle: "Every Season is Beerable",
    period: "2024",
    image: "images/ada.png",
    alt: "Beer consumption data analysis",
    description: "\u201cEvery Season is Beerable\u201d is a comprehensive data analysis project that examines seasonal trends in beer consumption using user ratings from RateBeer (2003-2016). The analysis focuses on three popular beer styles\u2014IPA, Pilsener, and Belgian Strong Ale\u2014highlighting seasonal preferences and patterns through detailed data visualization and statistical insights.",
    links: [
      { label: "Github", icon: "fab fa-github", href: "https://github.com/AdrienFeillard/ADA_2024" },
      { label: "Project's website", icon: "", href: "https://shobashu.github.io/ChatChuiPT.github.io/" },
      { label: "Applied Data Analysis (CS-401)", icon: "", href: "https://edu.epfl.ch/coursebook/en/applied-data-analysis-CS-401" }
    ]
  },
  {
    id: "neural-interfaces",
    shortTitle: "Olfactory-Bulb Implant",
    period: "2024",
    image: "images/Cribriform_plate_and_Olfactory_nerve_-_animation.gif",
    alt: "Olfactory bulb neural interface",
    description: "Our report presents a 32-channel flexible neural interface designed for dementia patients. Targeting the olfactory bulb for both recording and stimulation, the implant uses \u00b5ECoG-like electrodes on a flexible polyimide substrate with Parylene C encapsulation for optimal conformity and minimal invasiveness. Low-power electronics and wireless power transmission support efficient operation, while a tailored Draf IIb surgical procedure ensures safe implantation.",
    links: [
      { label: "Project report", icon: "fas fa-file-pdf", href: "pdfs/Neural_Interfaces.pdf" },
      { label: "Neural Interfaces (NX-422)", icon: "", href: "https://edu.epfl.ch/coursebook/fr/neural-interfaces-NX-422" }
    ]
  },
  {
    id: "gwas",
    shortTitle: "GWAS of Coronary Artery Disease",
    period: "2025",
    image: "images/cad.jpg",
    alt: "Coronary artery disease GWAS",
    description: "As part of the course I worked on genome-wide association study (GWAS) of coronary artery disease (CAD) in 1401 patients using 861,473 SNPs. Rigorous quality control, exploratory data analysis, and principal components analysis were applied to adjust for population stratification. Logistic regression models\u2014accounting for age, sex, lipid levels, and ancestry\u2014revealed significant associations, with Manhattan and Q-Q plots highlighting key SNPs such as rs4957723 and rs17160628.",
    links: [
      { label: "Project report", icon: "fas fa-file-pdf", href: "pdfs/Applied_Biostatistics_Individual_Report_Adrien_Feillard (1).pdf" },
      { label: "Applied Biostatistics (MATH-493)", icon: "", href: "https://edu.epfl.ch/coursebook/en/applied-biostatistics-MATH-493" }
    ]
  },
  {
    id: "thailand",
    shortTitle: "Migration Study: Thailand",
    period: "2024",
    image: "images/Thailand.png",
    alt: "Thailand migration study",
    description: "As part of a group project of the course, we worked on a comparative analysis of expatriates and Burmese migrant workers in Thailand, examining their migration motivations, integration challenges, and socio-economic experiences. It explores Thailand's legal framework and visa policies, highlighting the pull and push factors of the migration dynamics. Through the analysis of both high-skilled expats (from Western and Asian origins) and low-skilled Burmese workers, the study reveals how cultural, legal, and social dynamics impact their lives.",
    links: [
      { label: "Project report", icon: "fas fa-file-pdf", href: "pdfs/HUM500.pdf" }
    ]
  },
  {
    id: "tne-upper-limb",
    shortTitle: "Upper-Limb Neuroprosthesis",
    period: "2025",
    image: "images/TNE.png",
    alt: "Spinal cord injury neuroprosthesis",
    description: "As part of our group project, we theorized a neuroprosthesis to restore upper limb and hand function after spinal cord injury that emphasizes on the clinical translation in restoring fine motor control. Our report details the integration of intracortical recording with subcellular carbon fiber electrodes, decoding algorithms, and selective stimulation devices. This approach overcomes limitations of traditional methods by enhancing motor precision and reducing fatigue.",
    links: [
      { label: "Project report", icon: "fas fa-file-pdf", href: "pdfs/Translational_Neuroscience__Project (1).pdf" }
    ]
  },
  {
    id: "tne-stroke",
    shortTitle: "Personalized Stroke Rehabilitation",
    period: "2025",
    image: "images/TNE_2.png",
    alt: "Stroke rehabilitation neuromodulation",
    description: "As part of our group project, we theorized a personalized stroke rehabilitation approach using multimodal data and model-guided neuromodulation. It addresses limitations of standardized rTMS protocols by integrating patient-specific data, including clinical scores, demographics, and neuroimaging biomarkers. The theorized prognostic prediction model predicts recovery trajectories, assesses risk, recommends therapies, and optimizes rTMS parameters to tailor treatment to individual needs.",
    links: [
      { label: "Project report", icon: "fas fa-file-pdf", href: "pdfs/TNE_report_2.pdf" }
    ]
  },
  {
    id: "nssp",
    shortTitle: "Emotional Auditory fMRI",
    period: "2024",
    image: "images/irm.gif",
    alt: "MRI emotional auditory stimuli analysis",
    description: "As part of course group miniproject, we explored the neural processing of emotional auditory stimuli using MRI dataset, aiming to identify brain activation differences when subjects listen to positive versus negative music and neutral tones.",
    links: [
      { label: "Project Report", icon: "fas fa-file-pdf", href: "pdfs/NSSP_MiniProject1 (1).pdf" }
    ]
  },
  {
    id: "esn",
    shortTitle: "ESN Welcome Week",
    period: "Spring 2025",
    image: "images/ESN.jpg",
    alt: "ESN Welcome Week event",
    description: "As a board member of ESN EPFL, I collaborated with ESN UNIL to plan and coordinate the Spring 2025 Welcome Week. This event was dedicated to integrating incoming exchange students by organizing 10 events over 8 days, drawing between 90 and 200 participants. In coordination with the other Welcome Week coordinator of ESN UNIL, we managed a 27-person organizing committee, oversaw 70 staff members during the event, and handled a budget of 50,000 CHF.",
    links: [
      { label: "Welcome Week ESN", icon: "fas fa-link", href: "https://epfl.esn.ch/welcome-week-A2023" }
    ]
  }
];

// Skills — order defines wheel angles (clockwise from top).
export const innerSkills = [
  { type: "icon", cls: "devicon-python-plain colored", name: "Python" },
  { type: "img", src: "images/mne_icon.svg", name: "MNE" },
  { type: "icon", cls: "devicon-scikitlearn-plain colored", name: "Scikit-Learn" },
  { type: "icon", cls: "devicon-pandas-plain colored", name: "Pandas" },
  { type: "icon", cls: "devicon-vscode-plain colored", name: "VS Code" },
  { type: "img", src: "https://img.icons8.com/nolan/64/notion.png", name: "Notion" },
  { type: "icon", cls: "devicon-dataspell-plain colored", name: "Dataspell" },
  { type: "icon", cls: "devicon-github-original colored", name: "GitHub" },
  { type: "icon", cls: "devicon-pytorch-original colored", name: "Pytorch" },
  { type: "icon", cls: "devicon-latex-original colored", name: "LaTeX" },
  { type: "icon", cls: "devicon-tensorflow-original colored", name: "Tensorflow" },
  { type: "icon", cls: "devicon-jupyter-plain colored", name: "Jupyter" },
  { type: "icon", cls: "devicon-keras-plain colored", name: "Keras" }
];

export const outerSkills = [
  { type: "icon", cls: "devicon-matlab-plain colored", name: "Matlab" },
  { type: "icon", cls: "devicon-amazonwebservices-plain-wordmark colored", name: "AWS" },
  { type: "icon", cls: "devicon-anaconda-original colored", name: "Anaconda" },
  { type: "icon", cls: "devicon-bash-plain colored", name: "Bash" },
  { type: "icon", cls: "devicon-r-plain colored", name: "R" },
  { type: "icon", cls: "devicon-javascript-plain colored", name: "JavaScript" },
  { type: "img", src: "images/bureau.png", name: "Pack office" },
  { type: "icon", cls: "devicon-unrealengine-original colored", name: "Unreal Engine" },
  { type: "icon", cls: "devicon-pytest-plain colored", name: "Pytest" },
  { type: "icon", cls: "devicon-html5-plain colored", name: "HTML5" },
  { type: "icon", cls: "devicon-css3-plain colored", name: "CSS3" },
  { type: "icon", cls: "devicon-cplusplus-plain colored", name: "C++" }
];

// Tool → project mapping.
// Ids follow on-site numbering: 'next' = 01 (next-project slot), yneuro = 02, lpsy = 03, wall = 04-13.
// value: array of project ids | 'site' (this website itself) | omit entirely (no linked project)
export const toolProjects = {
  "Python": ["next", "yneuro", "lpsy", "blazepose", "optml", "ada", "nssp"],
  "MNE": ["yneuro", "lpsy"],
  "Scikit-Learn": ["next", "yneuro", "lpsy", "blazepose", "optml", "ada"],
  "Pandas": ["next", "yneuro", "lpsy", "blazepose", "optml", "ada", "nssp"],
  "VS Code": ["next", "yneuro"],
  "Notion": ["yneuro"],
  "Dataspell": ["lpsy", "blazepose", "optml", "ada", "nssp"],
  "GitHub": ["yneuro"],
  "Pytorch": ["next", "yneuro", "lpsy", "blazepose", "optml"],
  "LaTeX": ["next", "yneuro", "lpsy", "blazepose", "optml", "ada", "neural-interfaces", "gwas", "thailand", "tne-upper-limb", "tne-stroke", "nssp"],
  "Tensorflow": ["next", "yneuro", "lpsy", "blazepose", "optml"],
  "Jupyter": ["next", "yneuro", "lpsy", "blazepose", "optml", "ada", "nssp"],
  "Keras": ["next", "yneuro", "lpsy", "blazepose", "optml"],
  "Matlab": ["lpsy"],
  "AWS": ["yneuro"],
  "Anaconda": ["next", "yneuro", "lpsy", "blazepose", "optml", "ada", "nssp"],
  "Bash": ["yneuro"],
  "R": ["gwas"],
  "Pytest": ["yneuro"],
  "JavaScript": "site",
  "HTML5": "site",
  "CSS3": "site"
};
