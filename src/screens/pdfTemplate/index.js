import { Platform } from "react-native";
import { Asset } from "expo-asset";

/**
 * Converts a local asset or remote URI to a Base64 string depending on the runtime platform.
 */
const getBase64Data = async (uri, isAsset = false) => {
  try {
    let targetUri = uri;
    if (isAsset) {
      const asset = Asset.fromModule(uri);
      await asset.downloadAsync();
      targetUri = asset.localUri || asset.uri;
    }

    if (!targetUri) return "";

    if (Platform.OS === 'web') {
      const response = await fetch(targetUri);
      const blob = await response.blob();
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(blob);
      });
    } else {
      const FileSystem = require("expo-file-system/legacy");
      return await FileSystem.readAsStringAsync(targetUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
    }
  } catch (error) {
    console.log("Base64 conversion error:", error);
    return "";
  }
};

/**
 * Generates the structural standalone HTML string for the document container details.
 */
export const generateDocumentHtml = async (document, brandLogoAsset) => {
  const logoBase64 = await getBase64Data(brandLogoAsset, true);

  let embeddedMediaHtml = "";
  if (document.file?.type === "image" && document.file?.uri) {
    const base64Data = await getBase64Data(document.file.uri, false);
    if (base64Data) {
      embeddedMediaHtml = `
        <div class="media-section">
          <h3 class="section-title">ATTACHED DIGITAL PROOF</h3>
          <img src="data:image/jpeg;base64,${base64Data}" class="embedded-proof" />
        </div>
      `;
    }
  } else if (document.file?.type !== "image" && document.file?.uri) {
    embeddedMediaHtml = `
      <div class="media-section text-fallback-box">
        <h3 class="section-title">ATTACHED DIGITAL PROOF</h3>
        <p style="color: #F97316; font-weight: 700; font-size: 14px; margin: 0;">[Secure PDF Document Asset Attached]</p>
      </div>
    `;
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        @page { 
          size: A4; 
          margin: 0mm; 
        }
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          background-color: #F8FAFC; /* Light gray backdrop to emphasize card boundaries if preferred, or #ffffff */
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          -webkit-print-color-adjust: exact;
        }
        .wrapper {
          width: 100%;
          min-height: 100%;
          padding: 40px 0;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }
        /* Lock down container details context cleanly */
        .document-card {
          background: #ffffff;
          width: 100%;
          max-width: 520px; 
          margin: 0 auto;
          padding: 32px;
          border-radius: 16px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          box-sizing: border-box;
        }
        .brand-center-header { 
          text-align: center; 
          margin-bottom: 20px; 
        }
        .brand-logo-img { 
          width: 56px; 
          height: 56px; 
          object-fit: contain;
          margin-bottom: 6px;
        }
        .brand-name {
          font-size: 22px;
          font-weight: 800;
          color: #F97316;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .doc-title { 
          font-size: 18px; 
          font-weight: 800; 
          color: #0F172A; 
          margin: 12px 0 6px 0;
          text-align: center;
        }
        .divider-line {
          height: 2px;
          background-color: #FFF7ED;
          width: 100%;
          margin-bottom: 20px;
        }
        .data-table { 
          width: 100%; 
          border-collapse: collapse; 
          margin-bottom: 20px; 
        }
        .data-table th, .data-table td { 
          padding: 12px 0; 
          text-align: left; 
          border-bottom: 1px solid #F1F5F9; 
        }
        .data-table th { 
          color: #64748B; 
          font-weight: 600; 
          font-size: 13px; 
          text-transform: uppercase; 
          width: 40%; 
        }
        .data-table td { 
          color: #1E293B; 
          font-weight: 700; 
          font-size: 14px; 
          text-align: right; 
        }
        .status-valid { color: #059669; }
        .status-expired { color: #DC2626; }
        
        .media-section { 
          margin-top: 24px; 
          page-break-inside: avoid; 
        }
        .text-fallback-box {
          padding: 16px;
          border: 2px dashed #FED7AA;
          border-radius: 12px;
          text-align: center;
          background-color: #FFF7ED;
        }
        .section-title { 
          font-size: 11px; 
          font-weight: 800; 
          color: #94A3B8; 
          letter-spacing: 0.5px; 
          text-transform: uppercase; 
          margin-bottom: 12px; 
        }
        .embedded-proof { 
          width: 100%; 
          border-radius: 12px; 
          border: 1px solid #E2E8F0; 
          max-height: 400px; 
          object-fit: contain; 
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="document-card">
          <div class="brand-center-header">
            ${logoBase64 ? `<img src="data:image/png;base64,${logoBase64}" class="brand-logo-img" />` : ''}
            <h1 class="brand-name">AutoSphere</h1>
          </div>
          
          <h2 class="doc-title">${document.title}</h2>
          <div class="divider-line"></div>
          
          <table class="data-table">
            <tr><th>Document Type</th><td>${document.type || "General"}</td></tr>
            <tr><th>Vehicle</th><td>${document.vehicleModel || "Not Available"}</td></tr>
            <tr><th>Owner</th><td>${document.owner || "Not Available"}</td></tr>
            <tr><th>Expiry Date</th><td>${document.expiryDate || "No Expiry"}</td></tr>
            <tr><th>Status</th><td class="${document.status?.toLowerCase() === 'expired' ? 'status-expired' : 'status-valid'}">${document.status || "Valid"}</td></tr>
          </table>

          ${embeddedMediaHtml}
        </div>
      </div>
    </body>
    </html>
  `;
};