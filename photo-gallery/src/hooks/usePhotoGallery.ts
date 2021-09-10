import { useState, useEffect } from "react";
import { isPlatform } from "@ionic/react";

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Storage } from "@capacitor/storage";
import { Capacitor } from "@capacitor/core";

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  const takePhoto = async () => {
    const fileName = new Date().getTime() + ".jpeg";

    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const newPhotos = [
      {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath,
      },
      ...photos,
    ];
    setPhotos(newPhotos);
  };

  return {
    photos,
    takePhoto,
  };
}
export async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("method did not return a string");
      }
    };
    reader.readAsDataURL(blob);
  });
}
export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
