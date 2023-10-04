
import { modelVSM } from "../utils/modelVSM.js";
import { expandQuery } from "../utils/expandQuery.js";
import { preprocessText } from "../utils/preprocessingQuery.js";
import { correctEjaan } from "../utils/correcEjaan.js";
import connection from "../config/database.js";


// fungsi untuk request data berdasarkan query pencarian (Sistem Pencarian Menggunakan VSM)
export const getHaditsBySearch = async (req,res) => {

    const processedText = await preprocessText(req.body.query)
    const correctedEjaan = await correctEjaan(processedText)
    const query = await expandQuery(correctedEjaan);

    // fungsi untuk membuat sebuah query sql yang hanya mengambil data yg didalamnya terkandung query
    const searchKeywords = query.hasilExpanded.split(' ') // Array kata kunci pencarian dari pengguna
    let querySQL = "SELECT * FROM bukhari WHERE";
    
    // Membangun kondisi pencarian dinamis berdasarkan kata kunci yang dimasukkan
    searchKeywords.forEach((keyword, index) => {
      querySQL += ` Label LIKE '%${keyword}%'`;
    
      // Menambahkan operator OR jika bukan kata kunci terakhir
      if (index !== searchKeywords.length - 1) {
        querySQL += " OR";
      }
    });
    
        
    // Data yang akan diperbarui
    connection.query(querySQL, async (error, data) => {
        if (error) {
          console.log(error);
        }
        console.log(data.length)
        // Function untuk memasukkan data ke fungsi untuk menghitung VSM nya
        const result = await modelVSM(data, query);
      
        if (data != null) {
          res.status(200).json({
            data: result
          });      
        } else {
          res.status(404).json({ msg: "data tidak ditemukan" });
        }
      
      });
}

//  fungsi untuk request hadits berdasarkan kitab
export const getHaditsByKitab = async (req,res) => {
  const params = req.params.nama_kitab;
  const kitab =  params.replace(/'/g, "''");
  const querySQL = `SELECT * FROM bukhari WHERE Kitab = '${kitab}'`
  connection.query(querySQL, async (error, result) => {
    if (error) {
      console.log(error);
    }
    // console.log(result)
    if (result != null) {
      res.status(200).json({
        data: result
      });      
    } else {
      res.status(404).json({ msg: "data tidak ditemukan" });
    }
  
  }); 
}

// fungsi menngambil hadits berdasarkan id

export const getHaditsByNumber = async (req,res) => {
  const number = req.params.number
  console.log(number)
  const querySQL = `SELECT * FROM bukhari WHERE No = ${number} `
  connection.query(querySQL, async (error, result) => {
    if (error) {
      console.log(error);
    }
    console.log(result)
    if (result != null) {
      res.status(200).json({
        data: result
      });      
    } else {
      res.status(404).json({ msg: "data tidak ditemukan" });
    }
  
  });
}

// fungsi untuk mengambil nama nama kitab dan jumlah haditsnya
export const getAllKitabName = async (req,res) => {
  const querySQL = `SELECT * FROM Kitab`
  connection.query(querySQL, async (error, result) => {
    if (error) {
      console.log(error);
    }
    if (result != null) {
      res.status(200).json({
        data: result
      });      
    } else {
      res.status(404).json({ msg: "data tidak ditemukan" });
    }
  
  });
   
}