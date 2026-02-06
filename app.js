// State management
let state = {
    screen: 'home',
    module: null,
    question: 0,
    selected: null,
    showExplanation: false,
    score: 0,
    completed: loadCompleted(),
    answers: []
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

const modules = [
    {
        id: 1, 
        title: "PARAR", 
        subtitle: "Detenerse cuando no esté seguro", 
        icon: "🛑", 
        color: "red",
        questions: [
            { 
                q: "¿Cuándo debes detenerte según el Absoluto de Calidad?", 
                opts: [
                    "Solo cuando haya un accidente", 
                    "Cuando las cosas no parezcan correctas o no tengas experiencia", 
                    "Únicamente si el supervisor lo ordena", 
                    "Solamente en situaciones de emergencia"
                ], 
                correct: 1, 
                exp: "Debes detenerte cuando las cosas no parezcan correctas, si no tienes experiencia con la tarea, o si surgen confusiones, incertidumbre o condiciones inesperadas."
            },
            { 
                q: "Antes de detenerte, ¿qué debes hacer primero?", 
                opts: [
                    "Abandonar inmediatamente el área de trabajo", 
                    "Esperar instrucciones del cliente", 
                    "Asegurarte de que los sistemas estén en estado seguro", 
                    "Completar la tarea actual"
                ], 
                correct: 2, 
                exp: "Debes asegurarte de que los sistemas y procesos estén en un estado seguro antes de detenerte, y luego notificar a tu supervisor inmediato."
            },
            { 
                q: "¿Qué debes evitar al detenerte cuando no estás seguro?", 
                opts: [
                    "Notificar a tu supervisor", 
                    "Racionalizar las preguntas buscando respuestas objetivas", 
                    "Asegurar los sistemas", 
                    "Documentar la situación"
                ], 
                correct: 1, 
                exp: "Debes evitar racionalizar las preguntas. Es importante buscar respuestas objetivas y verificadas, no asumir."
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
                q: "¿Qué significa 'Seguir Procedimientos'?", 
                opts: [
                    "Leer los procedimientos después de terminar el trabajo", 
                    "Conocer los procedimientos y usar la revisión correcta", 
                    "Seguir únicamente los procedimientos principales", 
                    "Usar resúmenes en lugar de documentos completos"
                ], 
                correct: 1, 
                exp: "Significa conocer los procedimientos para el trabajo que se está realizando y comprobar que estás utilizando la revisión correcta del documento controlado."
            },
            { 
                q: "¿Qué debes evitar al seguir procedimientos?", 
                opts: [
                    "Verificar la revisión del documento", 
                    "Saltarse pasos o usar archivos adjuntos en lugar del documento controlado", 
                    "Consultar con supervisores", 
                    "Documentar el trabajo realizado"
                ], 
                correct: 1, 
                exp: "Debes evitar saltarse pasos o usar archivos adjuntos en lugar de todo el documento controlado. Cada paso tiene su importancia."
            },
            { 
                q: "Si necesitas hacer una desviación del procedimiento, ¿qué debes hacer?", 
                opts: [
                    "Proceder si tienes experiencia suficiente", 
                    "Obtener los documentos requeridos que indiquen que la desviación es permitida", 
                    "Notificar después de completar el trabajo", 
                    "Documentar la desviación en tus notas personales"
                ], 
                correct: 1, 
                exp: "Si tiene que ocurrir una desviación, debes obtener los documentos requeridos que indiquen que la desviación es permitida antes de proceder."
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
                q: "¿Cómo deben ser las revisiones previas al trabajo?", 
                opts: [
                    "Un monólogo del supervisor", 
                    "Involucrar participantes principales, mantenerse comprometido y evitar monólogos", 
                    "Solo leer una lista de verificación", 
                    "Únicamente para trabajos de alto riesgo"
                ], 
                correct: 1, 
                exp: "Las revisiones deben involucrar a los participantes principales, mantenerse comprometido y evitar un monólogo. Es un proceso interactivo."
            },
            { 
                q: "¿Qué deben cubrir las revisiones previas al trabajo?", 
                opts: [
                    "Solo el cronograma del día", 
                    "Únicamente los riesgos de seguridad", 
                    "Propósito, asignaciones, riesgos, mitigación, lecciones previas y preguntas", 
                    "Solamente quién será responsable"
                ], 
                correct: 2, 
                exp: "Deben cubrir el propósito y las asignaciones de la tarea, los riesgos y la mitigación, las lecciones anteriores y cualquier pregunta o inquietud."
            },
            { 
                q: "¿Qué deben cubrir las revisiones posteriores al trabajo?", 
                opts: [
                    "Solo si hubo problemas", 
                    "Lo que salió bien y lo que no, para mejorar el rendimiento futuro", 
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
                q: "¿Qué es un punto de retención?", 
                opts: [
                    "Una pausa para descanso", 
                    "Un punto que requiere verificación y/o aprobación antes de continuar", 
                    "Un lugar de almacenamiento temporal", 
                    "Una reunión de equipo"
                ], 
                correct: 1, 
                exp: "Un punto de retención es un punto de un proceso que requiere verificación y/o aprobación antes de continuar con el siguiente paso."
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
                exp: "Debes asegurarte de que el personal involucrado en la verificación esté calificado para hacerlo. La competencia es clave."
            },
            { 
                q: "¿Qué debes evitar respecto a los puntos de retención?", 
                opts: [
                    "Documentarlos adecuadamente", 
                    "Pensar que los puntos de espera no se aplican a ti", 
                    "Verificar con personal calificado", 
                    "Seguir el ITP (Plan de Inspección y Prueba)"
                ], 
                correct: 1, 
                exp: "Debes evitar pensar que los puntos de espera no se aplican a ti. Todos los puntos de retención son importantes y aplican a todos."
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
                q: "¿Qué significa 'Sé dueño de tu firma'?", 
                opts: [
                    "Firmar todos los documentos del proyecto", 
                    "Firmar para demostrar que estás dispuesto a respaldar el trabajo", 
                    "Usar firma digital en lugar de manuscrita", 
                    "Firmar solo documentos importantes"
                ], 
                correct: 1, 
                exp: "Significa firmar para demostrar que estás dispuesto a respaldar el trabajo y que verificaste que la información es correcta."
            },
            { 
                q: "¿Cuándo NO debes firmar un documento?", 
                opts: [
                    "Cuando el supervisor te lo solicita", 
                    "Cuando trabajos que no realizaste, verificaste, administraste o supervisaste", 
                    "Cuando el documento es urgente", 
                    "Cuando otros ya han firmado"
                ], 
                correct: 1, 
                exp: "Debes evitar firmar por trabajos que no realizaste, verificaste, administraste o supervisaste. Tu firma es tu responsabilidad personal."
            },
            { 
                q: "¿Qué debes hacer antes de firmar?", 
                opts: [
                    "Esperar que otros firmen primero", 
                    "Verificar que la información sea correcta y las acciones estén completadas", 
                    "Solo leer el título del documento", 
                    "Confirmar que el formato es correcto"
                ], 
                correct: 1, 
                exp: "Debes verificar que la información que has proporcionado sea correcta o que las acciones especificadas se hayan completado antes de firmar."
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
                q: "Caso 1 - Tubería Rota: ¿Qué absoluto violó Eric al no completar la verificación del área 5?", 
                opts: [
                    "Parar cuando no esté seguro", 
                    "Seguir procedimientos y Sé dueño de tu firma", 
                    "Realizar revisiones de trabajo", 
                    "Adherirse a puntos de verificación"
                ], 
                correct: 1, 
                exp: "Eric violó 'Seguir procedimientos' (debía revisar todas las áreas según el ITP) y 'Sé dueño de tu firma' (asumió en vez de verificar)."
            },
            { 
                q: "Caso 1: ¿Cuál fue la consecuencia de no drenar las tuberías del área 5?", 
                opts: [
                    "Solo un retraso menor en el cronograma", 
                    "Rotura de tuberías, daño a estructura de hormigón y reemplazo completo", 
                    "Multa económica solamente", 
                    "Advertencia verbal al equipo"
                ], 
                correct: 1, 
                exp: "El agua de prueba se congeló causando rotura de dos tuberías de acero de 18\", daño a la estructura de soporte de hormigón, requiriendo apuntalamiento temporal, demolición y reemplazo completo."
            },
            { 
                q: "Caso 2 - Tiempo Esencial: ¿Qué absoluto ignoró David al autorizar el vaciado bajo presión?", 
                opts: [
                    "Sé dueño de tu firma", 
                    "Adherirse a puntos de verificación/retención", 
                    "Seguir procedimientos", 
                    "Realizar revisiones de trabajo"
                ], 
                correct: 1, 
                exp: "David ignoró 'Adherirse a puntos de verificación/retención' al autorizar el vaciado sin completar las inspecciones de puntos de retención requeridas por el ITP."
            },
            { 
                q: "Caso 2: ¿Cuál fue el impacto de vaciar sin inspecciones de retención?", 
                opts: [
                    "Solo una amonestación verbal", 
                    "Stop Work Order y suspensión de todas las actividades de hormigonado", 
                    "Retraso de un día", 
                    "Revisión de procedimientos únicamente"
                ], 
                correct: 1, 
                exp: "Se emitió una Stop Work Order y se suspendieron todas las actividades de hormigonado del proyecto, paralizando actividades críticas."
            },
            { 
                q: "Caso 3 - Solución Rápida: ¿Qué absoluto faltó en el proyecto del puente temporal?", 
                opts: [
                    "Parar cuando no esté seguro", 
                    "Seguir procedimientos (no existía procedimiento de obras temporales)", 
                    "Sé dueño de tu firma", 
                    "Realizar revisiones de trabajo"
                ], 
                correct: 1, 
                exp: "El proyecto no contaba con un procedimiento de obras temporales, violando 'Seguir procedimientos'. El diseño avanzó con participación mínima de ingeniería."
            },
            { 
                q: "Caso 3: ¿Cuál es la lección clave de este caso?", 
                opts: [
                    "Los puentes temporales no son importantes", 
                    "'Temporal' no significa 'menos importante' - todas las estructuras requieren ingeniería adecuada", 
                    "Solo proyectos permanentes necesitan supervisión", 
                    "Los subcontratistas no necesitan supervisión en obras temporales"
                ], 
                correct: 1, 
                exp: "'Temporal' no significa 'menos importante' - todas las estructuras requieren ingeniería adecuada, supervisión y seguimiento de procedimientos."
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
    if (state.screen === 'home') app.innerHTML = renderHome();
    else if (state.screen === 'quiz') app.innerHTML = renderQuiz();
    else if (state.screen === 'results') app.innerHTML = renderResults();
}

function renderHome() {
    const progress = (state.completed.length / modules.length) * 100;
    return `
        <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pb-safe">
            <div class="max-w-2xl mx-auto">
                <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div class="h-12 mb-4 flex items-center">
                        <span class="text-3xl font-bold text-blue-900">BECHTEL</span>
                    </div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">Absolutos de Calidad</h1>
                    <p class="text-gray-600 text-sm">Yanacocha AWTP - QUA1004</p>
                </div>

                <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-xl font-bold text-gray-800">🏆 Tu Progreso</h2>
                        <span class="text-2xl font-bold text-indigo-600">${state.completed.length}/${modules.length}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                        <div class="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500" style="width: ${progress}%"></div>
                    </div>
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

// Initialize app
render();
