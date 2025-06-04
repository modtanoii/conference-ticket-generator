const form = document.getElementById('ticket-form');

const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const uploadedImage = document.getElementById('uploaded-image');
const messageAction = document.getElementById('message-action');
const fileAction = document.getElementById('file-action');
const removeImage = document.getElementById('remove-image');
const changeImage = document.getElementById('change-image');
const uploadHint = document.getElementById('upload-hint');

const textInputs = document.querySelectorAll('.required');

const formData = {
    image:'',
    name: '',
    email: '',
    githubUsername: ''
}

function validateTextInputs() {
    let isValid = true;
    
    textInputs.forEach(input => {
        const hint = input.nextElementSibling

        if (input.value.trim() === '') {
            input.classList.add('error');
            hint.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
            hint.classList.remove('error');
        }
    })

    return isValid;
}

function validateFile(input, hint) {
    const file = input.files[0];
    let isValid = true;

    if (!file) {
        hint.classList.add('error');
    }
}

dropArea.addEventListener('click', () => {
    fileInput.click();
})

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    return
})

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files
        validateFile(fileInput, uploadHint)
    }
})

fileInput.addEventListener('change', (e) => {
    validateFile(fileInput, uploadHint)
})

removeImage.addEventListener('click', () => {
    e.preventDefault();
    e.stopPropagation();
    resetUpload();
})

changeImage.addEventListener('click', () => {
    e.preventDefault();
    e.stopPropagation();
    fileInput.click();
})

form.addEventListener('submit', e => {
    e.preventDefault();
    
    const isTextValid = validateTextInputs();
    const isFileValid = validateFile(fileInput, uploadHint);

    if (isTextValid && isFileValid) {
        storeAndDisplayFormdata();

        document.getElementById('form-container').classList.add('hide');
        document.getElementById('diaplay-data').style.display = 'block';
    }

})