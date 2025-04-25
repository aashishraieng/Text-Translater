// Word embeddings (simplified for demonstration)
const wordEmbeddings = {
    'hello': [0.2, 0.5, 0.1, 0.8, 0.3],
    'how': [0.4, 0.2, 0.7, 0.1, 0.5],
    'are': [0.3, 0.6, 0.2, 0.4, 0.7],
    'you': [0.5, 0.3, 0.4, 0.6, 0.2],
    'i': [0.1, 0.4, 0.5, 0.3, 0.6],
    'love': [0.7, 0.2, 0.3, 0.5, 0.4],
    'thank': [0.6, 0.1, 0.8, 0.2, 0.5],
    'good': [0.3, 0.7, 0.1, 0.4, 0.6],
    'morning': [0.4, 0.5, 0.2, 0.7, 0.3],
    'world': [0.5, 0.6, 0.3, 0.2, 0.8],
    'beautiful': [0.6, 0.4, 0.7, 0.3, 0.5],
    'day': [0.3, 0.5, 0.4, 0.6, 0.2],
    'night': [0.4, 0.3, 0.5, 0.7, 0.1],
    'friend': [0.5, 0.7, 0.2, 0.4, 0.6],
    'family': [0.6, 0.5, 0.3, 0.7, 0.2],
    'food': [0.4, 0.6, 0.5, 0.3, 0.7],
    'water': [0.3, 0.5, 0.6, 0.4, 0.2],
    'time': [0.5, 0.3, 0.4, 0.6, 0.7],
    'work': [0.6, 0.4, 0.5, 0.3, 0.8],
    'home': [0.4, 0.7, 0.3, 0.5, 0.2]
};

// Translation dictionaries for different languages (fallback)
const translations = {
    'hindi': {
        'hello': { text: 'नमस्ते', confidence: 0.95 },
        'how are you': { text: 'आप कैसे हैं', confidence: 0.92 },
        'i love you': { text: 'मैं आपसे प्यार करता हूं', confidence: 0.88 },
        'thank you': { text: 'धन्यवाद', confidence: 0.94 },
        'good morning': { text: 'सुप्रभात', confidence: 0.91 },
        'world': { text: 'दुनिया', confidence: 0.93 },
        'beautiful': { text: 'सुंदर', confidence: 0.90 },
        'day': { text: 'दिन', confidence: 0.89 },
        'night': { text: 'रात', confidence: 0.87 },
        'friend': { text: 'दोस्त', confidence: 0.92 },
        'family': { text: 'परिवार', confidence: 0.94 },
        'food': { text: 'भोजन', confidence: 0.91 },
        'water': { text: 'पानी', confidence: 0.93 },
        'time': { text: 'समय', confidence: 0.90 },
        'work': { text: 'काम', confidence: 0.88 },
        'home': { text: 'घर', confidence: 0.92 }
    },
    'urdu': {
        'hello': { text: 'السلام علیکم', confidence: 0.95 },
        'how are you': { text: 'آپ کیسے ہیں', confidence: 0.92 },
        'i love you': { text: 'میں آپ سے محبت کرتا ہوں', confidence: 0.88 },
        'thank you': { text: 'شکریہ', confidence: 0.94 },
        'good morning': { text: 'صبح بخیر', confidence: 0.91 },
        'world': { text: 'دنیا', confidence: 0.93 },
        'beautiful': { text: 'خوبصورت', confidence: 0.90 },
        'day': { text: 'دن', confidence: 0.89 },
        'night': { text: 'رات', confidence: 0.87 },
        'friend': { text: 'دوست', confidence: 0.92 },
        'family': { text: 'خاندان', confidence: 0.94 },
        'food': { text: 'کھانا', confidence: 0.91 },
        'water': { text: 'پانی', confidence: 0.93 },
        'time': { text: 'وقت', confidence: 0.90 },
        'work': { text: 'کام', confidence: 0.88 },
        'home': { text: 'گھر', confidence: 0.92 }
    },
    'spanish': {
        'hello': { text: 'hola', confidence: 0.95 },
        'how are you': { text: '¿cómo estás?', confidence: 0.92 },
        'i love you': { text: 'te quiero', confidence: 0.88 },
        'thank you': { text: 'gracias', confidence: 0.94 },
        'good morning': { text: 'buenos días', confidence: 0.91 },
        'world': { text: 'mundo', confidence: 0.93 },
        'beautiful': { text: 'hermoso', confidence: 0.90 },
        'day': { text: 'día', confidence: 0.89 },
        'night': { text: 'noche', confidence: 0.87 },
        'friend': { text: 'amigo', confidence: 0.92 },
        'family': { text: 'familia', confidence: 0.94 },
        'food': { text: 'comida', confidence: 0.91 },
        'water': { text: 'agua', confidence: 0.93 },
        'time': { text: 'tiempo', confidence: 0.90 },
        'work': { text: 'trabajo', confidence: 0.88 },
        'home': { text: 'casa', confidence: 0.92 }
    },
    'french': {
        'hello': { text: 'bonjour', confidence: 0.95 },
        'how are you': { text: 'comment allez-vous?', confidence: 0.92 },
        'i love you': { text: 'je t\'aime', confidence: 0.88 },
        'thank you': { text: 'merci', confidence: 0.94 },
        'good morning': { text: 'bonjour', confidence: 0.91 },
        'world': { text: 'monde', confidence: 0.93 },
        'beautiful': { text: 'beau', confidence: 0.90 },
        'day': { text: 'jour', confidence: 0.89 },
        'night': { text: 'nuit', confidence: 0.87 },
        'friend': { text: 'ami', confidence: 0.92 },
        'family': { text: 'famille', confidence: 0.94 },
        'food': { text: 'nourriture', confidence: 0.91 },
        'water': { text: 'eau', confidence: 0.93 },
        'time': { text: 'temps', confidence: 0.90 },
        'work': { text: 'travail', confidence: 0.88 },
        'home': { text: 'maison', confidence: 0.92 }
    },
    'german': {
        'hello': { text: 'hallo', confidence: 0.95 },
        'how are you': { text: 'wie geht es dir?', confidence: 0.92 },
        'i love you': { text: 'ich liebe dich', confidence: 0.88 },
        'thank you': { text: 'danke', confidence: 0.94 },
        'good morning': { text: 'guten morgen', confidence: 0.91 },
        'world': { text: 'welt', confidence: 0.93 },
        'beautiful': { text: 'schön', confidence: 0.90 },
        'day': { text: 'tag', confidence: 0.89 },
        'night': { text: 'nacht', confidence: 0.87 },
        'friend': { text: 'freund', confidence: 0.92 },
        'family': { text: 'familie', confidence: 0.94 },
        'food': { text: 'essen', confidence: 0.91 },
        'water': { text: 'wasser', confidence: 0.93 },
        'time': { text: 'zeit', confidence: 0.90 },
        'work': { text: 'arbeit', confidence: 0.88 },
        'home': { text: 'heim', confidence: 0.92 }
    },
    'japanese': {
        'hello': { text: 'こんにちは', confidence: 0.95 },
        'how are you': { text: 'お元気ですか', confidence: 0.92 },
        'i love you': { text: '愛してる', confidence: 0.88 },
        'thank you': { text: 'ありがとう', confidence: 0.94 },
        'good morning': { text: 'おはよう', confidence: 0.91 },
        'world': { text: '世界', confidence: 0.93 },
        'beautiful': { text: '美しい', confidence: 0.90 },
        'day': { text: '日', confidence: 0.89 },
        'night': { text: '夜', confidence: 0.87 },
        'friend': { text: '友達', confidence: 0.92 },
        'family': { text: '家族', confidence: 0.94 },
        'food': { text: '食べ物', confidence: 0.91 },
        'water': { text: '水', confidence: 0.93 },
        'time': { text: '時間', confidence: 0.90 },
        'work': { text: '仕事', confidence: 0.88 },
        'home': { text: '家', confidence: 0.92 }
    }
};

// Phonetic mappings for different languages (fallback)
const phoneticMappings = {
    'hindi': {
        'a': 'अ', 'b': 'ब', 'c': 'क', 'd': 'ड', 'e': 'ए',
        'f': 'फ', 'g': 'ग', 'h': 'ह', 'i': 'इ', 'j': 'ज',
        'k': 'क', 'l': 'ल', 'm': 'म', 'n': 'न', 'o': 'ओ',
        'p': 'प', 'q': 'क्यू', 'r': 'र', 's': 'स', 't': 'ट',
        'u': 'उ', 'v': 'व', 'w': 'व', 'x': 'एक्स', 'y': 'य',
        'z': 'ज़'
    },
    'urdu': {
        'a': 'ا', 'b': 'ب', 'c': 'ک', 'd': 'د', 'e': 'ے',
        'f': 'ف', 'g': 'گ', 'h': 'ہ', 'i': 'ی', 'j': 'ج',
        'k': 'ک', 'l': 'ل', 'm': 'م', 'n': 'ن', 'o': 'و',
        'p': 'پ', 'q': 'ق', 'r': 'ر', 's': 'س', 't': 'ت',
        'u': 'و', 'v': 'و', 'w': 'و', 'x': 'کس', 'y': 'ی',
        'z': 'ز'
    },
    'spanish': {
        'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e',
        'f': 'f', 'g': 'g', 'h': 'h', 'i': 'i', 'j': 'j',
        'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o',
        'p': 'p', 'q': 'q', 'r': 'r', 's': 's', 't': 't',
        'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'y',
        'z': 'z'
    },
    'french': {
        'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e',
        'f': 'f', 'g': 'g', 'h': 'h', 'i': 'i', 'j': 'j',
        'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o',
        'p': 'p', 'q': 'q', 'r': 'r', 's': 's', 't': 't',
        'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'y',
        'z': 'z'
    },
    'german': {
        'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e',
        'f': 'f', 'g': 'g', 'h': 'h', 'i': 'i', 'j': 'j',
        'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o',
        'p': 'p', 'q': 'q', 'r': 'r', 's': 's', 't': 't',
        'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'y',
        'z': 'z'
    },
    'japanese': {
        'a': 'あ', 'b': 'ば', 'c': 'か', 'd': 'だ', 'e': 'え',
        'f': 'ふ', 'g': 'が', 'h': 'は', 'i': 'い', 'j': 'じ',
        'k': 'か', 'l': 'ら', 'm': 'ま', 'n': 'な', 'o': 'お',
        'p': 'ぱ', 'q': 'く', 'r': 'ら', 's': 'さ', 't': 'た',
        'u': 'う', 'v': 'ば', 'w': 'わ', 'x': 'えっくす', 'y': 'や',
        'z': 'ざ'
    }
};

// Neural network visualization parameters
const networkParams = {
    pulseSpeed: 1000,
    connectionSpeed: 800,
    activationSpeed: 500,
    attentionSpeed: 600
};

// API Configuration
const apiConfig = {
    apiKey: '', // Will be set by the user
    apiEndpoint: 'https://translation.googleapis.com/language/translate/v2',
    useApi: false, // Default to using local dictionaries
    supportedLanguages: {
        'hindi': 'hi',
        'urdu': 'ur',
        'spanish': 'es',
        'french': 'fr',
        'german': 'de',
        'japanese': 'ja'
    }
};

// DOM Elements
const inputText = document.getElementById('input-text');
const translateBtn = document.getElementById('translate-btn');
const outputText = document.getElementById('output-text');
const encoderNeurons = document.getElementById('encoder-neurons');
const attentionWeights = document.getElementById('attention-weights');
const decoderNeurons = document.getElementById('decoder-neurons');

// Model Parameters
const hiddenUnits = document.getElementById('hidden-units');
const embeddingDim = document.getElementById('embedding-dim');
const batchSize = document.getElementById('batch-size');

class NeuralNetworkVisualizer {
    constructor() {
        // Initialize DOM elements
        this.encoderNeurons = document.getElementById('encoderNeurons');
        this.attentionWeights = document.getElementById('attentionWeights');
        this.decoderNeurons = document.getElementById('decoderNeurons');
        this.inputText = document.getElementById('inputText');
        this.translateBtn = document.getElementById('translateBtn');
        this.outputDisplay = document.getElementById('outputDisplay');
        this.targetLanguage = document.getElementById('targetLanguage');
        this.useApi = document.getElementById('useApi');
        this.embeddingSize = document.getElementById('embeddingSize');
        this.attentionHeads = document.getElementById('attentionHeads');
        this.processingSpeed = document.getElementById('processingSpeed');

        // Initialize state
        this.isTranslating = false;

        // Set up event listeners
        this.setupEventListeners();
        this.setupNavigation();

        // Initialize the network
        this.initializeNetwork();
    }

    setupEventListeners() {
        this.translateBtn.addEventListener('click', () => this.startTranslation());
        this.embeddingSize.addEventListener('change', () => this.updateNetworkSize());
        this.attentionHeads.addEventListener('change', () => this.updateAttentionHeads());
        
        // API key related event listeners
        if (this.useApi) {
            this.useApi.addEventListener('change', () => {
                if (this.useApi.checked) {
                    console.log('Online translation enabled');
                }
            });
        }
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-links a');
        const navToggle = document.querySelector('.nav-toggle');
        const navLinksContainer = document.querySelector('.nav-links');
        
        // Handle navigation link clicks
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get the target section id from the href attribute
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Remove active class from all links
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    
                    // Add active class to clicked link
                    link.classList.add('active');
                    
                    // Smooth scroll to the target section
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Close mobile menu if open
                    if (navLinksContainer.classList.contains('active')) {
                        navLinksContainer.classList.remove('active');
                        navToggle.classList.remove('active');
                    }
                }
            });
        });
        
        // Handle mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navLinksContainer.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinksContainer.classList.contains('active') && 
                !navLinksContainer.contains(e.target) && 
                !navToggle.contains(e.target)) {
                navLinksContainer.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    initializeNetwork() {
        this.createNeurons(this.encoderNeurons, 8);
        this.createAttentionWeights(4);
        this.createNeurons(this.decoderNeurons, 8);
    }

    createNeurons(container, count) {
        container.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const neuron = document.createElement('div');
            neuron.className = 'neuron';
            
            // Add inner glow effect
            const innerGlow = document.createElement('div');
            innerGlow.className = 'neuron-inner';
            neuron.appendChild(innerGlow);
            
            // Add pulse animation
            const pulse = document.createElement('div');
            pulse.className = 'neuron-pulse';
            neuron.appendChild(pulse);
            
            container.appendChild(neuron);
        }
    }

    createAttentionWeights(heads) {
        this.attentionWeights.innerHTML = '';
        for (let i = 0; i < heads; i++) {
            const weight = document.createElement('div');
            weight.className = 'attention-weight';
            
            // Add inner glow effect
            const innerGlow = document.createElement('div');
            innerGlow.className = 'weight-inner';
            weight.appendChild(innerGlow);
            
            this.attentionWeights.appendChild(weight);
        }
    }

    createConnections() {
        // Clear existing connections
        this.connections.forEach(conn => conn.remove());
        this.connections = [];
        
        // Get the network diagram container
        const networkDiagram = document.querySelector('.network-diagram');
        if (!networkDiagram) return;
        
        // Create connections between encoder and attention
        const encoderNeurons = this.encoderNeurons.querySelectorAll('.neuron');
        const attentionWeights = this.attentionWeights.querySelectorAll('.attention-weight');
        
        encoderNeurons.forEach((neuron, i) => {
            attentionWeights.forEach((weight, j) => {
                const connection = document.createElement('div');
                connection.className = 'connection encoder-attention';
                this.connections.push(connection);
                networkDiagram.appendChild(connection);
            });
        });
        
        // Create connections between attention and decoder
        const decoderNeurons = this.decoderNeurons.querySelectorAll('.neuron');
        
        attentionWeights.forEach((weight, i) => {
            decoderNeurons.forEach((neuron, j) => {
                const connection = document.createElement('div');
                connection.className = 'connection attention-decoder';
                this.connections.push(connection);
                networkDiagram.appendChild(connection);
            });
        });
    }

    updateNetworkSize() {
        const size = parseInt(this.embeddingSize.value);
        if (isNaN(size) || size < 1) {
            this.embeddingSize.value = 8; // Default value
            return;
        }
        
        // Limit the size to a reasonable range
        const limitedSize = Math.min(Math.max(size, 4), 16);
        this.embeddingSize.value = limitedSize;
        
        this.createNeurons(this.encoderNeurons, limitedSize);
        this.createNeurons(this.decoderNeurons, limitedSize);
        this.createConnections();
    }

    updateAttentionHeads() {
        const heads = parseInt(this.attentionHeads.value);
        if (isNaN(heads) || heads < 1) {
            this.attentionHeads.value = 4; // Default value
            return;
        }
        
        // Limit the number of heads to a reasonable range
        const limitedHeads = Math.min(Math.max(heads, 2), 8);
        this.attentionHeads.value = limitedHeads;
        
        this.createAttentionWeights(limitedHeads);
        this.createConnections();
    }

    async startTranslation() {
        const text = this.inputText.value.trim();
        if (!text || this.isTranslating) return;

        this.isTranslating = true;
        this.translateBtn.disabled = true;
        
        // Clear previous translation
        this.outputDisplay.querySelector('.translation').textContent = '';
        this.outputDisplay.querySelector('.confidence').textContent = '';
        
        // Add processing class to the network
        const networkDiagram = document.querySelector('.network-diagram');
        if (networkDiagram) {
            networkDiagram.classList.add('processing');
        }
        
        // Animate the translation process
        await this.animateTranslation(text);
        
        // Remove processing class
        if (networkDiagram) {
            networkDiagram.classList.remove('processing');
        }
        
        this.isTranslating = false;
        this.translateBtn.disabled = false;
    }

    async animateTranslation(text) {
        // Get the current network parameters
        const embeddingSize = parseInt(this.embeddingSize.value) || 8;
        const attentionHeads = parseInt(this.attentionHeads.value) || 4;
        const processingSpeed = parseInt(this.processingSpeed.value) || 1000;
        
        // Adjust animation speed based on processing speed
        const baseDelay = 1000 - processingSpeed; // Invert the speed value
        
        // Simulate encoding
        await this.animateLayer(this.encoderNeurons, text.length, baseDelay);
        
        // Simulate attention
        await this.animateAttention(baseDelay);
        
        // Simulate decoding
        await this.animateLayer(this.decoderNeurons, text.length, baseDelay);
        
        // Show result
        this.showTranslation(text);
    }

    async animateLayer(container, duration, baseDelay) {
        const neurons = container.querySelectorAll('.neuron');
        const delay = baseDelay / neurons.length;
        
        // Animate each neuron with a slight delay
        for (let i = 0; i < neurons.length; i++) {
            const neuron = neurons[i];
            
            // Add activation class
            neuron.classList.add('active');
            
            // Animate connections
            this.animateConnections(neuron, container.id === 'encoderNeurons' ? 'encoder-attention' : 'attention-decoder');
            
            // Wait for the animation to complete
            await new Promise(resolve => setTimeout(resolve, delay));
            
            // Remove activation class
            neuron.classList.remove('active');
        }
    }

    animateConnections(neuron, connectionClass) {
        const connections = document.querySelectorAll(`.connection.${connectionClass}`);
        
        connections.forEach(connection => {
            connection.classList.add('active');
            
            // Remove active class after animation completes
            setTimeout(() => {
                connection.classList.remove('active');
            }, networkParams.connectionSpeed);
        });
    }

    async animateAttention(baseDelay) {
        const weights = this.attentionWeights.querySelectorAll('.attention-weight');
        const delay = baseDelay / weights.length;
        
        // Animate each attention weight with a slight delay
        for (let i = 0; i < weights.length; i++) {
            const weight = weights[i];
            
            // Add activation class
            weight.classList.add('active');
            
            // Animate connections
            this.animateConnections(weight, 'attention-decoder');
            
            // Wait for the animation to complete
            await new Promise(resolve => setTimeout(resolve, delay));
            
            // Remove activation class
            weight.classList.remove('active');
        }
    }

    async showTranslation(text) {
        // Get the selected target language
        const targetLang = this.targetLanguage ? this.targetLanguage.value : 'hindi';
        
        let translatedText = '';
        let confidence = 1.0;
        
        // Use API if enabled and API key is provided
        if (this.useApi && this.useApi.checked) {
            try {
                const result = await this.generateTranslation(text, targetLang);
                translatedText = result.translation;
                confidence = result.confidence;
            } catch (error) {
                console.error('Online translation failed:', error);
                // Fall back to local translation
                translatedText = this.generateLocalTranslation(text, targetLang);
            }
        } else {
            // Use local translation
            translatedText = this.generateLocalTranslation(text, targetLang);
        }
        
        // Clear previous content
        const translationElement = this.outputDisplay.querySelector('.translation');
        const confidenceElement = this.outputDisplay.querySelector('.confidence');
        
        if (translationElement && confidenceElement) {
            translationElement.textContent = '';
            confidenceElement.textContent = '';
            
            // Add a typing effect to the translation
            await this.typeText(translationElement, translatedText);
            
            // Show confidence with a slight delay
            setTimeout(() => {
                confidenceElement.textContent = `Confidence: ${(confidence * 100).toFixed(1)}%`;
                
                // Scroll to the output display after translation is complete
                this.scrollToOutput();
            }, translatedText.length * 50 + 500);
        }
    }
    
    async generateTranslation(text, targetLang) {
        if (this.useApi && this.useApi.checked) {
            try {
                // Map our language codes to MyMemory codes
                const langMap = {
                    'hindi': 'hi',
                    'urdu': 'ur',
                    'spanish': 'es',
                    'french': 'fr',
                    'german': 'de',
                    'japanese': 'ja'
                };

                const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${langMap[targetLang] || 'en'}`);

                if (!response.ok) {
                    throw new Error('Translation request failed');
                }

                const data = await response.json();
                
                if (data.responseStatus === 200) {
                    return {
                        translation: data.responseData.translatedText,
                        confidence: 100
                    };
                } else {
                    throw new Error(data.responseDetails || 'Translation failed');
                }
            } catch (error) {
                console.error('Online translation failed:', error);
                alert('Online translation service is currently unavailable. Using local translation instead.');
                return this.generateLocalTranslation(text, targetLang);
            }
        } else {
            return this.generateLocalTranslation(text, targetLang);
        }
    }
    
    generateLocalTranslation(text, targetLang) {
        // Check if we have an exact match in our translations
        const lowerText = text.toLowerCase();
        if (translations[targetLang] && translations[targetLang][lowerText]) {
            return translations[targetLang][lowerText].text;
        }
        
        // If not, generate a translation by processing each word
        const words = lowerText.split(' ');
        const translatedWords = words.map(word => {
            // Check if we have a translation for this word
            if (translations[targetLang] && translations[targetLang][word]) {
                return translations[targetLang][word].text;
            }
            
            // If not, generate a phonetic-like translation
            return this.generatePhoneticTranslation(word, targetLang);
        });
        
        return translatedWords.join(' ');
    }
    
    generatePhoneticTranslation(word, targetLang) {
        // Get the phonetic mapping for the target language
        const phoneticMap = phoneticMappings[targetLang] || phoneticMappings['hindi'];
        
        let result = '';
        for (let i = 0; i < word.length; i++) {
            const char = word[i].toLowerCase();
            result += phoneticMap[char] || char;
        }
        
        return result;
    }
    
    scrollToOutput() {
        // Get the output display element
        const outputDisplay = document.getElementById('outputDisplay');
        if (outputDisplay) {
            // Scroll the output display into view with smooth behavior
            outputDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    typeText(element, text) {
        element.textContent = '';
        let i = 0;
        
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);
    }
}

// Initialize the visualizer when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.neuralVisualizer = new NeuralNetworkVisualizer();
});

// Section Animation
function handleScrollAnimation() {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;
    const triggerBottom = windowHeight * 0.8;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < triggerBottom) {
            section.classList.add('visible');
        }
    });
}

// Initialize scroll animation
window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Disable submit button and show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            successMessage.style.cssText = `
                background: var(--secondary-color);
                color: white;
                padding: 15px;
                border-radius: var(--border-radius);
                margin-top: 20px;
                text-align: center;
            `;

            contactForm.reset();
            contactForm.appendChild(successMessage);

            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);

        } catch (error) {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
            errorMessage.style.cssText = `
                background: #ff4444;
                color: white;
                padding: 15px;
                border-radius: var(--border-radius);
                margin-top: 20px;
                text-align: center;
            `;

            contactForm.appendChild(errorMessage);

            // Remove error message after 5 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 5000);

        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
} 