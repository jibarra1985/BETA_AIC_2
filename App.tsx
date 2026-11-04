import React, { useState } from 'react';
import { ArtworkRecord, ConditionPin, DeviceMode, UserRole, BetaUserEntity } from './types/artos';
import { INITIAL_ARTWORK, INITIAL_PINS } from './data/mockArtworks';
import { BETA_CONSOLES_ENTITIES } from './data/betaUsers';
import { ConsoleLoginScreen } from './components/auth/ConsoleLoginScreen';
import { TopBar } from './components/common/TopBar';
import { DeviceFrame } from './components/common/DeviceFrame';
import { RegistrarView } from './components/views/RegistrarView';
import { DealerView } from './components/views/DealerView';
import { SellerView } from './components/views/SellerView';
import { CollectorView } from './components/views/CollectorView';
import { BlockchainProvenanceViewer } from './components/provenance/BlockchainProvenanceViewer';
import { EscrowEngineModal } from './components/escrow/EscrowEngineModal';
import { RoyaltyWaterfallCalculator } from './components/royalty/RoyaltyWaterfallCalculator';
import { AssetDocumentsModal } from './components/documents/AssetDocumentsModal';
import { ComplianceAuditTrailModal } from './components/compliance/ComplianceAuditTrailModal';
import { InsuranceValuationCalculatorModal } from './components/insurance/InsuranceValuationCalculatorModal';
import { GalleryCrmModal } from './components/crm/GalleryCrmModal';
import { ProvenanceQrScannerModal } from './components/qr/ProvenanceQrScannerModal';
import { EscrowSummaryPdfModal } from './components/reports/EscrowSummaryPdfModal';
import { ArtistView } from './components/views/ArtistView';

export default function App() {
  const [role, setRole] = useState<UserRole>('artist');
  const [currentUser, setCurrentUser] = useState<BetaUserEntity | null>(() => {
    try {
      const saved = localStorage.getItem('aic_beta_user_role') as UserRole | null;
      if (saved && BETA_CONSOLES_ENTITIES[saved]) {
        return BETA_CONSOLES_ENTITIES[saved];
      }
    } catch {
      // ignore
    }
    return null; // Front login screen shown by default!
  });
  const [artwork, setArtwork] = useState<ArtworkRecord>(INITIAL_ARTWORK);
  const [pins, setPins] = useState<ConditionPin[]>(INITIAL_PINS);
  const [activePinId, setActivePinId] = useState<number | null>(null);
  const [selectedCarrier, setSelectedCarrier] = useState<string>('crozier');
  const [signatures, setSignatures] = useState({ registrar: true, courier: false, collector: false });
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [activeModal, setActiveModal] = useState<
    'none' | 'provenance' | 'escrow' | 'royalty' | 'documents' | 'audit' | 'insurance' | 'crm' | 'qr' | 'pdf_report'
  >('none');
  const [notifications, setNotifications] = useState<Array<{ id: number; msg: string }>>([]);

  const addNotification = (msg: string) => {
    const newNote = { id: Date.now() + Math.random(), msg };
    setNotifications((prev: Array<{ id: number; msg: string }>) => [newNote, ...prev.slice(0, 3)]);
    setTimeout(() => {
      setNotifications((prev: Array<{ id: number; msg: string }>) => prev.filter((n) => n.id !== newNote.id));
    }, 4500);
  };

  const handleApplyRoyaltyRate = (rate: number, model: string) => {
    const royaltyAmount = artwork.listPrice * (rate / 100);
    setArtwork((prev: ArtworkRecord) => ({
      ...prev,
      royaltyScheme: {
        ...prev.royaltyScheme,
        totalRoyaltyPercent: rate,
        totalRoyaltyAmount: royaltyAmount,
        netArtistProceeds: royaltyAmount * 0.95,
        collectingSocietyFee: royaltyAmount * 0.05,
      },
      escrow: {
        ...prev.escrow,
        settlementWaterfall: {
          ...prev.escrow.settlementWaterfall,
          artistRoyalty: royaltyAmount,
        },
      },
    }));
    addNotification(`Royalty terms updated: ${rate}% (${model}) on list price $${artwork.listPrice.toLocaleString()}`);
  };

  const handleSwitchConsoleRole = (newRole: UserRole) => {
    setRole(newRole);
    const designatedEntity = BETA_CONSOLES_ENTITIES[newRole];
    if (designatedEntity) {
      setCurrentUser(designatedEntity);
      try {
        localStorage.setItem('aic_beta_user_role', newRole);
      } catch {
        // ignore
      }
      addNotification(`Switched Console: ${designatedEntity.consoleName} · Designated Entity: ${designatedEntity.name}`);
    }
    setActivePinId(null);
    // Auto-adjust default device view if collector
    if (newRole === 'collector' && deviceMode === 'desktop') {
      setDeviceMode('iphone');
    } else if (newRole === 'registrar' && deviceMode === 'iphone') {
      setDeviceMode('ipad');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('aic_beta_user_role');
    } catch {
      // ignore
    }
    addNotification('Exited operating console. Returned to Beta Access Gateway.');
  };

  // If no user is logged in, show the front Console Login Gateway
  if (!currentUser) {
    return (
      <div className="relative">
        {/* Floating System Notification Toasts */}
        {notifications.length > 0 && (
          <div className="fixed top-6 right-6 z-50 space-y-2 max-w-sm pointer-events-none">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="bg-[#FAF8F5] border border-[#1B3B2B]/30 text-[#1C1E20] px-4 py-3 rounded-xl shadow-lg text-xs font-medium flex items-center gap-2.5"
              >
                <span className="w-2 h-2 rounded-full bg-[#1B3B2B] shrink-0 animate-pulse"></span>
                <span className="leading-snug">{n.msg}</span>
              </div>
            ))}
          </div>
        )}
        <ConsoleLoginScreen
          onLogin={(entity) => {
            setCurrentUser(entity);
            setRole(entity.role);
            try {
              localStorage.setItem('aic_beta_user_role', entity.role);
            } catch {
              // ignore
            }
            addNotification(`Clearance Granted: ${entity.name} · ${entity.consoleName}`);
          }}
          initialRole={role}
        />
      </div>
    );
  }

  const renderActiveView = () => {
    switch (role) {
      case 'artist':
        return (
          <ArtistView
            artwork={artwork}
            setArtwork={setArtwork}
            addNotification={addNotification}
            onOpenProvenance={() => setActiveModal('provenance')}
            onOpenEscrow={() => setActiveModal('escrow')}
            onOpenRoyalty={() => setActiveModal('royalty')}
            onOpenPdfReport={() => setActiveModal('pdf_report')}
            currentUser={currentUser}
          />
        );
      case 'registrar':
        return (
          <RegistrarView
            artwork={artwork}
            setArtwork={setArtwork}
            pins={pins}
            setPins={setPins}
            activePinId={activePinId}
            setActivePinId={setActivePinId}
            signatures={signatures}
            setSignatures={setSignatures}
            addNotification={addNotification}
            onOpenProvenance={() => setActiveModal('provenance')}
            onOpenAssetDocuments={() => setActiveModal('documents')}
            onOpenPdfReport={() => setActiveModal('pdf_report')}
            currentUser={currentUser}
          />
        );
      case 'dealer':
        return (
          <DealerView
            artwork={artwork}
            setArtwork={setArtwork}
            selectedCarrier={selectedCarrier}
            setSelectedCarrier={setSelectedCarrier}
            addNotification={addNotification}
            onOpenRoyalty={() => setActiveModal('royalty')}
            onOpenCrm={() => setActiveModal('crm')}
            onOpenPdfReport={() => setActiveModal('pdf_report')}
            currentUser={currentUser}
          />
        );
      case 'seller':
        return (
          <SellerView
            artwork={artwork}
            signatures={signatures}
            onOpenProvenance={() => setActiveModal('provenance')}
            onOpenRoyalty={() => setActiveModal('royalty')}
            onOpenAudit={() => setActiveModal('audit')}
            onOpenPdfReport={() => setActiveModal('pdf_report')}
            currentUser={currentUser}
          />
        );
      case 'collector':
        return (
          <CollectorView
            artwork={artwork}
            setArtwork={setArtwork}
            pins={pins}
            selectedCarrier={selectedCarrier}
            signatures={signatures}
            setSignatures={setSignatures}
            addNotification={addNotification}
            onOpenProvenance={() => setActiveModal('provenance')}
            onOpenEscrow={() => setActiveModal('escrow')}
            onOpenRoyalty={() => setActiveModal('royalty')}
            onOpenInsurance={() => setActiveModal('insurance')}
            onOpenQrScanner={() => setActiveModal('qr')}
            onOpenPdfReport={() => setActiveModal('pdf_report')}
            currentUser={currentUser}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#1C1E20] font-sans flex flex-col selection:bg-[#1B3B2B] selection:text-[#FAF8F5]">
      {/* Universal Stately Top Navigation */}
      <TopBar
        currentRole={role}
        currentUser={currentUser}
        onSelectRole={handleSwitchConsoleRole}
        onLogout={handleLogout}
        deviceMode={deviceMode}
        onSelectDeviceMode={setDeviceMode}
        status={artwork.status}
        onOpenProvenance={() => setActiveModal('provenance')}
        onOpenEscrow={() => setActiveModal('escrow')}
        onOpenRoyalty={() => setActiveModal('royalty')}
        onOpenDocuments={() => setActiveModal('documents')}
        onOpenAudit={() => setActiveModal('audit')}
        onOpenInsurance={() => setActiveModal('insurance')}
        onOpenCrm={() => setActiveModal('crm')}
        onOpenQrScanner={() => setActiveModal('qr')}
        onOpenPdfReport={() => setActiveModal('pdf_report')}
      />

      {/* Floating System Notification Toasts */}
      {notifications.length > 0 && (
        <div className="fixed top-24 right-6 z-50 space-y-2 max-w-sm pointer-events-none">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="bg-[#FAF8F5] border border-[#1B3B2B]/30 text-[#1C1E20] px-4 py-3 rounded-xl shadow-lg text-xs font-medium flex items-center gap-2.5"
            >
              <span className="w-2 h-2 rounded-full bg-[#1B3B2B] shrink-0 animate-pulse"></span>
              <span className="leading-snug">{n.msg}</span>
            </div>
          ))}
        </div>
      )}

      {/* Main Workspace Frame */}
      <main className="flex-1 flex flex-col p-1 sm:p-4 lg:p-6 max-w-7xl w-full mx-auto overflow-hidden">
        <DeviceFrame
          mode={deviceMode}
          onExitDeviceMode={() => setDeviceMode('desktop')}
        >
          {renderActiveView()}
        </DeviceFrame>
      </main>

      {/* Modals for Deep Provenance, Documents, Escrow, and Engines */}
      {activeModal === 'provenance' && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <BlockchainProvenanceViewer
            artwork={artwork}
            onClose={() => setActiveModal('none')}
            onTriggerEscrow={() => setActiveModal('escrow')}
            onOpenDocuments={() => setActiveModal('documents')}
          />
        </div>
      )}

      {activeModal === 'documents' && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <AssetDocumentsModal
            artwork={artwork}
            onUpdateArtwork={setArtwork}
            onClose={() => setActiveModal('none')}
            addNotification={addNotification}
          />
        </div>
      )}

      {activeModal === 'escrow' && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <EscrowEngineModal
            artwork={artwork}
            onUpdateArtwork={setArtwork}
            onClose={() => setActiveModal('none')}
            addNotification={addNotification}
          />
        </div>
      )}

      {activeModal === 'royalty' && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <RoyaltyWaterfallCalculator
            artwork={artwork}
            onClose={() => setActiveModal('none')}
            onApplyRoyaltyRate={handleApplyRoyaltyRate}
          />
        </div>
      )}

      {activeModal === 'audit' && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <ComplianceAuditTrailModal
            artwork={artwork}
            onClose={() => setActiveModal('none')}
            onOpenEscrow={() => setActiveModal('escrow')}
          />
        </div>
      )}

      {activeModal === 'insurance' && (
        <InsuranceValuationCalculatorModal
          artwork={artwork}
          onUpdateArtwork={setArtwork}
          onClose={() => setActiveModal('none')}
          addNotification={addNotification}
        />
      )}

      {activeModal === 'crm' && (
        <GalleryCrmModal
          artwork={artwork}
          onClose={() => setActiveModal('none')}
          addNotification={addNotification}
        />
      )}

      {activeModal === 'qr' && (
        <ProvenanceQrScannerModal
          artwork={artwork}
          onClose={() => setActiveModal('none')}
          onOpenProvenance={() => setActiveModal('provenance')}
          onOpenEscrow={() => setActiveModal('escrow')}
          addNotification={addNotification}
        />
      )}

      {activeModal === 'pdf_report' && (
        <EscrowSummaryPdfModal
          artwork={artwork}
          onClose={() => setActiveModal('none')}
          addNotification={addNotification}
        />
      )}
    </div>
  );
}
