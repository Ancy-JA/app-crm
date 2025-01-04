
export const downloadPdf = (base64Data: string, fileName: string) => {
    const normalizedBase64 = base64Data.replace(/-/g, '+').replace(/_/g, '/');
    const binaryString = window.atob(normalizedBase64);
    const bytes = new Uint8Array(binaryString.length);
  
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
  
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${fileName}.pdf`;
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
  };
  