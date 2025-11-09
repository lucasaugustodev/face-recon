/**
 * FACEIO Test System
 * Sistema de testes para API de reconhecimento facial
 */

// Configuração
const FACEIO_APP_ID = '1d87cc03661633a87289b4180e439eb0';
let faceio;

// Elementos do DOM
const elements = {
    enrollBtn: null,
    authenticateBtn: null,
    enrollResult: null,
    authResult: null,
    userData: null,
    logs: null,
    status: null,
    userEmail: null,
    userName: null,
    clearLogsBtn: null
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    initializeFaceIO();
    attachEventListeners();
    addLog('Sistema inicializado', 'info');
});

/**
 * Inicializa referências aos elementos do DOM
 */
function initializeElements() {
    elements.enrollBtn = document.getElementById('enrollBtn');
    elements.authenticateBtn = document.getElementById('authenticateBtn');
    elements.enrollResult = document.getElementById('enrollResult');
    elements.authResult = document.getElementById('authResult');
    elements.userData = document.getElementById('userData');
    elements.logs = document.getElementById('logs');
    elements.status = document.getElementById('status');
    elements.userEmail = document.getElementById('userEmail');
    elements.userName = document.getElementById('userName');
    elements.clearLogsBtn = document.getElementById('clearLogsBtn');
}

/**
 * Inicializa a biblioteca FACEIO
 */
function initializeFaceIO() {
    try {
        faceio = new faceIO(FACEIO_APP_ID);
        updateStatus('Conectado', 'success');
        addLog('FACEIO inicializado com sucesso', 'success');
    } catch (error) {
        updateStatus('Erro na inicialização', 'error');
        addLog(`Erro ao inicializar FACEIO: ${error.message}`, 'error');
    }
}

/**
 * Anexa event listeners aos botões
 */
function attachEventListeners() {
    elements.enrollBtn.addEventListener('click', handleEnrollment);
    elements.authenticateBtn.addEventListener('click', handleAuthentication);
    elements.clearLogsBtn.addEventListener('click', clearLogs);
}

/**
 * Handler para cadastro facial (Enrollment)
 */
async function handleEnrollment() {
    const email = elements.userEmail.value.trim();
    const name = elements.userName.value.trim();

    if (!email || !name) {
        showResult(elements.enrollResult, 'error', 'Erro', 'Por favor, preencha email e nome do usuário');
        addLog('Tentativa de cadastro sem dados completos', 'warning');
        return;
    }

    updateStatus('Processando cadastro...', 'info');
    setButtonLoading(elements.enrollBtn, true);
    hideResult(elements.enrollResult);
    addLog(`Iniciando cadastro para: ${name} (${email})`, 'info');

    try {
        const userInfo = await faceio.enroll({
            locale: 'auto',
            payload: {
                email: email,
                name: name,
                timestamp: new Date().toISOString()
            }
        });

        addLog('Cadastro realizado com sucesso!', 'success');
        updateStatus('Cadastro concluído', 'success');

        // Exibir resultado
        const resultHtml = `
            <h3>✓ Cadastro Realizado com Sucesso!</h3>
            <p><strong>Facial ID:</strong> ${userInfo.facialId}</p>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Timestamp:</strong> ${new Date(userInfo.timestamp).toLocaleString('pt-BR')}</p>
            ${userInfo.details ? `
                <p><strong>Idade estimada:</strong> ${userInfo.details.age || 'N/A'}</p>
                <p><strong>Gênero estimado:</strong> ${userInfo.details.gender || 'N/A'}</p>
            ` : ''}
        `;
        showResult(elements.enrollResult, 'success', '', resultHtml);

        // Atualizar dados do usuário
        displayUserData(userInfo, { email, name });

        // Limpar campos
        elements.userEmail.value = '';
        elements.userName.value = '';

        addLog(`Facial ID gerado: ${userInfo.facialId}`, 'success');

    } catch (error) {
        const errorMessage = handleFaceIOError(error);
        showResult(elements.enrollResult, 'error', 'Erro no Cadastro', errorMessage);
        updateStatus('Erro no cadastro', 'error');
        addLog(`Erro no cadastro: ${errorMessage}`, 'error');
    } finally {
        setButtonLoading(elements.enrollBtn, false);
    }
}

/**
 * Handler para autenticação facial
 */
async function handleAuthentication() {
    updateStatus('Processando autenticação...', 'info');
    setButtonLoading(elements.authenticateBtn, true);
    hideResult(elements.authResult);
    addLog('Iniciando processo de autenticação', 'info');

    try {
        const userData = await faceio.authenticate({
            locale: 'auto'
        });

        addLog('Autenticação realizada com sucesso!', 'success');
        updateStatus('Autenticado', 'success');

        // Exibir resultado
        const payload = userData.payload || {};
        const resultHtml = `
            <h3>✓ Autenticação Bem-Sucedida!</h3>
            <p><strong>Facial ID:</strong> ${userData.facialId}</p>
            <p><strong>Nome:</strong> ${payload.name || 'N/A'}</p>
            <p><strong>Email:</strong> ${payload.email || 'N/A'}</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString('pt-BR')}</p>
            ${userData.details ? `
                <p><strong>Idade estimada:</strong> ${userData.details.age || 'N/A'}</p>
                <p><strong>Gênero estimado:</strong> ${userData.details.gender || 'N/A'}</p>
            ` : ''}
        `;
        showResult(elements.authResult, 'success', '', resultHtml);

        // Atualizar dados do usuário
        displayUserData(userData, payload);

        addLog(`Usuário autenticado: ${payload.name || userData.facialId}`, 'success');

    } catch (error) {
        const errorMessage = handleFaceIOError(error);
        showResult(elements.authResult, 'error', 'Erro na Autenticação', errorMessage);
        updateStatus('Erro na autenticação', 'error');
        addLog(`Erro na autenticação: ${errorMessage}`, 'error');
    } finally {
        setButtonLoading(elements.authenticateBtn, false);
    }
}

/**
 * Trata erros da API FACEIO
 */
function handleFaceIOError(error) {
    const errorCode = error.code || 'UNKNOWN';
    const errorMessage = error.message || 'Erro desconhecido';

    addLog(`Código de erro FACEIO: ${errorCode}`, 'error');

    // Mapeamento de códigos de erro comuns
    const errorMessages = {
        1: 'Permissão de câmera negada pelo usuário',
        2: 'Nenhum rosto detectado. Por favor, posicione seu rosto na frente da câmera',
        3: 'Rosto não reconhecido. Usuário não cadastrado',
        4: 'Muitas faces detectadas. Certifique-se de que apenas uma pessoa está na frente da câmera',
        5: 'Ataque de spoofing detectado (tentativa de uso de foto ou vídeo)',
        6: 'Tempo de processamento excedido',
        7: 'Usuário cancelou a operação',
        8: 'PIN não fornecido ou inválido',
        9: 'Erro de rede. Verifique sua conexão',
        10: 'Aplicação FACEIO não encontrada ou desativada',
        11: 'Limite de usuários cadastrados atingido para esta aplicação'
    };

    return errorMessages[errorCode] || `${errorMessage} (Código: ${errorCode})`;
}

/**
 * Exibe dados do usuário na interface
 */
function displayUserData(userInfo, payload) {
    const dataHtml = `
        <div class="data-item">
            <span class="data-label">Facial ID:</span>
            <span>${userInfo.facialId}</span>
        </div>
        <div class="data-item">
            <span class="data-label">Nome:</span>
            <span>${payload.name || 'N/A'}</span>
        </div>
        <div class="data-item">
            <span class="data-label">Email:</span>
            <span>${payload.email || 'N/A'}</span>
        </div>
        <div class="data-item">
            <span class="data-label">Data/Hora:</span>
            <span>${new Date().toLocaleString('pt-BR')}</span>
        </div>
        ${userInfo.details ? `
            <div class="data-item">
                <span class="data-label">Idade Estimada:</span>
                <span>${userInfo.details.age || 'N/A'}</span>
            </div>
            <div class="data-item">
                <span class="data-label">Gênero Estimado:</span>
                <span>${userInfo.details.gender || 'N/A'}</span>
            </div>
        ` : ''}
    `;
    elements.userData.innerHTML = dataHtml;
}

/**
 * Atualiza o status na barra superior
 */
function updateStatus(message, type) {
    elements.status.textContent = message;
    elements.status.style.background = type === 'success' ? '#d4edda' :
                                       type === 'error' ? '#f8d7da' :
                                       type === 'info' ? '#d1ecf1' : '#f0f0f0';
    elements.status.style.color = type === 'success' ? '#155724' :
                                  type === 'error' ? '#721c24' :
                                  type === 'info' ? '#0c5460' : '#333';
}

/**
 * Exibe resultado em uma caixa
 */
function showResult(element, type, title, content) {
    element.className = `result-box show ${type}`;
    element.innerHTML = title ? `<h3>${title}</h3>${content}` : content;
}

/**
 * Esconde caixa de resultado
 */
function hideResult(element) {
    element.className = 'result-box';
}

/**
 * Define estado de loading em um botão
 */
function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.classList.add('loading');
    } else {
        button.disabled = false;
        button.classList.remove('loading');
    }
}

/**
 * Adiciona entrada no log
 */
function addLog(message, type = 'info') {
    const time = new Date().toLocaleTimeString('pt-BR');
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `
        <span class="log-time">[${time}]</span>
        <span class="log-type-${type}">${message}</span>
    `;
    elements.logs.insertBefore(logEntry, elements.logs.firstChild);

    // Limitar logs a 50 entradas
    while (elements.logs.children.length > 50) {
        elements.logs.removeChild(elements.logs.lastChild);
    }
}

/**
 * Limpa todos os logs
 */
function clearLogs() {
    elements.logs.innerHTML = '';
    addLog('Logs limpos', 'info');
}

// Exportar funções para debug no console
window.faceioDebug = {
    enroll: handleEnrollment,
    authenticate: handleAuthentication,
    addLog: addLog,
    clearLogs: clearLogs,
    getFaceIO: () => faceio
};

addLog('Debug helpers disponíveis em window.faceioDebug', 'info');
