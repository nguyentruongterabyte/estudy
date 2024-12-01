const base64ToFile = (base64Data, filename) => {
  const byteCharacters = atob(base64Data.split(',')[1]); // Bỏ qua phần đầu 'data:image/png;base64,'
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset++) {
    const byteArray = byteCharacters.charCodeAt(offset);
    byteArrays.push(byteArray);
  }

  const byteArray = new Uint8Array(byteArrays);
  return new File([byteArray], filename, { type: 'image/png' }); 
};

export default {
  base64ToFile,
};
