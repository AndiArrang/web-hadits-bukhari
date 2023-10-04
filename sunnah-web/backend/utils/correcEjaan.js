import fs from 'fs/promises';

export const correctEjaan = async (query) => {
  try {
    const jsonData = await fs.readFile('data/dataFixEjaan.json', 'utf8');
    const data = JSON.parse(jsonData);

        // Pisahkan kata-kata dalam query
        const kataKunci = query.split(" ");
        const hasilIndex = [];
      
        // Loop melalui kata-kata dalam query
        kataKunci.forEach(kata => {
            let founded = false;
          // Cek setiap grup sinonim
          for (const grupDataEjaan of data) {
            if (grupDataEjaan.includes(kata)) {
              // Jika kata ada dalam grup sinonim, tambahm,kan semua kata dalam grup tersebut
              founded = true;
              hasilIndex.push(grupDataEjaan[0]);
              break;
            }  
          }
    
          if (founded === false) {
            hasilIndex.push(kata)
          }
    
        });
      
        // Gabungkan hasil expansion menjadi satu string dan hapus duplikat
        const hasilAkhir = hasilIndex.join(" ");
      
        return hasilAkhir;
      
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
