export type ArtworkStatus = 
  | 'In Vault' 
  | 'Under Offer' 
  | 'Escrow Funded' 
  | 'Sold & Pending Release' 
  | 'In Transit' 
  | 'Delivered & Settled';

export interface ConditionPin {
  id: number;
  x: number;
  y: number;
  category: 'Medium' | 'Frame' | 'Support' | 'Varnish';
  tags: string[];
  note: string;
  severity?: 'Minor' | 'Moderate' | 'Stable';
  inspector?: string;
  timestamp?: string;
}

export interface ProvenanceBlock {
  blockNumber: number;
  hash: string;
  parentHash: string;
  timestamp: string;
  event: string;
  from: string;
  to: string;
  transactionAmount?: number;
  royaltyPaid?: number;
  verifiedBy: string;
  ipfsMetadataUri: string;
  nfcTagId: string;
}

export interface RoyaltyTier {
  range: string;
  rate: number;
  applicableAmount: number;
  royaltyAmount: number;
}

export interface RoyaltyBreakdown {
  model: 'EIP-2981' | 'EU-Droit-de-Suite' | 'Artist-Venture-Covenant';
  totalRoyaltyPercent: number;
  totalRoyaltyAmount: number;
  recipientName: string;
  recipientWallet: string;
  collectingSocietyFee: number;
  netArtistProceeds: number;
  tiers?: RoyaltyTier[];
}

export interface CarrierOption {
  id: string;
  name: string;
  price: number;
  eta: string;
  type: string;
  reliability: string;
  insuranceMax: number;
}

export interface EscrowMilestone {
  id: string;
  title: string;
  role: 'registrar' | 'courier' | 'customs' | 'collector';
  partyName: string;
  description: string;
  status: 'pending' | 'in_progress' | 'signed' | 'locked';
  signatureTimestamp?: string;
  signerPublicKey?: string;
}

export interface MultiSigApprovalState {
  buyerSigned: boolean;
  buyerSignedAt?: string;
  buyerTxHash?: string;
  buyerKey?: string;
  buyerSignerName?: string;
  sellerSigned: boolean;
  sellerSignedAt?: string;
  sellerTxHash?: string;
  sellerKey?: string;
  sellerSignerName?: string;
  requiredQuorum: number;
  currentQuorum: number;
  isFundsReleased: boolean;
  releasedAt?: string;
  releaseTxHash?: string;
}

export interface EscrowContract {
  contractAddress: string;
  smartContractStandard: 'ERC-7590-Escrow' | 'ArtInformationCo-MultiSig-v3';
  escrowStatus: 'DEPLOYED' | 'AWAITING_DEPOSIT' | 'FUNDS_LOCKED' | 'CONDITIONS_MET' | 'RELEASED_AND_SETTLED';
  depositedAmount: number;
  currency: 'USD' | 'USDC';
  buyerAddress: string;
  sellerAddress: string;
  escrowAgentAddress: string;
  artistRoyaltyAddress: string;
  milestones: EscrowMilestone[];
  settlementWaterfall: {
    totalEscrow: number;
    artistRoyalty: number;
    consignorNet: number;
    galleryMargin: number;
    freightAndInsurance: number;
    regulatoryDuty: number;
  };
  multiSigApprovals?: MultiSigApprovalState;
}

export interface EnvironmentalTelemetry {
  temperatureCelsius: number;
  humidityPercent: number;
  shockGForce: number;
  tiltAngleDegrees: number;
  gpsCoordinates: { lat: number; lng: number; label: string };
  lightLux: number;
  batteryPercent: number;
  lastPingTimestamp: string;
}

export interface AssetDocument {
  id: string;
  title: string;
  documentType: 'Conservation Dossier' | 'Bill of Sale / Title' | 'Spectroscopy / Imagery' | 'Customs & Bond' | 'Condition Assessment' | 'Insurance Binder';
  filename: string;
  filesize: string;
  mimeType: 'application/pdf' | 'image/jpeg' | 'image/png' | 'image/tiff';
  fileUrl?: string;
  sha256Hash: string;
  ipfsCid: string;
  associatedBlockNumber: number;
  uploadedAt: string;
  uploadedBy: string;
  onChainVerified: boolean;
  notes?: string;
}

export type AuditEventType = 
  | 'STATUS_CHANGE'
  | 'ESCROW_DEPOSIT'
  | 'ESCROW_RELEASE'
  | 'MULTISIG_SIGNATURE'
  | 'ROYALTY_DISBURSEMENT'
  | 'DOCUMENT_BINDING'
  | 'COMPLIANCE_SCREENING'
  | 'INSURANCE_BINDING';

export interface InsurancePolicyBreakdown {
  agreedValuation: number;
  marketVolatilityIndex: number;
  escrowRiskScore: number;
  baseSpecieRateBps: number;
  volatilityLoadingBps: number;
  escrowRiskAdjustmentBps: number;
  telemetryCreditBps: number;
  provenanceCreditBps: number;
  netRateBps: number;
  annualPremium: number;
  transitRiderPremium: number;
  totalCalculatedPremium: number;
  deductible: number;
  syndicate: string;
  policyId?: string;
  boundAt?: string;
}

export interface AuditTrailEntry {
  id: string;
  timestamp: string;
  eventType: AuditEventType;
  actionSummary: string;
  actorName: string;
  actorRole: string;
  actorWalletOrId: string;
  txHash: string;
  blockNumber: number;
  complianceChecks: {
    amlOfacCleared: boolean;
    kycTier: string;
    merkleRootValidated: boolean;
    jurisdiction: string;
  };
  details: Record<string, string | number | boolean>;
}

export interface ArtworkRecord {
  id: string;
  title: string;
  artist: string;
  artistBio: string;
  year: string;
  medium: string;
  dimensions: string;
  netWeight: string;
  crateDims: string;
  calculatedCrateWeight: string;
  location: string;
  consignor: string;
  consignorSplit: number; // e.g. 50
  reservePrice: number;
  listPrice: number;
  status: ArtworkStatus;
  holdTriggeredBy: string | null;
  dutyRates: Record<string, number>;
  image: string;
  nfcTagId: string;
  contractAddress: string;
  provenance: ProvenanceBlock[];
  assetDocuments: AssetDocument[];
  auditTrail: AuditTrailEntry[];
  royaltyScheme: RoyaltyBreakdown;
  escrow: EscrowContract;
  telemetry: EnvironmentalTelemetry;
  escrowRiskScore?: number;
}

export type UserRole = 'artist' | 'registrar' | 'dealer' | 'seller' | 'collector';

export type DeviceMode = 'desktop' | 'ipad' | 'iphone';

export interface BetaUserEntity {
  id: string;
  role: UserRole;
  name: string;
  title: string;
  organization: string;
  email: string;
  avatarInitials: string;
  walletOrDid: string;
  securityClearance: string;
  consoleName: string;
  consoleSubtitle: string;
  badgeColor: string;
  entityDescription: string;
  keyPermissions: string[];
}
