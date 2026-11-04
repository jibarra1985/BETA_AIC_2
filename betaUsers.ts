import { BetaUserEntity } from '../types/artos';

export const BETA_CONSOLES_ENTITIES: Record<string, BetaUserEntity> = {
  artist: {
    id: 'user-artist-01',
    role: 'artist',
    name: 'Mark Rothko Studio & Foundation',
    title: 'Living Creator & Intellectual Property Assignor',
    organization: 'Materiality Sovereign Studio Enclave',
    email: 'studio@materiality-rothko.org',
    avatarInitials: 'MR',
    walletOrDid: 'did:artos:artist:rothko-74 (0x8b32…c4B2)',
    securityClearance: 'Sovereign Protocol Authority (L3)',
    consoleName: 'Materiality (Artist Console)',
    consoleSubtitle: 'Autonomous Resale Covenants, Genesis Minting & Stylus Notary Enclave',
    badgeColor: '#1B3B2B',
    entityDescription: 'Sovereign creator entity with programmatic resale equity enforcement, NFC microchip bonding, and direct studio legal execution.',
    keyPermissions: [
      'Uncapped Resale Covenant Splits (75/20/5)',
      'Genesis Block #0 Minting & Stretcher NFC Binding',
      '24/7 Secondary Market Private Treaty Radar',
      'Legal Signing Room (Stylus Attestation)',
      'Emergency Escrow Settlement Freeze Lever'
    ]
  },
  registrar: {
    id: 'user-registrar-01',
    role: 'registrar',
    name: 'Elena Vance',
    title: 'Chief Registrar & Senior Conservator',
    organization: 'Geneva Freeport Vault & Custody Authority',
    email: 'e.vance@geneva-freeport.ch',
    avatarInitials: 'EV',
    walletOrDid: 'did:artos:registrar:vance-gv88 (0x10b7…e591)',
    securityClearance: 'Custody & Specie Registrar Clearance',
    consoleName: 'Lead Registrar & Conservation Enclave',
    consoleSubtitle: 'Microscopic Condition Mapping, NFC Cryptoprocessors & Multi-Sig Vault Handshake',
    badgeColor: '#3A5A40',
    entityDescription: 'Institutional custodian executing raking-light condition pinning, environmental crate telemetry, and bonded customs clearance.',
    keyPermissions: [
      'Interactive Microscopic Condition Pinning',
      'Live Climate Telemetry Sensors (Temp, Lux, G-Force)',
      'Chain-of-Custody Multi-Sig Milestone Attestation',
      'Asset Documents Dossier Verification',
      'Tamper-Evident NFC Cryptoprocessor Diagnostics'
    ]
  },
  dealer: {
    id: 'user-dealer-01',
    role: 'dealer',
    name: 'Marcus Vance',
    title: 'Senior Partner & Private Treaty Director',
    organization: 'Marlborough Fine Art / Gallery Advisory Desk',
    email: 'm.vance@marlboroughfineart.com',
    avatarInitials: 'MV',
    walletOrDid: 'did:artos:dealer:marlborough-09 (0x3219…1029)',
    securityClearance: 'Regulated Gallery Tier 2 Clearance',
    consoleName: 'Deal Suite & Private Treaty Desk',
    consoleSubtitle: 'Landed Cost Modeling, Client Tier Matchmaker & Portfolio Campaign Orchestrator',
    badgeColor: '#2C3E50',
    entityDescription: 'Authorized dealer desk managing international landed quotes with pre-modeled import VAT, portfolio outreach, and 48-hour exclusive reservation holds.',
    keyPermissions: [
      'Landed-Cost Calculator with Destination Import VAT',
      'Client Tier Matchmaker (Institutions, Patrons, Next-Gen)',
      'Portfolio Campaign Orchestrator with Staggered Embargoes',
      'Live Collector Engagement Telemetry Stream',
      '48-Hour Exclusive Private Treaty Reserve Locks'
    ]
  },
  seller: {
    id: 'user-seller-01',
    role: 'seller',
    name: 'Rothko Family Estate & Trust',
    title: 'Consigning Principal & Legal Title Holder',
    organization: 'Rothko Heritage & Succession Trust',
    email: 'trustees@rothkofamilyestate.com',
    avatarInitials: 'RT',
    walletOrDid: 'did:artos:seller:rothko-estate (0x71cA…109A)',
    securityClearance: 'Consignor Title Beneficiary Clearance',
    consoleName: 'Consignor & Estate Portal',
    consoleSubtitle: 'Real-Time Proceeds Streaming, Settlement Waterfall & Multi-Sig Seller Sign-Off',
    badgeColor: '#78350F',
    entityDescription: 'Title holder consigning masterworks to escrow, monitoring real-time net wire transfers and multi-sig release quorum.',
    keyPermissions: [
      'Consignor Net Margin Verification ($2,237,500 USD)',
      'Multi-Sig Seller Digital Signature Authorization',
      'Settlement Waterfall Verification',
      'Direct Wire Confirmation & Audit Telemetry',
      'Perpetual Title Succession Covenants'
    ]
  },
  collector: {
    id: 'user-collector-01',
    role: 'collector',
    name: 'Dr. Henri de Courcelles',
    title: 'Managing Trustee & Principal Collector',
    organization: 'Helvetia Heritage Trust & Foundation',
    email: 'h.decourcelles@helvetia-heritage.ch',
    avatarInitials: 'HC',
    walletOrDid: 'did:artos:buyer:helvetia-trust (0x742d…f44e)',
    securityClearance: 'UHNW Tier 1 Sovereign Patron Clearance',
    consoleName: 'Qualified Collector & Acquisition Suite',
    consoleSubtitle: '1-Tap Landed Escrow Checkout, Biometric FaceID Release & Specie Underwriting',
    badgeColor: '#1E3A8A',
    entityDescription: 'Qualified institutional collector depositing funds into dual-signature smart escrow, monitoring environmental crate telemetry and approving release via FaceID.',
    keyPermissions: [
      'All-In Landed Cost Checkout with Swiss Import Duty',
      'Smart Escrow Fund Locking ($4,500,000 USD)',
      'Biometric FaceID Uncrating Physical Sign-Off',
      'Live Sensor Shock & Temperature Monitoring',
      'Lloyd’s Specie Policy Binder Verification'
    ]
  }
};
