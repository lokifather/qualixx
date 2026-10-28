/* Qualixx demo app – reference data
 * The hazard library and safety-characteristic questions are our own short summaries,
 * organised along the categories of ISO 14971:2019 Annex C and ISO/TR 24971:2020 Annex A (not the standard text).
 */
window.QX = (function () {
  const DEMO_USERS = [
    { email: 'demo@qualixx.ai', password: 'qualixx1234', name: 'Demo User', role: 'Risk Management Lead' }
  ];

  const SEVERITY = [
    { lv: 1, name: 'Negligible', desc: 'Inconvenience or temporary discomfort, no injury' },
    { lv: 2, name: 'Minor', desc: 'Temporary injury not requiring medical intervention' },
    { lv: 3, name: 'Serious', desc: 'Injury or impairment requiring medical intervention' },
    { lv: 4, name: 'Critical', desc: 'Permanent impairment or life-threatening injury' },
    { lv: 5, name: 'Catastrophic', desc: 'Death' }
  ];

  const PROBABILITY = [
    { lv: 1, name: 'Improbable', desc: '< 10⁻⁶' },
    { lv: 2, name: 'Remote', desc: '10⁻⁶ to < 10⁻⁴' },
    { lv: 3, name: 'Occasional', desc: '10⁻⁴ to < 10⁻³' },
    { lv: 4, name: 'Probable', desc: '10⁻³ to < 10⁻²' },
    { lv: 5, name: 'Frequent', desc: '≥ 10⁻²' }
  ];

  // Example acceptability: severity × probability ≤ 6 is acceptable (edit in the Plan step to match your policy)
  function defaultAccept() {
    const a = {};
    for (let s = 1; s <= 5; s++) for (let p = 1; p <= 5; p++) a[s + '-' + p] = s * p <= 6;
    return a;
  }

  const CONTROL_TYPES = [
    { id: 'design', name: 'Inherently safe design', order: 1 },
    { id: 'protect', name: 'Protective measure', order: 2 },
    { id: 'info', name: 'Information for safety', order: 3 }
  ];

  const LIBRARY = {
    'Energy': ['Electrical energy (leakage current, shock)', 'Thermal energy (hot surfaces, burns)', 'Mechanical energy (moving parts, pinching, falling)', 'Radiation (ionizing / non-ionizing overexposure)', 'Acoustic or vibration energy'],
    'Biological & chemical': ['Material with unconfirmed biocompatibility', 'Microbial contamination / infection', 'Residual cleaning or disinfection agents', 'Leaching of toxic substances'],
    'Use (operational)': ['Use error (wrong setting or operation)', 'Inaccurate measurement or output', 'Loss or degradation of function', 'Use outside the intended use'],
    'Information': ['Inadequate labelling or instructions for use', 'Missing warnings or cautions', 'Incorrect result displayed', 'Result linked to the wrong patient'],
    'Software': ['Malfunction caused by a software defect', 'Data loss or corruption', 'Processing delay or no response', 'Operation in an unsupported environment (OS / browser)'],
    'Cybersecurity': ['Unauthorized access', 'Data tampering', 'Denial of service (loss of availability)', 'Leakage of patient data'],
    'AI & data': ['Bias in training data', 'False negative (missed finding)', 'False positive (over-detection)', 'Performance degradation from data drift'],
    'Environment': ['Electromagnetic interference', 'Temperature or humidity out of range', 'Poor power quality']
  };

  const CHAR_QUESTIONS = [
    { id: 'q1', text: 'What is the intended use and how is the device used?' },
    { id: 'q2', text: 'Does it contact the patient or user? (site and duration)' },
    { id: 'q3', text: 'Does it deliver energy or substances to the body, or remove them?' },
    { id: 'q4', text: 'Is it supplied sterile, or must the user sterilize or clean it?' },
    { id: 'q5', text: 'Does it measure, or inform diagnostic or therapeutic decisions?' },
    { id: 'q6', text: 'Does it contain software, or is the software itself a medical device?' },
    { id: 'q7', text: 'Is it connected to a network or does it exchange data?' },
    { id: 'q8', text: 'Does it include AI / machine-learning functions?' },
    { id: 'q9', text: 'Is it used together with other devices, medicines or systems?' },
    { id: 'q10', text: 'Which factors in the use environment (hospital, home) affect it?' },
    { id: 'q11', text: 'Does it require user training or special skills?' },
    { id: 'q12', text: 'Does it need maintenance or calibration?' },
    { id: 'q13', text: 'What is the expected lifetime or shelf life?' },
    { id: 'q14', text: 'Are there risks to consider at disposal?' }
  ];

  function sampleProduct(uid, now) {
    const c = (type, desc, verifyRef, verified, effective) => ({ id: uid(), type, desc, verifyRef, verified, effective });
    return {
      id: uid(), createdAt: now, updatedAt: now,
      name: 'AI Chest X-ray Reading Assistant', model: 'QX-CXR', version: '1.0', deviceClass: 'Class II',
      intendedUse: 'Marks suspected lung-nodule regions on chest X-ray images to assist radiologists in reading.',
      users: 'Radiologists', environment: 'Hospital reading room (PACS integration)',
      misuse: 'Using the output alone to confirm a diagnosis without a radiologist reading',
      plan: {
        scope: 'Full life cycle of QX-CXR v1.0: design and development, release, post-production',
        lifecycle: 'Design & development → Verification & validation → Release → Post-market monitoring → Retirement',
        owner: 'Demo User (Risk Management Lead)',
        team: 'Development lead, clinical advisor, QA engineer',
        acceptPolicy: 'Risks with severity × probability ≤ 6 are acceptable. Unacceptable risks require risk control; remaining risks are judged by benefit-risk analysis.',
        verification: 'Implementation is verified by test reports per control measure; effectiveness is confirmed by clinical performance evaluation.',
        pms: 'Complaints, usage logs and literature are reviewed quarterly to decide whether risks must be re-evaluated.'
      },
      matrix: { accept: defaultAccept() },
      characteristics: {
        q1: 'Marks suspected lung-nodule regions on chest X-rays (reading assistance)',
        q2: 'No direct contact (software)',
        q5: 'Provides reference information for diagnostic decisions',
        q6: 'Standalone software as a medical device (SaMD)',
        q7: 'Integrated with PACS via DICOM',
        q8: 'Includes a deep-learning detection model'
      },
      hazards: [
        {
          id: uid(), code: 'H-001', category: 'AI & data', hazard: 'False negative (missed finding)',
          sequence: 'Model fails to mark a low-contrast nodule → reader misses the nodule because nothing is marked',
          situation: 'A patient with a lung nodule is read as normal', harm: 'Disease progression due to delayed diagnosis',
          s: 4, p: 3,
          controls: [
            c('design', 'Set a sensitivity target (≥ 90%) on multi-site data and confirm it in clinical performance evaluation', 'VR-001 Clinical performance report', true, true),
            c('info', 'IFU and UI state "Reading aid only – not for standalone diagnosis"', 'IFU-3.2, UI-SPEC-12', true, true)
          ],
          rs: 4, rp: 1, newRiskReviewed: true, newRiskNote: 'No new risk introduced by the warning', bra: ''
        },
        {
          id: uid(), code: 'H-002', category: 'Cybersecurity', hazard: 'Data tampering',
          sequence: 'Result data is altered on the network path → a manipulated overlay is shown to the reader',
          situation: 'Reading is based on tampered results', harm: 'Inappropriate treatment due to misdiagnosis',
          s: 3, p: 3,
          controls: [
            c('protect', 'User authentication, encryption in transit (TLS 1.2+), integrity signature on results', 'SEC-TR-01 Security test report', true, false)
          ],
          rs: 3, rp: 1, newRiskReviewed: false, newRiskNote: '', bra: ''
        },
        {
          id: uid(), code: 'H-003', category: 'Information', hazard: 'Result linked to the wrong patient',
          sequence: 'Image identifiers are mixed during concurrent processing → another patient\'s result is displayed',
          situation: 'Reader refers to another patient\'s analysis', harm: 'Inappropriate treatment due to misdiagnosis',
          s: 4, p: 2,
          controls: [
            c('design', 'Verify DICOM Study/Series UID match before display; block display on mismatch', 'VR-004 Integration test report', false, false)
          ],
          rs: null, rp: null, newRiskReviewed: false, newRiskNote: '', bra: ''
        },
        {
          id: uid(), code: 'H-004', category: 'Use (operational)', hazard: 'Use outside the intended use',
          sequence: 'Out-of-scope images (e.g. pediatric) are submitted → low-confidence results are displayed',
          situation: 'Reader refers to inaccurate results', harm: 'Unnecessary additional examinations',
          s: 2, p: 3, controls: [], rs: null, rp: null, newRiskReviewed: false, newRiskNote: '', bra: ''
        }
      ],
      overall: { conclusion: '', acceptable: '', disclosure: '' },
      review: { status: 'Draft', approver: '', approvedAt: '', comment: '' },
      audit: [{ t: now, user: 'System', action: 'Sample risk management file created' }]
    };
  }

  // Label of the Qualixx software itself (shown in "About Qualixx", sidebar and sign-in page)
  const APP = {
    product: 'Qualixx eQMS',
    version: '0.7.1',
    build: '20261028.2',
    releaseDate: '2026-10-28',
    channel: 'Demo',
    manufacturer: 'Qualixx Inc. (주식회사 퀄릭스, in incorporation)',
    address: 'Republic of Korea (address to be confirmed after incorporation)',
    website: 'https://qualixx.ai',
    support: 'support@qualixx.ai',
    intendedUse: 'Cloud software that helps medical device manufacturers establish, operate and keep records of a quality management system (ISO 13485, KGMP, US QMSR) and ISO 14971 risk management.',
    notMedicalDevice: 'Qualixx is quality management system software. It is not a medical device and does not process patient data.',
    validation: 'Customers validate Qualixx for its intended use under ISO 13485 §4.1.6. A validation package (requirements, risk assessment, test records) is provided per release.',
    standards: ['ISO 13485:2016', 'ISO 14971:2019', 'KGMP', '21 CFR 820 (QMSR)', '21 CFR Part 11 (design basis)'],
    releases: [
      { version: '0.7.1', date: '2026-10-28', notes: 'Blue & Gray colour theme and logo colours.' },
      { version: '0.7.0', date: '2026-10-28', notes: 'Settings with display language: English, Korean, Japanese and Chinese (Simplified). Dates follow the language. Language switch on the sign-in page.' },
      { version: '0.6.0', date: '2026-10-27', notes: 'Document Control (PDC): start revision, review, approve with e-signature, effective date, read & acknowledge, obsolete, new documents, change comparison and audit trail. My Tasks: all work assigned to you. Quality Policy (e-signed revisions) and Quality Objectives (KPI, target, progress). Product standard (제품표준서) per product with e-signed approval. Sidebar sections for Products (market authorizations by country, product standards, labels & UDI, risk files) and Quality Documents (manual, procedures, forms, in change, obsolete).' },
      { version: '0.5.0', date: '2026-10-27', notes: 'All 26 processes in Work Process: My Processes (pin), collapsible process groups, process workspaces, quick search (Ctrl+K).' },
      { version: '0.4.1', date: '2026-10-27', notes: 'Mint chocolate colour theme and new logo colours.' },
      { version: '0.4.0', date: '2026-10-27', notes: 'Products with label information and software version; My Dashboard; About Qualixx (this label).' },
      { version: '0.3.0', date: '2026-10-26', notes: 'Quality Documents, Process Map, People and Messages; organization branding.' },
      { version: '0.2.0', date: '2026-10-26', notes: 'English UI, new dashboard design, Work Process navigation.' },
      { version: '0.1.0', date: '2026-10-26', notes: 'Risk Management (ISO 14971) workflow: plan, analysis, control, review, e-signature, report, audit trail.' }
    ]
  };

  return { APP, DEMO_USERS, SEVERITY, PROBABILITY, CONTROL_TYPES, LIBRARY, CHAR_QUESTIONS, defaultAccept, sampleProduct };
})();
