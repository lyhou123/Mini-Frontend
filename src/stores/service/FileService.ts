export const upLoadFile = async (file: File): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/files`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload file');
        }

        const result = await response.json(); 

        return result.data.fullUrl;  // ✅ Correct return type (string inside Promise)

    } catch (error) {
        console.error('Failed to upload file:', error);
        throw error; // Ensure error is propagated correctly
    }
};
