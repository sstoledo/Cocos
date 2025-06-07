import { UploadOptionsDto } from "@interfaces/cloudinary";

interface UploadResponse {
  message: string;
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  size: number;
}

interface DeleteResponse {
  message: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const uploadImage = async (token: string, formData: FormData) => {
  try {
    const response = await fetch('http://localhost:4000/api/cloudinary/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}` // Asegúrate de que el token tenga este formato
      },
      body: formData,
      // No incluyas 'Content-Type' aquí, el navegador lo establecerá automáticamente
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Upload error:', errorData);
      throw new Error(errorData.message || 'Error uploading image');
    }

    return await response.json();
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const updateImage = async (
  token: string,
  publicId: string,
  file: File,
  options?: UploadOptionsDto
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
  }

  const res = await fetch(`${BASE_URL}/api/cloudinary/update/${publicId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Error al actualizar la imagen");
  }

  return res.json();
};

export const deleteImage = async (
  token: string,
  publicId: string
): Promise<DeleteResponse> => {
  const res = await fetch(`${BASE_URL}/api/cloudinary/delete/${publicId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error al eliminar la imagen");
  }

  return res.json();
};