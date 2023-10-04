import fs from 'fs/promises';

export const expandQuery = async (query) => {
  try {
    const jsonData = await fs.readFile('data/sinonim.json', 'utf8');
    const sinonim = JSON.parse(jsonData);

    const kataKunci = query.split(" ");
    const hasilExpansion = [];

    kataKunci.forEach(kata => {
      const foundGrup = sinonim.sinonim.find(grupSinonim => grupSinonim.includes(kata));
      if (foundGrup) {
        hasilExpansion.push(...foundGrup);
      } else {
        hasilExpansion.push(kata);
      }
    });

    const expandedQuery = hasilExpansion.filter(kata => !kataKunci.includes(kata)).join(' ')
    const hasilExpanded = hasilExpansion.join(' ');
    const hasilAkhir = {
      expandedQuery,
      hasilExpanded
    }
    return hasilAkhir;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
