// State management
let state = {
    screen: loadUserData() ? 'home' : 'register',
    module: null,
    question: 0,
    selected: null,
    showExplanation: false,
    score: 0,
    completed: loadCompleted(),
    answers: [],
    userData: loadUserData()
};

// Load completed modules from localStorage
function loadCompleted() {
    try {
        const saved = localStorage.getItem('completedModules');
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        return [];
    }
}

// Save completed modules to localStorage
function saveCompleted() {
    try {
        localStorage.setItem('completedModules', JSON.stringify(state.completed));
    } catch (e) {
        console.error('Error saving progress');
    }
}

// Load user data from localStorage
function loadUserData() {
    try {
        const saved = localStorage.getItem('userData');
        return saved ? JSON.parse(saved) : null;
    } catch (e) {
        return null;
    }
}

// Save user data to localStorage
function saveUserData(userData) {
    try {
        localStorage.setItem('userData', JSON.stringify(userData));
    } catch (e) {
        console.error('Error saving user data');
    }
}

// Save evaluation result
function saveEvaluationResult(result) {
    try {
        const history = JSON.parse(localStorage.getItem('evaluationHistory') || '[]');
        history.push(result);
        localStorage.setItem('evaluationHistory', JSON.stringify(history));
    } catch (e) {
        console.error('Error saving evaluation result');
    }
}

// Get evaluation history
function getEvaluationHistory() {
    try {
        return JSON.parse(localStorage.getItem('evaluationHistory') || '[]');
    } catch (e) {
        return [];
    }
}

// Export evaluation history to CSV
function exportToCSV() {
    const history = getEvaluationHistory();
    
    if (history.length === 0) {
        alert('No hay evaluaciones para exportar');
        return;
    }
    
    // CSV Headers
    let csv = 'Fecha,Hora,Nombre,Apellido,Empresa,Correo,Módulo,Pregunta,Respuesta Seleccionada,Respuesta Correcta,Resultado,Puntuación Total,Porcentaje\n';
    
    // Add data rows
    history.forEach(eval => {
        eval.answers.forEach((answer, index) => {
            const question = eval.questions[answer.questionIndex];
            const selectedOption = question.opts[answer.selectedAnswer];
            const correctOption = question.opts[question.correct];
            
            csv += `"${eval.date}","${eval.time}","${eval.userData.firstName}","${eval.userData.lastName}","${eval.userData.company}","${eval.userData.email}","${eval.moduleName}","${question.q.replace(/"/g, '""')}","${selectedOption.replace(/"/g, '""')}","${correctOption.replace(/"/g, '""')}","${answer.isCorrect ? 'Correcta' : 'Incorrecta'}","${eval.score}/${eval.totalQuestions}","${eval.percentage}%"\n`;
        });
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `Evaluaciones_Absolutos_Calidad_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Export individual evaluation result
function exportCurrentResult() {
    const m = state.module;
    const percentage = Math.round((state.score / m.questions.length) * 100);
    const now = new Date();
    
    const result = {
        date: now.toISOString().split('T')[0],
        time: now.toTimeString().split(' ')[0],
        userData: state.userData,
        moduleName: m.title,
        moduleSubtitle: m.subtitle,
        score: state.score,
        totalQuestions: m.questions.length,
        percentage: percentage,
        answers: state.answers,
        questions: m.questions
    };
    
    // Save to history
    saveEvaluationResult(result);
    
    // Generate CSV for this evaluation
    let csv = 'Información del Participante\n';
    csv += `Nombre,${state.userData.firstName}\n`;
    csv += `Apellido,${state.userData.lastName}\n`;
    csv += `Empresa,${state.userData.company}\n`;
    csv += `Correo,${state.userData.email}\n`;
    csv += `Fecha,${result.date}\n`;
    csv += `Hora,${result.time}\n`;
    csv += `\nMódulo,${m.title} - ${m.subtitle}\n`;
    csv += `Puntuación,${state.score}/${m.questions.length}\n`;
    csv += `Porcentaje,${percentage}%\n`;
    csv += '\n\nDetalle de Respuestas\n';
    csv += 'Pregunta,Respuesta Seleccionada,Respuesta Correcta,Resultado\n';
    
    state.answers.forEach((answer, index) => {
        const question = m.questions[answer.questionIndex];
        const selectedOption = question.opts[answer.selectedAnswer];
        const correctOption = question.opts[question.correct];
        
        csv += `"${question.q.replace(/"/g, '""')}","${selectedOption.replace(/"/g, '""')}","${correctOption.replace(/"/g, '""')}","${answer.isCorrect ? 'Correcta' : 'Incorrecta'}"\n`;
    });
    
    // Create download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const fileName = `Evaluacion_${m.title}_${state.userData.firstName}_${state.userData.lastName}_${result.date}.csv`;
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const modules = [
    {
        id: 1, 
        title: "PARAR", 
        subtitle: "Detenerse cuando no esté seguro", 
        icon: "🛑", 
        color: "red",
        questions: [
            { 
                q: "Según la presentación, ¿cuándo debes detenerte?", 
                opts: [
                    "Solo cuando haya una emergencia de seguridad", 
                    "Cuando las cosas no parezcan correctas o si no tienes experiencia con la tarea", 
                    "Únicamente cuando lo ordene el supervisor", 
                    "Solo al finalizar la jornada laboral"
                ], 
                correct: 1, 
                exp: "Detente cuando las cosas no parezcan correctas o si no tienes experiencia con la tarea que tienes entre manos. También debes detener el trabajo si surgen confusiones, incertidumbre o condiciones inesperadas."
            },
            { 
                q: "Antes de detenerte, ¿qué debes asegurar?", 
                opts: [
                    "Que todos los compañeros estén informados", 
                    "Que el trabajo esté al 50% completado", 
                    "Que los sistemas y procesos estén en un estado seguro", 
                    "Que el cliente haya aprobado la detención"
                ], 
                correct: 2, 
                exp: "Asegúrese de que los sistemas y procesos estén en un estado seguro antes de detenerse, luego notifique a su supervisor inmediato."
            },
            { 
                q: "¿Qué debes evitar al aplicar 'Detenerse cuando no esté seguro'?", 
                opts: [
                    "Notificar a tu supervisor", 
                    "Racionalizar las preguntas buscando respuestas objetivas", 
                    "Detener el trabajo temporalmente", 
                    "Asegurar los sistemas"
                ], 
                correct: 1, 
                exp: "Evite racionalizar las preguntas buscando respuestas objetivas. Debes hacer preguntas y obtener respuestas verificadas, no asumir o justificar."
            }
        ]
    },
    {
        id: 2, 
        title: "SEGUIR", 
        subtitle: "Seguir Procedimientos", 
        icon: "📋", 
        color: "blue",
        questions: [
            { 
                q: "¿Qué significa 'Seguir Procedimientos' según la presentación?", 
                opts: [
                    "Leer el procedimiento al finalizar el trabajo", 
                    "Conocer los procedimientos para el trabajo que se está realizando", 
                    "Seguir solo los procedimientos críticos", 
                    "Memorizar todos los procedimientos del proyecto"
                ], 
                correct: 1, 
                exp: "Seguir Procedimientos significa: Conocer los procedimientos para el trabajo que se está realizando y comprobar que está utilizando la revisión correcta."
            },
            { 
                q: "¿Qué debes comprobar al seguir procedimientos?", 
                opts: [
                    "Que el documento esté firmado", 
                    "Que está utilizando la revisión correcta", 
                    "Que todos lo hayan leído", 
                    "Que esté en formato digital"
                ], 
                correct: 1, 
                exp: "Compruebe que está utilizando la revisión correcta del procedimiento. Usar una versión desactualizada puede causar problemas graves."
            },
            { 
                q: "¿Qué debes evitar al seguir procedimientos?", 
                opts: [
                    "Verificar la revisión correcta del documento", 
                    "Saltarse pasos o usar archivos adjuntos en lugar de todo el documento controlado", 
                    "Consultar dudas con el supervisor", 
                    "Leer el procedimiento antes de iniciar"
                ], 
                correct: 1, 
                exp: "Evite saltarse pasos o usar archivos adjuntos en lugar de todo el documento controlado. Cada paso del procedimiento completo tiene una razón de ser."
            },
            { 
                q: "Si tiene que ocurrir una desviación del procedimiento, ¿qué debes hacer?", 
                opts: [
                    "Proceder si tienes suficiente experiencia", 
                    "Obtener los documentos requeridos que indiquen que la desviación es permitida", 
                    "Notificar verbalmente al supervisor", 
                    "Documentarlo en tu reporte diario"
                ], 
                correct: 1, 
                exp: "Si tiene que ocurrir una desviación, obtenga los documentos requeridos que indiquen que la desviación es permitida. No se permiten desviaciones verbales."
            }
        ]
    },
    {
        id: 3, 
        title: "CONDUCTA", 
        subtitle: "Realizar revisiones de trabajo", 
        icon: "👥", 
        color: "green",
        questions: [
            { 
                q: "¿Cómo deben ser las revisiones de trabajo según la presentación?", 
                opts: [
                    "Un monólogo informativo del supervisor", 
                    "Involucrar participantes principales, mantenerse comprometido y evitar un monólogo", 
                    "Una simple lectura de la lista de verificación", 
                    "Solo para trabajos de alto riesgo"
                ], 
                correct: 1, 
                exp: "Involucre a los participantes principales, manténgase comprometido y evite un monólogo. Las revisiones deben ser interactivas, no una presentación unidireccional."
            },
            { 
                q: "¿Qué deben cubrir las revisiones previas al trabajo?", 
                opts: [
                    "Solo el cronograma y asignaciones", 
                    "Únicamente los riesgos de seguridad", 
                    "El propósito, asignaciones, riesgos, mitigación, lecciones anteriores y cualquier pregunta", 
                    "Solamente quién es responsable de cada tarea"
                ], 
                correct: 2, 
                exp: "Las revisiones previas al trabajo deben cubrir el propósito y las asignaciones de la tarea, los riesgos y la mitigación, las lecciones anteriores y cualquier pregunta o inquietud."
            },
            { 
                q: "¿Qué debe verificar el personal en las instrucciones previas al trabajo?", 
                opts: [
                    "Que tiene el equipo adecuado", 
                    "Que es apto y calificado para la tarea en cuestión", 
                    "Que conoce a todos los participantes", 
                    "Que ha leído todos los procedimientos"
                ], 
                correct: 1, 
                exp: "El personal involucrado en las instrucciones previas al trabajo debe verificar que es apto y calificado para la tarea en cuestión."
            },
            {
                q: "¿Qué deben cubrir las revisiones posteriores al trabajo?",
                opts: [
                    "Solo si hubo problemas",
                    "Lo que salió bien y lo que no para mejorar el rendimiento futuro o abordar cualquier problema",
                    "Únicamente el tiempo empleado",
                    "Solo los aspectos de seguridad"
                ],
                correct: 1,
                exp: "Las revisiones de trabajo posteriores deben cubrir lo que salió bien y lo que no para mejorar el rendimiento futuro o abordar cualquier problema."
            }
        ]
    },
    {
        id: 4, 
        title: "ADHERIR", 
        subtitle: "Adherirse a puntos de verificación/retención", 
        icon: "✓", 
        color: "yellow",
        questions: [
            { 
                q: "¿Qué es un punto de retención según la presentación?", 
                opts: [
                    "Un área de descanso para el personal", 
                    "Un punto de un proceso que requiere verificación y/o aprobación antes de continuar", 
                    "Un lugar de almacenamiento temporal de materiales", 
                    "Una pausa obligatoria cada 4 horas"
                ], 
                correct: 1, 
                exp: "Un punto de retención es un punto de un proceso que requiere verificación y/o aprobación antes de continuar con el siguiente paso."
            },
            { 
                q: "¿Qué debes comprender al adherirse a puntos de verificación/retención?", 
                opts: [
                    "Solo los puntos de retención críticos", 
                    "Qué pasos requieren verificación antes de continuar", 
                    "Únicamente tus responsabilidades personales", 
                    "Solo los puntos que te asigna tu supervisor"
                ], 
                correct: 1, 
                exp: "Comprenda qué pasos requieren verificación antes de continuar. Es fundamental conocer todos los puntos de retención aplicables a tu trabajo."
            },
            { 
                q: "¿Quién debe realizar la verificación en puntos de retención?", 
                opts: [
                    "Cualquier persona disponible", 
                    "Solo el supervisor del proyecto", 
                    "Personal calificado para hacerlo", 
                    "El cliente exclusivamente"
                ], 
                correct: 2, 
                exp: "Asegúrese de que el personal involucrado en la verificación esté calificado para hacerlo. La competencia es clave en los puntos de retención."
            },
            { 
                q: "¿Qué debes evitar respecto a los puntos de espera/retención?", 
                opts: [
                    "Documentarlos en el ITP", 
                    "Pensar que los puntos de espera no se aplican a ti", 
                    "Usar personal calificado para verificación", 
                    "Seguir el procedimiento establecido"
                ], 
                correct: 1, 
                exp: "Evita pensar que los puntos de espera no se aplican a ti. Todos los puntos de retención aplican a todas las personas involucradas en el proceso."
            }
        ]
    },
    {
        id: 5, 
        title: "POSEER", 
        subtitle: "Sé dueño de tu firma", 
        icon: "✍️", 
        color: "purple",
        questions: [
            { 
                q: "¿Qué significa 'Sé dueño de tu firma' según la presentación?", 
                opts: [
                    "Tener una firma legible y profesional", 
                    "Firme para demostrar que está dispuesto a respaldar el trabajo", 
                    "Firmar todos los documentos asignados", 
                    "Usar siempre firma digital"
                ], 
                correct: 1, 
                exp: "Firme para demostrar que está dispuesto a respaldar el trabajo. Tu firma es tu compromiso personal con la calidad del trabajo."
            },
            { 
                q: "¿Qué debes verificar antes de firmar según la presentación?", 
                opts: [
                    "Que otros ya hayan firmado", 
                    "Que la información que ha proporcionado sea correcta o que las acciones especificadas se hayan completado", 
                    "Solo que el formato del documento sea correcto", 
                    "Únicamente la fecha y hora"
                ], 
                correct: 1, 
                exp: "Verifique que la información que ha proporcionado sea correcta o que las acciones especificadas se hayan completado antes de firmar."
            },
            { 
                q: "¿Por qué trabajos NO debes firmar?", 
                opts: [
                    "Por trabajos urgentes", 
                    "Por trabajos que no realizó, verificó, administró o supervisó", 
                    "Por trabajos en fin de semana", 
                    "Por trabajos de subcontratistas"
                ], 
                correct: 1, 
                exp: "Evite firmar por trabajos que no realizó, verificó, administró o supervisó. Solo firma por trabajo del cual eres directamente responsable."
            },
            {
                q: "¿Qué debes hacer antes de firmar o enviar electrónicamente?",
                opts: [
                    "Esperar aprobación del supervisor",
                    "Revisar su trabajo antes de firmarlo o enviarlo electrónicamente",
                    "Verificar que todos hayan firmado",
                    "Solicitar una segunda revisión"
                ],
                correct: 1,
                exp: "Revise su trabajo antes de firmarlo o enviarlo electrónicamente. Tu firma es tu garantía de calidad."
            }
        ]
    },
    {
        id: 6, 
        title: "CASOS", 
        subtitle: "Aprende de ejemplos reales", 
        icon: "📚", 
        color: "indigo",
        questions: [
            { 
                q: "Caso 1: ¿Qué asumió Eric que causó el problema?", 
                opts: [
                    "Que el clima no sería tan frío", 
                    "Que el área 5 también cumpliría con el ITP dado que las áreas previas estaban correctas", 
                    "Que el subcontratista era muy confiable", 
                    "Que había tiempo suficiente para verificar después"
                ], 
                correct: 1, 
                exp: "Eric asumió que el área 5 también cumpliría con el ITP dado que las áreas previas estaban correctas. Decidió no completar la verificación, violando 'Seguir Procedimientos'."
            },
            { 
                q: "Caso 1: ¿Qué consecuencias tuvo el agua congelada en las tuberías?", 
                opts: [
                    "Solo un retraso de una semana", 
                    "Rotura de tuberías, daño a estructura de hormigón, apuntalamiento temporal y reemplazo completo", 
                    "Multa económica del cliente", 
                    "Reemplazo solo de las tuberías"
                ], 
                correct: 1, 
                exp: "El agua de prueba en dos tuberías de acero de 18\" se congeló causando: rotura de las tuberías por expansión del hielo, daño a la estructura de soporte de hormigón. Se requirió instalación de apuntalamiento temporal de emergencia, demolición y reemplazo del hormigón armado, y reemplazo completo de las tuberías."
            },
            { 
                q: "Caso 2: ¿Cuántos incidentes previos había tenido el proyecto de David?", 
                opts: [
                    "Ninguno, este fue el primero", 
                    "Dos incidentes donde se procedió sin cumplir inspecciones de puntos de retención", 
                    "Cinco incidentes menores", 
                    "Un incidente similar"
                ], 
                correct: 1, 
                exp: "Ya habían ocurrido dos incidentes en el año donde el equipo de construcción procedió con colocación de hormigón sin cumplir con las inspecciones de puntos de retención requeridas."
            },
            { 
                q: "Caso 2: ¿Qué se vaciaron sin realizar las inspecciones requeridas?", 
                opts: [
                    "Tres columnas de hormigón", 
                    "Cuatro zapatas de hormigón", 
                    "Cinco losas de fundación", 
                    "Dos muros de contención"
                ], 
                correct: 1, 
                exp: "Se vaciaron cuatro zapatas de hormigón sin realizar las inspecciones de puntos de retención requeridas por el Plan de Inspección y Pruebas (ITP)."
            },
            { 
                q: "Caso 2: ¿Qué acción drástica se tomó como consecuencia?", 
                opts: [
                    "Se cambió al supervisor del proyecto", 
                    "Se emitió una orden de detención de trabajo (Stop Work Order)", 
                    "Se canceló el contrato del subcontratista", 
                    "Se redujo el presupuesto del proyecto"
                ], 
                correct: 1, 
                exp: "Se emitió una orden de detención de trabajo (Stop Work Order) y se suspendieron todas las actividades de hormigonado del proyecto."
            },
            { 
                q: "Caso 3: ¿Qué NO tenía el proyecto al momento de decidir construir el puente?", 
                opts: [
                    "Presupuesto aprobado", 
                    "Un procedimiento de obras temporales", 
                    "Personal calificado", 
                    "Autorización del cliente"
                ], 
                correct: 1, 
                exp: "En el momento de tomar la decisión, el proyecto no contaba con un procedimiento de obras temporales. A pesar de esto, la construcción del puente se adjudicó."
            },
            {
                q: "Caso 3: ¿Qué le pasó al puente temporal?",
                opts: [
                    "Se completó exitosamente",
                    "El caudal del río aumentó y el puente resultó gravemente dañado y fue abandonado",
                    "Se vendió a otro proyecto",
                    "Se convirtió en estructura permanente"
                ],
                correct: 1,
                exp: "Semanas después, a mitad de construcción del puente, el caudal del río aumentó repentinamente. El puente resultó gravemente dañado. El daño fue tan extenso que el puente fue abandonado y nunca se completó."
            },
            {
                q: "Caso 3: ¿Cuál es la lección clave según la presentación?",
                opts: [
                    "Las obras temporales no requieren supervisión",
                    "'Temporal' no significa 'menos importante' - todas las estructuras requieren ingeniería adecuada",
                    "Los subcontratistas deben ser más experimentados",
                    "Los ríos estacionales son impredecibles"
                ],
                correct: 1,
                exp: "Lección Clave: 'Temporal' no significa 'menos importante' - todas las estructuras requieren ingeniería adecuada, supervisión y seguimiento de procedimientos."
            }
        ]
    }
];

const colorMap = {
    red: { bg: 'bg-red-500', border: 'border-red-500', text: 'text-red-500' },
    blue: { bg: 'bg-blue-500', border: 'border-blue-500', text: 'text-blue-500' },
    green: { bg: 'bg-green-500', border: 'border-green-500', text: 'text-green-500' },
    yellow: { bg: 'bg-yellow-500', border: 'border-yellow-500', text: 'text-yellow-500' },
    purple: { bg: 'bg-purple-500', border: 'border-purple-500', text: 'text-purple-500' },
    indigo: { bg: 'bg-indigo-500', border: 'border-indigo-500', text: 'text-indigo-500' }
};

function render() {
    const app = document.getElementById('app');
    if (state.screen === 'register') app.innerHTML = renderRegister();
    else if (state.screen === 'home') app.innerHTML = renderHome();
    else if (state.screen === 'quiz') app.innerHTML = renderQuiz();
    else if (state.screen === 'results') app.innerHTML = renderResults();
}

function renderRegister() {
    return `
        <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pb-safe flex items-center justify-center">
            <div class="max-w-md w-full">
                <div class="bg-white rounded-2xl shadow-lg p-8">
                    <div class="h-12 mb-6 flex items-center justify-center">
                        <span class="text-3xl font-bold text-blue-900">BECHTEL</span>
                    </div>
                    
                    <h1 class="text-2xl font-bold text-gray-800 mb-2 text-center">Absolutos de Calidad</h1>
                    <p class="text-gray-600 text-sm text-center mb-8">Yanacocha AWTP - QUA1004</p>
                    
                    <div class="mb-6">
                        <p class="text-gray-700 text-center mb-6">Por favor, ingresa tus datos para comenzar la capacitación:</p>
                        
                        <form id="registerForm" class="space-y-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Nombre *</label>
                                <input 
                                    type="text" 
                                    id="firstName" 
                                    required
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                                    placeholder="Ingresa tu nombre"
                                >
                            </div>
                            
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Apellido *</label>
                                <input 
                                    type="text" 
                                    id="lastName" 
                                    required
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                                    placeholder="Ingresa tu apellido"
                                >
                            </div>
                            
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Empresa *</label>
                                <input 
                                    type="text" 
                                    id="company" 
                                    required
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                                    placeholder="Ej: Bechtel, Newmont, etc."
                                >
                            </div>
                            
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico *</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    required
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                                    placeholder="tu.correo@empresa.com"
                                >
                            </div>
                            
                            <button 
                                type="submit"
                                class="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors mt-6"
                            >
                                Comenzar Capacitación →
                            </button>
                        </form>
                    </div>
                    
                    <p class="text-xs text-gray-500 text-center mt-4">
                        * Campos obligatorios. Tus datos se guardan localmente en tu dispositivo.
                    </p>
                </div>
            </div>
        </div>
    `;
}

function renderHome() {
    const progress = (state.completed.length / modules.length) * 100;
    const userName = state.userData ? `${state.userData.firstName} ${state.userData.lastName}` : '';
    
    return `
        <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pb-safe">
            <div class="max-w-2xl mx-auto">
                <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="h-12 flex items-center">
                            <span class="text-3xl font-bold text-blue-900">BECHTEL</span>
                        </div>
                        <button onclick="editUserData()" class="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                            ⚙️ Editar datos
                        </button>
                    </div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">Absolutos de Calidad</h1>
                    <p class="text-gray-600 text-sm">Yanacocha AWTP - QUA1004</p>
                    ${userName ? `<p class="text-indigo-600 font-semibold mt-3">👤 ${userName}</p>` : ''}
                    ${state.userData ? `<p class="text-gray-600 text-sm">${state.userData.company} • ${state.userData.email}</p>` : ''}
                </div>

                <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-xl font-bold text-gray-800">🏆 Tu Progreso</h2>
                        <span class="text-2xl font-bold text-indigo-600">${state.completed.length}/${modules.length}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3 mb-4">
                        <div class="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500" style="width: ${progress}%"></div>
                    </div>
                    ${getEvaluationHistory().length > 0 ? `
                        <button onclick="exportToCSV()" class="w-full mt-4 border-2 border-indigo-500 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                            📊 Exportar Todas las Evaluaciones (${getEvaluationHistory().length})
                        </button>
                    ` : ''}
                </div>

                <div class="space-y-4">
                    ${modules.map(m => `
                        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div class="p-6">
                                <div class="flex items-start justify-between mb-4">
                                    <div class="flex items-center gap-3 mb-2">
                                        <div class="${colorMap[m.color].bg} text-white rounded-xl p-3 text-2xl">${m.icon}</div>
                                        <div>
                                            <h3 class="text-xl font-bold text-gray-800">${m.title}</h3>
                                            <p class="text-sm text-gray-600">${m.subtitle}</p>
                                        </div>
                                    </div>
                                    ${state.completed.includes(m.id) ? '<span class="text-green-500 text-2xl">✓</span>' : ''}
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm text-gray-600">${m.questions.length} preguntas</span>
                                    <button onclick="startModule(${m.id})" class="${colorMap[m.color].bg} text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all">
                                        ▶ ${state.completed.includes(m.id) ? 'Reintentar' : 'Comenzar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="mt-8 text-center text-gray-600 text-sm">
                    <p class="font-semibold mb-1">"¡Vivimos para un desafío!"</p>
                    <p>Hacer realidad las ambiciones de nuestros clientes</p>
                </div>
            </div>
        </div>
    `;
}

function renderQuiz() {
    const m = state.module;
    const q = m.questions[state.question];
    const progress = ((state.question + 1) / m.questions.length) * 100;
    const colors = colorMap[m.color];

    return `
        <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pb-safe">
            <div class="max-w-2xl mx-auto">
                <div class="bg-white rounded-2xl shadow-lg p-4 mb-6">
                    <div class="flex items-center justify-between mb-3">
                        <button onclick="backToHome()" class="text-gray-600 flex items-center gap-2 hover:text-gray-800 transition-colors">
                            ← Volver
                        </button>
                        <div class="${colors.bg} text-white px-4 py-2 rounded-xl text-sm font-semibold">${m.title}</div>
                    </div>
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-medium text-gray-600">Pregunta ${state.question + 1} de ${m.questions.length}</span>
                        <span class="text-sm font-bold text-indigo-600">Puntos: ${state.score}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="${colors.bg} h-2 rounded-full transition-all duration-300" style="width: ${progress}%"></div>
                    </div>
                </div>

                <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div class="mb-6">
                        <div class="flex items-start gap-3 mb-4">
                            <div class="${colors.bg} text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">${state.question + 1}</div>
                            <h2 class="text-xl font-bold text-gray-800 leading-tight">${q.q}</h2>
                        </div>
                    </div>

                    <div class="space-y-3">
                        ${q.opts.map((opt, i) => {
                            const isSelected = state.selected === i;
                            const isCorrect = i === q.correct;
                            let btnClass = 'border-2 border-gray-200 hover:border-indigo-300 bg-white';
                            let iconClass = 'bg-gray-200 text-gray-600';
                            let icon = String.fromCharCode(65 + i);

                            if (state.showExplanation) {
                                if (isCorrect) {
                                    btnClass = 'border-2 border-green-500 bg-green-50';
                                    iconClass = 'bg-green-500 text-white';
                                    icon = '✓';
                                } else if (isSelected) {
                                    btnClass = 'border-2 border-red-500 bg-red-50';
                                    iconClass = 'bg-red-500 text-white';
                                    icon = '✗';
                                } else {
                                    btnClass = 'border-2 border-gray-200 bg-gray-50';
                                }
                            } else if (isSelected) {
                                btnClass = 'border-2 border-indigo-500 bg-indigo-50';
                                iconClass = 'bg-indigo-500 text-white';
                            }

                            return `
                                <button onclick="selectAnswer(${i})" ${state.showExplanation ? 'disabled' : ''} 
                                    class="w-full p-4 rounded-xl text-left transition-all ${btnClass}">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${iconClass}">${icon}</div>
                                        <span class="font-medium text-gray-800">${opt}</span>
                                    </div>
                                </button>
                            `;
                        }).join('')}
                    </div>

                    ${state.showExplanation ? `
                        <div class="${state.selected === q.correct ? 'bg-green-50 border-2 border-green-200' : 'bg-blue-50 border-2 border-blue-200'} mt-6 p-4 rounded-xl">
                            <h3 class="font-bold text-gray-800 mb-2">
                                ${state.selected === q.correct ? '✓ ¡Correcto!' : '📖 Explicación:'}
                            </h3>
                            <p class="text-gray-700 leading-relaxed">${q.exp}</p>
                        </div>
                    ` : ''}

                    <div class="mt-6">
                        ${!state.showExplanation ? `
                            <button onclick="submitAnswer()" ${state.selected === null ? 'disabled' : ''} 
                                class="${colors.bg} text-white py-4 rounded-xl font-bold text-lg w-full disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all">
                                Verificar Respuesta
                            </button>
                        ` : `
                            <button onclick="nextQuestion()" class="${colors.bg} text-white py-4 rounded-xl font-bold text-lg w-full hover:opacity-90 transition-all">
                                ${state.question < m.questions.length - 1 ? 'Siguiente Pregunta →' : '🏆 Ver Resultados'}
                            </button>
                        `}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderResults() {
    const m = state.module;
    const percentage = Math.round((state.score / m.questions.length) * 100);
    const colors = colorMap[m.color];
    let message = "Necesitas repasar los Absolutos de Calidad";
    if (percentage >= 90) message = "¡Excelente! Dominas los Absolutos de Calidad";
    else if (percentage >= 70) message = "¡Muy bien! Buen conocimiento de los Absolutos";
    else if (percentage >= 50) message = "Bien. Revisa los conceptos para mejorar";

    return `
        <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pb-safe">
            <div class="max-w-2xl mx-auto">
                <div class="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center">
                    <div class="${colors.bg} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-5xl">
                        🏆
                    </div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">${message}</h1>
                    <div class="text-6xl font-bold text-indigo-600 my-6">${percentage}%</div>
                    <p class="text-xl text-gray-600 mb-8">${state.score} de ${m.questions.length} respuestas correctas</p>

                    <div class="w-full bg-gray-200 rounded-full h-4 mb-8">
                        <div class="${colors.bg} h-4 rounded-full transition-all duration-1000" style="width: ${percentage}%"></div>
                    </div>

                    <div class="text-left space-y-3 mb-8">
                        <h3 class="font-bold text-gray-800 text-lg mb-4">Revisión de Respuestas:</h3>
                        ${state.answers.map((a, i) => `
                            <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                                <span class="text-gray-700">Pregunta ${i + 1}</span>
                                <span class="${a.isCorrect ? 'text-green-500' : 'text-red-500'} text-2xl">
                                    ${a.isCorrect ? '✓' : '✗'}
                                </span>
                            </div>
                        `).join('')}
                    </div>

                    <div class="space-y-3">
                        <button onclick="exportCurrentResult()" class="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2">
                            📥 Descargar Resultado (CSV)
                        </button>
                        
                        <button onclick="retry()" class="${colors.bg} text-white py-4 rounded-xl font-bold text-lg w-full hover:opacity-90 transition-all">
                            🔄 Reintentar Módulo
                        </button>
                        <button onclick="backToHome()" class="border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold text-lg w-full hover:bg-gray-50 transition-all">
                            Volver al Inicio
                        </button>
                    </div>
                </div>

                ${percentage >= 70 ? `
                    <div class="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-6 text-center text-white">
                        <div class="text-5xl mb-3">🏅</div>
                        <h3 class="text-xl font-bold mb-2">¡Módulo Completado!</h3>
                        <p class="text-sm opacity-90">Has demostrado comprensión del absoluto: <strong>${m.title}</strong></p>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function startModule(id) {
    state.module = modules.find(m => m.id === id);
    state.question = 0;
    state.selected = null;
    state.showExplanation = false;
    state.score = 0;
    state.answers = [];
    state.screen = 'quiz';
    render();
    window.scrollTo(0, 0);
}

function selectAnswer(index) {
    if (!state.showExplanation) {
        state.selected = index;
        render();
    }
}

function submitAnswer() {
    const isCorrect = state.selected === state.module.questions[state.question].correct;
    state.answers.push({ questionIndex: state.question, selectedAnswer: state.selected, isCorrect });
    if (isCorrect) state.score++;
    state.showExplanation = true;
    render();
}

function nextQuestion() {
    if (state.question < state.module.questions.length - 1) {
        state.question++;
        state.selected = null;
        state.showExplanation = false;
        state.screen = 'quiz';
    } else {
        if (!state.completed.includes(state.module.id)) {
            state.completed.push(state.module.id);
            saveCompleted();
        }
        state.screen = 'results';
    }
    render();
    window.scrollTo(0, 0);
}

function retry() {
    state.question = 0;
    state.selected = null;
    state.showExplanation = false;
    state.score = 0;
    state.answers = [];
    state.screen = 'quiz';
    render();
    window.scrollTo(0, 0);
}

function backToHome() {
    state.screen = 'home';
    state.module = null;
    state.score = 0;
    state.answers = [];
    render();
    window.scrollTo(0, 0);
}

function handleRegisterSubmit(e) {
    e.preventDefault();
    const userData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        company: document.getElementById('company').value.trim(),
        email: document.getElementById('email').value.trim(),
        registeredAt: new Date().toISOString()
    };
    
    state.userData = userData;
    saveUserData(userData);
    state.screen = 'home';
    render();
    window.scrollTo(0, 0);
}

function editUserData() {
    state.screen = 'register';
    render();
    window.scrollTo(0, 0);
    
    // Pre-fill form if userData exists
    if (state.userData) {
        setTimeout(() => {
            const form = document.getElementById('registerForm');
            if (form) {
                document.getElementById('firstName').value = state.userData.firstName || '';
                document.getElementById('lastName').value = state.userData.lastName || '';
                document.getElementById('company').value = state.userData.company || '';
                document.getElementById('email').value = state.userData.email || '';
                form.addEventListener('submit', handleRegisterSubmit);
            }
        }, 100);
    }
}

// Initialize app and attach event listeners
function initApp() {
    render();
    
    // Attach form submit handler if on register screen
    const form = document.getElementById('registerForm');
    if (form) {
        form.addEventListener('submit', handleRegisterSubmit);
    }
}

// Initialize app
initApp();
