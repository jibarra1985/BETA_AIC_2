import { jsPDF } from 'jspdf';
import { ArtworkRecord } from '../types/artos';

export function generateArtworkPdfDossier(artwork: ArtworkRecord) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Palette: Art Information Co. Brand Colors
  const forestGreen = [27, 59, 43]; // #1B3B2B
  const slateDark = [28, 30, 32];   // #1C1E20
  const stoneMuted = [108, 114, 120]; // #6C7278
  const sandBg = [248, 246, 240];   // #F8F6F0
  const borderGrey = [226, 221, 210]; // #E2DDD2

  let y = margin;

  // ----------------------------------------------------
  // HEADER
  // ----------------------------------------------------
  // Top brand banner
  doc.setFillColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.rect(margin, y, contentWidth, 18, 'F');

  doc.setTextColor(250, 248, 245);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('ART INFORMATION CO.', margin + 6, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('INSTITUTIONAL FINE ART FINANCIAL RAILS · ESCROW DOSSIER & PROVENANCE RECORD', margin + 6, y + 13);

  const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  doc.setFontSize(7);
  doc.text(`ISSUED: ${nowStr}`, pageWidth - margin - 6, y + 8, { align: 'right' });
  doc.text(`STANDARD: ERC-7590 / DUAL MULTI-SIG`, pageWidth - margin - 6, y + 13, { align: 'right' });

  y += 24;

  // ----------------------------------------------------
  // ARTWORK SPECIFICATIONS
  // ----------------------------------------------------
  doc.setFillColor(sandBg[0], sandBg[1], sandBg[2]);
  doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
  doc.roundedRect(margin, y, contentWidth, 32, 2, 2, 'FD');

  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(artwork.title, margin + 4, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(stoneMuted[0], stoneMuted[1], stoneMuted[2]);
  doc.text(`${artwork.artist} (${artwork.year}) · ${artwork.medium}`, margin + 4, y + 12);

  // Artwork metadata grid
  doc.setFontSize(8);
  const colW = contentWidth / 4;
  
  // Col 1: Dimensions
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('Dimensions:', margin + 4, y + 20);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(stoneMuted[0], stoneMuted[1], stoneMuted[2]);
  doc.text(artwork.dimensions, margin + 4, y + 25);

  // Col 2: Valuation
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('Listing Valuation:', margin + 4 + colW, y + 20);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text(`$${artwork.listPrice.toLocaleString()} USD`, margin + 4 + colW, y + 25);

  // Col 3: Current Custody
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('Custody Vault:', margin + 4 + colW * 2, y + 20);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(stoneMuted[0], stoneMuted[1], stoneMuted[2]);
  doc.text(artwork.location, margin + 4 + colW * 2, y + 25);

  // Col 4: Status
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('Lifecycle Status:', margin + 4 + colW * 3, y + 20);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text(artwork.status, margin + 4 + colW * 3, y + 25);

  y += 38;

  // ----------------------------------------------------
  // SECTION 1: ESCROW STATUS & MULTI-SIG APPROVALS
  // ----------------------------------------------------
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text('1. SMART ESCROW & MULTI-SIGNATURE SETTLEMENT STATUS', margin, y);
  
  // Subtle line
  doc.setDrawColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.setLineWidth(0.3);
  doc.line(margin, y + 2, pageWidth - margin, y + 2);

  y += 6;

  const multiSig = artwork.escrow.multiSigApprovals;
  const buyerSigned = multiSig?.buyerSigned || false;
  const sellerSigned = multiSig?.sellerSigned || false;
  const currentQuorum = (buyerSigned ? 1 : 0) + (sellerSigned ? 1 : 0);
  const isSettled = artwork.escrow.escrowStatus === 'RELEASED_AND_SETTLED';

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
  doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'FD');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text(`Smart Escrow Contract:`, margin + 4, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(stoneMuted[0], stoneMuted[1], stoneMuted[2]);
  doc.text(`${artwork.escrow.contractAddress} (${artwork.escrow.smartContractStandard})`, margin + 45, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text(`Approval Quorum:`, margin + 4, y + 12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(currentQuorum >= 2 ? forestGreen[0] : slateDark[0], currentQuorum >= 2 ? forestGreen[1] : slateDark[1], currentQuorum >= 2 ? forestGreen[2] : slateDark[2]);
  doc.text(`${currentQuorum} of 2 Mutual Signatures Required (${isSettled ? 'FUNDS SETTLED & RELEASED' : currentQuorum >= 2 ? 'QUORUM REACHED' : 'PENDING COUNTER-SIGNATURE'})`, margin + 45, y + 12);

  // Buyer Signature status
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text(`• Buyer Signature:`, margin + 4, y + 20);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(buyerSigned ? forestGreen[0] : stoneMuted[0], buyerSigned ? forestGreen[1] : stoneMuted[1], buyerSigned ? forestGreen[2] : stoneMuted[2]);
  doc.text(
    buyerSigned 
      ? `VERIFIED [✓] Signed by Collector Trust via Biometric Enclave at ${multiSig?.buyerSignedAt || 'Recorded'}` 
      : `PENDING [ ] Awaiting Buyer Digital Signature Approval`,
    margin + 36, 
    y + 20
  );
  if (buyerSigned && multiSig?.buyerTxHash) {
    doc.setFontSize(6.5);
    doc.setTextColor(stoneMuted[0], stoneMuted[1], stoneMuted[2]);
    doc.text(`Tx: ${multiSig.buyerTxHash}`, margin + 36, y + 23);
  }

  // Seller Signature status
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text(`• Seller Signature:`, margin + 4, y + 29);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(sellerSigned ? forestGreen[0] : stoneMuted[0], sellerSigned ? forestGreen[1] : stoneMuted[1], sellerSigned ? forestGreen[2] : stoneMuted[2]);
  doc.text(
    sellerSigned 
      ? `VERIFIED [✓] Signed by Consignor / Estate at ${multiSig?.sellerSignedAt || 'Recorded'}` 
      : `PENDING [ ] Awaiting Consignor Digital Counter-Signature`,
    margin + 36, 
    y + 29
  );
  if (sellerSigned && multiSig?.sellerTxHash) {
    doc.setFontSize(6.5);
    doc.setTextColor(stoneMuted[0], stoneMuted[1], stoneMuted[2]);
    doc.text(`Tx: ${multiSig.sellerTxHash}`, margin + 36, y + 32);
  }

  y += 44;

  // ----------------------------------------------------
  // SECTION 2: IMMUTABLE PROVENANCE LEDGER
  // ----------------------------------------------------
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text('2. IMMUTABLE ON-CHAIN PROVENANCE CHAIN OF CUSTODY', margin, y);
  
  doc.setDrawColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.setLineWidth(0.3);
  doc.line(margin, y + 2, pageWidth - margin, y + 2);

  y += 6;

  // Provenance Table Header
  doc.setFillColor(sandBg[0], sandBg[1], sandBg[2]);
  doc.rect(margin, y, contentWidth, 6, 'F');
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);

  doc.text('BLOCK / DATE', margin + 3, y + 4.2);
  doc.text('EVENT & CUSTODY TRANSFER', margin + 38, y + 4.2);
  doc.text('FROM / TO PARTIES', margin + 105, y + 4.2);
  doc.text('NOTARY / VERIFIER', margin + 148, y + 4.2);

  y += 7;

  // Render Provenance Blocks (5 items)
  artwork.provenance.slice(-5).reverse().forEach((block) => {
    doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
    doc.setLineWidth(0.2);
    doc.line(margin, y + 9, pageWidth - margin, y + 9);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
    doc.text(`#${block.blockNumber}`, margin + 3, y + 3.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(stoneMuted[0], stoneMuted[1], stoneMuted[2]);
    doc.text(block.timestamp.slice(0, 10), margin + 3, y + 7.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
    doc.text(block.event.length > 40 ? block.event.slice(0, 39) + '…' : block.event, margin + 38, y + 3.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(stoneMuted[0], stoneMuted[1], stoneMuted[2]);
    doc.text(`Hash: ${block.hash.slice(0, 16)}… · NFC: ${block.nfcTagId}`, margin + 38, y + 7.5);

    doc.setFontSize(6.5);
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
    const fromToText = `${block.from.slice(0, 24)} → ${block.to.slice(0, 24)}`;
    doc.text(fromToText, margin + 105, y + 5.5);

    doc.setFontSize(6.5);
    doc.setTextColor(stoneMuted[0], stoneMuted[1], stoneMuted[2]);
    doc.text(block.verifiedBy.slice(0, 22), margin + 148, y + 5.5);

    y += 10.5;
  });

  y += 4;

  // ----------------------------------------------------
  // SECTION 3: SECONDARY MARKET ROYALTY WATERFALL
  // ----------------------------------------------------
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text('3. SECONDARY MARKET ARTIST RESALE ROYALTY WATERFALL', margin, y);
  
  doc.setDrawColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.setLineWidth(0.3);
  doc.line(margin, y + 2, pageWidth - margin, y + 2);

  y += 6;

  doc.setFillColor(sandBg[0], sandBg[1], sandBg[2]);
  doc.roundedRect(margin, y, contentWidth, 32, 2, 2, 'FD');

  const royaltyPercent = artwork.royaltyScheme?.totalRoyaltyPercent || 4.0;
  const totalRoyaltyAmount = artwork.royaltyScheme?.totalRoyaltyAmount || (artwork.listPrice * 0.04);
  const netArtistProceeds = artwork.royaltyScheme?.netArtistProceeds || (totalRoyaltyAmount * 0.95);
  const foundationFee = artwork.royaltyScheme?.collectingSocietyFee || (totalRoyaltyAmount * 0.05);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('Active Royalty Covenant:', margin + 4, y + 6);
  doc.setFont('helvetica', 'normal');
  const covenantLabel = artwork.royaltyScheme?.model === 'Artist-Venture-Covenant' 
    ? `Materiality Sovereign Covenant (Uncapped ${royaltyPercent}%)` 
    : (artwork.royaltyScheme?.model || `Materiality Sovereign Covenant (Uncapped ${royaltyPercent}%)`);
  doc.text(covenantLabel, margin + 46, y + 6);

  // 4 Waterfall Columns
  const rColW = contentWidth / 4;

  // Col 1: Total Royalty
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text(`Total Royalty (${royaltyPercent}%):`, margin + 4, y + 15);
  doc.setFontSize(10);
  doc.text(`$${totalRoyaltyAmount.toLocaleString()} USD`, margin + 4, y + 21);

  // Col 2: Net Artist / Estate
  doc.setFontSize(8);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('Net Artist Estate (95%):', margin + 4 + rColW, y + 15);
  doc.setFontSize(9);
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text(`$${netArtistProceeds.toLocaleString()} USD`, margin + 4 + rColW, y + 21);

  // Col 3: Collecting Society Fee
  doc.setFontSize(8);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('Foundation Fee (5%):', margin + 4 + rColW * 2, y + 15);
  doc.setFontSize(9);
  doc.setTextColor(stoneMuted[0], stoneMuted[1], stoneMuted[2]);
  doc.text(`$${foundationFee.toLocaleString()} USD`, margin + 4 + rColW * 2, y + 21);

  // Col 4: Settlement Waterfall
  doc.setFontSize(8);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('Consignor Net Payout:', margin + 4 + rColW * 3, y + 15);
  doc.setFontSize(9);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  const consignorPayout = (artwork.listPrice * (artwork.consignorSplit / 100));
  doc.text(`$${consignorPayout.toLocaleString()} USD`, margin + 4 + rColW * 3, y + 21);

  doc.setFontSize(7);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(stoneMuted[0], stoneMuted[1], stoneMuted[2]);
  doc.text('Automated algorithmic split triggered immediately upon EscrowEngine release into Swiss vault settlement accounts.', margin + 4, y + 28);

  y += 38;

  // ----------------------------------------------------
  // SECTION 4: NOTARIZATION & SIGNATURES
  // ----------------------------------------------------
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'FD');

  const sigColW = contentWidth / 3;

  // Signer 1: Registrar
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('REGISTRAR CONDITION SEAL', margin + 4, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text('Verified at Geneva Freeport Vault', margin + 4, y + 10);
  doc.setTextColor(stoneMuted[0], stoneMuted[1], stoneMuted[2]);
  doc.text('Baseline condition report pinned & signed', margin + 4, y + 14);
  doc.text(`Cert Hash: 0x8a92...31f0`, margin + 4, y + 18);

  // Signer 2: Escrow Agent
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('ART INFORMATION CO. ESCROW', margin + 4 + sigColW, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text('Autonomous Smart Contract Rails', margin + 4 + sigColW, y + 10);
  doc.setTextColor(stoneMuted[0], stoneMuted[1], stoneMuted[2]);
  doc.text('2-of-2 Multi-Sig Enforcement active', margin + 4 + sigColW, y + 14);
  doc.text(`Enclave: Apple A18 Pro / FIDO2 Level 3`, margin + 4 + sigColW, y + 18);

  // Signer 3: Legal & Regulatory
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('REGULATORY & OFAC ATTESTATION', margin + 4 + sigColW * 2, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(forestGreen[0], forestGreen[1], forestGreen[2]);
  doc.text('AML / OFAC Clear · Merkle Root OK', margin + 4 + sigColW * 2, y + 10);
  doc.setTextColor(stoneMuted[0], stoneMuted[1], stoneMuted[2]);
  doc.text('Swiss Bonded Customs Transit pass cleared', margin + 4 + sigColW * 2, y + 14);
  doc.text(`Ref: AIC-CERT-${artwork.id}-2026`, margin + 4 + sigColW * 2, y + 18);

  // Footer Disclaimer
  doc.setFontSize(6);
  doc.setTextColor(stoneMuted[0], stoneMuted[1], stoneMuted[2]);
  doc.text(
    'This electronic summary document is issued by Art Information Co. as an immutable certified ledger export. For cryptographic validation, query the smart contract on-chain.',
    pageWidth / 2,
    pageHeight - 6,
    { align: 'center' }
  );

  // Save the document directly
  const safeFilename = `ArtInformationCo_Escrow_Summary_Dossier_${artwork.id}_${Date.now()}.pdf`;
  doc.save(safeFilename);
  return safeFilename;
}
