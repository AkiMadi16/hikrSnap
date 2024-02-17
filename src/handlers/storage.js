import {  ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from '../lib/firebase.config'

const Storage = {
  uploadFile: (media) => {
    return new Promise(async resolve => {
      try {
        // initial state we pass data file and title 
        const mediaRef = ref(storage, `images${media.title}` )
        uploadBytes(mediaRef, media.file).then(snapshot => {
          resolve({ path: snapshot.metadata.fullPath, name: media.title})
        })
      } catch(e){
        console.error(e)
      }

    })
  }, 
  downloadFile: (media) => {
    return new Promise(async resolve => {
      try {
        const mediaRef = ref(storage, media.path)
        const fileURL = await getDownloadURL(mediaRef)
        resolve(fileURL)
      } catch(e) {
        console.error(e)
      }
    })
  },
  deleteFile: (path) => {
    return new Promise(async (resolve, reject) => {
      try {
        const fileRef = ref(storage, path);
        await deleteObject(fileRef);
        resolve();
      } catch (error) {
        console.error('Error deleting file:', error);
        reject(error);
      }
    });
  }
}

export default Storage;