import { doc, serverTimestamp, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../lib/firebase.config";

const Firestore = {

// docs cloud firestore - read data - get a document or real time using getDoc method
readDocs: (...args) => {
  const [collection_name] = args
  let docs = []
  
  const ref = collection(db, collection_name)
  return new Promise(async resolve => {
    try {
      const snapshots = await getDocs(ref)
      snapshots.forEach(doc => {
        const d = {...doc.data(), id: doc.id}
        docs.push(d)
      })
      resolve(docs)
    } catch(e) {
      console.error(e)
    }
  })
  
},
  // docs Cloud FireStore - Add and manage data - add data to firestore using writedoc with setDoc method
  writeDoc: (...args) => {
    // eslint-disable-next-line
    const [input, collection_name] = args;
    return new Promise(async (resolve) => {
      const randomIndex = Math.floor(Math.random() * 1000000000);
      try {
        const docRef = doc(db, collection_name, `${randomIndex}`);
        // servertimestamp from firebase and it allows to auto set up time and date
        await setDoc(docRef, {
          title: input.title,
          path: input.path,
          createdAt: serverTimestamp(),
          user: input.user
        });
        resolve(`new doc sucessfully  inserted`);
      } catch (e) {
        console.error(e)
      }
    });
  },
};

export default Firestore;
