const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const fs = require('fs');
const readline = require('readline');

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDPbKs7q1r1E16yvadqBeCxiCEZD6W57pk",
  authDomain: "matricula-53825.firebaseapp.com",
  projectId: "matricula-53825",
  storageBucket: "matricula-53825.firebasestorage.app",
  messagingSenderId: "541576192031",
  appId: "1:541576192031:web:e706c92380097a9d4f352a",
  measurementId: "G-L4RZ0XJTX6"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Crear interfaz de lectura
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para hacer el backup de una colección
async function backupFirestoreData(collectionName, fileName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = [];

    querySnapshot.forEach(doc => {
      data.push({ id: doc.id, data: doc.data() });
    });

    // Guarda los datos en un archivo JSON
    fs.writeFileSync(fileName+'-backup.json', JSON.stringify(data, null, 2));
    console.log(`Backup de la colección "${collectionName}" completado! Los datos se guardaron en el archivo "${fileName+'-backup.json'}".`);
  } catch (error) {
    console.error('Error al hacer el backup:', error);
  }
}

// Solicitar al usuario el nombre de la colección y el nombre del archivo
rl.question('Ingresa el nombre de la colección de Firestore: ', (collectionName) => {
  rl.question('Ingresa el nombre del archivo para guardar el backup (por ejemplo, backup): ', (fileName) => {
    backupFirestoreData(collectionName, fileName);
    rl.close();
  });
});
