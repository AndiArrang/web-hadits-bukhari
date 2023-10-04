export const modelVSM = async (data, query) => {
    const numDocs = data.length; // jumlah total dokumen(N)
    console.log(numDocs)
    // menghitung jumlah kemunculan term pada seluruh dokumen(dfi) & membuat dictionary
    const termCount = {};

    const dictionary = new Set();
    /// jika hanya menggunakan query sebagai dictionary
    // const vocabulary = query.hasilExpanded.split(' ')
    // vocabulary.forEach((term) => {
    //   dictionary.add(term); 
    // })
    // console.log(dictionary)

    //----------------------------------------------
    data.forEach((item) => {
        const word = item.PreprocessingText.split(' ');
        word.map((term) => {
          dictionary.add(term); 
          termCount[term] = (termCount[term] || 0) + 1;
        });
      });
    // Fungsi untuk menghitung TF-IDF pada satu dokumen
    const calculateTfIdf = (doc) => {
      const terms = doc.PreprocessingText.split(' '); // memecah teks menjadi array kata-kata
      const tf = {}; // menyimpan nilai TF untuk setiap term pada dokumen ini
      for (const term of terms) {
        tf[term] = (tf[term] || 0) + 1;
      }
  
      const tfIdf = {}; // menyimpan hasil perhitungan TF-IDF untuk setiap term
      const vektor = [];
      for (const term of Object.keys(tf)) {
        const idf = Math.log(numDocs / (termCount[term] || 1)); // menghitung nilai IDF untuk term ini
        tfIdf[term] = tf[term] * idf; // menghitung nilai TF-IDF untuk term ini pada dokumen ini
      }
  
      dictionary.forEach((term) => {
        vektor.push(tfIdf[term] || 0);
      });
  
      return vektor;
    };
     
    // Fungsi untuk menghitung TF-IDF dari query
    const queryTfIdf = () => {
        return new Promise((resolve, reject) => {
          const tf = {}; // menyimpan nilai TF untuk setiap term pada dokumen ini
          const processedTokens = query.hasilExpanded.split(' ');
          const expandedQuery = query.expandedQuery.split(' ');
          // console.log(dictionary, processedTokens)

          dictionary.forEach((term) => {
            tf[term] = 0;
            processedTokens.forEach((item) => {
              if (item === term) {
                tf[term]++;
              }
            });
          });
      
          const vektor = [];
          for (const term of Object.keys(tf)) {
            const idf = Math.log(numDocs / (termCount[term] || 1)); // menghitung nilai IDF untuk term ini
            if (expandedQuery.includes(term) ) {
              vektor.push(tf[term] * idf * 30 / 100)
            }else {
              vektor.push(tf[term] * idf); // menghitung nilai TF-IDF untuk term ini pada dokumen ini
            }
          }
      
          resolve(vektor); // Mengembalikan vektor sebagai hasil dari promise
        });
      };
      
  
    const search = async () => {
      const queryVector = await queryTfIdf();

        const calculateTfIdfParallel = async () => {
            console.time('waktuhitung');
            const tfidfPromises = data.map(async (doc, i) => {
            const similarity = await cosineSimilarity(queryVector, calculateTfIdf(doc));
            const dataSimilarity = { No: data[i].No, Arab: data[i].Arab, Terjemah: data[i].Terjemah, Kitab: data[i].Kitab, similarity };
            return dataSimilarity;
            });
        
            const similarities = await Promise.all(tfidfPromises);
            console.timeEnd('waktuhitung');
            return similarities;
        };
        
        const result = await calculateTfIdfParallel();
    
        return result.sort((a, b) => b.similarity - a.similarity);
    };
  
    // Fungsi untuk menghitung cosine similarity
    // function cosineSimilarity(vectorA, vectorB) {
    //   const dotProduct = vectorA.reduce((acc, curr, i) => {
    //     return acc + curr * vectorB[i];
    //   }, 0);

    //   const magnitudeA = Math.sqrt(
    //     vectorA.reduce((acc, curr) => {
    //       return acc + curr * curr;
    //     }, 0)
    //   );
  
    //   const magnitudeB = Math.sqrt(
    //     vectorB.reduce((acc, curr) => {
    //       return acc + curr * curr;
    //     }, 0)
    //   );
  
    //   return dotProduct / (magnitudeA * magnitudeB);
    // }
  
    async function cosineSimilarity(vectorA, vectorB) {
      const dotProductPromise = new Promise((resolve) => {
        const dotProduct = vectorA.reduce((acc, curr, i) => {
              return acc + curr * vectorB[i];
            }, 0);
        resolve(dotProduct);
      });
    
      const magnitudeAPromise = new Promise((resolve) => {
        const magnitudeA = Math.sqrt(vectorA.reduce((acc, curr) => acc + curr * curr, 0));
        resolve(magnitudeA);
      });
    
      const magnitudeBPromise = new Promise((resolve) => {
        const magnitudeB = Math.sqrt(vectorB.reduce((acc, curr) => acc + curr * curr, 0));
        resolve(magnitudeB);
      });
    
      const [dotProduct, magnitudeA, magnitudeB] = await Promise.all([dotProductPromise, magnitudeAPromise, magnitudeBPromise]);
    
      return dotProduct / (magnitudeA * magnitudeB);
    }
    
    return search();
  };
  