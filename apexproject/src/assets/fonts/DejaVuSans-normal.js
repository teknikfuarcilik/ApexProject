// jsPDF DejaVuSans font
(function (jsPDFAPI) {
  var font = 'AAEAAAASAQAABAAgR0RFRrRCsIIAAjWsAAACYkdQT1OxkQAA...'; // (base64 font data burada olacak)
  jsPDFAPI.addFileToVFS('DejaVuSans.ttf', font);
  jsPDFAPI.addFont('DejaVuSans.ttf', 'DejaVu', 'normal');
})(jsPDF.API); 