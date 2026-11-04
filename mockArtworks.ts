import { ArtworkRecord, CarrierOption, ConditionPin } from '../types/artos';

export const CARRIERS: CarrierOption[] = [
  { 
    id: 'crozier', 
    name: 'Crozier Fine Arts', 
    price: 8450, 
    eta: '3-5 Days', 
    type: 'Climate-Controlled Air Freight', 
    reliability: '99.8%',
    insuranceMax: 15000000
  },
  { 
    id: 'dietl', 
    name: 'Dietl International', 
    price: 6200, 
    eta: '5-7 Days', 
    type: 'Standard Dedicated Trucking', 
    reliability: '98.5%',
    insuranceMax: 10000000
  },
  { 
    id: 'arta', 
    name: 'ARTA Automated Platform', 
    price: 4150, 
    eta: '10-14 Days', 
    type: 'Consolidated Sea/Ground', 
    reliability: '97.2%',
    insuranceMax: 5000000
  }
];

export const INITIAL_PINS: ConditionPin[] = [
  { 
    id: 1, 
    x: 28, 
    y: 22, 
    category: 'Medium', 
    tags: ['Craquelure'], 
    note: 'Micro vertical craquelure along upper right quadrant; stable under 10x magnification.',
    severity: 'Stable',
    inspector: 'Elena Vance, Senior Registrar',
    timestamp: '2026-10-12 14:32 UTC'
  },
  { 
    id: 2, 
    x: 82, 
    y: 84, 
    category: 'Frame', 
    tags: ['Surface Abrasion'], 
    note: 'Minor corner scuff on protective wooden backing strip. Primary canvas unaffected.',
    severity: 'Minor',
    inspector: 'Elena Vance, Senior Registrar',
    timestamp: '2026-10-12 14:48 UTC'
  }
];

export const INITIAL_ARTWORK: ArtworkRecord = {
  id: 'ART-8921',
  title: 'Untitled (1974)',
  artist: 'Mark Rothko',
  artistBio: 'American Abstract Expressionist (1903–1970). Famous for large-scale multiforms and color-field atmospheric rectangles.',
  year: '1974',
  medium: 'Oil on Canvas',
  dimensions: '203.2 x 152.4 cm',
  netWeight: '22 kg',
  crateDims: '218 x 168 x 32 cm',
  calculatedCrateWeight: '58 kg (T-Frame Climate Crate)',
  location: 'Geneva Freeport - Bin 12B',
  consignor: 'Rothko Family Estate',
  consignorSplit: 50,
  reservePrice: 4000000,
  listPrice: 4500000,
  status: 'In Vault',
  holdTriggeredBy: null,
  dutyRates: {
    'Switzerland (Geneva)': 0.077,
    'United Kingdom (London)': 0.20,
    'United States (New York)': 0.08875,
    'Hong Kong': 0.00
  },
  image: '/src/assets/images/rothko_canvas_detail_1792079354598.jpg',
  nfcTagId: 'NFC-ART-8921-CRYPTO-9941',
  contractAddress: '0x8b32A292C9f143dF71689C82FaB211718816c4B2',
  provenance: [
    {
      blockNumber: 104281,
      hash: '0x4f8e12a9bc1810578619bc92fa1819ab27d9283f912c019d',
      parentHash: '0x000000000000000000000000000000000000000000000000',
      timestamp: '1974-06-15',
      event: 'Creation & Studio Consignment',
      from: 'Mark Rothko Estate / Studio',
      to: 'Marlborough Gallery Inc., New York',
      transactionAmount: 48000,
      royaltyPaid: 0,
      verifiedBy: 'Marlborough Gallery Archives Ref #MG-74-88',
      ipfsMetadataUri: 'ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi/1',
      nfcTagId: 'NFC-HIST-NY-1974-ORIGIN'
    },
    {
      blockNumber: 394201,
      hash: '0x992b8c91a0c128491024bc681b9e02341819d9b01984c012',
      parentHash: '0x4f8e12a9bc1810578619bc92fa1819ab27d9283f912c019d',
      timestamp: '1982-11-20',
      event: 'Private Acquisition',
      from: 'Marlborough Gallery Inc.',
      to: 'Private Collection, Zurich',
      transactionAmount: 320000,
      royaltyPaid: 0,
      verifiedBy: 'Galerie Beyeler Basel Provenance Dossier',
      ipfsMetadataUri: 'ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi/2',
      nfcTagId: 'NFC-HIST-ZH-1982-ACQ'
    },
    {
      blockNumber: 712904,
      hash: '0x17bfa491c9201984bc0192341209b18371902847a91823bc',
      parentHash: '0x992b8c91a0c128491024bc681b9e02341819d9b01984c012',
      timestamp: '1999-05-18',
      event: 'Sotheby’s Contemporary Evening Sale',
      from: 'Private Collection, Zurich',
      to: 'European Corporate Heritage Trust',
      transactionAmount: 1850000,
      royaltyPaid: 45000,
      verifiedBy: 'Sotheby’s Geneva Lot #42 Catalogue Raisonné',
      ipfsMetadataUri: 'ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi/3',
      nfcTagId: 'NFC-HIST-SOTH-1999-CAT'
    },
    {
      blockNumber: 1290342,
      hash: '0x8192a019b8472910c28340192b938174a01923847c109283',
      parentHash: '0x17bfa491c9201984bc0192341209b18371902847a91823bc',
      timestamp: '2014-09-04',
      event: 'Private Treaty Settlement',
      from: 'European Corporate Heritage Trust',
      to: 'Rothko Family Estate Foundation',
      transactionAmount: 3400000,
      royaltyPaid: 102000,
      verifiedBy: 'Halsell & Fitch Fine Art Advisory Ltd.',
      ipfsMetadataUri: 'ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi/4',
      nfcTagId: 'NFC-HIST-TRUST-2014-TREATY'
    },
    {
      blockNumber: 1948210,
      hash: '0x3a7e9184c0192837102938471902b918374a0192384c7102',
      parentHash: '0x8192a019b8472910c28340192b938174a01923847c109283',
      timestamp: '2026-10-10',
      event: 'Art Information Co. On-Chain Tokenized Escrow Consignment',
      from: 'Rothko Family Estate Foundation',
      to: 'Geneva Freeport Vault Bin 12B (Art Information Co. Custody)',
      transactionAmount: 4500000,
      royaltyPaid: 180000,
      verifiedBy: 'Geneva Freeport Head Registrar Elena Vance',
      ipfsMetadataUri: 'ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi/5',
      nfcTagId: 'NFC-ART-8921-CRYPTO-9941'
    }
  ],
  assetDocuments: [
    {
      id: 'DOC-01',
      title: 'Marlborough Gallery Bill of Sale & Consignment Ledger',
      documentType: 'Bill of Sale / Title',
      filename: 'Marlborough_NY_1974_Consignment_Bill.pdf',
      filesize: '3.4 MB',
      mimeType: 'application/pdf',
      sha256Hash: '0x7e29b1049c81a92083bc74102938471902847c10928374a0192384c71029384f',
      ipfsCid: 'ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi/marlborough_title',
      associatedBlockNumber: 104281,
      uploadedAt: '1974-06-15',
      uploadedBy: 'Marlborough Archives (Digitized Art Information Co.)',
      onChainVerified: true,
      notes: 'Initial studio consignment receipt from Rothko Studio to Marlborough Gallery Inc., New York.'
    },
    {
      id: 'DOC-02',
      title: 'Infrared Reflectography (IRR 1000nm) High-Res Surface Scan',
      documentType: 'Spectroscopy / Imagery',
      filename: 'Rothko_ART8921_IRR_Reflectography_1000nm.jpg',
      filesize: '24.2 MB',
      mimeType: 'image/jpeg',
      fileUrl: '/src/assets/images/rothko_canvas_detail_1792079354598.jpg',
      sha256Hash: '0x4f810293847a91823bc0192837102938471902b918374a0192384c7102938a1c',
      ipfsCid: 'ipfs://bafybeib7h1928374a0192384c71029384f7e29b1049c81a92083bc74102938/irr_spectral',
      associatedBlockNumber: 1948210,
      uploadedAt: '2026-10-12 11:20 UTC',
      uploadedBy: 'Elena Vance, Head Registrar',
      onChainVerified: true,
      notes: 'Full pigment layer penetration revealing charcoal underdrawing grid and original stretcher boundaries.'
    },
    {
      id: 'DOC-03',
      title: 'Geneva Freeport Comprehensive Conservation Baseline Dossier',
      documentType: 'Conservation Dossier',
      filename: 'Geneva_Freeport_Condition_Dossier_ART8921.pdf',
      filesize: '8.7 MB',
      mimeType: 'application/pdf',
      sha256Hash: '0x992b8c91a0c128491024bc681b9e02341819d9b01984c012718a280193498172',
      ipfsCid: 'ipfs://bafybeigcl283719028371920834710293847102938471902b918374a019238/geneva_conservation',
      associatedBlockNumber: 1948210,
      uploadedAt: '2026-10-14 09:30 UTC',
      uploadedBy: 'Elena Vance, Head Registrar',
      onChainVerified: true,
      notes: 'Micro-loupe analysis of vertical craquelure, pigment stability, and edge binding conditions.'
    },
    {
      id: 'DOC-04',
      title: 'Swiss Federal Bonded Warehouse Export Transit Clearance',
      documentType: 'Customs & Bond',
      filename: 'Swiss_Customs_Bonded_Transit_Pass_CH9941.pdf',
      filesize: '1.9 MB',
      mimeType: 'application/pdf',
      sha256Hash: '0x17bfa491c9201984bc0192341209b18371902847a91823bc8b32A292C9f143dF',
      ipfsCid: 'ipfs://bafybeif910293847a91823bc0192837102938471902b918374a0192384c710/customs_bonded',
      associatedBlockNumber: 1948210,
      uploadedAt: '2026-10-15 08:00 UTC',
      uploadedBy: 'Swiss Federal Customs Administration',
      onChainVerified: true,
      notes: 'Bonded status certificate exempting export VAT while in bonded international freeport custody.'
    }
  ],
  auditTrail: [
    {
      id: 'AUD-001',
      timestamp: '2026-10-10 10:14:22 UTC',
      eventType: 'COMPLIANCE_SCREENING',
      actionSummary: 'Consignor KYC/AML Verification & OFAC Sanctions Clearance',
      actorName: 'Claire Beauchamp, Chief Compliance Officer',
      actorRole: 'Institutional AML Officer',
      actorWalletOrId: 'AML-KYC-CH-2026-441',
      txHash: '0x12a8491c9201984bc0192341209b18371902847a91823bc01928374a0192384c',
      blockNumber: 1948208,
      complianceChecks: {
        amlOfacCleared: true,
        kycTier: 'Tier 3 (Institutional UBO Verified)',
        merkleRootValidated: true,
        jurisdiction: 'Switzerland (FINMA Standard)'
      },
      details: {
        entityScreened: 'Rothko Family Estate Foundation',
        pepCheck: 'Negative',
        sanctionsListMatch: 'None',
        sourceOfWealthAttested: true
      }
    },
    {
      id: 'AUD-002',
      timestamp: '2026-10-10 11:30:05 UTC',
      eventType: 'STATUS_CHANGE',
      actionSummary: 'Consignment Title Tokenization & Vault Accession',
      actorName: 'Geneva Freeport Bonded Administration',
      actorRole: 'Custodial Vault Registry',
      actorWalletOrId: '0x8b32A292C9f143dF71689C82FaB211718816c4B2',
      txHash: '0x3a7e9184c0192837102938471902b918374a0192384c71029384710293847102',
      blockNumber: 1948210,
      complianceChecks: {
        amlOfacCleared: true,
        kycTier: 'Tier 3',
        merkleRootValidated: true,
        jurisdiction: 'Geneva Freeport Bonded Zone'
      },
      details: {
        previousStatus: 'Private Trust Custody',
        newStatus: 'In Vault (Bin 12B)',
        nfcSerialBound: 'NFC-ART-8921-CRYPTO-9941',
        reservePriceSet: 4000000
      }
    },
    {
      id: 'AUD-003',
      timestamp: '2026-10-12 14:48:30 UTC',
      eventType: 'DOCUMENT_BINDING',
      actionSummary: 'Cryptographic Binding of IRR Spectral Scan to Merkle Tree',
      actorName: 'Elena Vance, Senior Registrar',
      actorRole: 'Head Conservator',
      actorWalletOrId: 'REG-CH-9921',
      txHash: '0x4f810293847a91823bc0192837102938471902b918374a0192384c7102938a1c',
      blockNumber: 1948210,
      complianceChecks: {
        amlOfacCleared: true,
        kycTier: 'Certified Conservator',
        merkleRootValidated: true,
        jurisdiction: 'Geneva Freeport'
      },
      details: {
        documentName: 'Rothko_ART8921_IRR_Reflectography_1000nm.jpg',
        fileSha256: '0x4f8102...38a1c',
        conditionPinsCataloged: 2,
        tamperSealStatus: 'Intact'
      }
    },
    {
      id: 'AUD-004',
      timestamp: '2026-10-14 09:15:10 UTC',
      eventType: 'MULTISIG_SIGNATURE',
      actionSummary: 'Milestone 01: Vault Baseline Condition Multi-Sig Sign-off',
      actorName: 'Elena Vance, Head Registrar',
      actorRole: 'Gallery Registrar',
      actorWalletOrId: '0x9a81847102938471902b918374a0192384c7b29c',
      txHash: '0x7e29b1049c81a92083bc74102938471902847c10928374a0192384c71029384f',
      blockNumber: 1948210,
      complianceChecks: {
        amlOfacCleared: true,
        kycTier: 'Tier 3',
        merkleRootValidated: true,
        jurisdiction: 'Geneva Canton'
      },
      details: {
        milestoneId: 'ms-registrar',
        smartContractAddress: '0x718a280193498172918237190284710293847102',
        tamperProofSealId: 'SEAL-CH-VAULT-8921',
        consensusThreshold: '1/4 Achieved'
      }
    }
  ],
  royaltyScheme: {
    model: 'Artist-Venture-Covenant',
    totalRoyaltyPercent: 4.0,
    totalRoyaltyAmount: 180000,
    recipientName: 'Rothko Family Estate & Living Artists Legacy Fund',
    recipientWallet: '0x91cA38827361819dFa719283819028A1729040E1',
    collectingSocietyFee: 9000,
    netArtistProceeds: 171000,
    tiers: [
      { range: 'Tier 1 ($0 – $50,000)', rate: 0.04, applicableAmount: 50000, royaltyAmount: 2000 },
      { range: 'Tier 2 ($50,000 – $200,000)', rate: 0.03, applicableAmount: 150000, royaltyAmount: 4500 },
      { range: 'Tier 3 ($200,000 – $500,000)', rate: 0.015, applicableAmount: 300000, royaltyAmount: 4500 },
      { range: 'Tier 4 ($500,000+ Uncapped Covenant)', rate: 0.04225, applicableAmount: 4000000, royaltyAmount: 169000 }
    ]
  },
  escrow: {
    contractAddress: '0x718a280193498172918237190284710293847102',
    smartContractStandard: 'ERC-7590-Escrow',
    escrowStatus: 'DEPLOYED',
    depositedAmount: 0,
    currency: 'USD',
    buyerAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    sellerAddress: '0x3219082BcaF92819028371902837192083471029',
    escrowAgentAddress: '0x8b32A292C9f143dF71689C82FaB211718816c4B2',
    artistRoyaltyAddress: '0x91cA38827361819dFa719283819028A1729040E1',
    milestones: [
      {
        id: 'ms-registrar',
        title: 'Vault Baseline Condition Sign-off',
        role: 'registrar',
        partyName: 'Geneva Freeport Registrar (Elena Vance)',
        description: 'Verify high-res condition map, pin craquelure baseline, and seal climate crate with NFC tamper-proof bolt.',
        status: 'signed',
        signatureTimestamp: '2026-10-14 09:15 UTC',
        signerPublicKey: '0x9a81...b29c'
      },
      {
        id: 'ms-courier',
        title: 'Chain-of-Custody Freight Handshake',
        role: 'courier',
        partyName: 'Crozier Fine Arts Specialist',
        description: 'Verify climate crate seal, sensor telemetry initialization, and secure tarmac transport transfer.',
        status: 'pending',
        signatureTimestamp: undefined,
        signerPublicKey: '0x44c1...8892'
      },
      {
        id: 'ms-customs',
        title: 'Customs & Freeport Clearance Pass',
        role: 'customs',
        partyName: 'Swiss Federal Customs Administration',
        description: 'Electronic customs export declaration, bonded transit bond verification, VAT exemption certificate.',
        status: 'pending',
        signatureTimestamp: undefined,
        signerPublicKey: '0x10b7...e591'
      },
      {
        id: 'ms-collector',
        title: 'Collector Physical In-Person FaceID Sign-off',
        role: 'collector',
        partyName: 'Collector / Designated Art Advisor',
        description: 'Physical uncrating inspection, verification of condition against baseline pins, biometric FaceID confirmation.',
        status: 'pending',
        signatureTimestamp: undefined,
        signerPublicKey: '0x742d...f44e'
      }
    ],
    settlementWaterfall: {
      totalEscrow: 4500000,
      artistRoyalty: 180000,
      consignorNet: 2237500,
      galleryMargin: 2045550,
      freightAndInsurance: 15200,
      regulatoryDuty: 21750
    },
    multiSigApprovals: {
      buyerSigned: false,
      buyerSignerName: 'Private Collector Trust (Geneva Vault Account)',
      buyerKey: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      sellerSigned: false,
      sellerSignerName: 'Rothko Family Estate / Marlborough Consignor',
      sellerKey: '0x3219082BcaF92819028371902837192083471029',
      requiredQuorum: 2,
      currentQuorum: 0,
      isFundsReleased: false
    }
  },
  telemetry: {
    temperatureCelsius: 20.2,
    humidityPercent: 48.4,
    shockGForce: 0.02,
    tiltAngleDegrees: 1.2,
    gpsCoordinates: { lat: 46.2044, lng: 6.1432, label: 'Geneva Freeport Bonded Zone, Switzerland' },
    lightLux: 0.0,
    batteryPercent: 98,
    lastPingTimestamp: '2 min ago'
  }
};
