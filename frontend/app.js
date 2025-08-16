// AI Health Insurance Verification System JavaScript

// Application Data
const appData = {
  recentVerifications: [
    {"patient": "John Smith", "insurance": "Blue Cross Blue Shield", "status": "Verified", "riskScore": 85, "time": "2 min ago"},
    {"patient": "Maria Garcia", "insurance": "Aetna", "status": "Needs Auth", "riskScore": 25, "time": "5 min ago"},
    {"patient": "David Wilson", "insurance": "United Healthcare", "status": "Verified", "riskScore": 92, "time": "8 min ago"},
    {"patient": "Sarah Johnson", "insurance": "Cigna", "status": "Pending", "riskScore": 67, "time": "12 min ago"}
  ],
  todayStats: {
    verifications: 127,
    successRate: 94,
    avgResponseTime: "2.3s",
    highRiskAlerts: 12
  },
  dashboardStats: {
    avgProcessingTime: "1.8s",
    preventedDenials: "$47K",
    verifications: 127,
    successRate: "94%",
    responseTime: "2.3s",
    alerts: 12
  },
  riskPatterns: [
    {"provider": "Anthem", "risk": "Missing Prior Auth", "frequency": "23 cases", "avgScore": "15%"},
    {"provider": "Cigna", "risk": "Out-of-Network", "frequency": "18 cases", "avgScore": "35%"},
    {"provider": "United Healthcare", "risk": "Expired Coverage", "frequency": "12 cases", "avgScore": "78%"}
  ],
  aiPerformance: {
    ocrAccuracy: 96.8,
    insuranceCards: 98.2,
    idCards: 95.4,
    handwrittenNotes: 89.1,
    precision: 87.3,
    recall: 82.1,
    aucScore: 0.84
  },
  batchFiles: [
    {"fileName": "insurance_card_001.jpg", "patient": "John Smith", "status": "Complete", "progress": 100, "result": "Verified"},
    {"fileName": "insurance_card_002.jpg", "patient": "Maria Garcia", "status": "Processing", "progress": 75, "result": "OCR"},
    {"fileName": "insurance_card_003.jpg", "patient": "David Wilson", "status": "Error", "progress": 0, "result": "Unreadable"},
    {"fileName": "insurance_card_004.jpg", "patient": "Sarah Johnson", "status": "Queued", "progress": 0, "result": "Waiting"}
  ],
  chatMessages: [
    {"type": "bot", "message": "Hi! I'm your AI verification assistant. I can help you with complex insurance cases, explain denial reasons, or guide you through prior authorization requirements. What can I help you with today?"},
    {"type": "user", "message": "I have a patient with United Healthcare, but their card shows they're in a different state. How do I verify if they're still covered here?"},
    {"type": "bot", "message": "Great question! For out-of-state United Healthcare coverage, here's what I recommend:<br><br>1. Check the plan type - PPO plans typically offer nationwide coverage, while HMO plans are often state-specific<br>2. Verify the network - I can run a real-time eligibility check to see if your facility is in-network<br>3. Review benefits - Out-of-state coverage may have different copays or deductibles<br><br>Would you like me to run the verification now? I'll need the member ID and group number."}
  ]
};

// Global variables
let currentProcessingProgress = 0;
let processingInterval = null;

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupTabNavigation();
    populateDashboardData();
    populateRecentVerifications();
    populateRiskPatternsTable();
    populateBatchFilesTable();
    setupFileUpload();
    setupChatInterface();
    setupFormHandlers();
    initializeChatMessages();
}

// Tab Navigation
function setupTabNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    // Update navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
}

// Dashboard Data Population
function populateDashboardData() {
    // Update stats cards
    document.getElementById('verifications-today').textContent = appData.todayStats.verifications;
    document.getElementById('success-rate').textContent = appData.todayStats.successRate + '%';
    document.getElementById('avg-response').textContent = appData.todayStats.avgResponseTime;
    document.getElementById('high-risk-alerts').textContent = appData.todayStats.highRiskAlerts;
}

function populateRecentVerifications() {
    const tableBody = document.querySelector('#recent-verifications tbody');
    tableBody.innerHTML = '';

    appData.recentVerifications.forEach(verification => {
        const row = document.createElement('tr');
        row.style.cursor = 'pointer';
        row.addEventListener('click', () => showVerificationResults(verification));

        row.innerHTML = `
            <td><strong>${verification.patient}</strong></td>
            <td>${verification.insurance}</td>
            <td><span class="status ${getStatusClass(verification.status)}">${verification.status}</span></td>
            <td>
                <div class="risk-score-container">
                    <div class="risk-meter">
                        <div class="risk-fill ${getRiskClass(verification.riskScore)}" style="width: ${verification.riskScore}%"></div>
                    </div>
                    <span class="risk-value">${verification.riskScore}%</span>
                </div>
            </td>
            <td>${verification.time}</td>
        `;

        tableBody.appendChild(row);
    });
}

function populateRiskPatternsTable() {
    const tableBody = document.querySelector('#risk-patterns-table tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';

    appData.riskPatterns.forEach(pattern => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${pattern.provider}</strong></td>
            <td>${pattern.risk}</td>
            <td>${pattern.frequency}</td>
            <td><span class="status ${getStatusClassFromScore(pattern.avgScore)}">${pattern.avgScore}</span></td>
        `;
        tableBody.appendChild(row);
    });
}

function populateBatchFilesTable() {
    const tableBody = document.querySelector('#batch-files-table tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';

    appData.batchFiles.forEach(file => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${file.fileName}</strong></td>
            <td>${file.patient}</td>
            <td><span class="status ${getStatusClass(file.status)}">${file.status}</span></td>
            <td>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${file.progress}%"></div>
                </div>
                <small>${file.progress}%</small>
            </td>
            <td>${file.result}</td>
            <td>
                <button class="btn btn--sm btn--outline">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Helper functions for status classes
function getStatusClass(status) {
    switch(status.toLowerCase()) {
        case 'verified': case 'complete': return 'status--success';
        case 'needs auth': case 'processing': return 'status--warning';
        case 'pending': case 'queued': return 'status--info';
        case 'error': return 'status--error';
        default: return 'status--info';
    }
}

function getStatusClassFromScore(score) {
    const numScore = parseInt(score);
    if (numScore < 30) return 'status--success';
    if (numScore < 60) return 'status--warning';
    return 'status--error';
}

function getRiskClass(score) {
    if (score < 40) return 'risk-fill--low';
    if (score < 70) return 'risk-fill--medium';
    return 'risk-fill--high';
}

// File Upload Functionality
function setupFileUpload() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const processingStatus = document.getElementById('processing-status');

    if (!uploadArea || !fileInput) return;

    // Click to upload
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleFileUpload(files);
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        handleFileUpload(e.target.files);
    });

    // Camera button
    const cameraBtn = document.getElementById('camera-btn');
    if (cameraBtn) {
        cameraBtn.addEventListener('click', () => {
            alert('Camera functionality would be implemented here');
        });
    }
}

function handleFileUpload(files) {
    if (files.length === 0) return;

    const processingStatus = document.getElementById('processing-status');
    const progressBar = document.getElementById('processing-progress');

    if (!processingStatus || !progressBar) return;

    // Show processing status
    processingStatus.classList.remove('hidden');
    
    // Simulate AI processing
    currentProcessingProgress = 0;
    progressBar.style.width = '0%';

    processingInterval = setInterval(() => {
        currentProcessingProgress += Math.random() * 15;
        if (currentProcessingProgress >= 100) {
            currentProcessingProgress = 100;
            clearInterval(processingInterval);
            
            // Complete processing and populate form
            setTimeout(() => {
                processingStatus.classList.add('hidden');
                populateExtractedData();
            }, 500);
        }
        progressBar.style.width = currentProcessingProgress + '%';
    }, 300);
}

function populateExtractedData() {
    // Simulate extracted data from AI processing
    const sampleData = {
        patientName: 'John Smith',
        policyNumber: 'BC12345678',
        insuranceCompany: 'blue-cross',
        groupNumber: 'GRP001',
        memberId: 'MEM123456',
        dateOfBirth: '1985-06-15'
    };

    document.getElementById('patient-name').value = sampleData.patientName;
    document.getElementById('policy-number').value = sampleData.policyNumber;
    document.getElementById('insurance-company').value = sampleData.insuranceCompany;
    document.getElementById('group-number').value = sampleData.groupNumber;
    document.getElementById('member-id').value = sampleData.memberId;
    document.getElementById('date-of-birth').value = sampleData.dateOfBirth;
}

// Form Handlers
function setupFormHandlers() {
    const editBtn = document.getElementById('edit-info');
    const verifyBtn = document.getElementById('verify-coverage');

    if (editBtn) {
        editBtn.addEventListener('click', () => {
            const formControls = document.querySelectorAll('#verification-form .form-control');
            formControls.forEach(control => {
                control.removeAttribute('readonly');
                control.classList.add('editable');
            });
            editBtn.textContent = 'Save Changes';
        });
    }

    if (verifyBtn) {
        verifyBtn.addEventListener('click', () => {
            // Simulate verification process
            verifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
            verifyBtn.disabled = true;

            setTimeout(() => {
                verifyBtn.innerHTML = '<i class="fas fa-shield-alt"></i> Verify Coverage';
                verifyBtn.disabled = false;
                
                // Show results modal
                showVerificationResults({
                    patient: document.getElementById('patient-name').value,
                    insurance: document.getElementById('insurance-company').selectedOptions[0]?.text || 'Blue Cross Blue Shield',
                    riskScore: 85,
                    policy: document.getElementById('policy-number').value
                });
            }, 2000);
        });
    }
}

// Chat Interface
function setupChatInterface() {
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');

    if (!chatInput || !sendBtn) return;

    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        addChatMessage('user', message);
        chatInput.value = '';

        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "I understand your question. Let me help you with that verification process.",
                "Based on the information provided, here are the recommended next steps for this case.",
                "That's a great question about insurance verification. Here's what I suggest...",
                "I can help you navigate this complex insurance case. Let me break it down for you."
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addChatMessage('bot', randomResponse);
        }, 1000);
    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function initializeChatMessages() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    chatMessages.innerHTML = '';
    
    appData.chatMessages.forEach(msg => {
        addChatMessage(msg.type, msg.message);
    });
}

function addChatMessage(type, message) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message chat-message--${type}`;
    messageDiv.innerHTML = message;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function askQuestion(question) {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.value = question;
        document.getElementById('chat-send').click();
    }
}

// Modal Functionality
function showVerificationResults(verification) {
    const modal = document.getElementById('results-modal');
    if (!modal) return;

    // Populate modal data
    document.getElementById('modal-patient-name').textContent = verification.patient;
    document.getElementById('modal-insurance').textContent = verification.insurance;
    document.getElementById('modal-policy').textContent = verification.policy || 'BC12345678';
    document.getElementById('modal-risk-score').textContent = verification.riskScore + '%';

    // Update risk meter
    const riskMeter = modal.querySelector('.risk-fill');
    if (riskMeter) {
        riskMeter.style.width = verification.riskScore + '%';
        riskMeter.className = `risk-fill ${getRiskClass(verification.riskScore)}`;
    }

    modal.classList.remove('hidden');

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('results-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Utility Functions
function animateValue(element, start, end, duration) {
    if (!element) return;
    
    const startTimestamp = performance.now();
    const step = (timestamp) => {
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    
    requestAnimationFrame(step);
}

function updateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Enhanced interaction features
function initializeEnhancements() {
    // Animate stats on dashboard load
    const statsElements = {
        'verifications-today': 127,
        'success-rate': 94,
        'high-risk-alerts': 12
    };

    Object.entries(statsElements).forEach(([id, endValue]) => {
        const element = document.getElementById(id);
        if (element) {
            animateValue(element, 0, endValue, 1500);
        }
    });

    // Initialize progress bar animations
    setTimeout(updateProgressBars, 500);
}

// Additional event listeners for enhanced interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for long content
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add hover effects for interactive elements
    document.querySelectorAll('.data-table tr').forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--color-bg-1)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });

    // Initialize enhancements after a short delay
    setTimeout(initializeEnhancements, 200);
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + N for new verification
    if (e.altKey && e.key === 'n') {
        e.preventDefault();
        switchTab('new-verification');
    }
    
    // Alt + D for dashboard
    if (e.altKey && e.key === 'd') {
        e.preventDefault();
        switchTab('dashboard');
    }
    
    // Alt + B for batch processing
    if (e.altKey && e.key === 'b') {
        e.preventDefault();
        switchTab('batch-processing');
    }
    
    // Alt + A for AI assistant
    if (e.altKey && e.key === 'a') {
        e.preventDefault();
        switchTab('ai-assistant');
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Export functions for global access
window.switchTab = switchTab;
window.closeModal = closeModal;
window.askQuestion = askQuestion;