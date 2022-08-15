import { doc } from '@firebase/firestore';
import { ref } from '@firebase/storage';
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';

export const handleFileUpload = async (data: File | any) => {
  try {
    const imagesRef = ref(storage, `users/${data[0].name}`);
    const metadata = {
      contentType: `${data[0].type}`,
    };
    await uploadBytes(imagesRef, data[0], metadata);
    const imageUrl = await getDownloadURL(imagesRef);
    return imageUrl;
  } catch (error) {
    throw error as string;
  }
};

export const handleDocsUpload = async (data: File | any) => {
  try {
    const imagesRef = ref(storage, `identities/${data[0].name}`);
    const metadata = {
      contentType: `${data[0].type}`,
    };
    await uploadBytes(imagesRef, data[0], metadata);
    const imageUrl = await getDownloadURL(imagesRef);
    return imageUrl;
  } catch (error) {
    throw error as string;
  }
};
