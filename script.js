document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const btnNext = document.getElementById('btnNext');
    const btnBack = document.getElementById('btnBack');
    const form = document.getElementById('leadForm');
    const successState = document.getElementById('successState');
    const npsOptionsContainer = document.querySelector('.nps-options');
    const npsInput = document.getElementById('nps');
    const npsReasonGroup = document.getElementById('npsReasonGroup');
    const whatsappInput = document.getElementById('whatsapp');
    const progressBarFill = document.querySelector('.progress-fill');

    // CONFIGURATION
    // TODO: Replace with your deployed Web App URL
    const GOOGLE_SCRIPT_URL = 'YOUR_WEB_APP_URL_HEREhttps://script.google.com/macros/s/AKfycbyiEZC_GDQqkxzx48orig2Ib-vr-ue3OmXJPLVwkC_57S3L92AApZ4NVu-oy86VcSxy/exec';

    // --- Initialization ---
    generateNPSButtons();

    // --- Event Listeners ---
    btnNext.addEventListener('click', handleNextStep);
    btnBack.addEventListener('click', handleBackStep);
    form.addEventListener('submit', handleSubmit);
    whatsappInput.addEventListener('input', handlePhoneMask);

    // --- Functions ---

    function generateNPSButtons() {
        for (let i = 0; i <= 10; i++) {
            const btn = document.createElement('div');
            btn.classList.add('nps-btn');
            btn.textContent = i;
            btn.dataset.value = i;
            btn.addEventListener('click', () => selectNPS(i, btn));
            npsOptionsContainer.appendChild(btn);
        }
    }

    function selectNPS(value, btnElement) {
        // Update hidden input
        npsInput.value = value;

        // Visual feedback
        document.querySelectorAll('.nps-btn').forEach(b => b.classList.remove('selected'));
        btnElement.classList.add('selected');

        // Show reason field
        npsReasonGroup.classList.remove('hidden');

        // Focus on reason field for better UX
        setTimeout(() => {
            document.getElementById('npsReason').focus();
        }, 100);
    }

    function handlePhoneMask(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        }
        if (value.length > 10) {
            value = `${value.slice(0, 10)}-${value.slice(10)}`;
        }

        e.target.value = value;
    }

    function validateStep1() {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const whatsapp = document.getElementById('whatsapp');
        const lgpd = document.getElementById('lgpd');

        let isValid = true;

        if (!name.value.trim()) {
            shakeInput(name);
            isValid = false;
        }
        if (!email.value.trim() || !email.value.includes('@')) {
            shakeInput(email);
            isValid = false;
        }
        if (!whatsapp.value.trim() || whatsapp.value.length < 14) { // (XX) XXXXX-XXXX is 15 chars, min 14 for landline
            shakeInput(whatsapp);
            isValid = false;
        }
        if (!npsInput.value) {
            // Shake container
            const npsGroup = document.querySelector('.nps-group');
            npsGroup.classList.add('shake');
            setTimeout(() => npsGroup.classList.remove('shake'), 500);
            isValid = false;
        }
        if (!lgpd.checked) {
            const checkboxGroup = document.querySelector('.checkbox-group');
            checkboxGroup.classList.add('shake');
            setTimeout(() => checkboxGroup.classList.remove('shake'), 500);
            isValid = false;
        }

        return isValid;
    }

    function handleNextStep() {
        if (validateStep1()) {
            step1.classList.remove('active');
            step2.classList.add('active');

            // Animate progress bar
            setTimeout(() => {
                progressBarFill.style.width = '50%';
            }, 100);
        }
    }

    function handleBackStep() {
        step2.classList.remove('active');
        step1.classList.add('active');
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Basic validation for Step 2
        const role = document.getElementById('role');
        const challenges = document.getElementById('challenges');
        const question = document.getElementById('question');

        let isValid = true;

        if (!role.value) {
            shakeInput(role);
            isValid = false;
        }
        if (!challenges.value.trim()) {
            shakeInput(challenges);
            isValid = false;
        }
        if (!question.value.trim()) {
            shakeInput(question);
            isValid = false;
        }

        if (isValid) {
            const btnSubmit = document.querySelector('.btn-submit');
            const originalText = btnSubmit.textContent;
            btnSubmit.textContent = 'Enviando...';
            btnSubmit.disabled = true;

            // Prepare data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                whatsapp: document.getElementById('whatsapp').value,
                nps: npsInput.value,
                npsReason: document.getElementById('npsReason').value,
                lgpd: document.getElementById('lgpd').checked,
                role: role.value,
                challenges: challenges.value,
                question: question.value
            };

            // Send to Google Sheets
            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Important for Google Apps Script
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(() => {
                    // Success
                    progressBarFill.style.width = '100%';
                    document.querySelector('.progress-label').textContent = 'Concluído! 100%';

                    setTimeout(() => {
                        form.style.display = 'none';
                        document.querySelector('.form-header').style.display = 'none';
                        successState.classList.remove('hidden');
                    }, 1500);
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Houve um erro ao salvar seus dados. Por favor, tente novamente.');
                    btnSubmit.textContent = originalText;
                    btnSubmit.disabled = false;
                });
        }
    }

    function shakeInput(input) {
        input.classList.add('shake');
        input.style.borderColor = 'var(--error-color)';
        setTimeout(() => {
            input.classList.remove('shake');
            input.style.borderColor = ''; // Reset to default
        }, 500);
    }
});

// Add shake animation style dynamically if not in CSS
const style = document.createElement('style');
style.innerHTML = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    .shake {
        animation: shake 0.3s ease-in-out;
    }
`;
document.head.appendChild(style);
