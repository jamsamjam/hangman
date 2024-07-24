document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                cropImage(img);
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

function cropImage(img) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const cropWidth = 500; // Desired crop width
    const cropHeight = 500; // Desired crop height
    
    // Set canvas size to the crop dimensions
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    
    // Calculate crop coordinates (for left-top corner)
    const cropX = 0;
    const cropY = 20;
    
    // Draw the cropped image onto the canvas
    ctx.drawImage(
        img,
        cropX, cropY, cropWidth, cropHeight, // Source (image) rectangle
        0, 0, cropWidth, cropHeight // Destination (canvas) rectangle
    );
}
