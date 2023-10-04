import stopword from 'stopword';
import { Tokenizer, Stemmer } from 'sastrawijs';
import fs from 'fs/promises';

export const preprocessText  = async (text) => {

   const jsonData = await fs.readFile('data/stopword.json', 'utf8');
   const data = JSON.parse(jsonData);
    const tokenizer = new Tokenizer();
    const stemmer = new Stemmer();

    const regex = /(\w+)'/g;

    // Gantikan tanda petik tunggal dengan tanda petik kosong (sambungkan kata)
    const teksHasil = text.replace(regex, "$1");
    // Tokenisasi teks
    const tokens = tokenizer.tokenize(teksHasil);

    // Menghapus stopword
    const filteredTokens = stopword.removeStopwords(tokens, data);

    // Stemming
    const stemmedTokens = filteredTokens.map(token => stemmer.stem(token));

    // Menggabungkan kata-kata yang telah diproses menjadi satu string
    const processedText = stemmedTokens.join(' ');

    return processedText ;  
}